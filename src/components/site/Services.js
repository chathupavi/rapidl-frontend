"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Footprints,
  Heart,
  Hotel,
  LayoutGrid,
  PanelsTopLeft,
  ScanSearch,
  Shirt,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  useState,
} from "react";


/* =========================================================
   ICONS
========================================================= */

const icons = {
  Shirt,
  Sparkles,
  Zap,
  Hotel,
  PanelsTopLeft,
  ScanSearch,
  Truck,
  Building2,
  BriefcaseBusiness,
  Footprints,
  LayoutGrid,
  Heart,
};


/* =========================================================
   SERVICE DETAILS

   USED BY:
   - Featured services
   - Regular services
========================================================= */

function ServiceDetails({
  service,
}) {
  const hasSuitableFor =
    Array.isArray(
      service?.suitableFor
    ) &&
    service.suitableFor.length >
      0;


  const hasIncludes =
    Array.isArray(
      service?.includes
    ) &&
    service.includes.length >
      0;


  if (
    !hasSuitableFor &&
    !hasIncludes
  ) {
    return (
      <div
        className="
          border-t
          border-[#001F5C]/[0.07]
          pt-5
        "
      >
        <p
          className="
            text-[.75rem]
            leading-6
            text-slate-400
          "
        >
          More service details will be available soon.
        </p>
      </div>
    );
  }


  return (
    <div
      className="
        grid
        gap-6
        border-t
        border-[#001F5C]/[0.07]
        pt-5
        md:grid-cols-2
      "
    >

      {/* ===================================================
          SUITABLE FOR
      =================================================== */}

      {hasSuitableFor && (
        <div>
          <div
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.18em]
              text-[#0084E3]
            "
          >
            Suitable For
          </div>


          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-2
            "
          >
            {service.suitableFor.map(
              (
                item,
                index
              ) => (
                <span
                  key={`${item}-${index}`}
                  className="
                    rounded-full
                    border
                    border-[#0062CC]/10
                    bg-[#F5FAFF]
                    px-3
                    py-1.5
                    text-[9px]
                    font-bold
                    text-[#001F5C]/70
                  "
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      )}


      {/* ===================================================
          SERVICE INCLUDES
      =================================================== */}

      {hasIncludes && (
        <div>
          <div
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.18em]
              text-[#0084E3]
            "
          >
            Service Includes
          </div>


          <div
            className="
              mt-3
              space-y-2
            "
          >
            {service.includes.map(
              (
                item,
                index
              ) => (
                <div
                  key={`${item}-${index}`}
                  className="
                    flex
                    items-start
                    gap-3
                    text-[10px]
                    font-semibold
                    leading-5
                    text-slate-500
                  "
                >
                  <span
                    className="
                      mt-[7px]
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-gradient-to-r
                      from-[#0062CC]
                      to-[#41B6FF]
                    "
                  />

                  <span>
                    {item}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}


/* =========================================================
   FEATURED SERVICE
   FIRST 3 FIRESTORE SERVICES
========================================================= */

function FeaturedService({
  service,
  index,
}) {
  const [
    expanded,
    setExpanded,
  ] =
    useState(false);


  const reduceMotion =
    useReducedMotion();


  const Icon =
    icons[service.icon] ||
    Sparkles;


  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 28,
              filter:
                "blur(4px)",
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              filter:
                "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.75,

        delay:
          index *
          0.07,

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
        rounded-[26px]
        border
        border-[#0062CC]/10
        bg-white
        shadow-[0_16px_45px_rgba(0,31,92,.05)]
      "
    >

      {/* ===================================================
          ATMOSPHERE
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-[#41B6FF]/10
          blur-[85px]
          transition
          duration-700

          group-hover:bg-[#0084E3]/15
        "
      />


      <div
        className="
          relative
          z-10
          p-6

          lg:p-7
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-[15px]
              bg-gradient-to-br
              from-[#001F5C]
              via-[#0062CC]
              to-[#0084E3]
              text-white
              shadow-[0_10px_28px_rgba(0,98,204,.20)]
            "
          >
            <Icon
              size={18}
            />
          </div>


          <span
            className="
              font-barlowCond
              text-4xl
              font-black
              leading-none
              tracking-[-0.06em]
              text-[#001F5C]/[0.07]
            "
          >
            {service.number}
          </span>
        </div>


        {/* =================================================
            CATEGORY
        ================================================= */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-6
              bg-[#41B6FF]
            "
          />


          <span
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.18em]
              text-[#0084E3]
            "
          >
            {service.category}
          </span>


          {service.badge && (
            <span
              className="
                rounded-full
                bg-[#001F5C]
                px-3
                py-1
                text-[7px]
                font-black
                uppercase
                tracking-[0.15em]
                text-white
              "
            >
              {service.badge}
            </span>
          )}
        </div>


        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            mt-3
            max-w-[400px]
            text-[clamp(1.5rem,2.1vw,2.05rem)]
            font-black
            leading-[1]
            tracking-[-0.05em]
            text-[#001F5C]
          "
        >
          {service.title}
        </h3>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-3
            max-w-[500px]
            text-[.78rem]
            leading-[1.7]
            text-slate-500
          "
        >
          {service.description}
        </p>


        {/* =================================================
            WHAT'S INCLUDED
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-center
          "
        >
          <button
            type="button"
            aria-expanded={
              expanded
            }
            onClick={() =>
              setExpanded(
                (
                  current
                ) =>
                  !current
              )
            }
            className="
              group/details
              inline-flex
              items-center
              gap-2
              text-[9px]
              font-black
              uppercase
              tracking-[0.13em]
              text-[#0062CC]
              transition

              hover:text-[#0084E3]
            "
          >
            {expanded
              ? "Hide Details"
              : "What's Included"}


            <ChevronDown
              size={13}
              className={`
                transition-transform
                duration-300

                ${
                  expanded
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>
        </div>


        {/* =================================================
            DETAILS
        ================================================= */}

        <AnimatePresence
          initial={false}
        >
          {expanded && (
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      height: 0,
                      opacity: 0,
                      marginTop: 0,
                    }
              }
              animate={{
                height: "auto",
                opacity: 1,
                marginTop: 22,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      height: 0,
                      opacity: 0,
                      marginTop: 0,
                    }
              }
              transition={{
                duration: 0.4,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                overflow-hidden
              "
            >
              <ServiceDetails
                service={
                  service
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.article>
  );
}


/* =========================================================
   STANDARD SERVICE CARD

   NOW ALSO HAS:
   - WHAT'S INCLUDED
   - EXPANDABLE DETAILS

   EXPLORE REMOVED
========================================================= */

function ServiceCard({
  service,
  index,
}) {
  const [
    expanded,
    setExpanded,
  ] =
    useState(false);


  const reduceMotion =
    useReducedMotion();


  const Icon =
    icons[service.icon] ||
    Sparkles;


  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 22,
              scale: 0.99,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.65,

        delay:
          (index % 4) *
          0.05,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
            }
      }
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-[#001F5C]/[0.07]
        bg-white
        shadow-[0_12px_35px_rgba(0,31,92,.04)]
        transition-shadow
        duration-500

        hover:shadow-[0_22px_55px_rgba(0,98,204,.09)]
      "
    >

      {/* ===================================================
          NUMBER
      =================================================== */}

      <span
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          font-barlowCond
          text-4xl
          font-black
          tracking-[-0.07em]
          text-[#001F5C]/[0.055]
        "
      >
        {service.number}
      </span>


      {/* ===================================================
          HOVER LIGHT
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-24
          h-52
          w-52
          rounded-full
          bg-[#41B6FF]/0
          blur-[75px]
          transition-all
          duration-700

          group-hover:bg-[#41B6FF]/14
        "
      />


      <div
        className="
          relative
          z-10
          flex
          min-h-[270px]
          flex-col
          p-5
        "
      >

        {/* =================================================
            ICON
        ================================================= */}

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-[14px]
            bg-[#F2F8FF]
            text-[#0062CC]
            transition
            duration-500

            group-hover:bg-gradient-to-br
            group-hover:from-[#0062CC]
            group-hover:to-[#41B6FF]
            group-hover:text-white
          "
        >
          <Icon
            size={16}
          />
        </div>


        {/* =================================================
            CATEGORY
        ================================================= */}

        <div
          className="
            mt-5
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          <div
            className="
              text-[7px]
              font-black
              uppercase
              tracking-[0.18em]
              text-[#0084E3]
            "
          >
            {service.category}
          </div>


          {service.badge && (
            <span
              className="
                rounded-full
                bg-[#001F5C]
                px-2.5
                py-1
                text-[6px]
                font-black
                uppercase
                tracking-[0.14em]
                text-white
              "
            >
              {service.badge}
            </span>
          )}
        </div>


        {/* =================================================
            TITLE
        ================================================= */}

        <h3
          className="
            mt-2.5
            max-w-[270px]
            text-[1.18rem]
            font-black
            leading-[1.07]
            tracking-[-0.04em]
            text-[#001F5C]
          "
        >
          {service.title}
        </h3>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-3
            text-[.78rem]
            leading-[1.65]
            text-slate-500
          "
        >
          {service.description}
        </p>


        {/* =================================================
            WHAT'S INCLUDED
        ================================================= */}

        <div
          className="
            mt-auto
            pt-6
          "
        >
          <button
            type="button"
            aria-expanded={
              expanded
            }
            onClick={() =>
              setExpanded(
                (
                  current
                ) =>
                  !current
              )
            }
            className="
              group/details
              inline-flex
              items-center
              gap-2
              text-[8px]
              font-black
              uppercase
              tracking-[0.14em]
              text-[#0062CC]
              transition

              hover:text-[#0084E3]
            "
          >
            {expanded
              ? "Hide Details"
              : "What's Included"}


            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-[#0062CC]/10
                bg-[#F5FAFF]
                transition

                group-hover/details:border-[#0062CC]/20
                group-hover/details:bg-[#EEF7FF]
              "
            >
              <ChevronDown
                size={12}
                className={`
                  transition-transform
                  duration-300

                  ${
                    expanded
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </span>
          </button>
        </div>


        {/* =================================================
            EXPANDED DETAILS
        ================================================= */}

        <AnimatePresence
          initial={false}
        >
          {expanded && (
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      height: 0,
                      opacity: 0,
                      marginTop: 0,
                    }
              }
              animate={{
                height:
                  "auto",

                opacity:
                  1,

                marginTop:
                  20,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      height:
                        0,

                      opacity:
                        0,

                      marginTop:
                        0,
                    }
              }
              transition={{
                duration:
                  0.4,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="
                overflow-hidden
              "
            >
              <ServiceDetails
                service={
                  service
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.article>
  );
}


/* =========================================================
   MAIN SERVICES
========================================================= */

export default function Services({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  /* =======================================================
     GET FIRESTORE SERVICES
  ======================================================= */

  const rawServices =
    Array.isArray(
      data?.services
    )
      ? data.services
      : Array.isArray(
            data?.items
          )
        ? data.items
        : [];


  /* =======================================================
     SORT BY ADMIN ORDER
  ======================================================= */

  const services = [
    ...rawServices,
  ]
    .filter(
      (
        service
      ) =>
        service &&
        service.published !==
          false
    )
    .sort(
      (
        a,
        b
      ) =>
        Number(
          a?.order ??
            999
        ) -
        Number(
          b?.order ??
            999
        )
    );


  /* =======================================================
     FIRST 3 = FEATURED
  ======================================================= */

  const featured =
    services.slice(
      0,
      3
    );


  /* =======================================================
     REST = STANDARD
  ======================================================= */

  const regular =
    services.slice(
      3
    );


  if (
    services.length ===
    0
  ) {
    return null;
  }


  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#F5FAFF]
        py-[clamp(5.5rem,9vw,8rem)]
      "
    >

      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-52
          top-[12%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#41B6FF]/10
          blur-[150px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          -right-52
          bottom-[5%]
          h-[540px]
          w-[540px]
          rounded-full
          bg-[#0062CC]/[0.055]
          blur-[160px]
        "
      />


      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1500px]
          px-5

          sm:px-8
          lg:px-10
        "
      >

        {/* =================================================
            INTRO
        ================================================= */}

        <div
          className="
            grid
            gap-8

            lg:grid-cols-[1.15fr_.6fr]
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
              duration:
                0.85,

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
              <span
                className="
                  h-px
                  w-9
                  bg-gradient-to-r
                  from-[#0062CC]
                  to-[#41B6FF]
                "
              />


              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-[#0062CC]
                "
              >
                Complete Care
              </span>
            </div>


            <h2
              className="
                mt-5
                max-w-[900px]
                font-barlowCond
                text-[clamp(3rem,6vw,6.5rem)]
                font-black
                uppercase
                leading-[0.9]
                tracking-[.5px]
                text-[#001F5C]
              "
            >
              One Place.

              <br />


              <span
                className="
                  inline-block
                  bg-gradient-to-r
                  from-[#0062CC]
                  via-[#0084E3]
                  to-[#41B6FF]
                  bg-clip-text
                  text-transparent
                "
              >
                Every Kind of Care.
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
              duration:
                0.8,

              delay:
                0.12,
            }}
          >

            <p
              className="
                max-w-[520px]
                text-[.9rem]
                leading-[1.8]
                text-slate-500

                lg:ml-auto
              "
            >
              From everyday garments and premium dry cleaning to
              hospitality linen, footwear, furnishings and specialist
              textile care — Rapid brings them together through one
              professional care network.
            </p>


            <div
              className="
                mt-5
                flex
                items-center
                gap-2

                lg:justify-end
              "
            >
              <span
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[#001F5C]/40
                "
              >
                {services.length} Core{" "}
                {services.length ===
                1
                  ? "Service"
                  : "Services"}
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
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[#001F5C]/40
                "
              >
                Household + Business
              </span>
            </div>

          </motion.div>

        </div>


        {/* =================================================
            FIRST 3 FEATURED SERVICES
        ================================================= */}

        <div
          className="
            mt-14
            grid
            gap-4

            lg:grid-cols-3
          "
        >
          {featured.map(
            (
              service,
              index
            ) => (
              <FeaturedService
                key={
                  service.id ||
                  service.slug ||
                  index
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


        {/* =================================================
            MORE WAYS WE CARE
        ================================================= */}

        {regular.length >
          0 && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity:
                      1,
                  }
            }
            viewport={{
              once:
                true,
            }}
            className="
              my-12
              flex
              items-center
              gap-5
            "
          >
            <div
              className="
                h-px
                flex-1
                bg-gradient-to-r
                from-transparent
                to-[#0062CC]/15
              "
            />


            <div
              className="
                text-center
                text-[8px]
                font-black
                uppercase
                tracking-[0.2em]
                text-[#0084E3]
              "
            >
              More Ways We Care
            </div>


            <div
              className="
                h-px
                flex-1
                bg-gradient-to-r
                from-[#0062CC]/15
                to-transparent
              "
            />
          </motion.div>
        )}


        {/* =================================================
            REMAINING SERVICES

            NOW ALL HAVE:
            - WHAT'S INCLUDED
            - SUITABLE FOR
            - SERVICE INCLUDES
        ================================================= */}

        {regular.length >
          0 && (
          <div
            className="
              grid
              items-start
              gap-4

              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {regular.map(
              (
                service,
                index
              ) => (
                <ServiceCard
                  key={
                    service.id ||
                    service.slug ||
                    index
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
        )}


        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            mt-12
            overflow-hidden
            rounded-[26px]
            bg-gradient-to-r
            from-[#001F5C]
            via-[#0062CC]
            to-[#0084E3]
            p-[1px]
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              rounded-[25px]
              bg-[#F8FBFF]/95
              px-6
              py-6
              backdrop-blur-xl

              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>
              <div
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#0084E3]
                "
              >
                Need something different?
              </div>


              <div
                className="
                  mt-2
                  text-[1.1rem]
                  font-black
                  tracking-[-0.035em]
                  text-[#001F5C]
                "
              >
                Tell us what needs care. We&apos;ll guide you to the
                right service.
              </div>
            </div>


            <a
              href="#contact"
              className="
                group
                inline-flex
                h-11
                shrink-0
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-gradient-to-br
                from-[#0062CC]
                via-[#0084E3]
                to-[#41B6FF]
                px-5
                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-white
                shadow-[0_10px_30px_rgba(0,98,204,.20)]
                transition
                duration-300

                hover:-translate-y-1
                hover:shadow-[0_16px_40px_rgba(0,132,227,.30)]
              "
            >
              Ask Rapid


              <ArrowRight
                size={14}
                className="
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </a>

          </div>
        </motion.div>

      </div>

    </section>
  );
}