"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, WashingMachine } from "lucide-react";

// ----------------------------------------------------------------------
// Sub-components for better organization
// ----------------------------------------------------------------------

const BackgroundEffects = () => (
  <>
    {/* Main ambient glow */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,96,208,.35) 0%, transparent 70%)",
      }}
    />

    {/* Large floating glow - left */}
    <motion.div
      animate={{ y: [0, -25, 0], x: [0, 15, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -left-32 top-[8%] h-96 w-96 rounded-full border border-[rgba(79,195,247,.15)] bg-[rgba(0,96,208,.08)] blur-sm"
    />

    {/* Large floating glow - right */}
    <motion.div
      animate={{ y: [0, 30, 0], x: [0, -15, 0], scale: [1, 1.08, 1] }}
      transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -right-40 bottom-[2%] h-105 w-105 rounded-full border border-[rgba(79,195,247,.15)] bg-[rgba(0,64,160,.1)]"
    />

    {/* Decorative sparkles */}
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute left-[15%] top-[20%] text-[#4fc3f7]"
    >
      <Sparkles size={22} />
    </motion.div>

    <motion.div
      animate={{ opacity: [1, 0.3, 1], rotate: [0, 180, 360] }}
      transition={{ duration: 7, repeat: Infinity }}
      className="absolute bottom-[20%] right-[15%] text-[#90caf9]"
    >
      <Sparkles size={18} />
    </motion.div>
  </>
);

const BrandLogo = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="mb-7 flex justify-center"
  >
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-[#4fc3f7]/30 blur-2xl" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(79,195,247,.35)] bg-white/10 shadow-[0_15px_35px_rgba(0,16,80,.5)]">
        <Image
          src="/images/logo.jpeg"
          alt="Rapid Laundromat"
          width={65}
          height={65}
          priority
          className="rounded-full object-cover"
        />
      </div>
    </div>
  </motion.div>
);

const ActionButtons = () => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7, duration: 0.6 }}
    className="mt-8 flex flex-col gap-3 sm:flex-row"
  >
    <Link
      href="/"
      className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-linear-to-br from-bright via-[#0090FF] to-[#4fc3f7] py-4 font-black uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(0,96,208,.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,144,255,.5)]"
    >
      <ArrowLeft
        size={18}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      Back Home
    </Link>

    <Link
      href="/#services"
      className="group flex flex-1 items-center justify-center gap-3 rounded-2xl border border-[rgba(79,195,247,.3)] bg-[rgba(0,64,160,.25)] py-4 font-black uppercase tracking-widest text-[#d9efff] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#4fc3f7] hover:bg-[rgba(0,96,208,.35)]"
    >
      Explore Services
      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  </motion.div>
);

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-navy px-4 py-8 sm:px-6 lg:px-8"
      style={{
        background:
          "linear-gradient(145deg, #001050 0%, #002060 40%, #0040B0 75%, #0060D0 100%)",
      }}
    >
      <BackgroundEffects />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="rounded-[30px] border border-[rgba(79,195,247,.18)] bg-[rgba(255,255,255,.06)] p-7 shadow-[0_40px_100px_rgba(0,16,80,.6)] backdrop-blur-2xl sm:p-10 lg:p-12">
          
          <BrandLogo />

          {/* Status badge */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-[rgba(79,195,247,.35)] bg-[rgba(0,96,208,.25)] px-4 py-2 text-[10px] font-black uppercase tracking-[2px] text-[#90caf9]">
              <WashingMachine size={13} />
              Page Not Found
            </div>
          </div>

          {/* 404 Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-center"
          >
            <h1 className="font-barlowCond text-[110px] font-black leading-none tracking-[-4px] text-white drop-shadow-[0_10px_30px_rgba(0,96,208,.5)] sm:text-[150px]">
              404
            </h1>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-linear-to-r from-[#0090FF] to-[#4fc3f7]" />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-7 text-center"
          >
            <h2 className="font-barlowCond text-3xl font-black uppercase tracking-[1.5px] text-white sm:text-4xl">
              This page is out of order.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[rgba(200,225,255,.75)] sm:text-base">
              {"Looks like the page you're looking for has gone missing. Don't worry — we'll get you back to Rapid Laundromat."}
            </p>
          </motion.div>

          <ActionButtons />

          {/* Brand footer */}
          <div className="mt-8 flex items-center justify-center gap-2 border-t border-[rgba(79,195,247,.12)] pt-6 text-xs text-[rgba(200,225,255,.55)]">
            <Sparkles size={13} className="text-[#4fc3f7]" />
            Rapid Laundromat
            <span className="text-white/20">•</span>
            Premium Care. Simplified.
          </div>
        </div>
      </motion.div>
    </main>
  );
}