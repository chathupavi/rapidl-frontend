"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles,
  Loader2,
} from "lucide-react";

import renderField from "./fields/renderField";
import RepeaterField from "./fields/RepeaterField";

export default function SectionForm({ schema, initialData }) {
  const [data, setData] = useState(initialData || {});
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [dirty, setDirty] = useState(false);

  const updateField = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
    setDirty(true);
    if (savedMessage) setSavedMessage("");
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedMessage("");

    console.log("Saving section data:", data);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSaving(false);
    setDirty(false);
    setSavedMessage("All changes saved successfully");
  };

  const handleDiscard = () => {
    setData(initialData || {});
    setDirty(false);
    setSavedMessage("");
  };

  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-8 shadow-[0_20px_60px_rgba(0,60,120,.08)] backdrop-blur-xl"
      >
        {/* Decorative Glow */}
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 mb-8 flex items-center justify-between border-b border-gray-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-500" />
              <h2 className="text-xl font-black uppercase tracking-wide text-[#07111f]">
                {schema.title || "Edit Section"}
              </h2>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Manage your website content and publish updates.
            </p>
          </div>
          <div className="rounded-xl bg-cyan-50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-cyan-700">
            CMS Editor
          </div>
        </div>

        {/* Dynamic Fields */}
        <div className="relative z-10 space-y-8">
          {schema.fields.map((field) => {
            if (field.type === "repeater") {
              return (
                <RepeaterField
                  key={field.name}
                  field={field}
                  value={data[field.name]}
                  onChange={(val) => updateField(field.name, val)}
                />
              );
            }

            return (
              <div
                key={field.name}
                className="rounded-2xl border border-gray-100 bg-white p-5 transition duration-300 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5"
              >
                {renderField(field, data[field.name], (val) =>
                  updateField(field.name, val)
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Floating Save Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-76 right-8 z-40 rounded-2xl border border-white/20 bg-white/80 px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,.15)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          {/* Status Message */}
          <div className="flex items-center gap-3 text-sm font-semibold">
            <AnimatePresence mode="wait">
              {savedMessage ? (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-emerald-600"
                >
                  <CheckCircle2 size={18} />
                  {savedMessage}
                </motion.div>
              ) : dirty ? (
                <motion.div
                  key="dirty"
                  className="flex items-center gap-2 text-amber-600"
                >
                  <AlertCircle size={18} />
                  Unsaved changes
                </motion.div>
              ) : (
                <motion.div key="clean" className="text-gray-400">
                  No changes yet
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDiscard}
              disabled={!dirty}
              className="group flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold uppercase tracking-wide text-gray-500 transition-all hover:bg-gray-50 disabled:opacity-40"
            >
              <RotateCcw
                size={16}
                className="transition group-hover:-rotate-45"
              />
              Discard
            </button>

            <button
              onClick={handleSave}
              disabled={saving || !dirty}
              className="group flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-cyan-500/50 disabled:translate-y-0 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Saving
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}