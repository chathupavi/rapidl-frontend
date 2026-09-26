"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  Clock3,
  Compass,
  Crosshair,
  Eye,
  MapPin,
  Navigation,
  RefreshCw,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  Users,
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
  value,
  decimals = 1
) {
  return `${Number(
    value || 0
  ).toFixed(
    decimals
  )}%`;
}


function formatDistance(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  return `${Number(
    value
  ).toFixed(
    0
  )} km`;
}


/* =========================================================
   PAGE
========================================================= */

export default function ExpansionIntelligencePage() {
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
     LOAD
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
              `${API_URL}/api/analytics/expansion-intelligence?range=${range}`,
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
                `Expansion Intelligence API returned ${response.status}`
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
            "Expansion Intelligence Error:",
            error
          );

          setError(
            error.message ||
              "Unable to load expansion intelligence."
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

  const priorityMarkets =
    data?.priorityMarkets ||
    [];

  const validationMarkets =
    data?.validationMarkets ||
    [];

  const watchlistMarkets =
    data?.watchlistMarkets ||
    [];

  const markets =
    data?.markets ||
    [];

  const regionalSignals =
    data?.regionalSignals ||
    [];


  const opportunityMarkets =
    useMemo(
      () =>
        markets.filter(
          (market) =>
            !market.existingMarket
        ),
      [markets]
    );


  if (
    loading &&
    !data
  ) {
    return (
      <ExpansionSkeleton />
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

                  <Compass
                    size={16}
                  />

                </div>

                <span className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Growth Intelligence
                </span>

              </div>


              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#071b3d]">
                Expansion Intelligence
              </h1>


              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                Identify Sri Lankan markets showing the strongest digital demand and determine where Rapid should investigate future expansion.
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


          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">

            <div className="rounded-full bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#0060d0]">
              🇱🇰 Sri Lanka Only
            </div>


            <SourceBadge
              name="GA4"
              source={
                data?.sources
                  ?.ga4
              }
            />


            <SourceBadge
              name="Bookings"
              source={
                data?.sources
                  ?.bookings
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


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="space-y-7 px-6 py-6 lg:px-8">

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}


        {/* =====================================================
            EXPLANATION
        ===================================================== */}

        <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">

          <Crosshair
            size={17}
            className="mt-0.5 shrink-0 text-[#0060d0]"
          />

          <p className="text-[11px] leading-5 text-slate-500">

            Expansion scores are directional signals based on website demand, engagement and geographic whitespace.

            {" "}

            <strong className="text-[#071b3d]">
              They should not be treated as automatic branch-opening recommendations.
            </strong>

            {" "}

            Validate shortlisted markets with customer addresses, population, rent, competition, logistics and operating cost before investment.

          </p>

        </div>


        {/* =====================================================
            KPI
        ===================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <ExpansionMetric
            label="Markets Analyzed"

            value={formatNumber(
              overview.marketsAnalyzed
            )}

            icon={
              MapPin
            }
          />


          <ExpansionMetric
            label="Priority Markets"

            value={formatNumber(
              overview.priorityMarkets
            )}

            icon={
              Target
            }
          />


          <ExpansionMetric
            label="Need Validation"

            value={formatNumber(
              overview.validateMarkets
            )}

            icon={
              CheckCircle2
            }
          />


          <ExpansionMetric
            label="Watchlist"

            value={formatNumber(
              overview.watchlistMarkets
            )}

            icon={
              Eye
            }
          />


          <ExpansionMetric
            label="Current Markets"

            value={formatNumber(
              overview.currentBranches
            )}

            icon={
              Building2
            }
          />

        </section>


        {/* =====================================================
            TOP SIGNALS
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Executive View"

            title="Leading Expansion Signals"

            description="The strongest opportunity indicators detected in current digital demand."
          />


          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <SignalCard
              title="Best Candidate"

              value={
                data?.leaders
                  ?.bestCandidate
                  ?.city ||
                "—"
              }

              metric={
                data?.leaders
                  ?.bestCandidate
                  ? `${data.leaders.bestCandidate.score}/100 score`
                  : "No signal"
              }

              icon={
                Sparkles
              }
            />


            <SignalCard
              title="Strongest Traffic"

              value={
                data?.leaders
                  ?.strongestTrafficMarket
                  ?.city ||
                "—"
              }

              metric={
                data?.leaders
                  ?.strongestTrafficMarket
                  ? `${formatNumber(
                      data.leaders
                        .strongestTrafficMarket
                        .activeUsers
                    )} visitors`
                  : "No signal"
              }

              icon={
                Users
              }
            />


            <SignalCard
              title="Best Engagement"

              value={
                data?.leaders
                  ?.bestEngagementMarket
                  ?.city ||
                "—"
              }

              metric={
                data?.leaders
                  ?.bestEngagementMarket
                  ? formatPercent(
                      data.leaders
                        .bestEngagementMarket
                        .engagementRate
                    )
                  : "No signal"
              }

              icon={
                TrendingUp
              }
            />


            <SignalCard
              title="Largest White Space"

              value={
                data?.leaders
                  ?.biggestWhitespace
                  ?.city ||
                "—"
              }

              metric={
                data?.leaders
                  ?.biggestWhitespace
                  ? `${formatDistance(
                      data.leaders
                        .biggestWhitespace
                        .distanceFromNearestBranch
                    )} from nearest branch`
                  : "No signal"
              }

              icon={
                Route
              }
            />

          </div>

        </section>


        {/* =====================================================
            PRIORITY MARKETS
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Priority"

            title="Priority Expansion Markets"

            description="Highest-scoring markets that deserve deeper commercial validation."
          />


          {priorityMarkets.length ? (
            <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">

              {priorityMarkets.map(
                (
                  market,
                  index
                ) => (

                  <MarketCard
                    key={
                      market.city
                    }

                    market={
                      market
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
              title="No priority market yet"

              description="No Sri Lankan market currently exceeds the priority threshold. This is normal while traffic volume is still growing."
            />
          )}

        </section>


        {/* =====================================================
            ALL CANDIDATES
        ===================================================== */}

        <ExpansionCard>

          <CardHeader
            eyebrow="Market Ranking"

            title="Expansion Candidate Ranking"

            description="All unserved markets ranked by directional expansion score."
          />


          {opportunityMarkets.length ? (
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">

              <div className="min-w-[1000px]">

                <div className="grid grid-cols-[1fr_100px_100px_110px_130px_120px_120px] bg-slate-50 px-4 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">

                  <span>
                    Market
                  </span>

                  <span className="text-right">
                    Visitors
                  </span>

                  <span className="text-right">
                    Share
                  </span>

                  <span className="text-right">
                    Engagement
                  </span>

                  <span className="text-right">
                    Nearest Branch
                  </span>

                  <span className="text-right">
                    Distance
                  </span>

                  <span className="text-right">
                    Score
                  </span>

                </div>


                {opportunityMarkets.map(
                  (
                    market,
                    index
                  ) => (

                    <MarketRow
                      key={`${market.city}-${index}`}

                      market={
                        market
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
              title="No expansion candidates"

              description="Candidate markets will appear after GA4 records traffic outside current branch markets."
            />
          )}

        </ExpansionCard>


        {/* =====================================================
            SCORE COMPONENTS
        ===================================================== */}

        <section>

          <SectionHeading
            eyebrow="Scoring"

            title="Why These Markets Rank"

            description="The score combines demand strength, engagement quality and distance from current Rapid coverage."
          />


          <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-2">

            {opportunityMarkets
              .slice(
                0,
                6
              )
              .map(
                (market) => (

                  <ScoreBreakdown
                    key={
                      market.city
                    }

                    market={
                      market
                    }
                  />

                )
              )}

          </div>

        </section>


        {/* =====================================================
            VALIDATE
        ===================================================== */}

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <ExpansionCard>

            <CardHeader
              eyebrow="Validate"

              title="Markets to Validate"

              description="Promising signals that need stronger evidence before they become priority candidates."
            />


            <MarketMiniList
              markets={
                validationMarkets
              }

              emptyTitle="No validation markets"
            />

          </ExpansionCard>


          <ExpansionCard>

            <CardHeader
              eyebrow="Watch"

              title="Watchlist"

              description="Emerging markets worth monitoring as traffic and customer demand grow."
            />


            <MarketMiniList
              markets={
                watchlistMarkets
              }

              emptyTitle="No watchlist markets"
            />

          </ExpansionCard>

        </section>


        {/* =====================================================
            REGIONS
        ===================================================== */}

        <ExpansionCard>

          <CardHeader
            eyebrow="Regional Context"

            title="Regional Demand Signals"

            description="Broader Sri Lankan regions generating website activity."
          />


          {regionalSignals.length ? (
            <div className="mt-6 space-y-5">

              {regionalSignals.map(
                (
                  region,
                  index
                ) => (

                  <RegionBar
                    key={`${region.region}-${index}`}

                    region={
                      region
                    }

                    max={
                      regionalSignals[0]
                        ?.activeUsers ||
                      1
                    }
                  />

                )
              )}

            </div>
          ) : (
            <EmptyState
              title="No regional signals"

              description="Regional demand will appear as Sri Lankan traffic increases."
            />
          )}

        </ExpansionCard>

      </main>

    </div>
  );
}


/* =========================================================
   KPI
========================================================= */

function ExpansionMetric({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

        <Icon
          size={17}
        />

      </div>

      <div className="mt-5 text-2xl font-black text-[#071b3d]">
        {value}
      </div>

      <div className="mt-1 text-[11px] font-black text-slate-600">
        {label}
      </div>

    </div>
  );
}


/* =========================================================
   SIGNAL
========================================================= */

function SignalCard({
  title,
  value,
  metric,
  icon: Icon,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5">

      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

        <Icon
          size={15}
        />

      </div>

      <div className="mt-4 text-[9px] font-black uppercase tracking-[1.4px] text-slate-400">
        {title}
      </div>

      <div className="mt-1 text-base font-black text-[#071b3d]">
        {value}
      </div>

      <div className="mt-1 text-[10px] text-slate-400">
        {metric}
      </div>

    </div>
  );
}


/* =========================================================
   MARKET CARD
========================================================= */

function MarketCard({
  market,
  rank,
}) {
  return (
    <div className="rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_10px_35px_rgba(0,96,208,.06)]">

      <div className="flex items-start justify-between">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00195f] text-[10px] font-black text-white">
          #{rank}
        </div>

        <ClassificationBadge
          value={
            market.classification
          }
        />

      </div>


      <div className="mt-5 text-xl font-black text-[#071b3d]">
        {
          market.city
        }
      </div>


      <div className="mt-1 text-[10px] text-slate-400">

        Nearest Rapid branch:{" "}

        <strong className="text-slate-600">
          {
            market.nearestBranch
              ?.name ||
            "—"
          }
        </strong>

      </div>


      <div className="mt-5 flex items-end justify-between">

        <div>

          <div className="text-[9px] font-black uppercase tracking-[1.4px] text-slate-400">
            Expansion Score
          </div>

          <div className="mt-1 text-3xl font-black text-[#0060d0]">
            {
              market.score
            }
          </div>

        </div>

        <div className="text-right">

          <div className="text-sm font-black text-[#071b3d]">
            {formatDistance(
              market.distanceFromNearestBranch
            )}
          </div>

          <div className="mt-1 text-[8px] uppercase tracking-wider text-slate-400">
            coverage gap
          </div>

        </div>

      </div>


      <div className="mt-5 grid grid-cols-3 gap-2">

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

    </div>
  );
}


/* =========================================================
   MARKET ROW
========================================================= */

function MarketRow({
  market,
  index,
}) {
  return (
    <div className="grid grid-cols-[1fr_100px_100px_110px_130px_120px_120px] items-center border-t border-slate-100 px-4 py-4">

      <div className="flex items-center gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[10px] font-black text-[#0060d0]">
          {index + 1}
        </div>

        <div>

          <div className="text-xs font-black text-slate-700">
            {
              market.city
            }
          </div>

          <div className="mt-1">
            <ClassificationBadge
              value={
                market.classification
              }
              small
            />
          </div>

        </div>

      </div>

      <span className="text-right text-xs font-black text-[#071b3d]">
        {formatNumber(
          market.activeUsers
        )}
      </span>

      <span className="text-right text-xs font-bold text-slate-500">
        {formatPercent(
          market.share
        )}
      </span>

      <span className="text-right text-xs font-bold text-slate-500">
        {formatPercent(
          market.engagementRate
        )}
      </span>

      <span className="text-right text-xs font-bold text-slate-500">
        {
          market.nearestBranch
            ?.name ||
          "—"
        }
      </span>

      <span className="text-right text-xs font-black text-slate-600">
        {formatDistance(
          market.distanceFromNearestBranch
        )}
      </span>

      <span className="text-right text-sm font-black text-[#0060d0]">
        {
          market.score
        }
      </span>

    </div>
  );
}


/* =========================================================
   SCORE BREAKDOWN
========================================================= */

function ScoreBreakdown({
  market,
}) {
  const scores =
    market.scores ||
    {};

  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5">

      <div className="flex items-start justify-between">

        <div>

          <div className="text-base font-black text-[#071b3d]">
            {
              market.city
            }
          </div>

          <div className="mt-1 text-[9px] text-slate-400">
            Expansion scoring components
          </div>

        </div>

        <div className="text-xl font-black text-[#0060d0]">
          {
            market.score
          }
        </div>

      </div>


      <div className="mt-5 space-y-4">

        <ScoreBar
          label="Traffic demand"
          value={
            scores.traffic
          }
          max={35}
        />

        <ScoreBar
          label="Traffic share"
          value={
            scores.share
          }
          max={20}
        />

        <ScoreBar
          label="Engagement"
          value={
            scores.engagement
          }
          max={20}
        />

        <ScoreBar
          label="Session quality"
          value={
            scores.sessionQuality
          }
          max={10}
        />

        <ScoreBar
          label="Geographic whitespace"
          value={
            scores.whitespace
          }
          max={15}
        />

      </div>

    </div>
  );
}


function ScoreBar({
  label,
  value,
  max,
}) {
  const percentage =
    Math.min(
      (
        Number(value || 0) /
        max
      ) * 100,
      100
    );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-[10px] font-bold text-slate-500">
          {label}
        </span>

        <span className="text-[10px] font-black text-[#071b3d]">
          {Number(
            value || 0
          ).toFixed(
            1
          )}
          /
          {max}
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          style={{
            width:
              `${percentage}%`,
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#00195f] via-[#0060d0] to-[#4fc3f7]"
        />

      </div>

    </div>
  );
}


/* =========================================================
   MINI LIST
========================================================= */

function MarketMiniList({
  markets,
  emptyTitle,
}) {
  if (!markets.length) {
    return (
      <EmptyState
        title={
          emptyTitle
        }
        description="No markets currently match this classification."
      />
    );
  }

  return (
    <div className="mt-6 space-y-3">

      {markets
        .slice(
          0,
          8
        )
        .map(
          (market) => (

            <div
              key={
                market.city
              }
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/40 px-4 py-3"
            >

              <div>

                <div className="text-xs font-black text-slate-700">
                  {
                    market.city
                  }
                </div>

                <div className="mt-1 text-[9px] text-slate-400">
                  {formatNumber(
                    market.activeUsers
                  )}{" "}
                  visitors ·{" "}
                  {formatDistance(
                    market.distanceFromNearestBranch
                  )}
                </div>

              </div>

              <div className="text-lg font-black text-[#0060d0]">
                {
                  market.score
                }
              </div>

            </div>

          )
        )}

    </div>
  );
}


/* =========================================================
   REGION
========================================================= */

function RegionBar({
  region,
  max,
}) {
  const width =
    Math.min(
      (
        Number(
          region.activeUsers ||
            0
        ) /
        Number(
          max || 1
        )
      ) * 100,
      100
    );

  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs font-black text-slate-600">
          {
            region.region
          }
        </span>

        <span className="text-xs font-black text-[#071b3d]">
          {formatNumber(
            region.activeUsers
          )}
        </span>

      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">

        <div
          style={{
            width:
              `${width}%`,
          }}
          className="h-full rounded-full bg-gradient-to-r from-[#00195f] to-[#168cff]"
        />

      </div>

    </div>
  );
}


/* =========================================================
   BADGES
========================================================= */

function ClassificationBadge({
  value,
  small = false,
}) {
  let classes =
    "bg-slate-100 text-slate-500";

  if (
    value === "Priority"
  ) {
    classes =
      "bg-emerald-50 text-emerald-600";
  }

  if (
    value === "Validate"
  ) {
    classes =
      "bg-amber-50 text-amber-600";
  }

  if (
    value ===
    "Existing Market"
  ) {
    classes =
      "bg-blue-50 text-[#0060d0]";
  }

  return (
    <span
      className={`inline-flex rounded-full font-black uppercase tracking-wider ${classes} ${
        small
          ? "px-2 py-1 text-[7px]"
          : "px-3 py-1.5 text-[8px]"
      }`}
    >
      {value}
    </span>
  );
}


/* =========================================================
   SOURCE
========================================================= */

function SourceBadge({
  name,
  source,
}) {
  const connected =
    source?.connected;

  const hasData =
    source?.hasData;

  return (
    <div
      className={`rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-wider ${
        !connected
          ? "bg-slate-100 text-slate-500"
          : hasData
          ? "bg-emerald-50 text-emerald-600"
          : "bg-amber-50 text-amber-600"
      }`}
    >
      {name}{" "}
      {connected
        ? hasData
          ? "Connected"
          : "Waiting"
        : "Offline"}
    </div>
  );
}


/* =========================================================
   COMMON
========================================================= */

function ExpansionCard({
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


function ExpansionSkeleton() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6">

      <div className="h-28 animate-pulse rounded-[24px] bg-white" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {Array.from({
          length: 5,
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