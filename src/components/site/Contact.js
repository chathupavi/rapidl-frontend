"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
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
   DAYS
========================================================= */

const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];


/* =========================================================
   CURRENT DAY
========================================================= */

function getTodayKey() {
  const day =
    new Date().getDay();

  return (
    DAY_KEYS[day] ||
    "monday"
  );
}


/* =========================================================
   PHONE CLEANER
========================================================= */

function normalizePhone(
  phone
) {
  if (!phone) {
    return "";
  }

  return String(
    phone
  ).replace(
    /[^\d+]/g,
    ""
  );
}


/* =========================================================
   WHATSAPP URL
========================================================= */

function getWhatsAppUrl(
  number
) {
  if (!number) {
    return null;
  }

  let cleaned =
    String(
      number
    ).replace(
      /\D/g,
      ""
    );

  /*
   * Sri Lankan local number:
   * 0771234567
   *
   * becomes:
   * 94771234567
   */

  if (
    cleaned.startsWith(
      "0"
    )
  ) {
    cleaned =
      `94${cleaned.slice(
        1
      )}`;
  }

  return `https://wa.me/${cleaned}`;
}


/* =========================================================
   CONTACT
========================================================= */

export default function Contact({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  /* =======================================================
     BRANCH STATE
  ======================================================= */

  const [
    branches,
    setBranches,
  ] =
    useState([]);

  const [
    selectedBranchId,
    setSelectedBranchId,
  ] =
    useState("");

  const [
    loadingBranches,
    setLoadingBranches,
  ] =
    useState(true);

  const [
    branchError,
    setBranchError,
  ] =
    useState("");


  /* =======================================================
     FORM STATE
  ======================================================= */

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [
    submitError,
    setSubmitError,
  ] =
    useState("");

  const [
    submitSuccess,
    setSubmitSuccess,
  ] =
    useState("");

  const [
    enquiryReference,
    setEnquiryReference,
  ] =
    useState("");


  /* =======================================================
     LOAD ACTIVE BRANCHES
  ======================================================= */

  useEffect(() => {
    let cancelled =
      false;

    async function loadBranches() {
      try {
        setLoadingBranches(
          true
        );

        setBranchError(
          ""
        );

        if (!API_URL) {
          throw new Error(
            "NEXT_PUBLIC_API_URL is missing."
          );
        }

        const response =
          await fetch(
            `${API_URL}/api/people/branches`,
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

        if (
          !response.ok
        ) {
          throw new Error(
            `Branch request failed: ${response.status}`
          );
        }

        const result =
          await response.json();

        if (
          !result?.success ||
          !Array.isArray(
            result.branches
          )
        ) {
          throw new Error(
            "Invalid branch response."
          );
        }

        const activeBranches =
          result.branches
            .filter(
              (
                branch
              ) =>
                branch.active !==
                false
            )
            .sort(
              (
                a,
                b
              ) =>
                String(
                  a.name ||
                    ""
                ).localeCompare(
                  String(
                    b.name ||
                      ""
                  )
                )
            );

        if (
          cancelled
        ) {
          return;
        }

        setBranches(
          activeBranches
        );

        if (
          activeBranches.length >
          0
        ) {
          setSelectedBranchId(
            activeBranches[0].id
          );
        } else {
          setSelectedBranchId(
            ""
          );

          setBranchError(
            "No active branches are currently available."
          );
        }
      } catch (error) {
        console.error(
          "Failed to load contact branches:",
          error
        );

        if (
          !cancelled
        ) {
          setBranches(
            []
          );

          setSelectedBranchId(
            ""
          );

          setBranchError(
            "Unable to load branch contact details."
          );
        }
      } finally {
        if (
          !cancelled
        ) {
          setLoadingBranches(
            false
          );
        }
      }
    }

    loadBranches();

    return () => {
      cancelled =
        true;
    };
  }, []);


  /* =======================================================
     SELECTED BRANCH
  ======================================================= */

  const selectedBranch =
    useMemo(
      () =>
        branches.find(
          (
            branch
          ) =>
            String(
              branch.id
            ) ===
            String(
              selectedBranchId
            )
        ) ||
        null,

      [
        branches,
        selectedBranchId,
      ]
    );


  /* =======================================================
     OPENING HOURS
  ======================================================= */

  const todayKey =
    getTodayKey();

  const openingToday =
    selectedBranch
      ?.openingHours?.[
        todayKey
      ] ||
    "Contact branch";


  /* =======================================================
     CONTACT VALUES
  ======================================================= */

  const branchPhone =
    selectedBranch?.phone ||
    "";

  const branchWhatsApp =
    selectedBranch?.whatsapp ||
    selectedBranch?.phone ||
    "";

  const branchEmail =
    selectedBranch?.email ||
    "";

  const phoneHref =
    branchPhone
      ? `tel:${normalizePhone(
          branchPhone
        )}`
      : null;

  const whatsappHref =
    getWhatsAppUrl(
      branchWhatsApp
    );

  const emailHref =
    branchEmail
      ? `mailto:${branchEmail}`
      : null;


  /* =======================================================
     CONTACT ITEMS
  ======================================================= */

  const contactItems = [
    {
      icon:
        Phone,

      label:
        "Call Us",

      value:
        branchPhone ||
        "Not available",

      href:
        phoneHref,
    },

    {
      icon:
        MessageCircle,

      label:
        "WhatsApp",

      value:
        branchWhatsApp ||
        "Not available",

      href:
        whatsappHref,

      external:
        true,
    },

    {
      icon:
        Mail,

      label:
        "Email",

      /*
       * Instead of showing the full long email,
       * show a clean professional CTA.
       *
       * The real email still exists in href.
       */

      value:
        branchEmail
          ? "Email this branch"
          : "Not available",

      href:
        emailHref,

      title:
        branchEmail ||
        undefined,

      compact:
        true,
    },

    {
      icon:
        Clock3,

      label:
        "Opening Today",

      value:
        openingToday,

      href:
        null,
    },
  ];


  /* =======================================================
     BRANCH CHANGE
  ======================================================= */

  function handleBranchChange(
    event
  ) {
    setSelectedBranchId(
      event.target.value
    );

    setSubmitError(
      ""
    );

    setSubmitSuccess(
      ""
    );

    setEnquiryReference(
      ""
    );
  }


  /* =======================================================
     SUBMIT CONTACT MESSAGE
  ======================================================= */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    if (
      submitting
    ) {
      return;
    }

    if (
      !selectedBranch
    ) {
      setSubmitError(
        "Please select a branch before sending your message."
      );

      return;
    }

    if (
      !API_URL
    ) {
      setSubmitError(
        "Unable to connect to our contact service. Please try again shortly."
      );

      return;
    }

    const form =
      event.currentTarget;

    const formData =
      new FormData(
        form
      );

    const payload = {
      enquiryType:
        "contact",

      branchId:
        selectedBranch.id,

      name:
        String(
          formData.get(
            "name"
          ) ||
            ""
        ).trim(),

      phone:
        String(
          formData.get(
            "phone"
          ) ||
            ""
        ).trim(),

      email:
        String(
          formData.get(
            "email"
          ) ||
            ""
        ).trim(),

      message:
        String(
          formData.get(
            "message"
          ) ||
            ""
        ).trim(),
    };


    /* =====================================================
       CLIENT VALIDATION
    ===================================================== */

    if (
      !payload.name ||
      !payload.phone ||
      !payload.email ||
      !payload.message
    ) {
      setSubmitError(
        "Please complete all required fields."
      );

      return;
    }


    try {
      setSubmitting(
        true
      );

      setSubmitError(
        ""
      );

      setSubmitSuccess(
        ""
      );

      setEnquiryReference(
        ""
      );


      /* ===================================================
         SEND TO BACKEND
      =================================================== */

      const response =
        await fetch(
          `${API_URL}/api/contact`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );


      /* ===================================================
         READ RESPONSE
      =================================================== */

      let result =
        null;

      try {
        result =
          await response.json();
      } catch {
        result =
          null;
      }

      console.log(
        "Contact enquiry response:",
        result
      );


      /* ===================================================
         API ERROR
      =================================================== */

      if (
        !response.ok ||
        result?.success !==
          true
      ) {
        throw new Error(
          result?.message ||
            "Unable to send your message. Please try again."
        );
      }


      /* ===================================================
         SUCCESS
      =================================================== */

      setSubmitSuccess(
        result?.message ||
          "Thank you for reaching out to Rapid Laundromat. Your message has been received successfully, and our team will contact you shortly to assist with your enquiry."
      );

      setEnquiryReference(
        result?.reference ||
          ""
      );

      form.reset();
    } catch (error) {
      console.error(
        "Contact enquiry submission failed:",
        error
      );

      setSubmitError(
        error?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setSubmitting(
        false
      );
    }
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-[#F4F9FF]
        px-[5%]
        py-24
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
          -left-52
          top-10
          h-[460px]
          w-[460px]
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
          -right-52
          bottom-[-120px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#0062CC]/[0.07]
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

        <div
          className="
            grid
            gap-12
            lg:grid-cols-[.92fr_1.08fr]
            lg:items-start
            lg:gap-20
          "
        >

          {/* =================================================
              LEFT
          ================================================= */}

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
              amount: 0.35,
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
                  bg-white
                  shadow-[0_10px_30px_rgba(0,98,204,.08)]
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
                Contact Rapid
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
              Let&apos;s make garment care

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
                effortless.
              </span>
            </h2>


            <p
              className="
                mt-7
                max-w-[620px]
                text-[1rem]
                leading-[1.9]
                text-slate-500
              "
            >
              Select your nearest Rapid Laundromat branch to view its
              direct phone, WhatsApp, email and opening hours.
            </p>


            {/* =================================================
                BRANCH SELECTOR
            ================================================= */}

            <div
              className="
                mt-9
                max-w-[620px]
              "
            >
              <label
                htmlFor="contactBranch"
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.16em]
                  text-[#001F5C]/55
                "
              >
                Select Branch
              </label>

              <div
                className="
                  relative
                  mt-2
                "
              >
                <Building2
                  size={17}
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-1/2
                    z-10
                    -translate-y-1/2
                    text-[#0062CC]
                  "
                />

                <select
                  id="contactBranch"
                  value={
                    selectedBranchId
                  }
                  onChange={
                    handleBranchChange
                  }
                  disabled={
                    loadingBranches ||
                    branches.length ===
                      0 ||
                    submitting
                  }
                  className="
                    h-[58px]
                    w-full
                    appearance-none
                    rounded-[18px]
                    border
                    border-[#001F5C]/[0.08]
                    bg-white
                    pl-12
                    pr-12
                    text-[.9rem]
                    font-black
                    text-[#001F5C]
                    outline-none
                    transition

                    focus:border-[#0062CC]/30
                    focus:ring-4
                    focus:ring-[#0062CC]/[0.05]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loadingBranches ? (
                    <option value="">
                      Loading branches...
                    </option>
                  ) : branches.length >
                    0 ? (
                    branches.map(
                      (
                        branch
                      ) => (
                        <option
                          key={
                            branch.id
                          }
                          value={
                            branch.id
                          }
                        >
                          {
                            branch.shortName ||
                            branch.name
                          }
                        </option>
                      )
                    )
                  ) : (
                    <option value="">
                      No active branches available
                    </option>
                  )}
                </select>

                <ChevronDown
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-[#0062CC]
                  "
                />
              </div>


              {selectedBranch && (
                <div
                  className="
                    mt-3
                    flex
                    items-start
                    gap-2
                    text-[.78rem]
                    leading-6
                    text-slate-500
                  "
                >
                  <MapPin
                    size={14}
                    className="
                      mt-1
                      shrink-0
                      text-[#0084E3]
                    "
                  />

                  <span>
                    {
                      selectedBranch.address ||
                      [
                        selectedBranch.district,
                        selectedBranch.province,
                      ]
                        .filter(
                          Boolean
                        )
                        .join(
                          ", "
                        )
                    }
                  </span>
                </div>
              )}


              {branchError && (
                <p
                  className="
                    mt-3
                    text-[.78rem]
                    font-semibold
                    text-red-500
                  "
                >
                  {
                    branchError
                  }
                </p>
              )}
            </div>


            {/* =================================================
                CONTACT CARDS
            ================================================= */}

            <div
              className="
                mt-8
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              {contactItems.map(
                (
                  item
                ) => {
                  const Icon =
                    item.icon;

                  const content = (
                    <>
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-[14px]
                          bg-[#EEF6FF]
                          text-[#0062CC]
                        "
                      >
                        <Icon
                          size={18}
                        />
                      </div>

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <div
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[.15em]
                            text-[#0084E3]
                          "
                        >
                          {
                            item.label
                          }
                        </div>

                        <div
                          className="
                            mt-1
                            truncate
                            text-[.9rem]
                            font-black
                            leading-6
                            text-[#001F5C]
                          "
                          title={
                            item.title ||
                            item.value
                          }
                        >
                          {
                            item.value
                          }
                        </div>

                        {item.label ===
                          "Email" &&
                          branchEmail && (
                            <div
                              className="
                                mt-1
                                truncate
                                text-[.7rem]
                                font-medium
                                text-slate-400
                              "
                              title={
                                branchEmail
                              }
                            >
                              {
                                branchEmail
                              }
                            </div>
                          )}
                      </div>
                    </>
                  );

                  if (
                    item.href
                  ) {
                    return (
                      <a
                        key={
                          item.label
                        }
                        href={
                          item.href
                        }
                        target={
                          item.external
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.external
                            ? "noopener noreferrer"
                            : undefined
                        }
                        title={
                          item.title
                        }
                        className="
                          group
                          flex
                          min-w-0
                          items-center
                          gap-4
                          rounded-[22px]
                          border
                          border-[#001F5C]/[0.06]
                          bg-white
                          p-5
                          transition-all
                          duration-300

                          hover:-translate-y-1
                          hover:border-[#0062CC]/15
                          hover:shadow-[0_18px_45px_rgba(0,31,92,.06)]
                        "
                      >
                        {
                          content
                        }
                      </a>
                    );
                  }

                  return (
                    <div
                      key={
                        item.label
                      }
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-4
                        rounded-[22px]
                        border
                        border-[#001F5C]/[0.06]
                        bg-white
                        p-5
                      "
                    >
                      {
                        content
                      }
                    </div>
                  );
                }
              )}
            </div>

          </motion.div>


          {/* =================================================
              RIGHT FORM
          ================================================= */}

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
              amount: 0.25,
            }}

            transition={{
              duration: 0.65,
              delay: 0.08,
            }}

            className="
              rounded-[34px]
              border
              border-[#001F5C]/[0.06]
              bg-white
              p-7
              shadow-[0_28px_80px_rgba(0,31,92,.055)]

              sm:p-9
              lg:p-10
            "
          >

            <div
              className="
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <div>
                <div
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[.18em]
                    text-[#0062CC]
                  "
                >
                  Send a Message
                </div>

                <h3
                  className="
                    mt-3
                    text-[clamp(1.8rem,3vw,2.7rem)]
                    font-black
                    leading-[1.08]
                    tracking-[-.045em]
                    text-[#001F5C]
                  "
                >
                  How can we help?
                </h3>
              </div>

              <div
                className="
                  hidden
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-[15px]
                  bg-[#EEF6FF]
                  text-[#0062CC]

                  sm:flex
                "
              >
                <Send
                  size={19}
                />
              </div>
            </div>


            {selectedBranch && (
              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-[18px]
                  border
                  border-[#0062CC]/[0.08]
                  bg-[#F5FAFF]
                  px-5
                  py-4
                "
              >
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
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#0062CC]
                    "
                  >
                    <Building2
                      size={15}
                    />
                  </div>

                  <div>
                    <div
                      className="
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[.15em]
                        text-[#0084E3]
                      "
                    >
                      Message To
                    </div>

                    <div
                      className="
                        mt-1
                        text-[.85rem]
                        font-black
                        text-[#001F5C]
                      "
                    >
                      {
                        selectedBranch.shortName ||
                        selectedBranch.name
                      }
                    </div>
                  </div>
                </div>

                <Check
                  size={17}
                  className="
                    text-[#0062CC]
                  "
                />
              </div>
            )}


            {submitSuccess && (
              <div
                role="status"
                className="
                  mt-6
                  rounded-[22px]
                  border
                  border-emerald-100
                  bg-emerald-50/70
                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
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
                      text-emerald-600
                      shadow-sm
                    "
                  >
                    <CheckCircle2
                      size={20}
                    />
                  </div>

                  <div
                    className="
                      min-w-0
                    "
                  >
                    <div
                      className="
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[.14em]
                        text-emerald-700
                      "
                    >
                      Message Received
                    </div>

                    <p
                      className="
                        mt-2
                        text-[.84rem]
                        leading-6
                        text-slate-600
                      "
                    >
                      {
                        submitSuccess
                      }
                    </p>

                    {enquiryReference && (
                      <div
                        className="
                          mt-4
                          inline-flex
                          flex-wrap
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-emerald-100
                          bg-white
                          px-3
                          py-2
                        "
                      >
                        <span
                          className="
                            text-[8px]
                            font-black
                            uppercase
                            tracking-[.14em]
                            text-slate-400
                          "
                        >
                          Reference
                        </span>

                        <span
                          className="
                            break-all
                            text-[.72rem]
                            font-black
                            tracking-[.03em]
                            text-[#001F5C]
                          "
                        >
                          {
                            enquiryReference
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}


            <form
              onSubmit={
                handleSubmit
              }
              className="
                mt-8
                space-y-4
              "
            >

              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >
                <Field
                  label="Your Name"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  autoComplete="name"
                  maxLength={150}
                  required
                  disabled={
                    submitting
                  }
                />

                <Field
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="+94 77 123 4567"
                  autoComplete="tel"
                  maxLength={50}
                  required
                  disabled={
                    submitting
                  }
                />
              </div>


              <Field
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={200}
                required
                disabled={
                  submitting
                }
              />


              <div>
                <label
                  htmlFor="contactMessage"
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[.15em]
                    text-[#001F5C]/55
                  "
                >
                  Message
                </label>

                <textarea
                  id="contactMessage"
                  name="message"
                  rows={5}
                  required
                  maxLength={5000}
                  disabled={
                    submitting
                  }
                  placeholder="Tell us how we can help..."
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-[18px]
                    border
                    border-[#001F5C]/[0.08]
                    bg-[#F8FBFF]
                    px-5
                    py-4
                    text-[.92rem]
                    text-[#001F5C]
                    outline-none
                    transition
                    placeholder:text-slate-400

                    focus:border-[#0062CC]/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#0062CC]/[0.05]

                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>


              {submitError && (
                <div
                  role="alert"
                  className="
                    rounded-[18px]
                    border
                    border-red-100
                    bg-red-50
                    px-5
                    py-4
                    text-[.8rem]
                    font-semibold
                    leading-6
                    text-red-600
                  "
                >
                  {
                    submitError
                  }
                </div>
              )}


              <button
                type="submit"
                disabled={
                  !selectedBranch ||
                  loadingBranches ||
                  submitting
                }
                className="
                  group
                  inline-flex
                  min-h-[52px]
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#0062CC]
                  px-7
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.15em]
                  text-white
                  transition-all
                  duration-300

                  hover:-translate-y-0.5
                  hover:bg-[#0084E3]
                  hover:shadow-[0_18px_45px_rgba(0,98,204,.20)]

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  disabled:hover:translate-y-0
                "
              >
                {submitting ? (
                  <>
                    <LoaderCircle
                      size={16}
                      className="
                        animate-spin
                        motion-reduce:animate-none
                      "
                    />

                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message

                    <ArrowUpRight
                      size={14}
                      className="
                        transition-transform
                        duration-300

                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </>
                )}
              </button>


              <p
                className="
                  text-[10px]
                  leading-5
                  text-slate-400
                "
              >
                Your message will be directed to the selected Rapid
                Laundromat branch.
              </p>

            </form>

          </motion.div>

        </div>

      </div>

    </section>
  );
}


/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  name,
  ...props
}) {
  return (
    <div>
      <label
        htmlFor={
          name
        }
        className="
          text-[9px]
          font-black
          uppercase
          tracking-[.15em]
          text-[#001F5C]/55
        "
      >
        {
          label
        }
      </label>

      <input
        id={
          name
        }
        name={
          name
        }
        {...props}
        className="
          mt-2
          h-[54px]
          w-full
          rounded-[18px]
          border
          border-[#001F5C]/[0.08]
          bg-[#F8FBFF]
          px-5
          text-[.92rem]
          text-[#001F5C]
          outline-none
          transition
          placeholder:text-slate-400

          focus:border-[#0062CC]/30
          focus:bg-white
          focus:ring-4
          focus:ring-[#0062CC]/[0.05]

          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />
    </div>
  );
}