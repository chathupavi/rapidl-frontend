import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { LEADERS } from "@/data/peopleData";

/* =========================================================
   DIRECTOR DATA & METADATA
========================================================= */

const director = LEADERS.find((person) => person.slug === "co-founder");

export const metadata = {
  title: "W. M. D. Gunathilaka | Director – Rapid Laundromat",
  description:
    "Meet W. M. D. Gunathilaka, Director and Shareholder of Rapid Laundromat, bringing more than 23 years of experience in education, leadership and people development.",
};

/* =========================================================
   PAGE COMPONENT
========================================================= */

export default function DirectorPage() {
  return (
    <main>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative min-h-[94svh] overflow-hidden bg-[#001F5C]">
        {/* Portrait Image */}
        <div className="absolute inset-0 lg:left-[47%]">
          <Image
            src={director.image}
            alt={director.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 53vw"
            className="object-cover object-[center_28%]"
          />

          {/* Left Blend */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#001F5C] via-[#001F5C]/72 to-[#001F5C]/5 lg:via-[#001F5C]/55 lg:to-transparent"
          />

          {/* Bottom Blend */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#001F5C]/90 via-[#001F5C]/10 to-transparent"
          />

          {/* Top Soft Blend */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[180px] bg-gradient-to-b from-[#001F5C]/55 via-[#001F5C]/15 to-transparent"
          />
        </div>

        {/* Ambient Glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-44 bottom-[-140px] h-[540px] w-[540px] rounded-full bg-[#0084E3]/20 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] top-[20%] h-[380px] w-[380px] rounded-full bg-[#41B6FF]/10 blur-[120px]"
        />

        {/* Hero Top Navigation Bar */}
        <div className="absolute left-0 right-0 top-0 z-30 px-[5%] pt-6">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5">
            {/* Logo */}
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-3 bg-transparent"
            >
              <Image
                src="/images/logo.jpeg"
                alt="Rapid Laundromat"
                width={52}
                height={52}
                priority
                className="h-[46px] w-[46px] rounded-full object-contain shadow-[0_10px_35px_rgba(0,0,0,.18)] sm:h-[52px] sm:w-[52px]"
              />

              <div className="hidden sm:block">
                <div className="text-[12px] font-black uppercase tracking-[.07em] text-white">
                  Rapid Laundromat
                </div>
                <div className="mt-1 text-[9px] font-black uppercase tracking-[.16em] text-[#41B6FF]">
                  Our People
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links (Clean transparent backgrounds) */}
            <nav className="hidden items-center gap-8 lg:flex">
              <Link
                href="/people/leadership"
                className="relative bg-transparent py-2 text-[10px] font-black uppercase tracking-[.15em] text-white/65 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#41B6FF] after:transition-all after:duration-300 hover:after:w-full"
              >
                Leadership
              </Link>

              <Link
                href="/people/managers"
                className="relative bg-transparent py-2 text-[10px] font-black uppercase tracking-[.15em] text-white/65 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#41B6FF] after:transition-all after:duration-300 hover:after:w-full"
              >
                Managers
              </Link>

              <Link
                href="/people/team"
                className="relative bg-transparent py-2 text-[10px] font-black uppercase tracking-[.15em] text-white/65 transition-colors duration-300 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#41B6FF] after:transition-all after:duration-300 hover:after:w-full"
              >
                Our Team
              </Link>
            </nav>

            {/* Back Button */}
            <Link
              href="/#people"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 text-[9px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.14] sm:px-5"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back to Rapid</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex min-h-[94svh] max-w-[1500px] items-end px-[5%] pb-14 pt-36 lg:items-center lg:pb-0">
          <div className="max-w-[820px]">
            {/* Category Tag */}
            <div className="flex items-center gap-3 text-[#41B6FF]">
              <HeartHandshake size={17} />
              <span className="text-[10px] font-black uppercase tracking-[.2em]">
                People & Service Leadership
              </span>
            </div>

            {/* Leader Name */}
            <h1 className="mt-6 font-barlowCond text-[clamp(3.7rem,7vw,7rem)] font-black uppercase leading-[.86] text-white">
              W. M. D.
              <br />
              <span className="bg-gradient-to-r from-[#41B6FF] via-[#8CD5FF] to-white bg-clip-text text-transparent">
                Gunathilaka
              </span>
            </h1>

            {/* Title / Role */}
            <div className="mt-6 text-[.95rem] font-black text-white">
              Director & Shareholder
            </div>

            {/* Summary */}
            <p className="mt-6 max-w-[700px] text-[1rem] leading-[1.85] text-white/65">
              {director.summary}
            </p>

            {/* Stat Badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              <HeroBadge value="23+" label="Years Experience" />
              <HeroBadge value="Education" label="Professional Background" />
              <HeroBadge value="People" label="Leadership Focus" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROFESSIONAL JOURNEY
      ===================================================== */}
      <section className="bg-white px-[5%] py-24 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            label="Professional Journey"
            title="More than two decades of education and people development."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {director.career.map((item, index) => (
              <div
                key={`${item.company}-${item.title}`}
                className="group relative overflow-hidden rounded-[26px] border border-[#001F5C]/[0.07] bg-[#F7FBFF] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0062CC]/15 hover:shadow-[0_20px_50px_rgba(0,98,204,.07)]"
              >
                <div className="absolute right-5 top-5 text-[10px] font-black tracking-[.14em] text-[#001F5C]/15">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-white text-[#0062CC] shadow-[0_10px_30px_rgba(0,98,204,.06)]">
                  <BookOpenCheck size={19} />
                </div>

                <h3 className="mt-5 text-xl font-black tracking-[-.03em] text-[#001F5C]">
                  {item.company}
                </h3>

                <div className="mt-1 text-[.85rem] font-bold text-[#0062CC]">
                  {item.title}
                </div>

                <p className="mt-4 text-[.9rem] leading-[1.8] text-slate-500">
                  {item.description}
                </p>

                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#0062CC] via-[#0084E3] to-[#41B6FF] transition-all duration-500 group-hover:w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EDUCATION & ROLE SECTION
      ===================================================== */}
      <section className="bg-[#F4F9FF] px-[5%] py-24 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Qualifications List */}
          <div>
            <SectionHeading
              label="Qualifications"
              title="A foundation in education."
            />

            <div className="mt-8 space-y-3">
              {director.education.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[20px] border border-[#001F5C]/[0.05] bg-white p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#0062CC]">
                    <GraduationCap size={18} />
                  </div>
                  <div className="pt-1 text-[.92rem] font-bold leading-6 text-[#001F5C]">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role At Rapid Card */}
          <div className="relative overflow-hidden rounded-[32px] bg-[#001F5C] p-8 lg:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#41B6FF]/20 blur-[100px]"
            />

            <div className="relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-[15px] border border-white/10 bg-white/[0.08] text-[#41B6FF]">
                <UsersRound size={22} />
              </div>

              <div className="mt-6 text-[10px] font-black uppercase tracking-[.18em] text-[#41B6FF]">
                Role at Rapid
              </div>

              <h2 className="mt-3 max-w-[580px] text-[clamp(2rem,3vw,3.2rem)] font-black leading-[1.02] tracking-[-.05em] text-white">
                Building standards through people.
              </h2>

              <p className="mt-6 max-w-[620px] text-[.98rem] leading-[1.85] text-white/62">
                Her background in teaching, staff supervision, training and
                coordination supports Rapid Laundromat&apos;s focus on staff
                development, customer satisfaction, service standards and
                consistent professional care.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Staff Development",
                  "Quality Standards",
                  "Customer Care",
                  "People Leadership",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-[16px] border border-white/[0.08] bg-white/[0.05] px-4 py-3"
                  >
                    <CheckCircle2
                      size={14}
                      className="shrink-0 text-[#41B6FF]"
                    />
                    <span className="text-[.82rem] font-bold text-white/75">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CORE STRENGTHS / EXPERTISE
      ===================================================== */}
      <section className="bg-white px-[5%] py-24 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            label="Core Strengths"
            title="Leadership centered around people and quality."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {director.expertise.map((item) => (
              <div
                key={item}
                className="group flex items-center gap-4 rounded-[20px] border border-[#001F5C]/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0062CC]/15 hover:bg-[#F7FBFF]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#0084E3] transition-colors duration-300 group-hover:bg-[#0062CC] group-hover:text-white">
                  <CheckCircle2 size={15} />
                </div>
                <span className="text-[.9rem] font-black text-[#001F5C]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#001F5C] px-[5%] py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0084E3]/15 blur-[160px]"
        />

        <div className="relative z-10 mx-auto max-w-[1100px] text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.07] text-[#41B6FF]">
            <Sparkles size={21} />
          </div>

          <div className="mt-6 text-[10px] font-black uppercase tracking-[.2em] text-[#41B6FF]">
            Leadership Philosophy
          </div>

          <blockquote className="mt-7 text-[clamp(1.7rem,3.5vw,3.2rem)] font-black leading-[1.25] tracking-[-.045em] text-white">
            “{director.philosophy}”
          </blockquote>

          <div className="mx-auto mt-9 h-[2px] w-20 rounded-full bg-gradient-to-r from-[#0062CC] via-[#41B6FF] to-[#0062CC]" />

          <div className="mt-5 text-[.9rem] font-black text-white">
            {director.name}
          </div>

          <div className="mt-1 text-[9px] font-black uppercase tracking-[.15em] text-white/35">
            Director & Shareholder · Rapid Laundromat
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   HELPER COMPONENTS
========================================================= */

function HeroBadge({ value, label }) {
  return (
    <div className="rounded-[18px] border border-white/15 bg-white/[0.08] px-5 py-3 backdrop-blur-xl">
      <div className="text-lg font-black text-white">{value}</div>
      <div className="mt-1 text-[9px] font-black uppercase tracking-[.13em] text-[#8CD5FF]">
        {label}
      </div>
    </div>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-[.2em] text-[#0062CC]">
        {label}
      </div>
      <h2 className="mt-4 max-w-[850px] font-barlowCond text-[clamp(2.6rem,5vw,5rem)] font-black uppercase leading-[.94] text-[#001F5C]">
        {title}
      </h2>
    </div>
  );
}