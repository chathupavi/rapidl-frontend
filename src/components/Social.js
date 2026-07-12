const socials = [
  {
    href: "https://www.facebook.com/rapidlaundromat",
    icon: "📘",
    name: "Facebook",
    handle: "Rapid Laundromat",
    borderColor: "border-t-[#1877f2]",
  },
  {
    href: "https://www.instagram.com/rapidlaundromat",
    icon: "📸",
    name: "Instagram",
    handle: "@rapidlaundromat",
    borderColor: "border-t-[#e1306c]",
  },
  {
    href: "https://www.tiktok.com/@rapidlaundromat",
    icon: "🎵",
    name: "TikTok",
    handle: "@rapidlaundromat",
    borderColor: "border-t-[#010101]",
  },
  {
    href: "https://wa.me/94703171717",
    icon: "💬",
    name: "WhatsApp Business",
    handle: "070 317 1717",
    borderColor: "border-t-[#25d366]",
  },
  {
    href: "https://www.google.com/maps/search/Rapid+Laundromat+Sri+Lanka",
    icon: "🗺️",
    name: "Google Business",
    handle: "Rate & Review Us",
    borderColor: "border-t-[#ea4335]",
  },
];

export default function Social() {
  return (
    <section id="social" className="bg-foam px-[5%] py-22.5 text-center">
      <div className="mx-auto max-w-275">
        
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          Follow & Connect
        </p>

        <h2 className="mx-auto mb-2 font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Stay Connected With Us
        </h2>

        <p className="mx-auto max-w-120 text-[.95rem] text-muted">
          Follow for promotions, laundry tips and updates from our Kurunegala & Kandy branches.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-[1.3rem]">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className={`flex min-w-35 flex-col items-center gap-[.6rem] rounded-xl border border-[rgba(0,64,160,.07)] border-t-[3px] bg-white px-8 py-7 text-navy no-underline shadow-[0_4px_18px_rgba(0,0,0,.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,.1)] ${s.borderColor}`}
            >
              <div className="text-[2rem]">{s.icon}</div>
              <div className="font-barlowCond text-[1rem] font-bold uppercase tracking-[.5px] text-navy">
                {s.name}
              </div>
              <div className="text-[.8rem] text-muted">{s.handle}</div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}