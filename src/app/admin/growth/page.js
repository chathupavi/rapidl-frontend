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
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function formatCompact(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
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

function calculateHealthScore(data) {
  if (!data) {
    return 0;
  }

  let score = 50;

  const bookings =
    Number(data?.metrics?.bookings?.change || 0);

  const revenue =
    Number(data?.metrics?.revenue?.change || 0);

  const visitors =
    Number(data?.metrics?.visitors?.change || 0);

  const search =
    Number(data?.metrics?.clicks?.change || 0);

  if (bookings > 0) score += 12;
  if (bookings < 0) score -= 12;

  if (revenue > 0) score += 15;
  if (revenue < 0) score -= 15;

  if (visitors > 0) score += 10;
  if (visitors < 0) score -= 10;

  if (search > 0) score += 8;
  if (search < 0) score -= 8;

  return Math.max(
    0,
    Math.min(100, score)
  );
}

function getHealthLabel(score) {
  if (score >= 85) {
    return {
      label: "Excellent",
      text: "Strong business momentum",
    };
  }

  if (score >= 70) {
    return {
      label: "Healthy",
      text: "Positive overall performance",
    };
  }

  if (score >= 55) {
    return {
      label: "Stable",
      text: "Performance is broadly stable",
    };
  }

  if (score >= 40) {
    return {
      label: "Watch",
      text: "Some areas need management attention",
    };
  }

  return {
    label: "At Risk",
    text: "Multiple performance areas require attention",
  };
}

/* =========================================================
   PAGE
========================================================= */

export default function ExecutiveOverviewPage() {
  const [range, setRange] = useState("30d");

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  /* =======================================================
     LOAD DATA

     You can later replace this with:
     /api/analytics/executive-overview
     
     For now it can reuse command-center data.
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
              `Analytics API returned ${response.status}`
          );
        }

        setData(
          result?.data || result
        );

        setLastUpdated(
          new Date()
        );
      } catch (error) {
        console.error(
          "Executive Overview Error:",
          error
        );

        setError(
          error.message ||
            "Unable to load executive analytics."
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
     DERIVED
  ======================================================= */

  const healthScore =
    useMemo(
      () =>
        calculateHealthScore(
          data
        ),
      [data]
    );

  const health =
    getHealthLabel(
      healthScore
    );

  const executiveMetrics =
    useMemo(() => {
      if (!data) {
        return [];
      }

      return [
        {
          label: "Revenue",
          value: formatCurrency(
            data?.metrics?.revenue
              ?.value
          ),
          change:
            data?.metrics?.revenue
              ?.change,
          icon: CircleDollarSign,
          description:
            "Total booking value",
        },

        {
          label: "Bookings",
          value: formatNumber(
            data?.metrics?.bookings
              ?.value
          ),
          change:
            data?.metrics?.bookings
              ?.change,
          icon: CalendarDays,
          description:
            "Customer orders",
        },

        {
          label: "Visitors",
          value: formatCompact(
            data?.metrics?.visitors
              ?.value
          ),
          change:
            data?.metrics?.visitors
              ?.change,
          icon: Users,
          description:
            "Website audience",
        },

        {
          label: "Conversion",
          value:
            Number(
              data?.metrics?.visitors
                ?.value || 0
            ) > 0
              ? formatPercent(
                  data?.metrics
                    ?.conversionRate
                    ?.value,
                  2
                )
              : "—",
          change:
            data?.metrics
              ?.conversionRate
              ?.change,
          icon: Target,
          description:
            "Visitor → booking",
        },

        {
          label: "Search Clicks",
          value: formatCompact(
            data?.metrics?.clicks
              ?.value
          ),
          change:
            data?.metrics?.clicks
              ?.change,
          icon: MousePointerClick,
          description:
            "Google organic traffic",
        },
      ];
    }, [data]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading &&
    !data
  ) {
    return (
      <ExecutiveOverviewSkeleton />
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
      <div className="flex min-h-[80vh] items-center justify-center bg-[#f5f7fb] p-6">

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <AlertTriangle
              size={26}
            />
          </div>

          <h2 className="mt-5 text-xl font-black text-[#071b3d]">
            Executive analytics unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            onClick={() =>
              loadDashboard()
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00195f] px-5 py-3 text-xs font-black text-white"
          >
            <RefreshCw size={14} />
            Try Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-200/80 bg-white">

        <div className="px-6 py-6 lg:px-8">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00195f] text-white">
                  <TrendingUp
                    size={15}
                  />
                </div>

                <span className="text-[11px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Growth Intelligence
                </span>

              </div>

              <h1 className="text-2xl font-black tracking-tight text-[#071b3d] sm:text-3xl">
                Executive Overview
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                A leadership view of business health, growth momentum,
                market performance and strategic opportunities.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">

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
                      className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                        range ===
                        option.value
                          ? "bg-white text-[#00195f] shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:text-slate-900"
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
                type="button"
                onClick={() =>
                  loadDashboard({
                    silent: true,
                  })
                }
                disabled={
                  refreshing
                }
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 shadow-sm transition hover:text-[#00195f] disabled:opacity-50"
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

          <div className="mt-5 flex items-center border-t border-slate-100 pt-4 text-[10px] font-semibold text-slate-400">

            <Clock3
              size={12}
            />

            <span className="ml-1.5">
              Last updated{" "}
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

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="space-y-6 px-6 py-6 lg:px-8">

        {/* =====================================================
            HEALTH HERO
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">

          <BusinessHealthCard
            score={
              healthScore
            }
            health={
              health
            }
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            {executiveMetrics.map(
              (
                metric,
                index
              ) => (
                <ExecutiveMetricCard
                  key={
                    metric.label
                  }
                  {...metric}
                  index={
                    index
                  }
                />
              )
            )}

          </div>

        </section>

        {/* =====================================================
            EXECUTIVE NARRATIVE
        ===================================================== */}

        <ExecutiveNarrative
          data={data}
        />

        {/* =====================================================
            BUSINESS MOMENTUM
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.6fr)_minmax(340px,.8fr)]">

          <ExecutiveCard>

            <ExecutiveCardHeader
              eyebrow="Momentum"
              title="Business Growth"
              description="Website demand and booking activity across the selected period."
              action={
                <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black text-emerald-600">
                  Period Trend
                </div>
              }
            />

            {data?.trafficTrend
              ?.length > 0 ? (
              <div className="mt-7">
                <MomentumChart
                  data={
                    data.trafficTrend
                  }
                />
              </div>
            ) : (
              <EmptyState
                title="Momentum data is developing"
                description="The trend becomes more useful as GA4 collects additional historical traffic."
              />
            )}

          </ExecutiveCard>

          <PerformanceSnapshot
            data={data}
          />

        </section>

        {/* =====================================================
            WINNERS
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Performance Leaders"
            title="What's driving the business"
            description="The strongest branch, service, market and acquisition channel."
          />

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <LeadershipWinner
              icon={
                Building2
              }
              eyebrow="Top Branch"
              title={
                data?.topBranch
                  ?.name ||
                "No branch data"
              }
              metric={
                data?.topBranch
                  ? `${formatNumber(
                      data.topBranch
                        .bookings
                    )} bookings`
                  : "—"
              }
              secondary={
                data?.topBranch
                  ? formatCurrency(
                      data.topBranch
                        .revenue
                    )
                  : "—"
              }
            />

            <LeadershipWinner
              icon={
                Sparkles
              }
              eyebrow="Top Service"
              title={
                data?.topService
                  ?.name ||
                "No service data"
              }
              metric={
                data?.topService
                  ? `${formatNumber(
                      data.topService
                        .bookings
                    )} bookings`
                  : "—"
              }
              secondary={
                data?.topService
                  ? formatCurrency(
                      data.topService
                        .revenue
                    )
                  : "—"
              }
            />

            <LeadershipWinner
              icon={MapPin}
              eyebrow="Top Market"
              title={
                data?.locations?.[0]
                  ?.name ||
                "No market data"
              }
              metric={
                data?.locations?.[0]
                  ? `${formatNumber(
                      data.locations[0]
                        .visitors
                    )} visitors`
                  : "—"
              }
              secondary={
                data?.locations?.[0]
                  ? formatPercent(
                      data.locations[0]
                        .share,
                      0
                    )
                  : "—"
              }
            />

            <LeadershipWinner
              icon={Globe2}
              eyebrow="Top Channel"
              title={
                data?.acquisition?.[0]
                  ?.source ||
                "No channel data"
              }
              metric={
                data?.acquisition?.[0]
                  ? `${formatNumber(
                      data.acquisition[0]
                        .visitors
                    )} visitors`
                  : "—"
              }
              secondary={
                data?.acquisition?.[0]
                  ? formatPercent(
                      data.acquisition[0]
                        .share,
                      0
                    )
                  : "—"
              }
            />

          </div>

        </section>

        {/* =====================================================
            BRANCH + SERVICE
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <ExecutiveCard>

            <ExecutiveCardHeader
              eyebrow="Branches"
              title="Branch Performance"
              description="Leadership ranking based on bookings and revenue."
              action={
                <ArrowLink
                  label="Branch Intelligence"
                />
              }
            />

            {data?.bookingAnalytics
              ?.branches?.length >
            0 ? (
              <div className="mt-6 space-y-3">

                {data.bookingAnalytics.branches
                  .slice(
                    0,
                    5
                  )
                  .map(
                    (
                      branch,
                      index
                    ) => (
                      <LeaderboardRow
                        key={
                          branch.id
                        }
                        rank={
                          index +
                          1
                        }
                        title={
                          branch.name
                        }
                        primary={`${formatNumber(
                          branch.bookings
                        )} bookings`}
                        secondary={formatCurrency(
                          branch.revenue
                        )}
                      />
                    )
                  )}

              </div>
            ) : (
              <EmptyState
                title="No branch performance yet"
                description="Branch rankings will appear as booking volume grows."
              />
            )}

          </ExecutiveCard>

          <ExecutiveCard>

            <ExecutiveCardHeader
              eyebrow="Services"
              title="Service Performance"
              description="Which services are generating the strongest customer demand."
              action={
                <ArrowLink
                  label="Service Demand"
                />
              }
            />

            {data?.bookingAnalytics
              ?.services?.length >
            0 ? (
              <div className="mt-6 space-y-3">

                {data.bookingAnalytics.services
                  .slice(
                    0,
                    5
                  )
                  .map(
                    (
                      service,
                      index
                    ) => (
                      <LeaderboardRow
                        key={
                          service.id
                        }
                        rank={
                          index +
                          1
                        }
                        title={
                          service.name
                        }
                        primary={`${formatNumber(
                          service.bookings
                        )} bookings`}
                        secondary={formatCurrency(
                          service.revenue
                        )}
                      />
                    )
                  )}

              </div>
            ) : (
              <EmptyState
                title="No service performance yet"
                description="Service rankings will appear as booking data grows."
              />
            )}

          </ExecutiveCard>

        </section>

        {/* =====================================================
            DIGITAL GROWTH
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <AcquisitionSummary
            data={
              data?.acquisition ||
              []
            }
          />

          <SearchSummary
            data={data}
          />

          <GeographicSummary
            data={
              data?.locations ||
              []
            }
          />

        </section>

        {/* =====================================================
            STRATEGIC PRIORITIES
        ===================================================== */}

        <StrategicPriorities
          data={data}
        />

      </main>

    </div>
  );
}

/* =========================================================
   BUSINESS HEALTH
========================================================= */

function BusinessHealthCard({
  score,
  health,
}) {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#00195f] p-6 text-white shadow-[0_18px_55px_rgba(0,25,95,.2)]">

      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#0060d0]/30 blur-3xl" />

      <div className="relative">

        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[2px] text-sky-300">
          <Gauge size={14} />
          Business Health
        </div>

        <div className="mt-6 flex items-end gap-2">

          <div className="text-5xl font-black tracking-tight">
            {score}
          </div>

          <div className="pb-1 text-sm font-black text-white/40">
            /100
          </div>

        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

          <motion.div
            initial={{
              width: 0,
            }}
            animate={{
              width: `${score}%`,
            }}
            transition={{
              duration: 0.8,
            }}
            className="h-full rounded-full bg-gradient-to-r from-sky-300 to-white"
          />

        </div>

        <div className="mt-5">

          <div className="text-lg font-black">
            {
              health.label
            }
          </div>

          <div className="mt-1 text-xs leading-5 text-white/55">
            {
              health.text
            }
          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   EXECUTIVE KPI
========================================================= */

function ExecutiveMetricCard({
  label,
  value,
  change,
  icon: Icon,
  description,
  index,
}) {
  const hasChange =
    typeof change ===
    "number";

  const positive =
    Number(change || 0) >=
    0;

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
          index * 0.04,
      }}
      className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]"
    >

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">
          <Icon size={17} />
        </div>

        {hasChange && (
          <div
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-black ${
              positive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >

            {positive ? (
              <ArrowUpRight size={10} />
            ) : (
              <ArrowDownRight size={10} />
            )}

            {positive
              ? "+"
              : ""}

            {formatPercent(
              change
            )}

          </div>
        )}

      </div>

      <div className="mt-6 text-2xl font-black tracking-tight text-[#071b3d]">
        {value}
      </div>

      <div className="mt-1 text-[11px] font-black text-slate-700">
        {label}
      </div>

      <div className="mt-1 text-[10px] text-slate-400">
        {description}
      </div>

    </motion.div>
  );
}

/* =========================================================
   EXECUTIVE NARRATIVE
========================================================= */

function ExecutiveNarrative({
  data,
}) {
  const bookings =
    data?.metrics?.bookings
      ?.value || 0;

  const revenue =
    data?.metrics?.revenue
      ?.value || 0;

  const topBranch =
    data?.topBranch?.name;

  const topService =
    data?.topService?.name;

  let headline =
    "Business intelligence is building.";

  let body =
    "More historical traffic, search and booking data will improve strategic recommendations.";

  if (
    Number(bookings) >
    0
  ) {
    headline =
      `${formatNumber(
        bookings
      )} bookings generated ${formatCurrency(
        revenue
      )} in booking value.`;

    body =
      `${topBranch || "The leading branch"} is currently the strongest location${
        topService
          ? `, while ${topService} leads service demand`
          : ""
      }. Continue monitoring digital demand and conversion as traffic volume grows.`;
  }

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-blue-100 bg-gradient-to-br from-[#eef5ff] via-white to-white p-6 lg:p-7">

      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-100 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-3xl">

          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[2px] text-[#0060d0]">
            <Zap size={13} />
            Executive Readout
          </div>

          <h2 className="mt-3 text-xl font-black leading-8 text-[#071b3d] sm:text-2xl">
            {headline}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {body}
          </p>

        </div>

        <button className="flex shrink-0 items-center gap-2 rounded-xl bg-[#00195f] px-5 py-3 text-xs font-black text-white">
          View Full Report
          <ArrowRight size={14} />
        </button>

      </div>

    </section>
  );
}

/* =========================================================
   PERFORMANCE SNAPSHOT
========================================================= */

function PerformanceSnapshot({
  data,
}) {
  const items = [
    {
      label:
        "Revenue Growth",
      value:
        data?.metrics?.revenue
          ?.change,
    },
    {
      label:
        "Booking Growth",
      value:
        data?.metrics?.bookings
          ?.change,
    },
    {
      label:
        "Traffic Growth",
      value:
        data?.metrics?.visitors
          ?.change,
    },
    {
      label:
        "Search Growth",
      value:
        data?.metrics?.clicks
          ?.change,
    },
  ];

  return (
    <ExecutiveCard>

      <ExecutiveCardHeader
        eyebrow="Leadership"
        title="Performance Snapshot"
        description="Period-over-period movement across key growth indicators."
      />

      <div className="mt-6 space-y-3">

        {items.map(
          (item) => {
            const value =
              Number(
                item.value ||
                  0
              );

            const positive =
              value >= 0;

            return (
              <div
                key={
                  item.label
                }
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-4"
              >

                <span className="text-xs font-bold text-slate-600">
                  {
                    item.label
                  }
                </span>

                <span
                  className={`flex items-center gap-1 text-sm font-black ${
                    positive
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight size={13} />
                  ) : (
                    <ArrowDownRight size={13} />
                  )}

                  {positive
                    ? "+"
                    : ""}

                  {formatPercent(
                    value
                  )}
                </span>

              </div>
            );
          }
        )}

      </div>

    </ExecutiveCard>
  );
}

/* =========================================================
   LEADERSHIP WINNER
========================================================= */

function LeadershipWinner({
  icon: Icon,
  eyebrow,
  title,
  metric,
  secondary,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00195f] text-white">
        <Icon size={17} />
      </div>

      <div className="mt-5 text-[9px] font-black uppercase tracking-[1.7px] text-[#0060d0]">
        {eyebrow}
      </div>

      <div className="mt-1 truncate text-sm font-black text-[#071b3d]">
        {title}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">

        <div className="text-xs font-bold text-slate-500">
          {metric}
        </div>

        <div className="text-sm font-black text-[#071b3d]">
          {secondary}
        </div>

      </div>

    </div>
  );
}

/* =========================================================
   LEADERBOARD
========================================================= */

function LeaderboardRow({
  rank,
  title,
  primary,
  secondary,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 px-4 py-4 transition hover:border-blue-100 hover:bg-blue-50/30">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-[#0060d0]">
        {String(
          rank
        ).padStart(
          2,
          "0"
        )}
      </div>

      <div className="min-w-0 flex-1">

        <div className="truncate text-sm font-black text-[#071b3d]">
          {title}
        </div>

        <div className="mt-1 text-[10px] text-slate-400">
          {primary}
        </div>

      </div>

      <div className="text-sm font-black text-[#071b3d]">
        {secondary}
      </div>

    </div>
  );
}

/* =========================================================
   ACQUISITION SUMMARY
========================================================= */

function AcquisitionSummary({
  data,
}) {
  return (
    <ExecutiveCard>

      <ExecutiveCardHeader
        eyebrow="Acquisition"
        title="Traffic Mix"
        description="Where website demand is coming from."
      />

      {data.length >
      0 ? (
        <div className="mt-6 space-y-4">

          {data
            .slice(
              0,
              5
            )
            .map(
              (
                item,
                index
              ) => (
                <MiniPerformanceRow
                  key={
                    item.source
                  }
                  label={
                    item.source
                  }
                  value={formatPercent(
                    item.share,
                    0
                  )}
                  sub={`${formatNumber(
                    item.visitors
                  )} visitors`}
                  width={
                    item.share
                  }
                />
              )
            )}

        </div>
      ) : (
        <EmptyState
          title="Acquisition data is developing"
          description="Traffic channel data will appear as GA4 reporting becomes available."
        />
      )}

    </ExecutiveCard>
  );
}

/* =========================================================
   SEARCH SUMMARY
========================================================= */

function SearchSummary({
  data,
}) {
  const connected =
    data?.sources
      ?.searchConsole
      ?.connected;

  return (
    <ExecutiveCard>

      <ExecutiveCardHeader
        eyebrow="Search"
        title="Google Visibility"
        description="Organic search exposure and traffic."
      />

      {!connected ? (
        <EmptyState
          title="Search Console not connected"
          description="Connect Search Console to unlock organic search intelligence."
        />
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3">

          <MiniMetric
            label="Impressions"
            value={formatCompact(
              data?.metrics
                ?.impressions
                ?.value
            )}
          />

          <MiniMetric
            label="Clicks"
            value={formatCompact(
              data?.metrics?.clicks
                ?.value
            )}
          />

          <MiniMetric
            label="CTR"
            value={
              Number(
                data?.metrics
                  ?.impressions
                  ?.value || 0
              ) > 0
                ? formatPercent(
                    (Number(
                      data?.metrics
                        ?.clicks
                        ?.value ||
                        0
                    ) /
                      Number(
                        data
                          ?.metrics
                          ?.impressions
                          ?.value ||
                          1
                      )) *
                      100,
                    2
                  )
                : "—"
            }
          />

          <MiniMetric
            label="Top Queries"
            value={formatNumber(
              data
                ?.searchQueries
                ?.length || 0
            )}
          />

        </div>
      )}

    </ExecutiveCard>
  );
}

/* =========================================================
   GEOGRAPHIC SUMMARY
========================================================= */

function GeographicSummary({
  data,
}) {
  return (
    <ExecutiveCard>

      <ExecutiveCardHeader
        eyebrow="Geography"
        title="Demand Markets"
        description="Leading cities based on digital demand."
      />

      {data.length >
      0 ? (
        <div className="mt-6 space-y-3">

          {data
            .slice(
              0,
              5
            )
            .map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    item.name
                  }
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0060d0]">
                      <MapPin size={13} />
                    </div>

                    <div>

                      <div className="text-xs font-black text-slate-700">
                        {
                          item.name
                        }
                      </div>

                      <div className="mt-0.5 text-[9px] text-slate-400">
                        {formatNumber(
                          item.visitors
                        )}{" "}
                        visitors
                      </div>

                    </div>

                  </div>

                  <div className="text-xs font-black text-[#071b3d]">
                    {formatPercent(
                      item.share,
                      0
                    )}
                  </div>

                </div>
              )
            )}

        </div>
      ) : (
        <EmptyState
          title="Geographic data is developing"
          description="Market intelligence will improve as GA4 collects more visitor location data."
        />
      )}

    </ExecutiveCard>
  );
}

/* =========================================================
   STRATEGIC PRIORITIES
========================================================= */

function StrategicPriorities({
  data,
}) {
  const priorities =
    [];

  if (
    Number(
      data?.metrics?.revenue
        ?.change || 0
    ) > 10
  ) {
    priorities.push({
      type: "success",
      title:
        "Revenue momentum is positive",
      description:
        "Maintain focus on the services and branches driving booking value.",
    });
  }

  if (
    data?.topService
      ?.name
  ) {
    priorities.push({
      type:
        "opportunity",
      title: `${data.topService.name} leads current service demand`,
      description:
        "Evaluate stronger promotion, visibility and upsell opportunities around this service.",
    });
  }

  if (
    data?.locations?.[0]
      ?.name
  ) {
    priorities.push({
      type:
        "expansion",
      title: `${data.locations[0].name} is the strongest digital market`,
      description:
        "Track traffic, search interest and booking demand before making expansion decisions.",
    });
  }

  if (
    Number(
      data?.metrics
        ?.visitors?.value || 0
    ) === 0
  ) {
    priorities.push({
      type: "warning",
      title:
        "Traffic intelligence is still limited",
      description:
        "Allow GA4 reporting to accumulate before making conversion or acquisition decisions.",
    });
  }

  const visible =
    priorities.slice(
      0,
      4
    );

  return (
    <section>

      <SectionHeading
        eyebrow="Leadership Priorities"
        title="What management should focus on"
        description="Strategic signals derived from current business and digital performance."
      />

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

        {visible.map(
          (
            item,
            index
          ) => (
            <StrategicPriorityCard
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
  );
}

function StrategicPriorityCard({
  item,
}) {
  const config = {
    success: {
      icon:
        CheckCircle2,
      wrapper:
        "border-emerald-100 bg-emerald-50/50",
      iconStyle:
        "bg-emerald-100 text-emerald-600",
    },

    opportunity: {
      icon:
        TrendingUp,
      wrapper:
        "border-blue-100 bg-blue-50/50",
      iconStyle:
        "bg-blue-100 text-blue-600",
    },

    expansion: {
      icon:
        MapPin,
      wrapper:
        "border-violet-100 bg-violet-50/50",
      iconStyle:
        "bg-violet-100 text-violet-600",
    },

    warning: {
      icon:
        AlertTriangle,
      wrapper:
        "border-amber-100 bg-amber-50/50",
      iconStyle:
        "bg-amber-100 text-amber-600",
    },
  };

  const style =
    config[item.type] ||
    config.opportunity;

  const Icon =
    style.icon;

  return (
    <div
      className={`rounded-[20px] border p-5 ${style.wrapper}`}
    >

      <div className="flex gap-4">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconStyle}`}
        >
          <Icon size={17} />
        </div>

        <div>

          <h3 className="text-sm font-black text-[#071b3d]">
            {item.title}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            {
              item.description
            }
          </p>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   MOMENTUM CHART
========================================================= */

function MomentumChart({
  data = [],
}) {
  const width =
    900;

  const height =
    270;

  const padding =
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
            padding +
            (index /
              Math.max(
                data.length -
                  1,
                1
              )) *
              (width -
                padding *
                  2);

          const y =
            height -
            padding -
            (Number(
              item.visitors ||
                0
            ) /
              maxValue) *
              (height -
                padding *
                  2);

          return `${x},${y}`;
        }
      )
      .join(" ");

  return (
    <div>

      <div className="h-[270px] overflow-hidden">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >

          {[0, 1, 2, 3].map(
            (index) => {
              const y =
                padding +
                (index /
                  3) *
                  (height -
                    padding *
                      2);

              return (
                <line
                  key={
                    index
                  }
                  x1="0"
                  x2={
                    width
                  }
                  y1={y}
                  y2={y}
                  stroke="#e8edf5"
                  strokeDasharray="5 7"
                />
              );
            }
          )}

          <defs>

            <linearGradient
              id="executiveArea"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#0060d0"
                stopOpacity=".18"
              />

              <stop
                offset="100%"
                stopColor="#0060d0"
                stopOpacity="0"
              />

            </linearGradient>

          </defs>

          <polygon
            points={`${padding},${
              height -
              padding
            } ${points} ${
              width -
              padding
            },${
              height -
              padding
            }`}
            fill="url(#executiveArea)"
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

        </svg>

      </div>

      <div className="mt-2 flex justify-between text-[9px] font-semibold text-slate-400">

        {data.map(
          (
            item,
            index
          ) =>
            index ===
              0 ||
            index ===
              data.length -
                1 ||
            index %
              Math.ceil(
                data.length /
                  4
              ) ===
              0 ? (
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
   MINI ROW
========================================================= */

function MiniPerformanceRow({
  label,
  value,
  sub,
  width,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <div>

          <div className="text-xs font-bold text-slate-700">
            {label}
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">
            {sub}
          </div>

        </div>

        <span className="text-xs font-black text-[#071b3d]">
          {value}
        </span>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${Math.min(
              Number(
                width ||
                  0
              ),
              100
            )}%`,
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#00195f] to-[#4fc3f7]"
        />

      </div>

    </div>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">

      <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </div>

      <div className="mt-2 text-xl font-black text-[#071b3d]">
        {value}
      </div>

    </div>
  );
}

/* =========================================================
   GENERIC CARD
========================================================= */

function ExecutiveCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.035)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function ExecutiveCardHeader({
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
   ARROW LINK
========================================================= */

function ArrowLink({
  label,
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 text-[10px] font-black text-[#0060d0]"
    >
      {label}
      <ArrowUpRight size={12} />
    </button>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  title,
  description,
}) {
  return (
    <div className="mt-6 flex min-h-[160px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 px-5 text-center">

      <BarChart3
        size={24}
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
   SKELETON
========================================================= */

function ExecutiveOverviewSkeleton() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      <div className="border-b border-slate-200 bg-white px-6 py-7 lg:px-8">

        <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />

        <div className="mt-3 h-8 w-64 animate-pulse rounded-xl bg-slate-100" />

        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />

      </div>

      <main className="space-y-6 px-6 py-6 lg:px-8">

        <div className="grid gap-6 xl:grid-cols-[340px_1fr]">

          <div className="h-52 animate-pulse rounded-[26px] bg-slate-200" />

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">

            {Array.from({
              length: 5,
            }).map(
              (_, index) => (
                <div
                  key={
                    index
                  }
                  className="h-52 animate-pulse rounded-[22px] bg-white"
                />
              )
            )}

          </div>

        </div>

        <div className="h-36 animate-pulse rounded-[26px] bg-white" />

        <div className="grid gap-6 xl:grid-cols-2">

          <div className="h-80 animate-pulse rounded-[24px] bg-white" />

          <div className="h-80 animate-pulse rounded-[24px] bg-white" />

        </div>

      </main>

    </div>
  );
}