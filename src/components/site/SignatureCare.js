"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";


/* =========================================================
   DEFAULT SECTION CONTENT
========================================================= */

const DEFAULT_CONTENT = {
  label:
    "Signature Care Solutions",

  heading:
    "Luxury Garment Care",

  headingHighlight:
    "Beyond the Ordinary",

  description:
    "Specialist care for your most prized possessions — from bridal heritage to luxury footwear and statement home textiles.",
};


/* =========================================================
   HELPERS
========================================================= */

function getServiceHref(service) {
  if (service?.slug) {
    return `/services/${service.slug}`;
  }

  if (service?.href) {
    return service.href;
  }

  return "#contact";
}


function getServiceKey(
  service,
  index
) {
  return (
    service?.id ||
    service?._id ||
    service?.slug ||
    `${service?.title || "signature"}-${index}`
  );
}


/* =========================================================
   MAIN SECTION
========================================================= */

export default function SignatureCare({
  data = {},
}) {
  const shouldReduceMotion =
    useReducedMotion();


  /* =======================================================
     SECTION CONTENT
  ======================================================= */

  const label =
    data.label ??
    DEFAULT_CONTENT.label;

  const heading =
    data.heading ??
    DEFAULT_CONTENT.heading;

  const headingHighlight =
    data.headingHighlight ??
    DEFAULT_CONTENT.headingHighlight;

  const description =
    data.description ??
    DEFAULT_CONTENT.description;


  /* =======================================================
     FIRESTORE SERVICES
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
     FILTER + SORT
  ======================================================= */

  const services = [
    ...rawServices,
  ]
    .filter(
      (service) =>
        service &&
        service.published !==
          false
    )
    .sort(
      (a, b) =>
        Number(
          a?.order ?? 999
        ) -
        Number(
          b?.order ?? 999
        )
    );


  /* =======================================================
     HIDE EMPTY SECTION
  ======================================================= */

  if (
    services.length === 0
  ) {
    return null;
  }


  return (
    <section
      id="signature-care"
      className="
        relative
        overflow-hidden
        px-[5%]
        py-24
        text-white
        lg:py-32
      "
      style={{
        background: `
          linear-gradient(
            150deg,
            #001F5C 0%,
            #00163F 46%,
            #002A70 100%
          )
        `,
      }}
    >

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        {/* ROYAL BLUE GLOW */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [
                    "-8%",
                    "12%",
                    "-8%",
                  ],

                  y: [
                    "-4%",
                    "8%",
                    "-4%",
                  ],

                  scale: [
                    1,
                    1.08,
                    1,
                  ],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            ease:
              "easeInOut",
          }}
          className="
            absolute
            -left-40
            -top-40
            h-[560px]
            w-[560px]
            rounded-full
            bg-[#0062CC]/20
            blur-[120px]
          "
        />


        {/* SKY BLUE GLOW */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [
                    "10%",
                    "-10%",
                    "10%",
                  ],

                  y: [
                    "10%",
                    "-4%",
                    "10%",
                  ],

                  scale: [
                    1,
                    1.12,
                    1,
                  ],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease:
              "easeInOut",
          }}
          className="
            absolute
            -bottom-52
            -right-44
            h-[600px]
            w-[600px]
            rounded-full
            bg-[#41B6FF]/[0.09]
            blur-[130px]
          "
        />


        {/* CENTER LIGHT */}

        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [
                    0.08,
                    0.18,
                    0.08,
                  ],

                  scale: [
                    1,
                    1.12,
                    1,
                  ],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease:
              "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[36%]
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-[#0084E3]/18
            blur-[140px]
          "
        />


        {/* WATER CURVES */}

        <div
          className="
            absolute
            inset-x-0
            top-[28%]
            h-[360px]
            opacity-[0.24]
          "
        >
          <svg
            viewBox="0 0 1600 360"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="
                M0 180
                C280 100 420 280 700 190
                C980 100 1180 260 1600 140
              "
              fill="none"
              stroke="url(#signatureBlueWave)"
              strokeWidth="1.3"
            />

            <path
              d="
                M0 240
                C260 160 500 300 820 220
                C1100 150 1260 300 1600 210
              "
              fill="none"
              stroke="url(#signatureBlueWave)"
              strokeWidth=".8"
              opacity=".55"
            />

            <defs>
              <linearGradient
                id="signatureBlueWave"
                x1="0"
                x2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#41B6FF"
                  stopOpacity="0"
                />

                <stop
                  offset="42%"
                  stopColor="#41B6FF"
                  stopOpacity=".85"
                />

                <stop
                  offset="72%"
                  stopColor="#0084E3"
                  stopOpacity=".55"
                />

                <stop
                  offset="100%"
                  stopColor="#0062CC"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
        "
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            grid
            gap-10
            lg:grid-cols-[1.05fr_.55fr]
            lg:items-end
          "
        >
          <div className="max-w-[900px]">

            {/* LABEL */}

            {label && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        x: -24,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        x: 0,
                      }
                }
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.7,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="
                  mb-5
                  flex
                  items-center
                  gap-3
                "
              >
                <motion.span
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          width: 0,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          width: 34,
                        }
                  }
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.15,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                  className="
                    h-[2px]
                    bg-gradient-to-r
                    from-[#0062CC]
                    via-[#0084E3]
                    to-[#41B6FF]
                  "
                />

                <span
                  className="
                    text-[.68rem]
                    font-extrabold
                    uppercase
                    tracking-[4px]
                    text-[#41B6FF]
                  "
                >
                  {label}
                </span>
              </motion.div>
            )}


            {/* HEADING */}

            {heading && (
              <motion.h2
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 42,
                        filter:
                          "blur(10px)",
                      }
                }
                whileInView={
                  shouldReduceMotion
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
                  amount: 0.35,
                }}
                transition={{
                  duration: 1,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
                className="
                  font-barlowCond
                  text-[clamp(2.8rem,5.8vw,5.8rem)]
                  font-black
                  uppercase
                  leading-[.91]
                  tracking-[.5px]
                  text-white
                "
              >
                {heading}


                {headingHighlight && (
                  <>
                    <br />

                    <motion.span
                      initial={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              y: 18,
                            }
                      }
                      whileInView={
                        shouldReduceMotion
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
                        delay: 0.22,
                        ease: [
                          0.16,
                          1,
                          0.3,
                          1,
                        ],
                      }}
                      className="
                        inline-block
                        bg-gradient-to-r
                        from-[#41B6FF]
                        via-[#0084E3]
                        to-white
                        bg-clip-text
                        text-transparent
                      "
                    >
                      {
                        headingHighlight
                      }
                    </motion.span>
                  </>
                )}
              </motion.h2>
            )}
          </div>


          {/* DESCRIPTION */}

          {description && (
            <motion.div
              initial={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 20,
                      filter:
                        "blur(4px)",
                    }
              }
              whileInView={
                shouldReduceMotion
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              className="lg:pb-2"
            >
              <p
                className="
                  max-w-[560px]
                  text-[.95rem]
                  leading-[1.85]
                  text-white/55
                  lg:ml-auto
                "
              >
                {description}
              </p>


              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-3
                  lg:justify-end
                "
              >
                <span
                  className="
                    h-[2px]
                    w-14
                    rounded-full
                    bg-[#0062CC]
                  "
                />

                <span
                  className="
                    h-[2px]
                    w-7
                    rounded-full
                    bg-[#0084E3]
                  "
                />

                <span
                  className="
                    h-[2px]
                    w-3
                    rounded-full
                    bg-[#41B6FF]
                  "
                />
              </div>
            </motion.div>
          )}
        </div>


        {/* ===================================================
            DIVIDER
        =================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  scaleX: 0,
                  opacity: 0,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  scaleX: 1,
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1.1,
            delay: 0.32,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="
            mt-12
            h-px
            origin-left
            bg-gradient-to-r
            from-[#41B6FF]/55
            via-[#0084E3]/18
            to-transparent
          "
        />


        {/* ===================================================
            CARDS
        =================================================== */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {services.map(
            (
              service,
              index
            ) => (
              <SignatureCard
                key={getServiceKey(
                  service,
                  index
                )}
                service={service}
                index={index}
                shouldReduceMotion={
                  shouldReduceMotion
                }
              />
            )
          )}
        </div>


        {/* ===================================================
            BOTTOM MESSAGE
        =================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 22,
                }
          }
          whileInView={
            shouldReduceMotion
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
            delay: 0.2,
          }}
          className="
            mt-12
            flex
            flex-col
            gap-5
            border-t
            border-white/[0.08]
            pt-8
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
                tracking-[0.2em]
                text-[#41B6FF]
              "
            >
              Signature attention
            </div>


            <p
              className="
                mt-2
                max-w-[620px]
                text-[11px]
                leading-6
                text-white/45
              "
            >
              For special garments, luxury accessories or high-value textiles,
              our team can recommend the most suitable care process before
              treatment begins.
            </p>
          </div>


          <a
            href="#contact"
            className="
              group
              inline-flex
              h-12
              shrink-0
              items-center
              justify-center
              gap-3
              rounded-xl
              border
              border-[#41B6FF]/20
              bg-gradient-to-br
              from-[#0062CC]
              via-[#0084E3]
              to-[#41B6FF]
              px-6
              text-[9px]
              font-black
              uppercase
              tracking-[0.14em]
              text-white
              shadow-[0_12px_35px_rgba(0,98,204,.20)]
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_18px_48px_rgba(65,182,255,.25)]
            "
          >
            Discuss Your Item

            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}


/* =========================================================
   SIGNATURE CARD
========================================================= */

function SignatureCard({
  service,
  index,
  shouldReduceMotion,
}) {
  const href =
    getServiceHref(service);

  const title =
    service?.title ||
    service?.name ||
    "";

  const description =
    service?.description ||
    service?.desc ||
    "";

  const category =
    service?.category ||
    service?.tag ||
    "";

  const number =
    service?.number ||
    String(
      index + 1
    ).padStart(
      2,
      "0"
    );

  const emoji =
    typeof service?.icon ===
      "string"
      ? service.icon.trim()
      : "";

  const badge =
    typeof service?.badge ===
      "string" &&
    service.badge.trim()
      ? service.badge.trim()
      : null;


  return (
    <motion.a
      href={href}
      initial={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 0,
              y: 60,
              scale: 0.96,
              rotateX: 8,
              filter:
                "blur(8px)",
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter:
                "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
        margin:
          "0px 0px -50px 0px",
      }}
      transition={{
        duration: 0.85,

        delay:
          0.1 +
          index * 0.1,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -8,

              transition: {
                duration: 0.35,

                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              },
            }
      }
      className="
        group
        relative
        block
        min-h-[390px]
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.085]
        bg-white/[0.045]
        p-7
        shadow-[0_20px_50px_rgba(0,0,0,.14)]
        backdrop-blur-xl
      "
      style={{
        transformPerspective:
          1000,
      }}
    >

      {/* =====================================================
          CARD LIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          bg-[#41B6FF]/0
          blur-[70px]
          transition-all
          duration-700
          group-hover:bg-[#41B6FF]/12
        "
      />


      {/* =====================================================
          TOP LINE
      ===================================================== */}

      <motion.div
        initial={
          shouldReduceMotion
            ? undefined
            : {
                scaleX: 0,
              }
        }
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,

          delay:
            0.25 +
            index * 0.1,

          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="
          absolute
          left-0
          right-0
          top-0
          h-[2px]
          origin-left
          bg-gradient-to-r
          from-[#0062CC]
          via-[#0084E3]
          to-[#41B6FF]
        "
      />


      {/* =====================================================
          NUMBER
      ===================================================== */}

      <span
        className="
          absolute
          right-5
          top-5
          font-barlowCond
          text-[3.5rem]
          font-black
          leading-none
          tracking-[-0.07em]
          text-white/[0.045]
        "
      >
        {number}
      </span>


      {/* =====================================================
          EMOJI FROM FIRESTORE
      ===================================================== */}

      {emoji && (
        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  scale: 0.7,
                  rotate: -8,
                }
          }
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }
          }
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,

            delay:
              0.32 +
              index * 0.1,

            type:
              "spring",

            stiffness:
              180,

            damping:
              16,
          }}
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  scale: 1.1,
                  y: -3,
                }
          }
          className="
            relative
            mb-7
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-[18px]
            border
            border-[#41B6FF]/15
            bg-gradient-to-br
            from-[#0062CC]/25
            via-[#0084E3]/20
            to-[#41B6FF]/12
            shadow-[inset_0_1px_0_rgba(255,255,255,.08)]
          "
        >

          <span
            className="
              relative
              z-10
              select-none
              text-[2rem]
              leading-none
            "
          >
            {emoji}
          </span>


          <span
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[18px]
              bg-[#41B6FF]/10
              opacity-0
              blur-xl
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />
        </motion.div>
      )}


      {/* =====================================================
          CATEGORY + BADGE
      ===================================================== */}

      {(category ||
        badge) && (
        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          whileInView={
            shouldReduceMotion
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
            duration: 0.55,

            delay:
              0.36 +
              index * 0.1,
          }}
          className="
            mb-3
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {category && (
            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.18em]
                text-[#41B6FF]
              "
            >
              {category}
            </span>
          )}


          {badge && (
            <span
              className="
                rounded-full
                border
                border-[#41B6FF]/15
                bg-[#41B6FF]/10
                px-2.5
                py-1
                text-[6px]
                font-black
                uppercase
                tracking-[0.14em]
                text-[#9EDCFF]
              "
            >
              {badge}
            </span>
          )}
        </motion.div>
      )}


      {/* =====================================================
          TITLE
      ===================================================== */}

      {title && (
        <motion.h3
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 14,
                }
          }
          whileInView={
            shouldReduceMotion
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
            duration: 0.6,

            delay:
              0.42 +
              index * 0.1,
          }}
          className="
            max-w-[270px]
            font-barlowCond
            text-[1.55rem]
            font-extrabold
            uppercase
            leading-[1.02]
            tracking-[.5px]
            text-white
          "
        >
          {title}
        </motion.h3>
      )}


      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      {description && (
        <motion.p
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 10,
                }
          }
          whileInView={
            shouldReduceMotion
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
            duration: 0.6,

            delay:
              0.5 +
              index * 0.1,
          }}
          className="
            mt-4
            pb-14
            text-[.84rem]
            leading-[1.75]
            text-white/50
          "
        >
          {description}
        </motion.p>
      )}


      {/* =====================================================
          LOWER LABEL
      ===================================================== */}

      <div
        className="
          absolute
          bottom-6
          left-7
          right-7
          flex
          items-center
          justify-between
          border-t
          border-white/[0.06]
          pt-4
        "
      >
        <span
          className="
            text-[7px]
            font-black
            uppercase
            tracking-[0.16em]
            text-white/24
          "
        >
          Rapid Signature Care
        </span>


        <span
          className="
            flex
            items-center
            gap-1
            text-[7px]
            font-black
            uppercase
            tracking-[0.12em]
            text-[#41B6FF]/50
            transition-all
            duration-300
            group-hover:text-[#41B6FF]
          "
        >
          Explore

          <span
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          >
            ↗
          </span>
        </span>
      </div>


      {/* =====================================================
          HOVER SHINE
      ===================================================== */}

      <motion.div
        initial={{
          x: "-150%",
        }}
        whileHover={{
          x: "150%",
        }}
        transition={{
          duration: 0.8,
          ease:
            "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          w-[22%]
          rotate-[18deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.07]
          to-transparent
          blur-md
        "
      />
    </motion.a>
  );
}