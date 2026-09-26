"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Award,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Gauge,
  Shirt,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";


/* =========================================================
   GOOGLE BRAND COLORS
========================================================= */

const GOOGLE_BLUE =
  "#4285F4";

const GOOGLE_RED =
  "#EA4335";

const GOOGLE_YELLOW =
  "#FBBC05";

const GOOGLE_GREEN =
  "#34A853";


/* =========================================================
   TYPE → ICON
========================================================= */

const TYPE_ICONS = {
  garments:
    Shirt,

  customers:
    UsersRound,

  commercial:
    BriefcaseBusiness,

  delivery:
    Clock3,

  rating:
    Star,

  branches:
    Building2,

  experience:
    Award,

  quality:
    Gauge,

  custom:
    Sparkles,
};


/* =========================================================
   GOOGLE G ICON
========================================================= */

function GoogleGIcon({
  size = 20,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill={GOOGLE_BLUE}
        d="
          M23.49 12.27
          c0-.79-.07-1.55-.2-2.27
          H12v4.3h6.45
          a5.52 5.52 0 0 1-2.39 3.62
          v3.01h3.87
          c2.27-2.09 3.56-5.17 3.56-8.66z
        "
      />

      <path
        fill={GOOGLE_GREEN}
        d="
          M12 24
          c3.24 0 5.96-1.07 7.95-2.9
          l-3.87-3.01
          c-1.07.72-2.44 1.15-4.08 1.15
          -3.13 0-5.78-2.11-6.73-4.95
          H1.28v3.11
          A12 12 0 0 0 12 24z
        "
      />

      <path
        fill={GOOGLE_YELLOW}
        d="
          M5.27 14.29
          A7.2 7.2 0 0 1 4.9 12
          c0-.8.14-1.57.37-2.29
          V6.6H1.28
          A12 12 0 0 0 0 12
          c0 1.94.46 3.78 1.28 5.4
          l3.99-3.11z
        "
      />

      <path
        fill={GOOGLE_RED}
        d="
          M12 4.77
          c1.76 0 3.34.6 4.58 1.78
          l3.44-3.44
          C17.95 1.18 15.24 0 12 0
          A12 12 0 0 0 1.28 6.6
          l3.99 3.11
          C6.22 6.88 8.87 4.77 12 4.77z
        "
      />
    </svg>
  );
}


/* =========================================================
   NORMALIZE
========================================================= */

function normalizeStat(
  stat,
  index
) {
  const type =
    stat.type ||
    "custom";


  return {
    ...stat,

    id:
      stat.id ||
      stat._id ||
      `stat-${index}`,

    type,

    label:
      stat.label ||
      "",

    value:
      String(
        stat.value ??
        ""
      ),

    prefix:
      stat.prefix ||
      "",

    suffix:
      stat.suffix ||
      "",

    /*
     * Google ratings should remain static.
     */
    animated:
      type === "rating"
        ? false
        : stat.animated !==
          false,

    order:
      Number(
        stat.order ||
        0
      ),
  };
}


/* =========================================================
   COUNTER
========================================================= */

function Counter({
  target,
  prefix = "",
  suffix = "",
  start = false,
  animated = true,
}) {
  const shouldReduceMotion =
    useReducedMotion();


  const originalValue =
    String(
      target ??
      ""
    );


  const numericTarget =
    Number(
      originalValue
    );


  const validNumber =
    Number.isFinite(
      numericTarget
    );


  const [
    value,
    setValue,
  ] =
    useState(
      animated &&
      validNumber
        ? 0
        : numericTarget
    );


  /* =======================================================
     RESET / STATIC UPDATE
  ======================================================= */

  useEffect(() => {
    if (
      !animated ||
      !validNumber
    ) {
      setValue(
        numericTarget
      );

      return;
    }


    if (!start) {
      setValue(
        0
      );
    }
  }, [
    numericTarget,
    animated,
    validNumber,
    start,
  ]);


  /* =======================================================
     ANIMATION
  ======================================================= */

  useEffect(() => {
    if (
      !animated ||
      !start ||
      !validNumber
    ) {
      return;
    }


    if (
      shouldReduceMotion
    ) {
      setValue(
        numericTarget
      );

      return;
    }


    const duration =
      2400;


    const startTime =
      performance.now();


    let animationFrame;


    const animate = (
      currentTime
    ) => {
      const elapsed =
        currentTime -
        startTime;


      const progress =
        Math.min(
          elapsed /
            duration,
          1
        );


      const easedProgress =
        1 -
        Math.pow(
          1 -
            progress,
          4
        );


      const currentValue =
        numericTarget *
        easedProgress;


      setValue(
        currentValue
      );


      if (
        progress <
        1
      ) {
        animationFrame =
          requestAnimationFrame(
            animate
          );
      }
    };


    animationFrame =
      requestAnimationFrame(
        animate
      );


    return () => {
      if (
        animationFrame
      ) {
        cancelAnimationFrame(
          animationFrame
        );
      }
    };
  }, [
    start,
    numericTarget,
    animated,
    validNumber,
    shouldReduceMotion,
  ]);


  /* =======================================================
     STATIC / TEXT VALUE
  ======================================================= */

  if (
    !animated ||
    !validNumber
  ) {
    return (
      <span
        className="
          inline-block
        "
      >
        {prefix}
        {originalValue}
        {suffix}
      </span>
    );
  }


  /* =======================================================
     DECIMAL HANDLING
  ======================================================= */

  const decimalPart =
    originalValue.split(
      "."
    )[1];


  const decimalPlaces =
    decimalPart
      ? decimalPart.length
      : 0;


  const display =
    value.toLocaleString(
      "en-US",
      {
        minimumFractionDigits:
          decimalPlaces,

        maximumFractionDigits:
          decimalPlaces,
      }
    );


  return (
    <span
      className="
        inline-block

        tabular-nums

        tracking-tight
      "
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}


/* =========================================================
   GOOGLE RATING VALUE
========================================================= */

function GoogleRatingValue({
  stat,
}) {
  const rating =
    Number(
      stat.value ||
      0
    );


  const safeRating =
    Number.isFinite(
      rating
    )
      ? Math.max(
          0,
          Math.min(
            5,
            rating
          )
        )
      : 0;


  return (
    <div
      className="
        flex
        flex-col

        items-center
        justify-center
      "
    >

      {/* MAIN RATING */}

      <div
        className="
          flex

          items-center
          justify-center

          gap-2
        "
      >

        <span
          className="
            font-barlowCond

            text-[clamp(1.8rem,3vw,2.75rem)]

            font-black

            leading-none

            tracking-[-0.045em]

            text-[#202124]
          "
        >
          {stat.prefix}
          {stat.value}
        </span>


        <Star
          size={25}

          fill={
            GOOGLE_YELLOW
          }

          stroke={
            GOOGLE_YELLOW
          }

          strokeWidth={1.5}
        />

      </div>


      {/* FIVE STARS */}

      <div
        className="
          mt-2

          flex

          items-center
          justify-center

          gap-[2px]
        "
      >
        {[1, 2, 3, 4, 5].map(
          (
            star
          ) => (
            <Star
              key={
                star
              }

              size={10}

              fill={
                star <=
                Math.round(
                  safeRating
                )
                  ? GOOGLE_YELLOW
                  : "transparent"
              }

              stroke={
                star <=
                Math.round(
                  safeRating
                )
                  ? GOOGLE_YELLOW
                  : "#DADCE0"
              }

              strokeWidth={1.5}
            />
          )
        )}
      </div>

    </div>
  );
}


/* =========================================================
   TRUST / VALUE STRIP
========================================================= */

export default function TrustStrip({
  data = {},
  items: directItems,
}) {
  const [
    start,
    setStart,
  ] =
    useState(false);


  const stripRef =
    useRef(
      null
    );


  const shouldReduceMotion =
    useReducedMotion();


  /* =======================================================
     DATABASE ITEMS
  ======================================================= */

  const sourceItems =
    Array.isArray(
      directItems
    )
      ? directItems
      : Array.isArray(
          data.items
        )
        ? data.items
        : [];


  const items =
    sourceItems
      .map(
        normalizeStat
      )
      .filter(
        (
          stat
        ) =>
          stat.label &&
          stat.value !==
            ""
      )
      .sort(
        (
          a,
          b
        ) =>
          a.order -
          b.order
      );


  /* =======================================================
     START ANIMATION WHEN SECTION IS VISIBLE
  ======================================================= */

  useEffect(() => {
    const element =
      stripRef.current;


    if (
      !element
    ) {
      return;
    }


    if (
      shouldReduceMotion
    ) {
      setStart(
        true
      );

      return;
    }


    const observer =
      new IntersectionObserver(
        (
          [entry]
        ) => {
          if (
            entry.isIntersecting
          ) {
            setStart(
              true
            );

            observer.disconnect();
          }
        },
        {
          threshold:
            0.2,

          rootMargin:
            "0px 0px -10% 0px",
        }
      );


    observer.observe(
      element
    );


    return () => {
      observer.disconnect();
    };
  }, [
    shouldReduceMotion,
  ]);


  /* =======================================================
     NO ITEMS
  ======================================================= */

  if (
    items.length ===
    0
  ) {
    return null;
  }


  return (
    <section
      id="trust"

      ref={
        stripRef
      }

      className="
        relative
        z-20

        overflow-hidden

        border-b
        border-[#001F5C]/[0.06]

        bg-white
      "
    >

      {/* =====================================================
          TOP BRAND LINE
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          absolute

          inset-x-0
          top-0

          h-px

          bg-gradient-to-r

          from-transparent
          via-[#41B6FF]/50
          to-transparent
        "
      />


      {/* =====================================================
          AMBIENT GLOW
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute

          left-1/2
          top-0

          h-32
          w-[70%]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[#41B6FF]/[0.08]

          blur-[70px]
        "
      />


      {/* =====================================================
          CENTERED VALUES
      ===================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto

          flex

          w-full
          max-w-[1500px]

          flex-wrap
          justify-center

          px-5

          sm:px-8
          lg:px-10
        "
      >

        {items.map(
          (
            stat,
            index
          ) => {
            const isRating =
              stat.type ===
              "rating";


            const isAnimated =
              isRating
                ? false
                : stat.animated !==
                  false;


            const Icon =
              TYPE_ICONS[
                stat.type
              ] ||
              Sparkles;


            return (
              <motion.div
                key={
                  stat.id
                }

                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity:
                          0,

                        y:
                          26,

                        filter:
                          "blur(4px)",
                      }
                }

                animate={
                  start
                    ? {
                        opacity:
                          1,

                        y:
                          0,

                        filter:
                          "blur(0px)",
                      }
                    : undefined
                }

                transition={{
                  duration:
                    0.85,

                  delay:
                    index *
                    0.1,

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

                  flex

                  min-h-[132px]

                  w-1/2

                  flex-col

                  items-center
                  justify-center

                  px-4
                  py-7

                  text-center

                  sm:px-6

                  md:min-h-[145px]

                  lg:w-1/3

                  xl:w-1/6
                "
              >

                {/* =================================================
                    RESPONSIVE DIVIDERS
                ================================================= */}

                {index %
                  2 !==
                  0 && (
                  <div
                    aria-hidden="true"

                    className="
                      pointer-events-none

                      absolute

                      bottom-[18%]
                      left-0
                      top-[18%]

                      w-px

                      bg-[#001F5C]/[0.07]

                      lg:hidden
                    "
                  />
                )}


                {index %
                  3 !==
                  0 && (
                  <div
                    aria-hidden="true"

                    className="
                      pointer-events-none

                      absolute

                      bottom-[18%]
                      left-0
                      top-[18%]

                      hidden

                      w-px

                      bg-[#001F5C]/[0.07]

                      lg:block
                      xl:hidden
                    "
                  />
                )}


                {index >
                  0 && (
                  <div
                    aria-hidden="true"

                    className="
                      pointer-events-none

                      absolute

                      bottom-[18%]
                      left-0
                      top-[18%]

                      hidden

                      w-px

                      bg-[#001F5C]/[0.07]

                      xl:block
                    "
                  />
                )}


                {/* =================================================
                    MOBILE ROW BORDER
                ================================================= */}

                <div
                  aria-hidden="true"

                  className={`
                    pointer-events-none

                    absolute

                    inset-x-3
                    bottom-0

                    h-px

                    bg-[#001F5C]/[0.07]

                    ${
                      index <
                      items.length -
                        2
                        ? "block"
                        : "hidden"
                    }

                    lg:hidden
                  `}
                />


                {/* =================================================
                    NORMAL HOVER BACKGROUND
                ================================================= */}

                {!isRating && (
                  <div
                    aria-hidden="true"

                    className="
                      pointer-events-none

                      absolute
                      inset-3

                      rounded-[22px]

                      bg-gradient-to-br

                      from-[#0062CC]/0
                      via-[#0084E3]/0
                      to-[#41B6FF]/0

                      opacity-0

                      transition-all
                      duration-500

                      group-hover:
                      from-[#0062CC]/[0.035]

                      group-hover:
                      via-[#0084E3]/[0.025]

                      group-hover:
                      to-[#41B6FF]/[0.04]

                      group-hover:
                      opacity-100
                    "
                  />
                )}


                {/* =================================================
                    GOOGLE RATING BACKGROUND
                ================================================= */}

                {isRating && (
                  <div
                    aria-hidden="true"

                    className="
                      pointer-events-none

                      absolute
                      inset-3

                      rounded-[22px]

                      border
                      border-[#FBBC05]/0

                      bg-gradient-to-br

                      from-[#FFFDF7]/0
                      via-[#FFF9E8]/0
                      to-[#FFF4CC]/0

                      opacity-0

                      transition-all
                      duration-500

                      group-hover:
                      border-[#FBBC05]/20

                      group-hover:
                      from-[#FFFDF7]

                      group-hover:
                      via-[#FFF9E8]

                      group-hover:
                      to-[#FFF4CC]/60

                      group-hover:
                      opacity-100

                      group-hover:
                      shadow-[0_12px_35px_rgba(251,188,5,.08)]
                    "
                  />
                )}


                {/* =================================================
                    ICON
                ================================================= */}

                {isRating ? (

                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y:
                              -2,

                            scale:
                              1.08,
                          }
                    }

                    transition={{
                      type:
                        "spring",

                      stiffness:
                        220,

                      damping:
                        18,
                    }}

                    className="
                      relative
                      z-10

                      mb-3

                      flex

                      h-9
                      w-9

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#DADCE0]

                      bg-white

                      shadow-[0_4px_14px_rgba(60,64,67,.07)]

                      transition-all
                      duration-300

                      group-hover:
                      border-[#FBBC05]/35

                      group-hover:
                      shadow-[0_7px_20px_rgba(251,188,5,.12)]
                    "
                  >
                    <GoogleGIcon
                      size={18}
                    />
                  </motion.div>

                ) : (

                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y:
                              -2,

                            scale:
                              1.06,
                          }
                    }

                    transition={{
                      type:
                        "spring",

                      stiffness:
                        220,

                      damping:
                        18,
                    }}

                    className="
                      relative
                      z-10

                      mb-3

                      flex

                      h-8
                      w-8

                      items-center
                      justify-center

                      rounded-full

                      bg-[#EEF6FF]

                      text-[#0062CC]

                      transition-all
                      duration-300

                      group-hover:
                      bg-[#0062CC]

                      group-hover:
                      text-white
                    "
                  >
                    <Icon
                      size={14}

                      strokeWidth={2.3}
                    />
                  </motion.div>

                )}


                {/* =================================================
                    VALUE
                ================================================= */}

                {isRating ? (

                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y:
                              -2,

                            scale:
                              1.045,
                          }
                    }

                    transition={{
                      type:
                        "spring",

                      stiffness:
                        220,

                      damping:
                        18,
                    }}

                    className="
                      relative
                      z-10
                    "
                  >
                    <GoogleRatingValue
                      stat={
                        stat
                      }
                    />
                  </motion.div>

                ) : (

                  <motion.div
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y:
                              -2,

                            scale:
                              1.045,
                          }
                    }

                    transition={{
                      type:
                        "spring",

                      stiffness:
                        220,

                      damping:
                        18,
                    }}

                    className="
                      relative
                      z-10

                      bg-gradient-to-r

                      from-[#001F5C]
                      via-[#0062CC]
                      to-[#0084E3]

                      bg-clip-text

                      font-barlowCond

                      text-[clamp(1.8rem,3vw,2.75rem)]

                      font-black

                      leading-none

                      tracking-[-0.045em]

                      text-transparent
                    "
                  >
                    <Counter
                      target={
                        stat.value
                      }

                      prefix={
                        stat.prefix
                      }

                      suffix={
                        stat.suffix
                      }

                      start={
                        start
                      }

                      animated={
                        isAnimated
                      }
                    />
                  </motion.div>

                )}


                {/* =================================================
                    LABEL
                ================================================= */}

                <div
                  className={`
                    relative
                    z-10

                    mt-3

                    text-[8px]

                    font-black
                    uppercase

                    tracking-[0.17em]

                    transition-colors
                    duration-300

                    ${
                      isRating
                        ? `
                          text-[#5F6368]

                          group-hover:
                          text-[#B47C00]
                        `
                        : `
                          text-slate-400

                          group-hover:
                          text-[#0062CC]
                        `
                    }
                  `}
                >
                  {
                    stat.label
                  }
                </div>


                {/* =================================================
                    GOOGLE SMALL LABEL
                ================================================= */}

                {isRating && (
                  <div
                    className="
                      relative
                      z-10

                      mt-1.5

                      flex
                      items-center
                      justify-center

                      gap-1.5

                      text-[7px]

                      font-bold

                      tracking-[0.04em]

                      text-[#9AA0A6]
                    "
                  >
                    <GoogleGIcon
                      size={9}
                    />

                    Google Rating
                  </div>
                )}


                {/* =================================================
                    BOTTOM HOVER ACCENT
                ================================================= */}

                {isRating ? (

                  <div
                    aria-hidden="true"

                    className="
                      absolute

                      bottom-0
                      left-1/2

                      grid

                      h-[2px]
                      w-0

                      -translate-x-1/2

                      grid-cols-4

                      overflow-hidden

                      rounded-full

                      transition-all
                      duration-500

                      group-hover:
                      w-[54%]
                    "
                  >
                    <span className="bg-[#4285F4]" />
                    <span className="bg-[#EA4335]" />
                    <span className="bg-[#FBBC05]" />
                    <span className="bg-[#34A853]" />
                  </div>

                ) : (

                  <div
                    aria-hidden="true"

                    className="
                      absolute

                      bottom-0
                      left-1/2

                      h-[2px]
                      w-0

                      -translate-x-1/2

                      rounded-full

                      bg-gradient-to-r

                      from-[#0062CC]
                      via-[#0084E3]
                      to-[#41B6FF]

                      transition-all
                      duration-500

                      group-hover:
                      w-[54%]
                    "
                  />

                )}

              </motion.div>
            );
          }
        )}

      </div>

    </section>
  );
}