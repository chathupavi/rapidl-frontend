"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Send,
  X,
} from "lucide-react";


/* ============================================================
   API URL
============================================================ */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* ============================================================
   BUSINESS TYPES
============================================================ */

const BUSINESS_TYPES = [
  "Hotel / Hospitality",
  "Corporate Office",
  "Factory / Industrial",
  "Restaurant / Café",
  "Healthcare / Wellness",
  "School / Educational Institute",
  "Other",
];


/* ============================================================
   SERVICE FREQUENCIES
============================================================ */

const SERVICE_FREQUENCIES = [
  "Daily",
  "Several times a week",
  "Weekly",
  "Fortnightly",
  "Monthly",
  "One-time requirement",
  "Not sure yet",
];


/* ============================================================
   CONTROL CLASS
============================================================ */

const CONTROL_CLASS = `
  mt-2 block min-h-12 w-full rounded-xl
  border border-slate-200 bg-slate-50
  px-4 py-3 text-sm text-slate-900
  outline-none transition
  placeholder:text-slate-400
  focus:border-[#0062CC] focus:bg-white
  focus:ring-4 focus:ring-blue-100
  disabled:cursor-not-allowed disabled:opacity-60
`;


/* ============================================================
   FIELD
============================================================ */

function Field({
  label,
  name,
  required = false,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={`proposal-${name}`}
        className="
          text-xs
          font-bold
          text-slate-700
        "
      >
        {label}

        {required && (
          <span
            className="
              ml-1
              text-[#0062CC]
            "
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}


/* ============================================================
   COMMERCIAL PROPOSAL MODAL
============================================================ */

export default function CommercialProposalModal({
  open,
  onClose,
}) {
  const dialogRef =
    useRef(null);

  const submittingRef =
    useRef(false);


  /* =========================================================
     FORM STATUS
  ========================================================= */

  const [
    status,
    setStatus,
  ] =
    useState("idle");


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    successMessage,
    setSuccessMessage,
  ] =
    useState("");


  const [
    enquiryId,
    setEnquiryId,
  ] =
    useState("");


  /* =========================================================
     BRANCHES
  ========================================================= */

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
    useState(false);


  const [
    branchError,
    setBranchError,
  ] =
    useState("");


  const submitting =
    status ===
    "submitting";


  const success =
    status ===
    "success";


  /* =========================================================
     SELECTED BRANCH
  ========================================================= */

  const selectedBranch =
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
    null;


  /* =========================================================
     OPEN / CLOSE DIALOG
  ========================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }


    const dialog =
      dialogRef.current;


    if (!dialog) {
      return;
    }


    const previousFocus =
      document.activeElement;


    const previousOverflow =
      document.body.style
        .overflow;


    setStatus(
      "idle"
    );

    setError(
      ""
    );

    setSuccessMessage(
      ""
    );

    setEnquiryId(
      ""
    );

    setSelectedBranchId(
      ""
    );


    if (!dialog.open) {
      dialog.showModal();
    }


    document.body.style.overflow =
      "hidden";


    return () => {
      if (dialog.open) {
        dialog.close();
      }


      document.body.style.overflow =
        previousOverflow;


      if (
        previousFocus instanceof
        HTMLElement
      ) {
        previousFocus.focus();
      }
    };
  }, [open]);


  /* =========================================================
     LOAD ACTIVE BRANCHES
  ========================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }


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


        if (!response.ok) {
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


        if (cancelled) {
          return;
        }


        setBranches(
          activeBranches
        );


        /*
         * Auto-select first active
         * branch if desired.
         *
         * I recommend NOT doing this for
         * commercial enquiries so the
         * customer consciously chooses
         * the nearest branch.
         */


        if (
          activeBranches.length ===
          0
        ) {
          setBranchError(
            "No active branches are currently available."
          );
        }
      } catch (error) {
        console.error(
          "Failed to load commercial proposal branches:",
          error
        );


        if (!cancelled) {
          setBranches(
            []
          );


          setBranchError(
            "Unable to load branches. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
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
  }, [open]);


  /* =========================================================
     CLOSE
  ========================================================= */

  function requestClose() {
    if (
      !submittingRef.current
    ) {
      onClose();
    }
  }


  /* =========================================================
     SUBMIT
  ========================================================= */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();


    if (
      submittingRef.current
    ) {
      return;
    }


    if (!API_URL) {
      setError(
        "Unable to connect to the server."
      );

      return;
    }


    const form =
      event.currentTarget;


    const formData =
      new FormData(
        form
      );


    /* =======================================================
       BUILD SECURE PAYLOAD

       IMPORTANT:
       We only send branchId.
       We do NOT send branch email.
    ======================================================= */

    const payload = {
      branchId:
        String(
          formData.get(
            "nearestBranch"
          ) ||
          ""
        ).trim(),

      companyName:
        String(
          formData.get(
            "companyName"
          ) ||
          ""
        ).trim(),

      contactName:
        String(
          formData.get(
            "contactName"
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
        )
          .trim()
          .toLowerCase(),

      businessType:
        String(
          formData.get(
            "businessType"
          ) ||
          ""
        ).trim(),

      location:
        String(
          formData.get(
            "location"
          ) ||
          ""
        ).trim(),

      volume:
        String(
          formData.get(
            "volume"
          ) ||
          ""
        ).trim(),

      frequency:
        String(
          formData.get(
            "frequency"
          ) ||
          ""
        ).trim(),

      requirements:
        String(
          formData.get(
            "requirements"
          ) ||
          ""
        ).trim(),

      notes:
        String(
          formData.get(
            "notes"
          ) ||
          ""
        ).trim(),
    };


    /* =======================================================
       REQUIRED VALIDATION
    ======================================================= */

    const requiredFields = [
      "branchId",
      "companyName",
      "contactName",
      "phone",
      "email",
      "businessType",
      "location",
      "requirements",
      "frequency",
    ];


    if (
      requiredFields.some(
        (
          field
        ) =>
          !payload[field]
      )
    ) {
      setError(
        "Please complete all required fields."
      );

      return;
    }


    /* =======================================================
       EMAIL VALIDATION
    ======================================================= */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailPattern.test(
        payload.email
      )
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }


    /* =======================================================
       VALIDATE SELECTED BRANCH
    ======================================================= */

    const branch =
      branches.find(
        (
          item
        ) =>
          String(
            item.id
          ) ===
          String(
            payload.branchId
          )
      );


    if (!branch) {
      setError(
        "Please select a valid nearest branch."
      );

      return;
    }


    /* =======================================================
       START SUBMISSION
    ======================================================= */

    submittingRef.current =
      true;


    setStatus(
      "submitting"
    );


    setError(
      ""
    );


    setSuccessMessage(
      ""
    );


    try {
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


      let result =
        null;


      try {
        result =
          await response.json();
      } catch {
        result =
          null;
      }


      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
          "Unable to submit your commercial enquiry."
        );
      }


      /*
       * Reset all form fields.
       */

      form.reset();


      setSelectedBranchId(
        ""
      );


      setEnquiryId(
        result.enquiryId ||
        ""
      );


      setSuccessMessage(
        result.message ||
        "Your commercial proposal request has been received successfully."
      );


      setStatus(
        "success"
      );
    } catch (error) {
      console.error(
        "Commercial proposal submission failed:",
        error
      );


      setStatus(
        "idle"
      );


      setError(
        error?.message ||
        "We couldn’t submit your enquiry. Please try again."
      );
    } finally {
      submittingRef.current =
        false;
    }
  }


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <dialog
      ref={
        dialogRef
      }

      aria-labelledby="proposal-title"

      aria-describedby="proposal-description"

      onCancel={
        (
          event
        ) => {
          event.preventDefault();

          requestClose();
        }
      }

      className="
        fixed
        inset-0
        m-auto

        max-h-[92dvh]

        w-[calc(100%-1.5rem)]
        max-w-5xl

        overflow-y-auto

        rounded-[28px]

        border-0

        bg-white

        p-0

        text-slate-900

        shadow-[0_35px_120px_rgba(0,20,60,0.35)]

        backdrop:bg-[#001537]/70
        backdrop:backdrop-blur-sm
      "
    >

      <div
        className="
          relative
          grid

          lg:grid-cols-[0.72fr_1fr]
        "
      >

        {/* ===================================================
            CLOSE BUTTON
        =================================================== */}

        <button
          type="button"

          onClick={
            requestClose
          }

          disabled={
            submitting
          }

          aria-label="Close proposal form"

          className="
            absolute
            right-4
            top-4
            z-20

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-full

            border
            border-slate-200

            bg-white

            text-slate-600

            shadow-sm

            transition

            hover:bg-slate-100

            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-blue-200

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <X
            size={19}
            aria-hidden="true"
          />
        </button>


        {/* ===================================================
            BRAND PANEL
        =================================================== */}

        <aside
          className="
            relative
            overflow-hidden

            bg-gradient-to-br
            from-[#003B91]
            via-[#0062CC]
            to-[#0084E3]

            px-7
            py-9

            text-white

            sm:px-9

            lg:p-10
          "
        >

          <div
            aria-hidden="true"

            className="
              pointer-events-none

              absolute
              -bottom-24
              -left-24

              h-80
              w-80

              rounded-full

              bg-sky-300/20

              blur-3xl
            "
          />


          <div
            className="
              relative
            "
          >

            <div
              className="
                inline-flex

                rounded-full

                border
                border-white/20

                bg-white/10

                px-3
                py-2

                text-[9px]
                font-black
                uppercase
                tracking-[0.18em]
              "
            >
              Rapid Business Care
            </div>


            <h2
              id="proposal-title"

              className="
                mt-7

                max-w-xs

                pr-8

                font-barlowCond

                text-4xl
                font-black
                uppercase

                leading-[0.95]

                tracking-tight

                sm:text-5xl

                lg:pr-0
                lg:text-6xl
              "
            >
              Your business.

              <span
                className="
                  mt-2
                  block
                  text-[#A8E1FF]
                "
              >
                Our care.
              </span>
            </h2>


            <p
              id="proposal-description"

              className="
                mt-5
                max-w-sm

                text-sm
                leading-7

                text-white/80
              "
            >
              Tell us what your business needs. Our team will help prepare a
              commercial laundry proposal around your volume, schedule and
              service requirements.
            </p>


            <div
              className="
                mt-9

                hidden

                space-y-5

                lg:block
              "
            >

              {[
                "Service plans around your operation",
                "Flexible pickup and delivery",
                "Care for uniforms, linen and more",
              ].map(
                (
                  text
                ) => (
                  <div
                    key={
                      text
                    }

                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >

                    <CheckCircle2
                      size={18}

                      aria-hidden="true"

                      className="
                        mt-0.5
                        shrink-0

                        text-[#A8E1FF]
                      "
                    />


                    <span
                      className="
                        text-sm
                        leading-6

                        text-white/90
                      "
                    >
                      {
                        text
                      }
                    </span>

                  </div>
                )
              )}

            </div>


            <div
              className="
                mt-9

                flex
                items-start
                gap-3

                rounded-2xl

                border
                border-white/15

                bg-white/10

                p-4
              "
            >

              <MapPin
                size={20}

                aria-hidden="true"

                className="
                  mt-0.5
                  shrink-0
                  text-[#A8E1FF]
                "
              />


              <p
                className="
                  text-xs
                  leading-6

                  text-white/85
                "
              >
                Select your nearest branch so your enquiry can be securely
                routed to the correct Rapid team.
              </p>

            </div>


            {/* SELECTED BRANCH PREVIEW */}

            {selectedBranch && (
              <div
                className="
                  mt-4

                  rounded-2xl

                  border
                  border-white/15

                  bg-[#001F5C]/25

                  p-4
                "
              >

                <div
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[.15em]

                    text-[#A8E1FF]
                  "
                >
                  Selected Branch
                </div>


                <div
                  className="
                    mt-2

                    text-sm
                    font-black

                    text-white
                  "
                >
                  {
                    selectedBranch.shortName ||
                    selectedBranch.name
                  }
                </div>


                {selectedBranch.address && (
                  <div
                    className="
                      mt-1

                      text-xs
                      leading-5

                      text-white/60
                    "
                  >
                    {
                      selectedBranch.address
                    }
                  </div>
                )}

              </div>
            )}

          </div>

        </aside>


        {/* ===================================================
            FORM PANEL
        =================================================== */}

        <div
          className="
            px-6
            py-8

            sm:p-9

            lg:p-10
          "
        >

          {success ? (
            /* =================================================
               SUCCESS
            ================================================= */

            <div
              role="status"

              className="
                flex
                min-h-[440px]
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <div
                className="
                  flex
                  h-20
                  w-20

                  items-center
                  justify-center

                  rounded-full

                  bg-emerald-50

                  text-emerald-600
                "
              >
                <CheckCircle2
                  size={38}
                  aria-hidden="true"
                />
              </div>


              <h3
                className="
                  mt-6

                  text-2xl
                  font-black

                  text-[#001F5C]
                "
              >
                Enquiry received.
              </h3>


              <p
                className="
                  mt-3

                  max-w-sm

                  text-sm
                  leading-7

                  text-slate-500
                "
              >
                {
                  successMessage ||
                  "Thank you for choosing Rapid. Our commercial team will contact you to discuss your requirements."
                }
              </p>


              {enquiryId && (
                <div
                  className="
                    mt-4

                    rounded-full

                    bg-[#F5FAFF]

                    px-4
                    py-2

                    text-[9px]
                    font-bold

                    text-[#0062CC]
                  "
                >
                  Reference:{" "}
                  {
                    enquiryId
                  }
                </div>
              )}


              <button
                type="button"

                onClick={
                  requestClose
                }

                className="
                  mt-7

                  inline-flex
                  min-h-12

                  items-center
                  justify-center
                  gap-2

                  rounded-full

                  bg-[#0062CC]

                  px-7

                  text-sm
                  font-bold

                  text-white

                  transition

                  hover:bg-[#004DAA]

                  focus-visible:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-blue-200
                "
              >
                Done

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />
              </button>

            </div>
          ) : (
            <>
              {/* =================================================
                  FORM HEADER
              ================================================= */}

              <div
                className="
                  pr-10
                "
              >

                <p
                  className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.18em]

                    text-[#0062CC]
                  "
                >
                  Request a proposal
                </p>


                <h3
                  className="
                    mt-2

                    text-2xl
                    font-black

                    tracking-tight

                    text-[#001F5C]
                  "
                >
                  Let&apos;s build your service plan.
                </h3>


                <p
                  className="
                    mt-2

                    text-xs
                    leading-6

                    text-slate-500
                  "
                >
                  Fields marked * are required.
                </p>

              </div>


              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={
                  handleSubmit
                }

                className="
                  mt-7
                "
              >

                <fieldset
                  disabled={
                    submitting
                  }

                  className="
                    min-w-0
                  "
                >

                  <div
                    className="
                      grid
                      gap-5

                      sm:grid-cols-2
                    "
                  >

                    {/* COMPANY */}

                    <div
                      className="
                        sm:col-span-2
                      "
                    >
                      <Field
                        label="Company / business name"

                        name="companyName"

                        required
                      >
                        <input
                          id="proposal-companyName"

                          name="companyName"

                          autoComplete="organization"

                          required

                          maxLength={160}

                          placeholder="Your business name"

                          className={
                            CONTROL_CLASS
                          }
                        />
                      </Field>
                    </div>


                    {/* CONTACT PERSON */}

                    <Field
                      label="Contact person"

                      name="contactName"

                      required
                    >
                      <input
                        id="proposal-contactName"

                        name="contactName"

                        autoComplete="name"

                        required

                        maxLength={100}

                        placeholder="Full name"

                        className={
                          CONTROL_CLASS
                        }
                      />
                    </Field>


                    {/* PHONE */}

                    <Field
                      label="Phone / WhatsApp"

                      name="phone"

                      required
                    >
                      <input
                        id="proposal-phone"

                        name="phone"

                        type="tel"

                        autoComplete="tel"

                        required

                        maxLength={30}

                        placeholder="+94 77 123 4567"

                        className={
                          CONTROL_CLASS
                        }
                      />
                    </Field>


                    {/* EMAIL */}

                    <Field
                      label="Email address"

                      name="email"

                      required
                    >
                      <input
                        id="proposal-email"

                        name="email"

                        type="email"

                        autoComplete="email"

                        required

                        maxLength={254}

                        placeholder="you@company.com"

                        className={
                          CONTROL_CLASS
                        }
                      />
                    </Field>


                    {/* BUSINESS TYPE */}

                    <Field
                      label="Business type"

                      name="businessType"

                      required
                    >
                      <select
                        id="proposal-businessType"

                        name="businessType"

                        required

                        defaultValue=""

                        className={
                          CONTROL_CLASS
                        }
                      >

                        <option
                          value=""

                          disabled
                        >
                          Select business type
                        </option>


                        {BUSINESS_TYPES.map(
                          (
                            type
                          ) => (
                            <option
                              key={
                                type
                              }

                              value={
                                type
                              }
                            >
                              {
                                type
                              }
                            </option>
                          )
                        )}

                      </select>
                    </Field>


                    {/* =================================================
                        NEAREST BRANCH
                    ================================================= */}

                    <div
                      className="
                        rounded-2xl

                        border
                        border-blue-100

                        bg-blue-50/60

                        p-4

                        sm:col-span-2
                      "
                    >

                      <Field
                        label="Select our nearest branch to you"

                        name="nearestBranch"

                        required
                      >

                        <select
                          id="proposal-nearestBranch"

                          name="nearestBranch"

                          required

                          value={
                            selectedBranchId
                          }

                          onChange={
                            (
                              event
                            ) => {
                              setSelectedBranchId(
                                event.target.value
                              );

                              setError(
                                ""
                              );
                            }
                          }

                          disabled={
                            loadingBranches ||
                            branches.length ===
                              0
                          }

                          aria-describedby="proposal-branch-help"

                          className={`
                            ${CONTROL_CLASS}
                            bg-white
                          `}
                        >

                          {loadingBranches ? (
                            <option
                              value=""
                            >
                              Loading branches...
                            </option>
                          ) : branches.length >
                            0 ? (
                            <>
                              <option
                                value=""

                                disabled
                              >
                                Select your nearest branch
                              </option>


                              {branches.map(
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
                              )}
                            </>
                          ) : (
                            <option
                              value=""
                            >
                              No active branches available
                            </option>
                          )}

                        </select>

                      </Field>


                      <p
                        id="proposal-branch-help"

                        className="
                          mt-2

                          text-xs
                          leading-5

                          text-slate-500
                        "
                      >
                        Choose the branch closest to your business location.
                        Your proposal request will be routed to that branch.
                      </p>


                      {selectedBranch && (
                        <div
                          className="
                            mt-3

                            rounded-xl

                            border
                            border-[#0062CC]/10

                            bg-white

                            px-4
                            py-3
                          "
                        >

                          <div
                            className="
                              text-[9px]
                              font-black
                              uppercase
                              tracking-[.12em]

                              text-[#0062CC]
                            "
                          >
                            Proposal will be sent to
                          </div>


                          <div
                            className="
                              mt-1

                              text-sm
                              font-black

                              text-[#001F5C]
                            "
                          >
                            {
                              selectedBranch.shortName ||
                              selectedBranch.name
                            }
                          </div>


                          {selectedBranch.address && (
                            <div
                              className="
                                mt-1

                                text-xs
                                leading-5

                                text-slate-500
                              "
                            >
                              {
                                selectedBranch.address
                              }
                            </div>
                          )}

                        </div>
                      )}


                      {branchError && (
                        <p
                          className="
                            mt-2

                            text-xs
                            font-semibold

                            text-red-600
                          "
                        >
                          {
                            branchError
                          }
                        </p>
                      )}

                    </div>


                    {/* LOCATION */}

                    <div
                      className="
                        sm:col-span-2
                      "
                    >
                      <Field
                        label="Business location / pickup address"

                        name="location"

                        required
                      >
                        <input
                          id="proposal-location"

                          name="location"

                          autoComplete="street-address"

                          required

                          maxLength={300}

                          placeholder="Street address and city"

                          className={
                            CONTROL_CLASS
                          }
                        />
                      </Field>
                    </div>


                    {/* VOLUME */}

                    <Field
                      label="Estimated weekly volume"

                      name="volume"
                    >
                      <input
                        id="proposal-volume"

                        name="volume"

                        maxLength={100}

                        placeholder="e.g. 100 kg, 200 items, or unsure"

                        className={
                          CONTROL_CLASS
                        }
                      />
                    </Field>


                    {/* FREQUENCY */}

                    <Field
                      label="Service frequency"

                      name="frequency"

                      required
                    >
                      <select
                        id="proposal-frequency"

                        name="frequency"

                        required

                        defaultValue=""

                        className={
                          CONTROL_CLASS
                        }
                      >

                        <option
                          value=""

                          disabled
                        >
                          Select frequency
                        </option>


                        {SERVICE_FREQUENCIES.map(
                          (
                            frequency
                          ) => (
                            <option
                              key={
                                frequency
                              }

                              value={
                                frequency
                              }
                            >
                              {
                                frequency
                              }
                            </option>
                          )
                        )}

                      </select>
                    </Field>


                    {/* REQUIREMENTS */}

                    <div
                      className="
                        sm:col-span-2
                      "
                    >
                      <Field
                        label="Laundry requirements"

                        name="requirements"

                        required
                      >
                        <textarea
                          id="proposal-requirements"

                          name="requirements"

                          required

                          rows={3}

                          maxLength={2000}

                          placeholder="Tell us about your uniforms, linen, towels or other laundry needs."

                          className={`
                            ${CONTROL_CLASS}
                            resize-y
                          `}
                        />
                      </Field>
                    </div>


                    {/* NOTES */}

                    <div
                      className="
                        sm:col-span-2
                      "
                    >
                      <Field
                        label="Additional requirements"

                        name="notes"
                      >
                        <textarea
                          id="proposal-notes"

                          name="notes"

                          rows={2}

                          maxLength={2000}

                          placeholder="Preferred pickup times, turnaround or special care instructions."

                          className={`
                            ${CONTROL_CLASS}
                            resize-y
                          `}
                        />
                      </Field>
                    </div>

                  </div>


                  {/* =================================================
                      FORM ERROR
                  ================================================= */}

                  {error && (
                    <p
                      role="alert"

                      className="
                        mt-5

                        rounded-xl

                        border
                        border-red-100

                        bg-red-50

                        px-4
                        py-3

                        text-sm
                        leading-6

                        text-red-700
                      "
                    >
                      {
                        error
                      }
                    </p>
                  )}


                  {/* =================================================
                      SUBMIT
                  ================================================= */}

                  <button
                    type="submit"

                    disabled={
                      submitting ||
                      loadingBranches ||
                      branches.length ===
                        0 ||
                      !selectedBranchId
                    }

                    className="
                      mt-6

                      inline-flex
                      min-h-[54px]
                      w-full

                      items-center
                      justify-center
                      gap-3

                      rounded-full

                      bg-[#0062CC]

                      px-6

                      text-xs
                      font-black
                      uppercase
                      tracking-[0.12em]

                      text-white

                      shadow-lg
                      shadow-blue-600/15

                      transition

                      hover:bg-[#004DAA]

                      focus-visible:outline-none
                      focus-visible:ring-4
                      focus-visible:ring-blue-200

                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >

                    {submitting ? (
                      <>
                        <LoaderCircle
                          size={18}

                          aria-hidden="true"

                          className="
                            animate-spin
                            motion-reduce:animate-none
                          "
                        />

                        Sending enquiry…
                      </>
                    ) : loadingBranches ? (
                      <>
                        <LoaderCircle
                          size={18}

                          aria-hidden="true"

                          className="
                            animate-spin
                            motion-reduce:animate-none
                          "
                        />

                        Loading branches…
                      </>
                    ) : (
                      <>
                        Submit proposal request

                        <Send
                          size={16}
                          aria-hidden="true"
                        />
                      </>
                    )}

                  </button>


                  <p
                    className="
                      mt-4

                      text-center

                      text-[11px]
                      leading-5

                      text-slate-500
                    "
                  >
                    Submitting this form requests a commercial proposal. It
                    does not confirm a booking or service agreement.
                  </p>

                </fieldset>

              </form>
            </>
          )}

        </div>

      </div>

    </dialog>
  );
}