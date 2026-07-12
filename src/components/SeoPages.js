const seoLinks = [
  {
    href: "#locations",
    icon: "🧺",
    title: "Laundry Kurunegala",
    desc: "Professional laundry & dry cleaning in Kurunegala, North Western Province",
  },
  {
    href: "#locations",
    icon: "✨",
    title: "Dry Cleaning Kandy",
    desc: "Expert dry cleaning for all fabric types in Kandy, Central Province",
  },
  {
    href: "#signature",
    icon: "👰",
    title: "Bridal Dress Cleaning Sri Lanka",
    desc: "Specialist bridal gown care & preservation across Sri Lanka",
  },
  {
    href: "#commercial",
    icon: "🏨",
    title: "Hotel Linen Laundry Sri Lanka",
    desc: "Bulk hotel linen and hospitality laundry solutions island-wide",
  },
  {
    href: "#signature",
    icon: "👠",
    title: "Shoe Cleaning Sri Lanka",
    desc: "Luxury shoe & bag restoration services in Kurunegala & Kandy",
  },
  {
    href: "#commercial",
    icon: "🏭",
    title: "Commercial Laundry Sri Lanka",
    desc: "B2B commercial laundry solutions for businesses across Sri Lanka",
  },
];

export default function SeoPages() {
  return (
    <section id="seo-pages" className="bg-navy px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-light">
          Service Areas
        </p>

        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          Find Rapid Laundromat
          <br />
          Near You
        </h2>

        <p className="max-w-140 text-[.97rem] leading-[1.85] text-[rgba(180,210,255,.55)]">
          Dedicated service pages for every location and specialist service — designed to help you find exactly what you need.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2 lg:grid-cols-3">
          {seoLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="block rounded-[10px] border border-[rgba(0,96,208,.2)] bg-[rgba(0,96,208,.08)] p-6 text-center no-underline transition-all duration-300 hover:-translate-y-0.75 hover:border-[rgba(0,144,255,.4)] hover:bg-[rgba(0,96,208,.18)]"
            >
              <div className="mb-[.7rem] text-[2rem]">{item.icon}</div>
              <div className="mb-[.3rem] font-barlowCond text-[1.05rem] font-bold uppercase tracking-[.5px] text-white">
                {item.title}
              </div>
              <p className="text-[.78rem] leading-[1.55] text-[rgba(180,210,255,.45)]">
                {item.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}