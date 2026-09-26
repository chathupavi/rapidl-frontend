import Link from "next/link";

import {
  ArrowLeft,
  Database,
  Eye,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";


export const metadata = {
  title: "Privacy Policy | Rapid Laundromat",
  description:
    "Learn how Rapid Laundromat collects, uses, stores and protects information submitted through our website and digital services.",

  alternates: {
    canonical:
      "https://rapidlaundromat.lk/privacy",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "Privacy Policy | Rapid Laundromat",

    description:
      "How Rapid Laundromat handles customer and website information.",

    url:
      "https://rapidlaundromat.lk/privacy",

    siteName:
      "Rapid Laundromat",

    type:
      "website",
  },
};


const sections = [
  {
    icon: Eye,

    title:
      "Information We Collect",

    content: (
      <>
        <p>
          When you use the Rapid Laundromat website, we may collect
          information that you voluntarily provide to us.
        </p>

        <ul>
          <li>
            Name
          </li>

          <li>
            Email address
          </li>

          <li>
            Telephone number
          </li>

          <li>
            Selected Rapid Laundromat branch
          </li>

          <li>
            Contact or enquiry messages
          </li>

          <li>
            Commercial or business enquiry information
          </li>

          <li>
            Company or organization details provided through
            commercial enquiry forms
          </li>
        </ul>

        <p>
          We may also collect general technical and usage information,
          such as browser type, device type, pages visited, approximate
          location, referral source and website interaction data through
          analytics technologies.
        </p>
      </>
    ),
  },

  {
    icon: UserRoundCheck,

    title:
      "How We Use Information",

    content: (
      <>
        <p>
          Information collected through the website may be used to:
        </p>

        <ul>
          <li>
            Respond to customer enquiries
          </li>

          <li>
            Direct enquiries to the appropriate Rapid Laundromat branch
          </li>

          <li>
            Respond to commercial and business service requests
          </li>

          <li>
            Improve our website, services and customer experience
          </li>

          <li>
            Understand customer interest and website usage
          </li>

          <li>
            Support branch operations and future service improvements
          </li>

          <li>
            Maintain website security and prevent misuse
          </li>
        </ul>
      </>
    ),
  },

  {
    icon: Database,

    title:
      "Storage of Information",

    content: (
      <>
        <p>
          Customer enquiries and related website information may be
          stored securely using cloud-based systems used by Rapid
          Laundromat.
        </p>

        <p>
          Our website infrastructure may use services such as Firebase,
          Firestore, Firebase Storage and Google Cloud services for
          website operation, data processing and secure storage.
        </p>

        <p>
          We take reasonable technical and organizational measures to
          protect information against unauthorized access, alteration,
          disclosure or loss.
        </p>
      </>
    ),
  },

  {
    icon: Mail,

    title:
      "Customer Enquiries & Email",

    content: (
      <>
        <p>
          When you submit a contact or commercial enquiry, the
          information you provide may be stored and forwarded to the
          relevant Rapid Laundromat team or branch so that we can
          respond to your request.
        </p>

        <p>
          Email notifications may be generated automatically when an
          enquiry is submitted.
        </p>

        <p>
          We use this information only for legitimate business,
          customer-service and operational purposes.
        </p>
      </>
    ),
  },

  {
    icon: FileText,

    title:
      "Analytics & Website Performance",

    content: (
      <>
        <p>
          Rapid Laundromat may use analytics tools such as Google
          Analytics to understand how visitors interact with the
          website.
        </p>

        <p>
          Analytics information may include pages visited, general
          device information, traffic sources, approximate geographic
          location and website interactions.
        </p>

        <p>
          This information is used to improve website performance,
          customer experience, marketing effectiveness and service
          availability.
        </p>
      </>
    ),
  },

  {
    icon: ShieldCheck,

    title:
      "Google Sign-In",

    content: (
      <>
        <p>
          Google Sign-In may be available for authorized Rapid
          Laundromat administrators.
        </p>

        <p>
          When an authorized administrator signs in using Google, we
          may receive basic account information provided by Google,
          such as the account email address, display name and a secure
          authentication identifier.
        </p>

        <p>
          Google Sign-In is used only for authentication and
          administrative access. It does not provide Rapid Laundromat
          with access to the administrator&apos;s Gmail messages,
          Google Drive files or other private Google account content
          unless an additional service is separately authorized.
        </p>
      </>
    ),
  },

  {
    icon: LockKeyhole,

    title:
      "Data Security",

    content: (
      <>
        <p>
          We use reasonable security measures designed to protect the
          website and information processed through it.
        </p>

        <p>
          These measures may include secure HTTPS connections,
          authenticated administrative access, access controls,
          server-side validation, rate limiting and protected cloud
          services.
        </p>

        <p>
          However, no internet-based system can guarantee absolute
          security.
        </p>
      </>
    ),
  },
];


export default function PrivacyPolicyPage() {
  return (
    <main
      className="
        min-h-screen
        bg-[#F6FAFF]
        text-[#001F5C]
      "
    >

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#001F5C]/[0.06]
          bg-white
          px-[5%]
          pb-16
          pt-10

          lg:pb-24
          lg:pt-14
        "
      >

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-36
            -top-36
            h-[430px]
            w-[430px]
            rounded-full
            bg-[#41B6FF]/10
            blur-[130px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-44
            -left-32
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#0062CC]/[0.06]
            blur-[140px]
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-[1200px]
          "
        >

          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-black
              uppercase
              tracking-[.15em]
              text-[#0062CC]
              transition

              hover:text-[#0084E3]
            "
          >
            <ArrowLeft
              size={14}
            />

            Back to Rapid
          </Link>


          <div
            className="
              mt-12
              max-w-[850px]
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#0062CC]/10
                bg-[#EEF6FF]
                px-4
                py-2
                text-[9px]
                font-black
                uppercase
                tracking-[.18em]
                text-[#0062CC]
              "
            >
              <ShieldCheck
                size={14}
              />

              Privacy & Data
            </div>


            <h1
              className="
                mt-6
                font-barlowCond
                text-[clamp(3.7rem,8vw,7rem)]
                font-black
                uppercase
                leading-[.86]
                tracking-[-.04em]
                text-[#001F5C]
              "
            >
              Privacy
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
                Policy.
              </span>
            </h1>


            <p
              className="
                mt-7
                max-w-[720px]
                text-[1rem]
                leading-[1.9]
                text-slate-500
              "
            >
              Rapid Laundromat respects your privacy. This policy
              explains how information may be collected, used and
              protected when you interact with our website and digital
              services.
            </p>


            <div
              className="
                mt-8
                text-[11px]
                font-bold
                uppercase
                tracking-[.12em]
                text-slate-400
              "
            >
              Last updated: September 2026
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section
        className="
          px-[5%]
          py-16

          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1200px]
            gap-10

            lg:grid-cols-[280px_1fr]
            lg:gap-20
          "
        >

          <aside>
            <div
              className="
                lg:sticky
                lg:top-10
              "
            >
              <div
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.18em]
                  text-[#0084E3]
                "
              >
                Our Commitment
              </div>

              <h2
                className="
                  mt-3
                  text-2xl
                  font-black
                  tracking-[-.03em]
                  text-[#001F5C]
                "
              >
                Your information deserves responsible care.
              </h2>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                We aim to collect only the information reasonably
                required to provide our services, respond to customers
                and operate our digital platform.
              </p>
            </div>
          </aside>


          {/* =================================================
              POLICY SECTIONS
          ================================================= */}

          <div
            className="
              space-y-5
            "
          >
            {sections.map(
              (
                section,
                index
              ) => {
                const Icon =
                  section.icon;

                return (
                  <article
                    key={
                      section.title
                    }
                    className="
                      rounded-[28px]
                      border
                      border-[#001F5C]/[0.06]
                      bg-white
                      p-7
                      shadow-[0_20px_60px_rgba(0,31,92,.035)]

                      sm:p-9
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-5
                      "
                    >
                      <div
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          rounded-[16px]
                          bg-[#EEF6FF]
                          text-[#0062CC]
                        "
                      >
                        <Icon
                          size={19}
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
                            text-[8px]
                            font-black
                            uppercase
                            tracking-[.16em]
                            text-[#0084E3]
                          "
                        >
                          Section{" "}
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </div>


                        <h2
                          className="
                            mt-2
                            text-[1.35rem]
                            font-black
                            tracking-[-.03em]
                            text-[#001F5C]
                          "
                        >
                          {
                            section.title
                          }
                        </h2>


                        <div
                          className="
                            prose
                            prose-slate
                            mt-5
                            max-w-none

                            text-[.92rem]
                            leading-7

                            prose-p:text-slate-500

                            prose-ul:my-4
                            prose-ul:space-y-2

                            prose-li:text-slate-500

                            marker:text-[#0084E3]
                          "
                        >
                          {
                            section.content
                          }
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }
            )}


            {/* =================================================
                SHARING
            ================================================= */}

            <article
              className="
                rounded-[28px]
                border
                border-[#001F5C]/[0.06]
                bg-white
                p-7

                sm:p-9
              "
            >
              <h2
                className="
                  text-[1.35rem]
                  font-black
                  tracking-[-.03em]
                  text-[#001F5C]
                "
              >
                Sharing of Information
              </h2>

              <div
                className="
                  mt-5
                  space-y-4
                  text-[.92rem]
                  leading-7
                  text-slate-500
                "
              >
                <p>
                  Rapid Laundromat does not sell customer personal
                  information.
                </p>

                <p>
                  Information may be shared with authorized Rapid
                  Laundromat personnel, branches and technology service
                  providers where reasonably necessary to operate the
                  website, respond to enquiries and provide services.
                </p>

                <p>
                  Information may also be disclosed where required by
                  applicable law or a lawful request from an authorized
                  authority.
                </p>
              </div>
            </article>


            {/* =================================================
                RETENTION
            ================================================= */}

            <article
              className="
                rounded-[28px]
                border
                border-[#001F5C]/[0.06]
                bg-white
                p-7

                sm:p-9
              "
            >
              <h2
                className="
                  text-[1.35rem]
                  font-black
                  tracking-[-.03em]
                  text-[#001F5C]
                "
              >
                Data Retention
              </h2>

              <p
                className="
                  mt-5
                  text-[.92rem]
                  leading-7
                  text-slate-500
                "
              >
                Information may be retained for as long as reasonably
                necessary to respond to enquiries, maintain business
                records, support customer service, maintain security,
                resolve disputes and meet applicable legal or
                operational requirements.
              </p>
            </article>


            {/* =================================================
                CUSTOMER RIGHTS
            ================================================= */}

            <article
              className="
                rounded-[28px]
                border
                border-[#001F5C]/[0.06]
                bg-white
                p-7

                sm:p-9
              "
            >
              <h2
                className="
                  text-[1.35rem]
                  font-black
                  tracking-[-.03em]
                  text-[#001F5C]
                "
              >
                Your Privacy Requests
              </h2>

              <p
                className="
                  mt-5
                  text-[.92rem]
                  leading-7
                  text-slate-500
                "
              >
                If you would like to ask about personal information
                you have submitted through our website, request a
                correction, or request deletion where applicable,
                please contact Rapid Laundromat.
              </p>
            </article>


            {/* =================================================
                UPDATES
            ================================================= */}

            <article
              className="
                rounded-[28px]
                border
                border-[#001F5C]/[0.06]
                bg-white
                p-7

                sm:p-9
              "
            >
              <h2
                className="
                  text-[1.35rem]
                  font-black
                  tracking-[-.03em]
                  text-[#001F5C]
                "
              >
                Changes to This Policy
              </h2>

              <p
                className="
                  mt-5
                  text-[.92rem]
                  leading-7
                  text-slate-500
                "
              >
                We may update this Privacy Policy when our website,
                services, technology or data practices change. The
                latest version will be published on this page with an
                updated revision date.
              </p>
            </article>

          </div>
        </div>
      </section>


      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <section
        className="
          px-[5%]
          pb-20

          lg:pb-28
        "
      >
        <div
          className="
            mx-auto
            max-w-[1200px]
            overflow-hidden
            rounded-[34px]
            bg-[#001F5C]
            px-7
            py-10
            text-white

            sm:px-10
            lg:px-14
            lg:py-14
          "
        >
          <div
            className="
              grid
              gap-8

              md:grid-cols-[1fr_auto]
              md:items-center
            "
          >
            <div>
              <div
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.18em]
                  text-[#69C6FF]
                "
              >
                Privacy Questions
              </div>

              <h2
                className="
                  mt-3
                  max-w-[600px]
                  text-[clamp(1.8rem,4vw,3rem)]
                  font-black
                  leading-tight
                  tracking-[-.04em]
                "
              >
                Need more information about how your data is handled?
              </h2>

              <p
                className="
                  mt-4
                  max-w-[620px]
                  text-sm
                  leading-7
                  text-white/60
                "
              >
                Contact Rapid Laundromat through our website and our
                team will assist with your privacy-related enquiry.
              </p>
            </div>


            <Link
              href="/#contact"
              className="
                inline-flex
                min-h-[50px]
                items-center
                justify-center
                rounded-full
                bg-white
                px-7
                text-[10px]
                font-black
                uppercase
                tracking-[.15em]
                text-[#001F5C]
                transition

                hover:-translate-y-0.5
                hover:bg-[#EAF6FF]
              "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}