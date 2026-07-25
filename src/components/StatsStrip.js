"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   COUNTER COMPONENT
========================================================= */
function Counter({
  target,
  prefix = "",
  suffix = "",
  start = false,
  animated = true,
}) {
  const originalValue = String(target ?? "");
  const numericTarget = Number(originalValue);

  const [value, setValue] = useState(animated ? 0 : numericTarget);

  useEffect(() => {
    if (!animated || !start) return;

    // Slightly longer duration for a more premium, unhurried feel
    const duration = 2400; 
    const startTime = performance.now();
    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Upgraded to Quartic ease-out: faster start, much smoother, longer tail
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = numericTarget * easedProgress;

      setValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [start, numericTarget, animated]);

  if (!animated) {
    return (
      <span className="inline-block">
        {prefix}{originalValue}{suffix}
      </span>
    );
  }

  const decimalPart = originalValue.split(".")[1];
  const decimalPlaces = decimalPart ? decimalPart.length : 0;

  const display = value.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (
    <span className="inline-block tabular-nums tracking-tight">
      {prefix}{display}{suffix}
    </span>
  );
}

/* =========================================================
   STATS STRIP COMPONENT
========================================================= */
export default function StatsStrip({ data = {} }) {
  const [start, setStart] = useState(false);
  const stripRef = useRef(null);

  const { stats = [] } = data;

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger slightly earlier so animation is visible as they scroll
        rootMargin: "0px 0px -10% 0px", // Prevents triggering before it truly enters the visual hierarchy
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!stats || stats.length === 0) return null;

  return (
    <div
      ref={stripRef}
      className="flex flex-wrap justify-center gap-14 border-b border-[rgba(0,96,208,.2)] bg-navy px-[5%] py-[3rem] overflow-hidden"
    >
      {stats.map((stat, index) => {
        const isAnimated = stat.animated !== false;

        return (
          <div
            key={`${stat.label}-${index}`}
            // 1. Spatial Animation: Slide up and fade in
            // 2. Stagger: Dynamic transition delay based on index
            className={`group flex flex-col items-center justify-center text-center text-white transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              start
                ? "translate-y-0 opacity-100 blur-none"
                : "translate-y-8 opacity-0 blur-[2px]"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Micro-interaction: Subtle scale and color shift on hover */}
            <div className="font-barlowCond text-[2.8rem] font-extrabold leading-none tracking-[1px] text-white transition-transform duration-500 group-hover:scale-105 group-hover:text-blue-200">
              <Counter
                target={stat.value}
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
                start={start}
                animated={isAnimated}
              />
            </div>

            <div className="mt-[.6rem] text-[.8rem] uppercase tracking-[2px] text-white/50 transition-colors duration-500 group-hover:text-white/80">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}