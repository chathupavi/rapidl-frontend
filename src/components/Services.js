"use client";

export default function Services({ data = {} }) {
  const {
    label = "Personal Laundry",
    heading = "Professional Care For Every Garment",
    description = "",
    items = [],
  } = data;

  // Don't render if there are no services
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="services" className="bg-white px-[5%] py-22.5">
      <div className="mx-auto max-w-275">

        {/* Section Label */}
        {label && (
          <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
            {label}
          </p>
        )}

        {/* Heading */}
        {heading && (
          <h2 className="mb-[.9rem] whitespace-pre-line font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
            {heading}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p className="max-w-140 text-[.97rem] leading-[1.85] text-muted">
            {description}
          </p>
        )}

        {/* Services */}
        <div className="mt-11 grid grid-cols-1 gap-[1.3rem] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <div
              key={
                service._id ||
                service.name ||
                `service-${index}`
              }
              className="relative overflow-hidden rounded-xl border border-[rgba(0,64,160,.08)] bg-white p-7 shadow-[0_4px_22px_rgba(0,64,160,.07)] transition-all duration-300 hover:-translate-y-1.25 hover:shadow-[0_14px_40px_rgba(0,64,160,.15)]"
            >
              {/* Top Accent Bar */}
              <div className="absolute left-0 right-0 top-0 h-0.75 bg-linear-to-r from-accent to-bright" />

              {/* Icon */}
              {service.icon && (
                <div className="mb-[.85rem] text-[2.2rem]">
                  {service.icon}
                </div>
              )}

              {/* Service Name */}
              {service.name && (
                <h3 className="mb-[.4rem] font-barlowCond text-[1.4rem] font-extrabold uppercase leading-none tracking-[1px] text-navy">
                  {service.name}
                </h3>
              )}

              {/* Description */}
              {service.desc && (
                <p className="text-[.87rem] leading-[1.68] text-muted">
                  {service.desc}
                </p>
              )}

              {/* Badge */}
              {service.badge && (
                <span className="mt-[.85rem] inline-block rounded-full border border-[rgba(0,64,176,.15)] bg-foam px-[.7rem] py-[.2rem] text-[.7rem] font-extrabold uppercase tracking-[.5px] text-accent">
                  {service.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}