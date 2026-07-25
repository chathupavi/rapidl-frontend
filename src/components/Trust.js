"use client";

export default function Trust({ data = {} }) {
  const {
    label = "Why Rapid Laundromat",
    heading = "Premium Standards. Proven Results.",
    description = "",
    items = [],
  } = data;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="trust" className="bg-foam px-[5%] py-17.5">
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

        {/* Trust Cards */}
        <div className="mt-10 grid grid-cols-1 gap-[1.4rem] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            
            // FIX 1: Safely grab the size whether it was typed as valueSize or ValueSize
            const currentSize = item.valueSize || item.ValueSize;
            const isMedium = currentSize === "medium";
            
            return (
              <div
                key={item._id || `${item.label}-${index}`}
                className="rounded-[14px] border border-[rgba(0,64,160,.08)] bg-white px-6 py-8 text-center shadow-[0_4px_22px_rgba(0,64,160,.08)] transition-transform duration-300 hover:-translate-y-1.25"
              >
                {/* Icon */}
                {item.icon && (
                  <div className="mb-3 text-[2.2rem]">
                    {item.icon}
                  </div>
                )}

                {/* Optional Caption */}
                {item.caption && (
                  <div className="mb-[.3rem] text-[1rem]">
                    {item.caption}
                  </div>
                )}

                {/* Value */}
                <div
                  className={`mb-1 font-barlowCond font-black leading-none tracking-[1px] text-navy ${
                    isMedium ? "text-[1.8rem]" : "text-[2.8rem]"
                  }`}
                >
                  {item.value}
                </div>

                {/* FIX 2: Actually render the text on the screen so you can see it */}
                {currentSize && (
                  <div className="mb-2 text-[0.8rem] italic text-gray-400">
                  </div>
                )}

                {/* Label */}
                {item.label && (
                  <div className="text-[.78rem] font-bold uppercase tracking-[1.5px] text-muted">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}