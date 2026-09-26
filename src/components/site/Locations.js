"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Store,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";


/* =========================================================
   API URL
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   DAY NAMES
========================================================= */

const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];


function getTodayKey() {
  const day =
    new Date().getDay();

  return (
    DAY_KEYS[day] ||
    "monday"
  );
}


/* =========================================================
   LOCATION CARD
========================================================= */

function LocationCard({
  location,
  index,
}) {
  const reduceMotion =
    useReducedMotion();


  const slug =
    location.slug ||
    location.id;


  const todayKey =
    getTodayKey();


  const openingToday =
    location.openingHours?.[
      todayKey
    ] ||
    "";


  const locationType =
    location.locationType ||
    "branch";


  const isOutlet =
    locationType ===
    "outlet";


  const typeLabel =
    isOutlet
      ? "Outlet"
      : "Branch";


  const TypeIcon =
    isOutlet
      ? Store
      : Building2;


  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 38,
              scale: 0.985,
              filter:
                "blur(6px)",
            }
      }

      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter:
                "blur(0px)",
            }
      }

      viewport={{
        once: true,
        amount: 0.18,
      }}

      transition={{
        duration: 0.8,

        delay:
          index *
          0.08,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}

      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-[#001F5C]/[0.07]
        bg-white
        shadow-[0_20px_65px_rgba(0,31,92,.065)]
        transition-all
        duration-500

        hover:-translate-y-2
        hover:border-[#0062CC]/15
        hover:shadow-[0_30px_85px_rgba(0,98,204,.14)]
      "
    >

      {/* ===================================================
          IMAGE
      =================================================== */}

      <div
        className="
          relative
          aspect-[16/10]
          overflow-hidden
          bg-[#EEF6FF]
        "
      >

        {location.coverImage?.url ? (

          <Image
            src={
              location.coverImage.url
            }

            alt={`${location.name} ${typeLabel.toLowerCase()}`}

            fill

            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1280px) 50vw,
              33vw
            "

            className="
              object-cover
              transition-transform
              duration-700
              ease-[cubic-bezier(.16,1,.3,1)]

              group-hover:scale-[1.045]
            "
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center

              bg-gradient-to-br
              from-[#EEF6FF]
              via-[#E7F5FF]
              to-[#DFF3FF]

              text-[#0062CC]/25
            "
          >
            <TypeIcon
              size={52}
              strokeWidth={1.4}
            />
          </div>

        )}


        {/* IMAGE OVERLAY */}

        <div
          aria-hidden="true"

          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-[#001F5C]/80
            via-[#001F5C]/10
            to-transparent
          "
        />


        {/* TYPE BADGE */}

        <div
          className="
            absolute
            left-5
            top-5

            flex
            items-center
            gap-2

            rounded-full
            border
            border-white/20

            bg-[#001F5C]/75

            px-3
            py-2

            backdrop-blur-xl
          "
        >
          <TypeIcon
            size={11}
            className="text-[#8CD5FF]"
          />

          <span
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.14em]
              text-white
            "
          >
            Rapid {typeLabel}
          </span>
        </div>


        {/* FEATURED */}

        {location.featured && (

          <div
            className="
              absolute
              right-5
              top-5

              flex
              items-center
              gap-2

              rounded-full

              bg-white

              px-3
              py-2

              shadow-lg
            "
          >
            <Sparkles
              size={11}
              className="
                text-[#0084E3]
              "
            />

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.12em]
                text-[#001F5C]
              "
            >
              Featured
            </span>
          </div>

        )}


        {/* TITLE */}

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5

            flex
            items-end
            justify-between
            gap-4
          "
        >
          <div>

            <div
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#8CD5FF]
              "
            >
              Rapid Laundromat
            </div>


            <div
              className="
                mt-1
                text-[1.65rem]
                font-black
                leading-none
                tracking-[-0.045em]
                text-white
              "
            >
              {
                location.shortName ||
                location.name
              }
            </div>

          </div>


          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-full

              border
              border-white/20

              bg-white/10

              text-white

              backdrop-blur-md

              transition
              duration-300

              group-hover:bg-white
              group-hover:text-[#0062CC]
            "
          >
            <ArrowUpRight
              size={15}
            />
          </div>

        </div>

      </div>


      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          relative
          p-6
          lg:p-7
        "
      >

        {/* LOCATION */}

        <div
          className="
            flex
            items-start
            gap-3

            text-[.85rem]
            leading-6
            text-slate-500
          "
        >
          <MapPin
            size={17}

            className="
              mt-1
              shrink-0
              text-[#0062CC]
            "
          />

          <span>
            {
              location.address ||
              [
                location.district,
                location.province,
              ]
                .filter(
                  Boolean
                )
                .join(", ")
            }
          </span>
        </div>


        {/* QUICK DETAILS */}

        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-3
          "
        >

          <div
            className="
              rounded-[18px]
              bg-[#F5FAFF]
              px-4
              py-3
            "
          >
            <Phone
              size={15}
              className="
                text-[#0084E3]
              "
            />

            <div
              className="
                mt-2
                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-slate-400
              "
            >
              Contact
            </div>

            <div
              className="
                mt-1
                truncate
                text-[.78rem]
                font-black
                text-[#001F5C]
              "
            >
              {
                location.phone ||
                `Contact ${typeLabel}`
              }
            </div>
          </div>


          <div
            className="
              rounded-[18px]
              bg-[#F5FAFF]
              px-4
              py-3
            "
          >
            <Clock3
              size={15}
              className="
                text-[#0084E3]
              "
            />

            <div
              className="
                mt-2
                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-slate-400
              "
            >
              Today
            </div>

            <div
              className="
                mt-1
                text-[.78rem]
                font-black
                text-[#001F5C]
              "
            >
              {
                openingToday ||
                `View ${typeLabel}`
              }
            </div>
          </div>

        </div>


        {/* DESCRIPTION */}

        {location.description && (

          <p
            className="
              mt-6
              line-clamp-3
              text-[.86rem]
              leading-[1.75]
              text-slate-500
            "
          >
            {
              location.description
            }
          </p>

        )}


        {/* SERVICES */}

        {Array.isArray(
          location.services
        ) &&
          location.services.length >
            0 && (

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
          >

            {location.services
              .slice(
                0,
                3
              )
              .map(
                (
                  service
                ) => (

                  <span
                    key={
                      service
                    }

                    className="
                      rounded-full
                      border
                      border-[#0062CC]/10
                      bg-[#EEF6FF]

                      px-3
                      py-1.5

                      text-[9px]
                      font-bold
                      text-[#0062CC]
                    "
                  >
                    {
                      service
                    }
                  </span>

                )
              )}


            {location.services.length >
              3 && (

              <span
                className="
                  rounded-full
                  border
                  border-[#001F5C]/[0.06]
                  bg-white

                  px-3
                  py-1.5

                  text-[9px]
                  font-black
                  text-slate-400
                "
              >
                +
                {
                  location.services.length -
                  3
                }{" "}
                more
              </span>

            )}

          </div>

        )}


        {/* CTA */}

        <div
          className="
            mt-7
            flex
            items-center
            justify-between
            gap-4

            border-t
            border-[#001F5C]/[0.07]

            pt-5
          "
        >

          {location.googleMapUrl ? (

            <a
              href={
                location.googleMapUrl
              }

              target="_blank"

              rel="noopener noreferrer"

              className="
                group/map
                inline-flex
                items-center
                gap-2

                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-slate-400

                transition
                duration-300

                hover:text-[#0062CC]
              "
            >
              <Navigation
                size={13}
              />

              Directions
            </a>

          ) : (

            <div
              className="
                inline-flex
                items-center
                gap-2

                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-slate-300
              "
            >
              <Navigation
                size={13}
              />

              Directions
            </div>

          )}


          <Link
            href={`/locations/${slug}`}

            className="
              group/link
              inline-flex
              items-center
              gap-2

              text-[9px]
              font-black
              uppercase
              tracking-[0.14em]

              text-[#0062CC]

              transition-colors

              hover:text-[#0084E3]
            "
          >
            Explore {typeLabel}

            <ArrowUpRight
              size={13}

              className="
                transition-transform
                duration-300

                group-hover/link:-translate-y-0.5
                group-hover/link:translate-x-0.5
              "
            />
          </Link>

        </div>


        <div
          aria-hidden="true"

          className="
            absolute
            bottom-0
            left-0

            h-[2px]
            w-0

            bg-gradient-to-r
            from-[#0062CC]
            via-[#0084E3]
            to-[#41B6FF]

            transition-all
            duration-500

            group-hover:w-full
          "
        />

      </div>

    </motion.article>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function LocationGroupHeading({
  eyebrow,
  title,
  description,
  count,
  icon: Icon,
}) {
  return (
    <div
      className="
        mb-8
        flex
        flex-col
        gap-5

        md:flex-row
        md:items-end
        md:justify-between
      "
    >

      <div>

        <div
          className="
            flex
            items-center
            gap-2

            text-[9px]
            font-black
            uppercase
            tracking-[0.18em]
            text-[#0062CC]
          "
        >
          <Icon
            size={14}
          />

          {eyebrow}
        </div>


        <h3
          className="
            mt-3
            font-barlowCond
            text-[clamp(2.1rem,4vw,3.6rem)]
            font-black
            uppercase
            leading-none
            tracking-[-0.025em]
            text-[#001F5C]
          "
        >
          {title}
        </h3>


        <p
          className="
            mt-3
            max-w-[650px]
            text-[.9rem]
            leading-7
            text-slate-500
          "
        >
          {description}
        </p>

      </div>


      <div
        className="
          inline-flex
          w-fit
          items-center
          gap-3

          rounded-full
          border
          border-[#0062CC]/10
          bg-white

          px-4
          py-2

          shadow-[0_10px_30px_rgba(0,31,92,.04)]
        "
      >
        <span
          className="
            text-xl
            font-black
            text-[#001F5C]
          "
        >
          {count}
        </span>

        <span
          className="
            text-[8px]
            font-black
            uppercase
            tracking-[0.15em]
            text-slate-400
          "
        >
          {
            count === 1
              ? "Location"
              : "Locations"
          }
        </span>
      </div>

    </div>
  );
}


/* =========================================================
   LOCATIONS
========================================================= */

export default function Locations({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  const [
    firestoreLocations,
    setFirestoreLocations,
  ] =
    useState([]);


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    error,
    setError,
  ] =
    useState("");


  /* =======================================================
     LOAD LOCATIONS
  ======================================================= */

  useEffect(() => {
    let cancelled =
      false;


    async function loadLocations() {
      try {
        setLoading(
          true
        );

        setError(
          ""
        );


        if (
          !API_URL
        ) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not configured."
          );
        }


        const response =
          await fetch(
            `${API_URL}/api/people/branches`,
            {
              method:
                "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache:
                "no-store",
            }
          );


        if (
          !response.ok
        ) {
          throw new Error(
            `Location request failed with status ${response.status}`
          );
        }


        const result =
          await response.json();


        if (
          !result?.success ||
          !Array.isArray(
            result.branches
          )
        ) {
          throw new Error(
            "Invalid location response."
          );
        }


        if (
          cancelled
        ) {
          return;
        }


        setFirestoreLocations(
          result.branches
        );

      } catch (error) {
        console.error(
          "Failed to load locations:",
          error
        );


        if (
          !cancelled
        ) {
          setError(
            "Unable to load locations."
          );
        }

      } finally {
        if (
          !cancelled
        ) {
          setLoading(
            false
          );
        }
      }
    }


    loadLocations();


    return () => {
      cancelled =
        true;
    };

  }, []);


  /* =======================================================
     LOCATION SOURCE
  ======================================================= */

  const locations =
    useMemo(
      () => {

        if (
          firestoreLocations.length >
          0
        ) {
          return firestoreLocations;
        }


        if (
          Array.isArray(
            data.branches
          ) &&
          data.branches.length >
            0
        ) {
          return data.branches;
        }


        return [];

      },
      [
        firestoreLocations,
        data.branches,
      ]
    );


  /* =======================================================
     ACTIVE LOCATIONS
  ======================================================= */

  const visibleLocations =
    useMemo(
      () =>
        locations.filter(
          (
            location
          ) =>
            location.active !==
            false
        ),
      [
        locations,
      ]
    );


  /* =======================================================
     BRANCHES
  ======================================================= */

  const branches =
    useMemo(
      () =>
        visibleLocations.filter(
          (
            location
          ) =>
            (
              location.locationType ||
              "branch"
            ) === "branch"
        ),
      [
        visibleLocations,
      ]
    );


  /* =======================================================
     OUTLETS
  ======================================================= */

  const outlets =
    useMemo(
      () =>
        visibleLocations.filter(
          (
            location
          ) =>
            location.locationType ===
            "outlet"
        ),
      [
        visibleLocations,
      ]
    );


  /* =======================================================
     CITY COUNT
  ======================================================= */

  const cityCount =
    useMemo(
      () => {

        const cities =
          visibleLocations
            .map(
              (
                location
              ) =>
                location.district ||
                location.shortName ||
                location.name
            )
            .filter(
              Boolean
            );


        return new Set(
          cities
        ).size;

      },
      [
        visibleLocations,
      ]
    );


  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading
  ) {
    return (
      <section
        id="locations"

        className="
          bg-[#F7FBFF]
          px-[5%]
          py-24
          lg:py-32
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >
          <div
            className="
              grid
              gap-6
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {[
              1,
              2,
              3,
            ].map(
              (
                item
              ) => (

                <div
                  key={
                    item
                  }

                  className="
                    overflow-hidden
                    rounded-[32px]
                    border
                    border-[#001F5C]/[0.05]
                    bg-white
                  "
                >

                  <div
                    className="
                      aspect-[16/10]
                      animate-pulse
                      bg-[#EAF4FF]
                    "
                  />


                  <div
                    className="
                      space-y-4
                      p-7
                    "
                  >
                    <div
                      className="
                        h-4
                        w-2/3
                        animate-pulse
                        rounded-full
                        bg-slate-100
                      "
                    />

                    <div
                      className="
                        h-4
                        w-1/2
                        animate-pulse
                        rounded-full
                        bg-slate-100
                      "
                    />
                  </div>

                </div>

              )
            )}
          </div>
        </div>
      </section>
    );
  }


  if (
    visibleLocations.length ===
    0
  ) {
    if (
      error
    ) {
      console.error(
        error
      );
    }

    return null;
  }


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <section
      id="locations"

      className="
        relative
        overflow-hidden
        bg-[#F7FBFF]

        px-[5%]
        py-24

        lg:py-32
      "
    >

      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -left-52
          top-20

          h-[560px]
          w-[560px]

          rounded-full

          bg-[#41B6FF]/[0.09]

          blur-[155px]
        "
      />


      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -right-48
          bottom-0

          h-[520px]
          w-[520px]

          rounded-full

          bg-[#0062CC]/[0.05]

          blur-[150px]
        "
      />


      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
        "
      >

        {/* =================================================
            MAIN HEADER
        ================================================= */}

        <div
          className="
            grid
            gap-9

            lg:grid-cols-[1.1fr_.55fr]
            lg:items-end
          "
        >

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                  }
            }

            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.85,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <MapPin
                size={16}
                className="
                  text-[#0062CC]
                "
              />

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-[#0062CC]
                "
              >
                Our Locations
              </span>
            </div>


            <h2
              className="
                mt-5
                max-w-[900px]

                font-barlowCond

                text-[clamp(3rem,6vw,6rem)]
                font-black
                uppercase

                leading-[.91]
                tracking-[.5px]

                text-[#001F5C]
              "
            >
              Find your nearest
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#0062CC]
                  via-[#0084E3]
                  to-[#41B6FF]

                  bg-clip-text
                  text-transparent
                "
              >
                Rapid experience.
              </span>
            </h2>

          </motion.div>


          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }

            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.8,
              delay: 0.14,
            }}
          >

            <p
              className="
                max-w-[530px]
                text-[1rem]
                leading-[1.8]
                text-slate-500
                lg:ml-auto
              "
            >
              From full-service branches to convenient Rapid outlets,
              every location is designed to make professional garment
              care easier and more accessible.
            </p>


            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-3
                lg:justify-end
              "
            >

              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-[#001F5C]/40
                "
              >
                {
                  branches.length
                }{" "}
                {
                  branches.length ===
                  1
                    ? "Branch"
                    : "Branches"
                }
              </span>


              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#41B6FF]
                "
              />


              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-[#001F5C]/40
                "
              >
                {
                  outlets.length
                }{" "}
                {
                  outlets.length ===
                  1
                    ? "Outlet"
                    : "Outlets"
                }
              </span>


              <span
                className="
                  h-1
                  w-1
                  rounded-full
                  bg-[#41B6FF]
                "
              />


              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-[#001F5C]/40
                "
              >
                {
                  cityCount
                }{" "}
                {
                  cityCount ===
                  1
                    ? "City"
                    : "Cities"
                }
              </span>

            </div>

          </motion.div>

        </div>


        {/* =================================================
            BRANCHES
        ================================================= */}

        {branches.length >
          0 && (

          <div
            className="
              mt-20
            "
          >

            <LocationGroupHeading
              eyebrow="Full-Service Locations"

              title="Rapid Branches"

              description="Our full-service branches provide the complete Rapid garment-care experience, including professional laundry, dry cleaning and specialist care services."

              count={
                branches.length
              }

              icon={
                Building2
              }
            />


            <div
              className="
                grid
                grid-cols-1
                gap-6

                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              {branches.map(
                (
                  branch,
                  index
                ) => (

                  <LocationCard
                    key={
                      branch.id ||
                      branch.slug
                    }

                    location={
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

        )}


        {/* =================================================
            OUTLETS
        ================================================= */}

        {outlets.length >
          0 && (

          <div
            className="
              mt-24
              border-t
              border-[#001F5C]/[0.07]
              pt-16
            "
          >

            <LocationGroupHeading
              eyebrow="Convenient Access"

              title="Rapid Outlets"

              description="Rapid outlets bring our services closer to you with convenient customer access, garment drop-off, collection and selected service options."

              count={
                outlets.length
              }

              icon={
                Store
              }
            />


            <div
              className="
                grid
                grid-cols-1
                gap-6

                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              {outlets.map(
                (
                  outlet,
                  index
                ) => (

                  <LocationCard
                    key={
                      outlet.id ||
                      outlet.slug
                    }

                    location={
                      outlet
                    }

                    index={
                      index
                    }
                  />

                )
              )}

            </div>

          </div>

        )}

      </div>

    </section>
  );
}