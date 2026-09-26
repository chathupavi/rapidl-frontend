"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

import {
  motion,
} from "framer-motion";


/* =========================================================
   PAGE SHELL
========================================================= */

export function SeoPageShell({
  children,
}) {
  return (
    <div
      className="
        min-h-screen
        bg-[#f5f7fb]
      "
    >
      {children}
    </div>
  );
}


/* =========================================================
   HEADER
========================================================= */

export function SeoHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  actions,
  lastUpdated,
}) {
  return (
    <div
      className="
        border-b
        border-slate-200/80
        bg-white
      "
    >
      <div
        className="
          px-6
          py-6
          lg:px-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-5
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >
          <div>

            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#00195f]
                  text-white
                "
              >
                {Icon && (
                  <Icon size={15} />
                )}
              </div>

              <span
                className="
                  text-[11px]
                  font-black
                  uppercase
                  tracking-[2px]
                  text-[#0060d0]
                "
              >
                {eyebrow}
              </span>
            </div>


            <h1
              className="
                text-2xl
                font-black
                tracking-tight
                text-[#071b3d]
                sm:text-3xl
              "
            >
              {title}
            </h1>


            <p
              className="
                mt-1
                max-w-2xl
                text-sm
                leading-6
                text-slate-500
              "
            >
              {description}
            </p>

          </div>


          {actions && (
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              {actions}
            </div>
          )}

        </div>


        {lastUpdated && (
          <div
            className="
              mt-5
              flex
              items-center
              border-t
              border-slate-100
              pt-4
              text-[10px]
              font-semibold
              text-slate-400
            "
          >
            Last updated{" "}
            {lastUpdated.toLocaleTimeString(
              [],
              {
                hour:
                  "2-digit",

                minute:
                  "2-digit",
              }
            )}
          </div>
        )}

      </div>
    </div>
  );
}


/* =========================================================
   MAIN
========================================================= */

export function SeoMain({
  children,
}) {
  return (
    <main
      className="
        space-y-6
        px-6
        py-6
        lg:px-8
      "
    >
      {children}
    </main>
  );
}


/* =========================================================
   CARD
========================================================= */

export function SeoCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-[24px]
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-[0_10px_35px_rgba(15,23,42,.035)]
        sm:p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}


/* =========================================================
   CARD HEADER
========================================================= */

export function SeoCardHeader({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-4
      "
    >
      <div>

        <div
          className="
            text-[9px]
            font-black
            uppercase
            tracking-[1.8px]
            text-[#0060d0]
          "
        >
          {eyebrow}
        </div>


        <h3
          className="
            mt-1
            text-base
            font-black
            text-[#071b3d]
          "
        >
          {title}
        </h3>


        <p
          className="
            mt-1
            text-[11px]
            leading-5
            text-slate-400
          "
        >
          {description}
        </p>

      </div>


      {action}

    </div>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

export function SeoSectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>

      <div
        className="
          text-[10px]
          font-black
          uppercase
          tracking-[2px]
          text-[#0060d0]
        "
      >
        {eyebrow}
      </div>


      <h2
        className="
          mt-1
          text-lg
          font-black
          tracking-tight
          text-[#071b3d]
        "
      >
        {title}
      </h2>


      <p
        className="
          mt-1
          text-xs
          leading-5
          text-slate-400
        "
      >
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   KPI CARD
========================================================= */

export function SeoMetricCard({
  label,
  value,
  description,
  icon: Icon,
  change,
  index = 0,
}) {
  const hasChange =
    typeof change ===
    "number";


  const positive =
    Number(
      change ||
      0
    ) >= 0;


  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          index *
          0.04,
      }}
      className="
        rounded-[22px]
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(15,23,42,.035)]
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-[#0060d0]
          "
        >
          <Icon size={17} />
        </div>


        {hasChange && (
          <div
            className={`
              flex
              items-center
              gap-1
              rounded-lg
              px-2
              py-1
              text-[9px]
              font-black
              ${
                positive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-600"
              }
            `}
          >
            {positive ? (
              <ArrowUpRight
                size={10}
              />
            ) : (
              <ArrowDownRight
                size={10}
              />
            )}

            {positive
              ? "+"
              : ""}

            {Number(
              change ||
              0
            ).toFixed(1)}
            %
          </div>
        )}

      </div>


      <div
        className="
          mt-6
          text-2xl
          font-black
          tracking-tight
          text-[#071b3d]
        "
      >
        {value}
      </div>


      <div
        className="
          mt-1
          text-[11px]
          font-black
          text-slate-700
        "
      >
        {label}
      </div>


      <div
        className="
          mt-1
          text-[10px]
          text-slate-400
        "
      >
        {description}
      </div>

    </motion.div>
  );
}


/* =========================================================
   HEALTH BADGE
========================================================= */

export function HealthBadge({
  health,
}) {
  const classes = {
    excellent:
      "bg-emerald-50 text-emerald-600",

    good:
      "bg-blue-50 text-blue-600",

    warning:
      "bg-amber-50 text-amber-600",

    critical:
      "bg-rose-50 text-rose-600",
  };


  return (
    <span
      className={`
        inline-flex
        rounded-lg
        px-2
        py-1
        text-[8px]
        font-black
        uppercase
        tracking-[.7px]
        ${
          classes[
            health
          ] ||
          classes.warning
        }
      `}
    >
      {health}
    </span>
  );
}


/* =========================================================
   STATUS ITEM
========================================================= */

export function SeoCheckItem({
  label,
  ok,
}) {
  const Icon =
    ok
      ? CheckCircle2
      : AlertTriangle;


  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-slate-100
        bg-slate-50/50
        px-4
        py-3
      "
    >

      <span
        className="
          text-[10px]
          font-bold
          text-slate-600
        "
      >
        {label}
      </span>


      <Icon
        size={14}
        className={
          ok
            ? "text-emerald-500"
            : "text-amber-500"
        }
      />

    </div>
  );
}


/* =========================================================
   BUTTONS
========================================================= */

export function RefreshButton({
  onClick,
  refreshing,
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      disabled={
        refreshing
      }
      className="
        flex
        h-10
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-4
        text-xs
        font-bold
        text-slate-600
        shadow-sm
        transition
        hover:text-[#00195f]
        disabled:opacity-50
      "
    >
      <RefreshCw
        size={14}
        className={
          refreshing
            ? "animate-spin"
            : ""
        }
      />

      Refresh
    </button>
  );
}


/* =========================================================
   EMPTY
========================================================= */

export function SeoEmptyState({
  title,
  description,
}) {
  return (
    <div
      className="
        mt-6
        flex
        min-h-[160px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-200
        bg-slate-50/40
        px-5
        text-center
      "
    >

      <AlertTriangle
        size={24}
        className="
          text-slate-300
        "
      />


      <div
        className="
          mt-3
          text-sm
          font-black
          text-slate-600
        "
      >
        {title}
      </div>


      <p
        className="
          mt-1
          max-w-xs
          text-[11px]
          leading-5
          text-slate-400
        "
      >
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   INPUTS
========================================================= */

export const inputClass = `
  h-11
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-3.5
  text-xs
  font-semibold
  text-slate-700
  outline-none
  transition
  placeholder:text-slate-300
  focus:border-[#0060d0]
  focus:ring-2
  focus:ring-blue-50
`;


export const textareaClass = `
  min-h-[110px]
  w-full
  resize-y
  rounded-xl
  border
  border-slate-200
  bg-white
  px-3.5
  py-3
  text-xs
  leading-6
  text-slate-700
  outline-none
  transition
  placeholder:text-slate-300
  focus:border-[#0060d0]
  focus:ring-2
  focus:ring-blue-50
`;