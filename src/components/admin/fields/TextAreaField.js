"use client";

import { motion } from "framer-motion";
import { AlignLeft, Type } from "lucide-react";

export default function TextAreaField({ field, value, onChange }) {
  const length = (value ?? "").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
            <AlignLeft size={14} />
          </div>
          <label className="text-xs font-black uppercase tracking-[2px] text-gray-500">
            {field.label}
          </label>
        </div>

        {/* Character Counter */}
        <div className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold tracking-wide text-gray-400">
          {length} chars
        </div>
      </div>

      {/* Text Area Container */}
      <div className="group relative">
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || "Enter text..."}
          rows={5}
          className="peer min-h-32.5 w-full resize-y rounded-2xl border border-gray-200 bg-white px-5 py-4 text-base font-medium leading-relaxed text-[#07111f] outline-none transition-all duration-300 placeholder:text-gray-300 hover:border-cyan-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
        />

        {/* Bottom Typing Indicator */}
        <div className="pointer-events-none absolute bottom-3 right-4 flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 opacity-0 transition duration-300 group-focus-within:opacity-100">
          <Type size={11} />
          Writing
        </div>

        {/* Focus Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-cyan-400/30 opacity-0 transition duration-300 group-focus-within:opacity-100" />
      </div>
    </motion.div>
  );
}