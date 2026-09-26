"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Eye,
  Loader2,
  MousePointerClick,
  Search,
  SearchCheck,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  RefreshButton,
  SeoCard,
  SeoCardHeader,
  SeoHeader,
  SeoMain,
  SeoMetricCard,
  SeoPageShell,
  SeoSectionHeading,
} from "../_components/SeoUI";


const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function SearchQueriesPage() {
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
    search,
    setSearch,
  ] = useState(
    ""
  );

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(
    new Date()
  );


  const load =
    useCallback(
      async (
        silent =
          false
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

          const response =
            await fetch(
              `${API_URL}/api/seo/queries`,
              {
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
              result.message
            );
          }

          setData(
            result.data ||
            {}
          );

          setLastUpdated(
            new Date()
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
      []
    );


  useEffect(
    () => {
      load();
    },
    [
      load,
    ]
  );


  const queries =
    useMemo(
      () => {
        const rows =
          data?.queries ||
          [];

        const query =
          search
            .trim()
            .toLowerCase();

        if (!query) {
          return rows;
        }

        return rows.filter(
          (
            item
          ) =>
            String(
              item.query ||
              item.keys?.[0] ||
              ""
            )
              .toLowerCase()
              .includes(
                query
              )
        );
      },
      [
        data,
        search,
      ]
    );


  const totals =
    useMemo(
      () => {
        const rows =
          data?.queries ||
          [];

        const clicks =
          rows.reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item.clicks ||
                0
              ),
            0
          );

        const impressions =
          rows.reduce(
            (
              total,
              item
            ) =>
              total +
              Number(
                item.impressions ||
                0
              ),
            0
          );

        const ctr =
          impressions
            ? (
                clicks /
                impressions
              ) *
              100
            : 0;

        const avgPosition =
          rows.length
            ? rows.reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  Number(
                    item.position ||
                    0
                  ),
                0
              ) /
              rows.length
            : 0;

        return {
          clicks,
          impressions,
          ctr,
          avgPosition,
        };
      },
      [
        data,
      ]
    );


  return (
    <SeoPageShell>

      <SeoHeader
        icon={
          SearchCheck
        }
        eyebrow="Search & Visibility"
        title="Search Queries"
        description="
          Discover what customers search for,
          where Rapid ranks and which keywords
          have the greatest growth potential.
        "
        lastUpdated={
          lastUpdated
        }
        actions={
          <RefreshButton
            refreshing={
              refreshing
            }
            onClick={() =>
              load(
                true
              )
            }
          />
        }
      />


      <SeoMain>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <SeoMetricCard
            label="Search Clicks"
            value={
              formatNumber(
                totals.clicks
              )
            }
            description="Organic visits"
            icon={
              MousePointerClick
            }
            index={0}
          />

          <SeoMetricCard
            label="Impressions"
            value={
              formatNumber(
                totals.impressions
              )
            }
            description="Google visibility"
            icon={
              Eye
            }
            index={1}
          />

          <SeoMetricCard
            label="Average CTR"
            value={`${totals.ctr.toFixed(
              2
            )}%`}
            description="Impression → click"
            icon={
              Target
            }
            index={2}
          />

          <SeoMetricCard
            label="Avg Position"
            value={
              totals.avgPosition.toFixed(
                1
              )
            }
            description="Average ranking"
            icon={
              Search
            }
            index={3}
          />
        </div>


        <section>

          <SeoSectionHeading
            eyebrow="Opportunity Engine"
            title="Keyword Opportunities"
            description="
              Queries with strong visibility,
              weak CTR or rankings close to page one.
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
                8
              )
              .map(
                (
                  item,
                  index
                ) => (
                  <QueryOpportunity
                    key={
                      index
                    }
                    item={
                      item
                    }
                  />
                )
              )}
          </div>

        </section>


        <SeoCard>

          <SeoCardHeader
            eyebrow="Search Intelligence"
            title="All Search Queries"
            description="
              Search Console query performance
              ranked by organic visibility.
            "
          />


          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div
              className="
                relative
                w-full
                max-w-[420px]
              "
            >
              <Search
                size={14}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                value={
                  search
                }
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search query..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-11
                  pr-4
                  text-xs
                  outline-none
                  focus:border-[#0060d0]
                  focus:bg-white
                "
              />
            </div>
          </div>


          <div
            className="
              mt-6
              overflow-x-auto
            "
          >
            <table
              className="
                w-full
                min-w-[850px]
              "
            >
              <thead>
                <tr>
                  <TH>
                    Query
                  </TH>

                  <TH>
                    Clicks
                  </TH>

                  <TH>
                    Impressions
                  </TH>

                  <TH>
                    CTR
                  </TH>

                  <TH>
                    Position
                  </TH>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="
                        py-20
                        text-center
                      "
                    >
                      <Loader2
                        size={22}
                        className="
                          mx-auto
                          animate-spin
                          text-[#0060d0]
                        "
                      />
                    </td>
                  </tr>
                ) : queries.map(
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
                        transition
                        hover:bg-blue-50/20
                      "
                    >
                      <td
                        className="
                          py-4
                          pr-5
                          text-xs
                          font-black
                          text-[#071b3d]
                        "
                      >
                        {row.query ||
                          row.keys?.[0] ||
                          "—"}
                      </td>

                      <TD>
                        {formatNumber(
                          row.clicks
                        )}
                      </TD>

                      <TD>
                        {formatNumber(
                          row.impressions
                        )}
                      </TD>

                      <TD>
                        {formatPercent(
                          row.ctr
                        )}
                      </TD>

                      <TD>
                        {Number(
                          row.position ||
                          0
                        ).toFixed(
                          1
                        )}
                      </TD>
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


function QueryOpportunity({
  item,
}) {
  const isCtr =
    item.type ===
    "ctr";


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
              text-sm
              font-black
              text-[#071b3d]
            "
          >
            {item.query ||
              item.keys?.[0]}
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
              item.impressions
            )}{" "}
            impressions · position{" "}
            {Number(
              item.position ||
              0
            ).toFixed(
              1
            )}
          </p>


          <div
            className="
              mt-3
              rounded-lg
              bg-white/70
              px-3
              py-2.5
              text-[9px]
              leading-5
              text-slate-500
            "
          >
            {isCtr
              ? "Strong search visibility but weak click-through. Improve the title and description."
              : "This keyword is close to stronger ranking positions. Improve page relevance and internal links."}
          </div>

        </div>

      </div>
    </div>
  );
}


function TH({
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


function TD({
  children,
}) {
  return (
    <td
      className="
        py-4
        pr-4
        text-[10px]
        font-semibold
        text-slate-500
      "
    >
      {children}
    </td>
  );
}


function formatNumber(
  value
) {
  return Number(
    value ||
    0
  ).toLocaleString();
}


function formatPercent(
  value
) {
  let number =
    Number(
      value ||
      0
    );

  if (
    Math.abs(
      number
    ) <=
    1
  ) {
    number *=
      100;
  }

  return `${number.toFixed(
    2
  )}%`;
}