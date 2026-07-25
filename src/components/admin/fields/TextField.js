"use client";

import { motion } from "framer-motion";
import { Type, Info } from "lucide-react";

export default function TextField({ field, value, onChange }) {
  const currentValue = value ?? "";
  const maxLength = field.maxLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col gap-2.5"
    >
      {/* Label Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <label className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-gray-600">
            {field.label}
          </label>
          {field.required && (
            <span className="text-xs font-bold text-red-500">*</span>
          )}
        </div>

        {/* Character Counter */}
        {maxLength && (
          <span
            className={`text-[10px] font-semibold ${
              currentValue.length >= maxLength ? "text-red-500" : "text-gray-400"
            }`}
          >
            {currentValue.length}/{maxLength}
          </span>
        )}
      </div>

      {/* Helper Text */}
      {field.description && (
        <div className="flex items-start gap-1.5 text-xs leading-5 text-gray-400">
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>{field.description}</span>
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={currentValue}
          maxLength={maxLength}
          required={field.required}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || "Enter text..."}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-medium text-[#07111f] outline-none transition-all duration-200 placeholder:text-gray-300 hover:border-cyan-300 hover:bg-white focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-400/10"
        />
      </div>
    </motion.div>
  );
}