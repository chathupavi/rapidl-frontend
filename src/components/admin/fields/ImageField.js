"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, UploadCloud, Replace, Trash2, Sparkles } from "lucide-react";

export default function ImageField({ field, value, onChange }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const applyFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);
  };

  const handleFileChange = (e) => {
    applyFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    applyFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <div className="flex items-center gap-2">
        <Sparkles size={14} className="text-cyan-500" />
        <label className="text-xs font-black uppercase tracking-[2px] text-gray-500">
          {field.label}
        </label>
      </div>

      <AnimatePresence mode="wait">
        {value ? (
          /* Preview State */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative w-fit overflow-hidden rounded-3xl border border-white/20 bg-white p-2 shadow-xl"
          >
            <div className="relative h-44 w-44 overflow-hidden rounded-2xl">
              <Image
                src={value}
                alt="Preview"
                fill
                sizes="176px"
                unoptimized // Keep true for local blob URLs, remove for production remote URLs
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-800 transition hover:scale-105"
                >
                  <Replace size={14} /> Replace
                </button>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:scale-105"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Upload State */
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`relative flex h-64 w-full max-w-md cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-500 ${
              dragActive
                ? "border-cyan-400 bg-cyan-50 shadow-[0_0_40px_rgba(0,200,255,.25)]"
                : "border-gray-200 bg-white/60 hover:border-cyan-300 hover:bg-cyan-50/40"
            }`}
          >
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            <motion.div
              animate={dragActive ? { scale: 1.2, rotate: 5 } : { scale: 1 }}
              className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white shadow-xl shadow-cyan-500/30"
            >
              {dragActive ? <UploadCloud size={30} /> : <ImagePlus size={30} />}
            </motion.div>
            <p className="text-sm font-black uppercase tracking-wide text-[#07111f]">
              {dragActive ? "Drop image here" : "Upload Image"}
            </p>
            <p className="text-xs text-gray-400">Click or drag image</p>
            <div className="rounded-full bg-gray-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              PNG • JPG • WEBP • Max 5MB
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}