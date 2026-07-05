const trustItems = [
  {
    icon: "⭐",
    value: "5.0",
    label: "Google Verified Rating",
  },
  {
    icon: "🏭",
    caption: "Professional Equipment",
    value: "Industrial",
    valueSize: "text-[2rem]",
    label: "Grade Machines",
  },
  {
    icon: "🌿",
    value: "Eco",
    valueSize: "text-[2rem]",
    label: "Friendly Solutions",
  },
  {
    icon: "👨‍💼",
    value: "28+",
    label: "Years Leadership Experience",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="bg-foam px-[5%] py-17.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          Why Rapid Laundromat
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Premium Standards.
          <br />
          Proven Results.
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-muted">
          Sri Lanka&apos;s most trusted name in professional garment care —
          backed by real numbers, verified reviews and 28 years of expertise.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-[1.4rem] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="rounded-[14px] border border-[rgba(0,64,160,.08)] bg-white px-6 py-8 text-center shadow-[0_4px_22px_rgba(0,64,160,.08)] transition-transform duration-300 hover:-translate-y-1.25"
            >
              <div className="mb-3 text-[2.2rem]">{item.icon}</div>

              {item.caption && (
                <div className="mb-[.3rem] text-[1rem]">{item.caption}</div>
              )}

              <div
                className={`mb-1 font-barlowCond font-black leading-none tracking-[1px] text-navy ${
                  item.valueSize ?? "text-[2.8rem]"
                }`}
              >
                {item.value}
              </div>

              <div className="text-[.78rem] font-bold uppercase tracking-[1.5px] text-muted">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}