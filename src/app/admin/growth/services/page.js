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
  Droplets,
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

export default function ServiceDemandPage() {
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
              `${API_URL}/api/analytics/service-demand?range=${range}`,
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
                `Service Demand API returned ${response.status}`
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
            "Service Demand Error:",
            error
          );

          setError(
            error.message ||
              "Unable to load service demand."
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

  const services =
    data?.services || [];

  const trend =
    data?.trend || [];

  const branches =
    data?.branches || [];

  const topServices =
    useMemo(
      () =>
        services.slice(
          0,
          8
        ),
      [services]
    );

  if (
    loading &&
    !data
  ) {
    return (
      <ServiceSkeleton />
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

                  <Droplets
                    size={16}
                  />

                </div>

                <span className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Growth Intelligence
                </span>

              </div>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#071b3d]">
                Service Demand
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Understand which laundry services customers are choosing, which generate the most value, and where demand is shifting.
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

          <DemandMetric
            label="Service Bookings"

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
              Droplets
            }
          />

          <DemandMetric
            label="Service Revenue"

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

          <DemandMetric
            label="Active Services"

            value={formatNumber(
              overview
                ?.activeServices
            )}

            icon={
              Sparkles
            }
          />

          <DemandMetric
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
            eyebrow="Leaders"

            title="Demand Leaders"

            description="The services currently leading bookings, revenue and momentum."
          />

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">

            <LeaderCard
              title="Most Booked"

              name={
                data?.leaders
                  ?.topService
                  ?.name ||
                "—"
              }

              metric={
                data?.leaders
                  ?.topService
                  ? `${formatNumber(
                      data.leaders
                        .topService
                        .bookings
                    )} bookings`
                  : "No data"
              }
            />

            <LeaderCard
              title="Highest Revenue"

              name={
                data?.leaders
                  ?.topRevenueService
                  ?.name ||
                "—"
              }

              metric={
                data?.leaders
                  ?.topRevenueService
                  ? formatCurrency(
                      data.leaders
                        .topRevenueService
                        .revenue
                    )
                  : "No data"
              }
            />

            <LeaderCard
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

        <DemandCard>

          <CardHeader
            eyebrow="Momentum"

            title="Service Demand Momentum"

            description="Booking activity across the selected period."
          />

          {trend.length ? (
            <div className="mt-7">

              <DemandTrend
                data={
                  trend
                }
              />

            </div>
          ) : (
            <EmptyState
              title="No demand trend"

              description="Booking activity will appear here when enough service demand is recorded."
            />
          )}

        </DemandCard>

        {/* SERVICE TABLE */}

        <DemandCard>

          <CardHeader
            eyebrow="Services"

            title="Service Demand Ranking"

            description="Ranked by customer booking volume."
          />

          {topServices.length ? (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">

              <div className="min-w-[900px]">

                <div className="grid grid-cols-[1fr_100px_130px_100px_110px_110px] bg-slate-50 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">

                  <span>
                    Service
                  </span>

                  <span className="text-right">
                    Bookings
                  </span>

                  <span className="text-right">
                    Revenue
                  </span>

                  <span className="text-right">
                    Share
                  </span>

                  <span className="text-right">
                    Avg. Order
                  </span>

                  <span className="text-right">
                    Change
                  </span>

                </div>

                {topServices.map(
                  (
                    service,
                    index
                  ) => (

                    <ServiceRow
                      key={
                        service.id
                      }

                      service={
                        service
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
              title="No service demand"

              description="Service booking demand will appear here."
            />
          )}

        </DemandCard>

        {/* DEMAND SHARE */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <DemandCard>

            <CardHeader
              eyebrow="Mix"

              title="Demand Share"

              description="How much of total booking demand each service represents."
            />

            <div className="mt-6 space-y-5">

              {topServices.map(
                (service) => (

                  <DemandBar
                    key={
                      service.id
                    }

                    label={
                      service.name
                    }

                    value={
                      service.share
                    }

                    bookings={
                      service.bookings
                    }
                  />

                )
              )}

            </div>

          </DemandCard>

          <DemandCard>

            <CardHeader
              eyebrow="Commercial"

              title="Revenue Contribution"

              description="Which services contribute the most booking value."
            />

            <div className="mt-6 space-y-5">

              {[...services]
                .sort(
                  (a, b) =>
                    b.revenue -
                    a.revenue
                )
                .slice(
                  0,
                  8
                )
                .map(
                  (service) => (

                    <RevenueBar
                      key={
                        service.id
                      }

                      service={
                        service
                      }
                    />

                  )
                )}

            </div>

          </DemandCard>

        </section>

        {/* BRANCH X SERVICE */}

        <DemandCard>

          <CardHeader
            eyebrow="Branch Intelligence"

            title="Service Demand by Branch"

            description="See which services are strongest at each operating location."
          />

          {branches.length ? (
            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">

              {branches.map(
                (branch) => (

                  <BranchServiceCard
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
          ) : (
            <EmptyState
              title="No branch service demand"

              description="Branch-level service demand will appear here."
            />
          )}

        </DemandCard>

      </main>

    </div>
  );
}

/* =========================================================
   KPI
========================================================= */

function DemandMetric({
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
  title,
  name,
  metric,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5">

      <div className="text-[9px] font-black uppercase tracking-[1.5px] text-[#0060d0]">
        {title}
      </div>

      <div className="mt-3 text-base font-black text-[#071b3d]">
        {name}
      </div>

      <div className="mt-1 text-[10px] text-slate-400">
        {metric}
      </div>

    </div>
  );
}

/* =========================================================
   SERVICE ROW
========================================================= */

function ServiceRow({
  service,
  index,
}) {
  const change =
    Number(
      service.bookingChange ||
        0
    );

  return (
    <div className="grid grid-cols-[1fr_100px_130px_100px_110px_110px] items-center border-t border-slate-100 px-4 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#0060d0]">
          {index + 1}
        </div>

        <div>

          <div className="text-xs font-black text-slate-700">
            {
              service.name
            }
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">
            Service ID{" "}
            {
              service.id
            }
          </div>

        </div>

      </div>

      <span className="text-right text-xs font-black text-[#071b3d]">
        {formatNumber(
          service.bookings
        )}
      </span>

      <span className="text-right text-xs font-black text-slate-600">
        {formatCurrency(
          service.revenue
        )}
      </span>

      <span className="text-right text-xs font-black text-[#0060d0]">
        {formatPercent(
          service.share
        )}
      </span>

      <span className="text-right text-xs font-bold text-slate-500">
        {formatCurrency(
          service.averageOrderValue
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
   DEMAND BAR
========================================================= */

function DemandBar({
  label,
  value,
  bookings,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-4">

        <div className="min-w-0">

          <div className="truncate text-xs font-black text-slate-600">
            {label}
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">
            {formatNumber(
              bookings
            )}{" "}
            bookings
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
   REVENUE BAR
========================================================= */

function RevenueBar({
  service,
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between gap-4">

        <div className="truncate text-xs font-black text-slate-600">
          {
            service.name
          }
        </div>

        <div className="text-right">

          <div className="text-xs font-black text-[#071b3d]">
            {formatCurrency(
              service.revenue
            )}
          </div>

          <div className="text-[8px] text-slate-400">
            {formatPercent(
              service.revenueShare
            )}{" "}
            of revenue
          </div>

        </div>

      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

        <div
          style={{
            width: `${Math.min(
              Number(
                service.revenueShare ||
                  0
              ),
              100
            )}%`,
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#00195f] to-[#168cff]"
        />

      </div>

    </div>
  );
}

/* =========================================================
   BRANCH CARD
========================================================= */

function BranchServiceCard({
  branch,
}) {
  const top =
    branch.services?.[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

          <Building2
            size={15}
          />

        </div>

        <div>

          <div className="text-sm font-black text-[#071b3d]">
            {
              branch.name
            }
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">
            Top service:{" "}
            {
              top?.name ||
              "—"
            }
          </div>

        </div>

      </div>

      <div className="mt-5 space-y-3">

        {branch.services
          ?.slice(
            0,
            5
          )
          .map(
            (service) => (

              <div
                key={
                  service.serviceId
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
  );
}

/* =========================================================
   TREND
========================================================= */

function DemandTrend({
  data,
}) {
  const width =
    1000;

  const height =
    250;

  const padding =
    25;

  const max =
    Math.max(
      ...data.map(
        (item) =>
          Number(
            item.bookings ||
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

      <div className="h-[250px]">

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
            data[0]
              ?.date
          }
        </span>

        <span>
          Service booking demand
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
        Connected · No Demand Yet
      </div>
    );
  }

  return (
    <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600">
      Booking Demand Connected
    </div>
  );
}

function DemandCard({
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

function ServiceSkeleton() {
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