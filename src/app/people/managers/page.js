import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  MapPin,
  Store,
  UserRound,
} from "lucide-react";

import PeopleNavbar from "@/components/site/PeopleNavbar";

import {
  getBranchManagers,
  getPeopleBranches,
} from "@/lib/getPeople";


/* =========================================================
   METADATA
========================================================= */

export const metadata = {
  title:
    "Location Managers | Rapid Laundromat",

  description:
    "Meet the managers leading operations, service quality and customer experience across Rapid Laundromat branches and outlets.",
};


/* =========================================================
   HELPERS
========================================================= */

function getLocationType(
  location
) {
  return (
    location?.locationType ||
    "branch"
  );
}


function getLocationLabel(
  location
) {
  return getLocationType(
    location
  ) === "outlet"
    ? "Outlet"
    : "Branch";
}


function getManagerLocationIds(
  manager
) {
  if (
    Array.isArray(
      manager?.locationIds
    )
  ) {
    return manager.locationIds;
  }


  /*
   * Legacy support
   */

  if (
    manager?.branchId
  ) {
    return [
      manager.branchId,
    ];
  }


  return [];
}


/* =========================================================
   PAGE
========================================================= */

export default async function ManagersPage() {

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const [
    locations,
    managers,
  ] =
    await Promise.all([
      getPeopleBranches(),
      getBranchManagers(),
    ]);


  /* =======================================================
     ACTIVE LOCATIONS
  ======================================================= */

  const activeLocations =
    Array.isArray(
      locations
    )
      ? locations.filter(
          (
            location
          ) =>
            location &&
            location.active !==
              false
        )
      : [];


  /* =======================================================
     ACTIVE MANAGERS
  ======================================================= */

  const activeManagers =
    Array.isArray(
      managers
    )
      ? managers.filter(
          (
            manager
          ) =>
            manager &&
            manager.active !==
              false
        )
      : [];


  /* =======================================================
     LOCATION MAP
  ======================================================= */

  const locationMap =
    Object.fromEntries(
      activeLocations.map(
        (
          location
        ) => [
          String(
            location.id
          ),

          location,
        ]
      )
    );


  /* =======================================================
     COUNTS
  ======================================================= */

  const branchCount =
    activeLocations.filter(
      (
        location
      ) =>
        getLocationType(
          location
        ) === "branch"
    ).length;


  const outletCount =
    activeLocations.filter(
      (
        location
      ) =>
        getLocationType(
          location
        ) === "outlet"
    ).length;


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <>
      <PeopleNavbar />


      <main
        className="
          min-h-screen
          bg-[#F7FBFF]

          px-[5%]
          pb-28
          pt-36
        "
      >

        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <Building2
              size={17}

              className="
                text-[#0062CC]
              "
            />


            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[.2em]

                text-[#0062CC]
              "
            >
              Location Leadership
            </span>
          </div>


          <h1
            className="
              mt-5

              max-w-[1000px]

              font-barlowCond

              text-[clamp(3.5rem,7vw,7rem)]
              font-black
              uppercase

              leading-[.88]

              text-[#001F5C]
            "
          >
            Leadership where

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
              service happens.
            </span>
          </h1>


          <p
            className="
              mt-7

              max-w-[720px]

              text-[1rem]
              leading-[1.85]

              text-slate-500
            "
          >
            Meet the managers responsible for local operations,
            teams, service standards and customer experience
            across Rapid Laundromat branches and outlets.
          </p>


          {/* =================================================
              LOCATION SUMMARY
          ================================================= */}

          <div
            className="
              mt-8

              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            <SummaryChip
              icon={
                Building2
              }

              value={
                branchCount
              }

              label={
                branchCount ===
                1
                  ? "Branch"
                  : "Branches"
              }
            />


            <SummaryChip
              icon={
                Store
              }

              value={
                outletCount
              }

              label={
                outletCount ===
                1
                  ? "Outlet"
                  : "Outlets"
              }
            />


            <SummaryChip
              icon={
                UserRound
              }

              value={
                activeManagers.length
              }

              label={
                activeManagers.length ===
                1
                  ? "Manager"
                  : "Managers"
              }
            />

          </div>


          {/* =================================================
              EMPTY STATE
          ================================================= */}

          {activeLocations.length ===
          0 ? (

            <div
              className="
                mt-16
              "
            >
              <EmptyPeople
                text="Location information will be added here."
              />
            </div>

          ) : (

            /* ===============================================
               LOCATIONS
            =============================================== */

            <div
              className="
                mt-16
                space-y-24
              "
            >

              {activeLocations.map(
                (
                  location
                ) => {

                  /* =========================================
                     LOCATION TYPE
                  ========================================= */

                  const locationType =
                    getLocationType(
                      location
                    );


                  const isOutlet =
                    locationType ===
                    "outlet";


                  const locationLabel =
                    getLocationLabel(
                      location
                    );


                  const LocationIcon =
                    isOutlet
                      ? Store
                      : Building2;


                  /* =========================================
                     MANAGERS FOR LOCATION
                  ========================================= */

                  const locationManagers =
                    activeManagers.filter(
                      (
                        manager
                      ) => {

                        const managerLocationIds =
                          getManagerLocationIds(
                            manager
                          );


                        return managerLocationIds.some(
                          (
                            locationId
                          ) =>
                            String(
                              locationId
                            ) ===
                            String(
                              location.id ||
                              ""
                            )
                        );
                      }
                    );


                  /* =========================================
                     LOCATION URL
                  ========================================= */

                  const locationIdentifier =
                    location.slug ||
                    location.id;


                  const locationUrl =
                    locationIdentifier
                      ? `/locations/${locationIdentifier}`
                      : "/locations";


                  return (
                    <section
                      key={
                        location.id ||
                        location.slug
                      }
                    >

                      {/* =====================================
                          LOCATION HEADER
                      ===================================== */}

                      <div
                        className="
                          flex
                          flex-col
                          gap-4

                          border-b
                          border-[#001F5C]/[0.08]

                          pb-5

                          sm:flex-row
                          sm:items-end
                          sm:justify-between
                        "
                      >

                        <div>

                          <div
                            className="
                              flex
                              flex-wrap
                              items-center
                              gap-2

                              text-[9px]
                              font-black
                              uppercase
                              tracking-[.17em]

                              text-[#0084E3]
                            "
                          >

                            <LocationIcon
                              size={13}
                            />

                            Rapid {locationLabel}

                          </div>


                          <h2
                            className="
                              mt-2

                              text-3xl
                              font-black

                              tracking-[-.045em]

                              text-[#001F5C]
                            "
                          >
                            {
                              location.name ||
                              location.shortName ||
                              "Rapid Laundromat"
                            }
                          </h2>


                          {(location.district ||
                            location.province) && (

                            <div
                              className="
                                mt-2

                                flex
                                flex-wrap
                                items-center
                                gap-1.5

                                text-[.75rem]
                                font-semibold

                                text-slate-400
                              "
                            >

                              <MapPin
                                size={12}
                              />


                              {location.district && (

                                <span>
                                  {
                                    location.district
                                  }
                                </span>

                              )}


                              {location.district &&
                                location.province && (

                                  <span>
                                    ·
                                  </span>

                                )}


                              {location.province && (

                                <span>
                                  {
                                    location.province
                                  }
                                </span>

                              )}

                            </div>

                          )}

                        </div>


                        <Link
                          href={
                            locationUrl
                          }

                          className="
                            group

                            inline-flex
                            items-center
                            gap-2

                            text-[9px]
                            font-black
                            uppercase
                            tracking-[.13em]

                            text-[#0062CC]

                            transition
                            duration-300

                            hover:text-[#0084E3]
                          "
                        >
                          View {locationLabel}

                          <ArrowUpRight
                            size={13}

                            className="
                              transition-transform
                              duration-300

                              group-hover:-translate-y-0.5
                              group-hover:translate-x-0.5
                            "
                          />
                        </Link>

                      </div>


                      {/* =====================================
                          MANAGERS
                      ===================================== */}

                      {locationManagers.length >
                      0 ? (

                        <div
                          className="
                            mt-9

                            flex
                            flex-col
                            items-center
                            gap-7
                          "
                        >

                          {locationManagers.map(
                            (
                              manager
                            ) => (

                              <ManagerCard
                                key={`${location.id}-${manager.id}`}

                                manager={
                                  manager
                                }

                                currentLocation={
                                  location
                                }

                                locationMap={
                                  locationMap
                                }
                              />

                            )
                          )}

                        </div>

                      ) : (

                        <EmptyPeople
                          text={`Manager profile for this ${locationLabel.toLowerCase()} will be added here.`}
                        />

                      )}

                    </section>
                  );
                }
              )}

            </div>

          )}

        </div>

      </main>
    </>
  );
}


/* =========================================================
   SUMMARY CHIP
========================================================= */

function SummaryChip({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-3

        rounded-full

        border
        border-[#0062CC]/10

        bg-white

        px-4
        py-2.5

        shadow-[0_8px_30px_rgba(0,31,92,.04)]
      "
    >

      <div
        className="
          flex
          h-8
          w-8
          items-center
          justify-center

          rounded-full

          bg-[#EEF6FF]

          text-[#0062CC]
        "
      >
        <Icon
          size={13}
        />
      </div>


      <div>
        <div
          className="
            text-sm
            font-black

            leading-none

            text-[#001F5C]
          "
        >
          {
            value
          }
        </div>


        <div
          className="
            mt-1

            text-[7px]
            font-black
            uppercase
            tracking-[.12em]

            text-slate-400
          "
        >
          {
            label
          }
        </div>
      </div>

    </div>
  );
}


/* =========================================================
   MANAGER CARD
========================================================= */

function ManagerCard({
  manager,
  currentLocation,
  locationMap,
}) {

  /* =======================================================
     PHOTO
  ======================================================= */

  const imageUrl =
    manager?.photo?.url ||
    manager?.image ||
    null;


  /* =======================================================
     CURRENT LOCATION
  ======================================================= */

  const currentLocationType =
    getLocationType(
      currentLocation
    );


  const currentIsOutlet =
    currentLocationType ===
    "outlet";


  const currentLocationLabel =
    currentIsOutlet
      ? "Outlet"
      : "Branch";


  const CurrentLocationIcon =
    currentIsOutlet
      ? Store
      : Building2;


  /* =======================================================
     ALL MANAGER LOCATIONS
  ======================================================= */

  const managerLocationIds =
    getManagerLocationIds(
      manager
    );


  const assignedLocations =
    managerLocationIds
      .map(
        (
          locationId
        ) =>
          locationMap[
            String(
              locationId
            )
          ]
      )
      .filter(Boolean);


  const assignedLocationCount =
    assignedLocations.length;


  return (
    <article
      className="
        group

        relative

        w-full
        max-w-[1250px]

        overflow-hidden

        rounded-[34px]

        border
        border-[#001F5C]/[0.07]

        bg-white

        shadow-[0_16px_55px_rgba(0,31,92,0.055)]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-[#0062CC]/15
        hover:shadow-[0_30px_90px_rgba(0,31,92,0.10)]
      "
    >

      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute
          -right-28
          -top-28

          h-[360px]
          w-[360px]

          rounded-full

          bg-[#41B6FF]/[0.07]

          blur-[110px]

          transition-all
          duration-700

          group-hover:bg-[#41B6FF]/[0.11]
        "
      />


      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute
          bottom-[-150px]
          right-[25%]

          h-[300px]
          w-[300px]

          rounded-full

          bg-[#0062CC]/[0.04]

          blur-[100px]
        "
      />


      {/* ===================================================
          CARD GRID
      =================================================== */}

      <div
        className="
          relative
          z-10

          grid

          md:grid-cols-[300px_minmax(0,1fr)]
          lg:grid-cols-[340px_minmax(0,1fr)]
          xl:grid-cols-[370px_minmax(0,1fr)]
        "
      >

        {/* =================================================
            PHOTO
        ================================================= */}

        <div
          className="
            relative

            min-h-[400px]

            overflow-hidden

            bg-[#EEF6FF]

            md:min-h-[520px]
          "
        >

          {imageUrl ? (

            <Image
              src={
                imageUrl
              }

              alt={
                manager.name ||
                "Rapid Laundromat Manager"
              }

              fill

              sizes="
                (max-width: 768px) 100vw,
                370px
              "

              className="
                object-cover
                object-top

                transition-transform
                duration-700

                group-hover:scale-[1.025]
              "
            />

          ) : (

            <div
              className="
                flex
                h-full
                min-h-[400px]
                items-center
                justify-center

                text-[#0062CC]/20

                md:min-h-[520px]
              "
            >
              <UserRound
                size={70}
              />
            </div>

          )}


          {/* ===============================================
              PHOTO GRADIENT
          =============================================== */}

          {imageUrl && (
            <>
              <div
                aria-hidden="true"

                className="
                  pointer-events-none

                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-[#001F5C]/30
                  via-transparent
                  to-transparent
                "
              />


              <div
                aria-hidden="true"

                className="
                  pointer-events-none

                  absolute
                  inset-y-0
                  right-0

                  hidden
                  w-[35%]

                  bg-gradient-to-l
                  from-black/[0.04]
                  to-transparent

                  md:block
                "
              />
            </>
          )}


          {/* ===============================================
              PHOTO LABEL
          =============================================== */}

          <div
            className="
              absolute
              bottom-6
              left-6
              right-6
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-white/20

                bg-[#001F5C]/80

                px-4
                py-2.5

                text-[8px]
                font-black
                uppercase
                tracking-[.15em]

                text-white

                shadow-lg

                backdrop-blur-xl
              "
            >

              <CurrentLocationIcon
                size={12}
              />

              {currentLocationLabel} Leadership

            </div>

          </div>

        </div>


        {/* =================================================
            DETAILS
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            flex-col
            justify-center

            p-7

            sm:p-9

            lg:px-12
            lg:py-11

            xl:px-14
          "
        >

          {/* ===============================================
              TOP LABEL
          =============================================== */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                h-2
                w-2

                rounded-full

                bg-[#0084E3]
              "
            />


            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[.2em]

                text-[#0084E3]
              "
            >
              Rapid Laundromat
            </span>

          </div>


          {/* ===============================================
              NAME
          =============================================== */}

          <div
            className="
              mt-4

              flex
              items-start
              justify-between
              gap-6
            "
          >

            <div
              className="
                min-w-0
              "
            >

              <h3
                className="
                  font-barlowCond

                  text-[clamp(2.1rem,3vw,3rem)]
                  font-black
                  uppercase

                  leading-[.95]
                  tracking-[-.035em]

                  text-[#001F5C]
                "
              >
                {
                  manager.name ||
                  "Location Manager"
                }
              </h3>


              {manager.designation && (

                <div
                  className="
                    mt-3

                    text-[.85rem]
                    font-black

                    text-[#0062CC]
                  "
                >
                  {
                    manager.designation
                  }
                </div>

              )}


              {/* ===========================================
                  MULTI-LOCATION INDICATOR
              =========================================== */}

              {assignedLocationCount >
                1 && (

                <div
                  className="
                    mt-4

                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    border
                    border-[#0062CC]/10

                    bg-[#EEF6FF]

                    px-3.5
                    py-2

                    text-[8px]
                    font-black
                    uppercase
                    tracking-[.12em]

                    text-[#0062CC]
                  "
                >
                  <MapPin
                    size={11}
                  />

                  Oversees{" "}
                  {
                    assignedLocationCount
                  }{" "}
                  Rapid Locations
                </div>

              )}

            </div>


            <div
              className="
                hidden

                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-full

                border
                border-[#0062CC]/10

                bg-[#EEF6FF]

                text-[#0062CC]

                sm:flex
              "
            >
              <UserRound
                size={17}
              />
            </div>

          </div>


          {/* ===============================================
              CURRENT LOCATION
          =============================================== */}

          <div
            className="
              mt-5

              flex
              flex-wrap
              items-center
              gap-2
            "
          >

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[.13em]

                text-slate-400
              "
            >
              Currently viewing
            </span>


            <span
              className={`
                inline-flex
                items-center
                gap-1.5

                rounded-full

                px-3
                py-1.5

                text-[8px]
                font-black
                uppercase
                tracking-[.08em]

                ${
                  currentIsOutlet
                    ? "bg-violet-50 text-violet-600"
                    : "bg-blue-50 text-[#0062CC]"
                }
              `}
            >

              <CurrentLocationIcon
                size={10}
              />

              {
                currentLocation.shortName ||
                currentLocation.name
              }

            </span>

          </div>


          {/* ===============================================
              ALL ASSIGNED LOCATIONS
          =============================================== */}

          {assignedLocationCount >
            1 && (

            <div
              className="
                mt-4
              "
            >

              <div
                className="
                  mb-2

                  text-[8px]
                  font-black
                  uppercase
                  tracking-[.13em]

                  text-slate-400
                "
              >
                Assigned Locations
              </div>


              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {assignedLocations.map(
                  (
                    location
                  ) => {

                    const type =
                      getLocationType(
                        location
                      );


                    const outlet =
                      type ===
                      "outlet";


                    const Icon =
                      outlet
                        ? Store
                        : Building2;


                    return (
                      <span
                        key={
                          location.id
                        }

                        className={`
                          inline-flex
                          items-center
                          gap-1.5

                          rounded-full

                          px-3
                          py-1.5

                          text-[8px]
                          font-black
                          uppercase
                          tracking-[.07em]

                          ${
                            outlet
                              ? "bg-violet-50 text-violet-600"
                              : "bg-blue-50 text-[#0062CC]"
                          }
                        `}
                      >

                        <Icon
                          size={10}
                        />

                        {
                          location.shortName ||
                          location.name
                        }

                      </span>
                    );
                  }
                )}

              </div>

            </div>

          )}


          {/* ===============================================
              DIVIDER
          =============================================== */}

          <div
            className="
              my-6

              h-px
              w-full

              bg-gradient-to-r
              from-[#0062CC]/20
              via-[#0084E3]/10
              to-transparent
            "
          />


          {/* ===============================================
              DESCRIPTION
          =============================================== */}

          {manager.description && (

            <div
              className="
                w-full
                max-w-none
              "
            >

              <p
                className="
                  text-[.9rem]
                  leading-[1.9]

                  text-slate-500

                  lg:text-[.93rem]
                  lg:leading-[1.95]
                "
              >
                {
                  manager.description
                }
              </p>

            </div>

          )}


          {/* ===============================================
              PROFILE DETAILS
          =============================================== */}

          {(manager.joinedYear ||
            manager.experience ||
            manager.education) && (

            <div
              className="
                mt-8

                rounded-[22px]

                border
                border-[#001F5C]/[0.06]

                bg-[#F8FBFF]

                p-5

                sm:p-6
              "
            >

              <div
                className="
                  space-y-5
                "
              >

                {manager.joinedYear && (

                  <ManagerMeta
                    label="Joined Rapid"

                    value={
                      manager.joinedYear
                    }
                  />

                )}


                {manager.experience && (

                  <ManagerMeta
                    label="Experience"

                    value={
                      manager.experience
                    }
                  />

                )}


                {manager.education && (

                  <ManagerMeta
                    label="Education"

                    value={
                      manager.education
                    }
                  />

                )}

              </div>

            </div>

          )}

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   MANAGER META
========================================================= */

function ManagerMeta({
  label,
  value,
}) {
  return (
    <div
      className="
        grid
        gap-2

        sm:grid-cols-[120px_minmax(0,1fr)]
        sm:gap-5
      "
    >

      <div
        className="
          pt-[3px]

          text-[7px]
          font-black
          uppercase
          tracking-[.17em]

          text-[#0084E3]
        "
      >
        {
          label
        }
      </div>


      <div
        className="
          max-w-[720px]

          text-[.76rem]
          font-semibold
          leading-[1.65]

          text-[#001F5C]/70
        "
      >
        {
          value
        }
      </div>

    </div>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyPeople({
  text,
}) {
  return (
    <div
      className="
        mx-auto
        mt-7

        flex
        min-h-[180px]
        max-w-[1250px]
        flex-col
        items-center
        justify-center

        rounded-[26px]

        border
        border-dashed
        border-[#0062CC]/15

        bg-white/60

        px-6

        text-center
      "
    >

      <UserRound
        size={30}

        className="
          text-[#0062CC]/25
        "
      />


      <p
        className="
          mt-3

          text-[.85rem]
          font-bold

          text-slate-400
        "
      >
        {
          text
        }
      </p>

    </div>
  );
}