const areas = [
  "Kurunegala",
  "Kandy",
  "Nearby Towns",
  "Hotel Collections",
  "Restaurant Linen",
  "Express Pickup",
  "Office Uniforms",
];

export default function Delivery() {
  return (
    <section id="delivery" className="bg-white px-[5%] py-22.5">
      <div className="mx-auto grid max-w-275 grid-cols-1 items-center gap-16 lg:grid-cols-2">
        
        <div>
          <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
            Pickup & Delivery
          </p>

          <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
            We Come to You —
            <br />
            Kurunegala & Kandy
          </h2>

          <p className="max-w-140 text-[.97rem] leading-[1.85] text-muted">
            Schedule a pickup and we&apos;ll collect your laundry from your
            door and return it fresh and clean. Serving homes, hotels and
            businesses.
          </p>

          <div className="mt-6 flex flex-wrap gap-[.7rem]">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[rgba(0,64,176,.2)] bg-foam px-[.85rem] py-[.35rem] text-[.8rem] font-bold uppercase tracking-[.3px] text-accent"
              >
                {area}
              </span>
            ))}
          </div>

          <a
            href="https://wa.me/94703171717?text=Hello!%20I%20would%20like%20to%20schedule%20a%20laundry%20pickup."
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-[5px] bg-[#25d366] px-8 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5c]"
          >
            💬 Book a Pickup via WhatsApp
          </a>
        </div>

        <div
          className="mx-auto hidden aspect-square w-full max-w-87.5 items-center justify-center rounded-full text-[7rem] shadow-[0_20px_55px_rgba(0,64,160,.28)] lg:flex"
          style={{
            background: "linear-gradient(145deg, #002060, #0040B0, #0060D0)",
          }}
        >
          🚗
        </div>

      </div>
    </section>
  );
}