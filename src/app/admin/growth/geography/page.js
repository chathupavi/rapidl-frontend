"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import dynamic from "next/dynamic";

import {
  AlertTriangle,
  BarChart3,
  Building2,
  Clock3,
  Compass,
  MapPin,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";


/* =========================================================
   DYNAMIC MAP

   Leaflet must be loaded client-side.
========================================================= */

const SriLankaDemandMap =
  dynamic(
    () =>
      import(
        "@/components/admin/growth/SriLankaDemandMap"
      ),
    {
      ssr: false,

      loading: () => (
        <MapSkeleton />
      ),
    }
  );


/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";


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
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-US"
  ).format(
    Number(value || 0)
  );
}


function formatPercent(
  value,
  decimals = 1
) {
  return `${Number(
    value || 0
  ).toFixed(
    decimals
  )}%`;
}


function formatCurrency(value) {
  return new Intl.NumberFormat(
    "en-LK",
    {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }
  ).format(
    Number(value || 0)
  );
}


function cleanLocation(value) {
  if (
    !value ||
    value === "(not set)" ||
    value === "Unknown"
  ) {
    return "—";
  }

  return value;
}


/* =========================================================
   PAGE
========================================================= */

export default function GeographicIntelligencePage() {
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


  /* =======================================================
     LOAD DATA
  ======================================================= */

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
              `${API_URL}/api/analytics/geographic-intelligence?range=${range}`,
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


          if (!response.ok) {
            throw new Error(
              result?.error ||
                result?.message ||
                `Geographic Intelligence API returned ${response.status}`
            );
          }


          setData(
            result.data
          );

          setLastUpdated(
            new Date()
          );
        } catch (error) {
          console.error(
            "Geographic Intelligence Error:",
            error
          );

          setError(
            error.message ||
              "Unable to load geographic intelligence."
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


  /* =======================================================
     DATA
  ======================================================= */

  const overview =
    data?.overview ||
    {};

  const cities =
    data?.cities ||
    [];

  const regions =
    data?.regions ||
    [];

  const branches =
    data?.branches ||
    [];

  const marketSignals =
    data?.marketSignals ||
    [];

  const trend =
    data?.trend ||
    [];


  const validCities =
    useMemo(
      () =>
        cities.filter(
          (city) =>
            city.city &&
            city.city !==
              "(not set)" &&
            city.city !==
              "Unknown"
        ),
      [cities]
    );


  const topCities =
    useMemo(
      () =>
        validCities.slice(
          0,
          10
        ),
      [validCities]
    );


  if (
    loading &&
    !data
  ) {
    return (
      <GeographySkeleton />
    );
  }


  return (
    <div className="min-h-screen bg-[#f6f8fc]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-200/80 bg-white">

        <div className="px-6 py-6 lg:px-8">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00195f] text-white">

                  <MapPin
                    size={16}
                  />

                </div>


                <span className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Growth Intelligence
                </span>

              </div>


              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#071b3d]">
                Geographic Intelligence
              </h1>


              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Understand where digital demand is growing across Sri Lanka and identify emerging market opportunities.
              </p>

            </div>


            <div className="flex flex-wrap items-center gap-3">

              {/* RANGE */}

              <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">

                {RANGE_OPTIONS.map(
                  (option) => (
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

                      className={`rounded-lg px-4 py-2 text-[10px] font-black transition ${
                        range ===
                        option.value
                          ? "bg-white text-[#00195f] shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {
                        option.label
                      }
                    </button>
                  )
                )}

              </div>


              {/* REFRESH */}

              <button
                type="button"

                onClick={() =>
                  loadData(
                    true
                  )
                }

                disabled={
                  refreshing
                }

                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300"
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


          {/* STATUS */}

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">

            <CountryScopeBadge />

            <SourceStatus
              name="GA4"
              source={
                data?.sources
                  ?.ga4
              }
            />

            <SourceStatus
              name="Bookings"
              source={
                data?.sources
                  ?.bookings
              }
            />


            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">

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


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="space-y-7 px-6 py-6 lg:px-8">

        {/* =====================================================
            NOTICE
        ===================================================== */}

        <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm">

          <Compass
            size={16}
            className="mt-0.5 shrink-0 text-[#0060d0]"
          />

          <p className="text-[11px] leading-5 text-slate-500">

            This dashboard is limited to{" "}

            <strong className="text-[#071b3d]">
              Sri Lanka
            </strong>.

            GA4 city locations are approximate network-based market signals rather than exact GPS positions.

          </p>

        </div>


        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">

            <AlertTriangle
              size={17}
            />

            {error}

          </div>
        )}


        {/* =====================================================
            KPI CARDS
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <GeoMetric
            label="Sri Lanka Visitors"

            value={formatNumber(
              overview.totalUsers
            )}

            icon={Users}

            description="Visitors detected in Sri Lanka"
          />


          <GeoMetric
            label="Sessions"

            value={formatNumber(
              overview.totalSessions
            )}

            icon={
              TrendingUp
            }

            description="Sri Lankan website sessions"
          />


          <GeoMetric
            label="Cities Detected"

            value={formatNumber(
              overview.citiesTracked
            )}

            icon={
              MapPin
            }

            description="Approximate city markets"
          />


          <GeoMetric
            label="Bookings"

            value={formatNumber(
              overview.bookings
            )}

            icon={
              Building2
            }

            description="Customer bookings"
          />


          <GeoMetric
            label="Booking Value"

            value={formatCurrency(
              overview.revenue
            )}

            icon={
              WalletCards
            }

            description="Selected period"
          />

        </section>


        {/* =====================================================
            MAP
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Market Map"

            title="Sri Lanka Digital Demand"

            description="Traffic concentration across Sri Lankan cities. Larger markers indicate stronger visitor activity."
          />


          <div className="mt-4">

            <SriLankaDemandMap
              cities={
                validCities
              }
            />

          </div>

        </section>


        {/* =====================================================
            LEADERS
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Leadership View"

            title="Strongest Markets"

            description="Current leaders across digital traffic and booking demand."
          />


          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            <MarketLeader
              title="Top City"

              value={cleanLocation(
                data?.leaders
                  ?.topCity
                  ?.city
              )}

              detail={
                data?.leaders
                  ?.topCity
                  ? `${formatNumber(
                      data.leaders
                        .topCity
                        .activeUsers
                    )} visitors`
                  : "No data"
              }

              icon={
                MapPin
              }
            />


            <MarketLeader
              title="Top Region"

              value={cleanLocation(
                data?.leaders
                  ?.topRegion
                  ?.region
              )}

              detail={
                data?.leaders
                  ?.topRegion
                  ? `${formatNumber(
                      data.leaders
                        .topRegion
                        .activeUsers
                    )} visitors`
                  : "No data"
              }

              icon={
                Target
              }
            />


            <MarketLeader
              title="Top Booking Branch"

              value={
                data?.leaders
                  ?.topBranch
                  ?.name ||
                "—"
              }

              detail={
                data?.leaders
                  ?.topBranch
                  ? `${formatNumber(
                      data.leaders
                        .topBranch
                        .bookings
                    )} bookings · ${formatCurrency(
                      data.leaders
                        .topBranch
                        .revenue
                    )}`
                  : "No booking data"
              }

              icon={
                Building2
              }
            />

          </div>

        </section>


        {/* =====================================================
            TREND
        ===================================================== */}

        <GeoCard>

          <CardHeader
            eyebrow="Momentum"

            title="Sri Lanka Traffic Momentum"

            description="Visitor activity across Sri Lanka during the selected reporting period."
          />


          {trend.length ? (
            <div className="mt-7">

              <GeographicTrendChart
                data={
                  trend
                }
              />

            </div>
          ) : (
            <EmptyState
              title="No geographic trend yet"

              description="Sri Lanka traffic history will appear as GA4 collects visitor activity."
            />
          )}

        </GeoCard>


        {/* =====================================================
            CITY + REGION
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.35fr_.65fr]">

          {/* CITY */}

          <GeoCard>

            <CardHeader
              eyebrow="Cities"

              title="City Demand Ranking"

              description="Approximate Sri Lankan cities generating the strongest traffic."
            />


            {topCities.length ? (
              <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">

                <div className="min-w-[700px]">

                  <div className="grid grid-cols-[1fr_100px_100px_110px_100px] bg-slate-50 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">

                    <span>
                      City
                    </span>

                    <span className="text-right">
                      Visitors
                    </span>

                    <span className="text-right">
                      Sessions
                    </span>

                    <span className="text-right">
                      Engagement
                    </span>

                    <span className="text-right">
                      Share
                    </span>

                  </div>


                  {topCities.map(
                    (
                      city,
                      index
                    ) => (

                      <CityRow
                        key={`${city.city}-${index}`}

                        city={
                          city
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
                title="No city data"

                description="Sri Lankan city demand will appear as GA4 collects more traffic."
              />
            )}

          </GeoCard>


          {/* REGION */}

          <GeoCard>

            <CardHeader
              eyebrow="Regions"

              title="Regional Distribution"

              description="Sri Lankan traffic concentration by region."
            />


            {regions.length ? (
              <div className="mt-6 space-y-5">

                {regions
                  .filter(
                    (region) =>
                      region.region &&
                      region.region !==
                        "(not set)" &&
                      region.region !==
                        "Unknown"
                  )
                  .slice(
                    0,
                    9
                  )
                  .map(
                    (
                      region,
                      index
                    ) => (

                      <RankBar
                        key={`${region.region}-${index}`}

                        label={
                          region.region
                        }

                        value={
                          region.activeUsers
                        }

                        max={
                          regions[0]
                            ?.activeUsers ||
                          1
                        }
                      />

                    )
                  )}

              </div>
            ) : (
              <EmptyState
                title="No regional data"

                description="Regional distribution will appear when GA4 has enough Sri Lankan traffic."
              />
            )}

          </GeoCard>

        </section>


        {/* =====================================================
            MARKET SIGNALS
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Opportunity"

            title="Market Opportunity Signals"

            description="Directional demand scores based on traffic share, engagement and session activity."
          />


          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {marketSignals.length ? (
              marketSignals
                .slice(
                  0,
                  6
                )
                .map(
                  (
                    market,
                    index
                  ) => (

                    <MarketSignal
                      key={`${market.city}-${index}`}

                      market={
                        market
                      }

                      rank={
                        index + 1
                      }
                    />

                  )
                )
            ) : (
              <div className="md:col-span-2 xl:col-span-3">

                <EmptyState
                  title="No market opportunities yet"

                  description="Opportunity scoring will become more meaningful as Sri Lankan traffic grows."
                />

              </div>
            )}

          </div>

        </section>


        {/* =====================================================
            BRANCH DEMAND
        ===================================================== */}

        <BranchDemand
          branches={
            branches
          }
        />

      </main>

    </div>
  );
}


/* =========================================================
   KPI
========================================================= */

function GeoMetric({
  label,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

        <Icon
          size={17}
        />

      </div>


      <div className="mt-5 truncate text-2xl font-black tracking-tight text-[#071b3d]">
        {value}
      </div>


      <div className="mt-1 text-[11px] font-black text-slate-700">
        {label}
      </div>


      <div className="mt-1 text-[9px] text-slate-400">
        {description}
      </div>

    </div>
  );
}


/* =========================================================
   MARKET LEADER
========================================================= */

function MarketLeader({
  title,
  value,
  detail,
  icon: Icon,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_25px_rgba(15,23,42,.03)]">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

        <Icon
          size={15}
        />

      </div>


      <div className="mt-4 text-[9px] font-black uppercase tracking-[1.5px] text-slate-400">
        {title}
      </div>


      <div className="mt-1 truncate text-base font-black text-[#071b3d]">
        {value}
      </div>


      <div className="mt-1 truncate text-[10px] text-slate-400">
        {detail}
      </div>

    </div>
  );
}


/* =========================================================
   CITY ROW
========================================================= */

function CityRow({
  city,
  index,
}) {
  return (
    <div className="grid grid-cols-[1fr_100px_100px_110px_100px] items-center border-t border-slate-100 px-4 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#0060d0]">

          {index + 1}

        </div>


        <div>

          <div className="text-xs font-black text-slate-700">
            {
              city.city
            }
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">
            Sri Lanka
          </div>

        </div>

      </div>


      <span className="text-right text-xs font-black text-[#071b3d]">
        {formatNumber(
          city.activeUsers
        )}
      </span>


      <span className="text-right text-xs font-bold text-slate-500">
        {formatNumber(
          city.sessions
        )}
      </span>


      <span className="text-right text-xs font-bold text-slate-500">
        {formatPercent(
          city.engagementRate
        )}
      </span>


      <span className="text-right text-xs font-black text-[#0060d0]">
        {formatPercent(
          city.share
        )}
      </span>

    </div>
  );
}


/* =========================================================
   REGION BAR
========================================================= */

function RankBar({
  label,
  value,
  max,
}) {
  const width =
    Math.max(
      3,

      Math.min(
        (
          Number(
            value || 0
          ) /
          Number(
            max || 1
          )
        ) * 100,

        100
      )
    );


  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-3">

        <span className="truncate text-xs font-black text-slate-600">
          {label}
        </span>


        <span className="text-xs font-black text-[#071b3d]">
          {formatNumber(
            value
          )}
        </span>

      </div>


      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          style={{
            width:
              `${width}%`,
          }}

          className="h-full rounded-full bg-gradient-to-r from-[#00195f] via-[#0060d0] to-[#4fc3f7]"
        />

      </div>

    </div>
  );
}


/* =========================================================
   MARKET SIGNAL
========================================================= */

function MarketSignal({
  market,
  rank,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_6px_25px_rgba(15,23,42,.03)]">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00195f] text-[10px] font-black text-white">
          #{rank}
        </div>


        <div className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black text-[#0060d0]">
          {market.score}/100
        </div>

      </div>


      <div className="mt-5 text-lg font-black text-[#071b3d]">
        {
          market.city
        }
      </div>


      <div className="mt-4 grid grid-cols-3 gap-3">

        <MiniMetric
          label="Visitors"

          value={formatNumber(
            market.activeUsers
          )}
        />


        <MiniMetric
          label="Share"

          value={formatPercent(
            market.share
          )}
        />


        <MiniMetric
          label="Engage"

          value={formatPercent(
            market.engagementRate
          )}
        />

      </div>


      <div className="mt-4 border-t border-slate-100 pt-3 text-[9px] leading-5 text-slate-400">

        Directional signal only. Confirm expansion potential with customer addresses and booking demand.

      </div>

    </div>
  );
}


/* =========================================================
   BRANCH DEMAND
========================================================= */

function BranchDemand({
  branches,
}) {
  return (
    <GeoCard>

      <CardHeader
        eyebrow="Physical Demand"

        title="Branch Booking Performance"

        description="Current booking demand across Rapid Laundromat branches."
      />


      {branches.length ? (
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">

          {branches
            .slice(
              0,
              8
            )
            .map(
              (
                branch,
                index
              ) => (

                <div
                  key={`${branch.id}-${index}`}

                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/40 px-4 py-4"
                >

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

                      <Building2
                        size={14}
                      />

                    </div>


                    <div className="min-w-0">

                      <div className="truncate text-xs font-black text-slate-700">
                        {
                          branch.name
                        }
                      </div>

                      <div className="mt-1 text-[9px] text-slate-400">
                        {formatNumber(
                          branch.bookings
                        )}{" "}
                        bookings
                      </div>

                    </div>

                  </div>


                  <div className="ml-5 whitespace-nowrap text-xs font-black text-[#071b3d]">
                    {formatCurrency(
                      branch.revenue
                    )}
                  </div>

                </div>

              )
            )}

        </div>
      ) : (
        <EmptyState
          title="No branch demand"

          description="Booking performance will appear when customer bookings are available."
        />
      )}

    </GeoCard>
  );
}


/* =========================================================
   TREND
========================================================= */

function GeographicTrendChart({
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
            item.activeUsers ||
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
            (
              index /
              Math.max(
                data.length -
                  1,

                1
              )
            ) *
              (
                width -
                padding *
                  2
              );


          const y =
            height -
            padding -
            (
              Number(
                item.activeUsers ||
                  0
              ) /
              max
            ) *
              (
                height -
                padding *
                  2
              );


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
            (index) => {

              const y =
                padding +
                (
                  index /
                  3
                ) *
                  (
                    height -
                    padding *
                      2
                  );


              return (
                <line
                  key={
                    index
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
              ?.label
          }
        </span>


        <span>
          Sri Lanka visitor activity
        </span>


        <span>
          {
            data[
              data.length -
                1
            ]?.label
          }
        </span>

      </div>

    </div>
  );
}


/* =========================================================
   STATUS
========================================================= */

function CountryScopeBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#0060d0]">

      🇱🇰 Sri Lanka Only

    </div>
  );
}


function SourceStatus({
  name,
  source,
}) {
  const connected =
    source?.connected;

  const hasData =
    source?.hasData;


  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-wider ${
        !connected
          ? "bg-slate-100 text-slate-500"
          : hasData
          ? "bg-emerald-50 text-emerald-600"
          : "bg-amber-50 text-amber-600"
      }`}
    >

      <span
        className={`h-1.5 w-1.5 rounded-full ${
          !connected
            ? "bg-slate-400"
            : hasData
            ? "bg-emerald-500"
            : "bg-amber-500"
        }`}
      />

      {name}

      {connected
        ? hasData
          ? " Connected"
          : " Waiting"
        : " Offline"}

    </div>
  );
}


/* =========================================================
   COMMON UI
========================================================= */

function GeoCard({
  children,
}) {
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.035)] sm:p-6">

      {children}

    </div>
  );
}


function CardHeader({
  eyebrow,
  title,
  description,
}) {
  return (
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
  );
}


function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>

      <div className="text-[9px] font-black uppercase tracking-[1.8px] text-[#0060d0]">
        {eyebrow}
      </div>


      <h2 className="mt-1 text-lg font-black text-[#071b3d]">
        {title}
      </h2>


      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>

    </div>
  );
}


function MiniMetric({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <div className="text-sm font-black text-[#071b3d]">
        {value}
      </div>


      <div className="mt-1 text-[8px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </div>

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


/* =========================================================
   MAP SKELETON
========================================================= */

function MapSkeleton() {
  return (
    <div className="flex h-[560px] items-center justify-center rounded-[24px] border border-slate-200 bg-white">

      <div className="text-center">

        <div className="mx-auto h-10 w-10 animate-pulse rounded-full bg-blue-100" />

        <div className="mt-4 text-xs font-black text-slate-500">
          Loading Sri Lanka map
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PAGE SKELETON
========================================================= */

function GeographySkeleton() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6">

      <div className="h-28 animate-pulse rounded-[24px] bg-white" />


      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {Array.from({
          length: 5,
        }).map(
          (
            _,
            index
          ) => (

            <div
              key={
                index
              }

              className="h-40 animate-pulse rounded-[22px] bg-white"
            />

          )
        )}

      </div>


      <div className="mt-6 h-[560px] animate-pulse rounded-[24px] bg-white" />

    </div>
  );
}