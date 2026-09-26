"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BellRing,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Eye,
  Gauge,
  Globe2,
  MapPin,
  MousePointerClick,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  WandSparkles,
  Zap,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatCompact(value) {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value));
}

function formatPercent(value, decimals = 1) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return `${Number(value).toFixed(decimals)}%`;
}

function formatCurrency(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatStatusLabel(status) {
  if (!status || status === "unknown") {
    return "Unknown";
  }

  return status
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function safePercentage(value, total) {
  const numericValue = Number(value || 0);
  const numericTotal = Number(total || 0);

  if (numericTotal <= 0) {
    return 0;
  }

  return (numericValue / numericTotal) * 100;
}

/* =========================================================
   PAGE
========================================================= */

export default function CommandCenterPage() {
  const [range, setRange] = useState("30d");

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] = useState(new Date());

  /* =======================================================
     LOAD COMMAND CENTER
  ======================================================= */

  const loadDashboard = useCallback(
    async ({ silent = false } = {}) => {
      try {
        if (silent) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch(
          `${API_URL}/api/analytics/command-center?range=${range}`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              `Command Center API returned ${response.status}`
          );
        }

        const dashboardData =
          result?.data || result;

        setData(dashboardData);

        setLastUpdated(new Date());
      } catch (error) {
        console.error(
          "Command Center Error:",
          error
        );

        setError(
          error.message ||
            "Unable to load Command Center data."
        );

        setData(null);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [range]
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  /* =======================================================
     KPI CONFIG
  ======================================================= */

  const kpis = useMemo(() => {
    if (!data) {
      return [];
    }

    const searchConnected =
      data?.sources?.searchConsole?.connected;

    return [
      {
        label: "Total Visitors",

        value: formatNumber(
          data?.metrics?.visitors?.value
        ),

        change:
          data?.metrics?.visitors?.change,

        subtitle: "Website audience",

        icon: Users,
      },

      {
        label: "New Visitors",

        value: formatNumber(
          data?.metrics?.newUsers?.value
        ),

        change:
          data?.metrics?.newUsers?.change,

        subtitle: "First-time visitors",

        icon: UserPlus,
      },

      {
        label: "Bookings",

        value: formatNumber(
          data?.metrics?.bookings?.value
        ),

        change:
          data?.metrics?.bookings?.change,

        subtitle: "Orders received",

        icon: CalendarDays,
      },

      {
        label: "Revenue",

        value: formatCurrency(
          data?.metrics?.revenue?.value
        ),

        change:
          data?.metrics?.revenue?.change,

        subtitle: "Booking value",

        icon: CircleDollarSign,
      },

      {
        label: "Conversion",

        value:
          Number(
            data?.metrics?.visitors?.value || 0
          ) > 0
            ? formatPercent(
                data?.metrics?.conversionRate?.value,
                2
              )
            : "—",

        change:
          data?.metrics?.conversionRate?.change,

        subtitle: "Visitor → booking",

        icon: Target,
      },

      {
        label: "Google Impressions",

        value: searchConnected
          ? formatCompact(
              data?.metrics?.impressions?.value
            )
          : "Not connected",

        change: searchConnected
          ? data?.metrics?.impressions?.change
          : null,

        subtitle: "Search visibility",

        icon: Eye,
      },

      {
        label: "Google Clicks",

        value: searchConnected
          ? formatCompact(
              data?.metrics?.clicks?.value
            )
          : "Not connected",

        change: searchConnected
          ? data?.metrics?.clicks?.change
          : null,

        subtitle: "Organic search traffic",

        icon: MousePointerClick,
      },
    ];
  }, [data]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading && !data) {
    return (
      <CommandCenterSkeleton />
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (!loading && !data) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-[#f5f7fb] p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_15px_50px_rgba(15,23,42,.06)]">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <AlertTriangle size={26} />
          </div>

          <h2 className="mt-5 text-xl font-black text-[#071b3d]">
            Analytics unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error ||
              "Command Center data could not be loaded."}
          </p>

          <button
            type="button"
            onClick={() =>
              loadDashboard()
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00195f] px-5 py-3 text-xs font-black text-white transition hover:bg-[#002b75]"
          >
            <RefreshCw size={14} />

            Try Again
          </button>
        </div>
      </div>
    );
  }

  const gaConnected =
    data?.sources?.ga4?.connected;

  const gaHasData =
    data?.sources?.ga4?.hasData;

  const bookingConnected =
    data?.sources?.bookings?.connected;

  const searchConnected =
    data?.sources?.searchConsole?.connected;

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="border-b border-slate-200/80 bg-white">
        <div className="px-6 py-6 lg:px-8">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00195f] text-white">
                  <Gauge size={15} />
                </div>

                <span className="text-[11px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Rapid Control Center
                </span>

              </div>

              <h1 className="text-2xl font-black tracking-tight text-[#071b3d] sm:text-3xl">
                Command Center
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Business performance, customer demand and digital growth
                intelligence in one place.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* RANGE */}

              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">

                {RANGE_OPTIONS.map(
                  (option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setRange(option.value)
                      }
                      className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                        range === option.value
                          ? "bg-white text-[#00195f] shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  loadDashboard({
                    silent: true,
                  })
                }
                disabled={refreshing}
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-[#00195f] disabled:opacity-50"
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

          {/* =================================================
              STATUS
          ================================================= */}

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">

            <SourceStatus
              label="GA4"
              connected={gaConnected}
              hasData={gaHasData}
            />

            <SourceStatus
              label="Bookings API"
              connected={
                bookingConnected
              }
              hasData={
                data?.sources?.bookings?.hasData
              }
            />

            <SourceStatus
              label="Search Console"
              connected={
                searchConnected
              }
              hasData={
                data?.sources?.searchConsole?.hasData
              }
            />

            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
              <Clock3 size={12} />

              Updated{" "}
              {lastUpdated.toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>

          </div>

        </div>
      </div>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="space-y-6 px-6 py-6 lg:px-8">

        {/* =====================================================
            KPIs
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Business Pulse"
            title="Performance at a glance"
            description="Key indicators compared with the previous equivalent period."
          />

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">

            {kpis.map(
              (kpi, index) => (
                <MetricCard
                  key={kpi.label}
                  {...kpi}
                  index={index}
                />
              )
            )}

          </div>

        </section>

        {/* =====================================================
            TRAFFIC + GROWTH SIGNALS
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,.75fr)]">

          <DashboardCard>

            <CardHeader
              eyebrow="Audience"
              title="Traffic Momentum"
              description="Website visitors across the selected period."
              action={
                <StatusChip
                  icon={TrendingUp}
                  text={
                    gaHasData
                      ? `${formatPercent(
                          data?.metrics?.visitors?.change
                        )} growth`
                      : "Awaiting GA4 data"
                  }
                  positive={
                    Number(
                      data?.metrics?.visitors?.change || 0
                    ) >= 0
                  }
                />
              }
            />

            {data?.trafficTrend?.length >
            0 ? (
              <div className="mt-7">
                <TrafficChart
                  data={
                    data.trafficTrend
                  }
                />
              </div>
            ) : (
              <EmptyState
                title="No traffic data yet"
                description="GA4 is connected, but reporting data has not been processed yet."
              />
            )}

          </DashboardCard>

          <DashboardCard>

            <CardHeader
              eyebrow="Intelligence"
              title="Growth Signals"
              description="Business opportunities and performance warnings."
              action={
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <BellRing size={17} />
                </div>
              }
            />

            {data?.growthAlerts?.length >
            0 ? (
              <>
                <div className="mt-5 space-y-3">

                  {data.growthAlerts
                    .slice(0, 4)
                    .map(
                      (alert) => (
                        <GrowthAlert
                          key={
                            alert.id
                          }
                          alert={
                            alert
                          }
                        />
                      )
                    )}

                </div>

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-black text-[#00195f] transition hover:bg-slate-50"
                >
                  View all growth signals
                  <ArrowRight
                    size={14}
                  />
                </button>
              </>
            ) : (
              <EmptyState
                title="No growth signals yet"
                description="Signals will appear as more traffic, search and booking history becomes available."
              />
            )}

          </DashboardCard>

        </section>

        {/* =====================================================
            BOOKING OPERATIONS
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Operations"
            title="Booking intelligence"
            description="Current booking, revenue and payment performance from the Laravel booking platform."
          />

          <div className="mt-4 grid grid-cols-1 gap-6 xl:grid-cols-2">

            <BookingStatusCard
              data={
                data?.bookingAnalytics
                  ?.byStatus
              }
            />

            <PaymentStatusCard
              data={
                data?.bookingAnalytics
                  ?.byPaymentStatus
              }
            />

          </div>

        </section>

        {/* =====================================================
            TOP BRANCH + SERVICE
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {data?.topBranch ? (
            <WinnerCard
              eyebrow="Top Branch"
              title={
                data.topBranch.name
              }
              description="Highest-performing branch by booking activity."
              icon={Building2}
              metricLabel="Bookings"
              metricValue={formatNumber(
                data.topBranch
                  .bookings
              )}
              secondaryLabel="Revenue"
              secondaryValue={formatCurrency(
                data.topBranch
                  .revenue
              )}
              performanceLabel="Growth"
              performanceValue={
                typeof data
                  .topBranch.growth ===
                "number"
                  ? `${
                      data.topBranch
                        .growth >= 0
                        ? "+"
                        : ""
                    }${formatPercent(
                      data.topBranch
                        .growth
                    )}`
                  : "—"
              }
            />
          ) : (
            <EmptyWinnerCard
              title="No branch data"
              description="Branch performance will appear when booking data is available."
            />
          )}

          {data?.topService ? (
            <WinnerCard
              eyebrow="Top Service"
              title={
                data.topService.name
              }
              description="Highest-performing service by booking activity."
              icon={Sparkles}
              metricLabel="Bookings"
              metricValue={formatNumber(
                data.topService
                  .bookings
              )}
              secondaryLabel="Revenue"
              secondaryValue={formatCurrency(
                data.topService
                  .revenue
              )}
              performanceLabel="Growth"
              performanceValue={
                typeof data
                  .topService.growth ===
                "number"
                  ? `${
                      data.topService
                        .growth >= 0
                        ? "+"
                        : ""
                    }${formatPercent(
                      data.topService
                        .growth
                    )}`
                  : "—"
              }
            />
          ) : (
            <EmptyWinnerCard
              title="No service data"
              description="Service performance will appear when booking data is available."
            />
          )}

        </section>

        {/* =====================================================
            RANKINGS
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <DashboardCard>

            <CardHeader
              eyebrow="Service Intelligence"
              title="Service Performance"
              description="Services ranked by booking activity and booking value."
              action={
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Sparkles
                    size={17}
                  />
                </div>
              }
            />

            {data?.bookingAnalytics
              ?.services?.length >
            0 ? (
              <div className="mt-6 space-y-3">

                {data.bookingAnalytics.services.map(
                  (
                    service,
                    index
                  ) => (
                    <ServicePerformanceRow
                      key={
                        service.id ||
                        service.name
                      }
                      service={
                        service
                      }
                      rank={
                        index + 1
                      }
                    />
                  )
                )}

              </div>
            ) : (
              <EmptyState
                title="No service data"
                description="Service rankings will appear once bookings are available."
              />
            )}

          </DashboardCard>

          <DashboardCard>

            <CardHeader
              eyebrow="Branch Intelligence"
              title="Branch Performance"
              description="Bookings and revenue generated by each branch."
              action={
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">
                  <Building2
                    size={17}
                  />
                </div>
              }
            />

            {data?.bookingAnalytics
              ?.branches?.length >
            0 ? (
              <div className="mt-6 space-y-3">

                {data.bookingAnalytics.branches.map(
                  (
                    branch,
                    index
                  ) => (
                    <BranchPerformanceRow
                      key={
                        branch.id ||
                        branch.name
                      }
                      branch={
                        branch
                      }
                      rank={
                        index + 1
                      }
                    />
                  )
                )}

              </div>
            ) : (
              <EmptyState
                title="No branch data"
                description="Branch rankings will appear once booking data is available."
              />
            )}

          </DashboardCard>

        </section>

        {/* =====================================================
            ACQUISITION + FUNNEL
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <DashboardCard>

            <CardHeader
              eyebrow="Acquisition"
              title="Where visitors come from"
              description="Traffic contribution by acquisition channel."
              action={
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">
                  <Globe2 size={18} />
                </div>
              }
            />

            {data?.acquisition?.length >
            0 ? (
              <div className="mt-6 space-y-4">

                {data.acquisition.map(
                  (item) => (
                    <AcquisitionRow
                      key={
                        item.source
                      }
                      item={
                        item
                      }
                    />
                  )
                )}

              </div>
            ) : (
              <EmptyState
                title="No acquisition data"
                description="GA4 acquisition channels will appear when Analytics has processed traffic."
              />
            )}

          </DashboardCard>

          <DashboardCard>

            <CardHeader
              eyebrow="Conversion"
              title="Customer Journey"
              description="How visitors progress toward completed bookings."
              action={
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Target size={18} />
                </div>
              }
            />

            <div className="mt-7">

              <ConversionFunnel
                funnel={
                  data?.funnel
                }
              />

            </div>

          </DashboardCard>

        </section>

        {/* =====================================================
            GEOGRAPHY + SEARCH
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_.9fr]">

          <DashboardCard>

            <CardHeader
              eyebrow="Geography"
              title="Where demand is coming from"
              description="Top geographic markets based on website visitors."
              action={
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">
                  <MapPin size={17} />
                </div>
              }
            />

            {data?.locations?.length >
            0 ? (
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">

                <div className="grid grid-cols-[1fr_100px_80px] bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-400 sm:grid-cols-[1fr_120px_100px_100px]">

                  <span>
                    Market
                  </span>

                  <span className="text-right">
                    Visitors
                  </span>

                  <span className="hidden text-right sm:block">
                    Share
                  </span>

                  <span className="text-right">
                    Growth
                  </span>

                </div>

                {data.locations.map(
                  (
                    location,
                    index
                  ) => (
                    <div
                      key={
                        location.name
                      }
                      className={`grid grid-cols-[1fr_100px_80px] items-center px-4 py-4 text-sm sm:grid-cols-[1fr_120px_100px_100px] ${
                        index !==
                        data
                          .locations
                          .length -
                          1
                          ? "border-b border-slate-100"
                          : ""
                      }`}
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0060d0]">
                          <MapPin
                            size={
                              14
                            }
                          />
                        </div>

                        <span className="font-bold text-slate-700">
                          {
                            location.name
                          }
                        </span>

                      </div>

                      <span className="text-right font-black text-[#071b3d]">
                        {formatNumber(
                          location.visitors
                        )}
                      </span>

                      <span className="hidden text-right text-slate-400 sm:block">
                        {formatPercent(
                          location.share,
                          0
                        )}
                      </span>

                      <LocationGrowth
                        value={
                          location.growth
                        }
                      />

                    </div>
                  )
                )}

              </div>
            ) : (
              <EmptyState
                title="No geographic data"
                description="Visitor locations will appear once GA4 starts returning geographic traffic data."
              />
            )}

          </DashboardCard>

          {/* SEARCH */}

          <DashboardCard className="relative overflow-hidden">

            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />

            <div className="relative">

              <CardHeader
                eyebrow="Google Search"
                title="Search Visibility"
                description="How often Rapid appears and earns clicks from Google."
                action={
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5ff] text-[#0060d0]">
                    <Search size={17} />
                  </div>
                }
              />

              {searchConnected ? (
                <>
                  <div className="mt-7 grid grid-cols-2 gap-4">

                    <SearchMetric
                      label="Impressions"
                      value={formatCompact(
                        data?.metrics
                          ?.impressions
                          ?.value
                      )}
                      change={
                        data?.metrics
                          ?.impressions
                          ?.change
                      }
                    />

                    <SearchMetric
                      label="Clicks"
                      value={formatCompact(
                        data?.metrics
                          ?.clicks
                          ?.value
                      )}
                      change={
                        data?.metrics
                          ?.clicks
                          ?.change
                      }
                    />

                  </div>
                </>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-6">

                  <Search
                    size={24}
                    className="text-[#0060d0]"
                  />

                  <h4 className="mt-4 text-sm font-black text-[#071b3d]">
                    Connect Search Console
                  </h4>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Google impressions, clicks, CTR and search query opportunities
                    will appear here after Search Console is connected.
                  </p>

                </div>
              )}

              <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f4f8ff] to-white p-5">

                <div className="flex gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00195f] text-white">
                    <WandSparkles
                      size={16}
                    />
                  </div>

                  <div>

                    <div className="text-[10px] font-black uppercase tracking-[1.4px] text-[#0060d0]">
                      Strategic Intelligence
                    </div>

                    <p className="mt-1 text-sm font-bold leading-6 text-[#071b3d]">
                      Search opportunities will be calculated automatically.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      High-impression keywords, low CTR queries and emerging local
                      demand can later be converted into growth signals.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </DashboardCard>

        </section>

        {/* =====================================================
            EXECUTIVE SUMMARY
        ===================================================== */}

        <ExecutiveSummary
          data={data}
        />

      </main>

    </div>
  );
}

/* =========================================================
   SOURCE STATUS
========================================================= */

function SourceStatus({
  label,
  connected,
  hasData,
}) {
  let className =
    "bg-slate-100 text-slate-500";

  let text =
    "Not connected";

  if (connected && hasData) {
    className =
      "bg-emerald-50 text-emerald-600";

    text =
      "Connected";
  } else if (connected) {
    className =
      "bg-amber-50 text-amber-600";

    text =
      "Connected · waiting for data";
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-wider ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          connected && hasData
            ? "bg-emerald-500"
            : connected
            ? "bg-amber-500"
            : "bg-slate-400"
        }`}
      />

      {label}

      <span className="opacity-70">
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
        {eyebrow}
      </div>

      <h2 className="mt-1 text-lg font-black tracking-tight text-[#071b3d]">
        {title}
      </h2>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   KPI CARD
========================================================= */

function MetricCard({
  label,
  value,
  change,
  subtitle,
  icon: Icon,
  index,
}) {
  const hasChange =
    typeof change === "number";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          index * 0.035,
      }}
      className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,.035)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(15,23,42,.07)]"
    >
      <div className="flex items-start justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f2f6ff] text-[#0060d0] transition group-hover:bg-[#00195f] group-hover:text-white">
          <Icon size={17} />
        </div>

        {hasChange ? (
          <ChangeBadge
            value={change}
          />
        ) : (
          <span className="rounded-lg bg-slate-50 px-2 py-1 text-[9px] font-bold text-slate-400">
            —
          </span>
        )}

      </div>

      <div className="mt-5">

        <div
          className={`font-black tracking-tight text-[#071b3d] ${
            String(value).length >
            12
              ? "text-sm"
              : "text-2xl"
          }`}
        >
          {value}
        </div>

        <div className="mt-1 text-[11px] font-bold text-slate-600">
          {label}
        </div>

        <div className="mt-0.5 truncate text-[10px] text-slate-400">
          {subtitle}
        </div>

      </div>

    </motion.div>
  );
}

/* =========================================================
   CHANGE BADGE
========================================================= */

function ChangeBadge({
  value,
}) {
  const numericValue =
    Number(value || 0);

  const positive =
    numericValue >= 0;

  return (
    <div
      className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-black ${
        positive
          ? "bg-emerald-50 text-emerald-600"
          : "bg-rose-50 text-rose-600"
      }`}
    >
      {positive ? (
        <ArrowUpRight
          size={11}
        />
      ) : (
        <ArrowDownRight
          size={11}
        />
      )}

      {positive ? "+" : ""}

      {formatPercent(
        numericValue
      )}
    </div>
  );
}

/* =========================================================
   DASHBOARD CARD
========================================================= */

function DashboardCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.035)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   CARD HEADER
========================================================= */

function CardHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-start justify-between gap-4">

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

/* =========================================================
   STATUS CHIP
========================================================= */

function StatusChip({
  icon: Icon,
  text,
  positive,
}) {
  return (
    <div
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-black ${
        positive
          ? "bg-emerald-50 text-emerald-600"
          : "bg-rose-50 text-rose-600"
      }`}
    >
      <Icon size={12} />

      {text}
    </div>
  );
}

/* =========================================================
   BOOKING STATUS
========================================================= */

function BookingStatusCard({
  data = {},
}) {
  const statuses =
    Object.entries(data || {});

  const total =
    statuses.reduce(
      (
        sum,
        [, value]
      ) =>
        sum +
        Number(value || 0),
      0
    );

  return (
    <DashboardCard>

      <CardHeader
        eyebrow="Operations"
        title="Booking Status"
        description="Distribution of bookings by operational status."
        action={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">
            <Activity size={17} />
          </div>
        }
      />

      {statuses.length ===
      0 ? (
        <EmptyState
          title="No booking status data"
          description="No bookings were recorded during this period."
        />
      ) : (
        <div className="mt-6 space-y-3">

          {statuses.map(
            ([
              status,
              count,
            ]) => (
              <StatusRow
                key={status}
                label={formatStatusLabel(
                  status
                )}
                value={count}
                percentage={safePercentage(
                  count,
                  total
                )}
              />
            )
          )}

        </div>
      )}

    </DashboardCard>
  );
}

function StatusRow({
  label,
  value,
  percentage,
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <span className="h-2.5 w-2.5 rounded-full bg-[#0060d0]" />

          <span className="text-xs font-bold text-slate-700">
            {label}
          </span>

        </div>

        <div className="text-right">

          <span className="text-sm font-black text-[#071b3d]">
            {formatNumber(
              value
            )}
          </span>

          <span className="ml-2 text-[10px] text-slate-400">
            {formatPercent(
              percentage,
              0
            )}
          </span>

        </div>

      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200/60">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${percentage}%`,
          }}
          className="h-full rounded-full bg-[#0060d0]"
        />

      </div>

    </div>
  );
}

/* =========================================================
   PAYMENT STATUS
========================================================= */

function PaymentStatusCard({
  data = {},
}) {
  const statuses =
    Object.entries(data || {});

  const total =
    statuses.reduce(
      (
        sum,
        [, value]
      ) =>
        sum +
        Number(value || 0),
      0
    );

  return (
    <DashboardCard>

      <CardHeader
        eyebrow="Payments"
        title="Payment Status"
        description="Paid and outstanding bookings for the selected period."
        action={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <CircleDollarSign
              size={18}
            />
          </div>
        }
      />

      {statuses.length ===
      0 ? (
        <EmptyState
          title="No payment data"
          description="Payment status data is not available for this period."
        />
      ) : (
        <div className="mt-6 space-y-5">

          {statuses.map(
            ([
              status,
              value,
            ]) => {
              const percentage =
                safePercentage(
                  value,
                  total
                );

              return (
                <div
                  key={status}
                >

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-xs font-bold text-slate-700">
                      {formatStatusLabel(
                        status
                      )}
                    </span>

                    <div className="text-right">

                      <span className="text-xs font-black text-[#071b3d]">
                        {formatNumber(
                          value
                        )}
                      </span>

                      <span className="ml-2 text-[10px] text-slate-400">
                        {formatPercent(
                          percentage,
                          0
                        )}
                      </span>

                    </div>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${percentage}%`,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00195f] to-[#4fc3f7]"
                    />

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

    </DashboardCard>
  );
}

/* =========================================================
   WINNER CARD
========================================================= */

function WinnerCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  metricLabel,
  metricValue,
  secondaryLabel,
  secondaryValue,
  performanceLabel,
  performanceValue,
}) {
  return (
    <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,.035)]">

      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-50 blur-2xl" />

      <div className="relative">

        <div className="flex items-start justify-between gap-4">

          <div className="flex gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#00195f] text-white shadow-lg">
              <Icon size={19} />
            </div>

            <div>

              <div className="text-[9px] font-black uppercase tracking-[1.8px] text-[#0060d0]">
                {eyebrow}
              </div>

              <h3 className="mt-1 text-lg font-black text-[#071b3d]">
                {title}
              </h3>

              <p className="mt-0.5 text-[10px] text-slate-400">
                {description}
              </p>

            </div>

          </div>

        </div>

        <div className="mt-6 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/60 py-4">

          <WinnerMetric
            label={
              metricLabel
            }
            value={
              metricValue
            }
          />

          <WinnerMetric
            label={
              secondaryLabel
            }
            value={
              secondaryValue
            }
          />

          <WinnerMetric
            label={
              performanceLabel
            }
            value={
              performanceValue
            }
          />

        </div>

      </div>

    </div>
  );
}

function WinnerMetric({
  label,
  value,
}) {
  return (
    <div className="px-4">

      <div className="truncate text-lg font-black text-[#071b3d]">
        {value}
      </div>

      <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </div>

    </div>
  );
}

/* =========================================================
   EMPTY WINNER
========================================================= */

function EmptyWinnerCard({
  title,
  description,
}) {
  return (
    <div className="rounded-[22px] border border-dashed border-slate-200 bg-white p-6">

      <Building2
        size={24}
        className="text-slate-300"
      />

      <h3 className="mt-4 text-sm font-black text-[#071b3d]">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   SERVICE PERFORMANCE
========================================================= */

function ServicePerformanceRow({
  service,
  rank,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 px-4 py-4 transition hover:border-blue-100 hover:bg-blue-50/30">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00195f] text-xs font-black text-white">
        {String(rank).padStart(
          2,
          "0"
        )}
      </div>

      <div className="min-w-0 flex-1">

        <div className="truncate text-sm font-black text-[#071b3d]">
          {service.name}
        </div>

        <div className="mt-1 text-[10px] text-slate-400">
          {formatNumber(
            service.bookings
          )}{" "}
          bookings
        </div>

      </div>

      <div className="text-right">

        <div className="text-sm font-black text-[#071b3d]">
          {formatCurrency(
            service.revenue
          )}
        </div>

        <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
          Revenue
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   BRANCH PERFORMANCE
========================================================= */

function BranchPerformanceRow({
  branch,
  rank,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 px-4 py-4 transition hover:border-blue-100 hover:bg-blue-50/30">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-[#0060d0]">
        {String(rank).padStart(
          2,
          "0"
        )}
      </div>

      <div className="min-w-0 flex-1">

        <div className="truncate text-sm font-black text-[#071b3d]">
          {branch.name}
        </div>

        <div className="mt-1 text-[10px] text-slate-400">
          {formatNumber(
            branch.bookings
          )}{" "}
          bookings
        </div>

      </div>

      <div className="text-right">

        <div className="text-sm font-black text-[#071b3d]">
          {formatCurrency(
            branch.revenue
          )}
        </div>

        <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
          Revenue
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   ACQUISITION
========================================================= */

function AcquisitionRow({
  item,
}) {
  const share =
    Number(
      item.share || 0
    );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-3">

        <div>

          <div className="text-xs font-bold text-slate-700">
            {item.source}
          </div>

          <div className="mt-0.5 text-[10px] text-slate-400">
            {formatNumber(
              item.visitors
            )}{" "}
            visitors
          </div>

        </div>

        <div className="text-right">

          <div className="text-xs font-black text-[#071b3d]">
            {formatPercent(
              share,
              0
            )}
          </div>

          {typeof item.change ===
            "number" && (
            <div
              className={`mt-0.5 text-[9px] font-bold ${
                item.change >= 0
                  ? "text-emerald-600"
                  : "text-rose-600"
              }`}
            >
              {item.change >=
              0
                ? "+"
                : ""}

              {formatPercent(
                item.change
              )}
            </div>
          )}

        </div>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${Math.min(
              Math.max(
                share,
                0
              ),
              100
            )}%`,
          }}
          transition={{
            duration: 0.7,
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#00195f] to-[#4fc3f7]"
        />

      </div>

    </div>
  );
}

/* =========================================================
   FUNNEL
========================================================= */

function ConversionFunnel({
  funnel,
}) {
  if (!funnel) {
    return (
      <EmptyState
        title="No conversion data"
        description="Conversion data will appear when visitor and booking events are available."
      />
    );
  }

  const visitors =
    Number(
      funnel.visitors || 0
    );

  const serviceViews =
    Number(
      funnel.serviceViews || 0
    );

  const bookingStarted =
    Number(
      funnel.bookingStarted || 0
    );

  const bookingCompleted =
    Number(
      funnel.bookingCompleted || 0
    );

  if (
    visitors === 0 &&
    serviceViews === 0 &&
    bookingStarted === 0 &&
    bookingCompleted === 0
  ) {
    return (
      <EmptyState
        title="Waiting for funnel data"
        description="Bookings are connected, but GA4 visitor and booking events are not available yet."
      />
    );
  }

  const stages = [
    {
      label:
        "Website Visitors",

      value:
        visitors,

      icon:
        Users,

      width:
        100,
    },

    {
      label:
        "Service Views",

      value:
        serviceViews,

      icon:
        Eye,

      width:
        safePercentage(
          serviceViews,
          visitors
        ),
    },

    {
      label:
        "Booking Started",

      value:
        bookingStarted,

      icon:
        MousePointerClick,

      width:
        safePercentage(
          bookingStarted,
          visitors
        ),
    },

    {
      label:
        "Booking Completed",

      value:
        bookingCompleted,

      icon:
        CheckCircle2,

      width:
        safePercentage(
          bookingCompleted,
          visitors
        ),
    },
  ];

  const overallConversion =
    safePercentage(
      bookingCompleted,
      visitors
    );

  return (
    <div className="space-y-4">

      {stages.map(
        (
          stage,
          index
        ) => {
          const Icon =
            stage.icon;

          const next =
            stages[
              index + 1
            ];

          const stepConversion =
            next &&
            stage.value > 0
              ? safePercentage(
                  next.value,
                  stage.value
                )
              : null;

          return (
            <div
              key={
                stage.label
              }
            >

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[#00195f]">
                    <Icon
                      size={
                        14
                      }
                    />
                  </div>

                  <div>

                    <div className="text-xs font-bold text-slate-700">
                      {
                        stage.label
                      }
                    </div>

                    {stepConversion !==
                      null && (
                      <div className="mt-0.5 text-[9px] text-slate-400">
                        {formatPercent(
                          stepConversion
                        )}{" "}
                        continue
                      </div>
                    )}

                  </div>

                </div>

                <span className="text-sm font-black text-[#071b3d]">
                  {formatNumber(
                    stage.value
                  )}
                </span>

              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width:
                      stage.value >
                      0
                        ? `${Math.max(
                            Math.min(
                              stage.width,
                              100
                            ),
                            3
                          )}%`
                        : "0%",
                  }}
                  transition={{
                    duration:
                      0.7,

                    delay:
                      index *
                      0.08,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0060d0] to-[#4fc3f7]"
                />

              </div>

            </div>
          );
        }
      )}

      <div className="mt-5 flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3">

        <div>

          <div className="text-[9px] font-black uppercase tracking-wider text-emerald-600">
            Overall conversion
          </div>

          <div className="mt-0.5 text-[10px] text-slate-500">
            Visitor → completed booking
          </div>

        </div>

        <span className="text-lg font-black text-emerald-600">
          {visitors > 0
            ? formatPercent(
                overallConversion,
                2
              )
            : "—"}
        </span>

      </div>

    </div>
  );
}

/* =========================================================
   LOCATION GROWTH
========================================================= */

function LocationGrowth({
  value,
}) {
  if (
    typeof value !==
    "number"
  ) {
    return (
      <span className="text-right font-bold text-slate-300">
        —
      </span>
    );
  }

  return (
    <span
      className={`text-right font-bold ${
        value >= 0
          ? "text-emerald-600"
          : "text-rose-600"
      }`}
    >
      {value >= 0
        ? "+"
        : ""}

      {formatPercent(value)}
    </span>
  );
}

/* =========================================================
   SEARCH METRIC
========================================================= */

function SearchMetric({
  label,
  value,
  change,
}) {
  const hasChange =
    typeof change === "number";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </div>

      <div className="mt-2 text-2xl font-black text-[#071b3d]">
        {value}
      </div>

      {hasChange && (
        <div
          className={`mt-2 flex items-center gap-1 text-[10px] font-black ${
            change >= 0
              ? "text-emerald-600"
              : "text-rose-600"
          }`}
        >
          <TrendingUp
            size={12}
          />

          {change >= 0
            ? "+"
            : ""}

          {formatPercent(
            change
          )}
        </div>
      )}

    </div>
  );
}

/* =========================================================
   TRAFFIC CHART
========================================================= */

function TrafficChart({
  data = [],
}) {
  const width =
    900;

  const height =
    260;

  const paddingX =
    20;

  const paddingY =
    24;

  const maxValue =
    Math.max(
      ...data.map(
        (item) =>
          Number(
            item.visitors ||
              0
          )
      ),
      1
    ) * 1.12;

  const points =
    data
      .map(
        (
          item,
          index
        ) => {
          const x =
            paddingX +
            (index /
              Math.max(
                data.length -
                  1,
                1
              )) *
              (width -
                paddingX *
                  2);

          const y =
            height -
            paddingY -
            (Number(
              item.visitors ||
                0
            ) /
              maxValue) *
              (height -
                paddingY *
                  2);

          return `${x},${y}`;
        }
      )
      .join(" ");

  return (
    <div>

      <div className="relative h-[260px] w-full overflow-hidden">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >

          {[0, 1, 2, 3].map(
            (line) => {
              const y =
                paddingY +
                (line /
                  3) *
                  (height -
                    paddingY *
                      2);

              return (
                <line
                  key={line}
                  x1="0"
                  x2={
                    width
                  }
                  y1={y}
                  y2={y}
                  stroke="#e9eef6"
                  strokeWidth="1"
                  strokeDasharray="5 7"
                />
              );
            }
          )}

          <defs>

            <linearGradient
              id="trafficArea"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#0060d0"
                stopOpacity="0.2"
              />

              <stop
                offset="100%"
                stopColor="#0060d0"
                stopOpacity="0"
              />

            </linearGradient>

          </defs>

          {points && (
            <>

              <polygon
                points={`${paddingX},${
                  height -
                  paddingY
                } ${points} ${
                  width -
                  paddingX
                },${
                  height -
                  paddingY
                }`}
                fill="url(#trafficArea)"
              />

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

            </>
          )}

          {data.map(
            (
              item,
              index
            ) => {
              const x =
                paddingX +
                (index /
                  Math.max(
                    data.length -
                      1,
                    1
                  )) *
                  (width -
                    paddingX *
                      2);

              const y =
                height -
                paddingY -
                (Number(
                  item.visitors ||
                    0
                ) /
                  maxValue) *
                  (height -
                    paddingY *
                      2);

              return (
                <circle
                  key={
                    index
                  }
                  cx={x}
                  cy={y}
                  r="5"
                  fill="white"
                  stroke="#0060d0"
                  strokeWidth="3"
                />
              );
            }
          )}

        </svg>

      </div>

      <div className="mt-2 flex justify-between gap-2 text-[9px] font-semibold text-slate-400">

        {data.map(
          (
            item,
            index
          ) =>
            index % 2 ===
              0 ||
            index ===
              data.length -
                1 ? (
              <span
                key={`${item.label}-${index}`}
              >
                {
                  item.label
                }
              </span>
            ) : null
        )}

      </div>

    </div>
  );
}

/* =========================================================
   GROWTH ALERT
========================================================= */

function GrowthAlert({
  alert,
}) {
  const styles = {
    opportunity: {
      bg: "bg-blue-50/70",
      border:
        "border-blue-100",
      icon:
        "bg-blue-100 text-blue-600",
      metric:
        "text-blue-600",
      Icon:
        TrendingUp,
    },

    expansion: {
      bg: "bg-violet-50/70",
      border:
        "border-violet-100",
      icon:
        "bg-violet-100 text-violet-600",
      metric:
        "text-violet-600",
      Icon:
        MapPin,
    },

    success: {
      bg: "bg-emerald-50/70",
      border:
        "border-emerald-100",
      icon:
        "bg-emerald-100 text-emerald-600",
      metric:
        "text-emerald-600",
      Icon:
        CheckCircle2,
    },

    warning: {
      bg: "bg-amber-50/70",
      border:
        "border-amber-100",
      icon:
        "bg-amber-100 text-amber-600",
      metric:
        "text-amber-600",
      Icon:
        AlertTriangle,
    },
  };

  const style =
    styles[
      alert.type
    ] ||
    styles.opportunity;

  const Icon =
    style.Icon;

  return (
    <div
      className={`rounded-2xl border p-4 ${style.bg} ${style.border}`}
    >

      <div className="flex gap-3">

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon
            size={16}
          />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div>

              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                {
                  alert.category
                }
              </span>

              <div className="mt-0.5 text-xs font-black text-[#071b3d]">
                {
                  alert.title
                }
              </div>

            </div>

            <span
              className={`shrink-0 text-sm font-black ${style.metric}`}
            >
              {
                alert.metric
              }
            </span>

          </div>

          <p className="mt-1.5 text-[10px] leading-4 text-slate-500">
            {
              alert.description
            }
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   EXECUTIVE SUMMARY
========================================================= */

function ExecutiveSummary({
  data,
}) {
  const visitorsChange =
    data?.metrics?.visitors
      ?.change;

  const bookingChange =
    data?.metrics?.bookings
      ?.change;

  const revenueChange =
    data?.metrics?.revenue
      ?.change;

  const topBranch =
    data?.topBranch?.name;

  const topService =
    data?.topService?.name;

  let headline =
    "Business intelligence is becoming available.";

  let description =
    "As website traffic and booking history grow, the Command Center will identify stronger growth signals and business opportunities.";

  if (
    data?.metrics?.bookings
      ?.value > 0
  ) {
    headline =
      `${formatNumber(
        data.metrics.bookings
          .value
      )} bookings generated ${formatCurrency(
        data.metrics.revenue
          ?.value || 0
      )} in booking value during this period.`;

    description =
      `${
        topBranch ||
        "The leading branch"
      } currently leads branch performance${
        topService
          ? `, while ${topService} is the strongest service by booking activity`
          : ""
      }.`;
  }

  return (
    <section className="overflow-hidden rounded-[24px] bg-[#00195f] p-6 text-white shadow-[0_20px_60px_rgba(0,25,95,.18)] lg:p-7">

      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">

        <div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] text-[#7dd3fc]">
            <Zap size={14} />

            Executive Insight
          </div>

          <h2 className="mt-3 max-w-3xl text-xl font-black leading-8 sm:text-2xl">
            {headline}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
            {description}
          </p>

        </div>

        <div className="grid grid-cols-3 gap-2">

          <ExecutiveMetric
            value={
              typeof visitorsChange ===
              "number"
                ? `${
                    visitorsChange >=
                    0
                      ? "+"
                      : ""
                  }${formatPercent(
                    visitorsChange
                  )}`
                : "—"
            }
            label="Traffic"
          />

          <ExecutiveMetric
            value={
              typeof bookingChange ===
              "number"
                ? `${
                    bookingChange >=
                    0
                      ? "+"
                      : ""
                  }${formatPercent(
                    bookingChange
                  )}`
                : "—"
            }
            label="Bookings"
          />

          <ExecutiveMetric
            value={
              typeof revenueChange ===
              "number"
                ? `${
                    revenueChange >=
                    0
                      ? "+"
                      : ""
                  }${formatPercent(
                    revenueChange
                  )}`
                : "—"
            }
            label="Revenue"
          />

        </div>

      </div>

    </section>
  );
}

function ExecutiveMetric({
  value,
  label,
}) {
  return (
    <div className="min-w-[82px] rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 text-center backdrop-blur">

      <div className="text-lg font-black text-white">
        {value}
      </div>

      <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/45">
        {label}
      </div>

    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  title,
  description,
}) {
  return (
    <div className="mt-6 flex min-h-[170px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-5 text-center">

      <BarChart3
        size={25}
        className="text-slate-300"
      />

      <div className="mt-3 text-sm font-black text-slate-600">
        {title}
      </div>

      <p className="mt-1 max-w-xs text-[11px] leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function CommandCenterSkeleton() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      <div className="border-b border-slate-200 bg-white px-6 py-7 lg:px-8">

        <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />

        <div className="mt-3 h-8 w-64 animate-pulse rounded-xl bg-slate-100" />

        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />

      </div>

      <main className="space-y-6 px-6 py-6 lg:px-8">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {Array.from({
            length: 8,
          }).map(
            (_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white"
              />
            )
          )}

        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="h-80 animate-pulse rounded-[22px] border border-slate-200 bg-white" />

          <div className="h-80 animate-pulse rounded-[22px] border border-slate-200 bg-white" />

        </div>

      </main>

    </div>
  );
}