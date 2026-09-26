"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";

/* =========================================================
   SRI LANKA CITY COORDINATES
========================================================= */

const CITY_COORDINATES = {
  Colombo: [6.9271, 79.8612],
  Kandy: [7.2906, 80.6337],
  Galle: [6.0535, 80.221],
  Kurunegala: [7.4863, 80.3623],
  Jaffna: [9.6615, 80.0255],
  Negombo: [7.2083, 79.8358],
  Matara: [5.9549, 80.555],
  Ratnapura: [6.6828, 80.3992],
  Anuradhapura: [8.3114, 80.4037],
  Polonnaruwa: [7.9403, 81.0188],
  Batticaloa: [7.717, 81.7],
  Trincomalee: [8.5874, 81.2152],
  Badulla: [6.9934, 81.055],
  NuwaraEliya: [6.9497, 80.7891],
  "Nuwara Eliya": [6.9497, 80.7891],
  Hambantota: [6.1429, 81.1212],
  Kalutara: [6.5854, 79.9607],
  Puttalam: [8.0362, 79.8283],
  Chilaw: [7.5758, 79.7953],
  Kegalle: [7.2513, 80.3464],
  Ampara: [7.2912, 81.6724],
  Monaragala: [6.8728, 81.3507],
  Vavuniya: [8.7514, 80.4971],
  Mannar: [8.981, 79.9044],
  Mullaitivu: [9.2671, 80.8142],
  Kilinochchi: [9.3803, 80.377],

  Gampaha: [7.0873, 80.0144],
  Moratuwa: [6.773, 79.8816],
  Panadura: [6.7132, 79.9026],
  Maharagama: [6.848, 79.9265],
  Kotte: [6.8941, 79.9025],
  Dehiwala: [6.8513, 79.8653],
  Matale: [7.4675, 80.6234],
  Dambulla: [7.8742, 80.6511],
};

const MAPTILER_KEY =
  process.env.NEXT_PUBLIC_MAPTILER_KEY;

/* =========================================================
   NORMALIZE CITY
========================================================= */

function normalizeCity(value = "") {
  return String(value)
    .trim()
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .replace(/\./g, "")
    .toLowerCase();
}

function getCoordinates(cityName) {
  const normalized =
    normalizeCity(cityName);

  const match =
    Object.entries(
      CITY_COORDINATES
    ).find(([name]) => {
      return (
        normalizeCity(name) ===
        normalized
      );
    });

  return match?.[1] || null;
}

/* =========================================================
   FORMAT
========================================================= */

function formatNumber(value) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(
    Number(value || 0)
  );
}

/* =========================================================
   LIVE PULSE ICON
========================================================= */

function createPulseIcon({
  size = 20,
  intensity = 0,
  delay = 0,
}) {
  const pulseSpeed =
    Math.max(
      1.6,
      2.8 -
        intensity * 1.1
    );

  const pulseScale =
    2.6 +
    intensity * 0.9;

  return L.divIcon({
    className:
      "rapid-live-marker",

    html: `
      <div
        class="rapid-pulse-wrap"
        style="
          width:${size}px;
          height:${size}px;
          --rapid-pulse-speed:${pulseSpeed}s;
          --rapid-pulse-delay:${delay}s;
          --rapid-pulse-scale:${pulseScale};
        "
      >

        <span
          class="rapid-pulse-halo"
        ></span>

        <span
          class="rapid-pulse-ring rapid-pulse-ring-one"
        ></span>

        <span
          class="rapid-pulse-ring rapid-pulse-ring-two"
        ></span>

        <span
          class="rapid-pulse-core"
        >
          <span
            class="rapid-pulse-core-highlight"
          ></span>
        </span>

      </div>
    `,

    iconSize: [
      size,
      size,
    ],

    iconAnchor: [
      size / 2,
      size / 2,
    ],

    popupAnchor: [
      0,
      -(size / 2) - 10,
    ],
  });
}

/* =========================================================
   MAP
========================================================= */

export default function SriLankaDemandMap({
  cities = [],
}) {
  const mappedCities =
    cities
      .map((city) => ({
        ...city,

        coordinates:
          getCoordinates(
            city.city
          ),
      }))
      .filter(
        (city) =>
          city.coordinates
      );

  const maxUsers =
    Math.max(
      ...mappedCities.map(
        (city) =>
          Number(
            city.activeUsers || 0
          )
      ),
      1
    );

  const totalUsers =
    mappedCities.reduce(
      (sum, city) =>
        sum +
        Number(
          city.activeUsers || 0
        ),
      0
    );

  const topCity =
    [...mappedCities]
      .sort(
        (a, b) =>
          Number(
            b.activeUsers || 0
          ) -
          Number(
            a.activeUsers || 0
          )
      )[0] || null;

  return (
    <div className="relative h-[560px] overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,.06)]">

      {/* =====================================================
          HEADER OVERLAY
      ===================================================== */}

      <div className="pointer-events-none absolute left-5 top-5 z-[500]">

        <div className="rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3.5 shadow-[0_12px_35px_rgba(15,23,42,.10)] backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-base">
              🇱🇰
            </div>

            <div>

              <div className="text-[9px] font-black uppercase tracking-[1.8px] text-[#0060d0]">
                Sri Lanka
              </div>

              <div className="mt-0.5 text-sm font-black text-[#071b3d]">
                Digital Demand Map
              </div>

            </div>

          </div>

          <div className="mt-3 border-t border-slate-100 pt-3 text-[10px] text-slate-400">
            Approximate GA4 city traffic
          </div>

        </div>

      </div>

      {/* =====================================================
          TOP CITY
      ===================================================== */}

      <div className="pointer-events-none absolute right-5 top-5 z-[500] hidden sm:block">

        <div className="rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_12px_35px_rgba(15,23,42,.08)] backdrop-blur-xl">

          <div className="text-[8px] font-black uppercase tracking-[1.5px] text-slate-400">
            Strongest Signal
          </div>

          <div className="mt-1 text-sm font-black text-[#071b3d]">
            {
              topCity?.city ||
              "—"
            }
          </div>

          <div className="mt-1 flex items-center gap-2 text-[9px] text-slate-400">

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#168cff] opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#168cff]" />

            </span>

            {formatNumber(
              topCity?.activeUsers
            )}{" "}
            visitors

          </div>

        </div>

      </div>

      {/* =====================================================
          MAP
      ===================================================== */}

      <MapContainer
        center={[
          7.8731,
          80.7718,
        ]}
        zoom={7.4}
        minZoom={7}
        maxZoom={12}
        scrollWheelZoom
        zoomControl
        attributionControl
        maxBounds={[
          [
            5.25,
            78.7,
          ],
          [
            10.25,
            82.4,
          ],
        ]}
        maxBoundsViscosity={
          0.8
        }
        style={{
          height:
            "100%",

          width:
            "100%",

          background:
            "#ffffff",
        }}
      >

        {/* ===================================================
            MAPTILER WHITE / DATAVIZ MAP
        =================================================== */}

        {MAPTILER_KEY ? (
          <TileLayer
            url={`https://api.maptiler.com/maps/dataviz-light/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
            attribution="&copy; MapTiler &copy; OpenStreetMap contributors"
          />
        ) : (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        )}

        {/* ===================================================
            ANIMATED DEMAND MARKERS
        =================================================== */}

        {mappedCities.map(
          (
            city,
            index
          ) => {
            const users =
              Number(
                city.activeUsers ||
                  0
              );

            const ratio =
              Math.min(
                users /
                  maxUsers,
                1
              );

            /*
             * Bigger city demand =
             * larger center dot.
             */
            const size =
              Math.max(
                18,
                18 +
                  ratio *
                    20
              );

            /*
             * Stagger animation so
             * every city doesn't pulse
             * at exactly the same time.
             */
            const delay =
              (index % 6) *
              0.16;

            const icon =
              createPulseIcon({
                size,
                intensity:
                  ratio,
                delay,
              });

            return (
              <Marker
                key={`${city.city}-${index}`}
                position={
                  city.coordinates
                }
                icon={
                  icon
                }
                riseOnHover
              >

                {/* =============================================
                    TOOLTIP
                ============================================= */}

                <Tooltip
                  direction="top"
                  offset={[
                    0,
                    -14,
                  ]}
                  opacity={1}
                  className="rapid-map-tooltip"
                >

                  <div className="min-w-[130px]">

                    <div className="text-[11px] font-black text-[#071b3d]">
                      {
                        city.city
                      }
                    </div>

                    <div className="mt-1 flex items-center gap-1.5 text-[9px] font-medium text-slate-400">

                      <span className="h-1.5 w-1.5 rounded-full bg-[#168cff]" />

                      {formatNumber(
                        city.activeUsers
                      )}{" "}
                      visitors

                    </div>

                  </div>

                </Tooltip>

                {/* =============================================
                    POPUP
                ============================================= */}

                <Popup
                  className="rapid-map-popup"
                >

                  <div className="min-w-[210px]">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <div className="text-[8px] font-black uppercase tracking-[1.5px] text-[#0060d0]">
                          Sri Lanka
                        </div>

                        <div className="mt-1 text-base font-black text-[#071b3d]">
                          {
                            city.city
                          }
                        </div>

                      </div>

                      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-50">

                        <span className="absolute h-5 w-5 animate-ping rounded-full bg-[#168cff]/20" />

                        <span className="relative h-3 w-3 rounded-full bg-[#168cff] shadow-[0_0_15px_rgba(22,140,255,.8)]" />

                      </div>

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">

                      <MapMetric
                        label="Visitors"

                        value={formatNumber(
                          city.activeUsers
                        )}
                      />

                      <MapMetric
                        label="Sessions"

                        value={formatNumber(
                          city.sessions
                        )}
                      />

                      <MapMetric
                        label="Share"

                        value={`${Number(
                          city.share ||
                            0
                        ).toFixed(
                          1
                        )}%`}
                      />

                      <MapMetric
                        label="Engagement"

                        value={`${Number(
                          city.engagementRate ||
                            0
                        ).toFixed(
                          1
                        )}%`}
                      />

                    </div>

                    <div className="mt-3 border-t border-slate-100 pt-3 text-[9px] leading-4 text-slate-400">

                      Approximate location based on GA4 network geography.

                    </div>

                  </div>

                </Popup>

              </Marker>
            );
          }
        )}

      </MapContainer>

      {/* =====================================================
          TOTAL TRAFFIC
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-5 left-5 z-[500] hidden sm:block">

        <div className="rounded-xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,.08)] backdrop-blur-xl">

          <div className="text-[8px] font-black uppercase tracking-[1.5px] text-slate-400">
            Tracked Demand
          </div>

          <div className="mt-1 text-lg font-black text-[#071b3d]">
            {formatNumber(
              totalUsers
            )}
          </div>

          <div className="mt-0.5 text-[9px] text-slate-400">

            visitors across{" "}

            <span className="font-bold text-slate-600">
              {
                mappedCities.length
              }
            </span>{" "}

            cities

          </div>

        </div>

      </div>

      {/* =====================================================
          LEGEND
      ===================================================== */}

      <div className="pointer-events-none absolute bottom-5 right-5 z-[500] rounded-xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,.08)] backdrop-blur-xl">

        <div className="text-[8px] font-black uppercase tracking-[1.5px] text-slate-400">
          Digital Demand
        </div>

        <div className="mt-2 flex items-center gap-3">

          <div className="relative flex h-7 w-7 items-center justify-center">

            <span className="absolute h-6 w-6 animate-ping rounded-full border border-[#168cff]/40 bg-[#168cff]/10" />

            <span className="relative h-2.5 w-2.5 rounded-full border border-white bg-[#168cff] shadow-[0_0_10px_rgba(22,140,255,.65)]" />

          </div>

          <div>

            <div className="text-[9px] font-bold text-slate-600">
              Live market signal
            </div>

            <div className="mt-0.5 text-[8px] text-slate-400">
              Larger pulse = higher demand
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   POPUP METRIC
========================================================= */

function MapMetric({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2.5">

      <div className="text-sm font-black text-[#071b3d]">
        {value}
      </div>

      <div className="mt-0.5 text-[8px] font-black uppercase tracking-[1px] text-slate-400">
        {label}
      </div>

    </div>
  );
}