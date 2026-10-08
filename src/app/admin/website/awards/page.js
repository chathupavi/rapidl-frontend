
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Award,
  Edit3,
  ExternalLink,
  ImageIcon,
  Plus,
  Search,
  Star,
  Trash2,
  Trophy,
  Video,
  Play,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";

import PhotoUploader from "@/components/admin/locations/PhotoUploader";
import AwardVideoUploader from "@/components/admin/awards/AwardVideoUploader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function createEmptyAward() {
  return {
    title: "",
    organization: "",
    year: new Date().getFullYear(),
    category: "",
    recognition: "",
    description: "",
    image: null,
    video: null,
    sourceUrl: "",
    order: 0,
    featured: false,
    published: true,
  };
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  ...props
}) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-[.14em] text-[#001F5C]/55">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...props}
        className="mt-2 h-12 w-full rounded-[15px] border border-[#001F5C]/[0.08] bg-[#F8FBFF] px-4 text-[.88rem] text-[#001F5C] outline-none transition placeholder:text-slate-400 focus:border-[#0062CC]/25 focus:bg-white focus:ring-4 focus:ring-[#0062CC]/[0.04]"
      />
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#0062CC]"
      />

      <div>
        <div className="text-[.82rem] font-black text-[#001F5C]">
          {label}
        </div>

        {description && (
          <p className="mt-0.5 text-[.72rem] leading-5 text-slate-400">
            {description}
          </p>
        )}
      </div>
    </label>
  );
}

function Badge({ label, active, icon: Icon }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[.1em] ${
        active
          ? "bg-[#EEF6FF] text-[#0062CC]"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {Icon && <Icon size={11} />}
      {label}
    </span>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
  optional = false,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0062CC] shadow-[0_8px_24px_rgba(0,31,92,.05)]">
        <Icon size={19} />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[.95rem] font-black text-[#001F5C]">
            {title}
          </h3>

          {optional && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-slate-400">
              Optional
            </span>
          )}
        </div>

        <p className="mt-1 text-[.75rem] leading-5 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function AwardCard({
  award,
  onEdit,
  onDelete,
  deleting,
}) {
  const hasVideo = Boolean(award.video?.url);
  const hasImage = Boolean(award.image?.url);

  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#001F5C]/[0.06] bg-white shadow-[0_12px_35px_rgba(0,31,92,.025)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,31,92,.08)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#001F5C]">
        {hasVideo ? (
          <>
            <video
              src={award.video.url}
              poster={award.image?.url || undefined}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              aria-label={`${award.title} video`}
            />

            <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#001F5C]/75 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white backdrop-blur-lg">
              <Video size={12} />
              Video
            </span>
          </>
        ) : hasImage ? (
          <img
            src={award.image.url}
            alt={award.title || "Award"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#F5FAFF] text-[#0062CC]/40">
            <Trophy size={48} strokeWidth={1.2} />
          </div>
        )}

        {hasImage && !hasVideo && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-[#001F5C] backdrop-blur-lg">
            <ImageIcon size={12} />
            Image
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#0062CC]">
            <Award size={20} />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label={`Edit ${award.title}`}
              onClick={() => onEdit(award)}
              disabled={deleting}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5FAFF] text-[#0062CC] transition hover:bg-[#EEF6FF] disabled:opacity-50"
            >
              <Edit3 size={15} />
            </button>

            <button
              type="button"
              aria-label={`Delete ${award.title}`}
              onClick={() => onDelete(award)}
              disabled={deleting}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50"
            >
              {deleting ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <Trash2 size={15} />
              )}
            </button>
          </div>
        </div>

        <p className="mt-5 text-[10px] font-black uppercase tracking-[.15em] text-[#0084E3]">
          {award.recognition || "Recognition"}
        </p>

        <h3 className="mt-2 text-[1.15rem] font-black leading-6 text-[#001F5C]">
          {award.title}
        </h3>

        <p className="mt-2 text-[.8rem] leading-6 text-slate-500">
          {award.organization || "Awarding organisation not specified"}
          {award.year ? ` • ${award.year}` : ""}
        </p>

        {award.category && (
          <p className="mt-2 text-[.72rem] font-bold text-slate-400">
            {award.category}
          </p>
        )}

        {award.description && (
          <p className="mt-4 line-clamp-3 text-[.78rem] leading-6 text-slate-500">
            {award.description}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge
            active={award.published}
            label={award.published ? "Published" : "Draft"}
          />

          {award.featured && (
            <Badge active label="Featured" icon={Star} />
          )}

          {hasVideo && (
            <Badge active label="Video" icon={Play} />
          )}
        </div>

        {award.sourceUrl && (
          <a
            href={award.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em] text-[#0062CC] hover:text-[#0084E3]"
          >
            Official Source
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  );
}

export default function AwardsAdminPage() {
  const [awards, setAwards] = useState([]);
  const [form, setForm] = useState(createEmptyAward);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadAwards = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is missing."
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/awards`,
        {
          method: "GET",
          cache: "no-store",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Failed to load awards."
        );
      }

      setAwards(
        Array.isArray(result.awards)
          ? result.awards
          : []
      );
    } catch (err) {
      console.error("Failed to load awards:", err);

      setError(
        err.message || "Failed to load awards."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAwards();
  }, [loadAwards]);

  const filteredAwards = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return awards;

    return awards.filter((award) =>
      [
        award.title,
        award.organization,
        award.category,
        award.recognition,
        award.year,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(keyword)
        )
    );
  }, [awards, search]);

  const publishedCount = useMemo(
    () =>
      awards.filter(
        (award) => award.published === true
      ).length,
    [awards]
  );

  const videoCount = useMemo(
    () =>
      awards.filter(
        (award) => Boolean(award.video?.url)
      ).length,
    [awards]
  );

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(createEmptyAward());
    setError("");
  }

  function editAward(award) {
    setEditingId(award.id);

    setForm({
      title: award.title || "",
      organization: award.organization || "",
      year: award.year || new Date().getFullYear(),
      category: award.category || "",
      recognition: award.recognition || "",
      description: award.description || "",
      image: award.image || null,
      video: award.video || null,
      sourceUrl: award.sourceUrl || "",
      order: Number(award.order || 0),
      featured: award.featured === true,
      published: award.published !== false,
    });

    setError("");
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Please enter the award title.");
      return;
    }

    if (!API_URL) {
      setError("NEXT_PUBLIC_API_URL is missing.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setNotice("");

      const payload = {
        title: form.title.trim(),
        organization: form.organization.trim(),
        year: Number(form.year),
        category: form.category.trim(),
        recognition: form.recognition.trim(),
        description: form.description.trim(),

        // Firebase Storage media objects
        image: form.image || null,
        video: form.video || null,

        sourceUrl: form.sourceUrl.trim(),
        order: Number(form.order || 0),
        featured: form.featured === true,
        published: form.published !== false,
      };

      const url = editingId
        ? `${API_URL}/api/admin/awards/${editingId}`
        : `${API_URL}/api/admin/awards`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Failed to save award."
        );
      }

      const successMessage = editingId
        ? "Award updated successfully."
        : "Award created successfully.";

      resetForm();
      await loadAwards();
      setNotice(successMessage);
    } catch (err) {
      console.error("Save award failed:", err);

      setError(
        err.message || "Failed to save award."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteAward(award) {
    if (
      !window.confirm(
        `Are you sure you want to delete "${award.title}"?`
      )
    ) {
      return;
    }

    try {
      setDeletingId(award.id);
      setError("");
      setNotice("");

      const response = await fetch(
        `${API_URL}/api/admin/awards/${award.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Delete failed."
        );
      }

      if (editingId === award.id) {
        resetForm();
      }

      await loadAwards();
      setNotice("Award deleted successfully.");
    } catch (err) {
      console.error("Delete award failed:", err);

      setError(err.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] p-5 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.17em] text-[#0062CC]">
              <Trophy size={16} />
              Brand Recognition
            </div>

            <h1 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-.05em] text-[#001F5C]">
              Awards & Recognition
            </h1>

            <p className="mt-2 max-w-[680px] text-[.9rem] leading-7 text-slate-500">
              Manage company awards, achievements,
              official recognition, images and videos
              displayed across the Rapid Laundromat website.
            </p>
          </div>

          <button
            type="button"
            onClick={loadAwards}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#001F5C]/10 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#001F5C] transition hover:bg-[#EEF6FF] disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Awards",
              value: awards.length,
              icon: Trophy,
            },
            {
              label: "Published Awards",
              value: publishedCount,
              icon: CheckCircle2,
            },
            {
              label: "Video Awards",
              value: videoCount,
              icon: Video,
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-[20px] border border-[#001F5C]/[0.05] bg-white p-5 shadow-[0_10px_35px_rgba(0,31,92,.025)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF6FF] text-[#0062CC]">
                  <Icon size={21} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-2xl font-black text-[#001F5C]">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* NOTIFICATIONS */}

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="shrink-0" />
            <span className="flex-1">{error}</span>

            <button
              type="button"
              aria-label="Dismiss error"
              onClick={() => setError("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
          >
            <CheckCircle2 size={18} />
            <span className="flex-1">{notice}</span>

            <button
              type="button"
              aria-label="Dismiss notice"
              onClick={() => setNotice("")}
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* AWARD FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[28px] border border-[#001F5C]/[0.06] bg-white p-6 shadow-[0_16px_45px_rgba(0,31,92,.04)] lg:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF6FF] text-[#0062CC]">
              {editingId ? (
                <Edit3 size={18} />
              ) : (
                <Plus size={19} />
              )}
            </div>

            <div>
              <h2 className="text-[1.1rem] font-black text-[#001F5C]">
                {editingId
                  ? "Edit Award"
                  : "Add New Award"}
              </h2>

              <p className="mt-1 text-[.75rem] text-slate-400">
                Add award details and upload supporting
                photos or videos.
              </p>
            </div>
          </div>

          {/* MAIN FIELDS */}

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Field
              label="Award Title"
              value={form.title}
              required
              maxLength={250}
              placeholder="Best Laundry Service Provider"
              onChange={(value) =>
                updateField("title", value)
              }
            />

            <Field
              label="Awarding Organisation"
              value={form.organization}
              maxLength={250}
              placeholder="Sri Lanka Business Awards"
              onChange={(value) =>
                updateField("organization", value)
              }
            />

            <Field
              label="Year"
              type="number"
              min="1900"
              max="2200"
              value={form.year}
              onChange={(value) =>
                updateField("year", value)
              }
            />

            <Field
              label="Category"
              value={form.category}
              maxLength={200}
              placeholder="Service Excellence"
              onChange={(value) =>
                updateField("category", value)
              }
            />

            <Field
              label="Recognition"
              value={form.recognition}
              maxLength={200}
              placeholder="Gold Award"
              onChange={(value) =>
                updateField("recognition", value)
              }
            />

            <Field
              label="Display Order"
              type="number"
              min="0"
              value={form.order}
              onChange={(value) =>
                updateField("order", value)
              }
            />
          </div>

          {/* DESCRIPTION AND SOURCE */}

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[.14em] text-[#001F5C]/55">
                Description
              </label>

              <textarea
                rows={6}
                maxLength={5000}
                value={form.description}
                placeholder="Describe the award, achievement and why Rapid received this recognition..."
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                className="mt-2 min-h-[160px] w-full resize-y rounded-[16px] border border-[#001F5C]/[0.08] bg-[#F8FBFF] px-4 py-3 text-[.9rem] leading-6 text-[#001F5C] outline-none transition placeholder:text-slate-400 focus:border-[#0062CC]/25 focus:bg-white focus:ring-4 focus:ring-[#0062CC]/[0.04]"
              />
            </div>

            <div>
              <Field
                label="Official Source URL"
                type="url"
                maxLength={3000}
                value={form.sourceUrl}
                placeholder="https://official-award-website.com/..."
                onChange={(value) =>
                  updateField("sourceUrl", value)
                }
              />

              <div className="mt-4 rounded-[16px] border border-[#0062CC]/[0.07] bg-[#F5FAFF] p-4">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#0062CC]">
                  Verification
                </p>

                <p className="mt-2 text-[.78rem] leading-6 text-slate-500">
                  Add the official award organisation,
                  relevant news article or recognition
                  page whenever available.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE UPLOADER */}

          <section className="mt-8 rounded-[22px] border border-[#001F5C]/[0.07] bg-[#F8FBFF] p-5 lg:p-6">
            <SectionHeading
              icon={ImageIcon}
              title="Award Image"
              description="Upload an image of the award, trophy, certificate or official recognition. An image can also act as the video poster."
              optional
            />

            <div className="mt-5">
              <PhotoUploader
                value={form.image ? [form.image] : []}
                type="award"
                folder="awards"
                multiple={false}
                max={1}
                onChange={(images) =>
                  updateField(
                    "image",
                    images?.[0] || null
                  )
                }
              />
            </div>

            {form.image?.url && (
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[14px] bg-white px-4 py-3 text-[.72rem] text-slate-500">
                <span className="inline-flex items-center gap-1.5 font-black text-emerald-600">
                  <CheckCircle2 size={14} />
                  Image uploaded
                </span>

                {form.image.format && (
                  <span>
                    Format:{" "}
                    <strong className="uppercase text-[#001F5C]">
                      {form.image.format}
                    </strong>
                  </span>
                )}

                {form.image.originalName && (
                  <span className="max-w-[300px] truncate">
                    {form.image.originalName}
                  </span>
                )}
              </div>
            )}
          </section>

          {/* VIDEO UPLOADER */}

          <section className="mt-6 rounded-[22px] border border-[#001F5C]/[0.07] bg-[#F8FBFF] p-5 lg:p-6">
            <SectionHeading
              icon={Video}
              title="Award Video"
              description="Upload an MP4 or WebM video of an award ceremony, company achievement or recognition. Videos will play on the public website."
              optional
            />

            <div className="mt-5">
              <AwardVideoUploader
                value={form.video}
                onChange={(video) =>
                  updateField("video", video)
                }
              />
            </div>

            {form.video?.url && (
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[14px] bg-white px-4 py-3 text-[.72rem] text-slate-500">
                <span className="inline-flex items-center gap-1.5 font-black text-emerald-600">
                  <CheckCircle2 size={14} />
                  Video uploaded
                </span>

                {form.video.contentType && (
                  <span>
                    Type:{" "}
                    <strong className="text-[#001F5C]">
                      {form.video.contentType}
                    </strong>
                  </span>
                )}

                {form.video.originalName && (
                  <span className="max-w-[300px] truncate">
                    {form.video.originalName}
                  </span>
                )}
              </div>
            )}

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-[#0062CC]/10 bg-white p-4">
              <Play
                size={17}
                className="mt-0.5 shrink-0 text-[#0062CC]"
              />

              <p className="text-[.75rem] leading-6 text-slate-500">
                When an award has both an image and a
                video, the image can be used as its
                video cover. Visitors can play the video
                in the award detail viewer.
              </p>
            </div>
          </section>

          {/* DISPLAY SETTINGS */}

          <div className="mt-7 flex flex-wrap gap-x-10 gap-y-5 rounded-[18px] bg-[#F8FBFF] p-5">
            <Toggle
              label="Published"
              description="Show this award on the public website."
              checked={form.published}
              onChange={(value) =>
                updateField("published", value)
              }
            />

            <Toggle
              label="Featured"
              description="Give this award priority in featured displays."
              checked={form.featured}
              onChange={(value) =>
                updateField("featured", value)
              }
            />
          </div>

          {/* ACTIONS */}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-[#0062CC] px-6 py-3.5 text-[10px] font-black uppercase tracking-[.13em] text-white transition hover:bg-[#0084E3] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : editingId ? (
                <>
                  <CheckCircle2 size={15} />
                  Update Award
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Add Award
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                className="rounded-xl border border-[#001F5C]/10 bg-white px-6 py-3.5 text-[10px] font-black uppercase tracking-[.13em] text-[#001F5C] transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </form>

        {/* EXISTING AWARDS */}

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.15em] text-[#0062CC]">
                Recognition Library
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-[#001F5C]">
                Manage Existing Awards
              </h2>
            </div>

            <span className="rounded-full bg-[#001F5C] px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white">
              {filteredAwards.length}{" "}
              {filteredAwards.length === 1
                ? "Award"
                : "Awards"}
            </span>
          </div>

          {/* SEARCH */}

          <div className="relative mt-6">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search awards, organisations, categories..."
              className="h-12 w-full rounded-[16px] border border-[#001F5C]/[0.07] bg-white pl-11 pr-4 text-[.85rem] text-[#001F5C] outline-none focus:border-[#0062CC]/20"
            />
          </div>

          {/* LOADING */}

          {loading && (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[330px] animate-pulse rounded-[24px] bg-white"
                />
              ))}
            </div>
          )}

          {/* EMPTY STATE */}

          {!loading && filteredAwards.length === 0 && (
            <div className="mt-6 rounded-[24px] border border-dashed border-[#001F5C]/10 bg-white px-6 py-16 text-center">
              <Trophy
                size={36}
                className="mx-auto text-[#0062CC]/35"
              />

              <h3 className="mt-4 text-[1rem] font-black text-[#001F5C]">
                No awards found
              </h3>

              <p className="mt-2 text-[.8rem] text-slate-400">
                Add Rapid&apos;s first award or change
                your search criteria.
              </p>
            </div>
          )}

          {/* AWARD CARDS */}

          {!loading && filteredAwards.length > 0 && (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredAwards.map((award) => (
                <AwardCard
                  key={award.id}
                  award={award}
                  onEdit={editAward}
                  onDelete={deleteAward}
                  deleting={deletingId === award.id}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
