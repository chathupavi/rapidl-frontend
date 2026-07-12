"use client";

import { motion } from "framer-motion";
import { ChevronDown, List } from "lucide-react";

export default function SelectField({
  field,
  value,
  onChange,
}) {
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
          <List size={13} />
        </div>

        <label className="text-xs font-black uppercase tracking-[2px] text-gray-500">
          {field.label}
        </label>
      </div>

      {/* Select */}
      <div className="group relative">
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="
            peer
            w-full
            appearance-none
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-5
            py-4
            pr-12
            text-base
            font-medium
            text-[#07111f]
            outline-none
            transition-all
            duration-300

            hover:border-cyan-300

            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-400/10
          "
        >
          <option value="">Select an option...</option>

          {field.options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        {/* Arrow */}
        <div
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            transition
            duration-300
            group-focus-within:text-cyan-600
            group-hover:text-cyan-500
          "
        >
          <ChevronDown size={18} />
        </div>

        {/* Focus Glow */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-2xl
            ring-2
            ring-cyan-400/30
            opacity-0
            transition
            duration-300
            group-focus-within:opacity-100
          "
        />
      </div>
    </motion.div>
  );
}