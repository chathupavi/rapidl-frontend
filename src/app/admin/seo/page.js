"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertTriangle,
  Eye,
  Gauge,
  Globe2,
  MousePointerClick,
  Search,
  SearchCheck,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  RefreshButton,
  SeoCard,
  SeoCardHeader,
  SeoEmptyState,
  SeoHeader,
  SeoMain,
  SeoMetricCard,
  SeoPageShell,
  SeoSectionHeading,
} from "./_components/SeoUI";


/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


const RANGE_OPTIONS = [
  {
    value: "7d",
    label: "7 Days",
  },
  {
    value: "30d",
    label: "30 Days",
  },
  {
    value: "90d",
    label: "90 Days",
  },
];


/* =========================================================
   SAFE NUMBER EXTRACTOR

   Supports:

   123

   "123"

   {
     value: 123
   }

   {
     current: 123
   }

   {
     total: 123
   }

========================================================= */

function getMetricValue(
  value
) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }


  /* =======================================================
     NUMBER
  ======================================================= */

  if (
    typeof value ===
    "number"
  ) {
    return Number.isFinite(
      value
    )
      ? value
      : 0;
  }


  /* =======================================================
     STRING
  ======================================================= */

  if (
    typeof value ===
    "string"
  ) {
    const cleaned =
      value
        .replace(
          /,/g,
          ""
        )
        .replace(
          /%/g,
          ""
        )
        .trim();


    const parsed =
      Number(
        cleaned
      );


    return Number.isFinite(
      parsed
    )
      ? parsed
      : 0;
  }


  /* =======================================================
     OBJECT
  ======================================================= */

  if (
    typeof value ===
    "object"
  ) {
    if (
      value.value !==
      undefined
    ) {
      return getMetricValue(
        value.value
      );
    }


    if (
      value.current !==
      undefined
    ) {
      return getMetricValue(
        value.current
      );
    }


    if (
      value.total !==
      undefined
    ) {
      return getMetricValue(
        value.total
      );
    }


    if (
      value.count !==
      undefined
    ) {
      return getMetricValue(
        value.count
      );
    }


    if (
      value.metric !==
      undefined
    ) {
      return getMetricValue(
        value.metric
      );
    }
  }


  return 0;
}


/* =========================================================
   FORMAT NUMBER
========================================================= */

function formatNumber(
  value
) {
  const number =
    getMetricValue(
      value
    );


  return new Intl.NumberFormat(
    "en-US"
  ).format(
    number
  );
}


/* =========================================================
   FORMAT COMPACT
========================================================= */

function formatCompact(
  value
) {
  const number =
    getMetricValue(
      value
    );


  return new Intl.NumberFormat(
    "en-US",
    {
      notation:
        "compact",

      maximumFractionDigits:
        1,
    }
  ).format(
    number
  );
}


/* =========================================================
   FORMAT PERCENT
========================================================= */

function formatPercent(
  value
) {
  let number =
    getMetricValue(
      value
    );


  /*
   * Search Console CTR is normally decimal:
   *
   * 0.056 = 5.6%
   *
   * But if backend already returns:
   *
   * 5.6
   *
   * we should not multiply again.
   */

  if (
    Math.abs(
      number
    ) <= 1
  ) {
    number *=
      100;
  }


  return `${number.toFixed(
    2
  )}%`;
}


/* =========================================================
   GET SEARCH METRIC

   Supports different backend structures:

   search.clicks

   search.clicks.value

   search.metrics.clicks

   search.metrics.clicks.value
========================================================= */

function getSearchMetric(
  search,
  key
) {
  if (!search) {
    return 0;
  }


  if (
    search[key] !==
    undefined
  ) {
    return getMetricValue(
      search[key]
    );
  }


  if (
    search.metrics?.[key] !==
    undefined
  ) {
    return getMetricValue(
      search.metrics[
        key
      ]
    );
  }


  return 0;
}


/* =========================================================
   GET HEALTH METRIC
========================================================= */

function getHealthMetric(
  health,
  key
) {
  if (!health) {
    return 0;
  }


  if (
    health[key] !==
    undefined
  ) {
    return getMetricValue(
      health[key]
    );
  }


  if (
    health.metrics?.[key] !==
    undefined
  ) {
    return getMetricValue(
      health.metrics[
        key
      ]
    );
  }


  return 0;
}


/* =========================================================
   NORMALIZE QUERY
========================================================= */

function getQueryName(
  row
) {
  if (!row) {
    return "—";
  }


  return (
    row.query ||
    row.keys?.[0] ||
    row.keyword ||
    "—"
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function SeoOverviewPage() {
  const [
    range,
    setRange,
  ] = useState(
    "30d"
  );


  const [
    data,
    setData,
  ] = useState(
    null
  );


  const [
    loading,
    setLoading,
  ] = useState(
    true
  );


  const [
    refreshing,
    setRefreshing,
  ] = useState(
    false
  );


  const [
    error,
    setError,
  ] = useState(
    ""
  );


  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(
    new Date()
  );


  /* =======================================================
     LOAD DATA
  ======================================================= */

  const loadData =
    useCallback(
      async (
        {
          silent =
            false,
        } = {}
      ) => {
        try {
          if (silent) {
            setRefreshing(
              true
            );
          } else {
            setLoading(
              true
            );
          }


          setError(
            ""
          );


          const response =
            await fetch(
              `${API_URL}/api/seo/overview?range=${range}`,
              {
                method:
                  "GET",

                credentials:
                  "include",

                cache:
                  "no-store",
              }
            );


          const result =
            await response.json();


          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
              `SEO API returned ${response.status}`
            );
          }


          /*
           * Useful while testing.
           *
           * You can remove this after confirming
           * the response structure.
           */

          console.log(
            "SEO OVERVIEW RESPONSE:",
            result.data
          );


          setData(
            result.data ||
            {}
          );


          setLastUpdated(
            new Date()
          );

        } catch (
          error
        ) {
          console.error(
            "SEO Overview Error:",
            error
          );


          setError(
            error.message ||
            "Unable to load SEO intelligence."
          );


          setData(
            null
          );

        } finally {
          setLoading(
            false
          );


          setRefreshing(
            false
          );
        }
      },
      [
        range,
      ]
    );


  useEffect(
    () => {
      loadData();
    },
    [
      loadData,
    ]
  );


  /* =======================================================
     DATA
  ======================================================= */

  const search =
    data?.search ||
    {};


  const health =
    data?.health ||
    {};


  /* =======================================================
     NORMALIZED SEARCH METRICS
  ======================================================= */

  const organicClicks =
    getSearchMetric(
      search,
      "clicks"
    );


  const impressions =
    getSearchMetric(
      search,
      "impressions"
    );


  let ctr =
    getSearchMetric(
      search,
      "ctr"
    );


  /*
   * If API didn't provide CTR,
   * calculate it using clicks / impressions.
   */

  if (
    ctr === 0 &&
    impressions > 0
  ) {
    ctr =
      organicClicks /
      impressions;
  }


  const avgPosition =
    getSearchMetric(
      search,
      "position"
    );


  const indexablePages =
    getHealthMetric(
      health,
      "indexablePages"
    );


  const seoScore =
    getHealthMetric(
      health,
      "score"
    );


  const warnings =
    getHealthMetric(
      health,
      "warnings"
    );


  const criticalIssues =
    getHealthMetric(
      health,
      "criticalIssues"
    );


  /* =======================================================
     METRIC CARDS
  ======================================================= */

  const metrics =
    useMemo(
      () => [
        {
          label:
            "Organic Clicks",

          value:
            formatCompact(
              organicClicks
            ),

          description:
            "Visits from Google Search",

          icon:
            MousePointerClick,
        },

        {
          label:
            "Impressions",

          value:
            formatCompact(
              impressions
            ),

          description:
            "Search result exposure",

          icon:
            Eye,
        },

        {
          label:
            "Average CTR",

          value:
            formatPercent(
              ctr
            ),

          description:
            "Search impression → click",

          icon:
            Target,
        },

        {
          label:
            "Avg Position",

          value:
            Number.isFinite(
              avgPosition
            )
              ? avgPosition.toFixed(
                  1
                )
              : "0.0",

          description:
            "Average Google ranking",

          icon:
            Search,
        },

        {
          label:
            "Indexable Pages",

          value:
            formatNumber(
              indexablePages
            ),

          description:
            "Pages eligible for search",

          icon:
            Globe2,
        },
      ],
      [
        organicClicks,
        impressions,
        ctr,
        avgPosition,
        indexablePages,
      ]
    );


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading &&
    !data
  ) {
    return (
      <SeoOverviewSkeleton />
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (
    !loading &&
    !data
  ) {
    return (
      <SeoPageShell>

        <div
          className="
            flex
            min-h-[80vh]
            items-center
            justify-center
            p-6
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-8
              text-center
              shadow-sm
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-amber-50
                text-amber-500
              "
            >
              <AlertTriangle
                size={26}
              />
            </div>


            <h2
              className="
                mt-5
                text-xl
                font-black
                text-[#071b3d]
              "
            >
              SEO intelligence unavailable
            </h2>


            <p
              className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              {error}
            </p>


            <button
              type="button"
              onClick={() =>
                loadData()
              }
              className="
                mt-6
                rounded-xl
                bg-[#00195f]
                px-5
                py-3
                text-xs
                font-black
                text-white
              "
            >
              Try Again
            </button>

          </div>
        </div>

      </SeoPageShell>
    );
  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <SeoPageShell>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <SeoHeader
        icon={
          SearchCheck
        }
        eyebrow="Search & Visibility"
        title="SEO Overview"
        description="
          Search performance, technical health,
          indexability and ranking opportunities
          across Rapid Laundromat.
        "
        lastUpdated={
          lastUpdated
        }
        actions={
          <>
            <div
              className="
                flex
                items-center
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-1
              "
            >

              {RANGE_OPTIONS.map(
                (
                  option
                ) => (
                  <button
                    key={
                      option.value
                    }
                    type="button"
                    onClick={() =>
                      setRange(
                        option.value
                      )
                    }
                    className={`
                      rounded-lg
                      px-3.5
                      py-2
                      text-xs
                      font-bold
                      transition
                      ${
                        range ===
                        option.value
                          ? "bg-white text-[#00195f] shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:text-slate-900"
                      }
                    `}
                  >
                    {
                      option.label
                    }
                  </button>
                )
              )}

            </div>


            <RefreshButton
              refreshing={
                refreshing
              }
              onClick={() =>
                loadData({
                  silent:
                    true,
                })
              }
            />
          </>
        }
      />


      <SeoMain>

        {/* =====================================================
            HEALTH + KPI CARDS
        ===================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-[340px_minmax(0,1fr)]
          "
        >

          <SeoHealthCard
            score={
              seoScore
            }
            critical={
              criticalIssues
            }
            warnings={
              warnings
            }
          />


          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              xl:grid-cols-5
            "
          >

            {metrics.map(
              (
                item,
                index
              ) => (
                <SeoMetricCard
                  key={
                    item.label
                  }
                  {...item}
                  index={
                    index
                  }
                />
              )
            )}

          </div>

        </section>


        {/* =====================================================
            SEO READOUT
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[26px]
            border
            border-blue-100
            bg-gradient-to-br
            from-[#eef5ff]
            via-white
            to-white
            p-6
            lg:p-7
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-blue-100
              blur-3xl
            "
          />


          <div
            className="
              relative
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div
              className="
                max-w-3xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[2px]
                  text-[#0060d0]
                "
              >
                <TrendingUp
                  size={13}
                />

                Search Readout
              </div>


              <h2
                className="
                  mt-3
                  text-xl
                  font-black
                  leading-8
                  text-[#071b3d]
                  sm:text-2xl
                "
              >
                {data
                  ?.opportunities
                  ?.length
                  ? `${data.opportunities.length} SEO opportunities are ready for action.`
                  : "SEO visibility is building."}
              </h2>


              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Review queries with strong impressions,
                low CTR and near-page-one rankings to
                prioritize the next SEO improvements.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            OPPORTUNITIES
        ===================================================== */}

        <section>

          <SeoSectionHeading
            eyebrow="Growth Opportunities"
            title="What should be improved next"
            description="
              Search Console signals converted into
              actionable SEO priorities.
            "
          />


          <div
            className="
              mt-4
              grid
              grid-cols-1
              gap-4
              lg:grid-cols-2
            "
          >

            {(
              data
                ?.opportunities ||
              []
            )
              .slice(
                0,
                6
              )
              .map(
                (
                  item,
                  index
                ) => (
                  <OpportunityCard
                    key={
                      index
                    }
                    item={
                      item
                    }
                  />
                )
              )}


            {!data
              ?.opportunities
              ?.length && (
              <div
                className="
                  lg:col-span-2
                "
              >
                <SeoEmptyState
                  title="SEO opportunities are developing"
                  description="
                    Search opportunities will appear as
                    Search Console accumulates query data.
                  "
                />
              </div>
            )}

          </div>

        </section>


        {/* =====================================================
            SEARCH TABLE
        ===================================================== */}

        <SeoCard>

          <SeoCardHeader
            eyebrow="Google Search"
            title="Top Search Queries"
            description="
              Queries producing the strongest
              organic visibility.
            "
          />


          <div
            className="
              mt-6
              overflow-x-auto
            "
          >

            <table
              className="
                w-full
                min-w-[750px]
              "
            >

              <thead>
                <tr>

                  <TableHead>
                    Query
                  </TableHead>

                  <TableHead>
                    Clicks
                  </TableHead>

                  <TableHead>
                    Impressions
                  </TableHead>

                  <TableHead>
                    CTR
                  </TableHead>

                  <TableHead>
                    Position
                  </TableHead>

                </tr>
              </thead>


              <tbody>

                {(
                  data
                    ?.topQueries ||
                  []
                )
                  .slice(
                    0,
                    10
                  )
                  .map(
                    (
                      row,
                      index
                    ) => (

                      <tr
                        key={
                          index
                        }
                        className="
                          border-t
                          border-slate-100
                        "
                      >

                        <TableCell
                          strong
                        >
                          {
                            getQueryName(
                              row
                            )
                          }
                        </TableCell>


                        <TableCell>
                          {formatNumber(
                            row.clicks
                          )}
                        </TableCell>


                        <TableCell>
                          {formatNumber(
                            row.impressions
                          )}
                        </TableCell>


                        <TableCell>
                          {formatPercent(
                            row.ctr
                          )}
                        </TableCell>


                        <TableCell>
                          {getMetricValue(
                            row.position
                          ).toFixed(
                            1
                          )}
                        </TableCell>

                      </tr>
                    )
                  )}

              </tbody>

            </table>

          </div>

        </SeoCard>

      </SeoMain>

    </SeoPageShell>
  );
}


/* =========================================================
   SEO HEALTH CARD
========================================================= */

function SeoHealthCard({
  score,
  critical,
  warnings,
}) {
  const safeScore =
    Math.max(
      0,
      Math.min(
        100,
        getMetricValue(
          score
        )
      )
    );


  const safeCritical =
    getMetricValue(
      critical
    );


  const safeWarnings =
    getMetricValue(
      warnings
    );


  let status =
    "Excellent";


  let description =
    "Technical and on-page SEO are in strong condition.";


  if (
    safeScore <
    85
  ) {
    status =
      "Healthy";

    description =
      "SEO is performing well with some areas to improve.";
  }


  if (
    safeScore <
    70
  ) {
    status =
      "Watch";

    description =
      "Several SEO areas require optimization.";
  }


  if (
    safeScore <
    50
  ) {
    status =
      "At Risk";

    description =
      "Important SEO issues need attention.";
  }


  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[26px]
        bg-[#00195f]
        p-6
        text-white
        shadow-[0_18px_55px_rgba(0,25,95,.2)]
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          h-52
          w-52
          rounded-full
          bg-[#0060d0]/30
          blur-3xl
        "
      />


      <div
        className="
          relative
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-[9px]
            font-black
            uppercase
            tracking-[2px]
            text-sky-300
          "
        >
          <Gauge
            size={14}
          />

          SEO Health
        </div>


        <div
          className="
            mt-6
            flex
            items-end
            gap-2
          "
        >
          <div
            className="
              text-5xl
              font-black
              tracking-tight
            "
          >
            {Math.round(
              safeScore
            )}
          </div>

          <div
            className="
              pb-1
              text-sm
              font-black
              text-white/40
            "
          >
            /100
          </div>
        </div>


        <div
          className="
            mt-5
            h-2
            overflow-hidden
            rounded-full
            bg-white/10
          "
        >
          <motion.div
            initial={{
              width:
                0,
            }}
            animate={{
              width:
                `${safeScore}%`,
            }}
            transition={{
              duration:
                0.8,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-sky-300
              to-white
            "
          />
        </div>


        <div
          className="
            mt-5
          "
        >

          <div
            className="
              text-lg
              font-black
            "
          >
            {status}
          </div>


          <div
            className="
              mt-1
              text-xs
              leading-5
              text-white/55
            "
          >
            {description}
          </div>

        </div>


        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-2
          "
        >

          <div
            className="
              rounded-xl
              bg-white/10
              p-3
            "
          >
            <div
              className="
                text-lg
                font-black
              "
            >
              {safeWarnings}
            </div>

            <div
              className="
                text-[8px]
                font-black
                uppercase
                text-white/45
              "
            >
              Warnings
            </div>
          </div>


          <div
            className="
              rounded-xl
              bg-white/10
              p-3
            "
          >
            <div
              className="
                text-lg
                font-black
              "
            >
              {safeCritical}
            </div>

            <div
              className="
                text-[8px]
                font-black
                uppercase
                text-white/45
              "
            >
              Critical
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   OPPORTUNITY CARD
========================================================= */

function OpportunityCard({
  item,
}) {
  const impressions =
    getMetricValue(
      item?.impressions
    );


  const position =
    getMetricValue(
      item?.position
    );


  return (
    <div
      className="
        rounded-[20px]
        border
        border-blue-100
        bg-blue-50/50
        p-5
      "
    >

      <div
        className="
          flex
          gap-4
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-100
            text-blue-600
          "
        >
          <TrendingUp
            size={17}
          />
        </div>


        <div
          className="
            min-w-0
            flex-1
          "
        >

          <h3
            className="
              truncate
              text-sm
              font-black
              text-[#071b3d]
            "
          >
            {getQueryName(
              item
            )}
          </h3>


          <p
            className="
              mt-1.5
              text-xs
              leading-5
              text-slate-500
            "
          >
            {formatNumber(
              impressions
            )}{" "}
            impressions · Position{" "}
            {position.toFixed(
              1
            )}
          </p>


          <div
            className="
              mt-3
              text-[9px]
              font-black
              uppercase
              tracking-[1px]
              text-[#0060d0]
            "
          >
            {item?.type ===
            "ctr"
              ? "Improve CTR"
              : item?.type ===
                "ranking"
              ? "Ranking Opportunity"
              : "Visibility Opportunity"}
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   TABLE
========================================================= */

function TableHead({
  children,
}) {
  return (
    <th
      className="
        pb-3
        text-left
        text-[8px]
        font-black
        uppercase
        tracking-[1px]
        text-slate-400
      "
    >
      {children}
    </th>
  );
}


function TableCell({
  children,
  strong =
    false,
}) {
  return (
    <td
      className={`
        py-4
        pr-4
        text-[10px]
        ${
          strong
            ? "font-black text-slate-700"
            : "font-semibold text-slate-500"
        }
      `}
    >
      {children}
    </td>
  );
}


/* =========================================================
   SKELETON
========================================================= */

function SeoOverviewSkeleton() {
  return (
    <SeoPageShell>

      <div
        className="
          border-b
          border-slate-200
          bg-white
          px-6
          py-7
          lg:px-8
        "
      >

        <div
          className="
            h-4
            w-40
            animate-pulse
            rounded
            bg-slate-100
          "
        />


        <div
          className="
            mt-3
            h-8
            w-64
            animate-pulse
            rounded-xl
            bg-slate-100
          "
        />


        <div
          className="
            mt-3
            h-4
            w-96
            max-w-full
            animate-pulse
            rounded
            bg-slate-100
          "
        />

      </div>


      <SeoMain>

        <div
          className="
            grid
            gap-6
            xl:grid-cols-[340px_1fr]
          "
        >

          <div
            className="
              h-64
              animate-pulse
              rounded-[26px]
              bg-slate-200
            "
          />


          <div
            className="
              grid
              grid-cols-2
              gap-4
              xl:grid-cols-5
            "
          >

            {Array.from({
              length:
                5,
            }).map(
              (
                _,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="
                    h-52
                    animate-pulse
                    rounded-[22px]
                    bg-white
                  "
                />
              )
            )}

          </div>

        </div>

      </SeoMain>

    </SeoPageShell>
  );
}