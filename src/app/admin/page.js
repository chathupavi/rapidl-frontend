import Link from "next/link";
import {
  LayoutGrid,
  Image as ImageIcon,
  Search,
  Star,
  Sparkles,
  Wrench,
  Building2,
  Users2,
  MapPin,
  ArrowUpRight,
  Clock,
  TrendingUp,
} from "lucide-react";

const sectionGroups = [
  {
    group: "Core Pages",
    icon: Sparkles,
    color: "from-bright to-light",
    items: [
      { slug: "hero", label: "Hero" },
      { slug: "stats-strip", label: "Stats Strip" },
      { slug: "values-banner", label: "Values Banner" },
      { slug: "trust", label: "Trust" },
    ],
  },
  {
    group: "Services",
    icon: Wrench,
    color: "from-accent to-bright",
    items: [
      { slug: "services", label: "Services" },
      { slug: "signature", label: "Signature Care" },
      { slug: "tech", label: "Technology" },
      { slug: "gallery", label: "Gallery" },
    ],
  },
  {
    group: "Business",
    icon: Building2,
    color: "from-navy to-medium",
    items: [
      { slug: "commercial", label: "Commercial" },
      { slug: "booking", label: "Booking" },
      { slug: "delivery", label: "Delivery" },
      { slug: "vision", label: "Vision" },
    ],
  },
  {
    group: "Trust & People",
    icon: Users2,
    color: "from-gold to-[#f5a742]",
    items: [
      { slug: "why", label: "Why Choose Us" },
      { slug: "founder", label: "Founder" },
      { slug: "values", label: "Core Values" },
      { slug: "reviews", label: "Reviews" },
    ],
  },
  {
    group: "Discovery & Contact",
    icon: MapPin,
    color: "from-[#25d366] to-[#1ebe5c]",
    items: [
      { slug: "locations", label: "Locations" },
      { slug: "seo-pages", label: "SEO Pages" },
      { slug: "faq", label: "FAQ" },
      { slug: "social", label: "Social" },
      { slug: "contact", label: "Contact" },
      { slug: "footer", label: "Footer" },
    ],
  },
];

const stats = [
  { label: "Total Sections", value: "22", icon: LayoutGrid, trend: null },
  { label: "Media Files", value: "0", icon: ImageIcon, trend: null },
  { label: "SEO Score", value: "—", icon: Search, trend: null },
  { label: "Google Rating", value: "5.0", icon: Star, trend: "+0.0" },
];

const activity = [
  { text: "Dashboard initialized", time: "Just now" },
  { text: "Admin account created", time: "Today" },
];

export const metadata = {
  title: "Dashboard",
};

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-7">
      {/* Hero banner */}
      <div
        className="relative overflow-hidden rounded-2xl px-8 py-9"
        style={{
          background:
            "linear-gradient(135deg, #001050 0%, #002060 45%, #0060D0 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,144,255,.25), transparent 70%)" }}
        />
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-[.72rem] font-bold uppercase tracking-[3px] text-[rgba(180,210,255,.7)]">
              Welcome back
            </p>
            <h1 className="font-barlowCond text-[2rem] font-extrabold uppercase leading-none tracking-[1px] text-white">
              Rapid Laundromat Control Center
            </h1>
            <p className="mt-2 max-w-[440px] text-[.87rem] text-[rgba(180,210,255,.6)]">
              Manage every section of your live site from one place — content,
              media and SEO, all in sync.
            </p>
          </div>
          <Link
            href="/admin/sections/hero"
            className="inline-flex shrink-0 items-center gap-2 rounded-[8px] bg-white px-5 py-[.75rem] text-[.83rem] font-bold uppercase tracking-[.3px] text-navy transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(0,0,0,.25)]"
          >
            <Sparkles size={16} strokeWidth={2.5} />
            Edit Hero Section
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(0,64,160,.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,64,160,.05)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(0,64,160,.12)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foam text-bright transition-colors duration-300 group-hover:bg-bright group-hover:text-white">
                  <Icon size={20} strokeWidth={2} />
                </div>
                {stat.trend && (
                  <span className="flex items-center gap-1 rounded-full bg-[rgba(34,197,94,.1)] px-2 py-[.2rem] text-[.72rem] font-bold text-[#16a34a]">
                    <TrendingUp size={12} strokeWidth={2.5} />
                    {stat.trend}
                  </span>
                )}
              </div>
              <div className="mb-1 font-barlowCond text-[2rem] font-extrabold leading-none text-navy">
                {stat.value}
              </div>
              <div className="text-[.78rem] font-semibold uppercase tracking-[.5px] text-muted">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1fr_320px]">
        {/* Section groups */}
        <div className="flex flex-col gap-6">
          {sectionGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div
                key={group.group}
                className="rounded-2xl border border-[rgba(0,64,160,.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,64,160,.05)]"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white ${group.color}`}
                  >
                    <GroupIcon size={16} strokeWidth={2.5} />
                  </div>
                  <h2 className="font-barlowCond text-[1.05rem] font-bold uppercase tracking-[.5px] text-navy">
                    {group.group}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/admin/sections/${item.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-[rgba(0,64,160,.08)] bg-foam/40 px-4 py-3 transition-all duration-200 hover:border-[rgba(0,96,208,.3)] hover:bg-foam"
                    >
                      <span className="text-[.87rem] font-semibold text-navy">
                        {item.label}
                      </span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.5}
                        className="text-[rgba(0,64,160,.3)] transition-all duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-bright"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar column: quick actions + activity */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-[rgba(0,64,160,.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,64,160,.05)]">
            <h2 className="mb-4 font-barlowCond text-[1rem] font-bold uppercase tracking-[.5px] text-navy">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/admin/media"
                className="flex items-center gap-3 rounded-xl px-3 py-[.65rem] text-[.85rem] font-semibold text-navy transition-colors duration-200 hover:bg-foam"
              >
                <ImageIcon size={17} className="text-bright" />
                Upload Media
              </Link>
              <Link
                href="/admin/seo"
                className="flex items-center gap-3 rounded-xl px-3 py-[.65rem] text-[.85rem] font-semibold text-navy transition-colors duration-200 hover:bg-foam"
              >
                <Search size={17} className="text-bright" />
                Update SEO Settings
              </Link>
              <Link
                href="/admin/sections/faq"
                className="flex items-center gap-3 rounded-xl px-3 py-[.65rem] text-[.85rem] font-semibold text-navy transition-colors duration-200 hover:bg-foam"
              >
                <LayoutGrid size={17} className="text-bright" />
                Edit FAQ
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[rgba(0,64,160,.08)] bg-white p-6 shadow-[0_2px_12px_rgba(0,64,160,.05)]">
            <h2 className="mb-4 font-barlowCond text-[1rem] font-bold uppercase tracking-[.5px] text-navy">
              Recent Activity
            </h2>
            <div className="flex flex-col gap-4">
              {activity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-[.3rem] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foam text-bright">
                    <Clock size={12} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[.83rem] font-medium text-navy">
                      {item.text}
                    </div>
                    <div className="text-[.72rem] text-muted">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}