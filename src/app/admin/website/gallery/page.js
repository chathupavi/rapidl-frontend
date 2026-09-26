"use client";

import Image from "next/image";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CirclePlus,
  Eye,
  EyeOff,
  ImageIcon,
  Images,
  Loader2,
  Pencil,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";


/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   FORM
========================================================= */

const INITIAL_FORM = {
  title: "",
  category: "",
  order: 0,
  featured: false,
  published: false,
};


/* =========================================================
   PAGE
========================================================= */

export default function GalleryAdminPage() {
  const [
    items,
    setItems,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    updatingId,
    setUpdatingId,
  ] = useState(null);


  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);


  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);


  /* =======================================================
     LOAD
  ======================================================= */

  const loadGallery =
    useCallback(
      async () => {
        try {
          setLoading(true);
          setError("");


          if (!API_URL) {
            throw new Error(
              "NEXT_PUBLIC_API_URL is missing."
            );
          }


          const response =
            await fetch(
              `${API_URL}/api/gallery`,
              {
                credentials:
                  "include",

                cache:
                  "no-store",
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
                "Unable to load gallery."
            );
          }


          setItems(
            Array.isArray(
              result.items
            )
              ? result.items.sort(
                  sortItems
                )
              : []
          );
        } catch (error) {
          console.error(
            "Gallery load error:",
            error
          );


          setError(
            error.message ||
              "Unable to load gallery."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );


  useEffect(() => {
    loadGallery();
  }, [loadGallery]);


  /* =======================================================
     ADD
  ======================================================= */

  function openAdd() {
    setSelectedItem(
      null
    );

    setModalOpen(
      true
    );
  }


  /* =======================================================
     EDIT
  ======================================================= */

  function openEdit(
    item
  ) {
    setSelectedItem(
      item
    );

    setModalOpen(
      true
    );
  }


  /* =======================================================
     CLOSE
  ======================================================= */

  function closeModal() {
    setModalOpen(
      false
    );

    setSelectedItem(
      null
    );
  }


  /* =======================================================
     SAVE CALLBACK
  ======================================================= */

  function handleSaved(
    saved
  ) {
    setItems(
      (current) => {
        const exists =
          current.some(
            (item) =>
              item.id ===
              saved.id
          );


        const next =
          exists
            ? current.map(
                (item) =>
                  item.id ===
                  saved.id
                    ? saved
                    : item
              )
            : [
                ...current,
                saved,
              ];


        return next.sort(
          sortItems
        );
      }
    );


    closeModal();
  }


  /* =======================================================
     PUBLISH
  ======================================================= */

  async function togglePublish(
    item
  ) {
    try {
      setUpdatingId(
        item.id
      );


      const response =
        await fetch(
          `${API_URL}/api/gallery/${encodeURIComponent(
            item.id
          )}/publish`,
          {
            method:
              "PATCH",

            credentials:
              "include",
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
            "Unable to update item."
        );
      }


      setItems(
        (current) =>
          current.map(
            (currentItem) =>
              currentItem.id ===
              item.id
                ? {
                    ...currentItem,

                    published:
                      result.published,
                  }
                : currentItem
          )
      );
    } catch (error) {
      window.alert(
        error.message ||
          "Unable to update gallery."
      );
    } finally {
      setUpdatingId(
        null
      );
    }
  }


  /* =======================================================
     DELETE
  ======================================================= */

  async function handleDelete(
    item
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.title}"?\n\nThis also deletes both images from Firebase Storage.`
      );


    if (!confirmed) {
      return;
    }


    try {
      setUpdatingId(
        item.id
      );


      const response =
        await fetch(
          `${API_URL}/api/gallery/${encodeURIComponent(
            item.id
          )}`,
          {
            method:
              "DELETE",

            credentials:
              "include",
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
            "Unable to delete item."
        );
      }


      setItems(
        (current) =>
          current.filter(
            (currentItem) =>
              currentItem.id !==
              item.id
          )
      );
    } catch (error) {
      window.alert(
        error.message ||
          "Unable to delete item."
      );
    } finally {
      setUpdatingId(
        null
      );
    }
  }


  /* =======================================================
     FILTER
  ======================================================= */

  const filteredItems =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase();


        if (!query) {
          return items;
        }


        return items.filter(
          (item) =>
            item.title
              ?.toLowerCase()
              .includes(
                query
              ) ||
            item.category
              ?.toLowerCase()
              .includes(
                query
              )
        );
      },
      [
        items,
        search,
      ]
    );


  const published =
    items.filter(
      (item) =>
        item.published
    ).length;


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>

      <main
        className="
          min-h-screen
          bg-[#F4F7FB]
          p-5
          sm:p-7
          lg:p-10
        "
      >
        <div
          className="
            mx-auto
            max-w-[1600px]
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              flex-col
              gap-6
              xl:flex-row
              xl:items-end
              xl:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-[#0062CC]
                "
              >
                <Sparkles
                  size={14}
                />

                Content Studio
              </div>


              <h1
                className="
                  mt-3
                  text-3xl
                  font-black
                  tracking-[-0.045em]
                  text-[#001F5C]
                  sm:text-4xl
                "
              >
                Gallery
              </h1>


              <p
                className="
                  mt-3
                  max-w-[720px]
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Manage Rapid before-and-after transformations. Images are
                stored securely in Firebase Storage and the gallery content
                is stored in Firestore.
              </p>
            </div>


            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >
              <button
                type="button"
                onClick={
                  loadGallery
                }
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-[#001F5C]
                "
              >
                <RefreshCw
                  size={14}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>


              <button
                type="button"
                onClick={
                  openAdd
                }
                className="
                  inline-flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#001F5C]
                  via-[#0062CC]
                  to-[#0084E3]
                  px-5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-white
                  shadow-[0_10px_28px_rgba(0,98,204,.20)]
                "
              >
                <CirclePlus
                  size={14}
                />

                Add Transformation
              </button>
            </div>
          </div>


          {/* STATS */}

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-3
            "
          >
            <StatCard
              label="Transformations"
              value={
                items.length
              }
            />


            <StatCard
              label="Published"
              value={
                published
              }
            />


            <StatCard
              label="Draft"
              value={
                items.length -
                published
              }
            />
          </div>


          {/* SEARCH */}

          <div
            className="
              mt-7
              rounded-[20px]
              border
              border-slate-200
              bg-white
              p-4
            "
          >
            <div
              className="
                relative
                max-w-[450px]
              "
            >
              <Search
                size={15}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />


              <input
                value={
                  search
                }
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Search gallery..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-[#F8FAFC]
                  pl-11
                  pr-4
                  text-sm
                  text-[#001F5C]
                  outline-none
                  focus:border-[#0062CC]/30
                "
              />
            </div>
          </div>


          {error && (
            <div
              className="
                mt-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                p-4
                text-sm
                font-semibold
                text-red-600
              "
            >
              {error}
            </div>
          )}


          {/* LIST */}

          <div className="mt-6">

            {loading ? (
              <LoadingState />
            ) : filteredItems.length ===
              0 ? (
              <EmptyState
                onAdd={
                  openAdd
                }
              />
            ) : (
              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {filteredItems.map(
                  (item) => (
                    <GalleryAdminCard
                      key={
                        item.id
                      }
                      item={
                        item
                      }
                      loading={
                        updatingId ===
                        item.id
                      }
                      onEdit={() =>
                        openEdit(
                          item
                        )
                      }
                      onPublish={() =>
                        togglePublish(
                          item
                        )
                      }
                      onDelete={() =>
                        handleDelete(
                          item
                        )
                      }
                    />
                  )
                )}
              </div>
            )}

          </div>
        </div>
      </main>


      {modalOpen && (
        <GalleryEditorModal
          key={
            selectedItem?.id ||
            "new-gallery"
          }
          item={
            selectedItem
          }
          onClose={
            closeModal
          }
          onSaved={
            handleSaved
          }
        />
      )}

    </>
  );
}


/* =========================================================
   CARD
========================================================= */

function GalleryAdminCard({
  item,
  loading,
  onEdit,
  onPublish,
  onDelete,
}) {
  return (
    <article
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200
        bg-white
        shadow-[0_12px_35px_rgba(15,23,42,.04)]
      "
    >

      {/* IMAGES */}

      <div
        className="
          grid
          h-[210px]
          grid-cols-2
        "
      >
        <GalleryImage
          src={
            item.beforeImage
          }
          label="Before"
        />


        <GalleryImage
          src={
            item.afterImage
          }
          label="After"
        />
      </div>


      {/* INFO */}

      <div className="p-5">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <div
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.15em]
                text-[#0084E3]
              "
            >
              {item.category ||
                "Transformation"}
            </div>


            <h2
              className="
                mt-2
                text-lg
                font-black
                tracking-[-0.03em]
                text-[#001F5C]
              "
            >
              {item.title}
            </h2>
          </div>


          <span
            className={`
              rounded-full
              px-3
              py-1.5
              text-[7px]
              font-black
              uppercase
              tracking-[0.1em]

              ${
                item.published
                  ? `
                    bg-emerald-50
                    text-emerald-600
                  `
                  : `
                    bg-slate-100
                    text-slate-500
                  `
              }
            `}
          >
            {item.published
              ? "Published"
              : "Draft"}
          </span>
        </div>


        <div
          className="
            mt-4
            flex
            gap-2
          "
        >
          <span
            className="
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-[7px]
              font-black
              uppercase
              text-slate-500
            "
          >
            Order{" "}
            {item.order ??
              0}
          </span>


          {item.featured && (
            <span
              className="
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-[7px]
                font-black
                uppercase
                text-[#0062CC]
              "
            >
              Featured
            </span>
          )}
        </div>
      </div>


      {/* ACTIONS */}

      <div
        className="
          grid
          grid-cols-[1fr_auto_auto]
          border-t
          border-slate-100
        "
      >
        <button
          type="button"
          disabled={
            loading
          }
          onClick={
            onPublish
          }
          className="
            flex
            h-12
            items-center
            justify-center
            gap-2
            text-[8px]
            font-black
            uppercase
            tracking-[0.1em]
            text-[#0062CC]
          "
        >
          {loading ? (
            <Loader2
              size={13}
              className="animate-spin"
            />
          ) : item.published ? (
            <EyeOff
              size={13}
            />
          ) : (
            <Eye
              size={13}
            />
          )}


          {item.published
            ? "Unpublish"
            : "Publish"}
        </button>


        <button
          type="button"
          onClick={
            onEdit
          }
          className="
            flex
            w-12
            items-center
            justify-center
            border-l
            border-slate-100
            text-slate-400
            hover:bg-blue-50
            hover:text-[#0062CC]
          "
        >
          <Pencil
            size={14}
          />
        </button>


        <button
          type="button"
          onClick={
            onDelete
          }
          className="
            flex
            w-12
            items-center
            justify-center
            border-l
            border-slate-100
            text-slate-400
            hover:bg-red-50
            hover:text-red-500
          "
        >
          <Trash2
            size={14}
          />
        </button>
      </div>
    </article>
  );
}


/* =========================================================
   IMAGE
========================================================= */

/* =========================================================
   IMAGE
========================================================= */

function GalleryImage({
  src,
  label,
}) {
  return (
    <div
      className="
        relative
        overflow-hidden
        bg-[#EEF3F8]
      "
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          unoptimized
          sizes="
            (max-width: 768px) 50vw,
            (max-width: 1280px) 25vw,
            260px
          "
          className="
            object-contain
            object-center
          "
        />
      ) : (
        <div
          className="
            flex
            h-full
            items-center
            justify-center
            text-slate-300
          "
        >
          <ImageIcon
            size={28}
          />
        </div>
      )}


      <span
        className="
          absolute
          left-3
          top-3
          z-10
          rounded-full
          bg-[#001F5C]/75
          px-3
          py-1.5
          text-[7px]
          font-black
          uppercase
          tracking-[0.1em]
          text-white
          backdrop-blur
        "
      >
        {label}
      </span>
    </div>
  );
}


/* =========================================================
   ADD / EDIT MODAL
========================================================= */

function GalleryEditorModal({
  item = null,
  onClose,
  onSaved,
}) {
  const isEdit =
    Boolean(
      item?.id
    );


  const [
    form,
    setForm,
  ] = useState(
    () => ({
      ...INITIAL_FORM,

      ...(item || {}),
    })
  );


  const [
    beforeFile,
    setBeforeFile,
  ] = useState(null);


  const [
    afterFile,
    setAfterFile,
  ] = useState(null);


  const [
    beforePreview,
    setBeforePreview,
  ] = useState(
    item?.beforeImage ||
    ""
  );


  const [
    afterPreview,
    setAfterPreview,
  ] = useState(
    item?.afterImage ||
    ""
  );


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  /* =======================================================
     PREVIEW CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (
        beforePreview &&
        beforePreview.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          beforePreview
        );
      }


      if (
        afterPreview &&
        afterPreview.startsWith(
          "blob:"
        )
      ) {
        URL.revokeObjectURL(
          afterPreview
        );
      }
    };
  }, [
    beforePreview,
    afterPreview,
  ]);


  /* =======================================================
     FIELD
  ======================================================= */

  function updateField(
    field,
    value
  ) {
    setForm(
      (current) => ({
        ...current,

        [field]:
          value,
      })
    );
  }


  /* =======================================================
     FILE
  ======================================================= */

  function handleImage(
    type,
    file
  ) {
    if (!file) {
      return;
    }


    const preview =
      URL.createObjectURL(
        file
      );


    if (
      type ===
      "before"
    ) {
      setBeforeFile(
        file
      );

      setBeforePreview(
        preview
      );
    } else {
      setAfterFile(
        file
      );

      setAfterPreview(
        preview
      );
    }
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();


    if (
      !form.title.trim()
    ) {
      setError(
        "Title is required."
      );

      return;
    }


    if (
      !isEdit &&
      !beforeFile
    ) {
      setError(
        "Before image is required."
      );

      return;
    }


    if (
      !isEdit &&
      !afterFile
    ) {
      setError(
        "After image is required."
      );

      return;
    }


    try {
      setSaving(true);
      setError("");


      const body =
        new FormData();


      body.append(
        "title",
        form.title.trim()
      );


      body.append(
        "category",
        form.category.trim()
      );


      body.append(
        "order",
        String(
          Number(
            form.order ||
            0
          )
        )
      );


      body.append(
        "featured",
        String(
          Boolean(
            form.featured
          )
        )
      );


      body.append(
        "published",
        String(
          Boolean(
            form.published
          )
        )
      );


      if (beforeFile) {
        body.append(
          "before",
          beforeFile
        );
      }


      if (afterFile) {
        body.append(
          "after",
          afterFile
        );
      }


      const endpoint =
        isEdit
          ? `${API_URL}/api/gallery/${encodeURIComponent(
              item.id
            )}`
          : `${API_URL}/api/gallery`;


      const response =
        await fetch(
          endpoint,
          {
            method:
              isEdit
                ? "PUT"
                : "POST",

            credentials:
              "include",

            body,
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
            "Unable to save gallery item."
        );
      }


      onSaved(
        result.item
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to save gallery item."
      );
    } finally {
      setSaving(false);
    }
  }


  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        flex
        items-center
        justify-center
        p-3
        sm:p-5
      "
    >
      <button
        type="button"
        onClick={
          onClose
        }
        className="
          absolute
          inset-0
          bg-[#000D27]/70
          backdrop-blur-sm
        "
      />


      <div
        className="
          relative
          z-10
          flex
          max-h-[94vh]
          w-full
          max-w-[1000px]
          flex-col
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-[0_40px_130px_rgba(0,13,39,.4)]
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-start
            justify-between
            border-b
            border-slate-100
            px-6
            py-5
            sm:px-8
          "
        >
          <div>
            <div
              className="
                text-[8px]
                font-black
                uppercase
                tracking-[0.17em]
                text-[#0062CC]
              "
            >
              Gallery
            </div>


            <h2
              className="
                mt-2
                text-2xl
                font-black
                tracking-[-0.04em]
                text-[#001F5C]
              "
            >
              {isEdit
                ? "Edit Transformation"
                : "Add Transformation"}
            </h2>
          </div>


          <button
            type="button"
            onClick={
              onClose
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-500
            "
          >
            <X
              size={17}
            />
          </button>
        </div>


        <form
          onSubmit={
            handleSubmit
          }
          className="
            flex
            min-h-0
            flex-1
            flex-col
          "
        >

          <div
            className="
              flex-1
              overflow-y-auto
              px-6
              py-6
              sm:px-8
            "
          >

            {error && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  p-4
                  text-xs
                  font-semibold
                  text-red-600
                "
              >
                {error}
              </div>
            )}


            {/* IMAGES */}

            <div
              className="
                grid
                gap-5
                md:grid-cols-2
              "
            >
              <ImageUpload
                label="Before Image"
                preview={
                  beforePreview
                }
                onChange={(
                  file
                ) =>
                  handleImage(
                    "before",
                    file
                  )
                }
              />


              <ImageUpload
                label="After Image"
                preview={
                  afterPreview
                }
                onChange={(
                  file
                ) =>
                  handleImage(
                    "after",
                    file
                  )
                }
              />
            </div>


            {/* INFORMATION */}

            <section
              className="
                mt-6
                rounded-[20px]
                border
                border-slate-200
                bg-[#FAFCFF]
                p-5
              "
            >
              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >
                <Input
                  label="Title"
                  value={
                    form.title
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "title",
                      event.target
                        .value
                    )
                  }
                  placeholder="Shoe Restoration"
                />


                <Input
                  label="Category"
                  value={
                    form.category
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "category",
                      event.target
                        .value
                    )
                  }
                  placeholder="Specialist Care"
                />


                <Input
                  label="Display Order"
                  type="number"
                  min="0"
                  value={
                    form.order
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "order",
                      event.target
                        .value
                    )
                  }
                />
              </div>


              <div
                className="
                  mt-5
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                <Toggle
                  label="Featured"
                  description="Mark this transformation as a featured result."
                  checked={
                    form.featured
                  }
                  onChange={() =>
                    updateField(
                      "featured",
                      !form.featured
                    )
                  }
                />


                <Toggle
                  label="Published"
                  description="Show this transformation on the public website."
                  checked={
                    form.published
                  }
                  onChange={() =>
                    updateField(
                      "published",
                      !form.published
                    )
                  }
                />
              </div>
            </section>

          </div>


          {/* FOOTER */}

          <div
            className="
              flex
              justify-end
              gap-3
              border-t
              border-slate-100
              px-6
              py-4
              sm:px-8
            "
          >
            <button
              type="button"
              onClick={
                onClose
              }
              className="
                h-11
                rounded-xl
                border
                border-slate-200
                px-5
                text-[8px]
                font-black
                uppercase
                text-slate-500
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={
                saving
              }
              className="
                inline-flex
                h-11
                min-w-[150px]
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#001F5C]
                via-[#0062CC]
                to-[#0084E3]
                px-6
                text-[8px]
                font-black
                uppercase
                tracking-[0.1em]
                text-white
                disabled:opacity-60
              "
            >
              {saving ? (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              ) : (
                <Save
                  size={14}
                />
              )}


              {saving
                ? "Uploading..."
                : isEdit
                ? "Save Changes"
                : "Add Gallery Item"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}


/* =========================================================
   IMAGE UPLOAD
========================================================= */

function ImageUpload({
  label,
  preview,
  onChange,
}) {
  return (
    <div>
      <SectionLabel>
        {label}
      </SectionLabel>


      <label
        className="
          group
          relative
          mt-2
          block
          h-[270px]
          cursor-pointer
          overflow-hidden
          rounded-[20px]
          border
          border-dashed
          border-slate-300
          bg-slate-50
        "
      >
        {preview ? (
          <>
            <img
              src={
                preview
              }
              alt={
                label
              }
              className="
                h-full
                w-full
                object-cover
              "
            />


            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-[#001F5C]/0
                transition
                group-hover:bg-[#001F5C]/55
              "
            >
              <span
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-[8px]
                  font-black
                  uppercase
                  text-[#0062CC]
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              >
                <Upload
                  size={13}
                />

                Replace Image
              </span>
            </div>
          </>
        ) : (
          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              p-6
              text-center
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#EEF6FF]
                text-[#0062CC]
              "
            >
              <Images
                size={19}
              />
            </div>


            <div
              className="
                mt-4
                text-xs
                font-black
                text-[#001F5C]
              "
            >
              Upload {label}
            </div>


            <div
              className="
                mt-1
                text-[10px]
                text-slate-400
              "
            >
              JPG, PNG or WebP
            </div>
          </div>
        )}


        <input
          type="file"
          accept="
            image/jpeg,
            image/png,
            image/webp
          "
          onChange={(
            event
          ) =>
            onChange(
              event.target
                .files?.[0]
            )
          }
          className="hidden"
        />
      </label>
    </div>
  );
}


/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  ...props
}) {
  return (
    <label className="block">
      <SectionLabel>
        {label}
      </SectionLabel>


      <input
        {...props}
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          text-[#001F5C]
          outline-none
          focus:border-[#0062CC]/30
        "
      />
    </label>
  );
}


/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={
        onChange
      }
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-[16px]
        border
        border-slate-200
        bg-white
        p-4
        text-left
      "
    >
      <div>
        <div
          className="
            text-xs
            font-black
            text-[#001F5C]
          "
        >
          {label}
        </div>


        <p
          className="
            mt-1
            text-[10px]
            leading-4
            text-slate-400
          "
        >
          {description}
        </p>
      </div>


      <div
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full

          ${
            checked
              ? "bg-[#0062CC]"
              : "bg-slate-300"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-4
            w-4
            rounded-full
            bg-white
            transition-transform

            ${
              checked
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </div>
    </button>
  );
}


/* =========================================================
   LABEL
========================================================= */

function SectionLabel({
  children,
}) {
  return (
    <div
      className="
        text-[8px]
        font-black
        uppercase
        tracking-[0.14em]
        text-slate-500
      "
    >
      {children}
    </div>
  );
}


/* =========================================================
   STATS
========================================================= */

function StatCard({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <div
        className="
          text-[8px]
          font-black
          uppercase
          tracking-[0.14em]
          text-slate-400
        "
      >
        {label}
      </div>


      <div
        className="
          mt-2
          text-2xl
          font-black
          text-[#001F5C]
        "
      >
        {value}
      </div>
    </div>
  );
}


/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div
      className="
        flex
        min-h-[300px]
        items-center
        justify-center
        rounded-[22px]
        border
        border-slate-200
        bg-white
      "
    >
      <Loader2
        size={22}
        className="
          animate-spin
          text-[#0062CC]
        "
      />
    </div>
  );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  onAdd,
}) {
  return (
    <div
      className="
        rounded-[24px]
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-16
        text-center
      "
    >
      <Images
        size={26}
        className="
          mx-auto
          text-[#0062CC]
        "
      />


      <h2
        className="
          mt-4
          text-lg
          font-black
          text-[#001F5C]
        "
      >
        No transformations yet
      </h2>


      <button
        type="button"
        onClick={
          onAdd
        }
        className="
          mt-5
          rounded-xl
          bg-[#0062CC]
          px-5
          py-3
          text-[8px]
          font-black
          uppercase
          text-white
        "
      >
        Add Transformation
      </button>
    </div>
  );
}


/* =========================================================
   SORT
========================================================= */

function sortItems(
  a,
  b
) {
  return (
    Number(
      a.order || 0
    ) -
    Number(
      b.order || 0
    )
  );
}