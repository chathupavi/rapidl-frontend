"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BellRing,
  BookOpenText,
  Building2,
  CalendarCheck2,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ContactRound,
  FileText,
  Gauge,
  Globe2,
  HeartHandshake,
  HelpCircle,
  Home,
  ImageIcon,
  LayoutDashboard,
  LineChart,
  Map,
  MapPin,
  Megaphone,
  MessageCircle,
  MousePointerClick,
  Network,
  Radar,
  Search,
  SearchCheck,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  UserRoundCog,
  Users,
  UsersRound,
  Waypoints,
  Wrench,
  Zap,
  Trophy,
} from "lucide-react";

/* =========================================================
   RAPID CONTROL CENTER NAVIGATION
========================================================= */

const categories = [

   {
    id: "customers",
    number: "01",
    name: "Customers",
    description: "Manage customer demand and enquiries",
    icon: HeartHandshake,
    color: "from-[#8b5cf6] to-[#6366f1]",
    sections: [
      {
        slug: "bookings",
        label: "Bookings",
        description: "Customer booking activity",
        icon: CalendarCheck2,
        href: "/admin/customers/bookings",
      },
      {
        slug: "leads",
        label: "Contacts & Leads",
        description: "Customer enquiries and opportunities",
        icon: ContactRound,
        href: "/admin/customers/contacts-leads",
      },
      {
        slug: "reviews",
        label: "Reviews",
        description: "Customer experiences and testimonials",
        icon: MessageCircle,
        href: "/admin/customers/reviews",
      },
    ],
  },

  {
    id: "locations",
    number: "02",
    name: "Locations",
    description: "Manage branches and local teams",
    icon: MapPin,
    color: "from-[#00c853] to-[#00a152]",
    sections: [
      {
        slug: "branches",
        label: "All Branches",
        description: "Manage every Rapid location",
        icon: Building2,
        href: "/admin/locations/branches",
      },

      {
        slug: "managers",
        label: "Branch Managers",
        description: "Manager profiles and branch leadership",
        icon: UserRoundCog,
        href: "/admin/locations/managers",
      },
      {
        slug: "branch-teams",
        label: "Branch Teams",
        description: "Team photography and people profiles",
        icon: UsersRound,
        href: "/admin/locations/teams",
      },
    ],
  },
  /* =========================================================
     CONTENT STUDIO
  ========================================================= */
  {
    id: "content",
    number: "03",
    name: "Content Studio",
    description: "Control the Rapid brand experience",
    icon: Sparkles,
    color: "from-[#ffb300] to-[#ff7043]",

    sections: [
      {
        slug: "homepage",
        label: "Homepage",
        description: "Manage homepage content and sections",
        icon: Home,
        href: "/admin/website/homepage",
      },

      {
        slug: "value-strip",
        label: "Value Strip",
        description: "Manage homepage trust stats and animated values",
        icon: Gauge,
        href: "/admin/website/value-strip",
      },

      {
        slug: "awards",
        label: "Awards & Recognition",
        description: "Manage company awards and achievements",
        icon: Trophy,
        href: "/admin/website/awards",
      },

      {
        slug: "services",
        label: "Services",
        description: "Laundry services and service pages",
        icon: Wrench,
        href: "/admin/website/services",
      },

      {
        slug: "gallery",
        label: "Gallery",
        description: "Brand, branch and service photography",
        icon: ImageIcon,
        href: "/admin/website/gallery",
      },

      {
        slug: "faqs",
        label: "FAQs",
        description: "Frequently asked customer questions",
        icon: HelpCircle,
        href: "/admin/website/faqs",
      },
    ],
  },

  /* =========================================================
     CAMPAIGNS
  ========================================================= */
  {
    id: "campaigns",
    number: "04",
    name: "Campaigns",
    description: "Manage marketing campaigns",
    icon: Megaphone,
    color: "from-[#ff416c] to-[#ff4b2b]",

    sections: [
      {
        slug: "campaigns",
        label: "Campaigns",
        description: "Create and manage digital marketing campaigns",
        icon: Megaphone,
        href: "/admin/marketing/campaigns",
      },
    ],
  },

  /* =========================================================
     USER MANAGEMENT
  ========================================================= */
  {
    id: "users",
    number: "05",
    name: "User Management",
    description: "Manage platform users and access",
    icon: ShieldCheck,
    color: "from-[#64748b] to-[#334155]",

    sections: [
      {
        slug: "users",
        label: "Users & Roles",
        description: "Manage admin users, roles and permissions",
        icon: UserRoundCog,
        href: "/admin/system/users-roles",
      },
    ],
  },
];
/* =========================================================
   ROUTE HELPERS
========================================================= */

function isRouteActive(pathname, href) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  if (href === "/admin/growth") {
    return pathname === "/admin/growth";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

/* =========================================================
   SIDEBAR COMPONENT
========================================================= */

export default function Sidebar() {
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [collapsed, setCollapsed] = useState({
    growth: false,
    customers: true,
    locations: true,
    content: true,
    visibility: true,
    marketing: true,
    system: true,
  });

  /* =======================================================
     ACTIVE CATEGORY
  ======================================================= */

  const activeCategoryId = useMemo(() => {
    for (const category of categories) {
      if (
        category.sections.some((section) =>
          isRouteActive(pathname, section.href)
        )
      ) {
        return category.id;
      }
    }

    return null;
  }, [pathname]);

  /* =======================================================
     OPEN ACTIVE CATEGORY
  ======================================================= */

  const [previousActiveCategory, setPreviousActiveCategory] =
    useState(activeCategoryId);

  if (activeCategoryId !== previousActiveCategory) {
    setPreviousActiveCategory(activeCategoryId);

    if (activeCategoryId) {
      setCollapsed((prev) => ({
        ...prev,
        [activeCategoryId]: false,
      }));
    }
  }

  /* =======================================================
     SEARCH FILTER
  ======================================================= */

  const filteredCategories = useMemo(() => {
    if (!query.trim()) {
      return categories;
    }

    const q = query.trim().toLowerCase();

    return categories
      .map((category) => {
        const categoryMatch =
          category.name.toLowerCase().includes(q) ||
          category.description.toLowerCase().includes(q);

        const sections = categoryMatch
          ? category.sections
          : category.sections.filter(
              (section) =>
                section.label.toLowerCase().includes(q) ||
                section.description.toLowerCase().includes(q)
            );

        return {
          ...category,
          sections,
        };
      })
      .filter((category) => category.sections.length > 0);
  }, [query]);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed ? 80 : 304,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex h-screen shrink-0 overflow-hidden border-r border-white/10 text-white shadow-[20px_0_80px_rgba(0,16,80,.35)]"
      style={{
        background:
          "linear-gradient(180deg, #001050 0%, #00195f 46%, #00276b 100%)",
      }}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#0060d0]/30 blur-[130px]" />

        <div className="absolute -bottom-28 -right-24 h-[350px] w-[350px] rounded-full bg-[#4fc3f7]/15 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a237e]/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col">

        {/* =====================================================
            BRAND
        ===================================================== */}

        <div
          className={`p-4 pb-3 ${
            sidebarCollapsed ? "px-3" : ""
          }`}
        >
          <motion.div
            layout
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_15px_40px_rgba(0,16,80,.35)] backdrop-blur-xl ${
              sidebarCollapsed ? "p-2" : "p-3"
            }`}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#4fc3f7]/10 blur-2xl" />

            <div
              className={`relative flex items-center ${
                sidebarCollapsed
                  ? "justify-center"
                  : "gap-3"
              }`}
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-lg">
                <Image
                  src="/images/logo.jpeg"
                  fill
                  sizes="44px"
                  alt="Rapid Laundromat"
                  className="object-cover"
                />
              </div>

              <AnimatePresence initial={false}>
                {!sidebarCollapsed && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      width: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      width: "auto",
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      width: 0,
                      x: -10,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="min-w-0 overflow-hidden"
                  >
                    <h1 className="truncate text-[13px] font-black uppercase tracking-[1px] text-white">
                      Rapid Laundromat
                    </h1>

                    <div className="mt-1.5 flex items-center gap-1.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[2.3px] text-[#90caf9]">
                      <Sparkles size={10} />
                      Control Center
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* COLLAPSE BUTTON */}

          <button
            type="button"
            onClick={() =>
              setSidebarCollapsed((prev) => !prev)
            }
            aria-label={
              sidebarCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className="group mt-3 flex h-8 w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/50 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            {sidebarCollapsed ? (
              <ChevronRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            ) : (
              <ChevronLeft
                size={16}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
            )}
          </button>
        </div>

        {/* =====================================================
            WEBSITE STATUS
        ===================================================== */}

        <AnimatePresence initial={false}>
          {!sidebarCollapsed && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="overflow-hidden px-4 pb-3"
            >
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/10 px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[1.4px] text-white/70">
                    Platform Live
                  </span>
                </div>

                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-1 text-[10px] font-bold text-[#90caf9] transition-colors hover:text-white"
                >
                  Website
                  <ArrowUpRight size={11} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            COMMAND CENTER
        ===================================================== */}

        <div
          className={`pb-3 ${
            sidebarCollapsed
              ? "px-3"
              : "px-4"
          }`}
        >
          {!sidebarCollapsed && (
            <div className="mb-2 px-2 text-[9px] font-black uppercase tracking-[2px] text-white/30">
              Command Center
            </div>
          )}

          <Link
            href="/admin"
            title={
              sidebarCollapsed
                ? "Command Center"
                : undefined
            }
            className={`group relative flex items-center rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
              sidebarCollapsed
                ? "justify-center px-3"
                : "gap-3 px-4"
            } ${
              pathname === "/admin"
                ? "bg-linear-to-r from-[#0060d0]/75 to-[#4fc3f7]/20 text-white shadow-[0_8px_25px_rgba(0,96,208,.25)]"
                : "text-white/70 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            {pathname === "/admin" && (
              <motion.span
                layoutId="dashboard-active"
                className="absolute left-0 h-7 w-1 rounded-r-full bg-[#4fc3f7]"
              />
            )}

            <LayoutDashboard
              size={18}
              className={
                pathname === "/admin"
                  ? "text-[#4fc3f7]"
                  : ""
              }
            />

            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                  }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                  }}
                  className="min-w-0 flex-1 overflow-hidden"
                >
                  <div className="whitespace-nowrap">
                    Command Center
                  </div>

                  <div className="mt-0.5 truncate text-[9px] font-normal text-white/40">
                    Business pulse & alerts
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!sidebarCollapsed &&
              pathname === "/admin" && (
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
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className="overflow-hidden px-4 pb-4"
            >
              <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 transition-all duration-200 focus-within:border-[#4fc3f7]/50 focus-within:bg-white/[0.08] focus-within:shadow-[0_0_25px_rgba(79,195,247,.08)]">
                <Search
                  size={16}
                  className="shrink-0 text-white/40 group-focus-within:text-[#4fc3f7]"
                />

                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search control center..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() =>
                      setQuery("")
                    }
                    className="text-xs text-white/40 transition-colors hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
            NAVIGATION
        ===================================================== */}

        <nav className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 flex-1 overflow-y-auto px-3 pb-5">
          {filteredCategories.map(
            (category) => (
              <SidebarCategory
                key={category.id}
                category={category}
                query={query}
                sidebarCollapsed={
                  sidebarCollapsed
                }
                isOpen={
                  query.trim().length > 0
                    ? true
                    : !collapsed[
                        category.id
                      ]
                }
                onToggle={() =>
                  setCollapsed((prev) => ({
                    ...prev,
                    [category.id]:
                      !prev[category.id],
                  }))
                }
                pathname={pathname}
              />
            )
          )}

          {filteredCategories.length ===
            0 && (
            <div className="px-5 py-10 text-center">
              <Search
                size={24}
                className="mx-auto mb-3 text-white/30"
              />

              <p className="text-sm font-semibold text-white/70">
                Nothing found
              </p>

              <p className="mt-1 text-[11px] text-white/40">
                Try another search term
              </p>
            </div>
          )}
        </nav>

        {/* =====================================================
            ACCOUNT FOOTER
        ===================================================== */}

        <div className="border-t border-white/10 p-3">
          <Link
            href="/admin/users"
            title={
              sidebarCollapsed
                ? "Manage account"
                : undefined
            }
            className={`group flex items-center rounded-xl border border-white/[0.06] bg-white/[0.04] py-3 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.08] ${
              sidebarCollapsed
                ? "justify-center px-2"
                : "gap-3 px-3"
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#0060d0] to-[#4fc3f7] text-sm font-black shadow-lg">
              A
            </div>

            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{
                    opacity: 0,
                    width: 0,
                  }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                  }}
                  className="min-w-0 flex-1 overflow-hidden"
                >
                  <p className="truncate text-xs font-bold text-white">
                    Administrator
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-white/50">
                    Platform management
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!sidebarCollapsed && (
              <Settings
                size={16}
                className="shrink-0 text-white/40 transition-transform duration-300 group-hover:rotate-45 group-hover:text-white/80"
              />
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

  const categoryHasActiveItem =
    category.sections.some((section) =>
      isRouteActive(
        pathname,
        section.href
      )
    );

  /* =======================================================
     COLLAPSED VIEW
  ======================================================= */

  if (sidebarCollapsed) {
    const firstSection =
      category.sections[0];

    return (
      <div className="mb-2 flex justify-center">
        <Link
          href={
            firstSection?.href || "#"
          }
          title={category.name}
          className={`group relative flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
            categoryHasActiveItem
              ? "bg-white/10 text-white"
              : "text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          {categoryHasActiveItem && (
            <motion.span
              layoutId="collapsed-category-active"
              className="absolute -left-3 h-7 w-1 rounded-r-full bg-[#4fc3f7]"
            />
          )}

          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br ${category.color} shadow-lg transition-all duration-200 group-hover:scale-110 ${
              categoryHasActiveItem
                ? "opacity-100"
                : "opacity-75"
            }`}
          >
            <Icon
              size={16}
              strokeWidth={2.4}
            />
          </div>

          <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 translate-x-0 whitespace-nowrap rounded-lg border border-white/10 bg-[#001050] px-3 py-2 text-xs font-bold text-white opacity-0 shadow-xl transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
            {category.name}
          </div>
        </Link>
      </div>
    );
  }

  /* =======================================================
     EXPANDED VIEW
  ======================================================= */

  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-all ${
          categoryHasActiveItem
            ? "bg-white/[0.045]"
            : "hover:bg-white/[0.04]"
        }`}
      >
        <span className="text-[9px] font-black tracking-[1px] text-white/35 transition-colors group-hover:text-white/60">
          {category.number}
        </span>

        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${category.color} shadow-lg transition-opacity ${
            categoryHasActiveItem
              ? "opacity-100"
              : "opacity-70"
          }`}
        >
          <Icon
            size={12}
            strokeWidth={2.5}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className={`text-[10px] font-black uppercase tracking-[1.4px] ${
              categoryHasActiveItem
                ? "text-white"
                : "text-white/75 group-hover:text-white"
            }`}
          >
            {category.name}
          </div>

          {!query && (
            <div className="mt-0.5 truncate text-[9px] text-white/35">
              {category.description}
            </div>
          )}
        </div>

        <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[9px] font-bold text-white/45">
          {category.sections.length}
        </span>

        <ChevronDown
          size={14}
          className={`shrink-0 text-white/45 transition-transform duration-300 ${
            isOpen
              ? ""
              : "-rotate-90"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.22,
            }}
            className="ml-[29px] overflow-hidden"
          >
            <div className="space-y-1 pt-1">
              {category.sections.map(
                (section) => {
                  const SectionIcon =
                    section.icon;

                  const isActive =
                    isRouteActive(
                      pathname,
                      section.href
                    );

                  return (
                    <Link
                      key={section.slug}
                      href={section.href}
                      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                        isActive
                          ? "bg-white/10 text-white shadow-[0_5px_20px_rgba(0,0,0,.12)]"
                          : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-section"
                          className="absolute -left-[29px] top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-[#4fc3f7] shadow-[0_0_12px_rgba(79,195,247,.7)]"
                        />
                      )}

                      <SectionIcon
                        size={15}
                        strokeWidth={
                          isActive
                            ? 2.3
                            : 1.8
                        }
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-[#4fc3f7]"
                            : "text-white/40 group-hover:text-white/70"
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12px] font-semibold">
                          {section.label}
                        </div>

                        <div
                          className={`mt-0.5 truncate text-[9px] ${
                            isActive
                              ? "text-white/55"
                              : "text-white/35 group-hover:text-white/55"
                          }`}
                        >
                          {
                            section.description
                          }
                        </div>
                      </div>

                      <ArrowUpRight
                        size={12}
                        className="shrink-0 -translate-x-1 text-[#4fc3f7] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  );
                }
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}