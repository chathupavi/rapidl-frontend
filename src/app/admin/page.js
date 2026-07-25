import Link from "next/link";
import {
  LayoutGrid, Image as ImageIcon, Search, Star, Sparkles, Wrench, ArrowUpRight,
  Clock, TrendingUp, Eye, Globe2, CheckCircle2, AlertCircle, FileEdit, Home,
  BarChart3, Target, ShieldCheck, ShoppingBag, Zap, FileText, Truck, Users,
  HeartHandshake, MessageCircle, MapPin, HelpCircle, Phone, Share2, Layers3,
  Settings2,
} from "lucide-react";

/* =========================================================
   SITE CONTENT MAP
   Keep this aligned with your Sidebar navigation.
========================================================= */
const sectionGroups = [
  {
    id: "discover",
    number: "01",
    group: "Discover",
    description: "Make a strong first impression",
    icon: Sparkles,
    color: "from-[#4fc3f7] to-[#2196f3]",
    featured: true,
    items: [
      { slug: "hero", label: "Hero", description: "Homepage first impression", icon: Home, status: "Published" },
      { slug: "stats-strip", label: "Stats & Numbers", description: "Showcase key achievements", icon: BarChart3, status: "Published" },
      { slug: "values-banner", label: "Values Banner", description: "Communicate your values", icon: Target, status: "Published" },
      { slug: "trust", label: "Trust", description: "Build customer confidence", icon: ShieldCheck, status: "Published" },
    ],
  },
  {
    id: "explore",
    number: "02",
    group: "Explore & Book",
    description: "Show services and drive action",
    icon: ShoppingBag,
    color: "from-[#7c4dff] to-[#536dfe]",
    items: [
      { slug: "services", label: "Services", description: "Your laundry services", icon: Wrench, status: "Published" },
      { slug: "signature", label: "Signature Care", description: "Premium care experience", icon: Sparkles, status: "Published" },
      { slug: "tech", label: "Technology", description: "Your technology advantage", icon: Zap, status: "Published" },
      { slug: "gallery", label: "Gallery", description: "Visual brand showcase", icon: ImageIcon, status: "Draft" },
      { slug: "booking", label: "Booking", description: "Customer booking journey", icon: FileText, status: "Published" },
      { slug: "delivery", label: "Delivery", description: "Pickup and delivery", icon: Truck, status: "Published" },
      { slug: "commercial", label: "Commercial", description: "Business laundry solutions", icon: Users, status: "Published" },
    ],
  },
  {
    id: "trust",
    number: "03",
    group: "Build Trust",
    description: "Tell your story and earn confidence",
    icon: HeartHandshake,
    color: "from-[#ffb300] to-[#ff7043]",
    items: [
      { slug: "why", label: "Why Choose Us", description: "Your competitive advantage", icon: Star, status: "Published" },
      { slug: "founder", label: "Founder", description: "Introduce your leadership", icon: Users, status: "Published" },
      { slug: "values", label: "Core Values", description: "What your brand stands for", icon: HeartHandshake, status: "Published" },
      { slug: "vision", label: "Vision", description: "Your future direction", icon: Target, status: "Draft" },
      { slug: "reviews", label: "Reviews", description: "Customer experiences", icon: MessageCircle, status: "Published" },
    ],
  },
  {
    id: "connect",
    number: "04",
    group: "Connect",
    description: "Help customers find and contact you",
    icon: MapPin,
    color: "from-[#00c853] to-[#00a152]",
    items: [
      { slug: "locations", label: "Locations", description: "Where customers find you", icon: MapPin, status: "Published" },
      { slug: "faq", label: "FAQ", description: "Answer common questions", icon: HelpCircle, status: "Published" },
      { slug: "contact", label: "Contact", description: "Customer contact details", icon: Phone, status: "Published" },
      { slug: "social", label: "Social Media", description: "Connect across platforms", icon: Share2, status: "Published" },
      { slug: "seo-pages", label: "SEO Pages", description: "Search engine visibility", icon: Search, status: "Needs Attention" },
      { slug: "footer", label: "Footer", description: "Global website footer", icon: Layers3, status: "Published" },
    ],
  },
];

/* =========================================================
   STATS
========================================================= */
const stats = [
  { label: "Site Sections", value: "22", description: "Content areas", icon: LayoutGrid, type: "default" },
  { label: "Published", value: "19", description: "Live on website", icon: CheckCircle2, type: "success" },
  { label: "Needs Attention", value: "1", description: "Requires review", icon: AlertCircle, type: "warning" },
  { label: "SEO Health", value: "92%", description: "Looking good", icon: Search, type: "info" },
];

/* =========================================================
   ACTIVITY
========================================================= */
const activity = [
  { text: "Dashboard initialized", time: "Just now", icon: Sparkles },
  { text: "Admin account created", time: "Today", icon: Settings2 },
];

/* =========================================================
   METADATA
========================================================= */
export const metadata = {
  title: "Rapid Laundromat - Control Center",
};

/* =========================================================
   MAIN DASHBOARD
========================================================= */
export default function AdminDashboard() {
  return (
    <div className="flex w-full flex-col gap-8 pb-10">
      
      {/* =====================================================
          01. WELCOME / HERO
      ===================================================== */}
      <section
        className="relative overflow-hidden rounded-3xl px-7 py-8 lg:px-9 lg:py-10"
        style={{ background: "linear-gradient(135deg, #001050 0%, #002060 48%, #0060D0 100%)" }}
      >
        {/* Background glows */}
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,195,247,.28), transparent 68%)" }}
        />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#0060d0]/30 blur-[80px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[3px] text-[#90caf9]">
              <span className="h-2 w-2 rounded-full bg-brandGreen shadow-[0_0_10px_rgba(34,197,94,.8)]" />
              Rapid Laundromat - Control Center
            </div>
            <h1 className="font-barlowCond text-[2.1rem] font-extrabold uppercase leading-[.95] tracking-[1px] text-white sm:text-[2.5rem]">
              Your digital storefront,
              <br />
              <span className="text-[#4fc3f7]">under control.</span>
            </h1>
            <p className="mt-4 max-w-130 text-[.9rem] leading-6 text-white/55">
              Manage your website content, brand story, customer experience and SEO from one powerful control center.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-[.78rem] font-bold uppercase tracking-[.5px] text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15"
            >
              <Eye size={16} />
              View Live Site
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/admin/sections/hero"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[.78rem] font-bold uppercase tracking-[.5px] text-navy shadow-[0_10px_30px_rgba(0,0,0,.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(0,0,0,.3)]"
            >
              <Sparkles size={16} />
              Edit Homepage
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          02. WEBSITE HEALTH
      ===================================================== */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[2.5px] text-bright">Overview</p>
            <h2 className="mt-1 font-barlowCond text-[1.45rem] font-extrabold uppercase tracking-[.5px] text-navy">
              Website Health
            </h2>
          </div>
          <Link href="/admin/seo" className="hidden items-center gap-1 text-[.75rem] font-bold text-bright transition-colors hover:text-navy sm:flex">
            View detailed health
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const iconStyle = {
              success: "bg-[#ecfdf5] text-[#16a34a]",
              warning: "bg-[#fff7ed] text-[#ea580c]",
              info: "bg-[#eff6ff] text-[#2563eb]",
              default: "bg-foam text-bright",
            };

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(0,64,160,.08)] bg-white p-5 shadow-[0_2px_12px_rgba(0,64,160,.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,64,160,.1)]"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconStyle[stat.type]}`}>
                    <Icon size={19} />
                  </div>
                  {stat.type === "success" && (
                    <span className="rounded-full bg-[#ecfdf5] px-2 py-1 text-[9px] font-bold text-[#16a34a]">LIVE</span>
                  )}
                  {stat.type === "warning" && (
                    <span className="rounded-full bg-[#fff7ed] px-2 py-1 text-[9px] font-bold text-[#ea580c]">REVIEW</span>
                  )}
                </div>
                <div className="mt-5 font-barlowCond text-[2rem] font-extrabold leading-none text-navy">{stat.value}</div>
                <div className="mt-2 text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">{stat.label}</div>
                <div className="mt-1 text-[.72rem] text-muted">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          03. CONTENT MAP
      ===================================================== */}
      <section>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[2.5px] text-bright">Your Website</p>
            <h2 className="mt-1 font-barlowCond text-[1.55rem] font-extrabold uppercase tracking-[.5px] text-navy">
              Content Map
            </h2>
            <p className="mt-1 text-[.8rem] text-muted">Manage every part of your digital experience.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[rgba(0,64,160,.08)] bg-white px-3 py-2.5 text-[.75rem] text-muted shadow-[0_2px_10px_rgba(0,64,160,.03)]">
            <Search size={15} />
            <span>Use sidebar search to find content</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {sectionGroups.map((group) => {
            const GroupIcon = group.icon;

            return (
              <div key={group.id} className="overflow-hidden rounded-[22px] border border-[rgba(0,64,160,.08)] bg-white shadow-[0_3px_15px_rgba(0,64,160,.04)]">
                {/* Group Header */}
                <div className="flex flex-col gap-4 border-b border-[rgba(0,64,160,.06)] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
                  <div className="flex items-center gap-4">
                    <div className="font-barlowCond text-[1rem] font-black text-[rgba(0,64,160,.2)]">{group.number}</div>
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${group.color} text-white shadow-lg`}>
                      <GroupIcon size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="font-barlowCond text-[1.15rem] font-extrabold uppercase tracking-[.5px] text-navy">{group.group}</h3>
                      <p className="mt-0.5 text-[.75rem] text-muted">{group.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start rounded-full bg-foam px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.5px] text-bright sm:self-auto">
                    <LayoutGrid size={12} />
                    {group.items.length} Sections
                  </div>
                </div>

                {/* Section Grid */}
                <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    const isAttention = item.status === "Needs Attention";
                    const isDraft = item.status === "Draft";

                    return (
                      <Link
                        key={item.slug}
                        href={`/admin/sections/${item.slug}`}
                        className="group relative flex min-h-[108px] flex-col justify-between rounded-2xl border border-[rgba(0,64,160,.07)] bg-[#f8faff] p-4 transition-all duration-250 hover:-translate-y-0.5 hover:border-[rgba(0,96,208,.25)] hover:bg-white hover:shadow-[0_10px_25px_rgba(0,64,160,.08)]"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-bright shadow-[0_2px_8px_rgba(0,64,160,.06)]">
                            <ItemIcon size={16} />
                          </div>
                          <ArrowUpRight size={16} className="text-[rgba(0,64,160,.2)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bright" />
                        </div>
                        <div className="mt-4">
                          <div className="text-[.85rem] font-bold text-navy">{item.label}</div>
                          <div className="mt-1 truncate text-[.7rem] text-muted">{item.description}</div>
                        </div>
                        <div className="mt-3">
                          {isAttention && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff7ed] px-2 py-1 text-[9px] font-bold text-[#ea580c]">
                              <AlertCircle size={10} /> Needs Attention
                            </span>
                          )}
                          {isDraft && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#fefce8] px-2 py-1 text-[9px] font-bold text-[#ca8a04]">
                              <FileEdit size={10} /> Draft
                            </span>
                          )}
                          {!isAttention && !isDraft && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#ecfdf5] px-2 py-1 text-[9px] font-bold text-[#16a34a]">
                              <CheckCircle2 size={10} /> Published
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          04. QUICK ACTIONS + ACTIVITY
      ===================================================== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
        
        {/* Quick Actions */}
        <section className="rounded-[22px] border border-[rgba(0,64,160,.08)] bg-white p-5 shadow-[0_3px_15px_rgba(0,64,160,.04)] sm:p-6">
          <div className="mb-5">
            <p className="text-[10px] font-black uppercase tracking-[2px] text-bright">Shortcuts</p>
            <h2 className="mt-1 font-barlowCond text-[1.25rem] font-extrabold uppercase text-navy">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <QuickAction href="/admin/media" icon={ImageIcon} label="Upload Media" description="Manage images" />
            <QuickAction href="/admin/seo" icon={Search} label="SEO Settings" description="Improve visibility" />
            <QuickAction href="/admin/sections/faq" icon={HelpCircle} label="Edit FAQ" description="Update answers" />
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-[22px] border border-[rgba(0,64,160,.08)] bg-white p-5 shadow-[0_3px_15px_rgba(0,64,160,.04)] sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[2px] text-bright">Activity</p>
              <h2 className="mt-1 font-barlowCond text-[1.25rem] font-extrabold uppercase text-navy">Recent Activity</h2>
            </div>
            <Clock size={18} className="text-muted" />
          </div>
          <div className="flex flex-col gap-3">
            {activity.map((item, index) => {
              const ActivityIcon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 rounded-xl bg-[#f8faff] px-3 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foam text-bright">
                    <ActivityIcon size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[.78rem] font-semibold text-navy">{item.text}</div>
                    <div className="mt-0.5 text-[.68rem] text-muted">{item.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

    </div>
  );
}

/* =========================================================
   QUICK ACTION COMPONENT
========================================================= */
function QuickAction({ href, icon: Icon, label, description }) {
  return (
    <Link 
      href={href}
      className="group flex flex-col items-start gap-3 rounded-xl border border-[rgba(0,64,160,.06)] bg-[#f8faff] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,96,208,.25)] hover:bg-white hover:shadow-[0_8px_20px_rgba(0,64,160,.06)]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-bright shadow-[0_2px_8px_rgba(0,64,160,.06)]">
        <Icon size={18} className="transition-transform duration-200 group-hover:scale-110 group-hover:text-navy" />
      </div>
      <div>
        <div className="text-[.75rem] font-bold text-navy">{label}</div>
        <div className="mt-1 text-[.65rem] text-muted">{description}</div>
      </div>
    </Link>
  );
}