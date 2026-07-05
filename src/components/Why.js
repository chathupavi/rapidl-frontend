import Image from "next/image";

const whyItems = [
  {
    title: "5.0★ Google Verified Rating",
    desc: "Verified customer ratings reflecting genuine quality and professionalism across both branches.",
  },
  {
    title: "Professional Industrial Equipment",
    desc: "State-of-the-art machines delivering consistent, deep-clean results every cycle.",
  },
  {
    title: "Eco-Friendly Solutions",
    desc: "Biodegradable detergents, energy-efficient machines and responsible water use.",
  },
  {
    title: "Experienced, Trained Team",
    desc: "28+ years of manufacturing and operations expertise behind every service decision.",
  },
  {
    title: "Lean & Process-Driven",
    desc: "Strict documented workflows ensure the same perfect standard every single time.",
  },
  {
    title: "Two Convenient Branches",
    desc: "Kurunegala & Kandy — serving the Central & North Western Provinces daily.",
  },
];

export default function Why() {
  return (
    <section id="why" className="bg-foam px-[5%] py-22.5">
      <div className="mx-auto grid max-w-275 grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Visual side — hidden on mobile, like original */}
        <div className="relative hidden items-center justify-center lg:flex">
          <div
            className="relative flex h-75 w-75 items-center justify-center overflow-hidden rounded-full shadow-[0_20px_50px_rgba(0,16,80,.25)] animate-[smoothPulse_4s_ease-in-out_infinite]"
            style={{
              background: "linear-gradient(145deg, #002060, #0C7570, #001050)",
            }}
          >
            <div className="absolute inset-1.25 rounded-full border border-dashed border-white/20 animate-[spin_30s_linear_infinite]" />
            <Image
              src="/images/logo.jpeg"
              alt="Rapid Laundromat"
              width={225}
              height={225}
              className="h-[75%] w-[75%] rounded-full object-cover"
              style={{
                maskImage: "radial-gradient(circle, black 50%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(circle, black 50%, transparent 100%)",
              }}
            />
          </div>

          {/* floating badges */}
          <div
            className="absolute right-2.5 top-[8%] flex animate-float items-center gap-[.45rem] rounded-lg bg-white px-4 py-[.65rem] text-[.82rem] font-bold text-navy shadow-[0_6px_22px_rgba(0,0,0,.1)]"
          >
            <span className="h-2 w-2 rounded-full bg-bright" />
            Open Today
          </div>
          <div
            className="absolute bottom-[12%] left-5 flex items-center gap-[.45rem] rounded-lg bg-white px-4 py-[.65rem] text-[.82rem] font-bold text-navy shadow-[0_6px_22px_rgba(0,0,0,.1)] animate-[float_5s_ease-in-out_infinite] [animation-delay:2.5s]"
          >
            <span className="h-2 w-2 rounded-full bg-brandGreen" />
            5★ Rated
          </div>
          <div
            className="absolute right-6.25 top-[45%] flex items-center gap-[.45rem] rounded-lg bg-white px-4 py-[.65rem] text-[.82rem] font-bold text-navy shadow-[0_6px_22px_rgba(0,0,0,.1)] animate-[float_5s_ease-in-out_infinite] [animation-delay:1.2s]"
          >
            <span className="h-2 w-2 rounded-full bg-bright" />
            2 Branches
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
            Why Choose Us
          </p>
          <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
            Trusted by Families &<br />
            Businesses Across Sri Lanka
          </h2>
          <p className="max-w-140 text-[.97rem] leading-[1.85] text-muted">
            We&apos;re more than a laundry — we&apos;re your community
            service partner who genuinely cares about your garments.
          </p>

          <ul className="mt-7 flex flex-col gap-[1.1rem]">
            {whyItems.map((item) => (
              <li key={item.title} className="flex items-start gap-[.9rem]">
                <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-accent to-bright text-[.95rem] text-white">
                  ✓
                </div>
                <div>
                  <strong className="mb-[.18rem] block text-[.97rem] font-bold text-navy">
                    {item.title}
                  </strong>
                  <span className="text-[.86rem] text-muted">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}