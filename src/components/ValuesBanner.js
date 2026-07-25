"use client";

import { Fragment } from "react";

export default function ValuesBanner({ data = {} }) {
  const {
    items = [],
  } = data;

  // Don't render if there are no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 bg-linear-to-r from-accent to-bright px-[5%] py-[.9rem]">
      {items.map((item, index) => (
        <Fragment
          key={item._id || `${item.text}-${index}`}
        >
          <span className="text-[.8rem] font-bold uppercase tracking-[.8px] text-white">
            {item.icon && `${item.icon} `}
            {item.text}
          </span>

          {index < items.length - 1 && (
            <span className="h-1 w-1 rounded-full bg-white/40" />
          )}
        </Fragment>
      ))}
    </div>
  );
}