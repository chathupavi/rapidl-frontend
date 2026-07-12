const roadmap = [
  { city: "Colombo", status: "Coming Soon", active: true },
  { city: "Negombo", status: "Planned", active: false },
  { city: "Galle", status: "Planned", active: false },
  { city: "Dambulla", status: "Planned", active: false },
  { city: "Kegalle", status: "Planned", active: false },
  { city: "Matara", status: "Planned", active: false },
  { city: "Matale", status: "Planned", active: false },
  { city: "Anuradhapura", status: "Planned", active: false },
  { city: "Trincomalee", status: "Planned", active: false },
];

export default function Vision() {
  return (
    <section id="vision" className="bg-foam px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          Our Vision & Expansion
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Growing Across
          <br />
          Sri Lanka
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-8 border-l-[3px] border-bright pl-6 text-[1.2rem] font-semibold italic leading-[1.75] text-navy">
              &quot;To become Sri Lanka&apos;s most trusted laundry and
              fabric care brand — setting the standard for quality,
              reliability and sustainability in every community we
              serve.&quot;
            </p>
            <div className="mb-4 text-[.7rem] font-extrabold uppercase tracking-[3px] text-bright">
              Current Footprint
            </div>
            <div className="flex flex-wrap gap-[.6rem]">
              <span className="rounded-full border border-bright bg-bright px-[.9rem] py-[.4rem] text-[.8rem] font-bold uppercase tracking-[.3px] text-white">
                ✅ Kurunegala
              </span>
              <span className="rounded-full border border-bright bg-bright px-[.9rem] py-[.4rem] text-[.8rem] font-bold uppercase tracking-[.3px] text-white">
                ✅ Kandy
              </span>
            </div>
          </div>

          <div>
            <div className="mb-4 text-[.7rem] font-extrabold uppercase tracking-[3px] text-bright">
              Expansion Roadmap
            </div>
            <div className="flex flex-col gap-[.7rem]">
              {roadmap.map((item) => (
                <div
                  key={item.city}
                  className="flex items-center gap-[.9rem] rounded-lg border border-[rgba(0,64,160,.08)] bg-white px-4 py-[.7rem]"
                >
                  <div
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      item.active ? "bg-bright" : "bg-[rgba(0,96,208,.3)]"
                    }`}
                  />
                  <div className="text-[.88rem] font-semibold text-navy">
                    {item.city}
                  </div>
                  <div className="ml-auto text-[.72rem] font-semibold uppercase tracking-[.5px] text-muted">
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}