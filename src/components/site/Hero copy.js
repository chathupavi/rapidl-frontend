"use client";

import Image from "next/image";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";


/* ============================================================
   RAPID BRAND COLORS

   Deep Navy   #001F5C
   Royal Blue  #0062CC
   Vivid Blue  #0084E3
   Sky Blue    #41B6FF
   White       #FFFFFF
============================================================ */


/* ============================================================
   ADVANCED TEXT REVEAL
============================================================ */

function AdvancedTextReveal({
  text,
  highlight,
}) {
  if (!text) return null;


  const words =
    text.split(" ");


  const cleanWord = (
    word
  ) =>
    word
      .toLowerCase()
      .replace(
        /[^\p{L}\p{N}'-]/gu,
        ""
      );


  const highlightWords =
    highlight
      ? highlight
          .trim()
          .split(/\s+/)
          .map(cleanWord)
      : [];


  let highlightStart =
    -1;


  if (
    highlightWords.length >
    0
  ) {
    for (
      let i = 0;
      i <=
      words.length -
        highlightWords.length;
      i++
    ) {
      const matches =
        highlightWords.every(
          (
            highlightWord,
            index
          ) =>
            cleanWord(
              words[
                i + index
              ]
            ) ===
            highlightWord
        );


      if (matches) {
        highlightStart =
          i;

        break;
      }
    }
  }


  const variants = {
    hidden: {
      opacity: 0,
      y: 22,
      rotateX: -14,
      filter:
        "blur(4px)",
    },

    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter:
        "blur(0px)",

      transition: {
        type:
          "spring",

        stiffness:
          115,

        damping:
          16,

        mass:
          0.6,
      },
    },
  };


  return (
    <motion.span
      className="
        flex
        flex-wrap
        justify-center
      "

      variants={{
        hidden: {},

        visible: {
          transition: {
            staggerChildren:
              0.028,

            delayChildren:
              0.16,
          },
        },
      }}

      initial="hidden"
      animate="visible"

      style={{
        perspective:
          "1000px",
      }}
    >

      {words.map(
        (
          word,
          wordIndex
        ) => {
          const highlighted =
            highlightStart !==
              -1 &&
            wordIndex >=
              highlightStart &&
            wordIndex <
              highlightStart +
                highlightWords.length;


          return (
            <span
              key={`${word}-${wordIndex}`}
              className="
                inline-block
                whitespace-nowrap
              "
            >

              {word
                .split("")
                .map(
                  (
                    char,
                    charIndex
                  ) => (

                    <motion.span
                      key={`${word}-${charIndex}`}

                      variants={
                        variants
                      }

                      className={`
                        inline-block

                        ${
                          highlighted
                            ? `
                              bg-gradient-to-r

                              from-[#41B6FF]
                              via-[#0084E3]
                              to-white

                              bg-clip-text
                              text-transparent
                            `
                            : "text-white"
                        }
                      `}

                      style={
                        highlighted
                          ? {
                              backgroundSize:
                                "220% 220%",

                              animation:
                                "rapidHeroGradient 12s ease-in-out infinite",
                            }
                          : undefined
                      }
                    >
                      {char}
                    </motion.span>

                  )
                )}


              {wordIndex <
                words.length -
                  1 && (

                <span
                  aria-hidden="true"

                  className="
                    inline-block
                    w-[0.23em]
                  "
                >
                  &nbsp;
                </span>

              )}

            </span>
          );
        }
      )}

    </motion.span>
  );
}


/* ============================================================
   MAGNETIC BUTTON
============================================================ */

function MagneticButton({
  children,
  className = "",
  href = "#",
  onClick,
}) {
  const ref =
    useRef(null);


  const reduceMotion =
    useReducedMotion();


  const [
    position,
    setPosition,
  ] =
    useState({
      x: 0,
      y: 0,
    });


  const [
    hover,
    setHover,
  ] =
    useState(false);


  function handleMouseMove(
    event
  ) {
    if (
      reduceMotion ||
      !ref.current
    ) {
      return;
    }


    const rect =
      ref.current.getBoundingClientRect();


    setPosition({
      x:
        (
          event.clientX -
          rect.left -
          rect.width / 2
        ) *
        0.1,

      y:
        (
          event.clientY -
          rect.top -
          rect.height / 2
        ) *
        0.1,
    });
  }


  function reset() {
    setPosition({
      x: 0,
      y: 0,
    });

    setHover(false);
  }


  return (
    <motion.a
      ref={ref}

      href={href}

      onClick={
        onClick
      }

      onMouseMove={
        handleMouseMove
      }

      onMouseEnter={() =>
        setHover(true)
      }

      onMouseLeave={
        reset
      }

      animate={
        reduceMotion
          ? {
              x: 0,
              y: 0,
            }
          : position
      }

      transition={{
        type:
          "spring",

        stiffness:
          210,

        damping:
          19,
      }}

      className={`
        group

        relative
        z-10

        inline-flex

        min-h-[48px]

        items-center
        justify-center

        overflow-hidden

        rounded-xl

        px-6
        py-[.84rem]

        font-barlowCond

        text-[.82rem]

        font-black
        uppercase

        tracking-[1px]

        transition-all
        duration-300

        ${className}
      `}
    >

      {!reduceMotion && (

        <motion.span
          aria-hidden="true"

          animate={{
            opacity:
              hover
                ? 0.14
                : 0,

            scale:
              hover
                ? 1
                : 0.7,
          }}

          transition={{
            duration:
              0.3,
          }}

          className="
            pointer-events-none

            absolute
            inset-0

            bg-[radial-gradient(circle_at_center,rgba(255,255,255,.8),transparent_65%)]
          "
        />

      )}


      <span
        className="
          relative
          z-10

          flex
          items-center

          gap-2
        "
      >
        {children}
      </span>

    </motion.a>
  );
}


/* ============================================================
   HERO
============================================================ */

export default function Hero({
  data = {},
}) {
  const {
    logo =
      "/images/logo.jpeg",

    videoSrc =
      "/videos/water-flow.mp4",

    videoWebm =
      "/videos/water-flow.webm",

    videoSpeed =
      0.65,

    videoPoster =
      "/images/hero-poster.webp",

    badge,

    heading,

    headingHighlight,

    subheading,

    infoTags =
      [],

    buttons =
      [],
  } =
    data;


  const reduceMotion =
    useReducedMotion();


  const videoRef =
    useRef(null);


  const [
    mounted,
    setMounted,
  ] =
    useState(false);


  /* ==========================================================
     CURSOR MOTION
  ========================================================== */

  const mouseX =
    useMotionValue(
      0.5
    );


  const mouseY =
    useMotionValue(
      0.5
    );


  const smoothMouseX =
    useSpring(
      mouseX,
      {
        stiffness:
          80,

        damping:
          30,
      }
    );


  const smoothMouseY =
    useSpring(
      mouseY,
      {
        stiffness:
          80,

        damping:
          30,
      }
    );


  /* ==========================================================
     LOGO MOTION
  ========================================================== */

  const logoRotateX =
    useTransform(
      smoothMouseY,
      [0, 1],
      [
        "4deg",
        "-4deg",
      ]
    );


  const logoRotateY =
    useTransform(
      smoothMouseX,
      [0, 1],
      [
        "-4deg",
        "4deg",
      ]
    );


  const logoX =
    useTransform(
      smoothMouseX,
      [0, 1],
      [
        -4,
        4,
      ]
    );


  const logoY =
    useTransform(
      smoothMouseY,
      [0, 1],
      [
        -4,
        4,
      ]
    );


  const ringX =
    useTransform(
      smoothMouseX,
      [0, 1],
      [
        -4,
        4,
      ]
    );


  const ringY =
    useTransform(
      smoothMouseY,
      [0, 1],
      [
        -4,
        4,
      ]
    );


  const glowX =
    useTransform(
      smoothMouseX,
      [0, 1],
      [
        -8,
        8,
      ]
    );


  const glowY =
    useTransform(
      smoothMouseY,
      [0, 1],
      [
        -8,
        8,
      ]
    );


  const spotlightX =
    useTransform(
      smoothMouseX,
      [0, 1],
      [
        "0%",
        "100%",
      ]
    );


  const spotlightY =
    useTransform(
      smoothMouseY,
      [0, 1],
      [
        "0%",
        "100%",
      ]
    );


  /* ==========================================================
     HERO MOUSE MOVEMENT
  ========================================================== */

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
      Math.max(
        0,
        Math.min(
          1,
          (
            event.clientX -
            rect.left
          ) /
            rect.width
        )
      )
    );


    mouseY.set(
      Math.max(
        0,
        Math.min(
          1,
          (
            event.clientY -
            rect.top
          ) /
            rect.height
        )
      )
    );
  }


  function handleMouseLeave() {
    mouseX.set(
      0.5
    );

    mouseY.set(
      0.5
    );
  }


  /* ==========================================================
     SMOOTH SCROLL
  ========================================================== */

  function scrollToSection(
    event,
    targetId
  ) {
    if (!targetId) {
      return;
    }


    event.preventDefault();


    const section =
      document.querySelector(
        targetId
      );


    if (!section) {
      return;
    }


    section.scrollIntoView({
      behavior:
        reduceMotion
          ? "auto"
          : "smooth",

      block:
        "start",
    });
  }


  /* ==========================================================
     MOUNT
  ========================================================== */

  useEffect(() => {
    setMounted(
      true
    );
  }, []);


  /* ==========================================================
     VIDEO SPEED
  ========================================================== */

  useEffect(() => {
    const video =
      videoRef.current;


    if (!video) {
      return;
    }


    const speed =
      Math.max(
        0.25,
        Math.min(
          1,
          Number(
            videoSpeed
          ) ||
            0.65
        )
      );


    video.playbackRate =
      speed;


    if (
      reduceMotion
    ) {
      video.pause();

      return;
    }


    video
      .play()
      .catch(
        () => {}
      );
  }, [
    videoSpeed,
    reduceMotion,
  ]);


  /* ==========================================================
     PAUSE VIDEO WHEN HERO LEAVES VIEWPORT
  ========================================================== */

  useEffect(() => {
    const video =
      videoRef.current;


    if (!video) {
      return;
    }


    const observer =
      new IntersectionObserver(
        (
          [entry]
        ) => {
          if (
            entry.isIntersecting &&
            !reduceMotion
          ) {
            video
              .play()
              .catch(
                () => {}
              );
          } else {
            video.pause();
          }
        },
        {
          threshold:
            0.12,
        }
      );


    observer.observe(
      video
    );


    return () => {
      observer.disconnect();
    };
  }, [
    reduceMotion,
  ]);


  /* ==========================================================
     BUTTON STYLES
  ========================================================== */

  function getButtonStyle(
    style
  ) {
    /* --------------------------------------------------------
       PRIMARY
    -------------------------------------------------------- */

    if (
      style ===
      "primary"
    ) {
      return `
        border
        border-[#41B6FF]/30

        bg-gradient-to-br

        from-[#0062CC]
        via-[#0084E3]
        to-[#41B6FF]

        px-7

        text-white

        shadow-[0_10px_30px_rgba(0,98,204,.38)]

        hover:-translate-y-1

        hover:shadow-[0_18px_44px_rgba(0,132,227,.46)]
      `;
    }


    /* --------------------------------------------------------
       WHATSAPP STYLE
       Now acts as CONTACT CTA
    -------------------------------------------------------- */

    if (
      style ===
      "whatsapp"
    ) {
      return `
        border
        border-white/20

        bg-white/[0.08]

        text-white

        backdrop-blur-xl

        shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_30px_rgba(0,31,92,.18)]

        hover:-translate-y-0.5

        hover:border-[#41B6FF]/55

        hover:bg-[#0062CC]/24

        hover:shadow-[0_14px_36px_rgba(0,132,227,.22)]
      `;
    }


    /* --------------------------------------------------------
       SECONDARY
    -------------------------------------------------------- */

    return `
      border
      border-white/20

      bg-white/[0.055]

      text-white

      backdrop-blur-xl

      shadow-[inset_0_1px_0_rgba(255,255,255,.08)]

      hover:-translate-y-0.5

      hover:border-[#41B6FF]/55

      hover:bg-[#0062CC]/18

      hover:shadow-[0_10px_28px_rgba(0,98,204,.16)]
    `;
  }


  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <MotionConfig
      reducedMotion="user"
    >

      <section
        id="hero"

        onMouseMove={
          handleMouseMove
        }

        onMouseLeave={
          handleMouseLeave
        }

        className="
          relative

          flex

          min-h-[100svh]

          items-center
          justify-center

          overflow-hidden

          bg-[#001F5C]

          px-4

          pb-7
          pt-[88px]

          text-center

          sm:px-6

          lg:px-[5%]

          lg:pb-6
          lg:pt-[84px]
        "
      >

        {/* =====================================================
            BACKGROUND VIDEO
        ===================================================== */}

        <motion.div
          className="
            absolute
            inset-0
            z-0

            overflow-hidden
          "

          initial={{
            opacity:
              0,

            scale:
              1.025,
          }}

          animate={{
            opacity:
              1,

            scale:
              reduceMotion
                ? 1.025
                : 1.05,
          }}

          transition={{
            opacity: {
              duration:
                1.1,
            },

            scale: {
              duration:
                34,

              repeat:
                Infinity,

              repeatType:
                "reverse",

              ease:
                "easeInOut",
            },
          }}
        >

          <video
            ref={
              videoRef
            }

            autoPlay
            loop
            muted
            playsInline

            preload="metadata"

            poster={
              videoPoster
            }

            className="
              h-full
              w-full

              object-cover
            "

            style={{
              filter:
                "brightness(.74) saturate(.82) contrast(1.08)",
            }}
          >

            {videoWebm && (

              <source
                src={
                  videoWebm
                }

                type="video/webm"
              />

            )}


            <source
              src={
                videoSrc
              }

              type="video/mp4"
            />

          </video>

        </motion.div>


        {/* =====================================================
            CINEMATIC BRAND OVERLAY
        ===================================================== */}

        <div
          aria-hidden="true"

          className="
            pointer-events-none

            absolute
            inset-0
            z-[1]
          "

          style={{
            background: `
              linear-gradient(
                142deg,
                rgba(0,31,92,.82) 0%,
                rgba(0,31,92,.60) 38%,
                rgba(0,98,204,.32) 72%,
                rgba(0,132,227,.13) 100%
              )
            `,
          }}
        />


        {/* =====================================================
            DEPTH OVERLAY
        ===================================================== */}

        <div
          aria-hidden="true"

          className="
            pointer-events-none

            absolute
            inset-0
            z-[2]
          "

          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(0,31,92,.58) 0%,
                rgba(0,31,92,.09) 23%,
                transparent 51%,
                rgba(0,31,92,.16) 74%,
                rgba(0,20,64,.66) 100%
              )
            `,
          }}
        />


        {/* =====================================================
            CONTENT READABILITY
        ===================================================== */}

        <div
          aria-hidden="true"

          className="
            pointer-events-none

            absolute

            left-1/2
            top-[50%]

            z-[3]

            h-[77%]
            w-[78%]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            blur-[42px]
          "

          style={{
            background:
              "radial-gradient(ellipse at center,rgba(0,31,92,.52) 0%,rgba(0,31,92,.26) 40%,rgba(0,31,92,.08) 62%,transparent 78%)",
          }}
        />


        {/* =====================================================
            AMBIENT BRAND LIGHT
        ===================================================== */}

        <motion.div
          aria-hidden="true"

          className="
            pointer-events-none

            absolute

            left-1/2
            top-[45%]

            z-[4]

            h-[32rem]
            w-[32rem]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            blur-[125px]
          "

          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [
                    1,
                    1.055,
                    1,
                  ],

                  opacity: [
                    0.2,
                    0.32,
                    0.2,
                  ],
                }
          }

          transition={{
            duration:
              8,

            repeat:
              Infinity,

            ease:
              "easeInOut",
          }}

          style={{
            background:
              "radial-gradient(circle,rgba(65,182,255,.17),rgba(0,132,227,.065) 42%,rgba(0,98,204,.025) 58%,transparent 72%)",
          }}
        />


        {/* =====================================================
            SUBTLE CURSOR SPOTLIGHT
        ===================================================== */}

        {mounted &&
          !reduceMotion && (

          <motion.div
            aria-hidden="true"

            className="
              pointer-events-none

              absolute
              inset-0

              z-[5]
            "

            style={{
              background:
                "radial-gradient(circle 300px at var(--x) var(--y),rgba(65,182,255,.055),rgba(0,132,227,.018) 45%,transparent 72%)",

              "--x":
                spotlightX,

              "--y":
                spotlightY,
            }}
          />

        )}


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div
          className="
            relative
            z-20

            mx-auto

            flex
            w-full
            max-w-[1240px]

            flex-col
            items-center
          "
        >

          {/* =================================================
              PREMIUM BRAND MEDALLION
          ================================================= */}

          <motion.div
            initial={{
              opacity:
                0,

              y:
                14,

              scale:
                0.92,
            }}

            animate={{
              opacity:
                1,

              y:
                0,

              scale:
                1,
            }}

            transition={{
              duration:
                0.9,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}

            style={{
              rotateX:
                logoRotateX,

              rotateY:
                logoRotateY,

              x:
                logoX,

              y:
                logoY,

              transformStyle:
                "preserve-3d",
            }}

            className="
              relative

              -mt-[clamp(.7rem,1.8vh,1.35rem)]

              mb-[clamp(.45rem,1vh,.7rem)]

              flex

              h-[clamp(9rem,19vh,12.2rem)]
              w-[clamp(9rem,19vh,12.2rem)]

              items-center
              justify-center

              [@media(max-height:820px)]:h-[9.4rem]
              [@media(max-height:820px)]:w-[9.4rem]

              [@media(max-height:720px)]:h-[8.5rem]
              [@media(max-height:720px)]:w-[8.5rem]
            "
          >

            {/* OUTER GLOW */}

            <motion.div
              aria-hidden="true"

              style={{
                x:
                  glowX,

                y:
                  glowY,
              }}

              className="
                pointer-events-none

                absolute
                inset-[-27px]

                rounded-full

                bg-[#41B6FF]/8

                blur-3xl
              "
            />


            {/* STATIC OUTER RING */}

            <motion.div
              aria-hidden="true"

              style={{
                x:
                  ringX,

                y:
                  ringY,
              }}

              className="
                pointer-events-none

                absolute
                inset-[-11px]

                rounded-full

                border
                border-white/15
              "
            />


            {/* ROTATING BRAND RING */}

            <motion.div
              aria-hidden="true"

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
                  24,

                repeat:
                  Infinity,

                ease:
                  "linear",
              }}

              className="
                pointer-events-none

                absolute
                inset-[-6px]

                rounded-full
              "

              style={{
                padding:
                  "1px",

                background:
                  "conic-gradient(from 0deg,transparent,rgba(65,182,255,.68),transparent 27%,transparent 63%,rgba(0,132,227,.50),rgba(255,255,255,.22),transparent 88%)",

                WebkitMask:
                  "linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0)",

                WebkitMaskComposite:
                  "xor",

                maskComposite:
                  "exclude",
              }}
            />


            {/* GLASS LOGO CONTAINER */}

            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale:
                        1.018,
                    }
              }

              transition={{
                type:
                  "spring",

                stiffness:
                  180,

                damping:
                  18,
              }}

              className="
                relative

                flex

                h-full
                w-full

                items-center
                justify-center

                overflow-hidden

                rounded-full

                border
                border-white/15

                bg-white/[0.065]

                shadow-[0_20px_60px_rgba(0,31,92,.46),inset_0_0_35px_rgba(65,182,255,.055)]

                backdrop-blur-xl
              "
            >

              {/* GLASS REFLECTION */}

              <div
                aria-hidden="true"

                className="
                  pointer-events-none

                  absolute

                  left-[14%]
                  top-[8%]

                  h-[28%]
                  w-[72%]

                  rounded-full

                  bg-white/[0.055]

                  blur-xl
                "
              />


              {/* ACTUAL LOGO */}

              <div
                className="
                  relative
                  z-10

                  h-[81%]
                  w-[81%]
                "
              >

                <Image
                  src={
                    logo
                  }

                  alt="Rapid Laundromat"

                  fill

                  priority

                  sizes="200px"

                  className="
                    rounded-full

                    object-contain

                    drop-shadow-[0_14px_24px_rgba(0,0,0,.32)]
                  "
                />

              </div>

            </motion.div>

          </motion.div>


          {/* =================================================
              BADGE
          ================================================= */}

          {badge && (

            <motion.div
              initial={{
                opacity:
                  0,

                y:
                  8,
              }}

              animate={{
                opacity:
                  1,

                y:
                  0,
              }}

              transition={{
                delay:
                  0.35,

                duration:
                  0.6,
              }}

              className="
                mb-[clamp(.65rem,1.35vh,.9rem)]

                inline-flex

                items-center
                gap-2

                rounded-full

                border
                border-[#41B6FF]/28

                bg-[#0062CC]/16

                px-4
                py-[.36rem]

                font-barlowCond

                text-[clamp(.58rem,.8vw,.7rem)]

                font-black
                uppercase

                tracking-[3.2px]

                text-white/90

                shadow-[0_8px_26px_rgba(0,98,204,.12)]

                backdrop-blur-xl
              "
            >

              <span
                className="
                  h-1.5
                  w-1.5

                  animate-pulse

                  rounded-full

                  bg-[#41B6FF]

                  shadow-[0_0_10px_#41B6FF]
                "
              />


              {badge}

            </motion.div>

          )}


          {/* =================================================
              HEADING
          ================================================= */}

          <h1
            className="
              mx-auto

              w-full
              max-w-[1080px]

              font-barlowCond

              font-black
              uppercase

              leading-[.92]

              tracking-[clamp(.7px,.13vw,2px)]

              drop-shadow-[0_10px_30px_rgba(0,0,0,.27)]
            "

            style={{
              fontSize:
                "clamp(2.55rem, min(5.35vw, 6.6vh), 5.4rem)",
            }}
          >

            <AdvancedTextReveal
              text={
                heading
              }

              highlight={
                headingHighlight
              }
            />

          </h1>


          {/* =================================================
              SUBHEADING
          ================================================= */}

          {subheading && (

            <motion.p
              initial={{
                opacity:
                  0,

                y:
                  8,
              }}

              animate={{
                opacity:
                  1,

                y:
                  0,
              }}

              transition={{
                delay:
                  0.85,

                duration:
                  0.7,
              }}

              className="
                mx-auto

                mt-[clamp(.55rem,1.05vh,.8rem)]

                max-w-[720px]

                text-[clamp(.8rem,min(1.12vw,1.55vh),1.05rem)]

                font-medium

                leading-[1.65]

                tracking-[.1px]

                text-white/72
              "
            >
              {subheading}
            </motion.p>

          )}


          {/* =================================================
              INFO TAGS
              Maximum 3 shown in hero
          ================================================= */}

          {infoTags.length >
            0 && (

            <motion.div
              initial={{
                opacity:
                  0,

                y:
                  7,
              }}

              animate={{
                opacity:
                  1,

                y:
                  0,
              }}

              transition={{
                delay:
                  1.05,

                duration:
                  0.65,
              }}

              className="
                hero-info-tags

                mt-[clamp(.55rem,1.05vh,.75rem)]

                flex

                max-w-[950px]

                flex-wrap
                justify-center

                gap-2
              "
            >

              {infoTags
                .slice(
                  0,
                  3
                )
                .map(
                  (
                    tag,
                    index
                  ) => (

                  <motion.span
                    key={
                      index
                    }

                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y:
                              -2,

                            scale:
                              1.015,
                          }
                    }

                    className="
                      rounded-full

                      border
                      border-[#41B6FF]/18

                      bg-[#001F5C]/38

                      px-3.5
                      py-[.32rem]

                      text-[clamp(.6rem,.8vw,.72rem)]

                      font-semibold

                      text-white/82

                      shadow-[inset_0_1px_0_rgba(255,255,255,.04)]

                      backdrop-blur-lg

                      transition-all

                      hover:border-[#41B6FF]/45

                      hover:bg-[#0062CC]/22

                      hover:text-white
                    "
                  >

                    {
                      tag.icon ||
                      "•"
                    }{" "}

                    {
                      tag.text
                    }

                  </motion.span>

                )
              )}

            </motion.div>

          )}


          {/* =================================================
              CTA BUTTONS
          ================================================= */}

          {buttons.length >
            0 && (

            <motion.div
              initial={{
                opacity:
                  0,

                y:
                  10,
              }}

              animate={{
                opacity:
                  1,

                y:
                  0,
              }}

              transition={{
                delay:
                  1.2,

                duration:
                  0.7,
              }}

              className="
                mt-[clamp(.75rem,1.35vh,1rem)]

                grid

                w-full
                max-w-[430px]

                grid-cols-1

                gap-2.5

                sm:max-w-[850px]
                sm:grid-cols-2

                lg:flex

                lg:w-auto
                lg:max-w-none

                lg:flex-wrap
                lg:justify-center

                lg:gap-3
              "
            >

              {buttons.map(
                (
                  button,
                  index
                ) => {

                  /*
                   * WhatsApp-style button is now
                   * redirected to Contact section.
                   */

                  const isContactButton =
                    button.style ===
                    "whatsapp";


                  const href =
                    isContactButton
                      ? "#contact"
                      : button.href ||
                        "#";


                  return (

                    <MagneticButton
                      key={
                        index
                      }

                      href={
                        href
                      }

                      onClick={
                        isContactButton
                          ? (
                              event
                            ) =>
                              scrollToSection(
                                event,
                                "#contact"
                              )
                          : undefined
                      }

                      className={
                        getButtonStyle(
                          button.style
                        )
                      }
                    >

                      {button.icon && (

                        <motion.span
                          whileHover={
                            reduceMotion
                              ? undefined
                              : {
                                  scale:
                                    1.08,
                                }
                          }
                        >
                          {
                            button.icon
                          }
                        </motion.span>

                      )}


                      <span>
                        {
                          isContactButton
                            ? "Get in Touch"
                            : button.label
                        }
                      </span>


                      {button.style ===
                        "primary" && (

                        <motion.span
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  x: [
                                    0,
                                    3,
                                    0,
                                  ],
                                }
                          }

                          transition={{
                            duration:
                              1.8,

                            repeat:
                              Infinity,

                            ease:
                              "easeInOut",
                          }}
                        >
                          →
                        </motion.span>

                      )}


                      {isContactButton && (

                        <motion.span
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  y: [
                                    0,
                                    2,
                                    0,
                                  ],
                                }
                          }

                          transition={{
                            duration:
                              2,

                            repeat:
                              Infinity,

                            ease:
                              "easeInOut",
                          }}
                        >
                          ↓
                        </motion.span>

                      )}

                    </MagneticButton>

                  );
                }
              )}

            </motion.div>

          )}


          {/* =================================================
              BRAND SIGNATURE
          ================================================= */}

          <motion.div
            initial={{
              opacity:
                0,
            }}

            animate={{
              opacity:
                1,
            }}

            transition={{
              delay:
                1.5,

              duration:
                0.7,
            }}

            className="
              mt-[clamp(.48rem,.95vh,.7rem)]

              hidden

              font-barlowCond

              text-[.58rem]

              font-bold
              uppercase

              tracking-[4px]

              text-white/23

              sm:block

              [@media(max-height:790px)]:hidden
            "
          >
            Fresh • Fast • Effortless
          </motion.div>

        </div>


        {/* =====================================================
            SCROLL DISCOVERY
        ===================================================== */}

        <motion.a
          href="#services"

          aria-label="Explore our services"

          onClick={(
            event
          ) =>
            scrollToSection(
              event,
              "#services"
            )
          }

          initial={{
            opacity:
              0,

            y:
              10,
          }}

          animate={{
            opacity:
              1,

            y:
              0,
          }}

          transition={{
            duration:
              0.8,

            delay:
              1.7,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}

          className="
            group

            absolute

            bottom-5
            left-1/2

            z-30

            hidden

            -translate-x-1/2

            flex-col
            items-center

            md:flex

            [@media(max-height:790px)]:bottom-2
          "
        >

          {/* LABEL */}

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [
                      0.3,
                      0.7,
                      0.3,
                    ],
                  }
            }

            transition={{
              duration:
                3,

              repeat:
                Infinity,

              ease:
                "easeInOut",
            }}

            className="
              mb-2

              font-barlowCond

              text-[.56rem]

              font-black
              uppercase

              tracking-[4px]

              text-white/40

              transition-colors
              duration-300

              group-hover:text-[#41B6FF]
            "
          >
            Explore
          </motion.span>


          {/* GLASS SCROLL CAPSULE */}

          <div
            className="
              relative

              flex

              h-[48px]
              w-[27px]

              items-start
              justify-center

              overflow-hidden

              rounded-full

              border
              border-white/18

              bg-white/[0.04]

              pt-[8px]

              shadow-[0_8px_30px_rgba(0,31,92,.22)]

              backdrop-blur-lg

              transition-all
              duration-500

              group-hover:border-[#41B6FF]/55

              group-hover:bg-[#0062CC]/10

              group-hover:shadow-[0_10px_32px_rgba(65,182,255,.14)]
            "
          >

            {/* GLASS REFLECTION */}

            <span
              aria-hidden="true"

              className="
                pointer-events-none

                absolute

                inset-x-[5px]
                top-[3px]

                h-[9px]

                rounded-full

                bg-white/[0.045]

                blur-[2px]
              "
            />


            {/* WATER DROP */}

            <motion.span
              aria-hidden="true"

              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [
                        0,
                        21,
                        21,
                        0,
                      ],

                      opacity: [
                        0,
                        1,
                        0,
                        0,
                      ],

                      scale: [
                        0.7,
                        1,
                        0.7,
                        0.7,
                      ],
                    }
              }

              transition={{
                duration:
                  2.4,

                repeat:
                  Infinity,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}

              className="
                relative
                z-10

                h-[5px]
                w-[5px]

                rounded-full

                bg-[#41B6FF]

                shadow-[0_0_9px_rgba(65,182,255,.9)]
              "
            />


            {/* BOTTOM GLOW */}

            <span
              aria-hidden="true"

              className="
                pointer-events-none

                absolute

                bottom-[5px]
                left-1/2

                h-[8px]
                w-[12px]

                -translate-x-1/2

                rounded-full

                bg-[#0084E3]/22

                blur-[5px]
              "
            />

          </div>


          {/* LOWER CHEVRON */}

          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [
                      0,
                      4,
                      0,
                    ],

                    opacity: [
                      0.3,
                      0.75,
                      0.3,
                    ],
                  }
            }

            transition={{
              duration:
                2.1,

              repeat:
                Infinity,

              ease:
                "easeInOut",
            }}

            className="
              mt-2

              h-[8px]
              w-[8px]

              rotate-45

              border-b
              border-r

              border-[#41B6FF]/60
            "
          />

        </motion.a>


        {/* =====================================================
            HERO STYLES
        ===================================================== */}

        <style>{`

          @keyframes rapidHeroGradient {

            0%,
            100% {
              background-position:
                0% 50%;
            }

            50% {
              background-position:
                100% 50%;
            }
          }


          /*
           * Standard laptop:
           * 1366 × 768 / 1440 × 800
           */

          @media
          (min-width: 1024px)
          and
          (max-height: 820px) {

            #hero {
              padding-top:
                80px;

              padding-bottom:
                8px;
            }
          }


          /*
           * Short laptop
           */

          @media
          (min-width: 1024px)
          and
          (max-height: 720px) {

            #hero {
              padding-top:
                76px;

              padding-bottom:
                6px;
            }
          }


          /*
           * Extremely short browser height:
           * simplify content automatically.
           */

          @media
          (min-width: 1024px)
          and
          (max-height: 680px) {

            #hero .hero-info-tags {
              display:
                none;
            }
          }


          /*
           * Mobile
           */

          @media
          (max-width: 640px) {

            #hero {
              padding-top:
                92px;

              padding-bottom:
                28px;
            }
          }


          /*
           * Accessibility
           */

          @media
          (prefers-reduced-motion: reduce) {

            *,
            *::before,
            *::after {

              animation-duration:
                0.01ms !important;

              animation-iteration-count:
                1 !important;

              transition-duration:
                0.01ms !important;

              scroll-behavior:
                auto !important;
            }
          }

        `}</style>

      </section>

    </MotionConfig>
  );
}