"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 10000, suffix: "+", label: "Garments Processed" },
  { target: 500, suffix: "+", label: "Satisfied Customers" },
  { target: 50, suffix: "+", label: "Commercial Clients" },
  { target: 99, suffix: "%", label: "On-Time Delivery" },
];

function Counter({ target, suffix, start }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 1800;
    const step = (target / duration) * 16;
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setValue(Math.round(current));
      if (current >= target) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [start, target]);

  const display = target >= 1000 ? value.toLocaleString() : value;

  return (
    <span className="inline-block">
      {display}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  const [start, setStart] = useState(false);
  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stripRef}
      className="flex flex-wrap justify-center gap-14 border-b border-[rgba(0,96,208,.2)] bg-navy px-[5%] py-[1.6rem]"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="text-center text-white">
          <div className="font-barlowCond text-[2.4rem] font-extrabold leading-none tracking-[1px] text-white">
            <Counter target={stat.target} suffix={stat.suffix} start={start} />
          </div>
          <div className="mt-[.2rem] text-[.72rem] uppercase tracking-[1.5px] text-white/40">
            {stat.label}
          </div>
        </div>
      ))}

      {/* Static, non-counter stats */}
      <div className="text-center text-white">
        <div className="font-barlowCond text-[2.4rem] font-extrabold leading-none tracking-[1px] text-white">
          5.0★
        </div>
        <div className="mt-[.2rem] text-[.72rem] uppercase tracking-[1.5px] text-white/40">
          Google Rating
        </div>
      </div>

      <div className="text-center text-white">
        <div className="font-barlowCond text-[2.4rem] font-extrabold leading-none tracking-[1px] text-white">
          2
        </div>
        <div className="mt-[.2rem] text-[.72rem] uppercase tracking-[1.5px] text-white/40">
          Branches
        </div>
      </div>
    </div>
  );
}