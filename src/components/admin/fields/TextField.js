"use client";

import { motion } from "framer-motion";
import { Type } from "lucide-react";

export default function TextField({ field, value, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3"
    >
      {/* Label */}
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
          <Type size={13} />
        </div>
        <label className="text-xs font-black uppercase tracking-[2px] text-gray-500">
          {field.label}
        </label>
      </div>

      {/* Input Container */}
      <div className="group relative">
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || "Enter text..."}
          className="peer w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pr-20 text-base font-medium text-[#07111f] outline-none transition-all duration-300 placeholder:text-gray-300 hover:border-cyan-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
        />

        {/* Input Type Badge */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-gray-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          TEXT
        </div>

        {/* Focus Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-cyan-400/30 opacity-0 transition duration-300 group-focus-within:opacity-100" />
      </div>
    </motion.div>
  );
}