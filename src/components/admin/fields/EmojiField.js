"use client";

import { useState } from "react";

const emojis = [
  // Booking / Actions
  "📅", "🗓️", "⏰", "🕐", "⌛",
  "✅", "❌", "🔍", "➕", "➡️",
  "⬅️", "📌", "🔔",

  // Communication
  "💬", "📞", "☎️", "📱", "✉️",
  "📧", "📝", "📢", "📣",

  // Location
  "📍", "🏠", "🏡", "🏢", "🏬",
  "🌍", "🌎", "🗺️", "🚩",

  // Laundry / Garment Care
  "👕", "👔", "👗", "👚",
  "🧥", "👖", "🧦", "🩳",
  "🧺", "🧼", "🫧", "💧",
  "🚿", "♨️", "✨", "🌟",

  // Cleaning / Quality
  "🧹", "🧽", "🪣", "🧴",
  "🛁", "🧤", "🌿",
  "🍃", "💎", "🏆",

  // Delivery / Transport
  "🚚", "🚛", "🚗", "🚙",
  "🏍️", "🚐", "📦", "🛻",
  "🛵", "🧳",

  // Business / Commercial
  "🏭", "🏪", "🏦",
  "💼", "🤝", "👥", "👤",
  "📊", "📈", "📉",
  "💰", "💵",

  // Trust / Security
  "⭐",
  "🥇", "🥈", "🥉",
  "🏅", "🛡️", "🔒",
  "👍", "👌", "❤️",
  "💙", "🤍",

  // Technology
  "💻", "🖥️", "📲",
  "⚙️", "🔧", "🔗",
  "☁️", "🖨️",

  // Services
  "🧾", "📋", "📄",
  "🎯", "🚀", "💡",
  "🔥", "🎉", "🎁",

  // Social Media
  "📸", "🎥", "▶️",
  "👏", "😊", "😍", "🥰",

  // Nature / Premium Feel
  "🌱", "🌸",
  "🌺", "🌈", "☀️",
  "🌙"
];

export default function EmojiField({
  label,
  value,
  onChange
}) {

  const [open,setOpen] = useState(false);


  return (
    <div className="space-y-2">

      <label className="text-sm font-bold text-gray-700">
        {label}
      </label>


      <div className="relative">

        <button
          type="button"
          onClick={()=>setOpen(!open)}
          className="
          flex h-12 w-16 items-center justify-center
          rounded-xl border border-gray-200
          bg-white text-2xl
          hover:border-cyan-400
          "
        >
          {value || "😀"}
        </button>


        {open && (
          <div
            className="
              absolute z-50 mt-3
              w-97.5
              rounded-2xl
              border border-gray-200
              bg-white
              p-4
              shadow-[0_20px_50px_rgba(0,0,0,.15)]
              animate-in fade-in zoom-in-95
            "
          >
        
            {/* Header */}
            <div className="mb-3 flex items-center justify-between">
        
              <div>
                <h3 className="text-sm font-black text-gray-800">
                  Select Icon
                </h3>
        
                <p className="text-xs text-gray-400">
                  Choose an emoji
                </p>
              </div>
        
        
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                "
              >
                ✕
              </button>
        
            </div>
        
        
            {/* Emoji Grid */}
             <div
               className="
                 grid
                 grid-cols-10
                 gap-1.5
                 max-h-37.5
                 overflow-y-auto
                 pr-1
                 scrollbar-thin
               "
             >
        
              {emojis.map((emoji,index)=>(
        
                <button
                  key={`${emoji}-${index}`}
                  type="button"
        
                  onClick={()=>{
        
                    onChange(emoji);
                    setOpen(false);
        
                  }}
        
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-lg
                    transition-all
                    hover:-translate-y-1
                    hover:bg-cyan-50
                    hover:scale-110
                    ${
                      value === emoji
                      ? "bg-cyan-100 ring-2 ring-cyan-400"
                      : ""
                    }
                  `}
                >
        
                  {emoji}
        
                </button>
        
              ))}
        
            </div>
        
        
          </div>
        )}

      </div>

    </div>
  );
}