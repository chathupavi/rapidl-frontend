"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

export default function ValuesBannerPreview({
  data = {},
}) {
  const {
    items = [],
  } = data;

  if (!items || items.length === 0) {
    return (
      <div className="relative flex min-h-20 items-center justify-center overflow-hidden rounded-3xl bg-linear-to-r from-accent to-bright">
        <div className="text-sm text-white/60">
          Add values to preview your Values Banner.
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 backdrop-blur-md">
          Live Preview
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-accent to-bright">
      <div className="flex flex-wrap items-center justify-center gap-10 px-[5%] py-[.9rem]">
        {items.map((item, index) => (
          <Fragment
            key={item._id || `${item.text}-${index}`}
          >
            <motion.span
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              className="text-[.8rem] font-bold uppercase tracking-[.8px] text-white"
            >
              {item.icon && `${item.icon} `}
              {item.text}
            </motion.span>

            {index < items.length - 1 && (
              <span className="h-1 w-1 rounded-full bg-white/40" />
            )}
          </Fragment>
        ))}
      </div>

      <div className="absolute left-4 top-3 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-white/60 backdrop-blur-md">
        Live Preview
      </div>
    </div>
  );
}