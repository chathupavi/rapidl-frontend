"use client";

import { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from "lucide-react";

import HeroPreview from "./previews/HeroPreview";
import StatsStripPreview from "./previews/StatsStripPreview";
import ValuesBannerPreview from "./previews/ValuesBannerPreview";
import TrustPreview from "./previews/TrustPreview";
import ServicesPreview from "./previews/ServicesPreview";

export default function LivePreview({ schema, data }) {
  const [device, setDevice] = useState("desktop");

  const widths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px",
  };

  const renderPreview = () => {
    switch (schema.key) {
      case "hero":
        return <HeroPreview data={data} />;
      case "stats-strip":
        return <StatsStripPreview data={data} />;
      case "values-banner":
        return <ValuesBannerPreview data={data} />;
      case "trust":
        return <TrustPreview data={data} />;
      case "services":
        return <ServicesPreview data={data} />;
      default:
        return (
          <div className="flex min-h-125 items-center justify-center p-10 text-center">
            <div>
              <p className="text-lg font-black text-gray-700">
                Preview Not Available
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Live preview for {schema.label} is coming soon.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

      {/* Preview Header */}

      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

        <div>
          <p className="text-xs font-black uppercase tracking-[2px] text-gray-400">
            Live Preview
          </p>

          <p className="mt-1 text-sm font-bold text-[#07111f]">
            {schema.label}
          </p>
        </div>


        {/* Device Controls */}

        <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">

          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`rounded-lg p-2 transition ${
              device === "desktop"
                ? "bg-white text-cyan-600 shadow-sm"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <Monitor size={16} />
          </button>

          <button
            type="button"
            onClick={() => setDevice("tablet")}
            className={`rounded-lg p-2 transition ${
              device === "tablet"
                ? "bg-white text-cyan-600 shadow-sm"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <Tablet size={16} />
          </button>

          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`rounded-lg p-2 transition ${
              device === "mobile"
                ? "bg-white text-cyan-600 shadow-sm"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <Smartphone size={16} />
          </button>

        </div>

      </div>


      {/* Draft Indicator */}

      <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50 px-5 py-2">

        <div className="flex items-center gap-2 text-xs font-bold text-amber-700">

          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />

          Live Draft Preview

        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
          Unsaved
        </span>

      </div>


      {/* Preview Canvas */}

      <div className="flex-1 overflow-auto bg-gray-100 p-4">

        <div
          className="mx-auto min-h-full overflow-hidden bg-white shadow-lg transition-all duration-500"
          style={{
            width: widths[device],
            maxWidth: "100%",
          }}
        >

          {renderPreview()}

        </div>

      </div>

    </div>
  );
}