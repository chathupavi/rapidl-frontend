import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import {
  LEADERS,
} from "@/data/peopleData";


const founder =
  LEADERS.find(
    (
      person
    ) =>
      person.slug ===
      "founder"
  );


export const metadata = {
  title:
    "Milinda Jayasundara | Founder – Rapid Laundromat",

  description:
    "Meet Milinda Jayasundara, Founder, Director and Shareholder of Rapid Laundromat, with more than 30 years of international leadership experience.",
};


export default function FounderPage() {
  return (
    <main>

      {/* HERO */}

      <section
        className="
          relative
          min-h-[92svh]
          overflow-hidden
          bg-[#001F5C]
        "
      >

        {/* HERO IMAGE */}

        <div
          className="
            absolute
            inset-0
            lg:left-[48%]
          "
        >

          <Image
            src={
              founder.image
            }

            alt={
              founder.name
            }

            fill

            priority

            sizes="100vw"

            className="
              object-cover
              object-[center_8%]
            "
          />


          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#001F5C]
              via-[#001F5C]/60
              to-transparent
            "
          />


          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#001F5C]/70
              via-transparent
              to-[#001F5C]/20
            "
          />

        </div>


        {/* ===================================================
            HERO TOP CONTENT
            Logo + Links + Back Button
        =================================================== */}

        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-30

            px-[5%]
            pt-6
          "
        >

          <div
            className="
              mx-auto
              flex
              max-w-[1500px]
              items-center
              justify-between
              gap-5
            "
          >

            {/* LOGO */}

            <Link
              href="/"
              className="
                flex
                shrink-0
                items-center
                gap-3
              "
            >

              <Image
                src="/images/logo.jpeg"
                alt="Rapid Laundromat"
                width={52}
                height={52}
                priority

                className="
                  h-[46px]
                  w-[46px]

                  rounded-full
                  object-contain

                  shadow-[0_10px_35px_rgba(0,0,0,.18)]

                  sm:h-[52px]
                  sm:w-[52px]
                "
              />


              <div
                className="
                  hidden
                  sm:block
                "
              >

                <div
                  className="
                    text-[12px]
                    font-black
                    uppercase
                    tracking-[.07em]
                    text-white
                  "
                >
                  Rapid Laundromat
                </div>


                <div
                  className="
                    mt-1
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[.16em]
                    text-[#41B6FF]
                  "
                >
                  Our People
                </div>

              </div>

            </Link>


            {/* DESKTOP LINKS */}

            <nav
              className="
                hidden
                items-center
                gap-8
                lg:flex
              "
            >

              <HeroNavLink
                href="/people/leadership"
              >
                Leadership
              </HeroNavLink>


              <HeroNavLink
                href="/people/managers"
              >
                Managers
              </HeroNavLink>


              <HeroNavLink
                href="/people/team"
              >
                Our Team
              </HeroNavLink>

            </nav>


            {/* BACK BUTTON */}

            <Link
              href="/#people"

              className="
                inline-flex
                h-11
                shrink-0

                items-center
                justify-center
                gap-2

                rounded-full

                border
                border-white/20

                bg-white/[0.08]

                px-4
                sm:px-5

                text-[9px]
                font-black
                uppercase
                tracking-[.14em]

                text-white

                backdrop-blur-md

                transition-all
                duration-300

                hover:border-white/30
                hover:bg-white/[0.14]
              "
            >

              <ArrowLeft
                size={14}
              />


              <span
                className="
                  hidden
                  sm:inline
                "
              >
                Back to Rapid
              </span>


              <span
                className="
                  sm:hidden
                "
              >
                Back
              </span>

            </Link>

          </div>

        </div>


        {/* HERO CONTENT */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[92svh]
            max-w-[1500px]
            items-end
            px-[5%]
            pb-16
            pt-36
            lg:items-center
            lg:pb-0
          "
        >

          <div
            className="
              max-w-[820px]
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                text-[#41B6FF]
              "
            >
              <Sparkles
                size={15}
              />

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.2em]
                "
              >
                Meet Our Founder
              </span>
            </div>


            <h1
              className="
                mt-6
                font-barlowCond
                text-[clamp(3.8rem,8vw,8rem)]
                font-black
                uppercase
                leading-[.85]
                text-white
              "
            >
              Milinda
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
                Jayasundara
              </span>
            </h1>


            <div
              className="
                mt-6
                text-[.95rem]
                font-black
                text-white
              "
            >
              Founder, Director & Shareholder
            </div>


            <p
              className="
                mt-6
                max-w-[700px]
                text-[1rem]
                leading-[1.85]
                text-white/65
              "
            >
              {
                founder.summary
              }
            </p>


            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-3
              "
            >
              <HeroBadge
                value="30+"
                label="Years Experience"
              />

              <HeroBadge
                value="6"
                label="Countries"
              />

              <HeroBadge
                value="COO"
                label="Former Role"
              />
            </div>

          </div>

        </div>

      </section>


      {/* STORY */}

      <section
        className="
          bg-white
          px-[5%]
          py-24
        "
      >

        <div
          className="
            mx-auto
            grid
            max-w-[1500px]
            gap-12
            lg:grid-cols-[.7fr_1.3fr]
          "
        >

          <SectionTitle
            label="Leadership Journey"
            title="Three decades of operational leadership."
          />


          <div
            className="
              space-y-5
            "
          >

            {founder.career.map(
              (
                item,
                index
              ) => (

                <div
                  key={
                    item.title
                  }

                  className="
                    rounded-[24px]
                    border
                    border-[#001F5C]/[0.07]
                    bg-[#F7FBFF]
                    p-6
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
                    {String(
                      index +
                      1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </div>


                  <h3
                    className="
                      mt-3
                      text-xl
                      font-black
                      text-[#001F5C]
                    "
                  >
                    {
                      item.title
                    }
                  </h3>


                  <div
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-[#0062CC]
                    "
                  >
                    {
                      item.company
                    } ·{" "}
                    {
                      item.location
                    }
                  </div>


                  <p
                    className="
                      mt-4
                      text-[.9rem]
                      leading-[1.75]
                      text-slate-500
                    "
                  >
                    {
                      item.description
                    }
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* GLOBAL EXPERIENCE */}

      <section
        className="
          bg-[#F4F9FF]
          px-[5%]
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >

          <SectionTitle
            label="Global Experience"
            title="Leadership across markets and global brands."
          />


          <div
            className="
              mt-10
              grid
              gap-5
              lg:grid-cols-2
            "
          >

            <ListCard
              icon={Globe2}
              title="Countries"
              items={
                founder.countries
              }
            />


            <ListCard
              icon={Award}
              title="Global Brands"
              items={
                founder.brands
              }
            />

          </div>

        </div>

      </section>


      {/* EDUCATION */}

      <section
        className="
          bg-white
          px-[5%]
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >

          <SectionTitle
            label="Academic Foundation"
            title="Education & professional development."
          />


          <div
            className="
              mt-10
              grid
              gap-5
              lg:grid-cols-2
            "
          >

            <ListCard
              icon={GraduationCap}
              title="Academic Qualifications"
              items={
                founder.education
              }
            />


            <ListCard
              icon={BriefcaseBusiness}
              title="Executive Education"
              items={
                founder.executiveEducation
              }
            />

          </div>

        </div>

      </section>


      {/* EXPERTISE */}

      <section
        className="
          bg-[#F5FAFF]
          px-[5%]
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >

          <SectionTitle
            label="Operational Excellence"
            title="Lean, transformation & business expertise."
          />


          <div
            className="
              mt-10
              flex
              flex-wrap
              gap-3
            "
          >

            {founder.expertise.map(
              (
                item
              ) => (

                <span
                  key={
                    item
                  }

                  className="
                    rounded-full
                    border
                    border-[#0062CC]/10
                    bg-white
                    px-4
                    py-2.5
                    text-[.78rem]
                    font-bold
                    text-[#001F5C]
                  "
                >
                  {
                    item
                  }
                </span>

              )
            )}

          </div>

        </div>

      </section>


      {/* PHILOSOPHY */}

      <section
        className="
          bg-[#001F5C]
          px-[5%]
          py-24
        "
      >

        <div
          className="
            mx-auto
            max-w-[1100px]
            text-center
          "
        >

          <Sparkles
            size={24}

            className="
              mx-auto
              text-[#41B6FF]
            "
          />


          <div
            className="
              mt-5
              text-[10px]
              font-black
              uppercase
              tracking-[.2em]
              text-[#41B6FF]
            "
          >
            Leadership Philosophy
          </div>


          <blockquote
            className="
              mt-7
              text-[clamp(1.6rem,3.5vw,3.2rem)]
              font-black
              leading-[1.25]
              tracking-[-.045em]
              text-white
            "
          >
            “
            {
              founder.philosophy
            }
            ”
          </blockquote>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   HERO NAV LINK
========================================================= */

function HeroNavLink({
  href,
  children,
}) {
  return (
    <Link
      href={href}

      className="
        relative
        py-2

        text-[10px]
        font-black
        uppercase
        tracking-[.15em]

        text-white/65

        transition-colors
        duration-300

        after:absolute
        after:bottom-0
        after:left-0

        after:h-[1px]
        after:w-0

        after:bg-[#41B6FF]

        after:transition-all
        after:duration-300

        hover:text-white
        hover:after:w-full
      "
    >
      {children}
    </Link>
  );
}


/* =========================================================
   HERO BADGE
========================================================= */

function HeroBadge({
  value,
  label,
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-white/15
        bg-white/[0.08]
        px-5
        py-3
        backdrop-blur-xl
      "
    >
      <div
        className="
          text-lg
          font-black
          text-white
        "
      >
        {
          value
        }
      </div>

      <div
        className="
          mt-1
          text-[8px]
          font-black
          uppercase
          tracking-[.14em]
          text-[#8CD5FF]
        "
      >
        {
          label
        }
      </div>
    </div>
  );
}


/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  label,
  title,
}) {
  return (
    <div>

      <div
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[.2em]
          text-[#0062CC]
        "
      >
        {
          label
        }
      </div>


      <h2
        className="
          mt-4
          max-w-[800px]
          font-barlowCond
          text-[clamp(2.6rem,5vw,5rem)]
          font-black
          uppercase
          leading-[.94]
          text-[#001F5C]
        "
      >
        {
          title
        }
      </h2>

    </div>
  );
}


/* =========================================================
   LIST CARD
========================================================= */

function ListCard({
  icon: Icon,
  title,
  items,
}) {
  return (
    <div
      className="
        rounded-[28px]
        border
        border-[#001F5C]/[0.07]
        bg-white
        p-7
      "
    >

      <Icon
        size={21}
        className="text-[#0062CC]"
      />


      <h3
        className="
          mt-4
          text-xl
          font-black
          text-[#001F5C]
        "
      >
        {
          title
        }
      </h3>


      <div
        className="
          mt-6
          space-y-3
        "
      >

        {items.map(
          (
            item
          ) => (

            <div
              key={
                item
              }

              className="
                flex
                items-start
                gap-3
                text-[.86rem]
                leading-6
                text-slate-500
              "
            >

              <CheckCircle2
                size={15}

                className="
                  mt-1
                  shrink-0
                  text-[#0084E3]
                "
              />

              {
                item
              }

            </div>

          )
        )}

      </div>

    </div>
  );
}