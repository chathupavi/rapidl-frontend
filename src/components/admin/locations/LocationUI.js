"use client";

import {
  X,
} from "lucide-react";


export function LocationPage({
  eyebrow,
  title,
  description,
  action,
  children,
}) {
  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="text-[9px] font-black uppercase tracking-[1.8px] text-[#0060d0]">
            {eyebrow}
          </div>

          <h1 className="mt-1 text-2xl font-black text-[#071b3d]">
            {title}
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-400">
            {description}
          </p>

        </div>

        {action}

      </div>


      {children}

    </div>
  );
}


export function LocationMetric({
  label,
  value,
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]">

      <div className="text-[8px] font-black uppercase tracking-[1.4px] text-slate-400">
        {label}
      </div>

      <div className="mt-2 text-2xl font-black text-[#071b3d]">
        {value}
      </div>

    </div>
  );
}


export function Modal({
  title,
  subtitle,
  close,
  children,
  maxWidth =
    "max-w-4xl",
}) {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">

      <button
        type="button"
        aria-label="Close"

        onClick={
          close
        }

        className="absolute inset-0 bg-[#071b3d]/40 backdrop-blur-[2px]"
      />


      <div
        className={`relative z-10 max-h-[92vh] w-full ${maxWidth} overflow-y-auto rounded-[28px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,.3)]`}
      >

        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">

          <div>

            <div className="text-[9px] font-black uppercase tracking-[1.5px] text-[#0060d0]">
              Locations
            </div>

            <h2 className="mt-1 text-lg font-black text-[#071b3d]">
              {title}
            </h2>

            {subtitle && (

              <p className="mt-1 text-[10px] text-slate-400">
                {subtitle}
              </p>

            )}

          </div>


          <button
            type="button"

            onClick={
              close
            }

            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
          >

            <X
              size={15}
            />

          </button>

        </div>


        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}


export function Field({
  label,
  required,
  children,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-[9px] font-black uppercase tracking-[1px] text-slate-500">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </span>

      {children}

    </label>
  );
}


export const inputClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-700 outline-none transition focus:border-[#168cff] focus:bg-white";


export const textareaClass =
  "w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold leading-6 text-slate-700 outline-none transition focus:border-[#168cff] focus:bg-white";