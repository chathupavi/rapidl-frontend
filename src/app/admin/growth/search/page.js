"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  Globe2,
  Laptop,
  Lightbulb,
  MonitorSmartphone,
  MousePointerClick,
  RefreshCw,
  Search,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";


const API_URL =process.env.NEXT_PUBLIC_API_URL ||"http://localhost:8080";

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
   HELPERS
========================================================= */

function formatNumber(value) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(
    Number(value || 0)
  );
}


function formatPercent(
  value
) {
  return `${Number(
    value || 0
  ).toFixed(2)}%`;
}


function formatPosition(
  value
) {
  if (!value) {
    return "—";
  }

  return Number(
    value
  ).toFixed(1);
}


function shortUrl(value) {
  if (!value) {
    return "—";
  }

  try {
    const url =
      new URL(value);

    return (
      url.pathname ||
      "/"
    );
  } catch {
    return value;
  }
}


/* =========================================================
   PAGE
========================================================= */

export default function SearchIntelligencePage() {
  const [
    range,
    setRange,
  ] =
    useState("30d");


  const [
    data,
    setData,
  ] =
    useState(null);


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    refreshing,
    setRefreshing,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    lastUpdated,
    setLastUpdated,
  ] =
    useState(
      new Date()
    );


  const loadData =
    useCallback(
      async (
        silent = false
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

          setError("");


          const response =
            await fetch(
              `${API_URL}/api/analytics/search-intelligence?range=${range}`,
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
            !response.ok
          ) {
            throw new Error(
              result?.error ||
                result?.message ||
                "Search Intelligence request failed."
            );
          }


          setData(
            result.data
          );

          setLastUpdated(
            new Date()
          );
        } catch (
          error
        ) {
          console.error(
            error
          );

          setError(
            error.message
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
      [range]
    );


  useEffect(() => {
    loadData();
  }, [loadData]);


  const overview =
    data?.overview ||
    {};


  const queries =
    data?.queries ||
    [];


  const pages =
    data?.pages ||
    [];


  const devices =
    data?.devices ||
    [];


  const countries =
    data?.countries ||
    [];


  const opportunities =
    data
      ?.opportunities ||
    {};


  const topQueries =
    useMemo(
      () =>
        queries.slice(
          0,
          10
        ),
      [queries]
    );


  if (
    loading &&
    !data
  ) {
    return (
      <SearchSkeleton />
    );
  }


  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-200 bg-white">

        <div className="px-6 py-6 lg:px-8">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00195f] text-white">
                  <Search
                    size={16}
                  />
                </div>

                <span className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Growth Intelligence
                </span>

              </div>


              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#071b3d]">
                Search Intelligence
              </h1>


              <p className="mt-1 max-w-2xl text-sm text-slate-500">
                Understand how customers discover Rapid Laundromat through Google Search.
              </p>

            </div>


            <div className="flex flex-wrap items-center gap-3">

              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">

                {RANGE_OPTIONS.map(
                  (option) => (
                    <button
                      key={
                        option.value
                      }
                      onClick={() =>
                        setRange(
                          option.value
                        )
                      }
                      className={`rounded-lg px-4 py-2 text-[10px] font-black transition ${
                        range ===
                        option.value
                          ? "bg-white text-[#00195f] shadow-sm"
                          : "text-slate-400"
                      }`}
                    >
                      {
                        option.label
                      }
                    </button>
                  )
                )}

              </div>


              <button
                onClick={() =>
                  loadData(
                    true
                  )
                }
                disabled={
                  refreshing
                }
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600"
              >

                <RefreshCw
                  size={14}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>

            </div>

          </div>


          <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">

            <SourceBadge
              connected={
                data?.source
                  ?.connected
              }
              hasData={
                data?.source
                  ?.hasData
              }
            />


          <span className="text-[10px] text-slate-400">
            {data?.source?.site?.replace("sc-domain:", "")}
          </span>


            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400">

              <Clock3
                size={12}
              />

              Updated{" "}

              {lastUpdated.toLocaleTimeString(
                [],
                {
                  hour:
                    "2-digit",

                  minute:
                    "2-digit",
                }
              )}

            </span>

          </div>

        </div>

      </header>


      <main className="space-y-6 px-6 py-6 lg:px-8">

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}


        {/* =====================================================
            KPIs
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SearchMetric
            label="Google Clicks"
            value={formatNumber(
              overview
                ?.clicks
                ?.value
            )}
            change={
              overview
                ?.clicks
                ?.change
            }
            icon={
              MousePointerClick
            }
          />


          <SearchMetric
            label="Impressions"
            value={formatNumber(
              overview
                ?.impressions
                ?.value
            )}
            change={
              overview
                ?.impressions
                ?.change
            }
            icon={Eye}
          />


          <SearchMetric
            label="Search CTR"
            value={formatPercent(
              overview
                ?.ctr
                ?.value
            )}
            change={
              overview
                ?.ctr
                ?.change
            }
            icon={Target}
            percentagePoint
          />


          <SearchMetric
            label="Average Position"
            value={formatPosition(
              overview
                ?.position
                ?.value
            )}
            change={
              overview
                ?.position
                ?.change
            }
            icon={
              TrendingUp
            }
            position
          />

        </section>


        {/* =====================================================
            TREND
        ===================================================== */}

        <SearchCard>

          <SectionHeader
            eyebrow="Visibility"
            title="Organic Search Momentum"
            description="Clicks and impressions generated from Google Search."
          />


          {data?.trend
            ?.length ? (
            <div className="mt-7">
              <SearchTrendChart
                data={
                  data.trend
                }
              />
            </div>
          ) : (
            <EmptyState
              title="No search trend yet"
              description="Search Console will populate this section as Google collects search performance data."
            />
          )}

        </SearchCard>


        {/* =====================================================
            SEARCH QUERIES
        ===================================================== */}

        <SearchCard>

          <SectionHeader
            eyebrow="Keywords"
            title="Top Search Queries"
            description="Search terms customers use before clicking or seeing Rapid Laundromat."
          />


          {topQueries.length ? (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">

              <div className="min-w-[760px]">

                <div className="grid grid-cols-[1fr_100px_120px_100px_100px] bg-slate-50 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">

                  <span>
                    Search Query
                  </span>

                  <span className="text-right">
                    Clicks
                  </span>

                  <span className="text-right">
                    Impressions
                  </span>

                  <span className="text-right">
                    CTR
                  </span>

                  <span className="text-right">
                    Position
                  </span>

                </div>


                {topQueries.map(
                  (
                    query,
                    index
                  ) => (
                    <QueryRow
                      key={`${query.query}-${index}`}
                      query={
                        query
                      }
                      index={
                        index
                      }
                    />
                  )
                )}

              </div>

            </div>
          ) : (
            <EmptyState
              title="No queries available"
              description="Search queries will appear after your website begins receiving Google Search impressions."
            />
          )}

        </SearchCard>


        {/* =====================================================
            SEO OPPORTUNITIES
        ===================================================== */}

        <section>

          <SectionHeading
            title="SEO Opportunities"
            description="Search terms where optimization may produce additional traffic."
          />


          <div className="mt-4 grid grid-cols-1 gap-6 xl:grid-cols-2">

            <OpportunityCard
              title="High Visibility · Low CTR"
              description="Google is showing these terms, but relatively few people are clicking."
              items={
                opportunities
                  .highImpressionLowCtr ||
                []
              }
              type="ctr"
            />


            <OpportunityCard
              title="Near Page One"
              description="Keywords already close to strong Google positions."
              items={
                opportunities
                  .nearPageOne ||
                []
              }
              type="ranking"
            />

          </div>

        </section>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_.7fr]">

          <SearchPages
            pages={
              pages
            }
          />


          <DevicePerformance
            devices={
              devices
            }
          />

        </section>


        {/* =====================================================
            GEOGRAPHY
        ===================================================== */}

        <SearchCountries
          countries={
            countries
          }
        />

      </main>

    </div>
  );
}


/* =========================================================
   METRIC
========================================================= */

function SearchMetric({
  label,
  value,
  change,
  icon: Icon,
  position = false,
  percentagePoint = false,
}) {
  const numericChange =
    Number(
      change || 0
    );


  const positive =
    numericChange > 0;


  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

          <Icon
            size={17}
          />

        </div>


        {numericChange !==
          0 && (

          <div
            className={`flex items-center gap-1 text-[10px] font-black ${
              positive
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >

            {positive ? (
              <ArrowUpRight
                size={12}
              />
            ) : (
              <ArrowDownRight
                size={12}
              />
            )}


            {Math.abs(
              numericChange
            ).toFixed(
              percentagePoint
                ? 2
                : 1
            )}

            {percentagePoint
              ? " pts"
              : position
              ? " positions"
              : "%"}

          </div>

        )}

      </div>


      <div className="mt-6 text-3xl font-black tracking-tight text-[#071b3d]">
        {value}
      </div>


      <div className="mt-1 text-[11px] font-black text-slate-600">
        {label}
      </div>

    </div>
  );
}


/* =========================================================
   QUERY ROW
========================================================= */

function QueryRow({
  query,
  index,
}) {
  return (
    <div className="grid grid-cols-[1fr_100px_120px_100px_100px] items-center border-t border-slate-100 px-4 py-4">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[10px] font-black text-slate-500">
          {index + 1}
        </div>

        <span className="truncate text-xs font-black text-slate-700">
          {query.query}
        </span>

      </div>


      <span className="text-right text-xs font-black text-[#071b3d]">
        {formatNumber(
          query.clicks
        )}
      </span>


      <span className="text-right text-xs font-bold text-slate-500">
        {formatNumber(
          query.impressions
        )}
      </span>


      <span className="text-right text-xs font-bold text-slate-500">
        {formatPercent(
          query.ctr
        )}
      </span>


      <span className="text-right text-xs font-black text-[#0060d0]">
        {formatPosition(
          query.position
        )}
      </span>

    </div>
  );
}


/* =========================================================
   OPPORTUNITIES
========================================================= */

function OpportunityCard({
  title,
  description,
  items,
  type,
}) {
  return (
    <SearchCard>

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <Lightbulb
            size={17}
          />
        </div>

        <div>

          <h3 className="text-sm font-black text-[#071b3d]">
            {title}
          </h3>

          <p className="mt-1 text-[10px] leading-5 text-slate-400">
            {description}
          </p>

        </div>

      </div>


      {items.length ? (
        <div className="mt-5 space-y-2">

          {items
            .slice(0, 6)
            .map(
              (
                item,
                index
              ) => (

                <div
                  key={`${item.query}-${index}`}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                >

                  <div className="truncate text-xs font-black text-slate-700">
                    {
                      item.query
                    }
                  </div>


                  <div className="mt-2 flex flex-wrap gap-3 text-[9px] font-bold text-slate-400">

                    <span>
                      {formatNumber(
                        item.impressions
                      )}{" "}
                      impressions
                    </span>


                    {type ===
                    "ctr" ? (
                      <span className="text-amber-600">
                        {formatPercent(
                          item.ctr
                        )}{" "}
                        CTR
                      </span>
                    ) : (
                      <span className="text-[#0060d0]">
                        Position{" "}
                        {formatPosition(
                          item.position
                        )}
                      </span>
                    )}

                  </div>

                </div>
              )
            )}

        </div>
      ) : (
        <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-xs font-bold text-emerald-600">
          No major opportunity detected yet.
        </div>
      )}

    </SearchCard>
  );
}


/* =========================================================
   SEARCH PAGES
========================================================= */

function SearchPages({
  pages,
}) {
  return (
    <SearchCard>

      <SectionHeader
        eyebrow="Content"
        title="Top Search Landing Pages"
        description="Pages earning visibility and clicks from Google."
      />


      {pages.length ? (
        <div className="mt-5 space-y-2">

          {pages
            .slice(0, 8)
            .map(
              (
                page,
                index
              ) => (

                <div
                  key={`${page.page}-${index}`}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 p-3"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#0060d0]">
                    {index + 1}
                  </div>


                  <div className="min-w-0 flex-1">

                    <div className="truncate text-xs font-black text-slate-700">
                      {shortUrl(
                        page.page
                      )}
                    </div>

                    <div className="mt-1 text-[9px] text-slate-400">
                      Position{" "}
                      {formatPosition(
                        page.position
                      )}
                    </div>

                  </div>


                  <div className="text-right">

                    <div className="text-xs font-black text-[#071b3d]">
                      {formatNumber(
                        page.clicks
                      )}
                    </div>

                    <div className="text-[9px] text-slate-400">
                      clicks
                    </div>

                  </div>

                </div>
              )
            )}

        </div>
      ) : (
        <EmptyState
          title="No page data"
          description="Google search landing pages will appear here."
        />
      )}

    </SearchCard>
  );
}


/* =========================================================
   DEVICES
========================================================= */

function DevicePerformance({
  devices,
}) {
  return (
    <SearchCard>

      <SectionHeader
        eyebrow="Technology"
        title="Search by Device"
        description="How customers discover you across devices."
      />


      {devices.length ? (
        <div className="mt-6 space-y-5">

          {devices.map(
            (
              device
            ) => {

              const name =
                String(
                  device.device
                ).toLowerCase();


              const Icon =
                name ===
                "mobile"
                  ? Smartphone
                  : name ===
                    "desktop"
                  ? Laptop
                  : MonitorSmartphone;


              return (
                <div
                  key={
                    device.device
                  }
                >

                  <div className="mb-2 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Icon
                        size={14}
                        className="text-[#0060d0]"
                      />

                      <span className="text-xs font-black capitalize text-slate-600">
                        {name}
                      </span>

                    </div>


                    <span className="text-xs font-black text-[#071b3d]">
                      {device.share}%
                    </span>

                  </div>


                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                    <div
                      style={{
                        width:
                          `${Math.min(
                            device.share,
                            100
                          )}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00195f] to-[#4fc3f7]"
                    />

                  </div>


                  <div className="mt-2 text-[9px] text-slate-400">
                    {formatNumber(
                      device.clicks
                    )}{" "}
                    clicks ·{" "}
                    {formatNumber(
                      device.impressions
                    )}{" "}
                    impressions
                  </div>

                </div>
              );
            }
          )}

        </div>
      ) : (
        <EmptyState
          title="No device data"
          description="Device search data will appear here."
        />
      )}

    </SearchCard>
  );
}


/* =========================================================
   COUNTRIES
========================================================= */

function SearchCountries({
  countries,
}) {
  return (
    <SearchCard>

      <SectionHeader
        eyebrow="Markets"
        title="Search Visibility by Country"
        description="Countries generating Google Search impressions and clicks."
        action={
          <Globe2
            size={18}
            className="text-[#0060d0]"
          />
        }
      />


      {countries.length ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

          {countries
            .slice(0, 10)
            .map(
              (
                country,
                index
              ) => (

                <div
                  key={`${country.country}-${index}`}
                  className={`grid grid-cols-[1fr_100px_110px_90px] items-center px-4 py-4 ${
                    index
                      ? "border-t border-slate-100"
                      : ""
                  }`}
                >

                  <span className="text-xs font-black uppercase text-slate-600">
                    {
                      country.country
                    }
                  </span>


                  <span className="text-right text-xs font-black text-[#071b3d]">
                    {formatNumber(
                      country.clicks
                    )}{" "}
                    clicks
                  </span>


                  <span className="text-right text-xs text-slate-400">
                    {formatNumber(
                      country.impressions
                    )}
                  </span>


                  <span className="text-right text-xs font-black text-[#0060d0]">
                    #{formatPosition(
                      country.position
                    )}
                  </span>

                </div>
              )
            )}

        </div>
      ) : (
        <EmptyState
          title="No country data"
          description="Search market data will appear as Google records organic visibility."
        />
      )}

    </SearchCard>
  );
}


/* =========================================================
   SIMPLE SVG TREND
========================================================= */

function SearchTrendChart({
  data,
}) {
  const width =
    1000;

  const height =
    260;

  const padding =
    25;


  const max =
    Math.max(
      ...data.map(
        (item) =>
          Number(
            item.impressions ||
              0
          )
      ),
      1
    );


  const points =
    data
      .map(
        (
          item,
          index
        ) => {

          const x =
            padding +
            (index /
              Math.max(
                data.length -
                  1,
                1
              )) *
              (width -
                padding * 2);


          const y =
            height -
            padding -
            (Number(
              item.impressions ||
                0
            ) /
              max) *
              (height -
                padding * 2);


          return `${x},${y}`;
        }
      )
      .join(" ");


  return (
    <div>

      <div className="h-[260px]">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >

          {[0, 1, 2, 3].map(
            (item) => {

              const y =
                padding +
                (item / 3) *
                  (height -
                    padding * 2);


              return (
                <line
                  key={
                    item
                  }
                  x1="0"
                  x2={
                    width
                  }
                  y1={
                    y
                  }
                  y2={
                    y
                  }
                  stroke="#e8edf5"
                  strokeDasharray="5 7"
                />
              );
            }
          )}


          <polyline
            points={
              points
            }
            fill="none"
            stroke="#0060d0"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

        </svg>

      </div>


      <div className="mt-3 flex justify-between text-[9px] font-bold text-slate-400">

        <span>
          {
            data[0]
              ?.date
          }
        </span>

        <span>
          Search visibility
        </span>

        <span>
          {
            data[
              data.length -
                1
            ]?.date
          }
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   COMMON UI
========================================================= */

function SearchCard({
  children,
}) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.035)] sm:p-6">
      {children}
    </div>
  );
}


function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-start justify-between gap-5">

      <div>

        <div className="text-[9px] font-black uppercase tracking-[1.8px] text-[#0060d0]">
          {eyebrow}
        </div>

        <h3 className="mt-1 text-base font-black text-[#071b3d]">
          {title}
        </h3>

        <p className="mt-1 text-[11px] leading-5 text-slate-400">
          {description}
        </p>

      </div>

      {action}

    </div>
  );
}


function SectionHeading({
  title,
  description,
}) {
  return (
    <div>

      <h2 className="text-lg font-black text-[#071b3d]">
        {title}
      </h2>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}


function SourceBadge({
  connected,
  hasData,
}) {
  if (!connected) {
    return (
      <div className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500">
        Search Console Not Connected
      </div>
    );
  }


  if (!hasData) {
    return (
      <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-amber-600">

        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

        Connected · Waiting for Data

      </div>
    );
  }


  return (
    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600">

      <CheckCircle2
        size={11}
      />

      Search Console Connected

    </div>
  );
}


function EmptyState({
  title,
  description,
}) {
  return (
    <div className="mt-6 flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/40 p-6 text-center">

      <BarChart3
        size={23}
        className="text-slate-300"
      />

      <div className="mt-3 text-sm font-black text-slate-600">
        {title}
      </div>

      <div className="mt-1 max-w-sm text-[10px] leading-5 text-slate-400">
        {description}
      </div>

    </div>
  );
}


function SearchSkeleton() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6">

      <div className="h-28 animate-pulse rounded-[24px] bg-white" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {Array.from({
          length: 4,
        }).map(
          (_, index) => (
            <div
              key={
                index
              }
              className="h-40 animate-pulse rounded-[22px] bg-white"
            />
          )
        )}

      </div>

      <div className="mt-6 h-80 animate-pulse rounded-[24px] bg-white" />

      <div className="mt-6 h-96 animate-pulse rounded-[24px] bg-white" />

    </div>
  );
}