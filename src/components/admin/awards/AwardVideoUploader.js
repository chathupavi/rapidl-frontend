
"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Film,
  LoaderCircle,
  Upload,
  Video,
  X,
  AlertCircle,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MAX_VIDEO_SIZE = 80 * 1024 * 1024;

const ALLOWED_TYPES = [
  "video/mp4",
  "video/webm",
];

function formatFileSize(bytes) {
  if (!bytes || !Number.isFinite(bytes)) return "0 MB";

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AwardVideoUploader({
  value,
  onChange,
  onUploadingChange,
}) {
  const inputRef = useRef(null);
  const xhrRef = useRef(null);
  const mountedRef = useRef(true);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      xhrRef.current?.abort();
    };
  }, []);

  function changeUploading(nextValue) {
    setUploading(nextValue);
    onUploadingChange?.(nextValue);
  }

  function openPicker() {
    if (uploading) return;

    // A button opens the picker; the input never
    // receives normal keyboard/tab focus.
    inputRef.current?.click();
  }

  async function uploadVideo(file) {
    if (!file || uploading) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please select an MP4 or WebM video.");
      return;
    }

    if (file.size <= 0 || file.size > MAX_VIDEO_SIZE) {
      setError("Maximum supported video size is 80 MB.");
      return;
    }

    setSelectedName(file.name);
    setProgress(0);
    changeUploading(true);

    try {
      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured."
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/awards/video-upload`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: file.name,
            contentType: file.type,
            size: file.size,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to prepare upload."
        );
      }

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.open("PUT", result.uploadUrl);

        Object.entries(result.uploadHeaders || {}).forEach(
          ([key, headerValue]) => {
            xhr.setRequestHeader(key, headerValue);
          }
        );

        xhr.upload.onprogress = (event) => {
          if (
            event.lengthComputable &&
            mountedRef.current
          ) {
            setProgress(
              Math.round(
                (event.loaded / event.total) * 100
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(
              new Error(
                `Video upload failed (${xhr.status}).`
              )
            );
          }
        };

        xhr.onerror = () => {
          reject(
            new Error(
              "Upload failed. Check your network and Storage CORS settings."
            )
          );
        };

        xhr.onabort = () => {
          reject(new Error("Video upload cancelled."));
        };

        xhr.send(file);
      });

      if (mountedRef.current) {
        onChange(result.video);
        setProgress(100);
      }
    } catch (err) {
      if (mountedRef.current) {
        console.error("Video upload:", err);
        setError(err.message || "Unable to upload video.");
      }
    } finally {
      xhrRef.current = null;

      if (mountedRef.current) {
        changeUploading(false);
        setSelectedName("");

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    }
  }

  return (
    <div className="w-full">
      {/* File input cannot change page layout */}
      <input
        ref={inputRef}
        type="file"
        accept=".mp4,.webm,video/mp4,video/webm"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
        disabled={uploading}
        onChange={(event) => {
          const file = event.target.files?.[0];

          // Clear the input so selecting the same file again works.
          event.target.value = "";

          if (file) uploadVideo(file);
        }}
      />

      <div className="overflow-hidden rounded-[20px] border border-[#001F5C]/10 bg-white">
        {value?.url ? (
          <div className="p-4 sm:p-5">
            <div className="relative aspect-video max-h-[360px] overflow-hidden rounded-[14px] bg-[#000A20]">
              <video
                src={value.url}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-black text-[#001F5C]">
                    Video ready
                  </p>

                  <p className="mt-1 truncate text-[11px] text-slate-400">
                    {value.originalName || "Uploaded award video"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openPicker}
                  disabled={uploading}
                  className="rounded-xl border border-[#001F5C]/10 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#001F5C] transition hover:bg-slate-50"
                >
                  Replace
                </button>

                <button
                  type="button"
                  onClick={() => onChange(null)}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-red-600 transition hover:bg-red-100"
                >
                  <X size={13} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[180px] flex-col items-center justify-center px-5 py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF6FF] text-[#0062CC]">
              <Film size={23} />
            </div>

            <h4 className="mt-4 text-sm font-black text-[#001F5C]">
              Upload an award video
            </h4>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              MP4 or WebM · Up to 80 MB
            </p>

            <button
              type="button"
              disabled={uploading}
              onClick={openPicker}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0062CC] px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white transition hover:bg-[#0084E3] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <LoaderCircle
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <Upload size={15} />
              )}

              {uploading ? "Uploading..." : "Choose Video"}
            </button>
          </div>
        )}

        {uploading && (
          <div
            role="status"
            className="border-t border-[#001F5C]/[0.06] bg-[#F8FBFF] px-5 py-4"
          >
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex min-w-0 items-center gap-2">
                <Video size={15} className="shrink-0 text-[#0062CC]" />

                <span className="truncate font-semibold text-[#001F5C]">
                  {selectedName || "Uploading video"}
                </span>
              </div>

              <span className="shrink-0 font-black tabular-nums text-[#0062CC]">
                {progress}%
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="mt-3 h-2 overflow-hidden rounded-full bg-[#DDE9F7]"
            >
              <div
                className="h-full rounded-full bg-[#0062CC] transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[10px] text-slate-400">
              <span>Secure cloud upload</span>
              <span>{formatFileSize(MAX_VIDEO_SIZE)} max</span>
            </div>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 border-t border-red-100 bg-red-50 px-5 py-4 text-xs leading-5 text-red-600"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
