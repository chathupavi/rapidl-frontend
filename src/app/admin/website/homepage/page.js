import Link from "next/link";

import {
  ArrowUpRight,
  BookOpenText,
  Building2,
  CircleHelp,
  Code2,
  Contact,
  GalleryHorizontal,
  Gauge,
  Images,
  LockKeyhole,
  MapPin,
  MessageSquareQuote,
  Shirt,
  Sparkles,
  Trophy,
  Users,
  Workflow,
} from "lucide-react";


/* =========================================================
   HOMEPAGE SECTIONS

   Actual homepage order:

   <Hero />
   <TrustStrip />
   <Services />
   <SignatureCare />
   <WhyRapid />
   <Awards />
   <Process />
   <Locations />
   <People />
   <Reviews />
   <Commercial />
   <Gallery />
   <BookingCTA />
   <FAQ />
   <Contact />
   <Footer />
========================================================= */

const homepageSections = [
  {
    id: "hero",
    title: "Hero",
    description:
      "Main cinematic landing area, headline, actions and hero media.",
    icon: Sparkles,
    theme: "navy",
    editable: false,
  },

  {
    id: "trust-strip",
    title: "Value Strip",
    description:
      "Homepage trust statistics, key values and animated brand indicators.",
    icon: Gauge,
    href: "/admin/website/value-strip",
    theme: "royal",
    editable: true,
  },

  {
    id: "services",
    title: "Services",
    description:
      "Main laundry services displayed across the homepage.",
    icon: Shirt,
    href: "/admin/website/services",
    theme: "soft",
    editable: true,
  },

  {
    id: "signature-care",
    title: "Signature Care",
    description:
      "Premium treatments and specialist garment-care services.",
    icon: Sparkles,
    href: "/admin/website/services",
    theme: "navy",
    editable: true,
  },

  {
    id: "why-rapid",
    title: "Why Rapid",
    description:
      "Rapid Laundromat advantages, brand values and customer benefits.",
    icon: BookOpenText,
    theme: "white",
    editable: false,
  },

  {
    id: "awards",
    title: "Awards & Recognition",
    description:
      "Company awards, achievements, recognitions and milestones.",
    icon: Trophy,
    href: "/admin/website/awards",
    theme: "royal",
    editable: true,
  },

  {
    id: "process",
    title: "Process",
    description:
      "Customer journey and the Rapid garment-care process.",
    icon: Workflow,
    theme: "soft",
    editable: false,
  },

  {
    id: "locations",
    title: "Locations",
    description:
      "Branch visibility and homepage location presentation.",
    icon: MapPin,
    theme: "white",
    editable: false,
  },

  {
    id: "people",
    title: "People",
    description:
      "Founder, leadership, managers and team presentation.",
    icon: Users,
    theme: "soft",
    editable: false,
  },

  {
    id: "reviews",
    title: "Reviews",
    description:
      "Customer reviews, ratings, testimonials and social proof.",
    icon: MessageSquareQuote,
    theme: "white",
    editable: false,
  },

  {
    id: "commercial",
    title: "Commercial",
    description:
      "Commercial laundry solutions and business customer content.",
    icon: Building2,
    theme: "royal",
    editable: false,
  },

  {
    id: "gallery",
    title: "Gallery",
    description:
      "Before-and-after transformations and brand photography.",
    icon: GalleryHorizontal,
    href: "/admin/website/gallery",
    theme: "soft",
    editable: true,
  },

  {
    id: "booking-cta",
    title: "Booking CTA",
    description:
      "Online booking call-to-action and customer conversion messaging.",
    icon: Contact,
    theme: "navy",
    editable: false,
  },

  {
    id: "faq",
    title: "FAQ",
    description:
      "Frequently asked customer questions displayed on the homepage.",
    icon: CircleHelp,
    href: "/admin/website/faqs",
    theme: "white",
    editable: true,
  },

  {
    id: "contact",
    title: "Contact",
    description:
      "Customer contact information and enquiry content.",
    icon: Contact,
    theme: "soft",
    editable: false,
  },

  {
    id: "footer",
    title: "Footer",
    description:
      "Footer navigation, company information and social links.",
    icon: Images,
    theme: "dark",
    editable: false,
  },
];


/* =========================================================
   THEME STYLES
========================================================= */

const themeStyles = {
  navy: {
    icon: "bg-[#001F5C] text-white",
    accent: "bg-[#001F5C]",
  },

  royal: {
    icon:
      "bg-gradient-to-br from-[#0062CC] to-[#0084E3] text-white",
    accent: "bg-[#0084E3]",
  },

  soft: {
    icon: "bg-[#EAF5FF] text-[#0062CC]",
    accent: "bg-[#41B6FF]",
  },

  white: {
    icon: "bg-slate-100 text-[#001F5C]",
    accent: "bg-slate-300",
  },

  dark: {
    icon: "bg-[#000D27] text-[#41B6FF]",
    accent: "bg-[#000D27]",
  },
};


/* =========================================================
   PAGE
========================================================= */

export default function HomepageContentPage() {
  const editableCount =
    homepageSections.filter(
      (section) => section.editable
    ).length;

  const developerCount =
    homepageSections.length -
    editableCount;


  return (
    <div className="min-h-screen bg-[#F4F7FB]">

      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0062CC]">
              Content Studio
            </div>


            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#001F5C] sm:text-4xl">
              Homepage
            </h1>


            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Manage editable homepage content. Sections marked as
              developer-managed require a code update.
            </p>

          </div>


          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              self-start
              rounded-xl
              bg-[#001F5C]
              px-5
              text-[10px]
              font-black
              uppercase
              tracking-[0.12em]
              text-white
              transition-all
              duration-300
              hover:bg-[#0062CC]
              hover:shadow-lg
            "
          >
            View Website

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </a>

        </div>


        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <Summary
            label="Homepage Sections"
            value={homepageSections.length}
          />


          <Summary
            label="Editable"
            value={editableCount}
            type="editable"
          />


          <Summary
            label="Developer Managed"
            value={developerCount}
            type="developer"
          />


          <Summary
            label="Publishing"
            value="Live"
            type="live"
          />

        </div>


        {/* =====================================================
            MANAGEMENT INFO
        ===================================================== */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-4
            rounded-[20px]
            border
            border-slate-200/80
            bg-white
            px-5
            py-4
            sm:flex-row
            sm:items-center
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#EAF5FF]
                text-[#0062CC]
              "
            >
              <ArrowUpRight size={15} />
            </div>


            <div>

              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#001F5C]">
                Editable Content
              </div>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Can be updated directly from Content Studio.
              </p>

            </div>

          </div>


          <div className="hidden h-10 w-px bg-slate-200 sm:block" />


          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-slate-100
                text-slate-400
              "
            >
              <Code2 size={15} />
            </div>


            <div>

              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                Developer Managed
              </div>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Requires a developer to update the website code.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            SECTIONS
        ===================================================== */}

        <div className="mt-10">

          <div className="mb-5">

            <h2 className="text-lg font-black tracking-[-0.025em] text-[#001F5C]">
              Homepage Sections
            </h2>


            <p className="mt-1 text-xs text-slate-400">
              Sections are shown in the same order they appear on
              the public homepage.
            </p>

          </div>


          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {homepageSections.map(
              (section, index) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  index={index}
                />
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SECTION CARD
========================================================= */

function SectionCard({
  section,
  index,
}) {
  const Icon =
    section.icon;


  const style =
    themeStyles[section.theme] ||
    themeStyles.white;


  const number =
    String(index + 1).padStart(
      2,
      "0"
    );


  /* =======================================================
     CARD CONTENT
  ======================================================= */

  const cardContent = (
    <>

      {/* TOP ACCENT */}

      <div
        className={`
          absolute
          inset-x-0
          top-0
          h-[3px]
          ${
            section.editable
              ? style.accent
              : "bg-slate-200"
          }
        `}
      />


      {/* TOP */}

      <div className="flex items-start justify-between gap-4">

        {/* ICON */}

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            transition-all
            duration-300
            ${
              section.editable
                ? style.icon
                : "bg-slate-100 text-slate-400"
            }
          `}
        >
          <Icon size={18} />
        </div>


        {/* STATUS + NUMBER */}

        <div className="flex items-center gap-2">

          {section.editable ? (

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-[#EAF5FF]
                px-2.5
                py-1
                text-[8px]
                font-black
                uppercase
                tracking-[0.1em]
                text-[#0062CC]
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#0084E3]" />

              Editable
            </span>

          ) : (

            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-slate-100
                px-2.5
                py-1
                text-[8px]
                font-black
                uppercase
                tracking-[0.1em]
                text-slate-400
              "
            >
              <LockKeyhole size={9} />

              Developer
            </span>

          )}


          <span
            className="
              text-[9px]
              font-black
              tracking-[0.15em]
              text-slate-300
            "
          >
            {number}
          </span>

        </div>

      </div>


      {/* TITLE */}

      <h3
        className={`
          mt-5
          text-[1.05rem]
          font-black
          tracking-[-0.02em]
          ${
            section.editable
              ? "text-[#001F5C]"
              : "text-slate-600"
          }
        `}
      >
        {section.title}
      </h3>


      {/* DESCRIPTION */}

      <p className="mt-2 min-h-[40px] text-xs leading-5 text-slate-500">
        {section.description}
      </p>


      {/* SPECIAL SERVICES INFORMATION */}

      {section.id ===
        "signature-care" && (
        <div
          className="
            mt-4
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-[#F4F8FF]
            px-3
            py-2
          "
        >
          <Shirt
            size={11}
            className="text-[#0062CC]"
          />

          <span className="text-[9px] font-bold text-slate-500">
            Managed together with Services
          </span>
        </div>
      )}


      {/* FOOTER */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          pt-4
        "
      >

        {section.editable ? (
          <>

            <span
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-[#0062CC]
              "
            >
              Manage Content
            </span>


            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-slate-50
                text-slate-300
                transition-all
                duration-300
                group-hover:bg-[#EAF5FF]
                group-hover:text-[#0062CC]
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
            </div>

          </>
        ) : (
          <>

            <div className="flex items-center gap-2">

              <Code2
                size={13}
                className="text-slate-400"
              />


              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.11em]
                  text-slate-400
                "
              >
                Developer Managed
              </span>

            </div>


            <LockKeyhole
              size={13}
              className="text-slate-300"
            />

          </>
        )}

      </div>

    </>
  );


  /* =======================================================
     EDITABLE SECTION
  ======================================================= */

  if (
    section.editable &&
    section.href
  ) {
    return (
      <Link
        href={section.href}
        className="
          group
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-slate-200/80
          bg-white
          p-5
          shadow-[0_10px_35px_rgba(15,23,42,.035)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#0062CC]/25
          hover:shadow-[0_18px_50px_rgba(0,31,92,.09)]
        "
      >
        {cardContent}
      </Link>
    );
  }


  /* =======================================================
     DEVELOPER MANAGED SECTION
  ======================================================= */

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200/70
        bg-white/80
        p-5
        shadow-[0_8px_25px_rgba(15,23,42,.025)]
      "
    >
      {cardContent}
    </div>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function Summary({
  label,
  value,
  type,
}) {
  return (
    <div
      className="
        rounded-[20px]
        border
        border-slate-200/80
        bg-white
        px-5
        py-4
        shadow-[0_8px_25px_rgba(15,23,42,.025)]
      "
    >

      <div className="flex items-center justify-between gap-3">

        <div
          className="
            text-[9px]
            font-black
            uppercase
            tracking-[0.14em]
            text-slate-400
          "
        >
          {label}
        </div>


        {type ===
          "editable" && (
          <div
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-lg
              bg-[#EAF5FF]
            "
          >
            <span className="h-2 w-2 rounded-full bg-[#0084E3]" />
          </div>
        )}


        {type ===
          "developer" && (
          <div
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-lg
              bg-slate-100
            "
          >
            <Code2
              size={12}
              className="text-slate-400"
            />
          </div>
        )}


        {type ===
          "live" && (
          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              bg-emerald-50
              px-2
              py-1
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.08em]
                text-emerald-600
              "
            >
              Active
            </span>
          </div>
        )}

      </div>


      <div
        className="
          mt-2
          text-xl
          font-black
          tracking-[-0.03em]
          text-[#001F5C]
        "
      >
        {value}
      </div>

    </div>
  );
}