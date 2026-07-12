"use client";

import { usePathname } from "next/navigation";
import { ExternalLink, LogOut, ShieldCheck, Bell, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const TITLES = {
  "/admin": "Dashboard",
  "/admin/media": "Media Library",
  "/admin/seo": "Global SEO",
  "/admin/users": "Account Settings",
};

function getSectionTitleFromPath(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];

  // Regex to match /admin/sections/slug-name
  const match = pathname.match(/^\/admin\/sections\/(.+)$/);
  if (match) {
    return match[1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return "Admin Panel";
}

export default function AdminHeader() {
  const pathname = usePathname();
  const title = getSectionTitleFromPath(pathname);

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <header className="relative z-20 flex items-center justify-between border-b border-white/10 bg-white/70 px-8 py-4 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,.04)]">
      {/* Left: Title & Status */}
      <div className="flex items-center gap-4">
        <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20 md:flex">
          <Sparkles size={20} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-barlowCond text-2xl font-black uppercase tracking-wide text-[#07111f]">
              {title}
            </h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
            />
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <span>Manage your site content and settings</span>
            <ChevronRight size={14} />
            <span className="font-semibold text-cyan-600">Rapid CMS</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* View Website */}
        <motion.a
          whileHover={{ y: -2 }}
          href="/"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-cyan-700 transition-all hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          <ExternalLink size={16} className="transition-transform group-hover:translate-x-1" />
          View Site
        </motion.a>

        {/* Notification */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 hover:text-cyan-600">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 font-black text-white shadow-lg shadow-cyan-500/30">
            A
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-bold text-[#07111f]">Admin</p>
            <p className="flex items-center gap-1 text-xs text-gray-400">
              <ShieldCheck size={12} />
              Administrator
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="ml-2 rounded-xl p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}