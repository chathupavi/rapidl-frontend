"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function BooleanField({ field, value, onChange }) {
  const currentValue = value ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex w-full items-start justify-between gap-6 py-2"
    >
      {/* Label & Description */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          {/* Label is now clickable for better UX */}
          <label 
            onClick={() => onChange(!currentValue)}
            className="cursor-pointer text-sm font-medium text-slate-800 transition-colors group-hover:text-slate-900"
          >
            {field.label}
          </label>

          {field.required && (
            <span 
              className="text-xs font-bold text-rose-500" 
              aria-hidden="true"
            >
              *
            </span>
          )}
        </div>

        {field.description && (
          <div className="flex items-start gap-1.5 text-[13px] leading-relaxed text-slate-500 transition-colors group-hover:text-slate-600">
            <Info 
              size={14} 
              className="mt-0.5 shrink-0 text-slate-400" 
            />
            <span>{field.description}</span>
          </div>
        )}
      </div>

      {/* Modern Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={currentValue}
        onClick={() => onChange(!currentValue)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full 
          border-2 border-transparent transition-colors duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2
          ${currentValue ? "bg-cyan-500" : "bg-slate-200 hover:bg-slate-300"}
        `}
      >
        <span className="sr-only">Toggle {field.label}</span>
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-1 ring-slate-900/5 transition duration-200 ease-in-out
            ${currentValue ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </motion.div>
  );
}