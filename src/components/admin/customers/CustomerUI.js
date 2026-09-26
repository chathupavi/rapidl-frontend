"use client";

import {
  RefreshCw,
  Search,
} from "lucide-react";


export function AdminCustomerPage({
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#f6f8fc]">

      <header className="border-b border-slate-200 bg-white">

        <div className="px-6 py-6 lg:px-8">

          <div className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
            {eyebrow}
          </div>

          <h1 className="mt-2 text-3xl font-black text-[#071b3d]">
            {title}
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            {description}
          </p>

        </div>

      </header>


      <main className="space-y-6 px-6 py-6 lg:px-8">
        {children}
      </main>

    </div>
  );
}


export function Metric({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0060d0]">

        <Icon
          size={17}
        />

      </div>

      <div className="mt-5 text-2xl font-black text-[#071b3d]">
        {value}
      </div>

      <div className="mt-1 text-[11px] font-black text-slate-600">
        {label}
      </div>

    </div>
  );
}


export function Panel({
  children,
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.035)] sm:p-6">
      {children}
    </section>
  );
}


export function Toolbar({
  search,
  setSearch,
  reload,
}) {
  return (
    <div className="flex gap-3">

      <div className="relative flex-1">

        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={
            search
          }
          onChange={(
            event
          ) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Search..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none"
        />

      </div>

      <button
        onClick={
          reload
        }
        className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-black text-slate-500"
      >

        <RefreshCw
          size={13}
        />

        Refresh

      </button>

    </div>
  );
}


export function Detail({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">

      <Icon
        size={14}
        className="text-[#0060d0]"
      />

      <div>

        <div className="text-[8px] font-black uppercase text-slate-400">
          {label}
        </div>

        <div className="mt-0.5 text-xs font-bold text-slate-700">
          {value || "—"}
        </div>

      </div>

    </div>
  );
}


export function Loading() {
  return (
    <div className="mt-5 h-64 animate-pulse rounded-2xl bg-slate-50" />
  );
}