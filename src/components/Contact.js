export default function Contact() {
  return (
    <section
      id="contact"
      className="px-[5%] py-22.5 text-center"
      style={{
        background:
          "linear-gradient(145deg, #002060, #0040B0 50%, #0060D0)",
      }}
    >
      <div className="mx-auto max-w-175">
        
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-[rgba(180,210,255,.8)]">
          Get In Touch
        </p>

        <h2 className="mx-auto mb-4 font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          Ready for Fresh,
          <br />
          Clean Clothes Today?
        </h2>

        <p className="mx-auto mb-10 text-[.97rem] leading-[1.85] text-[rgba(180,210,255,.65)]">
          Call us, WhatsApp us or visit either branch in Kurunegala or Kandy.
          We&apos;re open every day 7:30 AM – 6:00 PM.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          
          <a
            href="tel:+94703171717"
            className="inline-flex items-center gap-2 rounded-[5px] bg-white px-[1.9rem] py-[.9rem] text-[.93rem] font-bold uppercase tracking-[.3px] text-navy transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_8px_28px_rgba(0,0,0,.2)]"
          >
            📞 Call 070 317 1717
          </a>

          <a
            href="https://wa.me/94703171717?text=Hello!%20I%20need%20laundry%20service."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[5px] bg-white px-[1.9rem] py-[.9rem] text-[.93rem] font-bold uppercase tracking-[.3px] text-navy transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_8px_28px_rgba(0,0,0,.2)]"
          >
            💬 WhatsApp Us
          </a>

          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-[5px] bg-white px-[1.9rem] py-[.9rem] text-[.93rem] font-bold uppercase tracking-[.3px] text-navy transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_8px_28px_rgba(0,0,0,.2)]"
          >
            📅 Book Pickup
          </a>

          <a
            href="#commercial"
            className="inline-flex items-center gap-2 rounded-[5px] bg-white px-[1.9rem] py-[.9rem] text-[.93rem] font-bold uppercase tracking-[.3px] text-navy transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_8px_28px_rgba(0,0,0,.2)]"
          >
            🏢 Commercial Enquiry
          </a>

        </div>
      </div>
    </section>
  );
}