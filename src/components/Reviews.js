const reviews = [
  {
    text: "Best laundry service in Kurunegala. My suits always come back perfectly pressed and on time. Highly recommend!",
    author: "Prasad K., Kurunegala",
    date: "June 2025",
  },
  {
    text: "Used the express service — had my clothes back within the hour. Amazing! The team is very professional and friendly.",
    author: "Sithmi R., Kandy",
    date: "May 2025",
  },
  {
    text: "We use Rapid Laundromat for our hotel linen every week. Reliable, quality service — our guests notice the difference.",
    author: "Hotel Partner, Kandy",
    date: "April 2025",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-navy px-[5%] py-22.5 text-center">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-light">
          Verified Customer Reviews
        </p>

        <h2 className="mx-auto mb-[.8rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          What Our Customers Say
        </h2>

        <div className="mb-[.4rem] text-[1.6rem] tracking-[3px] text-gold">
          ★★★★★
        </div>

        <p className="mb-7 text-[.85rem] text-[rgba(180,210,255,.4)]">
          5.0 — Verified Google Rating · Rapid Laundromat (Pvt) Ltd
        </p>

        <p className="mx-auto mb-11 max-w-170 text-[clamp(1.1rem,2.5vw,1.55rem)] font-light italic leading-[1.75] text-[rgba(180,210,255,.78)]">
          &quot;Trusted by customers for exceptional garment care, fast
          turnaround and professional service in both Kurunegala and Kandy.&quot;
        </p>

        {/* Reviews Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="w-full max-w-70 rounded-xl border border-[rgba(0,96,208,.22)] bg-[rgba(0,96,208,.1)] p-6 text-left"
            >
              <div className="mb-2 text-[.9rem] text-gold">★★★★★</div>

              <p className="mb-3 text-[.87rem] italic leading-[1.65] text-[rgba(180,210,255,.72)]">
                &quot;{review.text}&quot;
              </p>

              <div className="mt-2 flex items-center justify-between">
                <div className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.4)]">
                  — {review.author}
                </div>

                <a
                  href="https://g.page/rapidlaundromat/review"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[.72rem] font-semibold text-[rgba(0,144,255,.6)] transition-colors duration-200 hover:text-[#90caf9]"
                >
                  Google ↗
                </a>
              </div>

              <div className="mt-1 text-[.73rem] text-[rgba(180,210,255,.3)]">
                {review.date}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-11">
          <a
            href="https://g.page/rapidlaundromat/review"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-[5px] border-2 border-white/30 px-8 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/8"
          >
            ⭐ Write a Google Review &nbsp; ↗
          </a>
        </div>
      </div>
    </section>
  );
}