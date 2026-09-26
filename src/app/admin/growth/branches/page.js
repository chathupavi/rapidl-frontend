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
  Building2,
  Clock3,
  Crown,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
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

function formatNumber(value) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(
    Number(value || 0)
  );
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

export default function BranchPerformancePage() {
  const [
    range,
    setRange,
  ] = useState("30d");

  const [
    data,
    setData,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(
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
              `${API_URL}/api/analytics/branch-performance?range=${range}`,
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
                `Branch Performance API returned ${response.status}`
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
            "Branch Performance Error:",
            error
          );

          setError(
            error.message ||
              "Unable to load branch performance."
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
    data?.overview || {};

  const branches =
    data?.branches || [];

  const trend =
    data?.trend || [];

  const rankedBranches =
    useMemo(
      () =>
        [...branches].sort(
          (a, b) =>
            b.bookings -
            a.bookings
        ),
      [branches]
    );

  if (
    loading &&
    !data
  ) {
    return (
      <BranchSkeleton />
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">

      {/* HEADER */}

      <header className="border-b border-slate-200/80 bg-white">

        <div className="px-6 py-6 lg:px-8">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00195f] text-white">

                  <Building2
                    size={16}
                  />

                </div>

                <span className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Growth Intelligence
                </span>

              </div>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#071b3d]">
                Branch Performance
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Compare branch demand, revenue, order quality and growth performance across Rapid Laundromat locations.
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

                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 shadow-sm"
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
              source={
                data?.source
              }
            />

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

      <main className="space-y-7 px-6 py-6 lg:px-8">

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* KPI */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <BranchMetric
            label="Total Bookings"

            value={formatNumber(
              overview
                ?.bookings
                ?.value
            )}

            change={
              overview
                ?.bookings
                ?.change
            }

            icon={
              Building2
            }
          />

          <BranchMetric
            label="Branch Revenue"

            value={formatCurrency(
              overview
                ?.revenue
                ?.value
            )}

            change={
              overview
                ?.revenue
                ?.change
            }

            icon={
              WalletCards
            }
          />

          <BranchMetric
            label="Active Branches"

            value={formatNumber(
              overview
                ?.activeBranches
            )}

            icon={
              Sparkles
            }
          />

          <BranchMetric
            label="Avg. Order Value"

            value={formatCurrency(
              overview
                ?.averageOrderValue
            )}

            icon={
              Target
            }
          />

        </section>

        {/* LEADERS */}

        <section>

          <SectionHeading
            eyebrow="Leadership"

            title="Branch Leaders"

            description="Branches currently leading booking demand, revenue and growth momentum."
          />

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">

            <LeaderCard
              icon={Crown}

              title="Most Bookings"

              name={
                data?.leaders
                  ?.topBranch
                  ?.name ||
                "—"
              }

              metric={
                data?.leaders
                  ?.topBranch
                  ? `${formatNumber(
                      data.leaders
                        .topBranch
                        .bookings
                    )} bookings`
                  : "No data"
              }
            />

            <LeaderCard
              icon={
                WalletCards
              }

              title="Highest Revenue"

              name={
                data?.leaders
                  ?.topRevenueBranch
                  ?.name ||
                "—"
              }

              metric={
                data?.leaders
                  ?.topRevenueBranch
                  ? formatCurrency(
                      data.leaders
                        .topRevenueBranch
                        .revenue
                    )
                  : "No data"
              }
            />

            <LeaderCard
              icon={
                TrendingUp
              }

              title="Fastest Growing"

              name={
                data?.leaders
                  ?.fastestGrowing
                  ?.name ||
                "—"
              }

              metric={
                data?.leaders
                  ?.fastestGrowing
                  ? `+${Number(
                      data.leaders
                        .fastestGrowing
                        .bookingChange ||
                        0
                    ).toFixed(
                      1
                    )}%`
                  : "No growth signal"
              }
            />

          </div>

        </section>

        {/* TREND */}

        <BranchCard>

          <CardHeader
            eyebrow="Momentum"

            title="Branch Demand Momentum"

            description="Booking volume across branches during the selected reporting period."
          />

          {trend.length ? (
            <div className="mt-7">

              <BranchTrend
                data={
                  trend
                }

                branches={
                  branches
                }
              />

            </div>
          ) : (
            <EmptyState
              title="No branch trend"

              description="Branch activity will appear once more bookings are recorded."
            />
          )}

        </BranchCard>

        {/* RANKING */}

        <BranchCard>

          <CardHeader
            eyebrow="Ranking"

            title="Branch Performance Ranking"

            description="Side-by-side branch comparison across demand, revenue and operational quality."
          />

          {rankedBranches.length ? (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">

              <div className="min-w-[1050px]">

                <div className="grid grid-cols-[1fr_100px_130px_110px_110px_110px_110px] bg-slate-50 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">

                  <span>
                    Branch
                  </span>

                  <span className="text-right">
                    Bookings
                  </span>

                  <span className="text-right">
                    Revenue
                  </span>

                  <span className="text-right">
                    Avg. Order
                  </span>

                  <span className="text-right">
                    Completed
                  </span>

                  <span className="text-right">
                    Cancelled
                  </span>

                  <span className="text-right">
                    Growth
                  </span>

                </div>

                {rankedBranches.map(
                  (
                    branch,
                    index
                  ) => (

                    <BranchRow
                      key={
                        branch.id
                      }

                      branch={
                        branch
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
              title="No branch data"

              description="Branch performance will appear when booking data is available."
            />
          )}

        </BranchCard>

        {/* SHARE */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <BranchCard>

            <CardHeader
              eyebrow="Demand Mix"

              title="Booking Share"

              description="How much of total booking demand each branch represents."
            />

            <div className="mt-6 space-y-5">

              {rankedBranches.map(
                (branch) => (

                  <ShareBar
                    key={
                      branch.id
                    }

                    label={
                      branch.name
                    }

                    value={
                      branch.bookingShare
                    }

                    detail={`${formatNumber(
                      branch.bookings
                    )} bookings`}
                  />

                )
              )}

            </div>

          </BranchCard>

          <BranchCard>

            <CardHeader
              eyebrow="Revenue Mix"

              title="Revenue Contribution"

              description="Share of total booking value contributed by each branch."
            />

            <div className="mt-6 space-y-5">

              {[...branches]
                .sort(
                  (a, b) =>
                    b.revenue -
                    a.revenue
                )
                .map(
                  (branch) => (

                    <ShareBar
                      key={
                        branch.id
                      }

                      label={
                        branch.name
                      }

                      value={
                        branch.revenueShare
                      }

                      detail={
                        formatCurrency(
                          branch.revenue
                        )
                      }
                    />

                  )
                )}

            </div>

          </BranchCard>

        </section>

        {/* BRANCH CARDS */}

        <section>

          <SectionHeading
            eyebrow="Branch Detail"

            title="Branch Intelligence"

            description="Operational and service-level detail for each Rapid Laundromat branch."
          />

          <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-2">

            {branches.map(
              (branch) => (

                <BranchDetailCard
                  key={
                    branch.id
                  }

                  branch={
                    branch
                  }
                />

              )
            )}

          </div>

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   KPI
========================================================= */

function BranchMetric({
  label,
  value,
  change,
  icon: Icon,
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
              1
            )}
            %

          </div>

        )}

      </div>

      <div className="mt-6 text-2xl font-black text-[#071b3d]">
        {value}
      </div>

      <div className="mt-1 text-[11px] font-black text-slate-600">
        {label}
      </div>

    </div>
  );
}

/* =========================================================
   LEADER
========================================================= */

function LeaderCard({
  icon: Icon,
  title,
  name,
  metric,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

        <Icon
          size={15}
        />

      </div>

      <div className="mt-4 text-[9px] font-black uppercase tracking-[1.5px] text-[#0060d0]">
        {title}
      </div>

      <div className="mt-2 text-base font-black text-[#071b3d]">
        {name}
      </div>

      <div className="mt-1 text-[10px] text-slate-400">
        {metric}
      </div>

    </div>
  );
}

/* =========================================================
   BRANCH ROW
========================================================= */

function BranchRow({
  branch,
  index,
}) {
  const change =
    Number(
      branch.bookingChange ||
        0
    );

  return (
    <div className="grid grid-cols-[1fr_100px_130px_110px_110px_110px_110px] items-center border-t border-slate-100 px-4 py-4">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-black ${
            index === 0
              ? "bg-amber-50 text-amber-600"
              : "bg-blue-50 text-[#0060d0]"
          }`}
        >
          {index + 1}
        </div>

        <div>

          <div className="text-xs font-black text-slate-700">
            {
              branch.name
            }
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">
            Top service:{" "}
            {
              branch.topService
                ?.name ||
              "—"
            }
          </div>

        </div>

      </div>

      <span className="text-right text-xs font-black text-[#071b3d]">
        {formatNumber(
          branch.bookings
        )}
      </span>

      <span className="text-right text-xs font-black text-slate-600">
        {formatCurrency(
          branch.revenue
        )}
      </span>

      <span className="text-right text-xs font-bold text-slate-500">
        {formatCurrency(
          branch.averageOrderValue
        )}
      </span>

      <span className="text-right text-xs font-black text-emerald-600">
        {formatPercent(
          branch.completionRate
        )}
      </span>

      <span className="text-right text-xs font-black text-red-500">
        {formatPercent(
          branch.cancellationRate
        )}
      </span>

      <span
        className={`text-right text-xs font-black ${
          change > 0
            ? "text-emerald-600"
            : change < 0
            ? "text-red-500"
            : "text-slate-400"
        }`}
      >
        {change > 0
          ? "+"
          : ""}
        {change.toFixed(
          1
        )}
        %
      </span>

    </div>
  );
}

/* =========================================================
   SHARE BAR
========================================================= */

function ShareBar({
  label,
  value,
  detail,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-4">

        <div className="min-w-0">

          <div className="truncate text-xs font-black text-slate-600">
            {label}
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">
            {detail}
          </div>

        </div>

        <div className="text-xs font-black text-[#0060d0]">
          {formatPercent(
            value
          )}
        </div>

      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

        <div
          style={{
            width: `${Math.min(
              Number(
                value || 0
              ),
              100
            )}%`,
          }}

          className="h-full rounded-full bg-gradient-to-r from-[#00195f] via-[#0060d0] to-[#4fc3f7]"
        />

      </div>

    </div>
  );
}

/* =========================================================
   DETAIL CARD
========================================================= */

function BranchDetailCard({
  branch,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

            <Building2
              size={16}
            />

          </div>

          <div>

            <div className="text-sm font-black text-[#071b3d]">
              {
                branch.name
              }
            </div>

            <div className="mt-1 text-[9px] text-slate-400">
              Branch performance snapshot
            </div>

          </div>

        </div>

        <div className="rounded-full bg-blue-50 px-3 py-1 text-[9px] font-black text-[#0060d0]">
          {formatPercent(
            branch.bookingShare
          )} demand
        </div>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

        <MiniMetric
          label="Bookings"
          value={formatNumber(
            branch.bookings
          )}
        />

        <MiniMetric
          label="Revenue"
          value={formatCurrency(
            branch.revenue
          )}
        />

        <MiniMetric
          label="Completion"
          value={formatPercent(
            branch.completionRate
          )}
        />

        <MiniMetric
          label="Paid"
          value={formatPercent(
            branch.paymentRate
          )}
        />

      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">

        <div className="text-[9px] font-black uppercase tracking-[1.4px] text-slate-400">
          Service Mix
        </div>

        <div className="mt-3 space-y-3">

          {branch.services
            ?.slice(
              0,
              5
            )
            .map(
              (service) => (

                <div
                  key={
                    service.id
                  }
                  className="flex items-center justify-between gap-4"
                >

                  <div className="truncate text-xs font-bold text-slate-500">
                    {
                      service.name
                    }
                  </div>

                  <div className="whitespace-nowrap text-xs font-black text-[#071b3d]">
                    {formatNumber(
                      service.bookings
                    )}{" "}
                    bookings
                  </div>

                </div>

              )
            )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   TREND
========================================================= */

function BranchTrend({
  data,
  branches,
}) {
  const width =
    1000;

  const height =
    260;

  const padding =
    25;

  const totalsByDate =
    {};

  data.forEach(
    (row) => {
      if (
        !totalsByDate[
          row.date
        ]
      ) {
        totalsByDate[
          row.date
        ] = 0;
      }

      totalsByDate[
        row.date
      ] +=
        Number(
          row.bookings || 0
        );
    }
  );

  const pointsData =
    Object.entries(
      totalsByDate
    )
      .map(
        ([
          date,
          bookings,
        ]) => ({
          date,
          bookings,
        })
      )
      .sort(
        (a, b) =>
          a.date.localeCompare(
            b.date
          )
      );

  const max =
    Math.max(
      ...pointsData.map(
        (item) =>
          Number(
            item.bookings || 0
          )
      ),
      1
    );

  const points =
    pointsData
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
                pointsData.length -
                  1,
                1
              )
            ) *
              (
                width -
                padding * 2
              );

          const y =
            height -
            padding -
            (
              Number(
                item.bookings ||
                  0
              ) /
              max
            ) *
              (
                height -
                padding * 2
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
                    padding * 2
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
            pointsData[0]
              ?.date
          }
        </span>

        <span>
          Total branch booking demand
        </span>

        <span>
          {
            pointsData[
              pointsData.length -
                1
            ]?.date
          }
        </span>

      </div>

    </div>
  );
}

/* =========================================================
   COMMON
========================================================= */

function SourceBadge({
  source,
}) {
  if (!source?.connected) {
    return (
      <div className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-500">
        Booking API Offline
      </div>
    );
  }

  if (!source?.hasData) {
    return (
      <div className="rounded-full bg-amber-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-amber-600">
        Connected · No Branch Data
      </div>
    );
  }

  return (
    <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600">
      Branch Data Connected
    </div>
  );
}

function BranchCard({
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

function BranchSkeleton() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6">

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