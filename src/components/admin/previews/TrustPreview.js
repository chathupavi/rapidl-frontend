"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TrustPreview({ data = {} }) {
  const {
    label = "",
    heading = "",
    description = "",
    items = [],
  } = data;

  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(600);

  // This represents the actual desktop website width
  const DESIGN_WIDTH = 1440;

  useEffect(() => {
    const updatePreview = () => {
      if (!containerRef.current || !contentRef.current) {
        return;
      }

      const availableWidth =
        containerRef.current.clientWidth;

      // Never allow preview to become larger than original
      const newScale = Math.min(
        availableWidth / DESIGN_WIDTH,
        1
      );

      setScale(newScale);

      // Get actual desktop content height
      const contentHeight =
        contentRef.current.scrollHeight;

      // Calculate scaled height
      setHeight(contentHeight * newScale);
    };

    updatePreview();

    const resizeObserver =
      new ResizeObserver(updatePreview);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener(
      "resize",
      updatePreview
    );

    return () => {
      resizeObserver.disconnect();

      window.removeEventListener(
        "resize",
        updatePreview
      );
    };
  }, [data, items.length]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl bg-foam"
      style={{
        height: `${height}px`,
      }}
    >
      {/* =========================================
          LIVE PREVIEW BADGE
      ========================================= */}
      <div className="absolute right-4 top-4 z-50 rounded-full border border-navy/10 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-navy/50 shadow-sm backdrop-blur-md">
        Live Preview
      </div>

      {/* =========================================
          DESKTOP WEBSITE CANVAS
      ========================================= */}
      <div
        ref={contentRef}
        className="absolute left-0 top-0"
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <section
          id="trust"
          className="bg-foam px-[5%] py-17.5"
        >
          <div className="mx-auto max-w-275">

            {/* =====================================
                SECTION LABEL
            ===================================== */}
            {label && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright"
              >
                {label}
              </motion.p>
            )}

            {/* =====================================
                HEADING
            ===================================== */}
            {heading && (
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mb-[.9rem] whitespace-pre-line font-barlowCond text-[3.2rem] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy"
              >
                {heading}
              </motion.h2>
            )}

            {/* =====================================
                DESCRIPTION
            ===================================== */}
            {description && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="max-w-140 text-[.97rem] leading-[1.85] text-muted"
              >
                {description}
              </motion.p>
            )}

            {/* =====================================
                TRUST CARDS
            ===================================== */}
            {items?.length > 0 && (
              <div className="mt-10 grid grid-cols-4 gap-[1.4rem]">
                {items.map((item, index) => {
                  const currentSize =
                    item.valueSize ||
                    item.ValueSize;

                  const isMedium =
                    currentSize === "medium";

                  return (
                    <motion.div
                      key={
                        item._id ||
                        `${item.label || "card"}-${index}`
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
                        delay: index * 0.08,
                      }}
                      className="rounded-[14px] border border-[rgba(0,64,160,.08)] bg-white px-6 py-8 text-center shadow-[0_4px_22px_rgba(0,64,160,.08)]"
                    >
                      {/* Icon */}
                      {item.icon && (
                        <div className="mb-3 text-[2.2rem]">
                          {item.icon}
                        </div>
                      )}

                      {/* Caption */}
                      {item.caption && (
                        <div className="mb-[.3rem] text-[1rem]">
                          {item.caption}
                        </div>
                      )}

                      {/* Value */}
                      {item.value && (
                        <div
                          className={`mb-1 font-barlowCond font-black leading-none tracking-[1px] text-navy ${
                            isMedium
                              ? "text-[1.8rem]"
                              : "text-[2.8rem]"
                          }`}
                        >
                          {item.value}
                        </div>
                      )}

                      {/* Label */}
                      {item.label && (
                        <div className="text-[.78rem] font-bold uppercase tracking-[1.5px] text-muted">
                          {item.label}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* =====================================
                EMPTY STATE
            ===================================== */}
            {!label &&
              !heading &&
              !description &&
              (!items ||
                items.length === 0) && (
                <div className="rounded-xl border border-navy/10 bg-white px-6 py-8 text-center text-sm text-muted">
                  Start editing the Trust section
                  to see the preview.
                </div>
              )}
          </div>
        </section>
      </div>
    </div>
  );
}