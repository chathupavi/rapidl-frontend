"use client";

import { Hash, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function NumberField({ field, value, onChange }) {
  const currentValue = value ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col gap-2.5"
    >
      {/* Label Row */}
      <div className="flex items-center gap-1">
        <label className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-gray-600">
          {field.label}
        </label>
        {field.required && (
          <span className="text-xs font-bold text-red-500">*</span>
        )}
      </div>

      {/* Description */}
      {field.description && (
        <div className="flex items-start gap-1.5 text-xs leading-5 text-gray-400">
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>{field.description}</span>
        </div>
      )}

      {/* Number Input */}
      <div className="relative">
        <input
          type="number"
          value={currentValue}
          min={field.min}
          max={field.max}
          step={field.step || 1}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || "0"}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-[#07111f] outline-none transition-all duration-200 placeholder:text-gray-300 hover:border-cyan-300 hover:bg-white focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-400/10"
        />

        {/* Unit */}
        {field.unit && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 shadow-sm">
            {field.unit}
          </div>
        )}
      </div>
    </motion.div>
  );
}