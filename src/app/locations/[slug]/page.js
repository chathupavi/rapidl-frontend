import Image from "next/image";
import { notFound } from "next/navigation";

import {
  Building2,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  Store,
  UserRound,
  UsersRound,
} from "lucide-react";

import BranchNavbar from "@/components/site/BranchNavbar";


/* =========================================================
   API URL
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   DAYS
========================================================= */

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];


/* =========================================================
   FETCH HELPER
========================================================= */

async function safeFetch(url) {
  try {
    const response =
      await fetch(
        url,
        {
          next: {
            revalidate: 60,
          },
        }
      );


    if (!response.ok) {
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
   GET ALL LOCATIONS

   API name remains /branches for backward compatibility,
   but records may now represent:
   - branch
   - outlet
========================================================= */

async function getLocations() {
  if (!API_URL) {
    console.error(
      "NEXT_PUBLIC_API_URL is missing"
    );

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


  return result.branches;
}


/* =========================================================
   GET LOCATION BY SLUG OR ID
========================================================= */

async function getLocation(
  slug
) {
  const locations =
    await getLocations();


  return (
    locations.find(
      (location) =>
        String(
          location.slug ||
          ""
        ) ===
          String(slug) ||

        String(
          location.id ||
          ""
        ) ===
          String(slug)
    ) ||
    null
  );
}


/* =========================================================
   GET MANAGERS FOR LOCATION

   Supports new:
   locationIds: []

   Supports legacy:
   branchId
========================================================= */

async function getManagers(
  locationId
) {
  if (
    !API_URL ||
    !locationId
  ) {
    return [];
  }


  const result =
    await safeFetch(
      `${API_URL}/api/people/managers`
    );


  if (
    !result?.success ||
    !Array.isArray(
      result.managers
    )
  ) {
    return [];
  }


  return result.managers.filter(
    (manager) => {

      if (
        manager.active ===
        false
      ) {
        return false;
      }


      /* -----------------------------------------------
         NEW MULTI-LOCATION STRUCTURE
      ----------------------------------------------- */

      if (
        Array.isArray(
          manager.locationIds
        ) &&
        manager.locationIds.some(
          (id) =>
            String(id) ===
            String(locationId)
        )
      ) {
        return true;
      }


      /* -----------------------------------------------
         LEGACY SINGLE-BRANCH STRUCTURE
      ----------------------------------------------- */

      if (
        manager.branchId &&
        String(
          manager.branchId
        ) ===
          String(
            locationId
          )
      ) {
        return true;
      }


      return false;
    }
  );
}


/* =========================================================
   GET TEAM MEMBERS

   Existing branchId API structure retained.

   branchId here effectively acts as location ID.
========================================================= */

async function getTeamMembers(
  locationId
) {
  if (
    !API_URL ||
    !locationId
  ) {
    return [];
  }


  const result =
    await safeFetch(
      `${API_URL}/api/people/team?branchId=${encodeURIComponent(
        locationId
      )}`
    );


  if (
    !result?.success ||
    !Array.isArray(
      result.teams
    )
  ) {
    return [];
  }


  return result.teams.filter(
    (teamRecord) =>
      String(
        teamRecord.branchId ||
        ""
      ) ===
        String(locationId)
  );
}


/* =========================================================
   STATIC PARAMS
========================================================= */

export async function generateStaticParams() {
  const locations =
    await getLocations();


  return locations
    .filter(
      (location) =>
        location.active !==
          false &&
        (
          location.slug ||
          location.id
        )
    )
    .map(
      (location) => ({
        slug:
          location.slug ||
          location.id,
      })
    );
}


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}) {
  const {
    slug,
  } =
    await params;


  const location =
    await getLocation(
      slug
    );


  if (!location) {
    return {
      title:
        "Rapid Laundromat",
    };
  }


  const placeName =
    [
      location.district,
      location.province,
    ]
      .filter(Boolean)
      .join(", ");


  const canonicalSlug =
    location.slug ||
    location.id;


  const locationType =
    location.locationType ||
    "branch";


  const locationLabel =
    locationType ===
    "outlet"
      ? "Outlet"
      : "Branch";


  const locationLabelLower =
    locationLabel.toLowerCase();


  const description =
    location.description ||
    `Visit ${location.name}${
      placeName
        ? ` in ${placeName}`
        : ""
    }, a Rapid Laundromat ${locationLabelLower}, for professional laundry and garment care services.`;


  return {
    title:
      `${location.name} | Rapid Laundromat`,

    description,

    alternates: {
      canonical:
        `/locations/${canonicalSlug}`,
    },

    openGraph: {
      title:
        `${location.name} | Rapid Laundromat`,

      description,

      url:
        `/locations/${canonicalSlug}`,

      siteName:
        "Rapid Laundromat",

      type:
        "website",

      images:
        location.coverImage?.url
          ? [
              {
                url:
                  location.coverImage.url,

                alt:
                  `${location.name} ${locationLabelLower}`,
              },
            ]
          : undefined,
    },
  };
}


/* =========================================================
   PAGE
========================================================= */

export default async function BranchPage({
  params,
}) {
  const {
    slug,
  } =
    await params;


  /* =======================================================
     LOAD LOCATION
  ======================================================= */

  const branch =
    await getLocation(
      slug
    );


  if (
    !branch ||
    branch.active ===
      false
  ) {
    notFound();
  }


  /* =======================================================
     LOCATION TYPE
  ======================================================= */

  const locationType =
    branch.locationType ||
    "branch";


  const isOutlet =
    locationType ===
    "outlet";


  const locationLabel =
    isOutlet
      ? "Outlet"
      : "Branch";


  const locationLabelLower =
    isOutlet
      ? "outlet"
      : "branch";


  const LocationIcon =
    isOutlet
      ? Store
      : Building2;


  /* =======================================================
     LOAD MANAGERS + TEAM
  ======================================================= */

  const [
    managers,
    team,
  ] =
    await Promise.all([
      getManagers(
        branch.id
      ),

      getTeamMembers(
        branch.id
      ),
    ]);


  /*
   * One location can technically have several managers.
   * Current UI uses the first one as primary leadership.
   */

  const manager =
    managers[0] ||
    null;


  /* =======================================================
     GALLERY
  ======================================================= */

  const gallery =
    Array.isArray(
      branch.gallery
    )
      ? branch.gallery.filter(
          (image) =>
            image?.url
        )
      : [];


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <>
      <BranchNavbar
        branch={
          branch
        }
      />


      <main
        className="
          overflow-hidden
          bg-white
        "
      >

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            relative
            min-h-[92svh]
            overflow-hidden
            bg-[#001F5C]
          "
        >

          {/* ===============================================
              HERO IMAGE
          =============================================== */}

          <div
            className="
              absolute
              inset-0
              lg:left-[48%]
            "
          >

            {branch.coverImage?.url ? (

              <Image
                src={
                  branch.coverImage.url
                }

                alt={`${branch.name} ${locationLabelLower}`}

                fill

                priority

                sizes="100vw"

                className="
                  object-cover
                  object-center
                "
              />

            ) : (

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-br
                  from-[#002A70]
                  via-[#0062CC]
                  to-[#41B6FF]
                "
              />

            )}


            {/* LEFT BLEND */}

            <div
              aria-hidden="true"

              className="
                absolute
                inset-0

                bg-gradient-to-r
                from-[#001F5C]
                via-[#001F5C]/60
                to-transparent
              "
            />


            {/* BOTTOM BLEND */}

            <div
              aria-hidden="true"

              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-[#001F5C]/70
                via-transparent
                to-[#001F5C]/20
              "
            />

          </div>


          {/* ===============================================
              HERO CONTENT
          =============================================== */}

          <div
            className="
              relative
              z-10

              mx-auto

              flex
              min-h-[92svh]
              max-w-[1500px]

              items-end

              px-[5%]
              pb-20
              pt-36

              lg:items-center
              lg:pb-16
            "
          >

            <div
              className="
                max-w-[820px]
              "
            >

              {/* LOCATION + TYPE */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3

                  text-[#41B6FF]
                "
              >

                <MapPin
                  size={15}
                />


                <span
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[.2em]
                  "
                >
                  {
                    [
                      branch.district,
                      branch.province,
                    ]
                      .filter(Boolean)
                      .join(" • ")
                  }
                </span>


                <span
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-[#41B6FF]/60
                  "
                />


                <span
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    border
                    border-[#41B6FF]/25

                    bg-[#0062CC]/20

                    px-3
                    py-1.5

                    text-[8px]
                    font-black
                    uppercase
                    tracking-[.14em]

                    text-white

                    backdrop-blur-xl
                  "
                >
                  <LocationIcon
                    size={11}
                  />

                  Rapid {locationLabel}
                </span>

              </div>


              {/* TITLE */}

              <h1
                className="
                  mt-6

                  font-barlowCond

                  text-[clamp(3.8rem,8vw,8rem)]
                  font-black
                  uppercase

                  leading-[.85]
                  tracking-[-.03em]

                  text-white
                "
              >
                {
                  branch.shortName ||
                  branch.name
                }


                <span
                  className="
                    block

                    bg-gradient-to-r
                    from-[#41B6FF]
                    via-[#8BD5FF]
                    to-white

                    bg-clip-text
                    text-transparent
                  "
                >
                  Rapid Laundromat
                </span>

              </h1>


              {/* DESCRIPTION */}

              {branch.description && (

                <p
                  className="
                    mt-6
                    max-w-[700px]

                    text-[1rem]
                    leading-[1.85]

                    text-white/65
                  "
                >
                  {
                    branch.description
                  }
                </p>

              )}


              {/* ACTIONS */}

              <div
                className="
                  mt-8

                  flex
                  flex-wrap
                  gap-3

                  pb-4
                "
              >

                {branch.phone && (

                  <a
                    href={`tel:${branch.phone}`}

                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-3

                      rounded-xl

                      bg-gradient-to-br
                      from-[#0062CC]
                      via-[#0084E3]
                      to-[#41B6FF]

                      px-6

                      text-[10px]
                      font-black
                      uppercase
                      tracking-[.12em]

                      text-white

                      shadow-[0_12px_35px_rgba(0,98,204,.3)]

                      transition-all
                      duration-300

                      hover:-translate-y-1
                    "
                  >
                    <Phone
                      size={15}
                    />

                    Call {locationLabel}
                  </a>

                )}


                {branch.googleMapUrl && (

                  <a
                    href={
                      branch.googleMapUrl
                    }

                    target="_blank"

                    rel="noopener noreferrer"

                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-3

                      rounded-xl

                      border
                      border-white/20

                      bg-white/[0.08]

                      px-6

                      text-[10px]
                      font-black
                      uppercase
                      tracking-[.12em]

                      text-white

                      backdrop-blur-xl

                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:bg-white/[0.14]
                    "
                  >
                    <Navigation
                      size={15}
                    />

                    Directions
                  </a>

                )}

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            ABOUT
        ================================================= */}

        <section
          id="about"

          className="
            bg-white

            px-[5%]
            py-24

            lg:py-28
          "
        >

          <div
            className="
              mx-auto

              grid
              max-w-[1500px]
              gap-10

              lg:grid-cols-[1.1fr_.7fr]
              lg:gap-16
            "
          >

            <div>

              <div
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.2em]

                  text-[#0062CC]
                "
              >
                About This {locationLabel}
              </div>


              <h2
                className="
                  mt-4
                  max-w-[780px]

                  font-barlowCond

                  text-[clamp(2.8rem,5vw,5.3rem)]
                  font-black
                  uppercase

                  leading-[.94]
                  tracking-[-.025em]

                  text-[#001F5C]
                "
              >
                Professional care,
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
                  closer to you.
                </span>
              </h2>


              {branch.description && (

                <p
                  className="
                    mt-6
                    max-w-[700px]

                    text-[1rem]
                    leading-[1.85]

                    text-slate-500
                  "
                >
                  {
                    branch.description
                  }
                </p>

              )}

            </div>


            {/* CONTACT PANEL */}

            <div
              className="
                rounded-[30px]

                border
                border-[#0062CC]/[0.07]

                bg-[#F5FAFF]

                p-6

                shadow-[0_20px_60px_rgba(0,98,204,.04)]
              "
            >

              <div
                className="
                  mb-2
                  flex
                  items-center
                  gap-2

                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.16em]

                  text-[#0062CC]
                "
              >
                <LocationIcon
                  size={14}
                />

                {locationLabel} Information
              </div>


              <ContactRow
                icon={
                  MapPin
                }

                label="Address"

                value={
                  branch.address
                }
              />


              <ContactRow
                icon={
                  Phone
                }

                label="Phone"

                value={
                  branch.phone ||
                  "Contact details coming soon"
                }

                href={
                  branch.phone
                    ? `tel:${branch.phone}`
                    : null
                }
              />


              <ContactRow
                icon={
                  Mail
                }

                label="Email"

                value={
                  branch.email ||
                  "Contact details coming soon"
                }

                href={
                  branch.email
                    ? `mailto:${branch.email}`
                    : null
                }
              />

            </div>

          </div>

        </section>


        {/* =================================================
            SERVICES
        ================================================= */}

        {Array.isArray(
          branch.services
        ) &&
          branch.services.length >
            0 && (

          <section
            id="services"

            className="
              bg-[#F5FAFF]

              px-[5%]
              py-24

              lg:py-28
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
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.2em]

                  text-[#0062CC]
                "
              >
                Available Here
              </div>


              <h2
                className="
                  mt-4

                  font-barlowCond

                  text-[clamp(2.7rem,5vw,5rem)]
                  font-black
                  uppercase

                  leading-[.95]
                  tracking-[-.02em]

                  text-[#001F5C]
                "
              >
                Services at{" "}

                <span
                  className="
                    bg-gradient-to-r
                    from-[#0062CC]
                    to-[#41B6FF]

                    bg-clip-text
                    text-transparent
                  "
                >
                  {
                    branch.shortName ||
                    branch.name
                  }
                </span>

              </h2>


              <div
                className="
                  mt-10

                  grid
                  gap-4

                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {branch.services.map(
                  (
                    service,
                    index
                  ) => (

                    <div
                      key={`${service}-${index}`}

                      className="
                        group

                        flex
                        items-center
                        gap-4

                        rounded-[22px]

                        border
                        border-[#001F5C]/[0.06]

                        bg-white

                        p-5

                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:border-[#0062CC]/15
                        hover:shadow-[0_15px_40px_rgba(0,98,204,.07)]
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center

                          rounded-xl

                          bg-[#EEF6FF]

                          text-[10px]
                          font-black
                          text-[#0062CC]

                          transition

                          group-hover:bg-[#0062CC]
                          group-hover:text-white
                        "
                      >
                        {
                          String(
                            index +
                            1
                          ).padStart(
                            2,
                            "0"
                          )
                        }
                      </div>


                      <div
                        className="
                          text-[.95rem]
                          font-black
                          text-[#001F5C]
                        "
                      >
                        {
                          service
                        }
                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


        {/* =================================================
            MANAGER / LEADERSHIP
        ================================================= */}

        {manager && (

          <section
            id="manager"

            className="
              bg-white
              px-[5%]
              py-24
            "
          >

            <div
              className="
                mx-auto

                grid
                max-w-[1500px]

                overflow-hidden

                rounded-[34px]

                border
                border-[#001F5C]/[0.07]

                bg-white

                shadow-[0_25px_70px_rgba(0,31,92,.07)]

                lg:grid-cols-[.75fr_1.25fr]
              "
            >

              {/* MANAGER PHOTO */}

              <div
                className="
                  relative
                  min-h-[420px]
                  w-full
                  overflow-hidden
                  bg-[#EEF6FF]
                "
              >

                {manager.photo?.url ? (

                  <Image
                    src={
                      manager.photo.url
                    }

                    alt={
                      manager.name ||
                      "Rapid Laundromat Manager"
                    }

                    fill

                    sizes="
                      (max-width:1024px) 100vw,
                      40vw
                    "

                    className="
                      object-cover
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      min-h-[420px]
                      w-full
                      items-center
                      justify-center

                      text-[#0062CC]/20
                    "
                  >
                    <UserRound
                      size={70}
                    />
                  </div>

                )}

              </div>


              {/* MANAGER CONTENT */}

              <div
                className="
                  flex
                  flex-col
                  justify-center

                  p-8

                  lg:p-12
                "
              >

                <div
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[.2em]

                    text-[#0084E3]
                  "
                >
                  Location Leadership
                </div>


                <h2
                  className="
                    mt-3

                    text-[clamp(2.2rem,4vw,4rem)]
                    font-black

                    tracking-[-.055em]

                    text-[#001F5C]
                  "
                >
                  {
                    manager.name
                  }
                </h2>


                <div
                  className="
                    mt-2

                    text-[.9rem]
                    font-black

                    text-[#0062CC]
                  "
                >
                  {
                    manager.designation ||
                    "Branch Manager"
                  }
                </div>


                {/* MULTI-LOCATION INDICATOR */}

                {Array.isArray(
                  manager.locationIds
                ) &&
                  manager.locationIds.length >
                    1 && (

                  <div
                    className="
                      mt-4

                      inline-flex
                      w-fit
                      items-center
                      gap-2

                      rounded-full

                      border
                      border-[#0062CC]/10

                      bg-[#EEF6FF]

                      px-3
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
                      manager
                        .locationIds
                        .length
                    }{" "}
                    Rapid Locations
                  </div>

                )}


                {manager.description && (

                  <p
                    className="
                      mt-6
                      max-w-[680px]

                      whitespace-pre-line

                      text-[.95rem]
                      leading-[1.85]

                      text-slate-500
                    "
                  >
                    {
                      manager.description
                    }
                  </p>

                )}


                <div
                  className="
                    mt-7

                    grid
                    gap-3

                    sm:grid-cols-2
                  "
                >

                  {manager.education && (

                    <InfoBlock
                      icon={
                        GraduationCap
                      }

                      label="Education"

                      value={
                        manager.education
                      }
                    />

                  )}


                  {manager.experience && (

                    <InfoBlock
                      icon={
                        Sparkles
                      }

                      label="Experience"

                      value={
                        manager.experience
                      }
                    />

                  )}

                </div>

              </div>

            </div>

          </section>

        )}


        {/* =================================================
            TEAM
        ================================================= */}

        {team.length >
          0 && (

          <section
            id="team"

            className="
              bg-[#F7FBFF]

              px-[5%]
              py-24

              lg:py-28
            "
          >

            <div
              className="
                mx-auto
                max-w-[1500px]
              "
            >

              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <UsersRound
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
                    tracking-[.2em]

                    text-[#0062CC]
                  "
                >
                  Meet The Team
                </span>
              </div>


              <h2
                className="
                  mt-4

                  font-barlowCond

                  text-[clamp(2.8rem,5vw,5rem)]
                  font-black
                  uppercase

                  leading-[.94]

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
              </h2>


              {/* TEAM RECORDS */}

              <div
                className="
                  mt-12
                  space-y-10
                "
              >

                {team.map(
                  (
                    teamRecord
                  ) => {

                    const names =
                      Array.isArray(
                        teamRecord
                          .memberNames
                      )
                        ? teamRecord
                            .memberNames
                            .filter(
                              Boolean
                            )
                        : [];


                    const teamPhotoUrl =
                      teamRecord
                        ?.teamPhoto
                        ?.url ||
                      null;


                    return (
                      <article
                        key={
                          teamRecord.id ||
                          teamRecord.branchId
                        }

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

                        {/* TEAM PHOTO */}

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

                              alt={`${branch.name} ${locationLabelLower} team`}

                              fill

                              sizes="
                                (max-width:1024px) 100vw,
                                60vw
                              "

                              className="
                                object-cover
                                object-center
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
                                  to-[#001F5C]/[0.04]
                                "
                              />
                            </>
                          )}

                        </div>


                        {/* TEAM NAMES */}

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

                          <div
                            className="
                              text-[9px]
                              font-black
                              uppercase
                              tracking-[.18em]

                              text-[#0084E3]
                            "
                          >
                            {locationLabel} Team
                          </div>


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
                              branch.shortName ||
                              branch.name
                            }
                          </h3>


                          <p
                            className="
                              mt-4
                              max-w-[500px]

                              text-[.88rem]
                              leading-7

                              text-slate-500
                            "
                          >
                            Meet the team supporting daily operations,
                            customer service and garment care at this
                            Rapid Laundromat {locationLabelLower}.
                          </p>


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

                            <p
                              className="
                                mt-7

                                text-[.9rem]
                                leading-7

                                text-slate-500
                              "
                            >
                              Team member information will be added soon.
                            </p>

                          )}

                        </div>

                      </article>
                    );
                  }
                )}

              </div>

            </div>

          </section>

        )}


        {/* =================================================
            GALLERY
        ================================================= */}

        {gallery.length >
          0 && (

          <section
            id="gallery"

            className="
              bg-white
              px-[5%]
              py-24
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
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.2em]

                  text-[#0062CC]
                "
              >
                Inside The {locationLabel}
              </div>


              <h2
                className="
                  mt-4

                  font-barlowCond

                  text-[clamp(2.7rem,5vw,5rem)]
                  font-black
                  uppercase

                  leading-[.95]

                  text-[#001F5C]
                "
              >
                A closer look at{" "}

                <span
                  className="
                    text-[#0062CC]
                  "
                >
                  {
                    branch.shortName ||
                    branch.name
                  }
                </span>
                .
              </h2>


              <div
                className="
                  mt-10

                  grid
                  grid-cols-2
                  gap-4

                  lg:grid-cols-4
                "
              >

                {gallery.map(
                  (
                    image,
                    index
                  ) => (

                    <div
                      key={
                        image.path ||
                        image.url ||
                        index
                      }

                      className={`
                        relative

                        overflow-hidden

                        rounded-[24px]

                        bg-[#EEF6FF]

                        ${
                          index ===
                          0
                            ? `
                              col-span-2
                              row-span-2
                              aspect-square
                            `
                            : `
                              aspect-square
                            `
                        }
                      `}
                    >
                      <Image
                        src={
                          image.url
                        }

                        alt={`${branch.name} ${locationLabelLower} gallery ${index + 1}`}

                        fill

                        sizes="
                          (max-width:1024px) 50vw,
                          25vw
                        "

                        className="
                          object-cover

                          transition-transform
                          duration-700

                          hover:scale-105
                        "
                      />
                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


        {/* =================================================
            VISIT / HOURS / MAP
        ================================================= */}

        <section
          id="visit"

          className="
            bg-[#F5FAFF]

            px-[5%]
            py-24

            lg:py-28
          "
        >

          <div
            className="
              mx-auto

              grid
              max-w-[1500px]
              gap-6

              lg:grid-cols-[.75fr_1.25fr]
            "
          >

            {/* =============================================
                HOURS
            ============================================= */}

            <div
              className="
                rounded-[30px]

                bg-[#001F5C]

                p-7

                text-white

                shadow-[0_25px_70px_rgba(0,31,92,.14)]

                lg:p-9
              "
            >

              <Clock3
                size={24}

                className="
                  text-[#41B6FF]
                "
              />


              <div
                className="
                  mt-5

                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.18em]

                  text-[#41B6FF]
                "
              >
                Plan Your Visit
              </div>


              <h2
                className="
                  mt-2

                  text-[2rem]
                  font-black

                  tracking-[-.045em]
                "
              >
                Opening Hours
              </h2>


              <div
                className="
                  mt-7
                  space-y-3
                "
              >

                {DAYS.map(
                  (
                    day
                  ) => (

                    <div
                      key={
                        day
                      }

                      className="
                        flex
                        items-center
                        justify-between
                        gap-4

                        border-b
                        border-white/[0.08]

                        pb-3
                      "
                    >

                      <span
                        className="
                          capitalize

                          text-[.85rem]
                          font-bold

                          text-white/55
                        "
                      >
                        {
                          day
                        }
                      </span>


                      <span
                        className="
                          text-right

                          text-[.85rem]
                          font-black

                          text-white
                        "
                      >
                        {
                          branch.openingHours?.[
                            day
                          ] ||
                          `Contact ${locationLabelLower}`
                        }
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* =============================================
                MAP
            ============================================= */}

            <div
              className="
                min-h-[480px]

                overflow-hidden

                rounded-[30px]

                border
                border-[#0062CC]/[0.07]

                bg-[#EAF5FF]
              "
            >

              {branch.latitude !=
                null &&
              branch.longitude !=
                null ? (

                <iframe
                  title={`${branch.name} Map`}

                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${branch.latitude},${branch.longitude}`
                  )}&z=15&output=embed`}

                  loading="lazy"

                  referrerPolicy="no-referrer-when-downgrade"

                  className="
                    h-full
                    min-h-[480px]
                    w-full
                    border-0
                  "
                />

              ) : (

                <div
                  className="
                    flex
                    h-full
                    min-h-[480px]
                    flex-col
                    items-center
                    justify-center

                    px-6

                    text-center
                  "
                >

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center

                      rounded-[20px]

                      bg-white

                      text-[#0062CC]

                      shadow-[0_15px_40px_rgba(0,98,204,.08)]
                    "
                  >
                    <MapPin
                      size={28}
                    />
                  </div>


                  <div
                    className="
                      mt-5

                      text-lg
                      font-black

                      text-[#001F5C]
                    "
                  >
                    {
                      branch.shortName ||
                      branch.name
                    }
                  </div>


                  <div
                    className="
                      mt-2

                      text-[9px]
                      font-black
                      uppercase
                      tracking-[.14em]

                      text-[#0062CC]
                    "
                  >
                    Rapid {locationLabel}
                  </div>


                  {branch.address && (

                    <p
                      className="
                        mt-3
                        max-w-[340px]

                        text-[.85rem]
                        leading-6

                        text-slate-500
                      "
                    >
                      {
                        branch.address
                      }
                    </p>

                  )}


                  {!branch.googleMapUrl && (

                    <p
                      className="
                        mt-3
                        max-w-[320px]

                        text-[.8rem]
                        leading-6

                        text-slate-400
                      "
                    >
                      Add the {locationLabelLower} latitude and
                      longitude to display the interactive Google Map
                      here.
                    </p>

                  )}


                  {branch.googleMapUrl && (

                    <a
                      href={
                        branch.googleMapUrl
                      }

                      target="_blank"

                      rel="noopener noreferrer"

                      className="
                        mt-5

                        inline-flex
                        items-center
                        gap-2

                        rounded-xl

                        bg-[#0062CC]

                        px-5
                        py-3

                        text-[9px]
                        font-black
                        uppercase
                        tracking-[.12em]

                        text-white

                        transition-all
                        duration-300

                        hover:-translate-y-1
                        hover:bg-[#0084E3]
                      "
                    >
                      <Navigation
                        size={14}
                      />

                      Open Directions
                    </a>

                  )}

                </div>

              )}

            </div>

          </div>

        </section>

      </main>
    </>
  );
}


/* =========================================================
   CONTACT ROW
========================================================= */

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}) {
  if (!value) {
    return null;
  }


  const content = (
    <div
      className="
        flex
        items-start
        gap-4

        border-b
        border-[#001F5C]/[0.07]

        py-4
      "
    >

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center

          rounded-xl

          bg-white

          text-[#0062CC]

          shadow-[0_8px_24px_rgba(0,98,204,.06)]
        "
      >
        <Icon
          size={17}
        />
      </div>


      <div
        className="
          min-w-0
        "
      >

        <div
          className="
            text-[9px]
            font-black
            uppercase
            tracking-[.16em]

            text-slate-400
          "
        >
          {
            label
          }
        </div>


        <div
          className="
            mt-1

            break-words

            text-[.9rem]
            font-bold
            leading-6

            text-[#001F5C]
          "
        >
          {
            value
          }
        </div>

      </div>

    </div>
  );


  if (href) {
    return (
      <a
        href={
          href
        }

        className="
          block
          transition
          hover:translate-x-1
        "
      >
        {
          content
        }
      </a>
    );
  }


  return content;
}


/* =========================================================
   INFORMATION BLOCK
========================================================= */

function InfoBlock({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[20px]

        bg-[#F5FAFF]

        p-5
      "
    >

      <Icon
        size={17}

        className="
          text-[#0062CC]
        "
      />


      <div
        className="
          mt-3

          text-[9px]
          font-black
          uppercase
          tracking-[.16em]

          text-[#0084E3]
        "
      >
        {
          label
        }
      </div>


      <p
        className="
          mt-2

          whitespace-pre-line

          text-[.82rem]
          leading-6

          text-slate-500
        "
      >
        {
          value
        }
      </p>

    </div>
  );
}