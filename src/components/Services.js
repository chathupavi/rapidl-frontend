const services = [
  {
    icon: "👕",
    name: "Wash & Fold",
    desc: "Drop off your laundry and pick it up neatly folded, fresh and perfectly clean. Ideal for busy lifestyles.",
    badge: "Everyday Service",
  },
  {
    icon: "✨",
    name: "Dry Cleaning",
    desc: "Expert dry-cleaning for suits, sarees, dresses and delicate fabrics. Professional-grade solvents used.",
    badge: "Premium Care",
  },
  {
    icon: "👔",
    name: "Ironing & Pressing",
    desc: "Crisp, wrinkle-free results for shirts, trousers, school uniforms and formal wear. Steam ironing systems.",
    badge: "Always Sharp",
  },
  {
    icon: "👰",
    name: "Bridal Gown Care",
    desc: "Specialist dry-cleaning and long-term preservation for bridal gowns, sarees and wedding garments. Handled with white-glove care.",
    badge: "Specialist Service",
  },
  {
    icon: "🛏️",
    name: "Bedding & Linen",
    desc: "Deep-clean duvets, sheets, pillowcases and curtains using heavy-capacity industrial machines.",
    badge: "Deep Clean",
  },
  {
    icon: "🪟",
    name: "Curtains & Upholstery",
    desc: "Professional cleaning of curtains, sofa covers and upholstery fabrics to restore freshness.",
    badge: "Home Fabrics",
  },
  {
    icon: "🎯",
    name: "Stain Removal",
    desc: "Specialist stain removal treatment for tough stains — food, oil, ink, and more.",
    badge: "Specialist",
  },
  {
    icon: "⚡",
    name: "Express Laundry",
    desc: "Need it fast? Our 1-hour express service gets your clothes back to you the same day — guaranteed.",
    badge: "1-Hour Express",
  },
  {
    icon: "🚗",
    name: "Pickup & Delivery",
    desc: "We come to you! Schedule a pickup and we deliver clean laundry back to your door. Hotels included.",
    badge: "Door-to-Door",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          Personal Laundry
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Professional Care
          <br />
          For Every Garment
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-muted">
          From everyday washing to the most delicate fabrics — we handle
          every item with expertise and care.
        </p>

        <div className="mt-11 grid grid-cols-1 gap-[1.3rem] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="relative overflow-hidden rounded-xl border border-[rgba(0,64,160,.08)] bg-white p-7 shadow-[0_4px_22px_rgba(0,64,160,.07)] transition-all duration-300 hover:-translate-y-1.25 hover:shadow-[0_14px_40px_rgba(0,64,160,.15)]"
            >
              {/* top accent bar */}
              <div className="absolute left-0 right-0 top-0 h-0.75 bg-linear-to-r from-accent to-bright" />

              <div className="mb-[.85rem] text-[2.2rem]">{service.icon}</div>

              <h3 className="mb-[.4rem] font-barlowCond text-[1.4rem] font-extrabold uppercase leading-none tracking-[1px] text-navy">
                {service.name}
              </h3>

              <p className="text-[.87rem] leading-[1.68] text-muted">
                {service.desc}
              </p>

              <span className="mt-[.85rem] inline-block rounded-full border border-[rgba(0,64,176,.15)] bg-foam px-[.7rem] py-[.2rem] text-[.7rem] font-extrabold uppercase tracking-[.5px] text-accent">
                {service.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}