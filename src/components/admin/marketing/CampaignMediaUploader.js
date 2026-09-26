"use client";

import {
  useRef,
  useState,
} from "react";

import {
  FileVideo2,
  ImageIcon,
  Loader2,
  RefreshCw,
  Trash2,
  UploadCloud,
} from "lucide-react";


const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;


/* =========================================================
   COMPONENT
========================================================= */

export default function CampaignMediaUploader({
  value,
  onChange,
  uploadKey,
}) {
  const inputRef =
    useRef(
      null
    );


  const [
    uploading,
    setUploading,
  ] = useState(
    false
  );


  const [
    error,
    setError,
  ] = useState(
    ""
  );


  /* =======================================================
     UPLOAD
  ======================================================= */

  async function uploadFile(
    file
  ) {
    if (!file) {
      return;
    }


    try {
      setUploading(
        true
      );


      setError(
        ""
      );


      const formData =
        new FormData();


      formData.append(
        "file",
        file
      );


      formData.append(
        "uploadKey",
        uploadKey
      );


      const response =
        await fetch(
          `${API_URL}/api/campaigns/media/upload`,
          {
            method:
              "POST",

            credentials:
              "include",

            body:
              formData,
          }
        );


      const result =
        await response.json();


      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
          "Upload failed."
        );
      }


      /*
       * We intentionally do NOT delete the previous media
       * before the campaign has been saved.
       *
       * Otherwise, replacing an image and then closing the
       * editor could leave the campaign pointing to a deleted file.
       */

      onChange(
        result.data
      );
    } catch (
      error
    ) {
      console.error(
        "Campaign upload:",
        error
      );


      setError(
        error.message ||
        "Upload failed."
      );
    } finally {
      setUploading(
        false
      );
    }
  }


  /* =======================================================
     REMOVE
  ======================================================= */

  function clearMedia() {
    onChange({
      type:
        "none",

      url:
        "",

      path:
        "",

      posterUrl:
        "",

      posterPath:
        "",

      originalName:
        "",

      mimeType:
        "",

      size:
        0,
    });
  }


  return (
    <div>

      <input
        ref={
          inputRef
        }

        type="file"

        hidden

        accept="
          image/jpeg,
          image/png,
          image/webp,
          image/gif,
          video/mp4,
          video/webm,
          video/quicktime
        "

        onChange={(
          event
        ) => {
          const file =
            event
              .target
              .files?.[0];


          uploadFile(
            file
          );


          event.target.value =
            "";
        }}
      />


      {!value?.url ? (

        <button
          type="button"

          disabled={
            uploading
          }

          onClick={() =>
            inputRef
              .current
              ?.click()
          }

          className="
            flex
            min-h-[220px]
            w-full
            flex-col
            items-center
            justify-center

            rounded-[22px]

            border
            border-dashed
            border-slate-300

            bg-gradient-to-b
            from-white
            to-slate-50

            px-6

            transition

            hover:border-[#168cff]
            hover:from-blue-50/30
            hover:to-blue-50/70
          "
        >

          <div
            className="
              flex
              h-14
              w-14

              items-center
              justify-center

              rounded-2xl

              bg-blue-50

              text-[#0060d0]
            "
          >
            {uploading ? (
              <Loader2
                size={22}
                className="animate-spin"
              />
            ) : (
              <UploadCloud
                size={22}
              />
            )}
          </div>


          <div
            className="
              mt-4

              text-xs
              font-black

              text-[#071b3d]
            "
          >
            {uploading
              ? "Uploading..."
              : "Upload campaign creative"}
          </div>


          <div
            className="
              mt-1

              text-[9px]

              text-slate-400
            "
          >
            JPG, PNG, WebP, GIF,
            MP4, WebM or MOV • Max 40 MB
          </div>

        </button>

      ) : (

        <div
          className="
            overflow-hidden

            rounded-[22px]

            border
            border-slate-200

            bg-white
          "
        >

          <div
            className="
              relative

              aspect-[16/8]

              overflow-hidden

              bg-slate-950
            "
          >

            {value.type ===
              "video" ? (

              <video
                src={
                  value.url
                }

                poster={
                  value.posterUrl ||
                  undefined
                }

                muted
                controls
                playsInline

                className="
                  h-full
                  w-full

                  object-cover
                "
              />

            ) : (

              <img
                src={
                  value.url
                }

                alt="Campaign creative"

                className="
                  h-full
                  w-full

                  object-cover
                "
              />

            )}


            <div
              className="
                absolute
                left-3
                top-3

                flex
                items-center
                gap-2

                rounded-full

                bg-black/55

                px-3
                py-1.5

                text-[8px]
                font-black
                uppercase

                text-white

                backdrop-blur
              "
            >
              {value.type ===
                "video" ? (
                <FileVideo2
                  size={10}
                />
              ) : (
                <ImageIcon
                  size={10}
                />
              )}

              {
                value.type
              }
            </div>

          </div>


          <div
            className="
              flex
              items-center
              justify-between
              gap-4

              p-4
            "
          >

            <div
              className="
                min-w-0
                flex-1
              "
            >

              <div
                className="
                  truncate

                  text-[10px]
                  font-black

                  text-slate-600
                "
              >
                {
                  value.originalName ||
                  "Campaign media"
                }
              </div>


              <div
                className="
                  mt-1

                  text-[8px]

                  text-slate-400
                "
              >
                {formatBytes(
                  value.size
                )}
              </div>

            </div>


            <div
              className="
                flex
                gap-2
              "
            >

              <button
                type="button"

                onClick={() =>
                  inputRef
                    .current
                    ?.click()
                }

                className="
                  flex
                  h-9

                  items-center
                  gap-2

                  rounded-xl

                  border
                  border-slate-200

                  px-3

                  text-[8px]
                  font-black

                  text-slate-600
                "
              >
                <RefreshCw
                  size={11}
                />

                Replace
              </button>


              <button
                type="button"

                onClick={
                  clearMedia
                }

                className="
                  flex
                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-xl

                  bg-red-50

                  text-red-500
                "
              >
                <Trash2
                  size={12}
                />
              </button>

            </div>

          </div>

        </div>

      )}


      {error && (
        <div
          className="
            mt-2

            text-[9px]
            font-bold

            text-red-500
          "
        >
          {error}
        </div>
      )}

    </div>
  );
}


/* =========================================================
   FORMAT
========================================================= */

function formatBytes(
  bytes
) {
  const value =
    Number(
      bytes ||
      0
    );


  if (
    value <
    1024
  ) {
    return `${value} B`;
  }


  if (
    value <
    1024 *
      1024
  ) {
    return `${(
      value /
      1024
    ).toFixed(
      1
    )} KB`;
  }


  return `${(
    value /
    1024 /
    1024
  ).toFixed(
    1
  )} MB`;
}