"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Crown,
  Sparkles,
  UsersRound,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";


/* =========================================================
   PEOPLE DATA
========================================================= */

const PEOPLE = {
  label:
    "People Behind Rapid",

  heading:
    "Built by experience.",

  headingHighlight:
    "Driven by purpose.",

  description:
    "Rapid Laundromat is shaped by decades of leadership, operational excellence, people development and an uncompromising commitment to quality. Meet the people building a new standard for garment care in Sri Lanka.",

  leaders: [
    {
      id:
        "milinda-jayasundara",

      role:
        "Founder, Director & Shareholder",

      name:
        "Milinda Jayasundara",

      slug:
        "founder",

      image:
        "/images/people/milinda-jayasundara.jpg",

      badge:
        "Founder & Visionary",

      experience:
        "30+ Years",

      headline:
        "Global leadership. World-class standards. A new vision for garment care.",

      summary:
        "With more than three decades of international leadership experience across manufacturing, operations, quality and business transformation, Milinda Jayasundara founded Rapid Laundromat to bring world-class garment care standards to Sri Lanka.",

      quote:
        "To deliver world-class laundry and garment care services with unmatched quality, convenience, innovation and customer experience.",

      highlights: [
        "Former Chief Operating Officer",
        "Former MAS Country Head – Kenya",
        "Lean Manufacturing Expert",
      ],
    },

    {
      id:
        "w-m-d-gunathilaka",

      role:
        "Director & Shareholder",

      name:
        "W. M. D. Gunathilaka",

      slug:
        "co-founder",

      image:
        "/images/people/w-m-d-gunathilaka.jpg",

      badge:
        "People & Service Excellence",

      experience:
        "23+ Years",

      headline:
        "Leadership shaped by education, discipline and people development.",

      summary:
        "With more than 23 years of experience in education, leadership and people development, W. M. D. Gunathilaka brings a strong culture of discipline, quality, training and customer care to Rapid Laundromat.",

      quote:
        "Quality service begins with people — developing strong standards, building capable teams and giving every customer the care and attention they deserve.",

      highlights: [
        "Qualified Teacher",
        "People Development",
        "Service Standards & Training",
      ],
    },
  ],

  explore: [
    {
      id:
        "leadership",

      icon:
        Crown,

      eyebrow:
        "Leadership",

      title:
        "Leadership Team",

      description:
        "Discover the experience, vision and values guiding the future of Rapid Laundromat.",

      href:
        "/people/leadership",

      number:
        "01",
    },

    {
      id:
        "managers",

      icon:
        Building2,

      eyebrow:
        "Branch Leadership",

      title:
        "Branch Managers",

      description:
        "Meet the leaders responsible for customer experience, people and operations across Rapid locations.",

      href:
        "/people/managers",

      number:
        "02",
    },

    {
      id:
        "team",

      icon:
        UsersRound,

      eyebrow:
        "Our People",

      title:
        "Rapid Teams",

      description:
        "Meet the teams delivering professional garment care and customer service every day.",

      href:
        "/people/team",

      number:
        "03",
    },
  ],
};


/* =========================================================
   LEADER CARD
========================================================= */

function LeaderCard({
  person,
  index,
  reduceMotion,
}) {
  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 40,
              scale: 0.985,
              filter: "blur(7px)",
            }
      }

      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }

      viewport={{
        once: true,
        amount: 0.18,
      }}

      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}

      className="
        group
        relative
        min-h-[650px]
        overflow-hidden
        rounded-[34px]
        bg-[#001F5C]
        shadow-[0_30px_90px_rgba(0,31,92,.13)]
      "
    >

      {/* PORTRAIT */}

      <Image
        src={person.image}
        alt={`${person.name} - ${person.role} of Rapid Laundromat`}
        fill
        sizes="
          (max-width: 1024px) 100vw,
          50vw
        "
     className="
       object-cover
       object-[center_5%]
     
       transition-transform
       duration-[1200ms]
       ease-[cubic-bezier(.16,1,.3,1)]
     
       group-hover:scale-[1.035]
     "
      />


      {/* IMAGE TREATMENT */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#001F5C]/95
          via-[#001F5C]/40
          to-[#001F5C]/5
        "
      />


      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#001F5C]/25
          via-transparent
          to-[#0062CC]/10
        "
      />


      {/* BLUE LIGHT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-20
          h-80
          w-80
          rounded-full
          bg-[#41B6FF]/20
          blur-[100px]
          transition-all
          duration-700
          group-hover:bg-[#41B6FF]/30
        "
      />


      {/* TOP BADGE */}

      <div
        className="
          absolute
          left-6
          top-6
          z-10
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/15
          bg-[#001F5C]/45
          px-4
          py-2
          backdrop-blur-xl
        "
      >
        <Sparkles
          size={12}
          className="text-[#41B6FF]"
        />

        <span
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[.16em]
            text-white
          "
        >
          {person.badge}
        </span>
      </div>


      {/* CONTENT */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-10
          p-7
          sm:p-8
          lg:p-9
        "
      >

        <div
          className="
            text-[10px]
            font-black
            uppercase
            tracking-[.2em]
            text-[#8CD5FF]
          "
        >
          {person.role}
        </div>


        <h3
          className="
            mt-3
            max-w-[580px]
            text-[clamp(2.2rem,4vw,3.6rem)]
            font-black
            leading-[.95]
            tracking-[-.055em]
            text-white
          "
        >
          {person.name}
        </h3>


        {/* EXPERIENCE + HIGHLIGHTS */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            gap-2
          "
        >

          <span
            className="
              rounded-full
              border
              border-[#41B6FF]/20
              bg-[#41B6FF]/10
              px-3
              py-1.5
              text-[10px]
              font-black
              uppercase
              tracking-[.12em]
              text-[#8CD5FF]
              backdrop-blur-xl
            "
          >
            {person.experience} Experience
          </span>


          {person.highlights
            ?.slice(0, 2)
            .map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.07]
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  text-white/70
                  backdrop-blur-xl
                "
              >
                {item}
              </span>
            ))}
        </div>


        {/* HEADLINE */}

        {person.headline && (
          <p
            className="
              mt-5
              max-w-[600px]
              text-[1.08rem]
              font-black
              leading-[1.5]
              tracking-[-.02em]
              text-white
            "
          >
            {person.headline}
          </p>
        )}


        {/* SUMMARY */}

        <p
          className="
            mt-4
            max-w-[600px]
            text-[.95rem]
            leading-[1.75]
            text-white/68
            sm:block
          "
        >
          {person.summary}
        </p>


        {/* CTA */}

        <div
          className="
            mt-7
            flex
            items-center
            justify-between
            gap-5
            border-t
            border-white/10
            pt-5
          "
        >

          <Link
            href={`/people/${person.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/link
              inline-flex
              items-center
              gap-3
              text-[10px]
              font-black
              uppercase
              tracking-[.14em]
              text-white
            "
          >
            View Full Profile

            <ArrowUpRight
              size={14}
              className="
                text-[#41B6FF]
                transition-transform
                duration-300
                group-hover/link:-translate-y-0.5
                group-hover/link:translate-x-0.5
              "
            />
          </Link>


          <span
            className="
              hidden
              text-[9px]
              font-black
              uppercase
              tracking-[.14em]
              text-white/30
              sm:block
            "
          >
            Rapid Leadership
          </span>

        </div>

      </div>

    </motion.article>
  );
}


/* =========================================================
   EXPLORE CARD
========================================================= */

function ExploreCard({
  item,
  index,
  reduceMotion,
}) {
  const Icon =
    item.icon;


  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 22,
            }
      }

      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }

      viewport={{
        once: true,
        amount: 0.2,
      }}

      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}
    >

      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          relative
          flex
          h-full
          min-h-[270px]
          flex-col
          overflow-hidden
          rounded-[26px]
          border
          border-[#001F5C]/[0.07]
          bg-white
          p-6
          shadow-[0_15px_45px_rgba(0,31,92,.045)]
          transition-all
          duration-500
          hover:-translate-y-2
          hover:border-[#0062CC]/15
          hover:shadow-[0_25px_65px_rgba(0,98,204,.11)]
        "
      >

        {/* NUMBER */}

        <div
          className="
            absolute
            right-5
            top-5
            text-[10px]
            font-black
            tracking-[.15em]
            text-[#001F5C]/20
          "
        >
          {item.number}
        </div>


        {/* ICON */}

        <div
          className="
            flex
            h-13
            w-13
            items-center
            justify-center
            rounded-[17px]
            border
            border-[#0062CC]/10
            bg-[#EEF6FF]
            text-[#0062CC]
            transition-all
            duration-300
            group-hover:bg-[#0062CC]
            group-hover:text-white
            group-hover:shadow-[0_12px_30px_rgba(0,98,204,.2)]
          "
        >
          <Icon
            size={21}
            strokeWidth={1.8}
          />
        </div>


        <div className="mt-8">

          <div
            className="
              text-[10px]
              font-black
              uppercase
              tracking-[.18em]
              text-[#0084E3]
            "
          >
            {item.eyebrow}
          </div>


          <h3
            className="
              mt-2
              text-[1.4rem]
              font-black
              tracking-[-.035em]
              text-[#001F5C]
            "
          >
            {item.title}
          </h3>


          <p
            className="
              mt-3
              text-[.9rem]
              leading-[1.75]
              text-slate-500
            "
          >
            {item.description}
          </p>

        </div>


        <div
          className="
            mt-auto
            pt-7
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-[#001F5C]/[0.06]
              pt-4
            "
          >

            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[.14em]
                text-[#0062CC]
              "
            >
              Explore
            </span>


            <div
              className="
                flex
                h-8
                w-8
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
                size={13}
              />
            </div>

          </div>

        </div>


        {/* BOTTOM LINE */}

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
            group-hover:w-full
          "
        />

      </Link>

    </motion.div>
  );
}


/* =========================================================
   PEOPLE
========================================================= */

export default function People({
  data = {},
}) {
  const reduceMotion =
    useReducedMotion();


  const content = {
    ...PEOPLE,
    ...data,

    leaders:
      data.leaders ||
      PEOPLE.leaders,

    explore:
      data.explore ||
      PEOPLE.explore,
  };


  return (
    <section
      id="people"
      className="
        relative
        overflow-hidden
        bg-[#F4F9FF]
        px-[5%]
        py-24
        lg:py-32
      "
    >

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-52
          top-[14%]
          h-[560px]
          w-[560px]
          rounded-full
          bg-[#41B6FF]/[0.09]
          blur-[155px]
        "
      />


      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-[5%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#0062CC]/[0.05]
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
            gap-9
            lg:grid-cols-[1.1fr_.55fr]
            lg:items-end
          "
        >

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                  }
            }

            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.85,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
          >

            {/* LABEL */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <UsersRound
                size={16}
                className="text-[#0062CC]"
              />


              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[.2em]
                  text-[#0062CC]
                "
              >
                {content.label}
              </span>

            </div>


            {/* HEADING */}

            <h2
              className="
                mt-5
                max-w-[920px]
                font-barlowCond
                text-[clamp(3rem,6vw,6rem)]
                font-black
                uppercase
                leading-[.9]
                tracking-[.3px]
                text-[#001F5C]
              "
            >
              {content.heading}

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
                {content.headingHighlight}
              </span>

            </h2>

          </motion.div>


          {/* DESCRIPTION */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }

            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.8,
              delay: 0.15,
            }}

            className="
              lg:ml-auto
            "
          >

            <p
              className="
                max-w-[540px]
                text-[1rem]
                leading-[1.85]
                text-slate-500
              "
            >
              {content.description}
            </p>


            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                lg:justify-end
              "
            >

              <span
                className="
                  h-[2px]
                  w-14
                  rounded-full
                  bg-[#0062CC]
                "
              />

              <span
                className="
                  h-[2px]
                  w-7
                  rounded-full
                  bg-[#0084E3]
                "
              />

              <span
                className="
                  h-[2px]
                  w-3
                  rounded-full
                  bg-[#41B6FF]
                "
              />

            </div>

          </motion.div>

        </div>


        {/* ===================================================
            FOUNDER + DIRECTOR
        =================================================== */}

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >

          {content.leaders.map(
            (
              person,
              index
            ) => (

              <LeaderCard
                key={person.id}
                person={person}
                index={index}
                reduceMotion={reduceMotion}
              />

            )
          )}

        </div>


        {/* ===================================================
            PEOPLE DIRECTORY INTRO
        =================================================== */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }

          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.8,
          }}

          className="
            mt-20
            grid
            gap-6
            border-t
            border-[#001F5C]/[0.07]
            pt-10
            lg:grid-cols-[.65fr_1.35fr]
            lg:items-end
          "
        >

          <div>

            <div
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[.18em]
                text-[#0084E3]
              "
            >
              Beyond Leadership
            </div>


            <h3
              className="
                mt-3
                text-[clamp(2rem,4vw,3.5rem)]
                font-black
                leading-[1]
                tracking-[-.055em]
                text-[#001F5C]
              "
            >
              Meet the people
              <br />
              who make Rapid
              <br />

              <span
                className="
                  text-[#0062CC]
                "
              >
                happen.
              </span>
            </h3>

          </div>


          <p
            className="
              max-w-[700px]
              text-[.98rem]
              leading-[1.8]
              text-slate-500
              lg:ml-auto
            "
          >
            Leadership defines the direction, but the customer experience is
            created by people across every branch. Explore our leadership,
            branch managers and teams to learn more about the people behind
            Rapid Laundromat.
          </p>

        </motion.div>


        {/* ===================================================
            DIRECTORY CARDS
        =================================================== */}

        <div
          className="
            mt-9
            grid
            gap-4
            md:grid-cols-3
          "
        >

          {content.explore.map(
            (
              item,
              index
            ) => (

              <ExploreCard
                key={item.id}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
              />

            )
          )}

        </div>

      </div>

    </section>
  );
}