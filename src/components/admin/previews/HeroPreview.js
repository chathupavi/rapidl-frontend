"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const tagIcons = {
  location: "📍",
  rating: "⭐",
  time: "🕐",
};

function HighlightText({ text = "", highlight = "" }) {
  if (!text) return null;

  if (!highlight) {
    return text;
  }

  const parts = text.split(
    new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  );

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span
        key={index}
        className="bg-gradient-to-br from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent"
      >
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

export default function HeroPreview({ data = {} }) {
  const {
    badge = "Professional Shoe & Laundry Care",
    heading = "Premium Care For Your Favorite Shoes",
    headingHighlight = "Favorite Shoes",
    subheading = "Give your shoes the professional care they deserve.",
    infoTags = [],
    buttons = [],
  } = data;

  return (
    <div className="relative h-full min-h-180 overflow-hidden rounded-3xl bg-[#001050]">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #001050 0%, #002060 40%, #0040B0 75%, #0060D0 100%)",
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,96,208,.3) 0%, transparent 70%)",
        }}
      />

      {/* Decorative bubbles */}
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full border border-blue-400/15 bg-blue-500/5" />

      <div className="absolute -right-10 top-[55%] h-36 w-36 rounded-full border border-blue-400/15 bg-blue-500/5" />

      <div className="absolute right-[12%] top-[15%] h-24 w-24 rounded-full border border-blue-400/15 bg-blue-500/5" />

      <div className="absolute bottom-5 left-[20%] h-40 w-40 rounded-full border border-blue-400/15 bg-blue-500/5" />

      {/* Preview Content */}
      <div className="relative z-10 flex min-h-180 flex-col items-center justify-center px-8 py-16 text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-7 flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/20 bg-white/10 p-2 shadow-xl backdrop-blur-md"
        >
          <Image
            src="/images/logo.jpeg"
            alt="Preview Logo"
            width={90}
            height={90}
            className="h-full w-full rounded-full object-contain"
          />
        </motion.div>

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-blue-100"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#4fc3f7]" />
            {badge}
          </motion.div>
        )}

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 max-w-2xl text-4xl font-black uppercase leading-none tracking-wide text-white md:text-5xl"
          style={{
            fontFamily: "var(--font-barlow-condensed)",
          }}
        >
          <HighlightText
            text={heading}
            highlight={headingHighlight}
          />
        </motion.h1>

        {/* Subheading */}
        {subheading && (
          <p className="mb-5 max-w-xl text-sm leading-7 text-blue-100/80">
            {subheading}
          </p>
        )}

        {/* Info Tags */}
        {infoTags?.length > 0 && (
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {infoTags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-blue-300/20 bg-blue-950/30 px-3 py-1.5 text-xs font-semibold text-blue-100/90"
              >
                {tagIcons[tag.icon] || "•"} {tag.text}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        {buttons?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {buttons.map((button, index) => (
              <div
                key={index}
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  px-5
                  py-2.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  shadow-lg
                  transition
                  
                  ${
                    button.style === "primary"
                      ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white"
                      : ""
                  }

                  ${
                    button.style === "whatsapp"
                      ? "bg-[#25d366] text-white"
                      : ""
                  }

                  ${
                    button.style === "outline"
                      ? "border border-white/40 bg-white/5 text-white"
                      : ""
                  }
                `}
              >
                {button.icon && (
                  <span className="text-sm">
                    {button.icon}
                  </span>
                )}

                {button.label || "Button"}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!heading && !badge && !subheading && (
          <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/50">
            Start editing the form to preview your Hero section.
          </div>
        )}
      </div>

      {/* Preview Label */}
      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 backdrop-blur-md">
        Live Preview
      </div>
    </div>
  );
}