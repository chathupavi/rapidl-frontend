import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Building2,
  MapPin,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";

import PeopleNavbar from "@/components/site/PeopleNavbar";


/* =========================================================
   API URL
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


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


function isOutletLocation(
  location
) {
  return (
    getLocationType(
      location
    ) === "outlet"
  );
}


function getLocationLabel(
  location
) {
  return isOutletLocation(
    location
  )
    ? "Outlet"
    : "Branch";
}


/* =========================================================
   FETCH HELPER
========================================================= */

async function safeFetch(
  url
) {
  try {
    const response =
      await fetch(
        url,
        {
          next: {
            revalidate:
              60,
          },
        }
      );


    if (
      !response.ok
    ) {
      console.error(
        "Request failed:",
        response.status,
        url
      );

      return null;
    }


    return await response.json();

  } catch (error) {
    console.error(
      "Request failed:",
      url,
      error
    );

    return null;
  }
}


/* =========================================================
   GET ACTIVE LOCATIONS

   API name remains /branches for compatibility,
   but records may represent either:
   - branch
   - outlet
========================================================= */

async function getLocations() {
  if (
    !API_URL
  ) {
    return [];
  }


  const result =
    await safeFetch(
      `${API_URL}/api/people/branches`
    );


  if (
    !result?.success ||
    !Array.isArray(
      result.branches
    )
  ) {
    return [];
  }


  return result.branches.filter(
    (
      location
    ) =>
      location.active !==
      false
  );
}


/* =========================================================
   GET ALL PUBLIC TEAMS
========================================================= */

async function getTeams() {
  if (
    !API_URL
  ) {
    return [];
  }


  const result =
    await safeFetch(
      `${API_URL}/api/people/team`
    );


  if (
    !result?.success ||
    !Array.isArray(
      result.teams
    )
  ) {
    return [];
  }


  return result.teams;
}


/* =========================================================
   METADATA
========================================================= */

export const metadata = {
  title:
    "Our Teams | Rapid Laundromat",

  description:
    "Meet the teams delivering professional garment care and customer service across Rapid Laundromat branches and outlets.",
};


/* =========================================================
   PAGE
========================================================= */

export default async function TeamPage() {

  /* =======================================================
     LOAD DATA
  ======================================================= */

  const [
    locations,
    teams,
  ] =
    await Promise.all([
      getLocations(),
      getTeams(),
    ]);


  /* =======================================================
     COUNTS
  ======================================================= */

  const branchCount =
    locations.filter(
      (
        location
      ) =>
        getLocationType(
          location
        ) === "branch"
    ).length;


  const outletCount =
    locations.filter(
      (
        location
      ) =>
        getLocationType(
          location
        ) === "outlet"
    ).length;


  const totalMembers =
    teams.reduce(
      (
        total,
        team
      ) => {

        const names =
          Array.isArray(
            team?.memberNames
          )
            ? team.memberNames.filter(
                Boolean
              )
            : [];


        return (
          total +
          names.length
        );
      },
      0
    );


  return (
    <>
      <PeopleNavbar />


      <main
        className="
          min-h-screen
          bg-white

          pb-28
          pt-36
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <section
          className="
            px-[5%]
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
                flex
                items-center
                gap-3
              "
            >

              <UsersRound
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
                Our People
              </span>

            </div>


            <div
              className="
                mt-5

                grid
                gap-8

                lg:grid-cols-[1fr_.5fr]
                lg:items-end
              "
            >

              <h1
                className="
                  max-w-[950px]

                  font-barlowCond

                  text-[clamp(3.5rem,7vw,7rem)]
                  font-black
                  uppercase

                  leading-[.88]

                  text-[#001F5C]
                "
              >
                The people behind

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
                  every careful finish.
                </span>
              </h1>


              <div
                className="
                  lg:ml-auto
                "
              >

                <p
                  className="
                    max-w-[520px]

                    text-[1rem]
                    leading-[1.85]

                    text-slate-500
                  "
                >
                  Every garment passes through the hands of people committed
                  to care, quality and consistent customer service across our
                  Rapid branches and outlets.
                </p>


                {/* =========================================
                    SUMMARY
                ========================================= */}

                <div
                  className="
                    mt-6

                    flex
                    flex-wrap
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
                      totalMembers
                    }

                    label={
                      totalMembers ===
                      1
                        ? "Team Member"
                        : "Team Members"
                    }
                  />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            TEAM BY LOCATION
        ================================================= */}

        <section
          className="
            mt-16

            bg-[#F7FBFF]

            px-[5%]
            py-20
          "
        >

          <div
            className="
              mx-auto

              max-w-[1500px]

              space-y-20
            "
          >

            {locations.length >
            0 ? (

              locations.map(
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


                  const locationLabelLower =
                    locationLabel
                      .toLowerCase();


                  const LocationIcon =
                    isOutlet
                      ? Store
                      : Building2;


                  /* =========================================
                     TEAMS FOR LOCATION

                     branchId is intentionally retained
                     as the location ID for API compatibility.
                  ========================================= */

                  const locationTeams =
                    teams.filter(
                      (
                        team
                      ) =>
                        String(
                          team.branchId ||
                          ""
                        ) ===
                          String(
                            location.id
                          )
                    );


                  /* =========================================
                     LOCATION URL
                  ========================================= */

                  const locationHref =
                    `/locations/${
                      location.slug ||
                      location.id
                    }`;


                  return (
                    <div
                      key={
                        location.id
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

                          {/* TYPE */}

                          <div
                            className="
                              flex
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


                            {locationLabel} Team

                          </div>


                          {/* NAME */}

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
                              location.name
                            }
                          </h2>


                          {/* LOCATION */}

                          {(
                            location.district ||
                            location.province
                          ) && (

                            <div
                              className="
                                mt-2

                                flex
                                items-center
                                gap-2

                                text-[.78rem]
                                font-semibold

                                text-slate-400
                              "
                            >

                              <MapPin
                                size={12}
                              />


                              <span>
                                {
                                  [
                                    location.district,
                                    location.province,
                                  ]
                                    .filter(
                                      Boolean
                                    )
                                    .join(
                                      " • "
                                    )
                                }
                              </span>

                            </div>

                          )}

                        </div>


                        {/* ===================================
                            EXPLORE
                        =================================== */}

                        <Link
                          href={
                            locationHref
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

                            transition-colors
                            duration-300

                            hover:text-[#0084E3]
                          "
                        >
                          Explore {locationLabel}


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
                          TEAM RECORDS
                      ===================================== */}

                      {locationTeams.length >
                        0 ? (

                        <div
                          className="
                            mt-8
                            space-y-8
                          "
                        >

                          {locationTeams.map(
                            (
                              teamRecord
                            ) => (

                              <LocationTeamCard
                                key={
                                  teamRecord.id ||
                                  `${location.id}-${teamRecord.branchId}`
                                }

                                team={
                                  teamRecord
                                }

                                location={
                                  location
                                }

                                locationLabel={
                                  locationLabel
                                }

                                locationLabelLower={
                                  locationLabelLower
                                }

                                isOutlet={
                                  isOutlet
                                }
                              />

                            )
                          )}

                        </div>

                      ) : (

                        <EmptyTeam
                          locationLabel={
                            locationLabel
                          }
                        />

                      )}

                    </div>
                  );
                }
              )

            ) : (

              <div
                className="
                  flex
                  min-h-[240px]
                  flex-col
                  items-center
                  justify-center

                  rounded-[30px]

                  border
                  border-dashed
                  border-[#0062CC]/15

                  bg-white

                  text-center
                "
              >

                <UsersRound
                  size={36}

                  className="
                    text-[#0062CC]/20
                  "
                />


                <div
                  className="
                    mt-4

                    text-[.9rem]
                    font-bold

                    text-slate-400
                  "
                >
                  Location team information will be added here.
                </div>

              </div>

            )}

          </div>

        </section>

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

        bg-[#F7FBFF]

        px-4
        py-2.5
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

          bg-white

          text-[#0062CC]

          shadow-[0_6px_20px_rgba(0,98,204,.07)]
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
   LOCATION TEAM CARD
========================================================= */

function LocationTeamCard({
  team,
  location,
  locationLabel,
  locationLabelLower,
  isOutlet,
}) {

  /* =======================================================
     MEMBER NAMES
  ======================================================= */

  const names =
    Array.isArray(
      team.memberNames
    )
      ? team.memberNames.filter(
          Boolean
        )
      : [];


  /* =======================================================
     TEAM PHOTO
  ======================================================= */

  const teamPhotoUrl =
    team?.teamPhoto?.url ||
    null;


  const LocationIcon =
    isOutlet
      ? Store
      : Building2;


  return (
    <article
      className="
        grid

        overflow-hidden

        rounded-[32px]

        border
        border-[#001F5C]/[0.06]

        bg-white

        shadow-[0_20px_60px_rgba(0,31,92,.06)]

        lg:grid-cols-[1.15fr_.85fr]
      "
    >

      {/* ===================================================
          TEAM PHOTO
      =================================================== */}

      <div
        className="
          relative

          aspect-[16/10]
          w-full

          overflow-hidden

          bg-[#EEF6FF]

          lg:aspect-auto
          lg:min-h-[560px]
        "
      >

        {teamPhotoUrl ? (

          <Image
            src={
              teamPhotoUrl
            }

            alt={`${location.name} ${locationLabelLower} team`}

            fill

            sizes="
              (max-width:1024px) 100vw,
              60vw
            "

            className="
              object-cover
              object-center

              transition-transform
              duration-700

              hover:scale-[1.015]
            "
          />

        ) : (

          <div
            className="
              flex
              h-full
              min-h-[360px]
              w-full
              items-center
              justify-center

              text-[#0062CC]/20

              lg:min-h-[560px]
            "
          >
            <UsersRound
              size={72}
            />
          </div>

        )}


        {/* IMAGE DEPTH */}

        {teamPhotoUrl && (
          <>
            <div
              aria-hidden="true"

              className="
                pointer-events-none

                absolute
                inset-0

                bg-gradient-to-t
                from-[#001F5C]/35
                via-transparent
                to-transparent
              "
            />


            <div
              aria-hidden="true"

              className="
                pointer-events-none

                absolute
                inset-0

                bg-gradient-to-r
                from-transparent
                via-transparent
                to-[#001F5C]/[0.05]
              "
            />
          </>
        )}


        {/* =================================================
            TYPE BADGE
        ================================================= */}

        <div
          className="
            absolute
            left-5
            top-5
          "
        >

          <div
            className={`
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-white/20

              px-4
              py-2.5

              text-[8px]
              font-black
              uppercase
              tracking-[.14em]

              text-white

              shadow-lg

              backdrop-blur-xl

              ${
                isOutlet
                  ? "bg-violet-600/85"
                  : "bg-[#001F5C]/80"
              }
            `}
          >

            <LocationIcon
              size={11}
            />

            Rapid {locationLabel}

          </div>

        </div>


        {/* MEMBER COUNT */}

        <div
          className="
            absolute
            bottom-5
            right-5

            rounded-full

            bg-white/95

            px-4
            py-2

            text-[8px]
            font-black
            uppercase
            tracking-[.1em]

            text-[#001F5C]

            shadow-lg

            backdrop-blur
          "
        >
          {names.length}{" "}

          {
            names.length ===
            1
              ? "Member"
              : "Members"
          }
        </div>

      </div>


      {/* ===================================================
          TEAM DETAILS
      =================================================== */}

      <div
        className="
          flex
          flex-col
          justify-center

          p-7

          sm:p-9
          lg:p-12
        "
      >

        {/* TYPE */}

        <div
          className="
            flex
            items-center
            gap-2

            text-[9px]
            font-black
            uppercase
            tracking-[.18em]

            text-[#0084E3]
          "
        >

          <LocationIcon
            size={12}
          />

          Rapid {locationLabel} Team

        </div>


        {/* LOCATION NAME */}

        <h3
          className="
            mt-3

            text-[clamp(2rem,3vw,3.2rem)]
            font-black

            tracking-[-.05em]

            text-[#001F5C]
          "
        >
          {
            location.shortName ||
            location.name
          }
        </h3>


        {/* LOCATION DETAIL */}

        {(location.district ||
          location.province) && (

          <div
            className="
              mt-3

              flex
              items-center
              gap-2

              text-[.75rem]
              font-semibold

              text-slate-400
            "
          >

            <MapPin
              size={12}
            />


            <span>
              {
                [
                  location.district,
                  location.province,
                ]
                  .filter(
                    Boolean
                  )
                  .join(
                    " • "
                  )
              }
            </span>

          </div>

        )}


        {/* DESCRIPTION */}

        <p
          className="
            mt-5

            max-w-[500px]

            text-[.88rem]
            leading-7

            text-slate-500
          "
        >
          Meet the people supporting daily operations, customer service
          and garment care at this Rapid Laundromat {locationLabelLower}.
        </p>


        {/* =================================================
            MEMBER NAMES
        ================================================= */}

        {names.length >
        0 ? (

          <div
            className="
              mt-8

              grid
              gap-3

              sm:grid-cols-2
            "
          >

            {names.map(
              (
                name,
                index
              ) => (

                <div
                  key={`${name}-${index}`}

                  className="
                    flex
                    items-center
                    gap-3

                    rounded-[16px]

                    border
                    border-[#0062CC]/[0.07]

                    bg-[#F5FAFF]

                    px-4
                    py-3

                    transition-all
                    duration-300

                    hover:border-[#0062CC]/15
                    hover:bg-[#EEF6FF]
                  "
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center

                      rounded-full

                      bg-white

                      text-[#0062CC]

                      shadow-[0_6px_18px_rgba(0,98,204,.07)]
                    "
                  >
                    <UserRound
                      size={15}
                    />
                  </div>


                  <div
                    className="
                      min-w-0
                    "
                  >

                    <div
                      className="
                        truncate

                        text-[.9rem]
                        font-black

                        text-[#001F5C]
                      "
                    >
                      {
                        name
                      }
                    </div>


                    <div
                      className="
                        mt-0.5

                        text-[8px]
                        font-black
                        uppercase
                        tracking-[.1em]

                        text-slate-400
                      "
                    >
                      Team Member
                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        ) : (

          <div
            className="
              mt-7

              text-[.85rem]
              font-bold

              text-slate-400
            "
          >
            Team member names will be added soon.
          </div>

        )}


        {/* =================================================
            LOCATION LINK
        ================================================= */}

        <div
          className="
            mt-8

            border-t
            border-[#001F5C]/[0.06]

            pt-5
          "
        >

          <Link
            href={`/locations/${
              location.slug ||
              location.id
            }`}

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

              transition-colors

              hover:text-[#0084E3]
            "
          >
            Visit {locationLabel}

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

      </div>

    </article>
  );
}


/* =========================================================
   EMPTY TEAM
========================================================= */

function EmptyTeam({
  locationLabel = "Location",
}) {
  return (
    <div
      className="
        mt-8

        flex
        min-h-[180px]
        flex-col
        items-center
        justify-center

        rounded-[28px]

        border
        border-dashed
        border-[#0062CC]/15

        bg-white

        px-6

        text-center
      "
    >

      <UsersRound
        size={32}

        className="
          text-[#0062CC]/20
        "
      />


      <div
        className="
          mt-3

          text-[.85rem]
          font-bold

          text-slate-400
        "
      >
        {locationLabel} team profiles will be added here.
      </div>

    </div>
  );
}