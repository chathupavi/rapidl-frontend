"use client";

import Image from "next/image";

import {
  ArrowRight,
  GripVertical,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  useRef,
  useState,
} from "react";


/* =========================================================
   NORMALIZE GALLERY ITEM
========================================================= */

function normalizeGalleryItem(
  item,
  index
) {
  return {
    ...item,

    id:
      item.id ||
      `gallery-${index}`,

    title:
      item.title ||
      "Transformation",

    category:
      item.category ||
      "Professional Care",

    /*
     * Backend / Firestore fields
     */

    before:
      item.beforeImage ||
      item.before ||
      "",

    after:
      item.afterImage ||
      item.after ||
      "",

    order:
      Number(
        item.order ||
        0
      ),

    featured:
      Boolean(
        item.featured
      ),

    published:
      item.published !==
      false,
  };
}


/* =========================================================
   MAIN GALLERY
========================================================= */

export default function Gallery({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  /* =======================================================
     DATABASE GALLERY ITEMS ONLY
  ======================================================= */

  const transformations =
    Array.isArray(
      data.items
    )
      ? data.items
          .map(
            normalizeGalleryItem
          )
          .filter(
            (item) =>
              item.before &&
              item.after
          )
          .sort(
            (a, b) =>
              a.order -
              b.order
          )
      : [];


  /*
   * Backend /api/gallery/published
   * should already return only published items.
   *
   * If no gallery items exist,
   * do not show an empty section.
   */

  if (
    transformations.length ===
    0
  ) {
    return null;
  }


  return (
    <section
      id="gallery"
      className="
        relative
        overflow-hidden
        bg-[#F4F9FF]
        px-[5%]
        py-24
        lg:py-28
      "
    >

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-56
          top-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#41B6FF]/10
          blur-[140px]
        "
      />


      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-52
          bottom-[-100px]
          h-[480px]
          w-[480px]
          rounded-full
          bg-[#0062CC]/[0.07]
          blur-[150px]
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
            gap-8
            lg:grid-cols-[1.05fr_.95fr]
            lg:items-end
          "
        >

          {/* LEFT */}

          <motion.div
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
            whileInView={{
              opacity:
                1,

              y:
                0,
            }}
            viewport={{
              once:
                true,

              amount:
                0.4,
            }}
            transition={{
              duration:
                0.6,
            }}
          >

            {/* LABEL */}

            <div
              className="
                flex
                items-center
                gap-3
                text-[#0062CC]
              "
            >
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-[0_10px_30px_rgba(0,98,204,.08)]
                "
              >
                <WandSparkles
                  size={15}
                />
              </div>


              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.2em]
                "
              >
                Before & After
              </span>
            </div>


            {/* HEADING */}

            <h2
              className="
                mt-6
                max-w-[850px]
                font-barlowCond
                text-[clamp(3rem,5.8vw,5.8rem)]
                font-black
                uppercase
                leading-[.9]
                text-[#001F5C]
              "
            >
              See the care.

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
                See the difference.
              </span>
            </h2>

          </motion.div>


          {/* RIGHT */}

          <motion.div
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
            whileInView={{
              opacity:
                1,

              y:
                0,
            }}
            viewport={{
              once:
                true,

              amount:
                0.4,
            }}
            transition={{
              duration:
                0.6,

              delay:
                0.08,
            }}
          >

            <p
              className="
                max-w-[600px]
                text-[1rem]
                leading-[1.85]
                text-slate-500
              "
            >
              Drag the comparison bar to explore the full before and after
              result. Each transformation highlights the care and finishing
              behind the Rapid experience.
            </p>


            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                border-t
                border-[#001F5C]/[0.08]
                pt-5
              "
            >
              <Sparkles
                size={15}
                className="
                  text-[#0084E3]
                "
              />


              <span
                className="
                  text-[.85rem]
                  font-bold
                  text-[#001F5C]/60
                "
              >
                Drag left or right to compare.
              </span>
            </div>

          </motion.div>

        </div>


        {/* ===================================================
            GRID
        =================================================== */}

        <div
          className="
            mt-14
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-6
          "
        >
          {transformations
            .slice(
              0,
              5
            )
            .map(
              (
                item,
                index
              ) => (
                <TransformationCard
                  key={
                    item.id
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
    </section>
  );
}


/* =========================================================
   TRANSFORMATION CARD
========================================================= */

function TransformationCard({
  item,
  index,
  reduceMotion,
}) {

  /*
   * Keep your original 5-item layout:
   *
   * 1 2 3
   *   4 5
   */

  const gridClass =
    index <
    3
      ? "lg:col-span-2"

      : index ===
        3
      ? "lg:col-span-2 lg:col-start-2"

      : "lg:col-span-2";


  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity:
                0,

              y:
                20,
            }
      }
      whileInView={{
        opacity:
          1,

        y:
          0,
      }}
      viewport={{
        once:
          true,

        amount:
          0.2,
      }}
      transition={{
        duration:
          0.55,

        delay:
          index *
          0.06,
      }}
      className={`
        group
        overflow-hidden
        rounded-[26px]
        border
        border-[#001F5C]/[0.06]
        bg-white
        shadow-[0_18px_55px_rgba(0,31,92,.045)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_24px_65px_rgba(0,31,92,.08)]

        ${gridClass}
      `}
    >

      {/* BEFORE / AFTER */}

      <BeforeAfterSlider
        before={
          item.before
        }
        after={
          item.after
        }
        title={
          item.title
        }
      />


      {/* ===================================================
          CARD INFO
      =================================================== */}

      <div
        className="
          flex
          items-end
          justify-between
          gap-4
          p-5
        "
      >
        <div>

          {/* CATEGORY */}

          {item.category && (
            <div
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[.16em]
                text-[#0084E3]
              "
            >
              {item.category}
            </div>
          )}


          {/* TITLE */}

          <h3
            className="
              mt-2
              text-[1.15rem]
              font-black
              tracking-[-.025em]
              text-[#001F5C]
            "
          >
            {item.title}
          </h3>

        </div>


        {/* ARROW */}

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#EEF6FF]
            text-[#0062CC]
            transition-all
            duration-300
            group-hover:bg-[#0062CC]
            group-hover:text-white
          "
        >
          <ArrowRight
            size={14}
          />
        </div>

      </div>

    </motion.article>
  );
}


/* =========================================================
   BEFORE / AFTER SLIDER
========================================================= */

function BeforeAfterSlider({
  before,
  after,
  title,
}) {
  const containerRef =
    useRef(
      null
    );


  const [
    position,
    setPosition,
  ] =
    useState(
      50
    );


  const [
    dragging,
    setDragging,
  ] =
    useState(
      false
    );


  /* =======================================================
     UPDATE POSITION
  ======================================================= */

  function updatePosition(
    clientX
  ) {
    if (
      !containerRef.current
    ) {
      return;
    }


    const rect =
      containerRef.current.getBoundingClientRect();


    const x =
      clientX -
      rect.left;


    const percentage =
      Math.min(
        100,

        Math.max(
          0,

          (
            x /
            rect.width
          ) *
            100
        )
      );


    setPosition(
      percentage
    );
  }


  /* =======================================================
     POINTER DOWN
  ======================================================= */

  function handlePointerDown(
    event
  ) {
    setDragging(
      true
    );


    event.currentTarget
      .setPointerCapture?.(
        event.pointerId
      );


    updatePosition(
      event.clientX
    );
  }


  /* =======================================================
     POINTER MOVE
  ======================================================= */

  function handlePointerMove(
    event
  ) {
    if (
      !dragging
    ) {
      return;
    }


    updatePosition(
      event.clientX
    );
  }


  /* =======================================================
     POINTER UP
  ======================================================= */

  function handlePointerUp(
    event
  ) {
    setDragging(
      false
    );


    if (
      event?.currentTarget &&
      event?.pointerId !==
        undefined
    ) {
      try {
        event.currentTarget
          .releasePointerCapture?.(
            event.pointerId
          );
      } catch {
        /*
         * Pointer capture may already
         * have been released.
         */
      }
    }
  }


  return (
    <div
      ref={
        containerRef
      }
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerUp
      }
      className="
        relative
        h-[280px]
        w-full
        cursor-ew-resize
        select-none
        overflow-hidden
        touch-none
        sm:h-[300px]
        xl:h-[330px]
      "
    >

      {/* ===================================================
          AFTER IMAGE
      =================================================== */}

      <Image
        src={
          after
        }
        alt={`${title} after`}
        fill
        draggable={
          false
        }
        sizes="
          (max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          34vw
        "
        className="
          pointer-events-none
          object-cover
        "
      />


      {/* AFTER LABEL */}

      <div
        className="
          absolute
          right-3
          top-3
          z-10
          rounded-full
          bg-white
          px-3
          py-1.5
          text-[8px]
          font-black
          uppercase
          tracking-[.14em]
          text-[#0062CC]
          shadow-[0_8px_25px_rgba(0,31,92,.12)]
        "
      >
        After
      </div>


      {/* ===================================================
          BEFORE IMAGE
      =================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-0
          overflow-hidden
        "
        style={{
          width:
            `${position}%`,
        }}
      >
        <div
          className="
            absolute
            inset-y-0
            left-0
          "
          style={{
            width:
              containerRef.current
                ? `${containerRef.current.offsetWidth}px`
                : "100vw",
          }}
        >
          <Image
            src={
              before
            }
            alt={`${title} before`}
            fill
            draggable={
              false
            }
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              34vw
            "
            className="
              pointer-events-none
              object-cover
            "
          />
        </div>
      </div>


      {/* BEFORE LABEL */}

      <div
        className="
          absolute
          left-3
          top-3
          z-20
          rounded-full
          bg-[#001F5C]/60
          px-3
          py-1.5
          text-[8px]
          font-black
          uppercase
          tracking-[.14em]
          text-white
          backdrop-blur-md
        "
      >
        Before
      </div>


      {/* ===================================================
          BOTTOM GRADIENT
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-[5]
          bg-gradient-to-t
          from-[#001F5C]/20
          via-transparent
          to-transparent
        "
      />


      {/* ===================================================
          SLIDER LINE
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          top-0
          z-30
          w-[2px]
          -translate-x-1/2
          bg-white
          shadow-[0_0_15px_rgba(0,0,0,.18)]
        "
        style={{
          left:
            `${position}%`,
        }}
      />


      {/* ===================================================
          DRAG HANDLE
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          top-1/2
          z-40
          flex
          h-11
          w-11
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border-[3px]
          border-white
          bg-[#0062CC]
          text-white
          shadow-[0_8px_25px_rgba(0,31,92,.28)]
        "
        style={{
          left:
            `${position}%`,
        }}
      >
        <GripVertical
          size={17}
        />
      </div>

    </div>
  );
}