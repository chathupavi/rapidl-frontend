"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, UploadCloud, Replace, Trash2, Info } from "lucide-react";

export default function ImageField({ field, value, onChange }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const applyFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    
    // Optional 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    onChange(previewUrl);
  };

  const handleFileChange = (e) => {
    applyFile(e.target.files?.[0]);
    // Allow selecting the same file again
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    applyFile(e.dataTransfer.files?.[0]);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col gap-3"
    >
      {/* Label Row */}
      <div className="flex items-center gap-1">
        <label className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-gray-600">
          {field.label}
        </label>
        {field.required && (
          <span className="text-xs font-bold text-red-500">*</span>
        )}
      </div>

      {/* Description */}
      {field.description && (
        <div className="flex items-start gap-1.5 text-xs leading-5 text-gray-400">
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>{field.description}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {value ? (
          /* Image Preview */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-2"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100">
              <Image
                src={value}
                alt={field.label || "Image preview"}
                fill
                sizes="384px"
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-gray-800 shadow-lg transition hover:scale-105"
                >
                  <Replace size={14} />
                  Replace
                </button>

                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-xs font-bold text-white shadow-lg transition hover:scale-105"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="flex items-center justify-between px-1 pt-2">
              <span className="truncate text-[11px] font-medium text-gray-400">
                Image selected
              </span>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-[11px] font-bold text-cyan-600 hover:text-cyan-700"
              >
                Change image
              </button>
            </div>
          </motion.div>
        ) : (
          /* Upload Area */
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`relative flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-cyan-400 bg-cyan-50"
                : "border-gray-200 bg-gray-50/50 hover:border-cyan-300 hover:bg-cyan-50/30"
            }`}
          >
            <motion.div
              animate={dragActive ? { scale: 1.1, y: -3 } : { scale: 1, y: 0 }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600"
            >
              {dragActive ? <UploadCloud size={24} /> : <ImagePlus size={24} />}
            </motion.div>

            <div>
              <p className="text-sm font-bold text-[#07111f]">
                {dragActive ? "Drop image here" : "Upload an image"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Click to browse or drag and drop
              </p>
            </div>

            <span className="rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-400 shadow-sm">
              PNG • JPG • WEBP • Max 5MB
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
    </motion.div>
  );
}