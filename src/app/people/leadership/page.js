import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Award,
  Sparkles,
} from "lucide-react";

import PeopleNavbar from "@/components/site/PeopleNavbar";

import {
  LEADERS,
} from "@/data/peopleData";


export const metadata = {
  title:
    "Leadership | Rapid Laundromat",

  description:
    "Meet the leadership behind Rapid Laundromat and discover the experience, vision and values shaping the company.",
};


export default function LeadershipPage() {
  return (
    <>
      <PeopleNavbar />


      <main
        className="
          min-h-screen
          bg-[#F7FBFF]
          pt-32
        "
      >

        {/* HEADER */}

        <section
          className="
            px-[5%]
            pb-16
            pt-10
          "
        >

          <div
            className="
              mx-auto
              max-w-[1500px]
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Award
                size={17}

                className="
                  text-[#0062CC]
                "
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
                Rapid Leadership
              </span>
            </div>


            <div
              className="
                mt-5
                grid
                gap-8
                lg:grid-cols-[1fr_.55fr]
                lg:items-end
              "
            >

              <h1
                className="
                  max-w-[900px]
                  font-barlowCond
                  text-[clamp(3.4rem,7vw,7rem)]
                  font-black
                  uppercase
                  leading-[.88]
                  text-[#001F5C]
                "
              >
                Experience that
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
                  shapes the standard.
                </span>
              </h1>


              <p
                className="
                  max-w-[530px]
                  text-[1rem]
                  leading-[1.85]
                  text-slate-500
                  lg:ml-auto
                "
              >
                Rapid Laundromat is guided by leadership experience spanning
                international operations, education, people development,
                quality and customer service.
              </p>

            </div>

          </div>

        </section>


        {/* LEADERS */}

        <section
          className="
            px-[5%]
            pb-28
          "
        >

          <div
            className="
              mx-auto
              grid
              max-w-[1500px]
              gap-6
              lg:grid-cols-2
            "
          >

            {LEADERS.map(
              (
                person
              ) => (

                <article
                  key={
                    person.id
                  }

                  className="
                    group
                    overflow-hidden
                    rounded-[34px]
                    border
                    border-[#001F5C]/[0.07]
                    bg-white
                    shadow-[0_25px_70px_rgba(0,31,92,.07)]
                  "
                >

                  <div
                    className="
                      relative
                      aspect-[4/3]
                      overflow-hidden
                      bg-[#EEF6FF]
                    "
                  >

                    <Image
                      src={
                        person.image
                      }

                      alt={
                        person.name
                      }

                      fill

                      sizes="50vw"

                     className="
                       object-cover
                       object-[center_8%]
                     
                       transition-transform
                       duration-700
                     
                       group-hover:scale-[1.04]
                     "
                    />


                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-[#001F5C]/70
                        via-transparent
                        to-transparent
                      "
                    />


                    <div
                      className="
                        absolute
                        bottom-6
                        left-6
                      "
                    >

                      <div
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[.18em]
                          text-[#8CD5FF]
                        "
                      >
                        {
                          person.role
                        }
                      </div>


                      <h2
                        className="
                          mt-2
                          text-[2rem]
                          font-black
                          tracking-[-.05em]
                          text-white
                        "
                      >
                        {
                          person.name
                        }
                      </h2>

                    </div>

                  </div>


                  <div
                    className="
                      p-7
                    "
                  >

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[#EEF6FF]
                        px-3
                        py-2
                        text-[9px]
                        font-black
                        text-[#0062CC]
                      "
                    >
                      <Sparkles
                        size={12}
                      />

                      {
                        person.experience
                      } Experience
                    </div>


                    <p
                      className="
                        mt-5
                        text-[.95rem]
                        leading-[1.8]
                        text-slate-500
                      "
                    >
                      {
                        person.summary
                      }
                    </p>


                    <Link
                      href={`/people/${person.slug}`}

                      className="
                        mt-7
                        inline-flex
                        items-center
                        gap-2
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[.13em]
                        text-[#0062CC]
                      "
                    >
                      Full Profile

                      <ArrowUpRight
                        size={14}
                      />
                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        </section>

      </main>
    </>
  );
}