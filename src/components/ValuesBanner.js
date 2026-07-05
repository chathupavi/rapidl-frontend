import { Fragment } from "react";

const values = [
  "🌿 Eco-Friendly",
  "✨ Lean & Clean",
  "⚙️ Process Oriented",
  "🎯 Specialist Experts",
  "🤝 Human Focused",
];

export default function ValuesBanner() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 bg-linear-to-r from-accent to-bright px-[5%] py-[.9rem]">
      {values.map((item, i) => (
        <Fragment key={item}>
          <span className="text-[.8rem] font-bold uppercase tracking-[.8px] text-white">
            {item}
          </span>
          {i < values.length - 1 && (
            <span className="h-1 w-1 rounded-full bg-white/40" />
          )}
        </Fragment>
      ))}
    </div>
  );
}