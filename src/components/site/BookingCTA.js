"use client";

import Link from "next/link";

import {
  ArrowUpRight,
  CalendarCheck2,
  Clock3,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";


const FEATURES = [
  {
    icon: CalendarCheck2,
    title: "Easy Online Booking",
    text: "Choose your service and place your booking online in just a few steps.",
  },
  {
    icon: Truck,
    title: "Pickup Convenience",
    text: "Arrange garment care around your schedule with convenient service options.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Care",
    text: "Your garments are handled with consistent processes and attention to detail.",
  },
];


export default function BookingCTA({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  const heading =
    data.heading ||
    "Your garments deserve";


  const highlight =
    data.highlight ||
    "better care.";


  const description =
    data.description ||
    "Book your Rapid Laundromat service online and experience professional garment care built around quality, convenience and reliability.";


  return (
    <section
      id="booking"
      className="
        relative
        overflow-hidden
        bg-[#001F5C]
        px-[5%]
        py-24
        lg:py-32
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
          inset-0
          bg-gradient-to-br
          from-[#00163F]
          via-[#001F5C]
          to-[#003A87]
        "
      />


      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[160px]
          -top-[180px]
          h-[620px]
          w-[620px]
          rounded-full
          bg-[#0084E3]/20
          blur-[140px]
        "
      />


      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[220px]
          left-[12%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#41B6FF]/10
          blur-[150px]
        "
      />


      {/* DECORATIVE TEXT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-5
          bottom-[-35px]
          hidden
          font-barlowCond
          text-[14vw]
          font-black
          uppercase
          leading-none
          tracking-[-.05em]
          text-white/[0.025]
          xl:block
        "
      >
        Book
      </div>


      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
        "
      >

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div
          className="
            grid
            gap-14
            lg:grid-cols-[1.08fr_.92fr]
            lg:items-center
            lg:gap-20
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
                amount: 0.4,
              }}
              transition={{
                duration: 0.55,
              }}
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
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.07]
                "
              >
                <Sparkles
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
                Ready When You Are
              </span>
            </motion.div>


            <motion.h2
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
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
                duration: 0.65,
                delay: 0.05,
              }}
              className="
                mt-6
                max-w-[900px]
                font-barlowCond
                text-[clamp(3.5rem,7vw,7.2rem)]
                font-black
                uppercase
                leading-[.86]
                tracking-[-.03em]
                text-white
              "
            >
              {heading}

              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#41B6FF]
                  via-[#8CD5FF]
                  to-white
                  bg-clip-text
                  text-transparent
                "
              >
                {highlight}
              </span>
            </motion.h2>


            <motion.p
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
                amount: 0.35,
              }}
              transition={{
                duration: 0.6,
                delay: 0.12,
              }}
              className="
                mt-7
                max-w-[700px]
                text-[1rem]
                leading-[1.9]
                text-white/65
              "
            >
              {description}
            </motion.p>


            {/* CTA */}

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
                amount: 0.3,
              }}
              transition={{
                duration: 0.6,
                delay: 0.18,
              }}
              className="
                mt-10
                flex
                flex-wrap
                items-center
                gap-5
              "
            >

              <a
                href="https://online.rapidlaundromat.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  min-h-[56px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-8
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.15em]
                  text-[#001F5C]
                  shadow-[0_20px_55px_rgba(0,0,0,.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_25px_70px_rgba(0,0,0,.25)]
                "
              >
                Book Online

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>


              <div
                className="
                  flex
                  items-center
                  gap-3
                  text-white/55
                "
              >
                <Clock3
                  size={15}
                  className="text-[#41B6FF]"
                />

                <span
                  className="
                    text-[.85rem]
                    font-bold
                  "
                >
                  Open daily · 7:00 AM – 7:00 PM
                </span>
              </div>

            </motion.div>

          </div>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 28,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              delay: 0.08,
            }}
          >

            <div
              className="
                overflow-hidden
                rounded-[34px]
                border
                border-white/10
                bg-white/[0.055]
                p-7
                backdrop-blur-xl
                sm:p-9
              "
            >

              <div
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.18em]
                  text-[#41B6FF]
                "
              >
                The Rapid Experience
              </div>


              <h3
                className="
                  mt-4
                  max-w-[500px]
                  text-[clamp(1.8rem,3vw,2.8rem)]
                  font-black
                  leading-[1.08]
                  tracking-[-.045em]
                  text-white
                "
              >
                Professional garment care, made easier.
              </h3>


              <div
                className="
                  mt-8
                  divide-y
                  divide-white/[0.08]
                  border-y
                  border-white/[0.08]
                "
              >

                {FEATURES.map(
                  (
                    item,
                    index
                  ) => {

                    const Icon =
                      item.icon;


                    return (
                      <div
                        key={
                          item.title
                        }
                        className="
                          flex
                          gap-4
                          py-5
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
                            rounded-[14px]
                            bg-white/[0.07]
                            text-[#41B6FF]
                          "
                        >
                          <Icon
                            size={18}
                          />
                        </div>


                        <div>

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <div
                              className="
                                text-[.92rem]
                                font-black
                                text-white
                              "
                            >
                              {item.title}
                            </div>

                            <span
                              className="
                                text-[8px]
                                font-black
                                tracking-[.15em]
                                text-white/20
                              "
                            >
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          </div>


                          <p
                            className="
                              mt-2
                              max-w-[440px]
                              text-[.85rem]
                              leading-[1.7]
                              text-white/50
                            "
                          >
                            {item.text}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>


              {/* SECOND BOOKING ACTION */}

              <a
                href="https://online.rapidlaundromat.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  mt-7
                  flex
                  items-center
                  justify-between
                  gap-5
                  rounded-[20px]
                  bg-[#0062CC]
                  px-5
                  py-4
                  transition-all
                  duration-300
                  hover:bg-[#0084E3]
                "
              >

                <div>
                  <div
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[.15em]
                      text-[#A8E1FF]
                    "
                  >
                    Start Your Booking
                  </div>

                  <div
                    className="
                      mt-1
                      text-[.95rem]
                      font-black
                      text-white
                    "
                  >
                    Continue to Rapid Online
                  </div>
                </div>


                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#0062CC]
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <ArrowUpRight
                    size={15}
                  />
                </div>

              </a>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}