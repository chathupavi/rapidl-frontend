"use client";

import { useState } from "react";

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  location: "",
  service: "",
  datetime: "",
  notes: "",
};

export default function Booking() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildFields = () => ({
    name: form.name || "Not provided",
    mobile: form.mobile || "Not provided",
    email: form.email || "Not provided",
    location: form.location || "Not provided",
    service: form.service || "Not specified",
    datetime: form.datetime || "Flexible",
    notes: form.notes || "None",
  });

  const handleWhatsApp = () => {
    const f = buildFields();
    const message = encodeURIComponent(
      `Hello Rapid Laundromat! I would like to book a pickup.\n\n` +
        `Name: ${f.name}\nMobile: ${f.mobile}\nEmail: ${f.email}\n` +
        `Location: ${f.location}\nService: ${f.service}\n` +
        `Preferred Date/Time: ${f.datetime}\nNotes: ${f.notes}`
    );
    window.open(`https://wa.me/94703171717?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    const f = buildFields();
    const subject = encodeURIComponent("Pickup Booking – " + f.name);
    const body = encodeURIComponent(
      `Pickup Booking Request\n\nName: ${f.name}\nMobile: ${f.mobile}\nEmail: ${f.email}\n` +
        `Location: ${f.location}\nService: ${f.service}\nPreferred Date/Time: ${f.datetime}\nNotes: ${f.notes}`
    );
    window.location.href = `mailto:info@rapidlaundromat.lk?subject=${subject}&body=${body}`;
  };

  const inputClasses =
    "rounded-md border-[1.5px] border-[rgba(0,96,208,.3)] bg-white/[.06] px-4 py-3 text-[.92rem] text-white outline-none transition-colors duration-200 placeholder:text-[rgba(180,210,255,.35)] focus:border-[rgba(0,144,255,.6)]";

  return (
    <section id="booking" className="bg-navy px-[5%] py-22.5">
      <div className="mx-auto max-w-275">
        <p className="mb-[.6rem] text-[.7rem] font-extrabold uppercase tracking-[4px] text-light">
          Easy Online Booking
        </p>
        <h2 className="mb-[.9rem] font-barlowCond text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[1px] text-white">
          Book Your Pickup
          <br />
          In Minutes
        </h2>
        <p className="max-w-140 text-[.97rem] leading-[1.85] text-[rgba(180,210,255,.55)]">
          Schedule a door-to-door pickup. We collect your laundry, clean it
          to perfection, and deliver it back fresh.
        </p>

        <div className="mx-auto mt-10 max-w-175 rounded-2xl border border-[rgba(0,96,208,.25)] bg-white/4 p-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.7)]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.7)]">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="07X XXX XXXX"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.7)]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.7)]">
                Pickup Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Address / Area"
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.7)]">
                Service Required
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={inputClasses}
              >
                <option className="bg-navy" value="">
                  Select service...
                </option>
                <option className="bg-navy">Wash & Fold</option>
                <option className="bg-navy">Dry Cleaning</option>
                <option className="bg-navy">Ironing & Pressing</option>
                <option className="bg-navy">Bridal Gown Care</option>
                <option className="bg-navy">Express Laundry (1hr)</option>
                <option className="bg-navy">Shoe / Bag Care</option>
                <option className="bg-navy">Carpet / Sofa Cleaning</option>
                <option className="bg-navy">Commercial Linen</option>
                <option className="bg-navy">Multiple Services</option>
              </select>
            </div>

            <div className="flex flex-col gap-[.4rem]">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.7)]">
                Preferred Pickup Date & Time
              </label>
              <input
                type="datetime-local"
                name="datetime"
                value={form.datetime}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="flex flex-col gap-[.4rem] md:col-span-2">
              <label className="text-[.78rem] font-bold uppercase tracking-[.5px] text-[rgba(180,210,255,.7)]">
                Special Instructions
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any special care instructions, delicate items, stains to treat, access details..."
                className={`${inputClasses} min-h-25 resize-y`}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-4">
            <button
              onClick={handleWhatsApp}
              className="rounded-[5px] bg-[#25d366] px-10 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,.4)]"
            >
              💬 Book via WhatsApp
            </button>
            <button
              onClick={handleEmail}
              className="rounded-[5px] bg-linear-to-br from-bright to-light px-10 py-[.9rem] text-[.97rem] font-bold uppercase tracking-[.3px] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,96,208,.4)]"
            >
              📧 Book via Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}