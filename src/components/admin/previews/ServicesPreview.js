"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ServicesPreview({ data = {} }) {
  const {
    label = "",
    heading = "",
    description = "",
    items = [],
  } = data;

  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Real website desktop design width
  const DESIGN_WIDTH = 1440;

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const availableWidth = containerRef.current.clientWidth;

      const newScale = Math.min(
        availableWidth / DESIGN_WIDTH,
        1
      );

      setScale(newScale);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const hasContent =
    label ||
    heading ||
    description ||
    (items && items.length > 0);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl bg-white"
    >
      {/* Live Preview Badge */}
      <div className="absolute right-4 top-4 z-50 rounded-full border border-navy/10 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-navy/50 shadow-sm backdrop-blur-md">
        Live Preview
      </div>

      {/* Scaled Desktop Website */}
      <div
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          marginBottom: `-${(1 - scale) * 100}%`,
        }}
      >
        {/* EXACT REAL WEBSITE SERVICES SECTION */}
        <section
          id="services"
          className="bg-white px-[5%] py-22.5"
        >
          <div className="mx-auto max-w-275">

            {/* Section Label */}
            {label && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright"
              >
                {label}
              </motion.p>
            )}

            {/* Heading */}
            {heading && (
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-[.9rem] whitespace-pre-line font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy"
              >
                {heading}
              </motion.h2>
            )}

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-140 text-[.97rem] leading-[1.85] text-muted"
              >
                {description}
              </motion.p>
            )}

            {/* Empty State */}
            {!hasContent && (
              <div className="mt-10 rounded-xl border border-navy/10 bg-foam px-6 py-10 text-center text-sm text-muted">
                Start editing the Services section to see the preview.
              </div>
            )}

            {/* Service Cards */}
            {items && items.length > 0 && (
              <div className="mt-11 grid grid-cols-1 gap-[1.3rem] sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, index) => (
                  <motion.div
                    key={
                      service._id ||
                      service.name ||
                      `service-${index}`
                    }
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                    }}
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

                    {/* Empty Card State */}
                    {!service.icon &&
                      !service.name &&
                      !service.desc &&
                      !service.badge && (
                        <div className="text-sm text-muted">
                          Empty service card
                        </div>
                      )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}