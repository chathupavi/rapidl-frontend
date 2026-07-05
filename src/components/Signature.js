const signatureServices = [
  {
    icon: "👠",
    name: "Luxury Shoe & Bag Care",
    desc: "Deep cleaning, conditioning and restoration for leather, suede, canvas and designer footwear and handbags. Returned looking brand new.",
    tag: "Premium Restoration",
  },
  {
    icon: "👰",
    name: "Bridal Preservation",
    desc: "Professional cleaning and museum-quality preservation of wedding gowns, bridesmaids dresses and sarees — protecting memories for generations.",
    tag: "Heritage Care",
  },
  {
    icon: "🛋️",
    name: "Carpet, Sofa & Curtain Cleaning",
    desc: "Complete home fabric care — deep-extraction cleaning for carpets, sofas and curtains. Removes dust, allergens and stains for a truly fresh home.",
    tag: "Home Interiors",
  },
  {
    icon: "👔",
    name: "Corporate Uniform Care",
    desc: "Immaculate cleaning and pressing for hotel staff uniforms, corporate workwear and branded garments. Consistent standards, every batch.",
    tag: "B2B Specialist",
  },
];

export default function Signature() {
  return (
    <section
      id="signature"
      className="px-[5%] py-22.5"
      style={{
        background:
          "linear-gradient(155deg, #001050 0%, #0a0a2e 50%, #002060 100%)",
      }}
    >
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-gold">
          Signature Care Solutions
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          Luxury Garment Care
          <br />
          <span className="text-gold">Beyond the Ordinary</span>
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-[rgba(200,225,255,.6)]">
          Specialist care for your most prized possessions — from bridal
          heritage to luxury footwear and statement home textiles.
        </p>

        <div className="mt-[2.8rem] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureServices.map((item) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(245,200,66,.15)] bg-white/4 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(245,200,66,.35)] hover:bg-[rgba(245,200,66,.05)]"
            >
              {/* top gold accent bar */}
              <div className="absolute left-0 right-0 top-0 h-0.5 bg-linear-to-r from-gold to-[rgba(245,200,66,.3)]" />

              <div className="mb-4 text-[2.5rem]">{item.icon}</div>

              <h3 className="mb-2 font-barlowCond text-[1.35rem] font-extrabold uppercase leading-none tracking-[1px] text-white">
                {item.name}
              </h3>

              <p className="text-[.86rem] leading-[1.7] text-[rgba(200,225,255,.55)]">
                {item.desc}
              </p>

              <span className="mt-[.9rem] inline-block rounded-full border border-[rgba(245,200,66,.25)] bg-[rgba(245,200,66,.12)] px-[.7rem] py-[.2rem] text-[.68rem] font-extrabold uppercase tracking-[1px] text-gold">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}