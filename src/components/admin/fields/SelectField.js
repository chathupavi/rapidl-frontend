"use client";

import { motion } from "framer-motion";
import { ChevronDown, List } from "lucide-react";

export default function SelectField({
  field,
  value,
  onChange,
}) {
  const options = Array.isArray(field.options)
    ? field.options
    : [];

  const fieldId = `select-${field.name}`;

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

        <label
          htmlFor={fieldId}
          className="text-xs font-black uppercase tracking-[2px] text-gray-500"
        >
          {field.label}
        </label>
      </div>

      {/* Select Container */}
      <div className="group relative">
        <select
          id={fieldId}
          name={field.name}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={field.disabled || false}
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

            placeholder:text-gray-300

            hover:border-cyan-300

            focus:border-cyan-400
            focus:ring-4
            focus:ring-cyan-400/10

            disabled:cursor-not-allowed
            disabled:bg-gray-100
            disabled:text-gray-400
            disabled:hover:border-gray-200
          "
        >
          {/* Placeholder */}
          <option value="">
            {field.placeholder || "Select an option..."}
          </option>

          {/* Options */}
          {options.map((option, index) => {
            // Supports:
            // "primary"
            // OR
            // { value: "primary", label: "Primary" }

            const optionValue =
              typeof option === "object"
                ? option.value
                : option;

            const optionLabel =
              typeof option === "object"
                ? option.label
                : option;

            return (
              <option
                key={`${optionValue}-${index}`}
                value={optionValue}
              >
                {optionLabel}
              </option>
            );
          })}
        </select>

        {/* Dropdown Arrow */}
        <div
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            rounded-lg
            bg-gray-100
            p-1
            text-gray-400
            transition-all
            duration-300

            group-hover:bg-cyan-50
            group-hover:text-cyan-500

            group-focus-within:bg-cyan-50
            group-focus-within:text-cyan-600
          "
        >
          <ChevronDown
            size={16}
            className="transition-transform duration-300 group-focus-within:rotate-180"
          />
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

      {/* Optional Help Text */}
      {field.description && (
        <p className="text-xs font-medium text-gray-400">
          {field.description}
        </p>
      )}
    </motion.div>
  );
}