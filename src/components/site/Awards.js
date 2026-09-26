"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  ExternalLink,
  Medal,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";


/* =========================================================
   HOMEPAGE DISPLAY LIMIT
========================================================= */

const MAX_HOMEPAGE_AWARDS =
  4;


/* =========================================================
   GRID LAYOUT
========================================================= */

function getAwardsGridClass(
  count
) {
  if (count === 1) {
    return `
      mx-auto
      max-w-[820px]
      grid-cols-1
    `;
  }

  if (count === 2) {
    return `
      mx-auto
      max-w-[1100px]
      grid-cols-1
      md:grid-cols-2
    `;
  }

  if (count === 3) {
    return `
      mx-auto
      max-w-[1320px]
      grid-cols-1
      md:grid-cols-3
    `;
  }

  return `
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-4
  `;
}


/* =========================================================
   AWARDS
========================================================= */

export default function Awards({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();

  const [
    selectedAward,
    setSelectedAward,
  ] = useState(null);


  /* =======================================================
     AWARDS FROM HOMEPAGE
  ======================================================= */

  const awards =
    Array.isArray(
      data.items
    )
      ? data.items
      : [];


  /* =======================================================
     SORT + FILTER
  ======================================================= */

  const visibleAwards =
    useMemo(
      () =>
        [...awards]
          .filter(
            (award) =>
              award &&
              award.published !==
                false
          )
          .sort(
            (a, b) => {
              /* Featured first */

              if (
                a.featured ===
                  true &&
                b.featured !==
                  true
              ) {
                return -1;
              }

              if (
                a.featured !==
                  true &&
                b.featured ===
                  true
              ) {
                return 1;
              }


              /* Display order */

              const orderDifference =
                Number(
                  a.order || 0
                ) -
                Number(
                  b.order || 0
                );

              if (
                orderDifference !==
                0
              ) {
                return orderDifference;
              }


              /* Newest year */

              return (
                Number(
                  b.year || 0
                ) -
                Number(
                  a.year || 0
                )
              );
            }
          )
          .slice(
            0,
            MAX_HOMEPAGE_AWARDS
          ),
      [awards]
    );


  /* =======================================================
     MODAL BEHAVIOUR
  ======================================================= */

  useEffect(
    () => {
      if (
        !selectedAward
      ) {
        return;
      }

      const originalOverflow =
        document.body.style
          .overflow;

      document.body.style.overflow =
        "hidden";


      function handleKeyDown(
        event
      ) {
        if (
          event.key ===
          "Escape"
        ) {
          setSelectedAward(
            null
          );
        }
      }


      window.addEventListener(
        "keydown",
        handleKeyDown
      );


      return () => {
        document.body.style.overflow =
          originalOverflow;

        window.removeEventListener(
          "keydown",
          handleKeyDown
        );
      };
    },
    [selectedAward]
  );


  /* =======================================================
     EMPTY
  ======================================================= */

  if (
    visibleAwards.length ===
    0
  ) {
    return null;
  }


  const isSingle =
    visibleAwards.length ===
    1;


  return (
    <>
      <section
        id="awards"
        className="
          relative
          overflow-hidden
          bg-[#001F5C]
          px-[5%]
          py-24
          text-white
          lg:py-32
        "
      >

        {/* ===================================================
            BACKGROUND
        =================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-40
            top-10
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#41B6FF]/10
            blur-[150px]
          "
        />


        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-[-160px]
            h-[560px]
            w-[560px]
            rounded-full
            bg-[#0062CC]/20
            blur-[170px]
          "
        />


        {/* CENTER GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[42%]
            h-[420px]
            w-[650px]
            -translate-x-1/2
            rounded-full
            bg-[#0084E3]/[0.07]
            blur-[150px]
          "
        />


        {/* GRID TEXTURE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0

            bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)]

            bg-[size:60px_60px]
          "
        />


        {/* LARGE DECORATIVE TROPHY */}

        <Trophy
          aria-hidden="true"
          strokeWidth={0.6}
          className="
            pointer-events-none
            absolute
            -right-16
            top-24
            h-[320px]
            w-[320px]
            rotate-[-10deg]
            text-white/[0.018]
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
            max-w-[1500px]
          "
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              grid
              gap-10
              lg:grid-cols-[1.1fr_.6fr]
              lg:items-end
            "
          >

            {/* LEFT */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 24,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                duration: 0.8,
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
                  text-[#41B6FF]
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[14px]
                    border
                    border-[#41B6FF]/20
                    bg-[#41B6FF]/[0.08]
                    shadow-[inset_0_1px_0_rgba(255,255,255,.08)]
                    backdrop-blur-xl
                  "
                >
                  <Trophy
                    size={16}
                  />
                </div>


                <div>
                  <div
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[.22em]
                    "
                  >
                    Awards & Recognition
                  </div>

                  <div
                    className="
                      mt-1
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[.13em]
                      text-white/30
                    "
                  >
                    Recognised standards of excellence
                  </div>
                </div>
              </div>


              <h2
                className="
                  mt-7
                  max-w-[950px]
                  font-barlowCond
                  text-[clamp(3.2rem,6.5vw,6.6rem)]
                  font-black
                  uppercase
                  leading-[.88]
                  tracking-[-.02em]
                  text-white
                "
              >
                Excellence recognised.

                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-[#41B6FF]
                    via-[#8BD5FF]
                    to-white
                    bg-clip-text
                    text-transparent
                  "
                >
                  Standards maintained.
                </span>
              </h2>
            </motion.div>


            {/* RIGHT */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 16,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                lg:ml-auto
              "
            >
              <p
                className="
                  max-w-[520px]
                  text-[1rem]
                  leading-[1.9]
                  text-white/55
                "
              >
                Recognition reflects the standards we work to protect every
                day — from garment care and service quality to customer
                experience, consistency and trust.
              </p>


              <div
                className="
                  mt-7
                  grid
                  grid-cols-[auto_1fr]
                  items-center
                  gap-5
                  border-t
                  border-white/10
                  pt-6
                "
              >
                <div
                  className="
                    font-barlowCond
                    text-[3rem]
                    font-black
                    leading-none
                    tracking-[-.04em]
                    text-white
                  "
                >
                  {
                    awards.filter(
                      (award) =>
                        award &&
                        award.published !==
                          false
                    ).length
                  }
                </div>


                <div>
                  <div
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.17em]
                      text-[#41B6FF]
                    "
                  >
                    Published Recognitions
                  </div>

                  <div
                    className="
                      mt-1
                      text-[10px]
                      leading-5
                      text-white/30
                    "
                  >
                    Milestones reflecting service,
                    quality and continued progress.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>


          {/* =================================================
              SECTION DIVIDER
          ================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    scaleX: 0,
                    opacity: 0,
                  }
            }
            whileInView={{
              scaleX: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
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
              from-[#41B6FF]/50
              via-white/10
              to-transparent
            "
          />


          {/* =================================================
              AWARDS GRID
          ================================================= */}

          <div
            className={`
              mt-12
              grid
              gap-5

              ${getAwardsGridClass(
                visibleAwards.length
              )}
            `}
          >
            {visibleAwards.map(
              (
                award,
                index
              ) => (
                <AwardCard
                  key={
                    award.id ||
                    `${award.title}-${index}`
                  }
                  award={
                    award
                  }
                  index={
                    index
                  }
                  reduceMotion={
                    reduceMotion
                  }
                  single={
                    isSingle
                  }
                  onOpen={() =>
                    setSelectedAward(
                      award
                    )
                  }
                />
              )
            )}
          </div>


          {/* =================================================
              BOTTOM TRUST ROW
          ================================================= */}

          <div
            className="
              mt-12
              flex
              flex-col
              gap-5
              border-t
              border-white/10
              pt-8
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
                text-[.85rem]
                font-bold
                text-white/50
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
                  bg-white/[0.06]
                  text-[#41B6FF]
                "
              >
                <Sparkles
                  size={14}
                />
              </div>


              <span>
                Recognition built on service, consistency and care.
              </span>
            </div>


            {data.awardsPageUrl && (
              <a
                href={
                  data.awardsPageUrl
                }
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  self-start
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.14em]
                  text-[#41B6FF]
                  sm:self-auto
                "
              >
                View All Recognition

                <ArrowUpRight
                  size={13}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </a>
            )}
          </div>
        </div>
      </section>


      {/* =====================================================
          FULL DETAILS MODAL
      ===================================================== */}

      <AnimatePresence>
        {selectedAward && (
          <AwardModal
            award={
              selectedAward
            }
            reduceMotion={
              reduceMotion
            }
            onClose={() =>
              setSelectedAward(
                null
              )
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}


/* =========================================================
   AWARD CARD
========================================================= */

function AwardCard({
  award,
  index,
  reduceMotion,
  onOpen,
  single = false,
}) {
  const Icon =
    index % 3 === 0
      ? Trophy
      : index % 3 === 1
        ? Medal
        : Award;


  function handleKeyDown(
    event
  ) {
    if (
      event.key ===
        "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      onOpen();
    }
  }


  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-label={`View details for ${award.title || "award"}`}
      onClick={onOpen}
      onKeyDown={
        handleKeyDown
      }
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 32,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        delay:
          index * 0.07,
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
              y: -7,
            }
      }
      className={`
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/[0.055]
        outline-none
        backdrop-blur-xl

        transition-[border-color,background-color,box-shadow]
        duration-500

        hover:border-[#41B6FF]/35
        hover:bg-white/[0.075]
        hover:shadow-[0_30px_100px_rgba(0,0,0,.20)]

        focus-visible:border-[#41B6FF]/60
        focus-visible:ring-2
        focus-visible:ring-[#41B6FF]/30

        ${
          single
            ? `
              md:grid
              md:grid-cols-[1.08fr_.92fr]
            `
            : ""
        }
      `}
    >

      {/* ===================================================
          IMAGE
      =================================================== */}

      <div
        className={`
          relative
          w-full
          overflow-hidden
          bg-white/[0.04]

          ${
            single
              ? `
                aspect-[16/10]
                md:aspect-auto
                md:min-h-[460px]
              `
              : `
                aspect-[4/3]
              `
          }
        `}
      >
        {award.image?.url ? (
          <Image
            src={
              award.image.url
            }
            alt={
              award.title ||
              "Rapid Laundromat award"
            }
            fill
            sizes="
              (max-width:768px) 100vw,
              (max-width:1280px) 50vw,
              800px
            "
            className="
              object-cover
              object-center
              transition-transform
              duration-[900ms]
              group-hover:scale-[1.055]
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              min-h-[280px]
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-white/[0.04]
              via-[#0062CC]/10
              to-[#41B6FF]/10
              text-[#41B6FF]
            "
          >
            <Icon
              size={
                single
                  ? 90
                  : 62
              }
              strokeWidth={
                1
              }
            />
          </div>
        )}


        {/* IMAGE OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#001F5C]/95
            via-[#001F5C]/15
            to-transparent
          "
        />


        {/* BLUE LIGHT */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-24
            left-1/2
            h-48
            w-48
            -translate-x-1/2
            rounded-full
            bg-[#41B6FF]/20
            blur-[70px]
          "
        />


        {/* YEAR */}

        {award.year && (
          <div
            className="
              absolute
              bottom-5
              left-5
            "
          >
            <div
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[.18em]
                text-[#8BD5FF]
              "
            >
              Recognition Year
            </div>

            <div
              className="
                mt-1
                font-barlowCond
                text-[2.6rem]
                font-black
                leading-none
                tracking-[-.03em]
                text-white
              "
            >
              {
                award.year
              }
            </div>
          </div>
        )}


        {/* FEATURED */}

        {award.featured ===
          true && (
          <div
            className="
              absolute
              right-4
              top-4
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#41B6FF]/20
              bg-[#001F5C]/75
              px-3
              py-1.5
              text-[7px]
              font-black
              uppercase
              tracking-[.14em]
              text-[#8BD5FF]
              shadow-[0_8px_30px_rgba(0,0,0,.2)]
              backdrop-blur-xl
            "
          >
            <Sparkles
              size={10}
            />

            Featured
          </div>
        )}
      </div>


      {/* ===================================================
          CONTENT
      =================================================== */}

      <div
        className={`
          relative
          flex
          flex-col
          p-6

          ${
            single
              ? `
                md:justify-center
                md:p-10
              `
              : ""
          }
        `}
      >

        {/* NUMBER */}

        <div
          aria-hidden="true"
          className="
            absolute
            right-5
            top-4
            font-barlowCond
            text-[4.5rem]
            font-black
            leading-none
            tracking-[-.07em]
            text-white/[0.035]
          "
        >
          {String(
            index + 1
          ).padStart(
            2,
            "0"
          )}
        </div>


        {/* RECOGNITION */}

        {award.recognition && (
          <div
            className="
              relative
              z-10
              flex
              items-center
              gap-2
              text-[8px]
              font-black
              uppercase
              tracking-[.18em]
              text-[#41B6FF]
            "
          >
            <span
              className="
                h-px
                w-5
                bg-[#41B6FF]
              "
            />

            {
              award.recognition
            }
          </div>
        )}


        {/* TITLE */}

        <h3
          className={`
            relative
            z-10
            mt-4
            font-black
            leading-[1.08]
            tracking-[-.035em]
            text-white

            ${
              single
                ? `
                  text-[clamp(1.8rem,3vw,2.7rem)]
                `
                : `
                  text-[1.3rem]
                `
            }
          `}
        >
          {
            award.title
          }
        </h3>


        {/* ORGANISATION */}

        {award.organization && (
          <div
            className="
              relative
              z-10
              mt-2
              text-[.78rem]
              font-bold
              leading-5
              text-white/40
            "
          >
            {
              award.organization
            }
          </div>
        )}


        {/* CATEGORY */}

        {award.category && (
          <div
            className="
              relative
              z-10
              mt-4
              inline-flex
              w-fit
              rounded-full
              border
              border-[#41B6FF]/10
              bg-[#41B6FF]/[0.06]
              px-3
              py-1.5
              text-[7px]
              font-black
              uppercase
              tracking-[.13em]
              text-[#8BD5FF]
            "
          >
            {
              award.category
            }
          </div>
        )}


        {/* DESCRIPTION PREVIEW */}

        {award.description && (
          <p
            className="
              relative
              z-10
              mt-5
              line-clamp-3
              text-[.82rem]
              leading-6
              text-white/48
            "
          >
            {
              award.description
            }
          </p>
        )}


        {/* VIEW DETAILS */}

        <div
          className="
            relative
            z-10
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white/[0.07]
            pt-5
          "
        >
          <span
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[.14em]
              text-[#41B6FF]
            "
          >
            View Full Recognition
          </span>


          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#41B6FF]/15
              bg-[#41B6FF]/[0.06]
              text-[#41B6FF]
              transition-all
              duration-300

              group-hover:border-[#41B6FF]/35
              group-hover:bg-[#41B6FF]
              group-hover:text-[#001F5C]
            "
          >
            <ArrowUpRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </span>
        </div>
      </div>


      {/* ===================================================
          BOTTOM ACCENT
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-gradient-to-r
          from-[#41B6FF]
          via-[#0084E3]
          to-white
          transition-all
          duration-500
          group-hover:w-full
        "
      />


      {/* ===================================================
          HOVER SHINE
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-y-0
          -left-[40%]
          w-[20%]
          rotate-[18deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.045]
          to-transparent
          blur-md
          transition-all
          duration-700
          group-hover:left-[130%]
        "
      />
    </motion.article>
  );
}


/* =========================================================
   AWARD DETAILS MODAL
========================================================= */

function AwardModal({
  award,
  reduceMotion,
  onClose,
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={
        award.title ||
        "Award details"
      }
      initial={
        reduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
            }
      }
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        p-4
        sm:p-6
      "
    >

      {/* BACKDROP */}

      <motion.button
        type="button"
        aria-label="Close award details"
        onClick={
          onClose
        }
        className="
          absolute
          inset-0
          cursor-default
          bg-[#000B26]/80
          backdrop-blur-xl
        "
      />


      {/* MODAL */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 36,
                scale: 0.96,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.97,
        }}
        transition={{
          duration: 0.45,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="
          relative
          z-10
          max-h-[90vh]
          w-full
          max-w-[1050px]
          overflow-hidden
          rounded-[32px]
          border
          border-white/10
          bg-[#001F5C]
          shadow-[0_40px_140px_rgba(0,0,0,.55)]
        "
      >

        {/* MODAL GLOW */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-28
            -top-28
            h-[350px]
            w-[350px]
            rounded-full
            bg-[#41B6FF]/15
            blur-[120px]
          "
        />


        {/* CLOSE */}

        <button
          type="button"
          onClick={
            onClose
          }
          aria-label="Close"
          className="
            absolute
            right-4
            top-4
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-[#001F5C]/70
            text-white/70
            backdrop-blur-xl
            transition
            duration-300

            hover:border-[#41B6FF]/30
            hover:bg-[#41B6FF]
            hover:text-[#001F5C]
          "
        >
          <X
            size={16}
          />
        </button>


        <div
          className="
            max-h-[90vh]
            overflow-y-auto
          "
        >
          <div
            className="
              grid
              lg:grid-cols-[.9fr_1.1fr]
            "
          >

            {/* ===============================================
                IMAGE
            =============================================== */}

            <div
              className="
                relative
                min-h-[310px]
                overflow-hidden
                bg-[#00163F]
                lg:min-h-[650px]
              "
            >
              {award.image?.url ? (
                <Image
                  src={
                    award.image.url
                  }
                  alt={
                    award.title ||
                    "Award"
                  }
                  fill
                  sizes="
                    (max-width:1024px) 100vw,
                    45vw
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
                    min-h-[310px]
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-[#00163F]
                    via-[#002A70]
                    to-[#0062CC]/40
                    text-[#41B6FF]
                    lg:min-h-[650px]
                  "
                >
                  <Trophy
                    size={110}
                    strokeWidth={
                      0.8
                    }
                  />
                </div>
              )}


              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#001F5C]
                  via-[#001F5C]/10
                  to-transparent
                "
              />


              {award.year && (
                <div
                  className="
                    absolute
                    bottom-7
                    left-7
                  "
                >
                  <div
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.18em]
                      text-[#41B6FF]
                    "
                  >
                    Recognition Year
                  </div>

                  <div
                    className="
                      mt-1
                      font-barlowCond
                      text-[4rem]
                      font-black
                      leading-none
                      text-white
                    "
                  >
                    {
                      award.year
                    }
                  </div>
                </div>
              )}
            </div>


            {/* ===============================================
                DETAILS
            =============================================== */}

            <div
              className="
                relative
                p-7
                sm:p-9
                lg:p-12
              "
            >

              {/* EYEBROW */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[14px]
                    border
                    border-[#41B6FF]/15
                    bg-[#41B6FF]/[0.07]
                    text-[#41B6FF]
                  "
                >
                  <Trophy
                    size={16}
                  />
                </div>


                <div>
                  <div
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.2em]
                      text-[#41B6FF]
                    "
                  >
                    Awards & Recognition
                  </div>

                  {award.recognition && (
                    <div
                      className="
                        mt-1
                        text-[9px]
                        font-semibold
                        text-white/35
                      "
                    >
                      {
                        award.recognition
                      }
                    </div>
                  )}
                </div>
              </div>


              {/* TITLE */}

              <h3
                className="
                  mt-7
                  max-w-[600px]
                  font-barlowCond
                  text-[clamp(2.3rem,4vw,4rem)]
                  font-black
                  uppercase
                  leading-[.95]
                  tracking-[.3px]
                  text-white
                "
              >
                {
                  award.title
                }
              </h3>


              {/* META */}

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {award.organization && (
                  <span
                    className="
                      rounded-full
                      border
                      border-white/[0.08]
                      bg-white/[0.05]
                      px-3
                      py-2
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.1em]
                      text-white/55
                    "
                  >
                    {
                      award.organization
                    }
                  </span>
                )}


                {award.category && (
                  <span
                    className="
                      rounded-full
                      border
                      border-[#41B6FF]/15
                      bg-[#41B6FF]/[0.07]
                      px-3
                      py-2
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.1em]
                      text-[#8BD5FF]
                    "
                  >
                    {
                      award.category
                    }
                  </span>
                )}


                {award.year && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/[0.08]
                      bg-white/[0.05]
                      px-3
                      py-2
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.1em]
                      text-white/55
                    "
                  >
                    <CalendarDays
                      size={11}
                    />

                    {
                      award.year
                    }
                  </span>
                )}
              </div>


              {/* DIVIDER */}

              <div
                className="
                  my-8
                  h-px
                  bg-gradient-to-r
                  from-[#41B6FF]/35
                  via-white/10
                  to-transparent
                "
              />


              {/* DESCRIPTION */}

              {award.description && (
                <div>
                  <div
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.18em]
                      text-[#41B6FF]
                    "
                  >
                    Recognition Story
                  </div>


                  <p
                    className="
                      mt-4
                      whitespace-pre-line
                      text-[.94rem]
                      leading-[1.9]
                      text-white/60
                    "
                  >
                    {
                      award.description
                    }
                  </p>
                </div>
              )}


              {/* SOURCE */}

              {award.sourceUrl && (
                <div
                  className="
                    mt-9
                    border-t
                    border-white/[0.08]
                    pt-7
                  "
                >
                  <a
                    href={
                      award.sourceUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
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
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.14em]
                      text-white
                      shadow-[0_12px_35px_rgba(0,98,204,.2)]
                      transition
                      duration-300

                      hover:-translate-y-1
                      hover:shadow-[0_18px_50px_rgba(65,182,255,.25)]
                    "
                  >
                    View Official Recognition

                    <ExternalLink
                      size={13}
                      className="
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}