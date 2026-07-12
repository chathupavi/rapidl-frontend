"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  ChevronDown,
  Settings,
  BriefcaseBusiness,
  ShieldCheck,
  MapPin,
  Layout,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Core Pages",
    icon: Layout,
    sections: [
      { slug: "hero", label: "Hero" },
      { slug: "stats-strip", label: "Stats Strip" },
      { slug: "values-banner", label: "Values Banner" },
      { slug: "trust", label: "Trust" },
      { slug: "services", label: "Services" },
    ],
  },
  {
    name: "Business & Booking",
    icon: BriefcaseBusiness,
    sections: [
      { slug: "commercial", label: "Commercial" },
      { slug: "booking", label: "Booking" },
      { slug: "tech", label: "Technology" },
      { slug: "founder", label: "Founder" },
      { slug: "gallery", label: "Gallery" },
    ],
  },
  {
    name: "Marketing & Trust",
    icon: ShieldCheck,
    sections: [
      { slug: "signature", label: "Signature Care" },
      { slug: "why", label: "Why Choose Us" },
      { slug: "values", label: "Core Values" },
      { slug: "reviews", label: "Reviews" },
      { slug: "vision", label: "Vision" },
      { slug: "seo-pages", label: "SEO Pages" },
    ],
  },
  {
    name: "Location & Contact",
    icon: MapPin,
    sections: [
      { slug: "locations", label: "Locations" },
      { slug: "delivery", label: "Delivery" },
      { slug: "faq", label: "FAQ" },
      { slug: "social", label: "Social" },
      { slug: "contact", label: "Contact" },
      { slug: "footer", label: "Footer" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState({});

  const toggleCategory = (name) => {
    setCollapsed((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;

    const q = query.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        sections: cat.sections.filter((section) =>
          section.label.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.sections.length);
  }, [query]);

  return (
    <aside
      className="relative flex h-screen w-72 shrink-0 overflow-hidden border-r border-[rgba(79,195,247,.15)] text-white shadow-[20px_0_80px_rgba(0,16,80,.4)]"
      style={{
        background: "linear-gradient(180deg, #001050 0%, #002060 55%, #003080 100%)",
      }}
    >
      {/* Aurora Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-105 w-105 rounded-full bg-bright/30 blur-[130px]" />
        <div className="absolute -bottom-25 -right-30 h-87.5 w-87.5 rounded-full bg-[#4fc3f7]/20 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Brand */}
        <div className="p-5">
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 rounded-2xl border border-[rgba(79,195,247,.2)] bg-white/6 p-3 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,16,80,.4)]"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-xl ring-2 ring-[#4fc3f7]/30">
              <Image src="/images/logo.jpeg" fill alt="Rapid Laundromat" className="object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wide text-white">
                Rapid Laundromat
              </h1>
              <div className="mt-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[3px] text-[#90caf9]">
                <Sparkles size={10} />
                Admin Studio
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Link */}
        <div className="px-4">
          <Link
            href="/admin"
            className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
              pathname === "/admin"
                ? "bg-linear-to-r from-bright/50 to-[#4fc3f7]/20 shadow-lg"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-xl border border-[rgba(79,195,247,.2)] bg-white/5 px-3 py-3 transition focus-within:border-[#4fc3f7]">
            <Search size={16} className="text-[#90caf9]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sections..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-5">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            const open = !collapsed[category.name];

            return (
              <div key={category.name} className="mb-3">
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[11px] font-black uppercase tracking-[2px] text-white/40 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} />
                    {category.name}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-500 ${open ? "" : "-rotate-90"}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-1 overflow-hidden"
                    >
                      {category.sections.map((section) => {
                        const href = `/admin/sections/${section.slug}`;
                        const active = pathname === href;

                        return (
                          <Link
                            key={section.slug}
                            href={href}
                            className={`relative flex items-center rounded-xl px-4 py-2.5 text-sm transition-all ${
                              active
                                ? "bg-bright/40 text-white shadow-lg"
                                : "text-white/55 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {active && (
                              <motion.span
                                layoutId="active"
                                className="absolute left-0 h-8 w-1 rounded-full bg-[#4fc3f7]"
                              />
                            )}
                            {section.label}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Footer/Account Settings */}
        <div className="border-t border-white/10 p-4">
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 transition hover:bg-white/10"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-bright to-[#4fc3f7] font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-bold">Admin</p>
              <p className="text-xs text-white/40">Manage account</p>
            </div>
            <Settings size={16} className="ml-auto text-white/40" />
          </Link>
        </div>
      </div>
    </aside>
  );
}