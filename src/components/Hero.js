import Image from "next/image";

function HighlightText({ text, highlight }) {
  if (!highlight) return text;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span
        key={index}
        className="bg-linear-to-br from-bright via-[#4fc3f7] to-light bg-clip-text text-transparent"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Hero({ data = {} }) {
    const {
    logo = "/images/logo.jpeg",
    badge,
    heading,
    headingHighlight,
    subheading,
    description,
    infoTags = [],
    buttons = {},
  } = data;
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-[5%] pb-20 pt-30 text-center"
      style={{
        background:
          "linear-gradient(145deg, #001050 0%, #002060 40%, #0040B0 75%, #0060D0 100%)",
      }}
    >
      {/* radial glow overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,96,208,.25) 0%, transparent 70%)",
        }}
      />

      {/* floating bubbles */}
      <div
        className="absolute h-95 w-95 rounded-full border border-[rgba(0,112,208,.15)] bg-[rgba(0,64,160,.06)] animate-float"
        style={{ top: "5%", left: "-110px" }}
      />
      <div
        className="absolute h-55 w-55 rounded-full border border-[rgba(0,112,208,.15)] bg-[rgba(0,96,208,.05)] animate-float"
        style={{ top: "60%", right: "-60px", animationDelay: "2.5s" }}
      />
      <div
        className="absolute h-35 w-35 rounded-full border border-[rgba(0,112,208,.15)] bg-[rgba(0,112,208,.08)] animate-float"
        style={{ top: "20%", right: "14%", animationDelay: "4s" }}
      />
      <div
        className="absolute h-65 w-65 rounded-full border border-[rgba(0,112,208,.15)] bg-[rgba(0,64,160,.05)] animate-float"
        style={{ bottom: "2%", left: "20%", animationDelay: "1.5s" }}
      />
      <div
        className="absolute h-22.5 w-22.5 rounded-full border border-[rgba(0,112,208,.15)] bg-[rgba(0,112,208,.07)] animate-float"
        style={{ top: "50%", left: "10%", animationDelay: "3s" }}
      />

      {/* content */}
      <div className="relative z-2 max-w-225">
        <div className="mx-auto mb-10 flex h-47.5 w-47.5 animate-smoothFloat items-center justify-center rounded-full border border-[rgba(12,117,112,.3)] bg-white/5 shadow-[0_15px_35px_rgba(0,16,80,.4),inset_0_0_20px_rgba(12,117,112,.05)] backdrop-blur-md">
          <Image
            src="/images/logo.jpeg"
            alt="Rapid Laundromat"
            width={150}
            height={150}
            className="h-37.5 w-37.5 rounded-full object-contain"
          />
        </div>
     {badge && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(0,112,208,.4)] bg-[rgba(0,96,208,.2)] px-4 py-[.38rem] text-[.72rem] font-bold uppercase tracking-[3px] text-[rgba(180,210,255,.9)]">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-[#4fc3f7] shadow-[0_0_8px_#4fc3f7]" />
          {badge}
        </div>
      )}
       <h1
         className="mb-[.6rem] text-[clamp(2.2rem,6vw,5.5rem)] font-black uppercase leading-[1.05] tracking-[2px] text-white"
         style={{ fontFamily: "var(--font-barlow-condensed)" }}
       >
         <HighlightText
           text={heading}
           highlight={headingHighlight}
         />
       </h1>

        <p className="mx-auto mb-5 max-w-170 text-[clamp(.95rem,2vw,1.2rem)] font-normal leading-[1.7] tracking-[.5px] text-[rgba(200,225,255,.8)]">
          Trusted by families, hotels, restaurants and businesses for
          professional laundry, dry cleaning, bridal dress care, shoe
          cleaning and commercial linen solutions.
        </p>

        <div className="mb-7 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-[rgba(0,96,208,.35)] bg-[rgba(0,64,160,.25)] px-4 py-[.36rem] text-[.82rem] font-semibold text-[rgba(200,225,255,.9)]">
            📍 Kurunegala
          </span>
          <span className="rounded-full border border-[rgba(0,96,208,.35)] bg-[rgba(0,64,160,.25)] px-4 py-[.36rem] text-[.82rem] font-semibold text-[rgba(200,225,255,.9)]">
            📍 Kandy
          </span>
          <span className="rounded-full border border-[rgba(0,144,255,.5)] bg-[rgba(0,96,208,.3)] px-4 py-[.36rem] text-[.82rem] font-semibold text-[#90caf9]">
            ⭐ 5.0 Google Rating
          </span>
          <span className="rounded-full border border-[rgba(0,96,208,.35)] bg-[rgba(0,64,160,.25)] px-4 py-[.36rem] text-[.82rem] font-semibold text-[rgba(200,225,255,.9)]">
            🕐 7:30 AM – 6:00 PM Daily
          </span>
        </div>

        {/* Corrected anchor tags here */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-[5px] bg-linear-to-br from-bright to-light px-8 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white shadow-[0_4px_20px_rgba(0,96,208,.45)] transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_8px_32px_rgba(0,96,208,.6)]"
          >
            📅 Book Pickup
          </a>
          <a
            href="https://wa.me/94703171717"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[5px] bg-[#25d366] px-8 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white shadow-[0_4px_18px_rgba(37,211,102,.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5c]"
          >
            💬 WhatsApp Now
          </a>
          <a
            href="#commercial"
            className="inline-flex items-center gap-2 rounded-[5px] border-2 border-white/30 px-8 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/8"
          >
            🏢 Commercial Proposal
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-[5px] border-2 border-white/30 px-8 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/8"
          >
            🔍 View Services
          </a>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[.72rem] uppercase tracking-[2px] text-[rgba(180,210,255,.4)]">
        <span>Scroll</span>
        <div className="h-4.5 w-4.5 animate-bounceArrow rotate-0 border-b-2 border-r-2 border-[rgba(180,210,255,.3)]" />
      </div>
    </section>
  );
}