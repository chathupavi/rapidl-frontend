const branches = [
  {
    city: "Kurunegala",
    address: "Rapid Laundromat (Pvt) Ltd",
    province: "Kurunegala, North Western Province, Sri Lanka",
    mapUrl:
      "https://www.google.com/maps/search/Rapid+Laundromat+Kurunegala+Sri+Lanka",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.89!2d80.3658!3d7.4863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3357432b75555%3A0x2e49ef1b5e6e11f9!2sKurunegala%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1",
  },
  {
    city: "Kandy",
    address: "Rapid Laundromat (Pvt) Ltd",
    province: "Kandy, Central Province, Sri Lanka",
    mapUrl:
      "https://www.google.com/maps/search/Rapid+Laundromat+Kandy+Sri+Lanka",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.89!2d80.6337!3d7.2906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368b752ad1ddd%3A0x3b8ba5c7b0a2e16c!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="bg-foam px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          Find Us
        </p>

        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Two Branches,
          <br />
          One Standard of Excellence
        </h2>

        <p className="max-w-140 text-[.97rem] leading-[1.85] text-muted">
          Visit us in Kurunegala or Kandy — both fully equipped and ready to
          serve you 7 days a week.
        </p>

        <div className="mt-11 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {branches.map((b) => (
            <div
              key={b.city}
              className="rounded-2xl border border-[rgba(0,64,160,.08)] bg-white p-9 shadow-[0_6px_30px_rgba(0,64,160,.1)] transition-transform duration-300 hover:-translate-y-1.25"
            >
              <div className="mb-1 font-barlowCond text-[2.5rem] font-black uppercase tracking-[2px] text-navy">
                {b.city}
              </div>

              <div className="mb-3 flex items-center gap-[.4rem]">
                <span className="text-[1rem] tracking-[1px] text-gold">
                  ★★★★★
                </span>
                <span className="text-[.9rem] font-bold text-navy">5.0</span>
                <span className="text-[.78rem] text-muted">
                  • Google Verified
                </span>
              </div>

              <div className="mb-5 text-[.88rem] leading-[1.65] text-muted">
                {b.address}
                <br />
                {b.province}
              </div>

              <div className="mb-6 flex flex-col gap-[.65rem]">
                <div className="flex items-center gap-[.55rem] text-[.87rem] text-[#001030]">
                  <span className="w-5 shrink-0 text-base">🕐</span>
                  Open Daily: 7:30 AM – 6:00 PM
                </div>

                <div className="flex items-center gap-[.55rem] text-[.87rem] text-[#001030]">
                  <span className="w-5 shrink-0 text-base">📞</span>
                  <a
                    href="tel:+94703171717"
                    className="font-semibold text-bright hover:underline"
                  >
                    070 317 1717
                  </a>
                </div>

                <div className="flex items-center gap-[.55rem] text-[.87rem] text-[#001030]">
                  <span className="w-5 shrink-0 text-base">💬</span>
                  <a
                    href="https://wa.me/94703171717"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-bright hover:underline"
                  >
                    WhatsApp: 070 317 1717
                  </a>
                </div>

                <div className="flex items-center gap-[.55rem] text-[.87rem] text-[#001030]">
                  <span className="w-5 shrink-0 text-base">✅</span>
                  All services available
                </div>
              </div>

              <div className="flex flex-wrap gap-[.7rem]">
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-[.4rem] rounded-[5px] bg-bright px-[1.1rem] py-[.55rem] text-[.82rem] font-bold uppercase tracking-[.3px] text-white transition-colors duration-200 hover:bg-navy"
                >
                  📍 Navigate
                </a>

                <a
                  href="tel:+94703171717"
                  className="inline-flex items-center gap-[.4rem] rounded-[5px] border border-bright bg-foam px-[1.1rem] py-[.55rem] text-[.82rem] font-bold uppercase tracking-[.3px] text-bright transition-colors duration-200 hover:bg-bright hover:text-white"
                >
                  📞 Call
                </a>

                <a
                  href="https://wa.me/94703171717"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-[.4rem] rounded-[5px] bg-[#25d366] px-[1.1rem] py-[.55rem] text-[.82rem] font-bold uppercase tracking-[.3px] text-white transition-colors duration-200 hover:bg-[#1ebe5c]"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map embeds */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {branches.map((b) => (
            <div
              key={b.city}
              className="overflow-hidden rounded-xl border border-[rgba(0,64,160,.1)]"
            >
              <div className="bg-navy py-[.6rem] text-center text-[.78rem] font-bold uppercase tracking-[1px] text-white">
                📍 {b.city} Branch
              </div>

              <iframe
                src={b.embedUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Rapid Laundromat ${b.city}`}
                className="block h-65 w-full border-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}