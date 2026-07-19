export default function Founder() {
  return (
    <section id="founder" className="bg-white px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          Meet Our Founder
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Leadership Rooted in
          <br />
          28 Years of Excellence
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-275 grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        {/* Photo */}
        <div className="relative flex justify-center lg:block">
          <div
            className="relative flex aspect-3/4 w-full max-w-85 items-center justify-center overflow-hidden rounded-2xl text-[5rem] shadow-[0_20px_55px_rgba(0,64,160,.25)]"
            style={{
              background: "linear-gradient(145deg, #002060, #0040B0, #0060D0)",
            }}
          >
            👨‍💼
          </div>
          <div className="absolute -bottom-4.5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg bg-white px-5 py-[.65rem] text-[.8rem] font-bold text-navy shadow-[0_6px_22px_rgba(0,0,0,.12)]">
            🏆 28+ Years Manufacturing & Operations
          </div>
        </div>

        {/* Content */}
        <div className="pb-6">
          <div className="mb-[.35rem] font-barlowCond text-[2.8rem] font-black uppercase leading-none tracking-[2px] text-navy">
            Milinda Jayasundara
          </div>
          <div className="mb-[1.4rem] text-[.82rem] font-bold uppercase tracking-[2px] text-bright">
            Founder & Director — Rapid Laundromat (Pvt) Ltd
          </div>
          <p className="mb-6 text-[.95rem] leading-[1.85] text-muted">
            Milinda Jayasundara brings over 28 years of world-class
            manufacturing and operations expertise to Rapid Laundromat —
            redefining what professional garment care looks like in Sri
            Lanka. His vision is simple: deliver international standards of
            quality, consistency and customer service to every single
            customer, from the family dropping off a school uniform to a
            five-star hotel trusting us with their linen.
          </p>

          <div className="flex flex-col gap-[.7rem]">
            <div className="flex items-start gap-3">
              <div className="mt-[.35rem] h-2 w-2 shrink-0 rounded-full bg-bright" />
              <div className="text-[.88rem] font-medium text-[#001030]">
                Former <strong>Chief Operating Officer</strong> — Ananta
                Group, Bangladesh
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-[.35rem] h-2 w-2 shrink-0 rounded-full bg-bright" />
              <div className="text-[.88rem] font-medium text-[#001030]">
                Former <strong>General Manager</strong> — MAS Holdings, Sri
                Lanka
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-[.35rem] h-2 w-2 shrink-0 rounded-full bg-bright" />
              <div className="text-[.88rem] font-medium text-[#001030]">
                28+ years in manufacturing, operations and process excellence
                across Asia
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-[.35rem] h-2 w-2 shrink-0 rounded-full bg-bright" />
              <div className="text-[.88rem] font-medium text-[#001030]">
                Founder of Sri Lanka&apos;s fastest-growing professional
                laundry brand
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-r-lg border-l-[3px] border-bright bg-foam px-6 py-[1.2rem]">
            <div className="mb-[.4rem] text-[.7rem] font-extrabold uppercase tracking-[3px] text-bright">
              Company Vision
            </div>
            <p className="text-[.95rem] font-semibold italic leading-[1.65] text-navy">
              &quot;To become Sri Lanka&apos;s most trusted laundry and
              fabric care brand — building a business where every garment is
              treated with the same care we would give our own.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Co-Director strip */}
      <div className="mx-auto mt-16 flex max-w-275 flex-col items-center gap-6 rounded-xl border border-[rgba(0,64,160,.1)] bg-foam p-8 text-center sm:flex-row sm:text-left lg:gap-8">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-accent to-bright text-[2.2rem]">
          👩‍💼
        </div>
        <div>
          <div className="mb-[.4rem] text-[.78rem] font-bold uppercase tracking-[2px] text-bright">
            Co-Director
          </div>
          <div className="mb-2 font-barlowCond text-[1.5rem] font-extrabold uppercase tracking-[1px] text-navy">
            Mrs. Dushani Goonathilaka
          </div>
          <p className="text-[.88rem] leading-[1.65] text-muted">
            Co-Director of Rapid Laundromat (Pvt) Ltd, Mrs. Dushani
            Goonathilaka brings operational and customer experience
            leadership to the brand — ensuring every branch delivers on the
            company&apos;s promise of premium, personal service.{" "}
            <em>(Professional photography coming soon.)</em>
          </p>
        </div>
      </div>
    </section>
  );
}