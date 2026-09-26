"use client";

import Image from "next/image";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import { Sparkles } from "lucide-react";


/* =========================================================
   DEFAULT CONTENT
========================================================= */

const DEFAULT_DATA = {
  label: "Why Rapid Laundromat",

  headingParts: [
    {
      text: "Built",
      style: "normal",
      line: "new",
    },
    {
      text: "for",
      style: "normal",
    },
    {
      text: "care.",
      style: "gradient",
    },
    {
      text: "Designed",
      style: "normal",
    },
    {
      text: "for",
      style: "normal",
    },
    {
      text: "convenience.",
      style: "gradient",
    },
  ],

  description:
    "Professional garment care is about more than washing. Rapid combines experienced people, modern equipment, hygienic processes and convenient service to create a laundry experience customers and businesses can rely on.",

  googleRating: "5.0",

  experience: "28+ Years",

  branches: "3 Branches",

  items: [
    {
      _id: "why-01",
      icon: "🛡️",
      title: "Professional Service Standards",
      desc:
        "Structured service processes designed to deliver consistent cleaning, finishing and customer care.",
    },

    {
      _id: "why-02",
      icon: "👨‍🔧",
      title: "Experienced Laundry Staff",
      desc:
        "Experienced teams handle garments with attention to fabric type, condition and treatment requirements.",
    },

    {
      _id: "why-03",
      icon: "🧼",
      title: "Hygienic Processing Systems",
      desc:
        "Clean handling practices and controlled laundry processes support hygienic garment and textile care.",
    },

    {
      _id: "why-04",
      icon: "⚙️",
      title: "Modern Laundry Equipment",
      desc:
        "Modern washing, drying and finishing equipment supports efficient and consistent garment care.",
    },

    {
      _id: "why-05",
      icon: "⚡",
      title: "Fast Turnaround Times",
      desc:
        "Efficient workflows help complete laundry orders quickly while maintaining professional care standards.",
    },

    {
      _id: "why-06",
      icon: "🏢",
      title: "Commercial Laundry Expertise",
      desc:
        "Professional laundry solutions for hotels, restaurants, salons, offices, factories and other businesses.",
    },

    {
      _id: "why-07",
      icon: "🚚",
      title: "Pickup & Delivery Convenience",
      desc:
        "Scheduled collection and doorstep delivery make professional laundry care easier for homes and businesses.",
    },

    {
      _id: "why-08",
      icon: "🤝",
      title: "Customer-Focused Operations",
      desc:
        "Our service experience is designed around convenience, communication and reliable customer support.",
    },

    {
      _id: "why-09",
      icon: "💰",
      title: "Competitive Pricing",
      desc:
        "Professional laundry services with practical pricing options for individual, household and commercial needs.",
    },

    {
      _id: "why-10",
      icon: "✅",
      title: "Reliable Service Quality",
      desc:
        "Consistent processes, quality checks and careful finishing help maintain dependable service standards.",
    },
  ],
};


/* =========================================================
   HEADING RENDERER
========================================================= */

function HeadingParts({
  parts = [],
}) {
  if (
    !Array.isArray(parts) ||
    parts.length === 0
  ) {
    return null;
  }

  const lines = [];
  let currentLine = [];

  parts.forEach(
    (part, index) => {
      if (
        part?.line === "new" &&
        currentLine.length > 0
      ) {
        lines.push(
          currentLine
        );

        currentLine = [];
      }

      currentLine.push({
        ...part,
        _index: index,
      });
    }
  );

  if (
    currentLine.length > 0
  ) {
    lines.push(
      currentLine
    );
  }

  return (
    <>
      {lines.map(
        (
          line,
          lineIndex
        ) => (
          <span
            key={`line-${lineIndex}`}
            className="block"
          >
            {line.map(
              (
                part,
                partIndex
              ) => {
                const isGradient =
                  part.style ===
                  "gradient";

                return (
                  <span
                    key={
                      part._id ||
                      `${part.text}-${partIndex}`
                    }

                    className={
                      isGradient
                        ? `
                          bg-gradient-to-r
                          from-[#0062CC]
                          via-[#0084E3]
                          to-[#41B6FF]
                          bg-clip-text
                          text-transparent
                        `
                        : ""
                    }
                  >
                    {part.text}

                    {partIndex <
                      line.length - 1 &&
                      " "}
                  </span>
                );
              }
            )}
          </span>
        )
      )}
    </>
  );
}


/* =========================================================
   COMPACT WHY ITEM
========================================================= */

function WhyItem({
  item,
  index,
  reduceMotion,
}) {
  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 18,
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
        amount: 0.2,
      }}

      transition={{
        duration:
          0.58,

        delay:
          index *
          0.045,

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
        flex
        min-h-[92px]
        items-center
        gap-4
        overflow-hidden
        rounded-[20px]

        border
        border-[#001F5C]/[0.07]

        bg-white

        px-4
        py-4

        shadow-[0_10px_35px_rgba(0,31,92,.035)]

        transition-all
        duration-300

        hover:
        border-[#0062CC]/15

        hover:
        shadow-[0_18px_42px_rgba(0,98,204,.08)]
      "
    >

      {/* =====================================================
          EMOJI ICON
      ===================================================== */}

      <motion.div
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.12,
                rotate: -5,
              }
        }

        transition={{
          type: "spring",
          stiffness: 260,
          damping: 17,
        }}

        className="
          relative
          z-10

          flex
          h-11
          w-11
          shrink-0

          items-center
          justify-center

          rounded-xl

          border
          border-[#0062CC]/10

          bg-[#EEF6FF]

          text-[1.25rem]

          shadow-[0_8px_22px_rgba(0,98,204,.06)]

          transition-all
          duration-300

          group-hover:
          border-[#41B6FF]/25

          group-hover:
          bg-[#F5FAFF]
        "
      >

        {item.icon}

        {/* subtle glow */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            rounded-xl

            bg-[#41B6FF]/10

            opacity-0

            blur-xl

            transition-opacity
            duration-400

            group-hover:
            opacity-100
          "
        />

      </motion.div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          min-w-0
        "
      >

        <h3
          className="
            text-[.92rem]
            font-black
            leading-[1.2]
            tracking-[-0.02em]
            text-[#001F5C]
          "
        >
          {item.title}
        </h3>


        <p
          className="
            mt-1
            line-clamp-2
            text-[.72rem]
            leading-[1.55]
            text-slate-500
          "
        >
          {item.desc}
        </p>

      </div>


      {/* =====================================================
          HOVER GLOW
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -right-16
          -top-16

          h-32
          w-32

          rounded-full

          bg-[#41B6FF]/0

          blur-[60px]

          transition-all
          duration-500

          group-hover:
          bg-[#41B6FF]/12
        "
      />


      {/* =====================================================
          BOTTOM ACCENT
      ===================================================== */}

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

          group-hover:
          w-full
        "
      />

    </motion.article>
  );
}


/* =========================================================
   WHY RAPID
========================================================= */

export default function WhyRapid({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  const content = {
    ...DEFAULT_DATA,
    ...data,

    headingParts:
      data.headingParts ||
      DEFAULT_DATA.headingParts,

    items:
      data.items ||
      DEFAULT_DATA.items,
  };


  /* =======================================================
     LOGO PARALLAX
  ======================================================= */

  const mouseX =
    useMotionValue(
      0.5
    );

  const mouseY =
    useMotionValue(
      0.5
    );


  const smoothX =
    useSpring(
      mouseX,
      {
        stiffness:
          90,

        damping:
          26,

        mass:
          0.5,
      }
    );


  const smoothY =
    useSpring(
      mouseY,
      {
        stiffness:
          90,

        damping:
          26,

        mass:
          0.5,
      }
    );


  const rotateX =
    useTransform(
      smoothY,
      [0, 1],
      [
        "6deg",
        "-6deg",
      ]
    );


  const rotateY =
    useTransform(
      smoothX,
      [0, 1],
      [
        "-6deg",
        "6deg",
      ]
    );


  const logoX =
    useTransform(
      smoothX,
      [0, 1],
      [
        -7,
        7,
      ]
    );


  const logoY =
    useTransform(
      smoothY,
      [0, 1],
      [
        -7,
        7,
      ]
    );


  /* =======================================================
     MOUSE MOVE
  ======================================================= */

  function handleMouseMove(
    event
  ) {
    if (
      reduceMotion
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (
        event.clientX -
        rect.left
      ) /
        rect.width
    );

    mouseY.set(
      (
        event.clientY -
        rect.top
      ) /
        rect.height
    );
  }


  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }


  return (
    <section
      id="why-rapid"

      className="
        relative
        overflow-hidden

        bg-white

        px-[5%]

        py-24
        lg:py-32
      "
    >

      {/* =====================================================
          SOFT BACKGROUND LIGHTS
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -left-48
          top-20

          h-[500px]
          w-[500px]

          rounded-full

          bg-[#0062CC]/[0.035]

          blur-[130px]
        "
      />


      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -right-52
          bottom-0

          h-[520px]
          w-[520px]

          rounded-full

          bg-[#41B6FF]/[0.055]

          blur-[140px]
        "
      />


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

            lg:grid-cols-[1.15fr_.55fr]

            lg:items-end
          "
        >

          <div>

            {/* LABEL */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -24,
                    }
              }

              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }

              viewport={{
                once: true,
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
                  reduceMotion
                    ? false
                    : {
                        width: 0,
                      }
                }

                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        width: 34,
                      }
                }

                viewport={{
                  once: true,
                }}

                transition={{
                  duration:
                    0.65,

                  delay:
                    0.15,
                }}

                className="
                  h-[2px]

                  bg-gradient-to-r
                  from-[#0062CC]
                  to-[#41B6FF]
                "
              />


              <span
                className="
                  text-[.67rem]

                  font-black
                  uppercase

                  tracking-[4px]

                  text-[#0062CC]
                "
              >
                {content.label}
              </span>

            </motion.div>


            {/* HEADING */}

            <motion.h2
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 34,
                      filter:
                        "blur(7px)",
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
                amount: 0.35,
              }}

              transition={{
                duration: 0.9,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}

              className="
                max-w-[920px]

                font-barlowCond

                text-[clamp(2.8rem,5.6vw,5.6rem)]

                font-black

                uppercase

                leading-[.92]

                tracking-[.5px]

                text-[#001F5C]
              "
            >

              <HeadingParts
                parts={
                  content.headingParts
                }
              />

            </motion.h2>

          </div>


          {/* DESCRIPTION */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 22,
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
              delay: 0.15,
            }}
          >

            <p
              className="
                max-w-[540px]

                text-[.95rem]

                leading-[1.85]

                text-slate-500

                lg:ml-auto
              "
            >
              {content.description}
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

        </div>


        {/* ===================================================
            MAIN STORY AREA
        =================================================== */}

        <div
          className="
            mt-12

            grid
            grid-cols-1
            gap-8

            lg:grid-cols-[.82fr_1.18fr]

            lg:gap-10
          "
        >

          {/* =================================================
              BRAND VISUAL
          ================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    scale: 0.98,
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
              duration: 0.9,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}

            onMouseMove={
              handleMouseMove
            }

            onMouseLeave={
              handleMouseLeave
            }

            className="
              relative

              min-h-[500px]

              overflow-hidden

              rounded-[34px]

              bg-[#001F5C]

              shadow-[0_30px_80px_rgba(0,31,92,.15)]
            "

            style={{
              perspective:
                "1200px",
            }}
          >

            {/* DEEP NAVY BACKGROUND */}

            <div
              className="
                absolute
                inset-0
              "

              style={{
                background: `
                  radial-gradient(
                    circle at 30% 25%,
                    rgba(65,182,255,.18),
                    transparent 30%
                  ),

                  radial-gradient(
                    circle at 82% 78%,
                    rgba(0,132,227,.20),
                    transparent 34%
                  ),

                  linear-gradient(
                    145deg,
                    #001F5C,
                    #002A70
                  )
                `,
              }}
            />


            {/* FLOATING BLUE LIGHT */}

            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [
                        "-8%",
                        "12%",
                        "-8%",
                      ],

                      y: [
                        "0%",
                        "-8%",
                        "0%",
                      ],

                      scale: [
                        1,
                        1.1,
                        1,
                      ],
                    }
              }

              transition={{
                duration:
                  14,

                repeat:
                  Infinity,

                ease:
                  "easeInOut",
              }}

              className="
                pointer-events-none

                absolute

                left-[12%]
                top-[18%]

                h-[65%]
                w-[72%]

                rounded-full

                bg-[#0062CC]/22

                blur-[100px]
              "
            />


            {/* STORY COPY */}

            <div
              className="
                absolute
                left-7
                top-7
                z-10
              "
            >

              <div
                className="
                  text-[8px]

                  font-black
                  uppercase

                  tracking-[0.2em]

                  text-[#41B6FF]
                "
              >
                The Rapid Standard
              </div>


              <p
                className="
                  mt-2

                  max-w-[260px]

                  text-[.78rem]

                  font-medium

                  leading-6

                  text-white/55
                "
              >
                Professional care should feel consistent from the
                first handover to the final return.
              </p>

            </div>


            {/* =================================================
                LOGO
            ================================================= */}

            <div
              className="
                absolute
                inset-0

                flex
                items-center
                justify-center
              "
            >

              <motion.div
                style={{
                  rotateX,
                  rotateY,

                  transformStyle:
                    "preserve-3d",
                }}

                className="
                  relative

                  flex

                  h-[250px]
                  w-[250px]

                  items-center
                  justify-center
                "
              >

                {/* GLOW */}

                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: [
                            1,
                            1.12,
                            1,
                          ],

                          opacity: [
                            0.3,
                            0.55,
                            0.3,
                          ],
                        }
                  }

                  transition={{
                    duration:
                      6,

                    repeat:
                      Infinity,

                    ease:
                      "easeInOut",
                  }}

                  className="
                    absolute

                    inset-[-38px]

                    rounded-full

                    bg-[#41B6FF]/16

                    blur-[55px]
                  "
                />


                {/* ROTATING RING */}

                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          rotate:
                            360,
                        }
                  }

                  transition={{
                    duration:
                      26,

                    repeat:
                      Infinity,

                    ease:
                      "linear",
                  }}

                  className="
                    absolute

                    inset-[-20px]

                    rounded-full

                    border
                    border-[#41B6FF]/18
                  "
                />


                {/* LOGO GLASS */}

                <motion.div
                  style={{
                    x:
                      logoX,

                    y:
                      logoY,
                  }}

                  className="
                    relative

                    flex

                    h-[205px]
                    w-[205px]

                    items-center
                    justify-center

                    overflow-hidden

                    rounded-full

                    border
                    border-white/15

                    bg-white/[0.07]

                    shadow-[0_30px_70px_rgba(0,0,0,.30)]

                    backdrop-blur-xl
                  "
                >

                  <Image
                    src="/images/logo.jpeg"

                    alt="Rapid Laundromat"

                    width={180}
                    height={180}

                    priority

                    className="
                      relative
                      z-10

                      h-[78%]
                      w-[78%]

                      rounded-full

                      object-contain

                      shadow-[0_18px_38px_rgba(0,0,0,.28)]
                    "
                  />


                  {/* SHINE */}

                  <motion.div
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            left: [
                              "-55%",
                              "155%",
                            ],
                          }
                    }

                    transition={{
                      duration:
                        2.4,

                      repeat:
                        Infinity,

                      repeatDelay:
                        4,

                      ease:
                        "easeInOut",
                    }}

                    className="
                      pointer-events-none

                      absolute
                      top-0

                      h-full
                      w-[38%]

                      rotate-[24deg]

                      bg-gradient-to-r
                      from-transparent
                      via-white/25
                      to-transparent

                      blur-lg
                    "
                  />

                </motion.div>

              </motion.div>

            </div>


            {/* =================================================
                GOOGLE RATING
            ================================================= */}

            <motion.div
              initial={{
                opacity:
                  0,

                x:
                  20,
              }}

              whileInView={{
                opacity:
                  1,

                x:
                  0,
              }}

              viewport={{
                once:
                  true,
              }}

              transition={{
                duration:
                  0.7,

                delay:
                  0.55,
              }}

              className="
                absolute

                right-5
                top-8

                rounded-2xl

                border
                border-white/10

                bg-white

                px-4
                py-3

                shadow-[0_18px_45px_rgba(0,0,0,.16)]
              "
            >

              <div
                className="
                  text-[7px]

                  font-black
                  uppercase

                  tracking-[0.16em]

                  text-slate-400
                "
              >
                Google Rating
              </div>


              <div
                className="
                  mt-1

                  flex
                  items-center
                  gap-2
                "
              >

                <strong
                  className="
                    text-lg
                    font-black
                    text-[#001F5C]
                  "
                >
                  {
                    content.googleRating
                  }
                </strong>


                <span
                  className="
                    text-[10px]
                    tracking-[1px]
                    text-[#0084E3]
                  "
                >
                  ★★★★★
                </span>

              </div>

            </motion.div>


            {/* =================================================
                EXPERIENCE
            ================================================= */}

            <motion.div
              initial={{
                opacity:
                  0,

                x:
                  -20,
              }}

              whileInView={{
                opacity:
                  1,

                x:
                  0,
              }}

              viewport={{
                once:
                  true,
              }}

              transition={{
                duration:
                  0.7,

                delay:
                  0.7,
              }}

              className="
                absolute

                bottom-7
                left-5

                rounded-2xl

                border
                border-white/10

                bg-white

                px-4
                py-3

                shadow-[0_18px_45px_rgba(0,0,0,.16)]
              "
            >

              <div
                className="
                  text-[7px]

                  font-black
                  uppercase

                  tracking-[0.16em]

                  text-slate-400
                "
              >
                Experience
              </div>


              <strong
                className="
                  mt-1
                  block

                  text-lg
                  font-black

                  text-[#001F5C]
                "
              >
                {
                  content.experience
                }
              </strong>

            </motion.div>


            {/* =================================================
                BRANCHES
            ================================================= */}

            <motion.div
              initial={{
                opacity:
                  0,

                y:
                  16,
              }}

              whileInView={{
                opacity:
                  1,

                y:
                  0,
              }}

              viewport={{
                once:
                  true,
              }}

              transition={{
                duration:
                  0.7,

                delay:
                  0.82,
              }}

              className="
                absolute

                bottom-7
                right-5

                flex
                items-center
                gap-2

                rounded-full

                border
                border-white/10

                bg-[#002A70]/90

                px-4
                py-2

                text-[8px]

                font-black
                uppercase

                tracking-[0.12em]

                text-white

                shadow-xl

                backdrop-blur-xl
              "
            >

              <span
                className="
                  h-2
                  w-2

                  animate-pulse

                  rounded-full

                  bg-[#41B6FF]

                  shadow-[0_0_10px_#41B6FF]
                "
              />

              {
                content.branches
              }

            </motion.div>

          </motion.div>


          {/* =================================================
              10 COMPACT REASONS WITH EMOJI ICONS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-3

              sm:grid-cols-2
            "
          >

            {content.items.map(
              (
                item,
                index
              ) => (

                <WhyItem
                  key={
                    item?._id ||
                    item?.title ||
                    index
                  }

                  item={
                    item
                  }

                  index={
                    index
                  }

                  reduceMotion={
                    reduceMotion
                  }
                />

              )
            )}

          </div>

        </div>


        {/* ===================================================
            FINAL STORY MESSAGE
        =================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity:
                    0,

                  y:
                    22,
                }
          }

          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity:
                    1,

                  y:
                    0,
                }
          }

          viewport={{
            once:
              true,

            amount:
              0.4,
          }}

          transition={{
            duration:
              0.8,
          }}

          className="
            mt-10

            grid
            gap-5

            border-t
            border-[#001F5C]/[0.07]

            pt-8

            md:grid-cols-[auto_1fr]

            md:items-center
          "
        >

          <div
            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-2xl

              bg-[#EEF6FF]

              text-[#0062CC]
            "
          >

            <Sparkles
              size={
                18
              }
            />

          </div>


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
              More than clean
            </div>


            <p
              className="
                mt-2

                max-w-[900px]

                text-[clamp(1.1rem,2vw,1.5rem)]

                font-black

                leading-[1.35]

                tracking-[-0.035em]

                text-[#001F5C]
              "
            >
              The difference is not one machine or one process.
              It is the attention given to every step in between.
            </p>

          </div>

        </motion.div>

      </div>

    </section>
  );
}