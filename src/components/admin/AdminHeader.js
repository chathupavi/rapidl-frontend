"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  LogOut,
  ShieldCheck,
  Bell,
  ChevronRight,
  Sparkles,
  Home,
  LayoutGrid,
  ImageIcon,
  Search,
  Users,
  Settings,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================================================
   PAGE CONFIGURATION
========================================================= */

const PAGE_CONFIG = {
  "/admin": {
    title: "Dashboard",
    description: "Your website performance at a glance",
    icon: Home,
    category: "Control Center",
  },

  "/admin/media": {
    title: "Media Library",
    description: "Manage images and visual content",
    icon: ImageIcon,
    category: "Content",
  },

  "/admin/seo": {
    title: "Global SEO",
    description: "Manage search visibility and metadata",
    icon: Search,
    category: "Growth",
  },

  "/admin/users": {
    title: "Account Settings",
    description: "Manage administrators and access",
    icon: Users,
    category: "Administration",
  },
};

/* =========================================================
   SECTION CONFIGURATION
========================================================= */

const SECTION_CONFIG = {
  hero: {
    title: "Hero",
    description: "Homepage first impression",
    category: "Discover",
    icon: Home,
  },

  "stats-strip": {
    title: "Stats & Numbers",
    description: "Showcase key achievements",
    category: "Discover",
    icon: LayoutGrid,
  },

  "values-banner": {
    title: "Values Banner",
    description: "Communicate your values",
    category: "Discover",
    icon: Sparkles,
  },

  trust: {
    title: "Trust",
    description: "Build customer confidence",
    category: "Discover",
    icon: ShieldCheck,
  },

  services: {
    title: "Services",
    description: "Your laundry services",
    category: "Explore & Book",
    icon: LayoutGrid,
  },

  signature: {
    title: "Signature Care",
    description: "Premium care experience",
    category: "Explore & Book",
    icon: Sparkles,
  },

  tech: {
    title: "Technology",
    description: "Your technology advantage",
    category: "Explore & Book",
    icon: Sparkles,
  },

  gallery: {
    title: "Gallery",
    description: "Visual brand showcase",
    category: "Explore & Book",
    icon: ImageIcon,
  },

  booking: {
    title: "Booking",
    description: "Customer booking journey",
    category: "Explore & Book",
    icon: LayoutGrid,
  },

  delivery: {
    title: "Delivery",
    description: "Pickup and delivery",
    category: "Explore & Book",
    icon: LayoutGrid,
  },

  commercial: {
    title: "Commercial",
    description: "Business laundry solutions",
    category: "Explore & Book",
    icon: Users,
  },

  why: {
    title: "Why Choose Us",
    description: "Your competitive advantage",
    category: "Build Trust",
    icon: Sparkles,
  },

  founder: {
    title: "Founder",
    description: "Introduce your leadership",
    category: "Build Trust",
    icon: Users,
  },

  values: {
    title: "Core Values",
    description: "What your brand stands for",
    category: "Build Trust",
    icon: Sparkles,
  },

  vision: {
    title: "Vision",
    description: "Your future direction",
    category: "Build Trust",
    icon: Sparkles,
  },

  reviews: {
    title: "Reviews",
    description: "Customer experiences",
    category: "Build Trust",
    icon: Sparkles,
  },

  locations: {
    title: "Locations",
    description: "Where customers find you",
    category: "Connect",
    icon: LayoutGrid,
  },

  faq: {
    title: "FAQ",
    description: "Answer common questions",
    category: "Connect",
    icon: LayoutGrid,
  },

  contact: {
    title: "Contact",
    description: "Customer contact details",
    category: "Connect",
    icon: LayoutGrid,
  },

  social: {
    title: "Social Media",
    description: "Connect across platforms",
    category: "Connect",
    icon: LayoutGrid,
  },

  "seo-pages": {
    title: "SEO Pages",
    description: "Search engine visibility",
    category: "Connect",
    icon: Search,
  },

  footer: {
    title: "Footer",
    description: "Global website footer",
    category: "Connect",
    icon: LayoutGrid,
  },
};

/* =========================================================
   GET PAGE INFORMATION
========================================================= */

function getPageConfig(pathname) {
  if (PAGE_CONFIG[pathname]) {
    return PAGE_CONFIG[pathname];
  }

  const match = pathname.match(/^\/admin\/sections\/(.+)$/);

  if (match) {
    const slug = match[1];

    if (SECTION_CONFIG[slug]) {
      return SECTION_CONFIG[slug];
    }

    return {
      title: slug
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" "),
      description: "Manage website section content",
      category: "Website",
      icon: LayoutGrid,
    };
  }

  return {
    title: "Admin Panel",
    description: "Manage your website",
    category: "Control Center",
    icon: LayoutGrid,
  };
}

/* =========================================================
   ADMIN HEADER
========================================================= */

export default function AdminHeader() {
  const pathname = usePathname();

  const page = getPageConfig(pathname);
  const PageIcon = page.icon;

  const isDashboard = pathname === "/admin";

  const handleLogout = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#07111f]/6 bg-white/85 backdrop-blur-2xl">
      <div className="flex min-h-19 items-center justify-between gap-6 px-5 py-3 lg:px-8">

        {/* =====================================================
            LEFT SIDE
        ===================================================== */}

        <div className="flex min-w-0 items-center gap-4">

          {/* Mobile Menu Placeholder */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600 lg:hidden"
          >
            <Menu size={18} />
          </button>

          {/* Page Icon */}
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#0060d0] to-[#4fc3f7] text-white shadow-[0_8px_25px_rgba(0,96,208,.2)] sm:flex">
            <PageIcon size={19} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">

            {/* Breadcrumb */}
            <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-gray-400">

              <Link
                href="/admin"
                className="transition-colors hover:text-cyan-600"
              >
                Control Center
              </Link>

              {!isDashboard && (
                <>
                  <ChevronRight size={11} />

                  <span className="text-cyan-600">
                    {page.category}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <div className="flex items-center gap-2">

              <h1 className="truncate font-barlowCond text-xl font-black uppercase tracking-[.5px] text-[#07111f] sm:text-2xl">
                {page.title}
              </h1>

              {/* Live indicator */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

            </div>

            {/* Description */}
            <p className="mt-0.5 hidden text-xs text-gray-400 sm:block">
              {page.description}
            </p>

          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Website Status */}
          <div className="hidden items-center gap-2 rounded-xl border border-emerald-200/70 bg-emerald-50 px-3 py-2 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,.7)]" />

            <span className="text-[10px] font-black uppercase tracking-[1px] text-emerald-700">
              Live
            </span>
          </div>

          {/* View Website */}
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="/"
            target="_blank"
            rel="noreferrer"
            className="group flex h-10 items-center gap-2 rounded-xl border border-[#0060d0]/15 bg-[#0060d0]/4 px-3.5 text-xs font-bold text-[#0060d0] transition-all hover:border-[#0060d0]/30 hover:bg-[#0060d0]/8 hover:shadow-[0_8px_20px_rgba(0,96,208,.1)]"
          >
            <ExternalLink
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />

            <span className="hidden sm:inline">
              View Site
            </span>
          </motion.a>

          {/* Notification */}
          <button
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-all hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600"
          >
            <Bell size={17} />

            <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-cyan-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* User Profile */}
          <div className="flex items-center gap-2">

            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#0060d0] to-[#4fc3f7] text-sm font-black text-white shadow-[0_6px_18px_rgba(0,96,208,.2)]">
              A

              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="hidden xl:block">
              <p className="text-xs font-black text-[#07111f]">
                Admin
              </p>

              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-400">
                <ShieldCheck size={10} />
                Administrator
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-red-50 hover:text-red-500"
            >
              <LogOut size={17} />
            </button>

          </div>

        </div>
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-[#4fc3f7]/30 to-transparent" />
    </header>
  );
}