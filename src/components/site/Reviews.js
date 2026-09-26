"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Star,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";


/* =========================================================
   API URL
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   CONSTANTS
========================================================= */

const REVIEWS_PER_PAGE =
  3;


/* =========================================================
   GOOGLE BRAND COLORS
========================================================= */

const GOOGLE_STAR_COLOR =
  "#FABB05";

const GOOGLE_STAR_EMPTY =
  "#DADCE0";


/* =========================================================
   GOOGLE G ICON
========================================================= */

function GoogleIcon({
  size = 22,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
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
        fill="#34A853"
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
        fill="#FBBC05"
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
        fill="#EA4335"
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
   GOOGLE STAR
========================================================= */

function GoogleStar({
  filled = true,
  size = 14,
}) {
  return (
    <Star
      size={size}
      strokeWidth={1.7}
      fill={
        filled
          ? GOOGLE_STAR_COLOR
          : "transparent"
      }
      stroke={
        filled
          ? GOOGLE_STAR_COLOR
          : GOOGLE_STAR_EMPTY
      }
    />
  );
}


/* =========================================================
   REVIEWS
========================================================= */

export default function Reviews({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  /* =======================================================
     STATES
  ======================================================= */

  const [
    firestoreReviews,
    setFirestoreReviews,
  ] =
    useState([]);


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    currentPage,
    setCurrentPage,
  ] =
    useState(0);


  /* =======================================================
     LOAD REVIEWS
  ======================================================= */

  useEffect(() => {
    let cancelled =
      false;


    async function loadReviews() {
      try {
        setLoading(
          true
        );

        setError(
          ""
        );


        if (!API_URL) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is missing."
          );
        }


        const response =
          await fetch(
            `${API_URL}/api/reviews`,
            {
              method:
                "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache:
                "no-store",
            }
          );


        if (!response.ok) {
          throw new Error(
            `Review request failed with status ${response.status}`
          );
        }


        const result =
          await response.json();


        if (
          !result?.success ||
          !Array.isArray(
            result.reviews
          )
        ) {
          throw new Error(
            "Invalid review response."
          );
        }


        if (cancelled) {
          return;
        }


        setFirestoreReviews(
          result.reviews
        );

        setCurrentPage(
          0
        );
      } catch (error) {
        console.error(
          "Failed to load reviews:",
          error
        );


        if (!cancelled) {
          setError(
            "Unable to load customer reviews."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(
            false
          );
        }
      }
    }


    loadReviews();


    return () => {
      cancelled =
        true;
    };
  }, []);


  /* =======================================================
     NORMALIZE REVIEWS
  ======================================================= */

  const reviews =
    useMemo(
      () =>
        firestoreReviews
          .map(
            (
              review
            ) => ({
              id:
                review.id,

              name:
                review.author ||
                "Customer",

              location:
                review.branch ||
                "",

              rating:
                Math.max(
                  0,
                  Math.min(
                    5,
                    Number(
                      review.rating ||
                        5
                    )
                  )
                ),

              text:
                review.comment ||
                "",

              source:
                review.source ||
                "",

              reply:
                review.reply ||
                "",

              publishedAt:
                review.publishedAt ||
                review.createdAt ||
                null,
            })
          )
          .filter(
            (
              review
            ) =>
              review.text
          ),
      [
        firestoreReviews,
      ]
    );


  /* =======================================================
     AVERAGE RATING
  ======================================================= */

  const averageRating =
    useMemo(
      () => {
        if (
          reviews.length ===
          0
        ) {
          return "5.0";
        }


        const total =
          reviews.reduce(
            (
              sum,
              review
            ) =>
              sum +
              Number(
                review.rating ||
                  0
              ),
            0
          );


        return (
          total /
          reviews.length
        ).toFixed(
          1
        );
      },
      [
        reviews,
      ]
    );


  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        reviews.length /
          REVIEWS_PER_PAGE
      )
    );


  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages - 1
    );


  const startIndex =
    safeCurrentPage *
    REVIEWS_PER_PAGE;


  const visibleReviews =
    reviews.slice(
      startIndex,
      startIndex +
        REVIEWS_PER_PAGE
    );


  const visibleStart =
    reviews.length > 0
      ? startIndex + 1
      : 0;


  const visibleEnd =
    Math.min(
      startIndex +
        REVIEWS_PER_PAGE,
      reviews.length
    );


  function goPrevious() {
    setCurrentPage(
      (
        previous
      ) =>
        previous === 0
          ? totalPages - 1
          : previous - 1
    );
  }


  function goNext() {
    setCurrentPage(
      (
        previous
      ) =>
        previous >=
        totalPages - 1
          ? 0
          : previous + 1
    );
  }


  /* =======================================================
     EMPTY SECTION
  ======================================================= */

  if (
    !loading &&
    !error &&
    reviews.length === 0
  ) {
    return null;
  }


  return (
    <section
      id="reviews"
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
          BACKGROUND DETAILS
      ===================================================== */}

      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute
          -left-56
          top-20

          h-[500px]
          w-[500px]

          rounded-full

          bg-[#41B6FF]/[0.07]

          blur-[140px]
        "
      />


      <div
        aria-hidden="true"

        className="
          pointer-events-none

          absolute
          -right-52
          bottom-[-160px]

          h-[560px]
          w-[560px]

          rounded-full

          bg-[#0062CC]/[0.06]

          blur-[150px]
        "
      />


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

            lg:grid-cols-[1.05fr_.95fr]
            lg:items-end
          "
        >

          {/* LEFT */}

          <div>

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 14,
                    }
              }

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
                amount: 0.5,
              }}

              transition={{
                duration: 0.55,
              }}

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

                  bg-[#EEF6FF]
                "
              >
                <Star
                  size={15}
                  fill="currentColor"
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
                Customer Stories
              </span>

            </motion.div>


            <motion.h2
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 18,
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
                duration: 0.6,
                delay: 0.05,
              }}

              className="
                mt-6

                max-w-[900px]

                font-barlowCond

                text-[clamp(3.2rem,6.5vw,6.6rem)]

                font-black
                uppercase

                leading-[.88]

                tracking-[-.025em]

                text-[#001F5C]
              "
            >
              Trusted by people.

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
                Remembered for care.
              </span>
            </motion.h2>

          </div>


          {/* RIGHT */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 18,
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
              duration: 0.6,
              delay: 0.12,
            }}

            className="
              lg:pb-2
            "
          >

            <p
              className="
                max-w-[620px]

                text-[1rem]

                leading-[1.9]

                text-slate-500
              "
            >
              Great garment care is not only about how clothes look when
              they return. It is about trust, consistency, convenience and
              knowing every item has been treated with professional care.
            </p>


            {/* =================================================
                GOOGLE RATING STRIP
            ================================================= */}

            <div
              className="
                mt-8

                flex
                flex-wrap

                items-center

                gap-x-7
                gap-y-5

                border-t
                border-[#001F5C]/[0.08]

                pt-6
              "
            >

              <div
                className="
                  flex
                  items-center

                  gap-4
                "
              >

                {/* GOOGLE ICON */}

                <div
                  className="
                    flex

                    h-11
                    w-11

                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#001F5C]/[0.07]

                    bg-white

                    shadow-[0_6px_20px_rgba(0,31,92,.07)]
                  "
                >
                  <GoogleIcon
                    size={22}
                  />
                </div>


                {/* RATING NUMBER */}

                <div
                  className="
                    text-[2.3rem]

                    font-black

                    tracking-[-.05em]

                    text-[#001F5C]
                  "
                >
                  {
                    averageRating
                  }
                </div>


                <div>

                  {/* GOOGLE COLORED STARS */}

                  <div
                    className="
                      flex
                      items-center

                      gap-[3px]
                    "
                  >
                    {[1, 2, 3, 4, 5].map(
                      (
                        star
                      ) => (
                        <GoogleStar
                          key={
                            star
                          }

                          size={15}

                          filled={
                            star <=
                            Math.round(
                              Number(
                                averageRating
                              )
                            )
                          }
                        />
                      )
                    )}
                  </div>


                  <div
                    className="
                      mt-1.5

                      flex
                      items-center

                      gap-1.5
                    "
                  >

                    <span
                      className="
                        text-[10px]

                        font-black
                        uppercase

                        tracking-[.13em]

                        text-slate-400
                      "
                    >
                      {
                        reviews.length
                      }{" "}
                      {
                        reviews.length === 1
                          ? "Customer Review"
                          : "Customer Reviews"
                      }
                    </span>

                  </div>

                </div>

              </div>


              <div
                className="
                  hidden

                  h-10
                  w-px

                  bg-[#001F5C]/10

                  sm:block
                "
              />


              <div
                className="
                  max-w-[250px]

                  text-[.84rem]

                  font-bold

                  leading-6

                  text-[#001F5C]/65
                "
              >
                Consistently focused on quality, care and customer
                experience.
              </div>

            </div>

          </motion.div>

        </div>


        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <div
            className="
              mt-16

              grid

              border-y
              border-[#001F5C]/[0.08]

              lg:grid-cols-3
            "
          >
            {[1, 2, 3].map(
              (
                item
              ) => (
                <div
                  key={
                    item
                  }

                  className="
                    min-h-[430px]

                    animate-pulse

                    px-1
                    py-10

                    sm:px-5
                    lg:px-9
                  "
                >

                  <div
                    className="
                      h-3
                      w-10

                      rounded-full

                      bg-slate-100
                    "
                  />


                  <div
                    className="
                      mt-10

                      h-8
                      w-8

                      rounded-full

                      bg-slate-100
                    "
                  />


                  <div
                    className="
                      mt-7

                      space-y-3
                    "
                  >
                    <div
                      className="
                        h-5
                        w-full

                        rounded-full

                        bg-slate-100
                      "
                    />

                    <div
                      className="
                        h-5
                        w-[92%]

                        rounded-full

                        bg-slate-100
                      "
                    />

                    <div
                      className="
                        h-5
                        w-[78%]

                        rounded-full

                        bg-slate-100
                      "
                    />
                  </div>


                  <div
                    className="
                      mt-12

                      h-4
                      w-32

                      rounded-full

                      bg-slate-100
                    "
                  />

                </div>
              )
            )}
          </div>
        )}


        {/* ===================================================
            ERROR
        =================================================== */}

        {!loading &&
          error && (
          <div
            className="
              mt-14

              rounded-[22px]

              border
              border-red-500/10

              bg-red-50

              px-5
              py-4

              text-[.85rem]

              font-bold

              leading-6

              text-red-600
            "
          >
            {
              error
            }
          </div>
        )}


        {/* ===================================================
            REVIEWS
        =================================================== */}

        {!loading &&
          !error &&
          visibleReviews.length > 0 && (
          <>

            <div
              className="
                mt-16

                grid

                border-y
                border-[#001F5C]/[0.08]

                lg:grid-cols-3
              "
            >

              {visibleReviews.map(
                (
                  review,
                  index
                ) => (
                  <ReviewStory
                    key={
                      review.id ||
                      `${startIndex}-${index}`
                    }

                    review={
                      review
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


            {/* =================================================
                REVIEW NAVIGATION
            ================================================= */}

            {reviews.length >
              REVIEWS_PER_PAGE && (
              <div
                className="
                  mt-8

                  flex
                  flex-col

                  gap-5

                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                {/* COUNT */}

                <div
                  className="
                    text-[10px]

                    font-black
                    uppercase

                    tracking-[.14em]

                    text-slate-400
                  "
                >
                  Showing{" "}
                  {
                    visibleStart
                  }
                  –
                  {
                    visibleEnd
                  }{" "}
                  of{" "}
                  {
                    reviews.length
                  }{" "}
                  Reviews
                </div>


                {/* CONTROLS */}

                <div
                  className="
                    flex
                    flex-wrap

                    items-center

                    gap-3
                  "
                >

                  {/* PREVIOUS */}

                  <button
                    type="button"

                    onClick={
                      goPrevious
                    }

                    aria-label="Show previous reviews"

                    className="
                      inline-flex

                      h-11

                      items-center
                      justify-center

                      gap-2

                      rounded-full

                      border
                      border-[#001F5C]/[0.08]

                      bg-white

                      px-5

                      text-[9px]

                      font-black
                      uppercase

                      tracking-[.13em]

                      text-[#001F5C]

                      transition-all
                      duration-300

                      hover:
                      border-[#0062CC]/20

                      hover:
                      bg-[#EEF6FF]

                      hover:
                      text-[#0062CC]
                    "
                  >
                    <ArrowLeft
                      size={13}
                    />

                    Previous
                  </button>


                  {/* DOTS */}

                  <div
                    className="
                      flex
                      items-center

                      gap-2
                    "
                  >
                    {Array.from({
                      length:
                        totalPages,
                    }).map(
                      (
                        _,
                        page
                      ) => (
                        <button
                          key={
                            page
                          }

                          type="button"

                          aria-label={`Show review page ${
                            page + 1
                          }`}

                          aria-current={
                            safeCurrentPage ===
                            page
                              ? "page"
                              : undefined
                          }

                          onClick={() =>
                            setCurrentPage(
                              page
                            )
                          }

                          className={`
                            h-2

                            rounded-full

                            transition-all
                            duration-300

                            ${
                              safeCurrentPage ===
                              page
                                ? `
                                  w-7
                                  bg-[#0062CC]
                                `
                                : `
                                  w-2
                                  bg-[#001F5C]/15

                                  hover:
                                  bg-[#0062CC]/40
                                `
                            }
                          `}
                        />
                      )
                    )}
                  </div>


                  {/* NEXT */}

                  <button
                    type="button"

                    onClick={
                      goNext
                    }

                    aria-label="Show next reviews"

                    className="
                      inline-flex

                      h-11

                      items-center
                      justify-center

                      gap-2

                      rounded-full

                      bg-[#0062CC]

                      px-5

                      text-[9px]

                      font-black
                      uppercase

                      tracking-[.13em]

                      text-white

                      transition-all
                      duration-300

                      hover:
                      -translate-y-0.5

                      hover:
                      bg-[#0084E3]

                      hover:
                      shadow-[0_12px_30px_rgba(0,98,204,.18)]
                    "
                  >
                    Next

                    <ArrowRight
                      size={13}
                    />
                  </button>

                </div>

              </div>
            )}

          </>
        )}


        {/* ===================================================
            BOTTOM TRUST ROW
        =================================================== */}

        {!loading &&
          !error &&
          reviews.length > 0 && (
          <div
            className="
              mt-10

              flex
              flex-col

              gap-6

              border-b
              border-[#001F5C]/[0.08]

              pb-10

              sm:flex-row
              sm:items-center
              sm:justify-between
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

                  h-11
                  w-11

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-[#001F5C]

                  text-white
                "
              >
                <Quote
                  size={17}
                />
              </div>


              <div>

                <div
                  className="
                    text-[.92rem]

                    font-black

                    text-[#001F5C]
                  "
                >
                  Real experiences build real trust.
                </div>


                <div
                  className="
                    mt-1

                    text-[.82rem]

                    text-slate-400
                  "
                >
                  Customer feedback helps us keep raising the Rapid standard.
                </div>

              </div>

            </div>


            {data.googleReviewsUrl && (
              <a
                href={
                  data.googleReviewsUrl
                }

                target="_blank"

                rel="noopener noreferrer"

                className="
                  group

                  inline-flex

                  items-center

                  gap-2.5

                  self-start

                  text-[10px]

                  font-black
                  uppercase

                  tracking-[.14em]

                  text-[#0062CC]

                  sm:self-auto
                "
              >

                <GoogleIcon
                  size={17}
                />

                View Google Reviews

                <ArrowUpRight
                  size={14}

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
            )}

          </div>
        )}

      </div>

    </section>
  );
}


/* =========================================================
   REVIEW STORY
========================================================= */

function ReviewStory({
  review,
  index,
  reduceMotion,
}) {
  const rating =
    Math.max(
      0,
      Math.min(
        5,
        Number(
          review.rating ||
            5
        )
      )
    );


  return (
    <motion.article
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
        amount: 0.25,
      }}

      transition={{
        duration: 0.6,

        delay:
          index *
          0.08,
      }}

      className={`
        group

        relative

        min-h-[430px]

        px-1
        py-10

        sm:px-5
        lg:px-9

        ${
          index !== 0
            ? `
              border-t
              border-[#001F5C]/[0.08]

              lg:border-l
              lg:border-t-0
            `
            : ""
        }
      `}
    >

      {/* NUMBER */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div
          className="
            text-[10px]

            font-black

            tracking-[.2em]

            text-[#001F5C]/20
          "
        >
          {
            String(
              index + 1
            ).padStart(
              2,
              "0"
            )
          }
        </div>


        {/* GOOGLE BRAND */}

        {review.source
          ?.toLowerCase()
          .includes(
            "google"
          ) && (
          <div
            className="
              flex

              h-8
              w-8

              items-center
              justify-center

              rounded-full

              border
              border-[#001F5C]/[0.06]

              bg-white

              shadow-[0_4px_14px_rgba(0,31,92,.06)]
            "
          >
            <GoogleIcon
              size={16}
            />
          </div>
        )}

      </div>


      {/* QUOTE */}

      <Quote
        size={28}

        className="
          mt-10

          text-[#0084E3]
        "
      />


      {/* REVIEW */}

      <blockquote
        className="
          mt-7

          text-[clamp(1.2rem,1.8vw,1.65rem)]

          font-bold

          leading-[1.55]

          tracking-[-.025em]

          text-[#001F5C]
        "
      >
        “{review.text}”
      </blockquote>


      {/* BOTTOM */}

      <div
        className="
          mt-10

          flex

          items-end
          justify-between

          gap-5
        "
      >

        <div>

          {/* ===============================================
              GOOGLE YELLOW STARS
          =============================================== */}

          <div
            className="
              flex
              items-center

              gap-[3px]
            "
          >
            {[1, 2, 3, 4, 5].map(
              (
                star
              ) => (
                <GoogleStar
                  key={
                    star
                  }

                  size={13}

                  filled={
                    star <=
                    rating
                  }
                />
              )
            )}
          </div>


          {/* AUTHOR */}

          <div
            className="
              mt-3

              text-[.88rem]

              font-black

              capitalize

              text-[#001F5C]
            "
          >
            {
              review.name
            }
          </div>


          {/* BRANCH */}

          {review.location && (
            <div
              className="
                mt-1

                text-[10px]

                font-bold
                uppercase

                tracking-[.12em]

                text-slate-400
              "
            >
              {
                review.location
              }
            </div>
          )}


          {/* SOURCE */}

          {review.source && (
            <div
              className="
                mt-2

                flex
                items-center

                gap-1.5
              "
            >

              {review.source
                .toLowerCase()
                .includes(
                  "google"
                ) && (
                <GoogleIcon
                  size={12}
                />
              )}


              <span
                className="
                  text-[8px]

                  font-black
                  uppercase

                  tracking-[.12em]

                  text-slate-300
                "
              >
                {
                  review.source
                }
              </span>

            </div>
          )}

        </div>


        <div
          className="
            flex

            h-9
            w-9

            shrink-0

            items-center
            justify-center

            rounded-full

            border
            border-[#001F5C]/[0.08]

            text-[#0062CC]

            transition-all
            duration-300

            group-hover:
            border-[#0062CC]/20

            group-hover:
            bg-[#EEF6FF]
          "
        >
          <ArrowUpRight
            size={14}
          />
        </div>

      </div>


      {/* HOVER LINE */}

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