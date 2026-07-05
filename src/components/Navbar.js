"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#services", label: "Services" },
  { href: "#signature", label: "Premium Care" },
  { href: "#commercial", label: "Commercial" },
  { href: "#founder", label: "Our Founder" },
  { href: "#gallery", label: "Gallery" },
  { href: "#locations", label: "Locations" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-sky-500/10 bg-blue-950/90 px-6 backdrop-blur-2xl lg:px-12 shadow-[0_4px_30px_rgba(14,165,233,0.05)]">
        
        {/* Logo */}
        <Link
          href="#hero"
          className="relative z-50 flex items-center gap-3.5 transition-transform duration-300 hover:opacity-90"
        >
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-sky-400/30 bg-blue-900/50 shadow-inner shadow-sky-400/20">
            <Image
              src="/images/logo.jpeg"
              alt="Rapid Laundromat Logo"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col text-xl font-bold tracking-wide text-white">
            Rapid Laundromat
            <span className="text-[10px] font-medium tracking-[0.25em] text-sky-400">
              Premium, Reliable & Professional Laundry Services
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative py-2 text-sm font-medium tracking-wide text-white/80 transition-colors hover:text-white"
              >
                {link.label}
                {/* Center-expanding underline effect */}
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="#booking"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-sky-500 px-7 py-2.5 font-bold text-blue-950 transition-all duration-300 hover:bg-sky-400 hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:ring-2 hover:ring-sky-300/50 ring-offset-2 ring-offset-blue-950"
          >
            <span className="relative z-10 tracking-wide text-sm uppercase">Book Pickup</span>
          </Link>
        </div>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out ${
              open ? "translate-y-2 rotate-45 bg-sky-400" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out ${
              open ? "w-0 opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out ${
              open ? "-translate-y-2 -rotate-45 bg-sky-400" : ""
            }`}
          />
        </button>
      </nav>

      {/* Full-Screen Immersive Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-blue-950/98 backdrop-blur-3xl transition-all duration-500 ease-in-out lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex w-full flex-col items-center gap-6 px-6 pb-12 pt-24">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`text-2xl font-bold tracking-wider text-white transition-all duration-500 hover:text-sky-400 ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          <div 
            style={{ transitionDelay: `${links.length * 50}ms` }}
            className={`mt-8 w-full max-w-sm transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="#booking"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-sky-500 py-4 text-lg font-bold uppercase tracking-wide text-blue-950 shadow-lg shadow-sky-500/20 transition-all active:scale-95"
            >
              Book Pickup Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}