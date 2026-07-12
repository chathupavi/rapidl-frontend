"use client";

export default function DashboardGreeting() {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Welcome back";

  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="text-[.8rem] font-semibold uppercase tracking-[2px] text-[rgba(180,210,255,.6)]">
        {dateStr}
      </div>

      <h1 className="mt-1 font-barlowCond text-[2.2rem] font-extrabold uppercase leading-none tracking-[.5px] text-white">
        {greeting}, Admin
      </h1>
    </div>
  );
}