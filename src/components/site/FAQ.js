"use client";

import {
  ChevronDown,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  useState,
} from "react";


const DEFAULT_FAQS = [
  {
    id: 1,
    question:
      "How do I book a laundry service?",
    answer:
      "You can place your booking online through Rapid Online. Select the service you need, provide your details and follow the booking steps.",
  },
  {
    id: 2,
    question:
      "Do you offer pickup and delivery?",
    answer:
      "Pickup and delivery options may be available depending on your location and selected service. You can check the available options when placing your booking.",
  },
  {
    id: 3,
    question:
      "What types of garments do you handle?",
    answer:
      "Rapid Laundromat provides professional care for everyday garments and selected specialist items. The appropriate treatment depends on the fabric, garment construction and care requirements.",
  },
  {
    id: 4,
    question:
      "Do you provide stain treatment?",
    answer:
      "Yes. Selected garments can receive targeted stain treatment as part of the professional care process. Results can vary depending on the stain type, fabric and how long the stain has been present.",
  },
  {
    id: 5,
    question:
      "Do you offer services for businesses?",
    answer:
      "Yes. Rapid provides commercial laundry solutions for businesses with recurring laundry, uniform, linen and garment-care requirements.",
  },
  {
    id: 6,
    question:
      "What are your opening hours?",
    answer:
      "Rapid Laundromat is open daily from 7:30 AM to 6:00 PM.",
  },
  {
    id: 7,
    question:
      "Where are your branches located?",
    answer:
      "Rapid currently operates locations in Kurunegala and Kandy. Visit the Locations section to explore individual branches and directions.",
  },
];


export default function FAQ({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();

  const [openItem, setOpenItem] =
    useState(0);


  const faqs =
    Array.isArray(data.items) &&
    data.items.length > 0
      ? data.items
      : DEFAULT_FAQS;


  return (
    <section
      id="faq"
      className="
        relative
        overflow-hidden
        bg-white
        px-[5%]
        py-24
        lg:py-32
      "
    >

      {/* SOFT BACKGROUND DETAIL */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-56
          top-10
          h-[470px]
          w-[470px]
          rounded-full
          bg-[#41B6FF]/[0.07]
          blur-[150px]
        "
      />


      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-56
          bottom-[-160px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#0062CC]/[0.05]
          blur-[160px]
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
            lg:grid-cols-[.9fr_1.1fr]
            lg:items-end
          "
        >

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
            }}
          >

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
                  bg-[#EEF6FF]
                "
              >
                <HelpCircle
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
                Frequently Asked Questions
              </span>
            </div>


            <h2
              className="
                mt-6
                max-w-[820px]
                font-barlowCond
                text-[clamp(3.2rem,6vw,6.2rem)]
                font-black
                uppercase
                leading-[.89]
                text-[#001F5C]
              "
            >
              Questions?

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
                We keep it simple.
              </span>
            </h2>

          </motion.div>


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
              delay: 0.08,
            }}
            className="
              lg:pb-1
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
              Find quick answers about booking, garment care, pickup and
              delivery, commercial services and visiting a Rapid location.
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
                className="text-[#0084E3]"
              />

              <span
                className="
                  text-[.85rem]
                  font-bold
                  text-[#001F5C]/60
                "
              >
                Clear answers. Less uncertainty.
              </span>
            </div>
          </motion.div>

        </div>


        {/* ===================================================
            FAQ LIST
        =================================================== */}

        <div
          className="
            mt-16
            border-t
            border-[#001F5C]/[0.09]
          "
        >

          {faqs.map(
            (
              item,
              index
            ) => {

              const isOpen =
                openItem === index;


              return (
                <motion.div
                  key={
                    item.id ||
                    index
                  }

                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
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
                    duration: 0.45,
                    delay:
                      index * 0.035,
                  }}

                  className="
                    border-b
                    border-[#001F5C]/[0.09]
                  "
                >

                  <button
                    type="button"

                    onClick={() =>
                      setOpenItem(
                        isOpen
                          ? -1
                          : index
                      )
                    }

                    aria-expanded={
                      isOpen
                    }

                    className="
                      group
                      flex
                      w-full
                      items-start
                      justify-between
                      gap-8
                      py-7
                      text-left
                      sm:py-8
                    "
                  >

                    <div
                      className="
                        flex
                        min-w-0
                        items-start
                        gap-5
                      "
                    >

                      {/* NUMBER */}

                      <span
                        className={`
                          mt-1
                          hidden
                          shrink-0
                          text-[9px]
                          font-black
                          tracking-[.18em]
                          transition-colors
                          duration-300
                          sm:block

                          ${
                            isOpen
                              ? "text-[#0084E3]"
                              : "text-[#001F5C]/20"
                          }
                        `}
                      >
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>


                      {/* QUESTION */}

                      <h3
                        className={`
                          max-w-[1000px]
                          text-[1.05rem]
                          font-black
                          leading-[1.5]
                          tracking-[-.015em]
                          transition-colors
                          duration-300
                          sm:text-[1.2rem]

                          ${
                            isOpen
                              ? "text-[#0062CC]"
                              : "text-[#001F5C]"
                          }
                        `}
                      >
                        {item.question}
                      </h3>

                    </div>


                    {/* ICON */}

                    <div
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-300

                        ${
                          isOpen
                            ? "bg-[#0062CC] text-white"
                            : "bg-[#F3F8FF] text-[#0062CC] group-hover:bg-[#E8F3FF]"
                        }
                      `}
                    >
                      <ChevronDown
                        size={17}

                        className={`
                          transition-transform
                          duration-300

                          ${
                            isOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    </div>

                  </button>


                  {/* ANSWER */}

                  <AnimatePresence
                    initial={false}
                  >
                    {isOpen && (
                      <motion.div
                        initial={
                          reduceMotion
                            ? {
                                opacity: 1,
                              }
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }

                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}

                        exit={
                          reduceMotion
                            ? {
                                opacity: 0,
                              }
                            : {
                                height: 0,
                                opacity: 0,
                              }
                        }

                        transition={{
                          duration: 0.35,
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
                        <div
                          className="
                            pb-8
                            sm:pl-[53px]
                            sm:pr-20
                          "
                        >
                          <p
                            className="
                              max-w-[920px]
                              text-[.95rem]
                              leading-[1.85]
                              text-slate-500
                            "
                          >
                            {item.answer}
                          </p>


                          <div
                            className="
                              mt-6
                              h-[2px]
                              w-12
                              rounded-full
                              bg-gradient-to-r
                              from-[#0062CC]
                              to-[#41B6FF]
                            "
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            }
          )}

        </div>


        {/* ===================================================
            BOTTOM NOTE
        =================================================== */}

        <div
          className="
            mt-10
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <div
              className="
                text-[.92rem]
                font-black
                text-[#001F5C]
              "
            >
              Still have a question?
            </div>

            <p
              className="
                mt-1
                text-[.85rem]
                text-slate-400
              "
            >
              Our team can help you with service, booking and garment-care
              questions.
            </p>
          </div>


          <a
            href="#contact"
            className="
              self-start
              text-[10px]
              font-black
              uppercase
              tracking-[.15em]
              text-[#0062CC]
              transition-colors
              hover:text-[#0084E3]
              sm:self-auto
            "
          >
            Contact Rapid →
          </a>
        </div>

      </div>

    </section>
  );
}