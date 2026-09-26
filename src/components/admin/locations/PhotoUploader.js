"use client";

import {
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";

import {
  useRef,
  useState,
} from "react";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";


export default function PhotoUploader({
  value = [],
  onChange,

  folder =
    "general",

  type =
    "branch",

  multiple =
    true,

  max =
    10,
}) {
  const inputRef =
    useRef(null);


  const [
    uploading,
    setUploading,
  ] =
    useState(false);


  /* =======================================================
     UPLOAD
  ======================================================= */

  async function handleFiles(
    event
  ) {
    const files =
      Array.from(
        event.target.files ||
        []
      );


    if (
      !files.length
    ) {
      return;
    }


    const remaining =
      multiple
        ? Math.max(
            0,
            max -
              value.length
          )
        : 1;


    const selected =
      files.slice(
        0,
        remaining
      );


    const body =
      new FormData();


    selected.forEach(
      (file) => {
        body.append(
          "images",
          file
        );
      }
    );


    body.append(
      "folder",
      folder
    );


    body.append(
      "type",
      type
    );


    try {
      setUploading(
        true
      );


      const response =
        await fetch(
          `${API_URL}/api/locations/upload`,
          {
            method:
              "POST",

            credentials:
              "include",

            body,
          }
        );


      const result =
        await response.json();


      if (
        !response.ok
      ) {
        throw new Error(
          result.message ||
          "Upload failed."
        );
      }


      const images =
        result.data
          ?.images ||
        [];


      onChange(
        multiple
          ? [
              ...value,
              ...images,
            ]
          : images.slice(
              0,
              1
            )
      );
    } catch (error) {
      alert(
        error.message
      );
    } finally {
      setUploading(
        false
      );


      if (
        inputRef.current
      ) {
        inputRef.current.value =
          "";
      }
    }
  }


  return (
    <div>

      <input
        ref={
          inputRef
        }

        type="file"

        accept="image/jpeg,image/png,image/webp,image/avif"

        multiple={
          multiple
        }

        onChange={
          handleFiles
        }

        className="hidden"
      />


      <button
        type="button"

        disabled={
          uploading ||
          value.length >=
            max
        }

        onClick={() =>
          inputRef.current
            ?.click()
        }

        className="flex min-h-[110px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 transition hover:border-[#168cff] hover:bg-blue-50/40 disabled:opacity-50"
      >

        {uploading ? (

          <div className="flex items-center gap-2 text-xs font-black text-[#0060d0]">

            <Loader2
              size={17}
              className="animate-spin"
            />

            Optimizing & uploading...

          </div>

        ) : (

          <div className="text-center">

            <ImagePlus
              size={24}
              className="mx-auto text-[#0060d0]"
            />

            <div className="mt-2 text-[10px] font-black text-[#071b3d]">
              Upload Photos
            </div>

            <div className="mt-1 text-[8px] text-slate-400">
              Images are automatically optimized to WebP.
            </div>

          </div>

        )}

      </button>


      {value.length >
        0 && (

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">

          {value.map(
            (
              image,
              index
            ) => (

              <div
                key={
                  image.path ||
                  `${image.url}-${index}`
                }

                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
              >

                <img
                  src={
                    image.url
                  }

                  alt=""
                  loading="lazy"

                  className="aspect-square w-full object-cover"
                />


                <button
                  type="button"

                  onClick={() =>
                    onChange(
                      value.filter(
                        (
                          _,
                          itemIndex
                        ) =>
                          itemIndex !==
                          index
                      )
                    )
                  }

                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-500 shadow"
                >

                  <Trash2
                    size={13}
                  />

                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}