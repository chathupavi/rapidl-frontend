"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Factory,
  Hotel,
  Shirt,
  Sparkles,
  UsersRound,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import CommercialProposalModal from "./CommercialProposalModal";

const BENEFITS = [
  "Flexible pickup & delivery schedules",
  "Consistent professional garment care",
  "Custom commercial service plans",
  "Reliable turnaround for recurring volumes",
];

const INDUSTRIES = [
  {
    icon: Hotel,
    label: "Hotels & Hospitality",
  },
  {
    icon: Building2,
    label: "Corporate Offices",
  },
  {
    icon: Factory,
    label: "Industrial & Operations",
  },
  {
    icon: Shirt,
    label: "Uniform & Apparel Care",
  },
];

// Update these to your exact branch names.
const BRANCHES = [
  {
    id: "kurunegala",
    name: "Kurunegala",
  },
  {
    id: "kandy",
    name: "Kandy",
  },
];

export default function Commercial({ data = {} }) {
  const reduceMotion = useReducedMotion();

  const [proposalOpen, setProposalOpen] = useState(false);

  const heading =
    data.heading || "Built for businesses that";

  const highlight =
    data.highlight || "cannot compromise.";

  const description =
    data.description ||
    "From staff uniforms and hospitality linen to recurring business laundry requirements, Rapid delivers professional commercial care built around consistency, reliability and operational convenience.";

  function reveal(delay = 0, amount = 0.25) {
    return {
      initial: reduceMotion
        ? false
        : { opacity: 0, y: 18 },

      whileInView: {
        opacity: 1,
        y: 0,
      },

      viewport: {
        once: true,
        amount,
      },

      transition: {
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
      },
    };
  }

  async function submitCommercialEnquiry(payload) {
    const response = await fetch("/api/commercial-enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Commercial enquiry submission failed.");
    }
  }

  return (
    <>
      <section
        id="commercial"
        aria-labelledby="commercial-heading"
        className="
          relative overflow-hidden
          bg-[#0062CC]
          px-[5%] py-20
          sm:py-24 lg:py-32
        "
      >
        {/* BACKGROUND */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0
            bg-gradient-to-br
            from-[#004DAA] via-[#0062CC] to-[#0084E3]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-[150px] -top-[180px]
            h-[620px] w-[620px]
            rounded-full bg-[#41B6FF]/30
            blur-[120px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -bottom-[230px] left-[10%]
            h-[520px] w-[520px]
            rounded-full bg-white/[0.10]
            blur-[150px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-5 bottom-[-25px] hidden
            font-barlowCond text-[15vw]
            font-black uppercase leading-none
            tracking-[-.05em] text-white/[0.035]
            xl:block
          "
        >
          Business
        </div>

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <div
            className="
              grid gap-14
              lg:grid-cols-[1.08fr_.92fr]
              lg:items-center lg:gap-16
              xl:gap-20
            "
          >
            {/* LEFT CONTENT */}

            <div className="min-w-0">
              <motion.div
                {...reveal(0, 0.5)}
                className="flex items-center gap-3 text-white/85"
              >
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full border border-white/15
                    bg-white/[0.10] backdrop-blur-md
                  "
                >
                  <Sparkles size={15} aria-hidden="true" />
                </div>

                <span
                  className="
                    text-[10px] font-black uppercase
                    leading-5 tracking-[.2em]
                  "
                >
                  Commercial Laundry Solutions
                </span>
              </motion.div>

              <motion.h2
                id="commercial-heading"
                {...reveal(0.05, 0.35)}
                className="
                  mt-6 max-w-[950px]
                  font-barlowCond
                  text-[clamp(2.75rem,7vw,7.4rem)]
                  font-black uppercase
                  leading-[.9] tracking-[-.03em]
                  text-white
                "
              >
                {heading}

                <span className="block text-[#A8E1FF]">
                  {highlight}
                </span>
              </motion.h2>

              <motion.p
                {...reveal(0.12, 0.35)}
                className="
                  mt-7 max-w-[720px]
                  text-base leading-[1.9]
                  text-white/80
                "
              >
                {description}
              </motion.p>

              {/* BENEFITS */}

              <motion.ul
                {...reveal(0.18)}
                className="
                  mt-9 grid
                  gap-x-7 gap-y-4
                  sm:grid-cols-2
                "
              >
                {BENEFITS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="
                        mt-0.5 flex h-6 w-6 shrink-0
                        items-center justify-center
                        rounded-full bg-white/[0.12]
                        text-[#A8E1FF]
                      "
                    >
                      <CheckCircle2
                        size={13}
                        aria-hidden="true"
                      />
                    </div>

                    <span
                      className="
                        text-[.9rem] font-bold
                        leading-6 text-white/85
                      "
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </motion.ul>

              {/* CALLS TO ACTION */}

              <motion.div
                {...reveal(0.24)}
                className="
                  mt-10 flex flex-col gap-3
                  sm:flex-row sm:flex-wrap
                "
              >
                <button
                  type="button"
                  onClick={() => setProposalOpen(true)}
                  aria-haspopup="dialog"
                  className="
                    group inline-flex min-h-[52px]
                    items-center justify-center gap-3
                    rounded-full bg-white px-7
                    text-[10px] font-black uppercase
                    tracking-[.14em] text-[#001F5C]
                    shadow-[0_18px_50px_rgba(0,31,92,.15)]
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_22px_60px_rgba(0,31,92,.22)]
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-[#A8E1FF]
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                  "
                >
                  Request a Proposal

                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="
                      transition-transform duration-300
                      group-hover:translate-x-1
                      motion-reduce:transform-none
                      motion-reduce:transition-none
                    "
                  />
                </button>

                <Link
                  href={data.secondaryHref || "#contact"}
                  className="
                    inline-flex min-h-[52px]
                    items-center justify-center
                    rounded-full border border-white/25
                    bg-white/[0.07] px-7
                    text-[10px] font-black uppercase
                    tracking-[.14em] text-white
                    backdrop-blur-md
                    transition-all duration-300
                    hover:border-white/40
                    hover:bg-white/[0.12]
                    focus-visible:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-[#A8E1FF]
                    motion-reduce:transition-none
                  "
                >
                  Talk to Our Team
                </Link>
              </motion.div>
            </div>

            {/* RIGHT PANEL */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: 30 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                delay: reduceMotion ? 0 : 0.1,
              }}
              className="relative min-w-0"
            >
              <div
                className="
                  relative overflow-hidden
                  rounded-[28px] border border-white/15
                  bg-[#001F5C]/[0.32] p-6
                  shadow-[0_35px_100px_rgba(0,31,92,.20)]
                  backdrop-blur-xl
                  sm:rounded-[34px] sm:p-9 lg:p-10
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    -right-20 -top-20 h-64 w-64
                    rounded-full bg-[#41B6FF]/[0.24]
                    blur-[80px]
                  "
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div
                        className="
                          text-[10px] font-black uppercase
                          leading-5 tracking-[.18em]
                          text-[#A8E1FF]
                        "
                      >
                        Built Around Your Operation
                      </div>

                      <h3
                        className="
                          mt-4 max-w-[520px]
                          text-[clamp(1.75rem,3vw,3rem)]
                          font-black leading-[1.05]
                          tracking-[-.045em] text-white
                        "
                      >
                        One service partner.
                        <br />
                        Multiple business needs.
                      </h3>
                    </div>

                    <div
                      className="
                        hidden h-[52px] w-[52px] shrink-0
                        items-center justify-center
                        rounded-[16px] border border-white/10
                        bg-white/[0.08] text-[#A8E1FF]
                        sm:flex
                      "
                    >
                      <UsersRound
                        size={21}
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* INDUSTRIES */}

                  <ul
                    className="
                      mt-9 divide-y divide-white/[0.09]
                      border-y border-white/[0.09]
                    "
                  >
                    {INDUSTRIES.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <li
                          key={item.label}
                          className="
                            group flex items-center
                            justify-between gap-4 py-5
                          "
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <div
                              className="
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-[13px]
                                bg-white/[0.07] text-[#A8E1FF]
                                transition-colors duration-300
                                group-hover:bg-white/[0.12]
                                motion-reduce:transition-none
                              "
                            >
                              <Icon
                                size={17}
                                aria-hidden="true"
                              />
                            </div>

                            <span
                              className="
                                text-[.92rem] font-black
                                leading-6 text-white
                              "
                            >
                              {item.label}
                            </span>
                          </div>

                          <span
                            aria-hidden="true"
                            className="
                              shrink-0 text-[9px] font-black
                              tracking-[.15em] text-white/40
                            "
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* BOTTOM STATEMENT */}

                  <div className="mt-8 flex items-start gap-4">
                    <div
                      aria-hidden="true"
                      className="
                        mt-2 h-2 w-2 shrink-0
                        rounded-full bg-[#41B6FF]
                        shadow-[0_0_18px_rgba(65,182,255,.8)]
                      "
                    />

                    <p
                      className="
                        max-w-[520px] text-[.86rem]
                        leading-[1.75] text-white/75
                      "
                    >
                      Commercial solutions can be structured around
                      your volume, frequency, garment type, service
                      requirements and operational schedule.
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING DETAIL */}

              <div
                className="
                  absolute -bottom-6 -left-5 hidden
                  rounded-[20px] border border-white/15
                  bg-white px-5 py-4
                  shadow-[0_24px_65px_rgba(0,31,92,.18)]
                  lg:block
                "
              >
                <div
                  className="
                    text-[9px] font-black uppercase
                    tracking-[.16em] text-[#0062CC]
                  "
                >
                  Commercial Care
                </div>

                <div
                  className="
                    mt-1 text-[.88rem]
                    font-black text-[#001F5C]
                  "
                >
                  Designed around your business.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROPOSAL FORM — REQUIRED BRANCH SELECT IS IN THE MODAL */}

      <CommercialProposalModal
        open={proposalOpen}
        onClose={() => setProposalOpen(false)}
        onSubmit={submitCommercialEnquiry}
        branches={BRANCHES}
      />
    </>
  );
}