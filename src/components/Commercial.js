"use client";

import { useState } from "react";

const businesses = [
  { icon: "🏨", title: "Hotels & Villas", desc: "Bed sheets, towels, pillow cases and all hotel linen — handled with speed, hygiene and consistency." },
  { icon: "🍽️", title: "Restaurants", desc: "Table cloths, napkins, waiter uniforms and kitchen textiles cleaned to hospitality standards." },
  { icon: "🏥", title: "Hospitals & Clinics", desc: "Hygienic, sanitized processing for medical linen, scrubs and patient bedding with full traceability." },
  { icon: "💆", title: "Spas & Salons", desc: "Fluffy, hygienically clean towels and robes for spas, salons and wellness centres." },
  { icon: "👷", title: "Corporate Uniforms", desc: "Corporate uniforms, school uniforms and workwear cleaned, pressed and returned on schedule." },
  { icon: "🏭", title: "Bulk Industrial Washing", desc: "Large-volume washing for any business or institution using our industrial-capacity machines." },
];

const features = [
  { icon: "📅", title: "Scheduled Collections", desc: "Regular pickup & delivery on your timetable" },
  { icon: "✅", title: "Quality Assurance", desc: "Every batch inspected before delivery" },
  { icon: "⚡", title: "Emergency Support", desc: "Priority turnaround when your business needs it most" },
  { icon: "💼", title: "Dedicated Account", desc: "Your own account manager & billing cycle" },
];

const initialForm = {
  name: "",
  contact: "",
  phone: "",
  email: "",
  type: "",
  volume: "",
  msg: "",
};

export default function Commercial() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const biz = form.name || "Not provided";
    const contact = form.contact || "Not provided";
    const phone = form.phone || "Not provided";
    const type = form.type || "Not specified";
    const volume = form.volume || "Not specified";
    const msgText = form.msg || "None";

    const message = encodeURIComponent(
      `Hello! I'd like to request a Commercial Laundry Proposal.\n\n` +
        `Business: ${biz}\nContact: ${contact}\nPhone: ${phone}\n` +
        `Business Type: ${type}\nWeekly Volume: ${volume}\nRequirements: ${msgText}`
    );

    window.open(`https://wa.me/94703171717?text=${message}`, "_blank");
  };

  const inputClasses =
    "rounded-md border-[1.5px] border-[rgba(0,64,160,.2)] bg-white px-4 py-3 text-[.92rem] text-navy outline-none transition-colors duration-200 focus:border-bright";

  return (
    <section id="commercial" className="bg-white px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-bright">
          B2B Solutions
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-navy">
          Commercial Laundry
          <br />
          Solutions for Businesses
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-muted">
          Hotels, villas, restaurants, hospitals, salons, spas and corporate
          offices trust Rapid Laundromat for their bulk linen and uniform
          needs. Scheduled collections, bulk processing, and emergency
          support — all covered.
        </p>

        {/* Business type grid */}
        <div className="mt-10 grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((biz) => (
            <div
              key={biz.title}
              className="rounded-[10px] border border-[rgba(0,64,160,.1)] border-l-[3px] border-l-bright bg-foam p-6 transition-all duration-200 hover:translate-x-1 hover:bg-[rgba(0,64,160,.06)]"
            >
              <div className="mb-[.6rem] text-[1.8rem]">{biz.icon}</div>
              <h4 className="mb-[.3rem] font-barlowCond text-[1.1rem] font-bold uppercase tracking-[.5px] text-navy">
                {biz.title}
              </h4>
              <p className="text-[.83rem] leading-[1.6] text-muted">
                {biz.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Key features */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[14px] border border-[rgba(0,64,160,.08)] bg-white px-6 py-[1.2rem] text-left shadow-[0_4px_22px_rgba(0,64,160,.08)]"
            >
              <div className="mb-[.4rem] text-[1.5rem]">{feature.icon}</div>
              <div className="mb-[.2rem] text-[.9rem] font-bold text-navy">
                {feature.title}
              </div>
              <div className="text-[.82rem] text-muted">{feature.desc}</div>
            </div>
          ))}
        </div>

        {/* Commercial inquiry form */}
        <div className="mt-12 rounded-2xl border border-[rgba(0,64,160,.1)] bg-foam p-10">
          <h3 className="mb-2 font-barlowCond text-[1.8rem] font-extrabold uppercase tracking-[1px] text-navy">
            Request a Commercial Proposal
          </h3>
          <p className="mb-7 text-[.9rem] text-muted">
            Fill in your details and our team will prepare a custom
            commercial proposal within 24 hours.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">
                Business Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your company name"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">
                Contact Person
              </label>
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">
                Mobile / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="07X XXX XXXX"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="yourname@company.com"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">
                Business Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select type...</option>
                <option>Hotel / Villa</option>
                <option>Restaurant</option>
                <option>Hospital / Clinic</option>
                <option>Spa / Salon</option>
                <option>Corporate Office</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">
                Estimated Weekly Volume
              </label>
              <select
                name="volume"
                value={form.volume}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select volume...</option>
                <option>Under 50kg</option>
                <option>50 – 150kg</option>
                <option>150 – 500kg</option>
                <option>500kg+</option>
              </select>
            </div>

            <div className="flex flex-col gap-[.4rem] md:col-span-2">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-navy">
                Special Requirements
              </label>
              <textarea
                name="msg"
                value={form.msg}
                onChange={handleChange}
                placeholder="Tell us about your specific laundry needs, preferred collection schedule, or any questions..."
                className={`${inputClasses} min-h-25 resize-y`}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-5 rounded-[5px] bg-linear-to-br from-bright to-light px-10 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,96,208,.4)]"
          >
            📤 Send Commercial Enquiry
          </button>
        </div>
      </div>
    </section>
  );
}