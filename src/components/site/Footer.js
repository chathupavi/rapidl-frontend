import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";


/* =========================================================
   GOOGLE MAPS MULTICOLOR ICON
========================================================= */

function GoogleMapsIcon({
  size = 22,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {/* Main red pin */}
      <path
        d="
          M12 2.25
          C8.15 2.25 5.03 5.37 5.03 9.22
          C5.03 14.28 12 21.75 12 21.75
          C12 21.75 18.97 14.28 18.97 9.22
          C18.97 5.37 15.85 2.25 12 2.25
          Z
        "
        fill="#EA4335"
      />

      {/* Blue */}
      <path
        d="
          M12 2.25
          C9.15 2.25 6.7 3.96 5.62 6.41
          L9.36 9.2
          C9.37 7.75 10.55 6.58 12 6.58
          Z
        "
        fill="#4285F4"
      />

      {/* Green */}
      <path
        d="
          M5.03 9.22
          C5.03 11.12 5.87 13.28 6.96 15.18
          L10.47 12.52
          C9.79 12.04 9.36 11.24 9.36 10.36
          L9.36 9.2
          L5.62 6.41
          C5.24 7.28 5.03 8.23 5.03 9.22
          Z
        "
        fill="#34A853"
      />

      {/* Yellow */}
      <path
        d="
          M12 21.75
          C12 21.75 15.04 18.5 17.07 15.19
          L13.52 12.55
          C13.08 12.8 12.56 12.95 12 12.95
          C11.42 12.95 10.88 12.8 10.47 12.52
          L6.96 15.18
          C8.97 18.53 12 21.75 12 21.75
          Z
        "
        fill="#FBBC04"
      />

      {/* White center */}
      <circle
        cx="12"
        cy="9.8"
        r="2.55"
        fill="white"
      />
    </svg>
  );
}


/* =========================================================
   SOCIAL ICON COMPONENT
========================================================= */

function SocialBrandIcon({
  type,
  size = 20,
}) {
  if (
    type === "facebook"
  ) {
    return (
      <div
        className="
          flex
          h-full
          w-full

          items-center
          justify-center

          rounded-full

          bg-[#1877F2]
        "
      >
        <FaFacebookF
          size={size}
          className="text-white"
        />
      </div>
    );
  }


  if (
    type === "instagram"
  ) {
    return (
      <div
        className="
          flex
          h-full
          w-full

          items-center
          justify-center

          rounded-[28%]

          bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]
        "
      >
        <FaInstagram
          size={size}
          className="text-white"
        />
      </div>
    );
  }


  if (
    type === "tiktok"
  ) {
    return (
      <div
        className="
          relative

          flex
          h-full
          w-full

          items-center
          justify-center

          overflow-hidden

          rounded-[28%]

          bg-[#050505]
        "
      >
        {/* Cyan layer */}

        <FaTiktok
          size={size}
          className="
            absolute

            -translate-x-[1.3px]
            translate-y-[1px]

            text-[#25F4EE]
          "
        />

        {/* Red layer */}

        <FaTiktok
          size={size}
          className="
            absolute

            translate-x-[1.3px]
            -translate-y-[1px]

            text-[#FE2C55]
          "
        />

        {/* Main white */}

        <FaTiktok
          size={size}
          className="
            relative
            z-10

            text-white
          "
        />
      </div>
    );
  }


  if (
    type === "google"
  ) {
    return (
      <div
        className="
          flex
          h-full
          w-full

          items-center
          justify-center

          rounded-[28%]

          bg-white
        "
      >
        <GoogleMapsIcon
          size={size + 3}
        />
      </div>
    );
  }


  return null;
}


/* =========================================================
   SOCIAL LINKS
========================================================= */

const socials = [
  {
    href:
      "https://www.facebook.com/rapidlaundromat",

    type:
      "facebook",

    name:
      "Facebook",

    handle:
      "Rapid Laundromat",

    glow:
      "hover:shadow-[0_14px_38px_rgba(24,119,242,.22)]",

    border:
      "hover:border-[#1877F2]/45",
  },

  {
    href:
      "https://www.instagram.com/rapidlaundromat",

    type:
      "instagram",

    name:
      "Instagram",

    handle:
      "@rapidlaundromat",

    glow:
      "hover:shadow-[0_14px_38px_rgba(225,48,108,.20)]",

    border:
      "hover:border-[#E1306C]/40",
  },

  {
    href:
      "https://www.tiktok.com/@rapidlaundromat",

    type:
      "tiktok",

    name:
      "TikTok",

    handle:
      "@rapidlaundromat",

    glow:
      "hover:shadow-[0_14px_38px_rgba(37,244,238,.15)]",

    border:
      "hover:border-[#25F4EE]/30",
  },

  {
    href:
      "https://www.google.com/maps/search/Rapid+Laundromat+Sri+Lanka",

    type:
      "google",

    name:
      "Google Maps",

    handle:
      "Rate & Review Us",

    glow:
      "hover:shadow-[0_14px_38px_rgba(66,133,244,.16)]",

    border:
      "hover:border-[#4285F4]/35",
  },
];


/* =========================================================
   FOOTER LINKS
========================================================= */

const FOOTER_LINKS = [
  {
    title:
      "Explore",

    links: [
      {
        label:
          "Services",

        href:
          "/#services",
      },

      {
        label:
          "Signature Care",

        href:
          "/#signature-care",
      },

      {
        label:
          "Why Rapid",

        href:
          "/#why-rapid",
      },

      {
        label:
          "Our Process",

        href:
          "/#process",
      },

      {
        label:
          "Reviews",

        href:
          "/#reviews",
      },
    ],
  },

  {
    title:
      "Rapid",

    links: [
      {
        label:
          "Locations",

        href:
          "/#locations",
      },

      {
        label:
          "Our People",

        href:
          "/#people",
      },

      {
        label:
          "Gallery",

        href:
          "/#gallery",
      },

      {
        label:
          "Commercial",

        href:
          "/#commercial",
      },

      {
        label:
          "FAQ",

        href:
          "/#faq",
      },

      {
        label:
          "Contact",

        href:
          "/#contact",
      },
    ],
  },
];


/* =========================================================
   FOOTER
========================================================= */

export default function Footer({
  data = {},
}) {

  const year =
    new Date().getFullYear();


  return (
    <footer
      id="footer"

      className="
        relative
        overflow-hidden

        bg-[#000D27]

        px-[5%]

        pt-20

        text-white

        lg:pt-24
      "
    >

      {/* =====================================================
          BACKGROUND GLOWS
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute

          -left-44
          -top-44

          h-[430px]
          w-[430px]

          rounded-full

          bg-[#0062CC]/20

          blur-[140px]
        "
      />


      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute

          -bottom-56
          right-0

          h-[500px]
          w-[500px]

          rounded-full

          bg-[#0084E3]/10

          blur-[160px]
        "
      />


      {/* =====================================================
          DECORATIVE RAPID WORD
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute

          -right-6
          bottom-[30px]

          hidden

          font-barlowCond

          text-[13vw]

          font-black
          italic
          uppercase

          leading-none

          tracking-[-.05em]

          text-white/[0.018]

          xl:block
        "
      >
        Rapid
      </div>


      <div
        className="
          relative
          z-10

          mx-auto

          max-w-[1500px]
        "
      >

        {/* ===================================================
            TOP CTA
        =================================================== */}

        <div
          className="
            flex
            flex-col

            gap-8

            border-b
            border-white/[0.08]

            pb-14

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >

          <div>

            <div
              className="
                text-[10px]

                font-black
                uppercase

                tracking-[.2em]

                text-[#41B6FF]
              "
            >
              Ready for better garment care?
            </div>


            <h2
              className="
                mt-4

                max-w-[850px]

                font-barlowCond

                text-[clamp(2.8rem,5vw,5.5rem)]

                font-black
                uppercase

                leading-[.9]

                tracking-[-.025em]

                text-white
              "
            >
              Cleaned with care.

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#41B6FF]
                  via-[#8CD5FF]
                  to-white

                  bg-clip-text
                  text-transparent
                "
              >
                Delivered with confidence.
              </span>
            </h2>

          </div>


          {/* BOOK BUTTON */}

          <a
            href=
              "https://online.rapidlaundromat.lk"

            target="_blank"

            rel="noopener noreferrer"

            className="
              group

              inline-flex

              min-h-[54px]

              shrink-0

              items-center
              justify-center

              gap-3

              self-start

              rounded-full

              bg-white

              px-7

              text-[10px]

              font-black
              uppercase

              tracking-[.15em]

              text-[#001F5C]

              transition-all
              duration-300

              ease-[cubic-bezier(0.22,1,0.36,1)]

              hover:-translate-y-[3px]
              hover:scale-[1.025]

              hover:shadow-[0_18px_50px_rgba(65,182,255,.14)]

              lg:self-auto
            "
          >
            Book Online


            <ArrowUpRight
              size={15}

              className="
                transition-transform
                duration-300

                group-hover:
                translate-x-0.5

                group-hover:
                -translate-y-0.5
              "
            />

          </a>

        </div>


        {/* ===================================================
            MAIN FOOTER
        =================================================== */}

        <div
          className="
            grid

            gap-12

            py-14

            md:grid-cols-2

            lg:grid-cols-[1.3fr_.65fr_.65fr_.85fr]
          "
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <Link
              href="/"

              className="
                group

                inline-flex

                items-center

                gap-4
              "
            >

              <Image
                src="/images/logo.jpeg"

                alt="Rapid Laundromat"

                width={58}
                height={58}

                className="
                  h-[56px]
                  w-[56px]

                  rounded-full

                  object-contain

                  shadow-[0_8px_30px_rgba(0,98,204,.18)]

                  transition-all
                  duration-500

                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  group-hover:
                  scale-[1.06]

                  group-hover:
                  shadow-[0_12px_35px_rgba(65,182,255,.22)]
                "
              />


              <div>

                {/* ===========================================
                    BRAND NAME
                =========================================== */}

                <div
                  className="
                    flex
                    items-baseline

                    font-barlowCond

                    text-[1.2rem]

                    uppercase

                    leading-none

                    text-white
                  "
                >

                  <span
                    className="
                      inline-block

                      font-black
                      italic

                      tracking-[-.7px]

                      transition-all
                      duration-300

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:
                      -translate-y-[1px]

                      group-hover:
                      scale-[1.045]
                    "
                  >
                    Rapid
                  </span>


                  <span
                    className="
                      ml-[6px]

                      font-black
                      not-italic

                      tracking-[.45px]

                      text-[#41B6FF]
                    "
                  >
                    Laundromat
                  </span>

                </div>


                <div
                  className="
                    mt-1

                    text-[9px]

                    font-black
                    uppercase

                    tracking-[.17em]

                    text-[#41B6FF]
                  "
                >
                  Professional Garment Care
                </div>

              </div>

            </Link>


            {/* DESCRIPTION */}

            <p
              className="
                mt-6

                max-w-[420px]

                text-[.9rem]

                leading-[1.8]

                text-white/45
              "
            >
              Professional laundry and garment care built around quality,
              convenience, reliability and a better customer experience.
            </p>


            {/* =================================================
                SOCIAL ICON TITLE
            ================================================= */}

            <div
              className="
                mt-7

                text-[9px]

                font-black
                uppercase

                tracking-[.17em]

                text-[#41B6FF]
              "
            >
              Follow Rapid
            </div>


            {/* =================================================
                SOCIAL ICON BUTTONS
            ================================================= */}

            <div
              className="
                mt-4

                flex
                flex-wrap

                gap-3
              "
            >

              {socials.map(
                (
                  social
                ) => (

                  <a
                    key={
                      social.name
                    }

                    href={
                      social.href
                    }

                    target="_blank"

                    rel="noopener noreferrer"

                    aria-label={
                      social.name
                    }

                    title={
                      `${social.name} · ${social.handle}`
                    }

                    className={`
                      group

                      relative

                      flex

                      h-12
                      w-12

                      items-center
                      justify-center

                      rounded-[15px]

                      border
                      border-white/10

                      bg-white/[0.035]

                      p-[6px]

                      transition-all
                      duration-300

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      hover:
                      -translate-y-[4px]

                      hover:
                      scale-[1.07]

                      hover:
                      bg-white/[0.065]

                      ${social.border}

                      ${social.glow}
                    `}
                  >

                    <div
                      className="
                        h-full
                        w-full

                        transition-transform
                        duration-300

                        ease-[cubic-bezier(0.22,1,0.36,1)]

                        group-hover:
                        scale-[1.06]
                      "
                    >

                      <SocialBrandIcon
                        type={
                          social.type
                        }

                        size={18}
                      />

                    </div>

                  </a>

                )
              )}

            </div>

          </div>


          {/* =================================================
              FOOTER LINK COLUMNS
          ================================================= */}

          {FOOTER_LINKS.map(
            (
              group
            ) => (

              <div
                key={
                  group.title
                }
              >

                <div
                  className="
                    text-[9px]

                    font-black
                    uppercase

                    tracking-[.18em]

                    text-[#41B6FF]
                  "
                >
                  {
                    group.title
                  }
                </div>


                <div
                  className="
                    mt-5

                    space-y-3
                  "
                >

                  {group.links.map(
                    (
                      link
                    ) => (

                      <Link
                        key={
                          link.label
                        }

                        href={
                          link.href
                        }

                        className="
                          group

                          flex
                          items-center

                          gap-2

                          text-[.88rem]

                          font-bold

                          text-white/48

                          transition-all
                          duration-300

                          ease-[cubic-bezier(0.22,1,0.36,1)]

                          hover:
                          translate-x-[3px]

                          hover:
                          text-white
                        "
                      >

                        <span>
                          {
                            link.label
                          }
                        </span>


                        <ArrowUpRight
                          size={11}

                          className="
                            opacity-0

                            transition-all
                            duration-300

                            group-hover:
                            translate-x-0.5

                            group-hover:
                            -translate-y-0.5

                            group-hover:
                            opacity-100
                          "
                        />

                      </Link>

                    )
                  )}

                </div>

              </div>

            )
          )}


          {/* =================================================
              LOCATIONS
          ================================================= */}

          <div>

            <div
              className="
                text-[9px]

                font-black
                uppercase

                tracking-[.18em]

                text-[#41B6FF]
              "
            >
              Find Rapid
            </div>


            <div
              className="
                mt-5

                space-y-4
              "
            >

              <LocationItem>
                Kurunegala
              </LocationItem>


              <LocationItem>
                Kandy
              </LocationItem>

            </div>


            {/* ===============================================
                HOURS
            =============================================== */}

            <div
              className="
                mt-7

                border-t
                border-white/[0.08]

                pt-5
              "
            >

              <div
                className="
                  text-[9px]

                  font-black
                  uppercase

                  tracking-[.14em]

                  text-white/30
                "
              >
                Opening Hours
              </div>


              <div
                className="
                  mt-2

                  text-[.88rem]

                  font-black

                  text-white
                "
              >
                7:00 AM – 7:00 PM
              </div>


              <div
                className="
                  mt-1

                  text-[.78rem]

                  text-white/35
                "
              >
                Open daily
              </div>

            </div>


            {/* ===============================================
                ONLINE BOOKING
            =============================================== */}

            <a
              href=
                "https://online.rapidlaundromat.lk"

              target="_blank"

              rel="noopener noreferrer"

              className="
                group

                mt-7

                inline-flex

                items-center
                gap-2

                text-[9px]

                font-black
                uppercase

                tracking-[.14em]

                text-[#41B6FF]

                transition-colors
                duration-300

                hover:
                text-white
              "
            >
              Online Booking


              <ArrowUpRight
                size={13}

                className="
                  transition-transform
                  duration-300

                  group-hover:
                  translate-x-0.5

                  group-hover:
                  -translate-y-0.5
                "
              />

            </a>

          </div>

        </div>


        {/* ===================================================
            SOCIAL MEDIA DETAIL CARDS
        =================================================== */}

        <div
          className="
            border-t
            border-white/[0.08]

            py-8
          "
        >

          <div
            className="
              grid

              gap-3

              sm:grid-cols-2

              lg:grid-cols-4
            "
          >

            {socials.map(
              (
                social
              ) => (

                <a
                  key={
                    social.name
                  }

                  href={
                    social.href
                  }

                  target="_blank"

                  rel="noopener noreferrer"

                  aria-label={
                    social.name
                  }

                  className={`
                    group

                    flex

                    items-center

                    gap-3

                    rounded-[17px]

                    border
                    border-white/[0.06]

                    bg-white/[0.025]

                    px-4
                    py-3

                    transition-all
                    duration-300

                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    hover:
                    -translate-y-[3px]

                    hover:
                    bg-white/[0.05]

                    ${social.border}

                    ${social.glow}
                  `}
                >

                  {/* =========================================
                      PERMANENT BRAND COLORED ICON
                  ========================================= */}

                  <div
                    className="
                      h-11
                      w-11

                      shrink-0

                      rounded-[13px]

                      border
                      border-white/[0.07]

                      bg-white/[0.04]

                      p-[5px]

                      transition-all
                      duration-300

                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:
                      scale-[1.07]

                      group-hover:
                      bg-white/[0.07]
                    "
                  >

                    <div
                      className="
                        h-full
                        w-full

                        transition-transform
                        duration-300

                        group-hover:
                        scale-[1.05]
                      "
                    >

                      <SocialBrandIcon
                        type={
                          social.type
                        }

                        size={17}
                      />

                    </div>

                  </div>


                  {/* DETAILS */}

                  <div
                    className="
                      min-w-0
                    "
                  >

                    <div
                      className="
                        text-[8px]

                        font-black
                        uppercase

                        tracking-[.13em]

                        text-[#41B6FF]
                      "
                    >
                      {
                        social.name
                      }
                    </div>


                    <div
                      className="
                        mt-1

                        truncate

                        text-[.76rem]

                        font-bold

                        text-white/45

                        transition-colors
                        duration-300

                        group-hover:
                        text-white/80
                      "
                    >
                      {
                        social.handle
                      }
                    </div>

                  </div>


                  <ArrowUpRight
                    size={12}

                    className="
                      ml-auto

                      shrink-0

                      text-white/20

                      transition-all
                      duration-300

                      group-hover:
                      translate-x-0.5

                      group-hover:
                      -translate-y-0.5

                      group-hover:
                      text-[#41B6FF]
                    "
                  />

                </a>

              )
            )}

          </div>

        </div>


        {/* ===================================================
            BOTTOM FOOTER
        =================================================== */}

        <div
          className="
            flex

            flex-col

            gap-4

            border-t
            border-white/[0.08]

            py-7

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* COPYRIGHT */}

          <div
            className="
              text-[.78rem]

              text-white/30
            "
          >
            © {year} Rapid Laundromat. All rights reserved.
          </div>


          {/* DEVELOPER */}

          <div
            className="
              text-[.78rem]

              text-white/30
            "
          >
            Developed by{" "}

            <span
              className="
                font-bold

                text-white/65

                transition-colors
                duration-300

                hover:
                text-[#41B6FF]
              "
            >
              Pavithra Chathuramadu
            </span>
          </div>

        </div>

      </div>

    </footer>
  );
}


/* =========================================================
   LOCATION ITEM
========================================================= */

function LocationItem({
  children,
}) {

  return (
    <div
      className="
        group

        flex

        items-center

        gap-3
      "
    >

      <div
        className="
          flex

          h-8
          w-8

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-white/[0.05]

          text-[#41B6FF]

          transition-all
          duration-300

          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:
          scale-105

          group-hover:
          bg-[#0062CC]

          group-hover:
          text-white
        "
      >
        <MapPin
          size={14}
        />
      </div>


      <span
        className="
          text-[.88rem]

          font-bold

          text-white/55

          transition-colors
          duration-300

          group-hover:
          text-white
        "
      >
        {
          children
        }
      </span>

    </div>
  );
}