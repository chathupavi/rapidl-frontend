"use client";

import { useState } from "react";
import { Smile, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const emojis = [
  // Booking / Actions
  "📅", "🗓️", "⏰", "🕐", "⌛", "✅", "❌", "🔍", "➕", "➡️", "⬅️", "📌", "🔔",
  // Communication
  "💬", "📞", "☎️", "📱", "✉️", "📧", "📝", "📢", "📣",
  // Location
  "📍", "🏠", "🏡", "🏢", "🏬", "🌍", "🌎", "🗺️", "🚩",
  // Laundry / Garment Care
  "👕", "👔", "👗", "👚", "🧥", "👖", "🧦", "🩳", "🧺", "🧼", "🫧", "💧", "🚿", "♨️", "✨", "🌟",
  // Cleaning / Quality
  "🧹", "🧽", "🪣", "🧴", "🛁", "🧤", "🌿", "🍃", "💎", "🏆",
  // Delivery / Transport
  "🚚", "🚛", "🚗", "🚙", "🏍️", "🚐", "📦", "🛻", "🛵", "🧳",
  // Business / Commercial
  "🏭", "🏪", "🏦", "💼", "🤝", "👥", "👤", "📊", "📈", "📉", "💰", "💵",
  // Trust / Security
  "⭐", "🥇", "🥈", "🥉", "🏅", "🛡️", "🔒", "👍", "👌", "❤️", "💙", "🤍",
  // Technology
  "💻", "🖥️", "📲", "⚙️", "🔧", "🔗", "☁️", "🖨️",
  // Services
  "🧾", "📋", "📄", "🎯", "🚀", "💡", "🔥", "🎉", "🎁",
  // Social Media
  "📸", "🎥", "▶️", "👏", "😊", "😍", "🥰",
  // Nature / Premium
  "🌱", "🌸", "🌺", "🌈", "☀️", "🌙",
];

export default function EmojiField({ field, value, onChange }) {
  const [open, setOpen] = useState(false);
  const currentValue = value || "";

  return (
    <div className="relative flex w-full flex-col gap-2.5">
      {/* Label */}
      <div className="flex items-center gap-1">
        <label className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-gray-600">
          {field?.label || "Icon"}
        </label>
        {field?.required && (
          <span className="text-xs font-bold text-red-500">*</span>
        )}
      </div>

      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50/50 px-3 transition-all hover:border-cyan-300 hover:bg-white focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xl shadow-sm">
            {currentValue || "😀"}
          </span>
          <span className="text-xs font-semibold text-gray-500">
            {currentValue ? "Selected icon" : "Choose an icon"}
          </span>
        </div>
        <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 shadow-sm">
          Emoji
        </span>
      </button>

      {/* Picker */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-2 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,.15)]"
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800">Select Icon</h3>
                <p className="mt-0.5 text-xs text-gray-400">Choose an emoji for this item</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>

            {/* Emoji Grid */}
            <div className="grid max-h-40 grid-cols-10 gap-1.5 overflow-y-auto pr-1">
              {emojis.map((emoji, index) => {
                const selected = currentValue === emoji;

                return (
                  <button
                    key={`${emoji}-${index}`}
                    type="button"
                    onClick={() => {
                      onChange(emoji);
                      setOpen(false);
                    }}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-lg text-lg transition-all hover:scale-110 hover:bg-cyan-50 ${
                      selected ? "bg-cyan-100 ring-2 ring-cyan-400" : "bg-transparent"
                    }`}
                  >
                    {emoji}
                    {selected && (
                      <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-cyan-500 text-white">
                        <Check size={9} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clear */}
            {currentValue && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="mt-3 w-full rounded-lg border border-gray-200 py-2 text-xs font-bold text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                Remove Icon
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}