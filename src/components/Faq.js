"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What are your turnaround times?",
    a: "Standard laundry is typically ready within 24–48 hours. Our Express 1-Hour service gets your clothes back the same day. Commercial clients receive agreed turnaround times as part of their service contract.",
  },
  {
    q: "How do you handle delicate garments like bridal gowns and sarees?",
    a: "Delicate garments receive specialist treatment — assessed individually, cleaned using the appropriate solvent or gentle wet process, and handled by our trained specialists throughout. Bridal gowns are bagged and preserved to museum-quality standards upon request.",
  },
  {
    q: "Do you offer commercial laundry for hotels and restaurants?",
    a: "Yes — this is one of our core specialities. We work with hotels, villas, restaurants, hospitals, spas and corporate offices across Kurunegala and Kandy. We offer scheduled collections, bulk processing, quality checks and emergency turnaround. Use our commercial inquiry form to request a custom proposal.",
  },
  {
    q: "Can you pick up and deliver to my home or business?",
    a: "Absolutely. We offer door-to-door pickup and delivery across Kurunegala, Kandy and surrounding areas. Simply book via WhatsApp, call us on 070 317 1717, or use our online booking form above and we'll arrange a convenient time.",
  },
  {
    q: "Are your detergents safe for sensitive skin and children's clothing?",
    a: "Yes. We use biodegradable, phosphate-free detergents that are gentle on all skin types — safe for babies, children and anyone with allergies or sensitive skin. Our sanitization process also removes bacteria and allergens effectively.",
  },
  {
    q: "Do you clean shoes, bags and leather goods?",
    a: "Yes — we offer specialist shoe and luxury bag care including deep cleaning, conditioning and restoration for leather, suede, canvas and designer items. Results are outstanding. Drop in to either branch or book a pickup for assessment.",
  },
  {
    q: "What areas do you currently serve?",
    a: "We currently operate from two branches: Kurunegala (North Western Province) and Kandy (Central Province), with pickup and delivery covering surrounding areas. We are expanding to Colombo, Negombo, Galle and more locations across Sri Lanka — watch this space.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="bg-white px-[5%] py-[22.5">
      <div className="mx-auto max-w-275 text-center">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          Common Questions
        </p>
        <h2 className="mx-auto mb-2 font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Frequently Asked
          <br />
          Questions
        </h2>

        <div className="mx-auto mt-10 flex max-w-180 flex-col gap-[.8rem] text-left">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-[10px] border-[1.5px] transition-colors duration-200 ${
                  isOpen
                    ? "border-[rgba(0,96,208,.3)]"
                    : "border-[rgba(0,64,160,.12)]"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className={`flex w-full items-center justify-between gap-4 px-6 py-[1.2rem] text-left text-[.97rem] font-bold text-navy transition-colors duration-200 ${
                    isOpen ? "bg-foam" : "bg-transparent"
                  }`}
                >
                  {item.q}
                  <span
                    className={`shrink-0 text-[1.2rem] font-normal text-bright transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`text-[.9rem] leading-[1.75] text-muted ${
                        isOpen ? "px-6 pb-[1.2rem]" : "px-6 pb-0"
                      }`}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}