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
  Eye,
  X,
  LayoutDashboard,
} from "lucide-react";

import renderField from "./fields/renderField";
import RepeaterField from "./fields/RepeaterField";
import LivePreview from "./LivePreview";

export default function SectionForm({ schema, initialData }) {
  const [data, setData] = useState(initialData || {});
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const updateField = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDirty(true);
    setSavedMessage("");
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sections/${schema.key}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Save failed");
      }

      setDirty(false);
      setSavedMessage("Changes saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      setSavedMessage("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setData(initialData || {});
    setDirty(false);
    setSavedMessage("");
  };

  return (
    <div className="flex flex-col gap-8 pb-36">
      
      {/* Main Editor + Preview */}
      <div
        className={`grid gap-6 transition-all duration-500 ${
          previewOpen
            ? "grid-cols-1 xl:grid-cols-[minmax(0,1fr)_520px]"
            : "grid-cols-1"
        }`}
      >

        {/* ============================= */}
        {/* LEFT - CONTENT EDITOR */}
        {/* ============================= */}

        <motion.div
          layout
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
        >

          {/* Header */}
          <div className="mb-8 flex items-center justify-between border-b pb-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Sparkles size={20} />
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-[#07111f]">
                  {schema.label}
                </h2>

                <p className="text-sm text-gray-500">
                  Manage section content
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex items-center gap-2 rounded-xl bg-cyan-50 px-4 py-2 text-xs font-bold uppercase text-cyan-700">
                <LayoutDashboard size={14} />
                CMS
              </div>

              <button
                type="button"
                onClick={() => setPreviewOpen(!previewOpen)}
                className="flex items-center gap-2 rounded-xl bg-[#07111f] px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-600"
              >
                {previewOpen ? (
                  <>
                    <X size={17} />
                    Close Preview
                  </>
                ) : (
                  <>
                    <Eye size={17} />
                    Preview
                  </>
                )}
              </button>

            </div>

          </div>


          {/* ============================= */}
          {/* GROUPS */}
          {/* ============================= */}

          <div className="flex flex-col gap-8">

            {schema.groups?.map((group) => (

              <div
                key={group.id}
                className="rounded-3xl border border-gray-200 bg-gray-50/50 p-6"
              >

                {/* Group Header */}
                <div className="mb-6 border-b border-gray-200 pb-5">

                  <h3 className="text-lg font-black text-[#07111f]">
                    {group.title}
                  </h3>

                  {group.description && (
                    <p className="mt-1 text-sm text-gray-500">
                      {group.description}
                    </p>
                  )}

                </div>


                {/* Fields */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                  {group.fields?.map((field) => {

                    // Repeater
                    if (field.type === "repeater") {

                      return (
                        <div
                          key={field.name}
                          className="col-span-1 rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2"
                        >

                          <RepeaterField
                            field={field}
                            value={data[field.name]}
                            onChange={(value) =>
                              updateField(field.name, value)
                            }
                          />

                        </div>
                      );
                    }


                    // Standard Field
                    return (
                      <div
                        key={field.name}
                        className="rounded-2xl border border-gray-100 bg-white p-5 transition hover:border-cyan-200 hover:shadow-md"
                      >

                        {renderField(
                          field,
                          data[field.name],
                          (value) =>
                            updateField(field.name, value)
                        )}

                      </div>
                    );

                  })}

                </div>

              </div>

            ))}

          </div>

        </motion.div>


        {/* ============================= */}
        {/* RIGHT - LIVE PREVIEW */}
        {/* ============================= */}

        <AnimatePresence>

          {previewOpen && (

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 40,
              }}
              transition={{
                duration: 0.35,
              }}
              className="xl:sticky xl:top-6 xl:h-[calc(100vh-48px)]"
            >

              <LivePreview
                schema={schema}
                data={data}
              />

            </motion.div>

          )}

        </AnimatePresence>

      </div>


      {/* ============================= */}
      {/* BOTTOM ACTION BAR */}
      {/* ============================= */}

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-76 right-8 z-40 rounded-2xl border bg-white/90 px-6 py-4 shadow-2xl backdrop-blur-xl"
      >

        <div className="flex items-center justify-between">

          {/* Status */}

          <AnimatePresence mode="wait">

            {savedMessage ? (

              <motion.div
                key="saved"
                className="flex items-center gap-2 font-semibold text-emerald-600"
              >
                <CheckCircle2 size={18} />
                {savedMessage}
              </motion.div>

            ) : dirty ? (

              <motion.div
                key="dirty"
                className="flex items-center gap-2 font-semibold text-amber-600"
              >
                <AlertCircle size={18} />
                Unsaved changes
              </motion.div>

            ) : (

              <motion.div
                key="clean"
                className="font-medium text-gray-400"
              >
                No changes
              </motion.div>

            )}

          </AnimatePresence>


          {/* Buttons */}

          <div className="flex gap-3">

            <button
              onClick={() => setPreviewOpen(!previewOpen)}
              className="flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-bold text-cyan-700 hover:bg-cyan-100"
            >
              <Eye size={17} />
              {previewOpen ? "Hide Preview" : "Preview"}
            </button>


            <button
              onClick={handleDiscard}
              disabled={!dirty}
              className="flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold text-gray-500 disabled:opacity-40"
            >
              <RotateCcw size={17} />
              Discard
            </button>


            <button
              onClick={handleSave}
              disabled={saving || !dirty}
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-black text-white shadow-lg disabled:opacity-40"
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