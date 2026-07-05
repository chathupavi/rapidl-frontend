const techItems = [
  { icon: "🌀", title: "Industrial Front-Load Washers", desc: "High-capacity machines for deep, thorough cleaning every cycle." },
  { icon: "💨", title: "Fast Commercial Dryers", desc: "Rapid drying with temperature control to protect all fabric types." },
  { icon: "♨️", title: "Steam Ironing Systems", desc: "Professional steam presses for crisp, wrinkle-free results every time." },
  { icon: "🌿", title: "Eco-Friendly Detergents", desc: "Gentle on fabrics, safe for skin, kind to the environment." },
  { icon: "🛡️", title: "Hygienic Sanitization", desc: "Full sanitization process — safe for babies, allergy sufferers & medical use." },
];

export default function Tech() {
  return (
    <section id="tech" className="bg-navy px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-light">
          Our Equipment
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          Professional Technology
          <br />
          Behind Every Wash
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-[rgba(180,210,255,.5)]">
          We invest in the best machines so your garments get the best
          results — consistently, every time.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2 lg:grid-cols-5">
          {techItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[10px] border border-[rgba(0,96,208,.2)] bg-[rgba(0,96,208,.08)] p-6 text-center transition-colors duration-300 hover:border-[rgba(0,144,255,.4)] hover:bg-[rgba(0,96,208,.16)]"
            >
              <div className="mb-[.7rem] text-[2rem]">{item.icon}</div>
              <h4 className="mb-[.3rem] font-barlowCond text-[1.05rem] font-bold uppercase tracking-[.5px] text-white">
                {item.title}
              </h4>
              <p className="text-[.8rem] leading-[1.55] text-[rgba(180,210,255,.5)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}