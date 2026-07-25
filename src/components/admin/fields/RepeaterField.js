"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, ChevronUp, ChevronDown, ChevronRight,
  Layers3, Inbox, GripVertical, // Note: GripVertical is imported but unused in this snippet
} from "lucide-react";

import renderField from "./renderField";

// --------------------------------------------------
// Create a new empty repeater item
// --------------------------------------------------
function createEmptyItem(subFields) {
  const item = {};
  subFields.forEach((field) => {
    item[field.name] = "";
  });
  return item;
}

// --------------------------------------------------
// Get a useful title for each repeater item
// --------------------------------------------------
function getItemTitle(item, index, itemLabel) {
  const possibleKeys = [
    "name", "title", "city", "label", "question",
    "q", "author", "text", "value", "serviceName", "platform",
  ];

  for (const key of possibleKeys) {
    const value = item?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      const text = String(value).trim();
      return text.length > 45 ? `${text.substring(0, 45)}...` : text;
    }
  }

  return `${itemLabel || "Item"} ${index + 1}`;
}

// --------------------------------------------------
// Determine field width
// --------------------------------------------------
function getFieldClass(field) {
  if (field.type === "textarea" || field.type === "image") {
    return "md:col-span-2";
  }
  return "md:col-span-1";
}

// --------------------------------------------------
// Main Component
// --------------------------------------------------
export default function RepeaterField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const [collapsedItems, setCollapsedItems] = useState({});

  // --------------------------------------------------
  // Update item field
  // --------------------------------------------------
  const updateItem = (index, key, newValue) => {
    const next = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [key]: newValue } : item
    );
    onChange(next);
  };

  // --------------------------------------------------
  // Add new item
  // --------------------------------------------------
  const addItem = () => {
    const newItem = createEmptyItem(field.fields);
    const nextItems = [...items, newItem];
    
    onChange(nextItems);

    // Make sure newly added item is open
    setCollapsedItems((prev) => ({
      ...prev,
      [nextItems.length - 1]: false,
    }));
  };

  // --------------------------------------------------
  // Remove item
  // --------------------------------------------------
  const removeItem = (index) => {
    const confirmed = window.confirm(`Are you sure you want to delete this ${field.itemLabel || "item"}?`);
    if (!confirmed) return;

    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    onChange(nextItems);

    // Rebuild collapse state
    const nextCollapsed = {};
    nextItems.forEach((_, newIndex) => {
      if (collapsedItems[newIndex >= index ? newIndex + 1 : newIndex]) {
        nextCollapsed[newIndex] = true;
      }
    });

    setCollapsedItems(nextCollapsed);
  };

  // --------------------------------------------------
  // Move item
  // --------------------------------------------------
  const moveItem = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    
    onChange(next);
  };

  // --------------------------------------------------
  // Toggle collapse
  // --------------------------------------------------
  const toggleItem = (index) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  return (
    <div className="flex flex-col gap-5">
      
      {/* ========================================== */}
      {/* REPEATER HEADER */}
      {/* ========================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <Layers3 size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#07111f]">
                {field.label}
              </h3>
              <span className="rounded-full bg-cyan-100 px-2.5 py-0.5 text-[11px] font-black text-cyan-700">
                {items.length}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Manage your {(field.itemLabel || "items").toLowerCase()} content
            </p>
          </div>
        </div>

        {/* Quick Add */}
        <button
          type="button"
          onClick={addItem}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-black uppercase tracking-wide text-white shadow-md shadow-cyan-500/20 transition-all hover:-translate-y-0.5 hover:bg-cyan-600 hover:shadow-lg"
        >
          <Plus size={16} />
          Add {field.itemLabel || "Item"}
        </button>
      </div>

      {/* ========================================== */}
      {/* EMPTY STATE */}
      {/* ========================================== */}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
            <Inbox size={26} />
          </div>
          <p className="text-sm font-bold text-gray-600">
            No {(field.itemLabel || "items").toLowerCase()} added yet
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Add your first item to get started.
          </p>
          <button
            type="button"
            onClick={addItem}
            className="mt-5 flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100"
          >
            <Plus size={15} />
            Add First Item
          </button>
        </motion.div>
      )}

      {/* ========================================== */}
      {/* ITEMS */}
      {/* ========================================== */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const isCollapsed = collapsedItems[index] === true;
            const itemTitle = getItemTitle(item, index, field.itemLabel);

            return (
              <motion.div
                key={`${index}-${itemTitle}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-cyan-200 hover:shadow-md"
              >
                
                {/* ================================= */}
                {/* ITEM HEADER */}
                {/* ================================= */}
                <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/80 px-4 py-3">
                  
                  {/* Left */}
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 to-blue-600 text-xs font-black text-white">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-bold text-gray-800">
                          {itemTitle}
                        </p>
                      </div>
                      <p className="mt-0.5 text-[11px] text-gray-400">
                        {field.itemLabel || "Item"} #{index + 1}
                      </p>
                    </div>
                    <ChevronRight
                      size={17}
                      className={`ml-auto shrink-0 text-gray-400 transition-transform ${!isCollapsed ? "rotate-90" : ""}`}
                    />
                  </button>

                  {/* ================================= */}
                  {/* CONTROLS */}
                  {/* ================================= */}
                  <div className="flex shrink-0 items-center gap-1">
                    
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveItem(index, -1)}
                      title="Move up"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronUp size={16} />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={index === items.length - 1}
                      onClick={() => moveItem(index, 1)}
                      title="Move down"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronDown size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      title={`Delete ${field.itemLabel || "item"}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* ================================= */}
                {/* ITEM CONTENT */}
                {/* ================================= */}
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
                        {field.fields.map((subField) => (
                          <div key={subField.name} className={getFieldClass(subField)}>
                            {renderField(subField, item[subField.name], (newValue) =>
                              updateItem(index, subField.name, newValue)
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ========================================== */}
      {/* BOTTOM ADD BUTTON */}
      {/* ========================================== */}
      {items.length > 0 && (
        <button
          type="button"
          onClick={addItem}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-300 bg-cyan-50/30 py-3.5 text-xs font-black uppercase tracking-wider text-cyan-600 transition-all hover:border-cyan-400 hover:bg-cyan-50"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-white transition-transform group-hover:scale-110">
            <Plus size={15} />
          </div>
          Add Another {field.itemLabel || "Item"}
        </button>
      )}

    </div>
  );
}