"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Clock3,
  Eye,
  Globe2,
  Laptop,
  MapPin,
  Monitor,
  MousePointerClick,
  RefreshCw,
  Smartphone,
  Tablet,
  Users,
  Zap,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";

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

  return new Intl.NumberFormat(
    "en-US"
  ).format(Number(value));
}

function formatPercent(
  value,
  decimals = 0
) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return `${Number(value).toFixed(
    decimals
  )}%`;
}

function formatEventName(value) {
  if (!value) {
    return "Unknown Event";
  }

  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

/* =========================================================
   PAGE
========================================================= */

export default function LiveTrafficPage() {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    autoRefresh,
    setAutoRefresh,
  ] = useState(true);

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(new Date());

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const loadTraffic =
    useCallback(
      async ({
        silent = false,
      } = {}) => {
        try {
          if (silent) {
            setRefreshing(true);
          } else {
            setLoading(true);
          }

          setError("");

          const response =
            await fetch(
              `${API_URL}/api/analytics/live-traffic`,
              {
                method: "GET",
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
                `Live Traffic API returned ${response.status}`
            );
          }

          const liveData =
            result?.data ||
            result;

          setData(
            liveData
          );

          setLastUpdated(
            new Date()
          );
        } catch (error) {
          console.error(
            "Live Traffic Error:",
            error
          );

          setError(
            error.message ||
              "Unable to load live traffic."
          );
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      },
      []
    );

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    loadTraffic();
  }, [loadTraffic]);

  /* =======================================================
     AUTO REFRESH

     Every 60 seconds.
  ======================================================= */

  useEffect(() => {
    if (!autoRefresh) {
      return;
    }

    const interval =
      setInterval(() => {
        loadTraffic({
          silent: true,
        });
      }, 60000);

    return () =>
      clearInterval(
        interval
      );
  }, [
    autoRefresh,
    loadTraffic,
  ]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading &&
    !data
  ) {
    return (
      <LiveTrafficSkeleton />
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error &&
    !data
  ) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-[#f5f7fb] p-6">

        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_15px_50px_rgba(15,23,42,.06)]">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
            <AlertTriangle
              size={26}
            />
          </div>

          <h2 className="mt-5 text-xl font-black text-[#071b3d]">
            Live traffic unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              loadTraffic()
            }
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00195f] px-5 py-3 text-xs font-black text-white transition hover:bg-[#002b75]"
          >
            <RefreshCw
              size={14}
            />

            Try Again
          </button>

        </div>

      </div>
    );
  }

  const overview =
    data?.overview || {};

  const activeUsers =
    Number(
      overview.activeUsers ||
        0
    );

  const pageViews =
    Number(
      overview.pageViews ||
        0
    );

  const eventCount =
    Number(
      overview.eventCount ||
        0
    );

  const topLocation =
    data?.topLocation ||
    null;

  const topDevice =
    data?.topDevice ||
    null;

  const locations =
    data?.locations ||
    [];

  const devices =
    data?.devices ||
    [];

  const events =
    data?.events ||
    [];

  const timeline =
    data?.timeline ||
    [];

  const gaHasData =
    data?.sources?.ga4
      ?.hasData;

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

                <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-[#00195f] text-white">

                  <Activity
                    size={15}
                  />

                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />

                </div>

                <span className="text-[11px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Growth Intelligence
                </span>

              </div>

              <h1 className="text-2xl font-black tracking-tight text-[#071b3d] sm:text-3xl">
                Live Traffic
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Monitor active users, website activity,
                visitor locations, devices and realtime
                engagement.
              </p>

            </div>

            <div className="flex flex-wrap items-center gap-3">

              {/* AUTO REFRESH */}

              <button
                type="button"
                onClick={() =>
                  setAutoRefresh(
                    (current) =>
                      !current
                  )
                }
                className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-xs font-black transition ${
                  autoRefresh
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-white text-slate-500"
                }`}
              >

                <span
                  className={`h-2 w-2 rounded-full ${
                    autoRefresh
                      ? "animate-pulse bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                />

                Auto Refresh

              </button>

              {/* REFRESH */}

              <button
                type="button"
                disabled={
                  refreshing
                }
                onClick={() =>
                  loadTraffic({
                    silent: true,
                  })
                }
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

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">

            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-wider ${
                data?.sources?.ga4
                  ?.connected
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >

              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  data?.sources?.ga4
                    ?.connected
                    ? "animate-pulse bg-emerald-500"
                    : "bg-slate-400"
                }`}
              />

              GA4 Realtime

            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#0060d0]">
              {data?.realtimeWindow ||
                "Realtime"}
            </span>

            {!gaHasData && (
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-amber-600">
                Waiting for activity
              </span>
            )}

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
                  second:
                    "2-digit",
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
            REALTIME KPIs
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <LiveUsersCard
            value={
              activeUsers
            }
          />

          <RealtimeMetric
            label="Page Views"
            value={formatNumber(
              pageViews
            )}
            icon={Eye}
            subtitle="Views in realtime window"
          />

          <RealtimeMetric
            label="Events"
            value={formatNumber(
              eventCount
            )}
            icon={
              MousePointerClick
            }
            subtitle="Interactions recorded"
          />

          <RealtimeMetric
            label="Top City"
            value={
              topLocation?.city ||
              "—"
            }
            icon={MapPin}
            subtitle={
              topLocation
                ? `${formatNumber(
                    topLocation.activeUsers
                  )} active ${
                    topLocation.activeUsers ===
                    1
                      ? "user"
                      : "users"
                  }`
                : "No active location"
            }
          />

        </section>

        {/* =====================================================
            ACTIVITY + SNAPSHOT
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,.75fr)]">

          <LiveCard>

            <CardHeader
              eyebrow="Realtime"
              title="Activity Timeline"
              description="Website event activity across the recent realtime window."
              action={
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-600">

                  <Activity
                    size={11}
                  />

                  Live

                </div>
              }
            />

            {timeline.length >
            0 ? (
              <div className="mt-7">

                <RealtimeChart
                  data={
                    timeline
                  }
                />

              </div>
            ) : (
              <EmptyState
                title="No recent activity"
                description="Realtime event activity will appear here when users interact with the website."
              />
            )}

          </LiveCard>

          <LivePulseCard
            activeUsers={
              activeUsers
            }
            pageViews={
              pageViews
            }
            eventCount={
              eventCount
            }
            topLocation={
              topLocation
            }
            topDevice={
              topDevice
            }
          />

        </section>

        {/* =====================================================
            LOCATION + DEVICE
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_.8fr]">

          <LocationCard
            locations={
              locations
            }
          />

          <DeviceCard
            devices={
              devices
            }
          />

        </section>

        {/* =====================================================
            EVENTS
        ===================================================== */}

        <LiveCard>

          <CardHeader
            eyebrow="Engagement"
            title="Live Events"
            description="GA4 events being triggered during the realtime window."
            action={
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Zap
                  size={17}
                />
              </div>
            }
          />

          {events.length >
          0 ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

              <div className="grid grid-cols-[1fr_110px] bg-slate-50 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 sm:grid-cols-[1fr_120px_120px]">

                <span>
                  Event
                </span>

                <span className="text-right">
                  Events
                </span>

                <span className="hidden text-right sm:block">
                  Users
                </span>

              </div>

              {events.map(
                (
                  event,
                  index
                ) => (
                  <div
                    key={`${event.event}-${index}`}
                    className={`grid grid-cols-[1fr_110px] items-center px-4 py-4 sm:grid-cols-[1fr_120px_120px] ${
                      index !==
                      events.length -
                        1
                        ? "border-b border-slate-100"
                        : ""
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                        <Activity
                          size={13}
                        />
                      </div>

                      <div>

                        <div className="text-xs font-bold text-slate-700">
                          {formatEventName(
                            event.event
                          )}
                        </div>

                        <div className="mt-0.5 text-[9px] text-slate-400">
                          GA4 event
                        </div>

                      </div>

                    </div>

                    <span className="text-right text-sm font-black text-[#071b3d]">
                      {formatNumber(
                        event.eventCount
                      )}
                    </span>

                    <span className="hidden text-right text-sm font-black text-slate-400 sm:block">
                      {event.activeUsers !==
                        null &&
                      event.activeUsers !==
                        undefined
                        ? formatNumber(
                            event.activeUsers
                          )
                        : "—"}
                    </span>

                  </div>
                )
              )}

            </div>
          ) : (
            <EmptyState
              title="No realtime events"
              description="Events such as page views and engagement will appear when users are active."
            />
          )}

        </LiveCard>

      </main>

    </div>
  );
}

/* =========================================================
   LIVE USERS CARD
========================================================= */

function LiveUsersCard({
  value,
}) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#00195f] p-6 text-white shadow-[0_18px_55px_rgba(0,25,95,.2)]">

      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#0060d0]/40 blur-3xl" />

      <div className="relative">

        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[2px] text-sky-300">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          Users Active Now

        </div>

        <div className="mt-5 text-5xl font-black tracking-tight">
          {formatNumber(
            value
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-white/55">

          <Users
            size={13}
          />

          GA4 realtime active users

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   REALTIME METRIC
========================================================= */

function RealtimeMetric({
  label,
  value,
  icon: Icon,
  subtitle,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className="rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">
        <Icon
          size={17}
        />
      </div>

      <div
        className={`mt-6 truncate font-black text-[#071b3d] ${
          String(value).length >
          16
            ? "text-base"
            : "text-2xl"
        }`}
      >
        {value}
      </div>

      <div className="mt-1 text-[11px] font-black text-slate-700">
        {label}
      </div>

      <div className="mt-1 truncate text-[10px] text-slate-400">
        {subtitle}
      </div>

    </motion.div>
  );
}

/* =========================================================
   LIVE SNAPSHOT
========================================================= */

function LivePulseCard({
  activeUsers,
  pageViews,
  eventCount,
  topLocation,
  topDevice,
}) {
  return (
    <LiveCard>

      <CardHeader
        eyebrow="Pulse"
        title="Live Snapshot"
        description="Current visitor and engagement activity at a glance."
      />

      <div className="mt-6 space-y-3">

        <PulseRow
          icon={Users}
          label="Active Users"
          value={formatNumber(
            activeUsers
          )}
        />

        <PulseRow
          icon={Eye}
          label="Page Views"
          value={formatNumber(
            pageViews
          )}
        />

        <PulseRow
          icon={Zap}
          label="Events"
          value={formatNumber(
            eventCount
          )}
        />

        <PulseRow
          icon={MapPin}
          label="Top City"
          value={
            topLocation?.city ||
            "—"
          }
        />

        <PulseRow
          icon={Monitor}
          label="Top Device"
          value={
            topDevice?.device ||
            "—"
          }
        />

      </div>

    </LiveCard>
  );
}

function PulseRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0060d0] shadow-sm">
          <Icon
            size={13}
          />
        </div>

        <span className="text-xs font-bold text-slate-500">
          {label}
        </span>

      </div>

      <span className="max-w-[160px] truncate text-xs font-black capitalize text-[#071b3d]">
        {value}
      </span>

    </div>
  );
}

/* =========================================================
   LOCATION CARD
========================================================= */

function LocationCard({
  locations,
}) {
  return (
    <LiveCard>

      <CardHeader
        eyebrow="Geography"
        title="Visitors Active by Location"
        description="Cities generating website activity in the realtime window."
        action={
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">
            <Globe2
              size={17}
            />
          </div>
        }
      />

      {locations.length >
      0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">

          <div className="grid grid-cols-[1fr_100px] bg-slate-50 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400 sm:grid-cols-[1fr_170px_110px]">

            <span>
              Location
            </span>

            <span className="hidden sm:block">
              Country
            </span>

            <span className="text-right">
              Active
            </span>

          </div>

          {locations.map(
            (
              location,
              index
            ) => (
              <div
                key={`${location.country}-${location.city}-${index}`}
                className={`grid grid-cols-[1fr_100px] items-center px-4 py-4 sm:grid-cols-[1fr_170px_110px] ${
                  index !==
                  locations.length -
                    1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0060d0]">
                    <MapPin
                      size={13}
                    />
                  </div>

                  <span className="truncate text-xs font-black text-slate-700">
                    {
                      location.city
                    }
                  </span>

                </div>

                <span className="hidden truncate text-xs text-slate-400 sm:block">
                  {
                    location.country
                  }
                </span>

                <span className="text-right text-sm font-black text-[#071b3d]">
                  {formatNumber(
                    location.activeUsers
                  )}
                </span>

              </div>
            )
          )}

        </div>
      ) : (
        <EmptyState
          title="No active locations"
          description="Cities will appear here when active visitors are detected by GA4."
        />
      )}

    </LiveCard>
  );
}

/* =========================================================
   DEVICE CARD
========================================================= */

function DeviceCard({
  devices,
}) {
  return (
    <LiveCard>

      <CardHeader
        eyebrow="Technology"
        title="Device Mix"
        description="Devices used by active visitors."
      />

      {devices.length >
      0 ? (
        <div className="mt-6 space-y-5">

          {devices.map(
            (device) => (
              <DeviceRow
                key={
                  device.device
                }
                device={
                  device
                }
              />
            )
          )}

        </div>
      ) : (
        <EmptyState
          title="No device activity"
          description="Device information will appear when visitors become active."
        />
      )}

    </LiveCard>
  );
}

/* =========================================================
   DEVICE ROW
========================================================= */

function DeviceRow({
  device,
}) {
  const deviceName =
    String(
      device.device ||
        ""
    ).toLowerCase();

  let Icon =
    Monitor;

  if (
    deviceName ===
    "mobile"
  ) {
    Icon =
      Smartphone;
  }

  if (
    deviceName ===
    "tablet"
  ) {
    Icon =
      Tablet;
  }

  if (
    deviceName ===
    "desktop"
  ) {
    Icon =
      Laptop;
  }

  const share =
    Math.min(
      Math.max(
        Number(
          device.share || 0
        ),
        0
      ),
      100
    );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-[#00195f]">
            <Icon
              size={13}
            />
          </div>

          <div>

            <div className="text-xs font-black capitalize text-slate-700">
              {
                device.device
              }
            </div>

            <div className="text-[9px] text-slate-400">
              {formatNumber(
                device.activeUsers
              )}{" "}
              active{" "}
              {Number(
                device.activeUsers
              ) === 1
                ? "user"
                : "users"}
            </div>

          </div>

        </div>

        <span className="text-xs font-black text-[#071b3d]">
          {formatPercent(
            share,
            0
          )}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: `${share}%`,
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

/* =========================================================
   REALTIME ACTIVITY CHART

   IMPORTANT:
   Timeline is based on eventCount.
   It is NOT activeUsers per minute.
========================================================= */

function RealtimeChart({
  data = [],
}) {
  const width =
    900;

  const height =
    250;

  const padding =
    24;

  const maxValue =
    Math.max(
      ...data.map(
        (item) =>
          Number(
            item.eventCount ||
              0
          )
      ),
      1
    ) * 1.2;

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
              item.eventCount ||
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

      <div className="h-[250px] overflow-hidden">

        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >

          {/* GRID */}

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
                  strokeWidth="1"
                  strokeDasharray="5 7"
                />
              );
            }
          )}

          <defs>

            <linearGradient
              id="liveActivityArea"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#10b981"
                stopOpacity=".22"
              />

              <stop
                offset="100%"
                stopColor="#10b981"
                stopOpacity="0"
              />

            </linearGradient>

          </defs>

          {points && (
            <>

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
                fill="url(#liveActivityArea)"
              />

              <polyline
                points={
                  points
                }
                fill="none"
                stroke="#10b981"
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
                  item.eventCount ||
                    0
                ) /
                  maxValue) *
                  (height -
                    padding *
                      2);

              return (
                <circle
                  key={`${item.minutesAgo}-${index}`}
                  cx={x}
                  cy={y}
                  r="5"
                  fill="white"
                  stroke="#10b981"
                  strokeWidth="3"
                />
              );
            }
          )}

        </svg>

      </div>

      {/* X AXIS */}

      <div className="mt-3 flex justify-between text-[9px] font-semibold text-slate-400">

        <span>
          Older
        </span>

        <span>
          Activity
        </span>

        <span className="font-black text-emerald-600">
          Recent
        </span>

      </div>

      {/* CURRENT DATA POINTS */}

      <div className="mt-4 flex flex-wrap gap-2">

        {data
          .slice(-8)
          .map(
            (
              item,
              index
            ) => (
              <div
                key={`${item.minutesAgo}-activity-${index}`}
                className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 text-[9px]"
              >

                <span className="font-black text-slate-600">
                  {
                    item.eventCount
                  }
                </span>

                <span className="ml-1 text-slate-400">
                  events ·{" "}
                  {
                    item.minutesAgo
                  }
                  m ago
                </span>

              </div>
            )
          )}

      </div>

    </div>
  );
}

/* =========================================================
   CARD
========================================================= */

function LiveCard({
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
   EMPTY STATE
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

      <p className="mt-1 max-w-sm text-[11px] leading-5 text-slate-400">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function LiveTrafficSkeleton() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">

      <div className="border-b border-slate-200 bg-white px-6 py-7 lg:px-8">

        <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />

        <div className="mt-3 h-8 w-56 animate-pulse rounded-xl bg-slate-100" />

        <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />

      </div>

      <main className="space-y-6 px-6 py-6 lg:px-8">

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {Array.from({
            length: 4,
          }).map(
            (_, index) => (
              <div
                key={
                  index
                }
                className="h-48 animate-pulse rounded-[22px] border border-slate-200 bg-white"
              />
            )
          )}

        </div>

        <div className="grid gap-6 xl:grid-cols-2">

          <div className="h-80 animate-pulse rounded-[24px] border border-slate-200 bg-white" />

          <div className="h-80 animate-pulse rounded-[24px] border border-slate-200 bg-white" />

        </div>

        <div className="h-80 animate-pulse rounded-[24px] border border-slate-200 bg-white" />

      </main>

    </div>
  );
}