"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers3,
  Inbox,
} from "lucide-react";
import renderField from "./renderField";

function createEmptyItem(subFields) {
  const item = {};
  subFields.forEach((f) => {
    item[f.name] = "";
  });
  return item;
}

export default function RepeaterField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];

  const updateItem = (index, key, newVal) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [key]: newVal } : item
    );
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, createEmptyItem(field.fields)]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Layers3 size={15} />
          </div>
          <label className="text-xs font-black uppercase tracking-[2px] text-gray-500">
            {field.label}
          </label>
        </div>
        <div className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-600">
          {items.length}
        </div>
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/70 px-6 py-10"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg text-gray-400">
            <Inbox size={28} />
          </div>
          <p className="text-sm font-bold text-gray-500">
            No {(field.itemLabel || "items").toLowerCase()} yet
          </p>
        </motion.div>
      )}

      {/* Items List */}
      <div className="flex flex-col gap-5">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-500/5"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-black text-white shadow-lg shadow-cyan-500/20">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-gray-700">
                      {field.itemLabel || "Item"}
                    </p>
                    <p className="text-[11px] text-gray-400">Content block</p>
                  </div>
                </div>

                {/* Item Controls */}
                <div className="flex gap-1 opacity-0 transition duration-300 group-hover:opacity-100">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveItem(index, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white hover:text-cyan-600 disabled:opacity-30"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={() => moveItem(index, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white hover:text-cyan-600 disabled:opacity-30"
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Sub-Fields */}
              <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                {field.fields.map((subField) => (
                  <div key={subField.name} className="first:md:col-span-2">
                    {renderField(subField, item[subField.name], (newVal) =>
                      updateItem(index, subField.name, newVal)
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Button */}
      <button
        type="button"
        onClick={addItem}
        className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-cyan-300 py-4 text-sm font-black uppercase tracking-wide text-cyan-600 transition-all hover:bg-cyan-50 hover:shadow-lg hover:shadow-cyan-500/10"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white transition group-hover:scale-110">
          <Plus size={18} />
        </div>
        Add {field.itemLabel || "Item"}
      </button>
    </div>
  );
}