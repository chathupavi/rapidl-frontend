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
  const [value, setValue] = useState(
    animated ? 0 : target
  );

  useEffect(() => {
    // No animation required
    if (!animated) return;

    // Wait until component enters viewport
    if (!start) return;

    const duration = 1800;
    const startTime = performance.now();

    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out animation
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(
        target * easedProgress
      );

      setValue(currentValue);

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [start, target, animated]);

  // If animation is disabled,
  // directly use the target value.
  const displayValue = animated
    ? value
    : target;

  const display =
    Number(target) >= 1000
      ? Number(displayValue).toLocaleString()
      : displayValue;

  return (
    <span className="inline-block">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
/* =========================================================
   STATS STRIP COMPONENT
========================================================= */
export default function StatsStrip({ data = {} }) {
  const [start, setStart] = useState(false);
  const stripRef = useRef(null);

  // Get stats dynamically from database/API
  const { stats = [] } = data;

  /* =========================================================
     START COUNTER WHEN COMPONENT ENTERS VIEWPORT
  ========================================================= */
  useEffect(() => {
    const el = stripRef.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);

          // Stop observing after animation starts
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     DON'T RENDER IF THERE ARE NO STATS
  ========================================================= */
  if (!stats || stats.length === 0) {
    return null;
  }

  /* =========================================================
     RENDER DYNAMIC STATS
  ========================================================= */
  return (
    <div
      ref={stripRef}
      className="flex flex-wrap justify-center gap-14 border-b border-[rgba(0,96,208,.2)] bg-navy px-[5%] py-[1.6rem]"
    >
      {stats.map((stat, index) => {
        // Make sure animated is treated as a boolean
        const isAnimated = stat.animated === true;

        return (
          <div
            key={`${stat.label}-${index}`}
            className="text-center text-white"
          >
            {/* ================================
                STAT VALUE
            ================================= */}
            <div className="font-barlowCond text-[2.4rem] font-extrabold leading-none tracking-[1px] text-white">
              <Counter
                target={Number(stat.value) || 0}
                prefix={stat.prefix || ""}
                suffix={stat.suffix || ""}
                start={start}
                animated={isAnimated}
              />
            </div>

            {/* ================================
                STAT LABEL
            ================================= */}
            <div className="mt-[.2rem] text-[.72rem] uppercase tracking-[1.5px] text-white/40">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}