"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* =========================================================
   COUNTER PREVIEW
========================================================= */
function Counter({
  target,
  prefix = "",
  suffix = "",
  animated = true,
}) {
  const originalValue = String(target ?? "");
  const numericTarget = Number(originalValue);

  const [value, setValue] = useState(
    animated ? 0 : numericTarget
  );

  useEffect(() => {
    if (!animated) return;

    const duration = 1800;
    const startTime = performance.now();

    let animationFrame;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(
        elapsed / duration,
        1
      );

      // Smooth ease-out
      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      const currentValue =
        numericTarget * easedProgress;

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
  }, [numericTarget, animated]);

  /* =========================================================
     STATIC VALUE
     Preserve exact database formatting.
     Example: "5.0" stays "5.0"
  ========================================================= */
  if (!animated) {
    return (
      <span className="inline-block">
        {prefix}
        {originalValue}
        {suffix}
      </span>
    );
  }

  /* =========================================================
     ANIMATED VALUE
     Preserve decimal places
  ========================================================= */
  const decimalPart =
    originalValue.split(".")[1];

  const decimalPlaces = decimalPart
    ? decimalPart.length
    : 0;

  const display = value.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (
    <span className="inline-block tabular-nums tracking-tight">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* =========================================================
   STATS STRIP PREVIEW
========================================================= */
export default function StatsStripPreview({
  data = {},
}) {
  const { stats = [] } = data;

  /* =========================================================
     EMPTY STATE
  ========================================================= */
  if (!stats || stats.length === 0) {
    return (
      <div className="relative flex min-h-40 items-center justify-center overflow-hidden rounded-3xl border-b border-[rgba(0,96,208,.2)] bg-navy">
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/50">
          Add statistics to preview your Stats Strip.
        </div>

        {/* Preview Label */}
        <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 backdrop-blur-md">
          Live Preview
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border-b
        border-[rgba(0,96,208,.2)]
        bg-navy
      "
    >
      {/* =====================================================
          PREVIEW CONTENT
          Same background and styling as actual StatsStrip
      ====================================================== */}
      <div className="flex min-h-40 flex-wrap items-center justify-center gap-14 px-[5%] py-[1.6rem]">
        {stats.map((stat, index) => {
          const isAnimated =
            stat.animated === true;

          return (
            <motion.div
              key={`${stat.label}-${index}`}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group text-center text-white"
            >
              {/* =================================================
                  STAT VALUE
              ================================================== */}
              <div className="font-barlowCond text-[2.4rem] font-extrabold leading-none tracking-[1px] text-white transition-transform duration-500 group-hover:scale-105">
                <Counter
                  target={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix || ""}
                  animated={isAnimated}
                />
              </div>

              {/* =================================================
                  STAT LABEL
              ================================================== */}
              <div className="mt-[.2rem] text-[.72rem] uppercase tracking-[1.5px] text-white/40">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* =====================================================
          PREVIEW LABEL
      ====================================================== */}
      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 backdrop-blur-md">
        Live Preview
      </div>
    </div>
  );
}