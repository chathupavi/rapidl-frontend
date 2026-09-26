"use client";

import {
  CheckCircle2,
  ClipboardCheck,
  PackageCheck,
  Shirt,
  Sparkles,
  Truck,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";


/* =========================================================
   DEFAULT PROCESS DATA
========================================================= */

const DEFAULT_DATA = {
  label:
    "How Rapid Works",

  heading:
    "From handover to fresh return.",

  headingHighlight:
    "Care in every step.",

  description:
    "Every order follows a clear care journey — receiving, inspection, professional treatment, finishing and return.",

  steps: [
    {
      _id:
        "process-01",

      number:
        "01",

      icon:
        "receive",

      title:
        "Receive & Identify",

      label:
        "Order Intake",

      description:
        "Your garments are received, identified and prepared for the correct service path.",

      points: [
        "Garment receiving",
        "Order identification",
        "Service confirmation",
      ],
    },

    {
      _id:
        "process-02",

      number:
        "02",

      icon:
        "inspect",

      title:
        "Inspect & Sort",

      label:
        "Care Assessment",

      description:
        "Items are checked and separated based on fabric, color, condition and cleaning requirements.",

      points: [
        "Fabric assessment",
        "Color separation",
        "Stain identification",
      ],
    },

    {
      _id:
        "process-03",

      number:
        "03",

      icon:
        "care",

      title:
        "Clean with Care",

      label:
        "Professional Treatment",

      description:
        "Each item follows the selected washing, dry-cleaning or specialist treatment process.",

      points: [
        "Professional cleaning",
        "Fabric-safe treatment",
        "Controlled processing",
      ],
    },

    {
      _id:
        "process-04",

      number:
        "04",

      icon:
        "finish",

      title:
        "Finish & Quality Check",

      label:
        "Final Detail",

      description:
        "Garments are dried, pressed, finished and checked before they leave our care.",

      points: [
        "Steam finishing",
        "Final inspection",
        "Neat packing",
      ],
    },

    {
      _id:
        "process-05",

      number:
        "05",

      icon:
        "return",

      title:
        "Ready for Return",

      label:
        "Pickup or Delivery",

      description:
        "Your completed order is prepared for collection or coordinated doorstep delivery.",

      points: [
        "Order preparation",
        "Customer notification",
        "Pickup or delivery",
      ],
    },
  ],
};


/* =========================================================
   ICON MAP
========================================================= */

const iconMap = {
  receive:
    PackageCheck,

  inspect:
    ClipboardCheck,

  care:
    Shirt,

  finish:
    Sparkles,

  return:
    Truck,
};


/* =========================================================
   PROCESS STEP
========================================================= */

function ProcessStep({
  step,
  index,
  total,
  reduceMotion,
}) {
  const Icon =
    iconMap[
      step.icon
    ] ||
    CheckCircle2;


  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 34,
              filter:
                "blur(5px)",
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
          0.82,

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
      "
    >

      {/* =====================================================
          DESKTOP CONNECTOR
      ===================================================== */}

      {index <
        total -
          1 && (

        <div
          aria-hidden="true"
          className="
            absolute
            left-[calc(50%+37px)]
            top-[37px]
            hidden
            h-px
            w-[calc(100%-74px)]
            overflow-hidden
            lg:block
          "
        >

          <div
            className="
              absolute
              inset-0
              bg-[#0062CC]/12
            "
          />


          <motion.div
            initial={{
              x:
                "-100%",
            }}

            whileInView={{
              x:
                "100%",
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration:
                1.5,

              delay:
                0.45 +
                index *
                  0.12,

              ease:
                "easeInOut",
            }}

            className="
              absolute
              inset-y-0
              w-1/2

              bg-gradient-to-r
              from-transparent
              via-[#41B6FF]
              to-transparent
            "
          />

        </div>

      )}


      {/* =====================================================
          ICON NODE
      ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          justify-start
          lg:justify-center
        "
      >

        <motion.div
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale:
                    1.08,

                  y:
                    -4,

                  rotate:
                    -3,
                }
          }

          transition={{
            type:
              "spring",

            stiffness:
              240,

            damping:
              17,
          }}

          className="
            relative
            flex

            h-[74px]
            w-[74px]

            items-center
            justify-center

            rounded-[24px]

            border
            border-[#0062CC]/12

            bg-white

            text-[#0062CC]

            shadow-[0_16px_40px_rgba(0,98,204,.11)]

            transition-all
            duration-500

            group-hover:
            border-[#41B6FF]/35

            group-hover:
            shadow-[0_24px_50px_rgba(0,132,227,.17)]
          "
        >

          {/* soft glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[-16px]

              rounded-[30px]

              bg-[#41B6FF]/0

              blur-[30px]

              transition-all
              duration-500

              group-hover:
              bg-[#41B6FF]/14
            "
          />


          <Icon
            size={26}
            strokeWidth={1.8}
            className="relative z-10"
          />


          {/* NUMBER */}

          <span
            className="
              absolute
              -right-2
              -top-2

              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-full

              bg-gradient-to-br
              from-[#0062CC]
              to-[#0084E3]

              text-[8px]
              font-black
              text-white

              shadow-[0_5px_15px_rgba(0,98,204,.28)]
            "
          >
            {
              step.number ||
              String(
                index +
                  1
              ).padStart(
                2,
                "0"
              )
            }
          </span>

        </motion.div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          mt-7
          lg:text-center
        "
      >

        {/* STEP LABEL */}

        <div
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[0.16em]
            text-[#0084E3]
          "
        >
          {
            step.label
          }
        </div>


        {/* TITLE */}

        <h3
          className="
            mt-2

            text-[1.35rem]

            font-black

            leading-[1.15]

            tracking-[-0.03em]

            text-[#001F5C]
          "
        >
          {
            step.title
          }
        </h3>


        {/* DESCRIPTION */}

        <p
          className="
            mt-3

            text-[.9rem]

            leading-[1.75]

            text-slate-600
          "
        >
          {
            step.description
          }
        </p>


        {/* ===================================================
            MICRO POINTS
        =================================================== */}

        {step.points?.length >
          0 && (

          <div
            className="
              mt-5
              space-y-2.5
            "
          >

            {step.points.map(
              (
                point
              ) => (

                <div
                  key={
                    point
                  }

                  className="
                    flex
                    items-center
                    gap-2.5

                    text-[.78rem]

                    font-semibold

                    text-[#001F5C]/60

                    lg:
                    justify-center
                  "
                >

                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0

                      rounded-full

                      bg-[#41B6FF]
                    "
                  />

                  {
                    point
                  }

                </div>

              )
            )}

          </div>

        )}

      </div>

    </motion.article>
  );
}


/* =========================================================
   PROCESS SECTION
========================================================= */

export default function Process({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  const content = {
    ...DEFAULT_DATA,
    ...data,

    steps:
      data.steps ||
      data.items ||
      DEFAULT_DATA.steps,
  };


  return (
    <section
      id="process"

      className="
        relative
        overflow-hidden

        bg-[#F4F9FF]

        px-[5%]

        py-24
        lg:py-32
      "
    >

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -left-52
          top-[10%]

          h-[520px]
          w-[520px]

          rounded-full

          bg-[#41B6FF]/[0.09]

          blur-[150px]
        "
      />


      <div
        aria-hidden="true"

        className="
          pointer-events-none
          absolute
          -right-52
          bottom-0

          h-[560px]
          w-[560px]

          rounded-full

          bg-[#0062CC]/[0.055]

          blur-[160px]
        "
      />


      {/* =====================================================
          FLOATING WATER ORBS
      ===================================================== */}

      <motion.div
        aria-hidden="true"

        animate={
          reduceMotion
            ? undefined
            : {
                y: [
                  0,
                  -14,
                  0,
                ],

                x: [
                  0,
                  8,
                  0,
                ],
              }
        }

        transition={{
          duration:
            7,

          repeat:
            Infinity,

          ease:
            "easeInOut",
        }}

        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[20%]

          h-3
          w-3

          rounded-full

          border
          border-[#41B6FF]/30

          bg-white/40

          shadow-[0_6px_18px_rgba(65,182,255,.15)]

          backdrop-blur-sm
        "
      />


      <motion.div
        aria-hidden="true"

        animate={
          reduceMotion
            ? undefined
            : {
                y: [
                  0,
                  18,
                  0,
                ],

                x: [
                  0,
                  -6,
                  0,
                ],
              }
        }

        transition={{
          duration:
            9,

          repeat:
            Infinity,

          ease:
            "easeInOut",

          delay:
            1.5,
        }}

        className="
          pointer-events-none
          absolute
          right-[10%]
          top-[32%]

          h-5
          w-5

          rounded-full

          border
          border-[#0084E3]/20

          bg-[#41B6FF]/10

          backdrop-blur-sm
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
            mx-auto

            max-w-[1000px]

            text-center
          "
        >

          {/* LABEL */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,

                    y:
                      12,
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
            }}

            transition={{
              duration:
                0.65,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}

            className="
              inline-flex
              items-center
              gap-3
            "
          >

            <span
              className="
                h-px
                w-8

                bg-gradient-to-r
                from-transparent
                to-[#0062CC]
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
              {
                content.label
              }
            </span>

            <span
              className="
                h-px
                w-8

                bg-gradient-to-r
                from-[#0062CC]
                to-transparent
              "
            />

          </motion.div>


          {/* HEADING */}

          <motion.h2
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,

                    y:
                      30,

                    filter:
                      "blur(7px)",
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

                    filter:
                      "blur(0px)",
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
                0.9,

              delay:
                0.08,

              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}

            className="
              mt-5

              font-barlowCond

              text-[clamp(2.9rem,5.5vw,5.6rem)]

              font-black

              uppercase

              leading-[.92]

              tracking-[.5px]

              text-[#001F5C]
            "
          >
            {
              content.heading
            }

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
              {
                content.headingHighlight
              }
            </span>

          </motion.h2>


          {/* DESCRIPTION */}

          <motion.p
            initial={
              reduceMotion
                ? false
                : {
                    opacity:
                      0,

                    y:
                      18,
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
            }}

            transition={{
              duration:
                0.8,

              delay:
                0.18,
            }}

            className="
              mx-auto
              mt-6

              max-w-[760px]

              text-[1rem]
              md:text-[1.05rem]

              leading-[1.85]

              text-slate-600
            "
          >
            {
              content.description
            }
          </motion.p>

        </div>


        {/* ===================================================
            PROCESS JOURNEY
        =================================================== */}

        <div
          className="
            relative
            mt-16

            grid
            grid-cols-1

            gap-10

            sm:grid-cols-2

            lg:grid-cols-5
            lg:gap-7
          "
        >

          {content.steps.map(
            (
              step,
              index
            ) => (

              <ProcessStep
                key={
                  step._id ||
                  step.title ||
                  index
                }

                step={
                  step
                }

                index={
                  index
                }

                total={
                  content.steps.length
                }

                reduceMotion={
                  reduceMotion
                }
              />

            )
          )}

        </div>


        {/* ===================================================
            FINAL PROCESS STATEMENT
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
            mt-16

            overflow-hidden

            rounded-[30px]

            border
            border-[#0062CC]/[0.08]

            bg-white/75

            p-1

            shadow-[0_20px_60px_rgba(0,98,204,.05)]

            backdrop-blur-xl
          "
        >

          <div
            className="
              relative
              overflow-hidden

              rounded-[26px]

              px-7
              py-7
            "
          >

            {/* BACKGROUND GLOW */}

            <div
              aria-hidden="true"

              className="
                pointer-events-none
                absolute
                -right-20
                -top-24

                h-56
                w-56

                rounded-full

                bg-[#41B6FF]/12

                blur-[80px]
              "
            />


            <div
              className="
                relative
                z-10

                flex
                flex-col

                gap-5

                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0

                    items-center
                    justify-center

                    rounded-2xl

                    bg-[#EEF6FF]

                    text-[#0062CC]
                  "
                >
                  <CheckCircle2
                    size={20}
                  />
                </div>


                <div>

                  <div
                    className="
                      text-[10px]

                      font-black
                      uppercase

                      tracking-[0.16em]

                      text-[#0084E3]
                    "
                  >
                    The Rapid Care Journey
                  </div>


                  <div
                    className="
                      mt-1

                      text-[clamp(1.15rem,2vw,1.5rem)]

                      font-black

                      tracking-[-0.03em]

                      text-[#001F5C]
                    "
                  >
                    A clear process. Consistent attention. A better finish.
                  </div>

                </div>

              </div>


              {/* CTA */}

              <a
                href="#booking"

                className="
                  group

                  inline-flex
                  h-12
                  shrink-0

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

                  tracking-[0.12em]

                  text-white

                  shadow-[0_10px_28px_rgba(0,98,204,.20)]

                  transition-all
                  duration-300

                  hover:
                  -translate-y-1

                  hover:
                  shadow-[0_15px_38px_rgba(0,132,227,.28)]
                "
              >
                Start an Order


                <span
                  className="
                    text-sm

                    transition-transform
                    duration-300

                    group-hover:
                    translate-x-1
                  "
                >
                  →
                </span>

              </a>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}