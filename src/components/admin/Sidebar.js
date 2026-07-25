"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Search, ChevronDown, ChevronLeft, ChevronRight,
  Settings, ArrowUpRight, Sparkles, Home, BarChart3, Target,
  ShieldCheck, ShoppingBag, Wrench, Zap, ImageIcon, FileText,
  Truck, Users, HeartHandshake, Star, MessageCircle, MapPin,
  HelpCircle, Phone, Share2, Layers3,
} from "lucide-react";

/* =========================================================
   SITE NAVIGATION DATA
========================================================= */
const categories = [
  {
    id: "discover",
    number: "01",
    name: "Discover",
    description: "Make a strong first impression",
    icon: Sparkles,
    color: "from-[#4fc3f7] to-[#2196f3]",
    sections: [
      { slug: "hero", label: "Hero", description: "Homepage first impression", icon: Home },
      { slug: "stats-strip", label: "Stats & Numbers", description: "Showcase key achievements", icon: BarChart3 },
      { slug: "values-banner", label: "Values Banner", description: "Communicate your values", icon: Target },
      { slug: "trust", label: "Trust", description: "Build customer confidence", icon: ShieldCheck },
    ],
  },
  {
    id: "explore",
    number: "02",
    name: "Explore & Book",
    description: "Show services and drive action",
    icon: ShoppingBag,
    color: "from-[#7c4dff] to-[#536dfe]",
    sections: [
      { slug: "services", label: "Services", description: "Your laundry services", icon: Wrench },
      { slug: "signature", label: "Signature Care", description: "Premium care experience", icon: Sparkles },
      { slug: "tech", label: "Technology", description: "Your technology advantage", icon: Zap },
      { slug: "gallery", label: "Gallery", description: "Visual brand showcase", icon: ImageIcon },
      { slug: "booking", label: "Booking", description: "Customer booking journey", icon: FileText },
      { slug: "delivery", label: "Delivery", description: "Pickup and delivery", icon: Truck },
      { slug: "commercial", label: "Commercial", description: "Business laundry solutions", icon: Users },
    ],
  },
  {
    id: "trust",
    number: "03",
    name: "Build Trust",
    description: "Tell your story and earn confidence",
    icon: HeartHandshake,
    color: "from-[#ffb300] to-[#ff7043]",
    sections: [
      { slug: "why", label: "Why Choose Us", description: "Your competitive advantage", icon: Star },
      { slug: "founder", label: "Founder", description: "Introduce your leadership", icon: Users },
      { slug: "values", label: "Core Values", description: "What your brand stands for", icon: HeartHandshake },
      { slug: "vision", label: "Vision", description: "Your future direction", icon: Target },
      { slug: "reviews", label: "Reviews", description: "Customer experiences", icon: MessageCircle },
    ],
  },
  {
    id: "connect",
    number: "04",
    name: "Connect",
    description: "Help customers find and contact you",
    icon: MapPin,
    color: "from-[#00c853] to-[#00a152]",
    sections: [
      { slug: "locations", label: "Locations", description: "Where customers find you", icon: MapPin },
      { slug: "faq", label: "FAQ", description: "Answer common questions", icon: HelpCircle },
      { slug: "contact", label: "Contact", description: "Customer contact details", icon: Phone },
      { slug: "social", label: "Social Media", description: "Connect across platforms", icon: Share2 },
      { slug: "seo-pages", label: "SEO Pages", description: "Search engine visibility", icon: Search },
      { slug: "footer", label: "Footer", description: "Global website footer", icon: Layers3 },
    ],
  },
];

/* =========================================================
   SIDEBAR COMPONENT
========================================================= */
export default function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  // Find currently active category
  const activeCategoryId = useMemo(() => {
    for (const category of categories) {
      if (category.sections.some((section) => pathname === `/admin/sections/${section.slug}`)) {
        return category.id;
      }
    }
    return null;
  }, [pathname]);

  // Automatically open active category during render phase
  const [prevActiveId, setPrevActiveId] = useState(activeCategoryId);
  if (activeCategoryId !== prevActiveId) {
    setPrevActiveId(activeCategoryId);
    if (activeCategoryId) {
      setCollapsed((prev) => ({
        ...prev,
        [activeCategoryId]: false,
      }));
    }
  }

  const toggleCategory = (id) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  // Search filtering
  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        sections: category.sections.filter(
          (section) =>
            section.label.toLowerCase().includes(q) ||
            section.description.toLowerCase().includes(q)
        ),
      }))
      .filter((category) => category.sections.length > 0);
  }, [query]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 76 : 288 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-screen shrink-0 overflow-hidden border-r border-white/10 text-white shadow-[20px_0_80px_rgba(0,16,80,.4)]"
      style={{ background: "linear-gradient(180deg, #001050 0%, #00195f 48%, #002b75 100%)" }}
    >
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-105 w-105 rounded-full bg-[#0060d0]/30 blur-[130px]" />
        <div className="absolute -bottom-28 -right-24 h-87.5 w-87.5 rounded-full bg-[#4fc3f7]/15 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a237e]/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">
        
        {/* =====================================================
            BRAND HEADER
        ===================================================== */}
        <div className={`p-4 pb-3 ${sidebarCollapsed ? "px-3" : ""}`}>
          <motion.div
            layout
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/6 shadow-[0_15px_40px_rgba(0,16,80,.35)] backdrop-blur-xl ${sidebarCollapsed ? "p-2" : "p-3"}`}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#4fc3f7]/10 blur-2xl" />

            <div className={`relative flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"}`}>
              {/* Logo */}
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg">
                <Image src="/images/logo.jpeg" fill sizes="44px" alt="Rapid Laundromat" className="object-cover" />
              </div>

              {/* Brand Text */}
              <AnimatePresence initial={false}>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0, x: -10 }}
                    animate={{ opacity: 1, width: "auto", x: 0 }}
                    exit={{ opacity: 0, width: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0 overflow-hidden"
                  >
                    <h1 className="truncate text-[13px] font-black uppercase tracking-[1px] text-white">
                      Rapid Laundromat
                    </h1>
                    <div className="mt-1.5 flex items-center gap-1.5 whitespace-nowrap text-[10px] font-bold uppercase tracking-[2.5px] text-[#90caf9]">
                      <Sparkles size={10} />
                      Admin Studio
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Collapse Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="group mt-3 flex h-8 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            ) : (
              <ChevronLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            )}
          </button>
        </div>

        {/* =====================================================
            WEBSITE STATUS
        ===================================================== */}
        <AnimatePresence initial={false}>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden px-4 pb-3"
            >
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brandGreen shadow-[0_0_10px_rgba(34,197,94,.8)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/70">
                    Website Live
                  </span>
                </div>
                <Link href="/" target="_blank" className="flex items-center gap-1 text-[10px] font-bold text-[#90caf9] transition-colors hover:text-white">
                  View <ArrowUpRight size={11} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            DASHBOARD LINK
        ===================================================== */}
        <div className={`pb-3 ${sidebarCollapsed ? "px-3" : "px-4"}`}>
          <Link
            href="/admin"
            title={sidebarCollapsed ? "Dashboard" : undefined}
            className={`group relative flex items-center rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
              sidebarCollapsed ? "justify-center px-3" : "gap-3 px-4"
            } ${
              pathname === "/admin"
                ? "bg-linear-to-r from-[#0060d0]/70 to-[#4fc3f7]/20 text-white shadow-[0_8px_25px_rgba(0,96,208,.25)]"
                : "text-white/70 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            {pathname === "/admin" && (
              <motion.span layoutId="dashboard-active" className="absolute left-0 h-7 w-1 rounded-r-full bg-[#4fc3f7]" />
            )}
            <LayoutDashboard size={18} className={pathname === "/admin" ? "text-[#4fc3f7]" : ""} />
            
            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Dashboard
                </motion.span>
              )}
            </AnimatePresence>

            {!sidebarCollapsed && pathname === "/admin" && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#4fc3f7]" />
            )}
          </Link>
        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}
        <AnimatePresence initial={false}>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden px-4 pb-4"
            >
              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 transition-all duration-200 focus-within:border-[#4fc3f7]/50 focus-within:bg-white/8 focus-within:shadow-[0_0_25px_rgba(79,195,247,.08)]">
                <Search size={16} className="shrink-0 text-white/40 group-focus-within:text-[#4fc3f7]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search your site..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-xs text-white/40 hover:text-white">
                    ×
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            NAVIGATION MAP
        ===================================================== */}
        <nav className={`flex-1 overflow-y-auto pb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 px-3`}>
          {filteredCategories.map((category) => (
            <SidebarCategory
              key={category.id}
              category={category}
              query={query}
              sidebarCollapsed={sidebarCollapsed}
              isOpen={query.trim().length > 0 ? true : !collapsed[category.id]}
              onToggle={() => toggleCategory(category.id)}
              pathname={pathname}
            />
          ))}

          {filteredCategories.length === 0 && (
            <div className="px-5 py-10 text-center">
              <Search size={24} className="mx-auto mb-3 text-white/30" />
              <p className="text-sm font-semibold text-white/70">No sections found</p>
              <p className="mt-1 text-[11px] text-white/40">Try a different search term</p>
            </div>
          )}
        </nav>

        {/* =====================================================
            ACCOUNT FOOTER
        ===================================================== */}
        <div className="border-t border-white/10 p-3">
          <Link
            href="/admin/users"
            title={sidebarCollapsed ? "Manage account" : undefined}
            className={`group flex items-center rounded-xl border border-white/6 bg-white/4 py-3 transition-all duration-200 hover:border-white/10 hover:bg-white/8 ${
              sidebarCollapsed ? "justify-center px-2" : "gap-3 px-3"
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#0060d0] to-[#4fc3f7] text-sm font-black shadow-lg">
              A
            </div>
            
            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="min-w-0 flex-1 overflow-hidden"
                >
                  <p className="truncate text-xs font-bold text-white">Admin</p>
                  <p className="mt-0.5 truncate text-[10px] text-white/50">Manage account</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!sidebarCollapsed && (
              <Settings size={16} className="shrink-0 text-white/40 transition-transform duration-300 group-hover:rotate-45 group-hover:text-white/80" />
            )}
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}

/* =========================================================
   SIDEBAR CATEGORY
========================================================= */
function SidebarCategory({
  category,
  query,
  isOpen,
  onToggle,
  pathname,
  sidebarCollapsed,
}) {
  const Icon = category.icon;

  /* =======================================================
     COLLAPSED SIDEBAR VIEW
  ======================================================= */
  if (sidebarCollapsed) {
    return (
      <div className="mb-2 flex justify-center">
        <Link
          href={category.sections.length > 0 ? `/admin/sections/${category.sections[0].slug}` : "#"}
          title={category.name}
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br ${category.color} opacity-80 shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:opacity-100`}>
            <Icon size={16} strokeWidth={2.5} />
          </div>

          {/* Tooltip */}
          <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-navy px-3 py-2 text-xs font-bold text-white opacity-0 shadow-xl transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
            {category.name}
          </div>
        </Link>
      </div>
    );
  }

  /* =======================================================
     EXPANDED SIDEBAR VIEW
  ======================================================= */
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-white/4"
      >
        <span className="text-[10px] font-black tracking-[1px] text-white/40 group-hover:text-white/60">
          {category.number}
        </span>
        
        <div className={`flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br ${category.color} opacity-70 shadow-lg`}>
          <Icon size={12} strokeWidth={2.5} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-black uppercase tracking-[1.5px] text-white/80 group-hover:text-white">
            {category.name}
          </div>
          {!query && (
            <div className="mt-0.5 truncate text-[10px] text-white/40">
              {category.description}
            </div>
          )}
        </div>

        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-white/50">
          {category.sections.length}
        </span>

        <ChevronDown size={14} className={`text-white/50 transition-transform duration-300 ${isOpen ? "" : "-rotate-90"}`} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-7.25 overflow-hidden"
          >
            <div className="space-y-1 pt-1">
              {category.sections.map((section) => {
                const href = `/admin/sections/${section.slug}`;
                const isActive = pathname === href;
                const SectionIcon = section.icon;

                return (
                  <Link
                    key={section.slug}
                    href={href}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                      isActive ? "bg-white/10 text-white shadow-[0_5px_20px_rgba(0,0,0,.12)]" : "text-white/60 hover:bg-white/6 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-section"
                        className="absolute -left-7.25 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[#4fc3f7] shadow-[0_0_12px_rgba(79,195,247,.7)]"
                      />
                    )}

                    <SectionIcon
                      size={15}
                      strokeWidth={isActive ? 2.3 : 1.8}
                      className={`shrink-0 transition-colors ${isActive ? "text-[#4fc3f7]" : "text-white/40 group-hover:text-white/70"}`}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-semibold">{section.label}</div>
                      <div className={`mt-0.5 truncate text-[10px] ${isActive ? "text-white/60" : "text-white/40 group-hover:text-white/60"}`}>
                        {section.description}
                      </div>
                    </div>

                    <ArrowUpRight size={13} className="shrink-0 -translate-x-1 text-[#4fc3f7] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}