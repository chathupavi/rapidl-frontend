"use client";

import { useRef, useCallback } from "react";

const items = [
  { id: "ba1", before: "👟", after: "✨", title: "Shoe Restoration", sub: "Leather & canvas deep cleaning + conditioning" },
  { id: "ba2", before: "👗", after: "✨", title: "Bridal Gown Care", sub: "Specialist dry-cleaning & preservation" },
  { id: "ba3", before: "🛏️", after: "✨", title: "Hotel Linen", sub: "Commercial bulk washing & pressing" },
  { id: "ba4", before: "🪟", after: "✨", title: "Curtain & Carpet Cleaning", sub: "Deep-extraction home fabric cleaning" },
];

function BeforeAfterCard({ item }) {
  const containerRef = useRef(null);
  const afterRef = useRef(null);
  const dividerRef = useRef(null);
  const handleRef = useRef(null);
  const dragging = useRef(false);

  const setPos = useCallback((pct) => {
    const clamped = Math.max(5, Math.min(95, pct));
    if (afterRef.current) {
      afterRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    }
    if (dividerRef.current) dividerRef.current.style.left = `${clamped}%`;
    if (handleRef.current) handleRef.current.style.left = `${clamped}%`;
  }, []);

  const getX = (e) => (e.touches ? e.touches[0] : e).clientX;

  const updateFromEvent = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setPos(((getX(e) - rect.left) / rect.width) * 100);
  };

  const handleMouseDown = (e) => {
    dragging.current = true;
    e.preventDefault();
  };

  const handleTouchStart = () => {
    dragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    updateFromEvent(e);
  };

  const handleTouchMove = (e) => {
    if (!dragging.current) return;
    updateFromEvent(e);
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-[rgba(0,96,208,.2)] bg-white/4 transition-transform duration-300 hover:-translate-y-1.25">
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onTouchEnd={stopDragging}
        className="relative aspect-4/3 cursor-col-resize select-none"
      >
        <div className="absolute inset-0 z-1flex items-center justify-center bg-linear-to-br from-[#1a1a2e] to-[#16213e] text-[3.5rem]">
          {item.before}
        </div>
        <div
          ref={afterRef}
          className="absolute inset-0 z-2 flex items-center justify-center bg-linear-to-br from-accent to-bright text-[3.5rem]"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          {item.after}
        </div>
        <div
          ref={dividerRef}
          className="pointer-events-none absolute bottom-0 top-0 z-3 w-0.75 bg-white transition-[left] duration-100"
          style={{ left: "50%" }}
        />
        <div
          ref={handleRef}
          className="pointer-events-none absolute top-1/2 z-4 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[.8rem] font-bold text-navy shadow-[0_3px_12px_rgba(0,0,0,.3)]"
          style={{ left: "50%" }}
        >
          ◀▶
        </div>
        <div className="absolute left-2.5 top-2.5 z-5 rounded bg-black/60 px-[.6rem] py-1 text-[.68rem] font-extrabold uppercase tracking-[1px] text-white">
          Before
        </div>
        <div className="absolute right-2.5 top-2.5 z-5 rounded bg-[rgba(0,96,208,.8)] px-[.6rem] py-1 text-[.68rem] font-extrabold uppercase tracking-[1px] text-white">
          After
        </div>
      </div>

      <div className="p-6">
        <div className="mb-1 font-barlowCond text-[1.1rem] font-extrabold uppercase tracking-[.5px] text-white">
          {item.title}
        </div>
        <div className="text-[.8rem] text-[rgba(180,210,255,.45)]">
          {item.sub}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="px-[5%] py-22.5"
      style={{ background: "linear-gradient(160deg, #001050 0%, #002060 100%)" }}
    >
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-light">
          Transformations Gallery
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          See the Rapid
          <br />
          Laundromat Difference
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-[rgba(180,210,255,.55)]">
          Drag the slider to reveal the transformation. Real results from
          real garments and fabrics — no filters, no tricks.
        </p>

        <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}