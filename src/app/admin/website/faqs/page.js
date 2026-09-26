"use client";

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
  HelpCircle,
  Loader2,
  Pencil,
  RefreshCw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";


/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


const INITIAL_FORM = {
  question: "",
  answer: "",
  published: false,
  order: 0,
};


/* =========================================================
   PAGE
========================================================= */

export default function FAQAdminPage() {
  const [
    items,
    setItems,
  ] = useState([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    updatingId,
    setUpdatingId,
  ] = useState(null);


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    error,
    setError,
  ] = useState("");


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

  const loadFaqs =
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
              `${API_URL}/api/faqs`,
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
                "Unable to load FAQs."
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
            "FAQ Load Error:",
            error
          );


          setError(
            error.message ||
              "Unable to load FAQs."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );


  useEffect(() => {
    loadFaqs();
  }, [loadFaqs]);


  /* =======================================================
     MODAL
  ======================================================= */

  function openAdd() {
    setSelectedItem(
      null
    );

    setModalOpen(
      true
    );
  }


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


  function closeModal() {
    setModalOpen(
      false
    );

    setSelectedItem(
      null
    );
  }


  /* =======================================================
     SAVED
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
          `${API_URL}/api/faqs/${encodeURIComponent(
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
            "Unable to update FAQ."
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
          "Unable to update FAQ."
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
        `Delete this FAQ?\n\n"${item.question}"`
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
          `${API_URL}/api/faqs/${encodeURIComponent(
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
            "Unable to delete FAQ."
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
          "Unable to delete FAQ."
      );
    } finally {
      setUpdatingId(
        null
      );
    }
  }


  /* =======================================================
     SEARCH
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
            item.question
              ?.toLowerCase()
              .includes(
                query
              ) ||
            item.answer
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


  const publishedCount =
    items.filter(
      (item) =>
        item.published
    ).length;


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
            max-w-[1500px]
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
                <HelpCircle
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
                Frequently Asked Questions
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
                Manage customer questions and answers shown in the FAQ
                section of the Rapid website.
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
                  loadFaqs
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

                Add FAQ
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
              label="Total FAQs"
              value={
                items.length
              }
            />


            <StatCard
              label="Published"
              value={
                publishedCount
              }
            />


            <StatCard
              label="Draft"
              value={
                items.length -
                publishedCount
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
                max-w-[500px]
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
                placeholder="Search questions or answers..."
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


          {/* FAQ LIST */}

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
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-slate-200
                  bg-white
                "
              >
                {filteredItems.map(
                  (
                    item,
                    index
                  ) => (
                    <FAQRow
                      key={
                        item.id
                      }
                      item={
                        item
                      }
                      number={
                        index +
                        1
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
        <FAQModal
          key={
            selectedItem?.id ||
            "new-faq"
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
   FAQ ROW
========================================================= */

function FAQRow({
  item,
  number,
  loading,
  onEdit,
  onPublish,
  onDelete,
}) {
  return (
    <article
      className="
        grid
        gap-5
        border-b
        border-slate-100
        p-5
        last:border-b-0
        lg:grid-cols-[55px_1fr_auto]
        lg:items-center
      "
    >
      <div
        className="
          hidden
          font-barlowCond
          text-3xl
          font-black
          text-[#001F5C]/10
          lg:block
        "
      >
        {String(
          number
        ).padStart(
          2,
          "0"
        )}
      </div>


      <div>
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          <h2
            className="
              text-sm
              font-black
              leading-6
              text-[#001F5C]
            "
          >
            {item.question}
          </h2>


          <span
            className={`
              rounded-full
              px-2.5
              py-1
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


          <span
            className="
              rounded-full
              bg-blue-50
              px-2.5
              py-1
              text-[7px]
              font-black
              uppercase
              text-[#0062CC]
            "
          >
            Order{" "}
            {item.order ??
              0}
          </span>
        </div>


        <p
          className="
            mt-2
            max-w-[1000px]
            text-xs
            leading-5
            text-slate-400
          "
        >
          {item.answer}
        </p>
      </div>


      <div
        className="
          flex
          items-center
          gap-2
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
            inline-flex
            h-9
            items-center
            gap-2
            rounded-lg
            border
            border-slate-200
            px-3
            text-[7px]
            font-black
            uppercase
            text-[#0062CC]
          "
        >
          {loading ? (
            <Loader2
              size={12}
              className="animate-spin"
            />
          ) : item.published ? (
            <EyeOff
              size={12}
            />
          ) : (
            <Eye
              size={12}
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
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-400
            hover:bg-blue-50
            hover:text-[#0062CC]
          "
        >
          <Pencil
            size={13}
          />
        </button>


        <button
          type="button"
          onClick={
            onDelete
          }
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            text-slate-400
            hover:bg-red-50
            hover:text-red-500
          "
        >
          <Trash2
            size={13}
          />
        </button>
      </div>
    </article>
  );
}


/* =========================================================
   ADD / EDIT MODAL
========================================================= */

function FAQModal({
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
    saving,
    setSaving,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


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


  async function handleSubmit(
    event
  ) {
    event.preventDefault();


    if (
      !form.question.trim()
    ) {
      setError(
        "Question is required."
      );

      return;
    }


    if (
      !form.answer.trim()
    ) {
      setError(
        "Answer is required."
      );

      return;
    }


    try {
      setSaving(true);
      setError("");


      const payload = {
        question:
          form.question.trim(),

        answer:
          form.answer.trim(),

        published:
          Boolean(
            form.published
          ),

        order:
          Number(
            form.order ||
            0
          ),
      };


      const endpoint =
        isEdit
          ? `${API_URL}/api/faqs/${encodeURIComponent(
              item.id
            )}`
          : `${API_URL}/api/faqs`;


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

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
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
            "Unable to save FAQ."
        );
      }


      onSaved(
        result.item
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to save FAQ."
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
        p-4
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
          w-full
          max-w-[760px]
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
              FAQ
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
                ? "Edit FAQ"
                : "Add FAQ"}
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
        >
          <div
            className="
              space-y-5
              p-6
            "
          >

            {error && (
              <div
                className="
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


            <Input
              label="Question"
              value={
                form.question
              }
              onChange={(
                event
              ) =>
                updateField(
                  "question",
                  event.target
                    .value
                )
              }
              placeholder="How do I book a laundry service?"
            />


            <Textarea
              label="Answer"
              value={
                form.answer
              }
              onChange={(
                event
              ) =>
                updateField(
                  "answer",
                  event.target
                    .value
                )
              }
              placeholder="Enter the customer-facing answer..."
            />


            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
              "
            >
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


              <Toggle
                label="Published"
                description="Show this FAQ on the public website."
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
          </div>


          <div
            className="
              flex
              justify-end
              gap-3
              border-t
              border-slate-100
              px-6
              py-4
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
                min-w-[130px]
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
                ? "Saving..."
                : isEdit
                ? "Save Changes"
                : "Add FAQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


/* =========================================================
   COMPONENTS
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


function Textarea({
  label,
  ...props
}) {
  return (
    <label className="block">
      <SectionLabel>
        {label}
      </SectionLabel>

      <textarea
        {...props}
        rows={6}
        className="
          mt-2
          w-full
          resize-none
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          leading-6
          text-[#001F5C]
          outline-none
          focus:border-[#0062CC]/30
        "
      />
    </label>
  );
}


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
        h-full
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-[#FAFCFF]
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


function LoadingState() {
  return (
    <div
      className="
        flex
        min-h-[280px]
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
      <HelpCircle
        size={28}
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
        No FAQs yet
      </h2>

      <p
        className="
          mx-auto
          mt-2
          max-w-[420px]
          text-xs
          leading-5
          text-slate-400
        "
      >
        Add common customer questions and answers to start building your FAQ
        section.
      </p>

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
        Add First FAQ
      </button>
    </div>
  );
}


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