const values = [
  { icon: "🌿", title: "Eco-Friendly", desc: "We use biodegradable, phosphate-free detergents and energy-efficient machines. Every wash is designed to be gentle on the planet — less water waste, less chemical runoff.", tag: "Sustainability First" },
  { icon: "✨", title: "Lean & Clean", desc: "We eliminate waste in our processes, our space and our time. Every step from garment intake to delivery is streamlined so nothing is wasted and everything is done right the first time.", tag: "Zero Waste Mindset" },
  { icon: "⚙️", title: "Process Oriented", desc: "We follow strict, documented workflows for every service. Our consistency comes from discipline and process, not guesswork. You get the same high standard every single visit.", tag: "Consistent Quality" },
  { icon: "🎯", title: "Highly Concentrated", desc: "Laundry and garment care is our sole focus — we have invested deeply in the right equipment, the right training and the right products to be genuinely excellent at what we do.", tag: "Deep Expertise" },
  { icon: "🤝", title: "Human Resource Focused", desc: "Our team is our greatest asset. We invest in training, fair working conditions and a respectful workplace culture. Happy staff deliver better care for your garments.", tag: "People & Culture" },
];

export default function Values() {
  return (
    <section
      id="values"
      className="px-[5%] py-22.5"
      style={{
        background:
          "linear-gradient(155deg, #001050 0%, #002060 50%, #002070 100%)",
      }}
    >
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-light">
          Our Core Values
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          Built on Values That
          <br />
          Matter to You & the Planet
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-[rgba(180,210,255,.55)]">
          Everything we do is guided by five core principles — from how we
          treat your clothes to how we treat our people and our environment.
        </p>

        <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((val) => (
            <div
              key={val.title}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(0,96,208,.18)] bg-[rgba(0,96,208,.08)] p-8 transition-all duration-300 hover:-translate-y-1.25 hover:bg-[rgba(0,96,208,.15)]"
            >
              <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent to-bright transition-transform duration-300 group-hover:scale-x-100" />

              <span className="mb-4 block text-[2.4rem]">{val.icon}</span>
              <div className="mb-[.55rem] font-barlowCond text-[1.4rem] font-extrabold uppercase tracking-[1px] text-white">
                {val.title}
              </div>
              <p className="text-[.86rem] leading-[1.72] text-[rgba(180,210,255,.55)]">
                {val.desc}
              </p>
              <span className="mt-4 inline-block rounded-full border border-[rgba(0,112,208,.3)] bg-[rgba(0,96,208,.2)] px-3 py-[.22rem] text-[.7rem] font-bold uppercase tracking-[1.5px] text-[rgba(144,202,249,.9)]">
                {val.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}