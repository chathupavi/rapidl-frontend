import Image from "next/image";

const footerCols = [
  {
    title: "Services",
    links: [
      { label: "Wash & Fold", href: "#services" },
      { label: "Dry Cleaning", href: "#services" },
      { label: "Bridal Gown Care", href: "#services" },
      { label: "Shoe & Bag Care", href: "#signature" },
      { label: "Express Laundry", href: "#services" },
      { label: "Curtains & Carpets", href: "#services" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Commercial Laundry", href: "#commercial" },
      { label: "Hotel Solutions", href: "#commercial" },
      { label: "Book Pickup", href: "#booking" },
      { label: "Our Founder", href: "#founder" },
      { label: "Expansion Plans", href: "#vision" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Kurunegala Branch", href: "#locations" },
      { label: "Kandy Branch", href: "#locations" },
      { label: "Facebook", href: "#social" },
      { label: "Instagram", href: "#social" },
      { label: "TikTok", href: "#social" },
      { label: "Google Reviews", href: "#reviews" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,96,208,.15)] bg-navy px-[5%] pb-6 pt-14">
      <div className="mx-auto mb-10 flex max-w-275 flex-wrap items-start justify-between gap-12">

        {/* Logo + info */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="Rapid Laundromat"
              width={44}
              height={44}
              className="h-11 w-11 rounded-md border border-white/10 object-cover"
            />

            <div className="flex flex-col font-barlowCond text-[1.35rem] font-extrabold uppercase leading-none tracking-[2px] text-white">
              Rapid Laundromat
              <span className="text-[.6rem] font-semibold tracking-[3px] text-[rgba(0,176,255,.6)]">
                Sri Lanka
              </span>
            </div>
          </div>

          <div className="max-w-70 text-[.82rem] leading-[1.75] text-[rgba(180,210,255,.35)]">
            Sri Lanka&apos;s Premium Garment Care & Commercial Laundry Partner
            <br />
            Kurunegala & Kandy, Sri Lanka
            <br />
            <br />
            📞 070 317 1717 &nbsp;|&nbsp; 🕐 7:30 AM – 6:00 PM Daily
            <br />
            💬{" "}
            <a
              href="https://wa.me/94703171717"
              className="text-[rgba(0,176,255,.5)] no-underline"
            >
              wa.me/94703171717
            </a>
          </div>
        </div>

        {/* Link columns */}
        {footerCols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-barlowCond text-[.9rem] font-bold uppercase tracking-[2px] text-white">
              {col.title}
            </h4>

            <nav className="flex flex-col gap-2">
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[.82rem] uppercase tracking-[.3px] text-white/40 transition-colors duration-200 hover:text-bright"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        ))}

      </div>

      <div className="mx-auto max-w-275 border-t border-[rgba(0,96,208,.12)] pt-6 text-center text-[.78rem] text-[rgba(180,210,255,.2)]">
        © 2025 Rapid Laundromat (Pvt) Ltd · Kurunegala & Kandy, Sri Lanka · All Rights Reserved
      </div>
    </footer>
  );
}