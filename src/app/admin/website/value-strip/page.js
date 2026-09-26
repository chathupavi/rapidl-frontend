"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Award,
  BriefcaseBusiness,
  Building2,
  CirclePlus,
  Clock3,
  Eye,
  EyeOff,
  Gauge,
  Loader2,
  Pencil,
  RefreshCw,
  Save,
  Search,
  Shirt,
  Sparkles,
  Star,
  Trash2,
  UsersRound,
  X,
} from "lucide-react";


/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   GOOGLE COLORS
========================================================= */

const GOOGLE_BLUE =
  "#4285F4";

const GOOGLE_RED =
  "#EA4335";

const GOOGLE_YELLOW =
  "#FBBC05";

const GOOGLE_GREEN =
  "#34A853";


/* =========================================================
   TYPES
========================================================= */

const TYPE_OPTIONS = [
  {
    value:
      "garments",

    label:
      "Garments Processed",

    icon:
      Shirt,

    defaultSuffix:
      "+",

    defaultAnimated:
      true,
  },

  {
    value:
      "customers",

    label:
      "Customers",

    icon:
      UsersRound,

    defaultSuffix:
      "+",

    defaultAnimated:
      true,
  },

  {
    value:
      "commercial",

    label:
      "Commercial Clients",

    icon:
      BriefcaseBusiness,

    defaultSuffix:
      "+",

    defaultAnimated:
      true,
  },

  {
    value:
      "delivery",

    label:
      "Delivery / Performance",

    icon:
      Clock3,

    defaultSuffix:
      "%",

    defaultAnimated:
      true,
  },

  {
    value:
      "rating",

    label:
      "Google Rating",

    icon:
      Star,

    defaultSuffix:
      "★",

    defaultAnimated:
      false,
  },

  {
    value:
      "branches",

    label:
      "Branches",

    icon:
      Building2,

    defaultSuffix:
      "",

    defaultAnimated:
      true,
  },

  {
    value:
      "experience",

    label:
      "Experience",

    icon:
      Award,

    defaultSuffix:
      "+",

    defaultAnimated:
      true,
  },

  {
    value:
      "quality",

    label:
      "Quality / KPI",

    icon:
      Gauge,

    defaultSuffix:
      "%",

    defaultAnimated:
      true,
  },

  {
    value:
      "custom",

    label:
      "Custom Metric",

    icon:
      Sparkles,

    defaultSuffix:
      "",

    defaultAnimated:
      true,
  },
];


const TYPE_MAP =
  Object.fromEntries(
    TYPE_OPTIONS.map(
      (item) => [
        item.value,
        item,
      ]
    )
  );


/* =========================================================
   INITIAL
========================================================= */

const INITIAL_FORM = {
  type:
    "garments",

  label:
    "",

  value:
    "",

  prefix:
    "",

  suffix:
    "+",

  animated:
    true,

  published:
    false,

  order:
    0,
};


/* =========================================================
   PAGE
========================================================= */

export default function ValueStripAdminPage() {
  const [
    items,
    setItems,
  ] =
    useState([]);


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    search,
    setSearch,
  ] =
    useState("");


  const [
    updatingId,
    setUpdatingId,
  ] =
    useState(null);


  const [
    modalOpen,
    setModalOpen,
  ] =
    useState(false);


  const [
    selectedItem,
    setSelectedItem,
  ] =
    useState(null);


  /* =======================================================
     LOAD
  ======================================================= */

  const loadItems =
    useCallback(
      async () => {
        try {
          setLoading(
            true
          );

          setError(
            ""
          );


          if (!API_URL) {
            throw new Error(
              "NEXT_PUBLIC_API_URL is missing."
            );
          }


          const response =
            await fetch(
              `${API_URL}/api/trust-stats`,
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
                "Unable to load Value Strip."
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
            error
          );


          setError(
            error.message ||
              "Unable to load Value Strip."
          );
        } finally {
          setLoading(
            false
          );
        }
      },
      []
    );


  useEffect(() => {
    loadItems();
  }, [loadItems]);


  /* =======================================================
     ADD / EDIT
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
    setSelectedItem(
      null
    );

    setModalOpen(
      false
    );
  }


  function handleSaved(
    item
  ) {
    setItems(
      (current) => {
        const exists =
          current.some(
            (existing) =>
              existing.id ===
              item.id
          );


        const next =
          exists
            ? current.map(
                (existing) =>
                  existing.id ===
                  item.id
                    ? item
                    : existing
              )
            : [
                ...current,
                item,
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
          `${API_URL}/api/trust-stats/${encodeURIComponent(
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
            (existing) =>
              existing.id ===
              item.id
                ? {
                    ...existing,

                    published:
                      result.published,
                  }
                : existing
          )
      );
    } catch (error) {
      window.alert(
        error.message ||
          "Unable to update item."
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

  async function deleteItem(
    item
  ) {
    const confirmed =
      window.confirm(
        `Delete "${item.label}"?`
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
          `${API_URL}/api/trust-stats/${encodeURIComponent(
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
            (existing) =>
              existing.id !==
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
            item.label
              ?.toLowerCase()
              .includes(
                query
              ) ||
            item.type
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

          {/* =================================================
              HEADER
          ================================================= */}

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
                <Gauge
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
                Value Strip
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
                Control the key values displayed below the hero section.
                Choose the metric type, value, icon behaviour, animation and
                publication status.
              </p>

            </div>


            <div
              className="
                flex

                gap-3
              "
            >

              <button
                type="button"

                onClick={
                  loadItems
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

                  text-[#001F5C]

                  transition-all
                  duration-300

                  hover:border-[#0062CC]/20
                  hover:bg-[#F8FBFF]
                "
              >
                <RefreshCw
                  size={14}
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

                  text-white

                  transition-all
                  duration-300

                  hover:-translate-y-0.5

                  hover:shadow-[0_12px_30px_rgba(0,98,204,.18)]
                "
              >
                <CirclePlus
                  size={14}
                />

                Add Value
              </button>

            </div>

          </div>


          {/* =================================================
              STATS
          ================================================= */}

          <div
            className="
              mt-8

              grid

              gap-4

              sm:grid-cols-3
            "
          >

            <StatCard
              label="Total"
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
              label="Animated"
              value={
                items.filter(
                  (item) =>
                    item.animated
                ).length
              }
            />

          </div>


          {/* =================================================
              SEARCH
          ================================================= */}

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

                placeholder="Search values..."

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

                  outline-none

                  transition-colors

                  focus:border-[#0062CC]/30
                "
              />

            </div>

          </div>


          {/* =================================================
              ERROR
          ================================================= */}

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


          {/* =================================================
              ITEMS
          ================================================= */}

          {loading ? (

            <div
              className="
                mt-6

                flex

                min-h-[280px]

                items-center
                justify-center

                rounded-[22px]

                bg-white
              "
            >
              <Loader2
                className="
                  animate-spin

                  text-[#0062CC]
                "
              />
            </div>

          ) : (

            <div
              className="
                mt-6

                grid

                gap-4

                md:grid-cols-2

                xl:grid-cols-3
              "
            >

              {filteredItems.map(
                (
                  item
                ) => (
                  <ValueCard
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
                      deleteItem(
                        item
                      )
                    }
                  />
                )
              )}

            </div>

          )}

        </div>
      </main>


      {/* =====================================================
          MODAL
      ===================================================== */}

      {modalOpen && (
        <ValueModal
          key={
            selectedItem?.id ||
            "new-value"
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
   VALUE CARD
========================================================= */

function ValueCard({
  item,
  loading,
  onEdit,
  onPublish,
  onDelete,
}) {
  const type =
    TYPE_MAP[
      item.type
    ] ||
    TYPE_MAP.custom;


  const Icon =
    type.icon;


  const isRating =
    item.type ===
    "rating";


  return (
    <article
      className={`
        group

        overflow-hidden

        rounded-[22px]

        border

        bg-white

        transition-all
        duration-300

        hover:-translate-y-[2px]

        ${
          isRating
            ? `
              border-[#FBBC05]/30

              hover:border-[#FBBC05]/55

              hover:shadow-[0_16px_45px_rgba(251,188,5,.10)]
            `
            : `
              border-slate-200

              hover:border-[#0062CC]/15

              hover:shadow-[0_16px_45px_rgba(0,31,92,.06)]
            `
        }
      `}
    >

      {/* GOOGLE TOP ACCENT */}

      {isRating && (
        <div
          className="
            grid
            h-[3px]

            grid-cols-4
          "
        >
          <div className="bg-[#4285F4]" />
          <div className="bg-[#EA4335]" />
          <div className="bg-[#FBBC05]" />
          <div className="bg-[#34A853]" />
        </div>
      )}


      <div className="p-5">

        <div
          className="
            flex

            items-start
            justify-between
          "
        >

          {/* ICON */}

          {isRating ? (

            <div
              className="
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-[14px]

                border
                border-slate-100

                bg-white

                shadow-[0_5px_18px_rgba(0,31,92,.06)]
              "
            >
              <GoogleGIcon
                size={22}
              />
            </div>

          ) : (

            <div
              className="
                flex

                h-11
                w-11

                items-center
                justify-center

                rounded-[14px]

                bg-[#EEF6FF]

                text-[#0062CC]
              "
            >
              <Icon
                size={18}
              />
            </div>

          )}


          <span
            className={`
              rounded-full

              px-3
              py-1.5

              text-[7px]

              font-black
              uppercase

              ${
                item.published
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }
            `}
          >
            {item.published
              ? "Published"
              : "Draft"}
          </span>

        </div>


        {/* =================================================
            VALUE
        ================================================= */}

        {isRating ? (

          <div
            className="
              mt-5

              flex
              items-center

              gap-2
            "
          >

            <div
              className="
                font-barlowCond

                text-4xl

                font-black

                tracking-[-.03em]

                text-[#001F5C]
              "
            >
              {item.prefix}
              {item.value}
            </div>


            <Star
              size={27}

              fill={
                GOOGLE_YELLOW
              }

              stroke={
                GOOGLE_YELLOW
              }

              strokeWidth={1.5}
            />

          </div>

        ) : (

          <div
            className="
              mt-5

              font-barlowCond

              text-4xl

              font-black

              text-[#001F5C]
            "
          >
            {item.prefix}
            {item.value}
            {item.suffix}
          </div>

        )}


        {/* LABEL */}

        <div
          className={`
            mt-2

            text-xs

            font-black
            uppercase

            tracking-[0.12em]

            ${
              isRating
                ? "text-[#5F6368]"
                : "text-slate-400"
            }
          `}
        >
          {item.label}
        </div>


        {/* GOOGLE RATING LABEL */}

        {isRating && (
          <div
            className="
              mt-3

              flex
              items-center

              gap-2
            "
          >

            <GoogleGIcon
              size={13}
            />


            <span
              className="
                text-[8px]

                font-bold

                text-[#5F6368]
              "
            >
              Google Customer Rating
            </span>

          </div>
        )}


        {/* BADGES */}

        <div
          className="
            mt-4

            flex
            flex-wrap

            gap-2
          "
        >

          <Badge
            google={
              isRating
            }
          >
            {type.label}
          </Badge>


          <Badge>
            Order{" "}
            {item.order}
          </Badge>


          <Badge>
            {item.animated
              ? "Animated"
              : "Static"}
          </Badge>

        </div>

      </div>


      {/* =================================================
          ACTIONS
      ================================================= */}

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

          onClick={
            onPublish
          }

          disabled={
            loading
          }

          className={`
            flex

            h-12

            items-center
            justify-center

            gap-2

            text-[8px]

            font-black
            uppercase

            transition-colors

            ${
              isRating
                ? "text-[#B47C00] hover:bg-[#FFFBEB]"
                : "text-[#0062CC] hover:bg-[#F6FAFF]"
            }
          `}
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
            w-12

            border-l
            border-slate-100

            text-slate-400

            transition-colors

            hover:bg-slate-50
            hover:text-[#0062CC]
          "
        >
          <Pencil
            size={14}
            className="mx-auto"
          />
        </button>


        <button
          type="button"

          onClick={
            onDelete
          }

          className="
            w-12

            border-l
            border-slate-100

            text-slate-400

            transition-colors

            hover:bg-red-50
            hover:text-red-500
          "
        >
          <Trash2
            size={14}
            className="mx-auto"
          />
        </button>

      </div>

    </article>
  );
}


/* =========================================================
   MODAL
========================================================= */

function ValueModal({
  item,
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
  ] =
    useState({
      ...INITIAL_FORM,
      ...(item || {}),
    });


  const [
    saving,
    setSaving,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


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
     CHANGE TYPE
  ======================================================= */

  function changeType(
    typeValue
  ) {
    const type =
      TYPE_MAP[
        typeValue
      ] ||
      TYPE_MAP.custom;


    setForm(
      (current) => ({
        ...current,

        type:
          typeValue,

        /*
         * IMPORTANT:
         * Replace the suffix with the correct default
         * whenever the metric type changes.
         *
         * This prevents:
         * Garments 10,000+
         * becoming
         * Rating 4.9+
         */

        suffix:
          type.defaultSuffix,

        animated:
          type.defaultAnimated,

        /*
         * Give the Google rating a sensible label
         * when adding a new metric.
         */

        label:
          typeValue ===
            "rating" &&
          (
            !current.label ||
            current.label ===
              "Garments Processed"
          )
            ? "Google Rating"
            : current.label,
      })
    );
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function save(
    event
  ) {
    event.preventDefault();


    if (
      !form.label.trim()
    ) {
      setError(
        "Label is required."
      );

      return;
    }


    if (
      String(
        form.value
      ).trim() ===
      ""
    ) {
      setError(
        "Value is required."
      );

      return;
    }


    /*
     * Rating validation.
     */

    if (
      form.type ===
      "rating"
    ) {
      const rating =
        Number(
          form.value
        );


      if (
        !Number.isFinite(
          rating
        ) ||
        rating < 0 ||
        rating > 5
      ) {
        setError(
          "Google Rating must be a number between 0 and 5."
        );

        return;
      }
    }


    if (
      form.animated &&
      !Number.isFinite(
        Number(
          form.value
        )
      )
    ) {
      setError(
        "Animated values must be numeric."
      );

      return;
    }


    try {
      setSaving(
        true
      );

      setError(
        ""
      );


      const payload = {
        type:
          form.type,

        label:
          form.label.trim(),

        value:
          String(
            form.value
          ).trim(),

        prefix:
          form.prefix.trim(),

        suffix:
          form.type ===
            "rating"
            ? "★"
            : form.suffix.trim(),

        animated:
          form.type ===
            "rating"
            ? false
            : Boolean(
                form.animated
              ),

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
          ? `${API_URL}/api/trust-stats/${encodeURIComponent(
              item.id
            )}`
          : `${API_URL}/api/trust-stats`;


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
            "Unable to save value."
        );
      }


      onSaved(
        result.item
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to save value."
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  const selectedType =
    TYPE_MAP[
      form.type
    ] ||
    TYPE_MAP.custom;


  const SelectedIcon =
    selectedType.icon;


  const isRating =
    form.type ===
    "rating";


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

      {/* BACKDROP */}

      <button
        type="button"

        onClick={
          onClose
        }

        aria-label="Close modal"

        className="
          absolute
          inset-0

          bg-[#000D27]/70

          backdrop-blur-sm
        "
      />


      {/* MODAL */}

      <div
        className="
          relative
          z-10

          max-h-[94vh]

          w-full
          max-w-[780px]

          overflow-y-auto

          rounded-[28px]

          bg-white

          shadow-[0_30px_100px_rgba(0,13,39,.30)]
        "
      >

        {/* GOOGLE ACCENT */}

        {isRating && (
          <div
            className="
              sticky
              top-0

              z-20

              grid
              h-[4px]

              grid-cols-4
            "
          >
            <div className="bg-[#4285F4]" />
            <div className="bg-[#EA4335]" />
            <div className="bg-[#FBBC05]" />
            <div className="bg-[#34A853]" />
          </div>
        )}


        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex

            items-start
            justify-between

            border-b
            border-slate-100

            p-6
          "
        >

          <div>

            <div
              className={`
                flex
                items-center

                gap-2

                text-[8px]

                font-black
                uppercase

                tracking-[.14em]

                ${
                  isRating
                    ? "text-[#B47C00]"
                    : "text-[#0062CC]"
                }
              `}
            >

              {isRating && (
                <GoogleGIcon
                  size={14}
                />
              )}

              Value Strip

            </div>


            <h2
              className="
                mt-2

                text-2xl

                font-black

                text-[#001F5C]
              "
            >
              {isEdit
                ? "Edit Value"
                : "Add Value"}
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

              transition-all
              duration-300

              hover:bg-slate-200
              hover:text-[#001F5C]
            "
          >
            <X
              size={17}
            />
          </button>

        </div>


        <form
          onSubmit={
            save
          }
        >

          <div
            className="
              space-y-6

              p-6
            "
          >

            {/* ERROR */}

            {error && (
              <div
                className="
                  rounded-xl

                  bg-red-50

                  p-4

                  text-xs
                  font-bold

                  text-red-600
                "
              >
                {error}
              </div>
            )}


            {/* =================================================
                TYPE
            ================================================= */}

            <div>

              <Label>
                Metric Type
              </Label>


              <div
                className="
                  mt-2

                  grid

                  gap-2

                  sm:grid-cols-3
                "
              >

                {TYPE_OPTIONS.map(
                  (
                    type
                  ) => {

                    const Icon =
                      type.icon;


                    const selected =
                      form.type ===
                      type.value;


                    const isGoogleType =
                      type.value ===
                      "rating";


                    return (
                      <button
                        type="button"

                        key={
                          type.value
                        }

                        onClick={() =>
                          changeType(
                            type.value
                          )
                        }

                        className={`
                          flex

                          items-center

                          gap-3

                          rounded-xl

                          border

                          p-3

                          text-left

                          transition-all
                          duration-300

                          ${
                            selected &&
                            isGoogleType
                              ? `
                                border-[#FBBC05]/60

                                bg-[#FFF9E8]

                                shadow-[0_6px_18px_rgba(251,188,5,.08)]
                              `
                              : selected
                                ? `
                                  border-[#0062CC]

                                  bg-[#EEF6FF]
                                `
                                : `
                                  border-slate-200

                                  bg-white

                                  hover:border-slate-300
                                `
                          }
                        `}
                      >

                        {isGoogleType ? (

                          <div
                            className="
                              flex

                              h-9
                              w-9

                              shrink-0

                              items-center
                              justify-center

                              rounded-lg

                              border
                              border-slate-100

                              bg-white

                              shadow-sm
                            "
                          >
                            <GoogleGIcon
                              size={18}
                            />
                          </div>

                        ) : (

                          <div
                            className="
                              flex

                              h-9
                              w-9

                              shrink-0

                              items-center
                              justify-center

                              rounded-lg

                              bg-white

                              text-[#0062CC]
                            "
                          >
                            <Icon
                              size={15}
                            />
                          </div>

                        )}


                        <span
                          className={`
                            text-[9px]

                            font-black

                            ${
                              isGoogleType
                                ? "text-[#3C4043]"
                                : "text-[#001F5C]"
                            }
                          `}
                        >
                          {type.label}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>

            </div>


            {/* =================================================
                PREVIEW
            ================================================= */}

            {isRating ? (

              <GoogleRatingPreview
                form={
                  form
                }
              />

            ) : (

              <div
                className="
                  flex

                  items-center

                  gap-4

                  rounded-[18px]

                  bg-gradient-to-r

                  from-[#001F5C]
                  to-[#0062CC]

                  p-5

                  text-white
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

                    bg-white/10
                  "
                >
                  <SelectedIcon
                    size={19}
                  />
                </div>


                <div>

                  <div
                    className="
                      font-barlowCond

                      text-3xl

                      font-black
                    "
                  >
                    {form.prefix}
                    {form.value ||
                      "0"}
                    {form.suffix}
                  </div>


                  <div
                    className="
                      mt-1

                      text-[8px]

                      font-black
                      uppercase

                      tracking-[.15em]

                      text-white/60
                    "
                  >
                    {form.label ||
                      "Metric Label"}
                  </div>

                </div>

              </div>

            )}


            {/* =================================================
                LABEL
            ================================================= */}

            <Input
              label="Label"

              value={
                form.label
              }

              onChange={(
                event
              ) =>
                updateField(
                  "label",
                  event.target
                    .value
                )
              }

              placeholder={
                isRating
                  ? "Google Rating"
                  : "Garments Processed"
              }
            />


            {/* =================================================
                VALUE FIELDS
            ================================================= */}

            <div
              className="
                grid

                gap-4

                sm:grid-cols-3
              "
            >

              <Input
                label="Prefix"

                value={
                  form.prefix
                }

                onChange={(
                  event
                ) =>
                  updateField(
                    "prefix",
                    event.target
                      .value
                  )
                }

                placeholder=""

                disabled={
                  isRating
                }
              />


              <Input
                label={
                  isRating
                    ? "Rating Value"
                    : "Value"
                }

                type={
                  isRating
                    ? "number"
                    : "text"
                }

                min={
                  isRating
                    ? "0"
                    : undefined
                }

                max={
                  isRating
                    ? "5"
                    : undefined
                }

                step={
                  isRating
                    ? "0.1"
                    : undefined
                }

                value={
                  form.value
                }

                onChange={(
                  event
                ) =>
                  updateField(
                    "value",
                    event.target
                      .value
                  )
                }

                placeholder={
                  isRating
                    ? "4.9"
                    : "10000"
                }
              />


              <Input
                label="Suffix"

                value={
                  isRating
                    ? "★"
                    : form.suffix
                }

                onChange={(
                  event
                ) =>
                  updateField(
                    "suffix",
                    event.target
                      .value
                  )
                }

                placeholder="+"

                disabled={
                  isRating
                }
              />

            </div>


            {/* GOOGLE RATING NOTE */}

            {isRating && (
              <div
                className="
                  flex

                  items-start

                  gap-3

                  rounded-[14px]

                  border
                  border-[#FBBC05]/20

                  bg-[#FFF9E8]

                  p-4
                "
              >

                <div
                  className="
                    flex

                    h-8
                    w-8

                    shrink-0

                    items-center
                    justify-center

                    rounded-lg

                    bg-white

                    shadow-sm
                  "
                >
                  <GoogleGIcon
                    size={16}
                  />
                </div>


                <div>

                  <div
                    className="
                      text-[10px]

                      font-black

                      text-[#3C4043]
                    "
                  >
                    Google Rating Theme
                  </div>


                  <div
                    className="
                      mt-1

                      text-[9px]

                      leading-4

                      text-[#5F6368]
                    "
                  >
                    Ratings use Google's recognizable yellow review star
                    and multicolor Google branding. Enter a value between
                    0.0 and 5.0.
                  </div>

                </div>

              </div>
            )}


            {/* =================================================
                ORDER
            ================================================= */}

            <Input
              label="Display Order"

              type="number"

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


            {/* =================================================
                TOGGLES
            ================================================= */}

            <div
              className="
                grid

                gap-3

                sm:grid-cols-2
              "
            >

              <Toggle
                title="Count Animation"

                description={
                  isRating
                    ? "Rating values remain static for a cleaner Google review presentation."
                    : "Animate the number from zero when the strip enters the screen."
                }

                checked={
                  isRating
                    ? false
                    : form.animated
                }

                disabled={
                  isRating
                }

                onClick={() => {
                  if (
                    !isRating
                  ) {
                    updateField(
                      "animated",
                      !form.animated
                    );
                  }
                }}
              />


              <Toggle
                title="Published"

                description="Show this value on the public website."

                checked={
                  form.published
                }

                onClick={() =>
                  updateField(
                    "published",
                    !form.published
                  )
                }
              />

            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================= */}

          <div
            className="
              flex

              justify-end

              gap-3

              border-t
              border-slate-100

              p-5
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

                transition-colors

                hover:bg-slate-50
              "
            >
              Cancel
            </button>


            <button
              type="submit"

              disabled={
                saving
              }

              className={`
                inline-flex

                h-11

                min-w-[140px]

                items-center
                justify-center

                gap-2

                rounded-xl

                px-5

                text-[8px]

                font-black
                uppercase

                transition-all
                duration-300

                disabled:cursor-not-allowed
                disabled:opacity-60

                ${
                  isRating
                    ? `
                      bg-[#FBBC05]

                      text-[#3C4043]

                      hover:bg-[#F9AB00]

                      hover:shadow-[0_10px_25px_rgba(251,188,5,.20)]
                    `
                    : `
                      bg-[#0062CC]

                      text-white

                      hover:bg-[#0084E3]
                    `
                }
              `}
            >
              {saving ? (
                <Loader2
                  size={14}
                  className="animate-spin"
                />
              ) : isRating ? (
                <Star
                  size={14}
                  fill="currentColor"
                />
              ) : (
                <Save
                  size={14}
                />
              )}

              {saving
                ? "Saving..."
                : isRating
                  ? "Save Rating"
                  : "Save Value"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


/* =========================================================
   GOOGLE RATING PREVIEW
========================================================= */

function GoogleRatingPreview({
  form,
}) {
  const rating =
    Number(
      form.value ||
      0
    );


  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[20px]

        border
        border-[#DADCE0]

        bg-white

        p-5

        shadow-[0_10px_35px_rgba(60,64,67,.08)]
      "
    >

      {/* GOOGLE COLORS */}

      <div
        className="
          absolute
          inset-x-0
          top-0

          grid

          h-[3px]

          grid-cols-4
        "
      >
        <div className="bg-[#4285F4]" />
        <div className="bg-[#EA4335]" />
        <div className="bg-[#FBBC05]" />
        <div className="bg-[#34A853]" />
      </div>


      <div
        className="
          flex

          items-center

          gap-4
        "
      >

        <div
          className="
            flex

            h-12
            w-12

            shrink-0

            items-center
            justify-center

            rounded-xl

            border
            border-slate-100

            bg-white

            shadow-[0_5px_18px_rgba(60,64,67,.08)]
          "
        >
          <GoogleGIcon
            size={25}
          />
        </div>


        <div>

          <div
            className="
              flex

              items-center

              gap-2
            "
          >

            <span
              className="
                font-barlowCond

                text-3xl

                font-black

                tracking-[-.03em]

                text-[#202124]
              "
            >
              {Number.isFinite(
                rating
              ) &&
              form.value !==
                ""
                ? form.value
                : "0.0"}
            </span>


            <Star
              size={23}

              fill={
                GOOGLE_YELLOW
              }

              stroke={
                GOOGLE_YELLOW
              }

              strokeWidth={1.5}
            />

          </div>


          <div
            className="
              mt-1

              text-[8px]

              font-black
              uppercase

              tracking-[.15em]

              text-[#5F6368]
            "
          >
            {form.label ||
              "Google Rating"}
          </div>


          <div
            className="
              mt-2

              flex
              items-center

              gap-[3px]
            "
          >
            {[1, 2, 3, 4, 5].map(
              (
                star
              ) => (
                <Star
                  key={
                    star
                  }

                  size={12}

                  fill={
                    star <=
                    Math.round(
                      rating
                    )
                      ? GOOGLE_YELLOW
                      : "transparent"
                  }

                  stroke={
                    star <=
                    Math.round(
                      rating
                    )
                      ? GOOGLE_YELLOW
                      : "#DADCE0"
                  }

                  strokeWidth={1.5}
                />
              )
            )}
          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   GOOGLE G ICON
========================================================= */

function GoogleGIcon({
  size = 20,
}) {
  return (
    <svg
      width={
        size
      }

      height={
        size
      }

      viewBox="0 0 24 24"

      aria-hidden="true"
    >

      <path
        fill={
          GOOGLE_BLUE
        }

        d="
          M23.49 12.27
          c0-.79-.07-1.55-.2-2.27
          H12v4.3h6.45
          a5.52 5.52 0 0 1-2.39 3.62
          v3.01h3.87
          c2.27-2.09 3.56-5.17
          3.56-8.66z
        "
      />


      <path
        fill={
          GOOGLE_GREEN
        }

        d="
          M12 24
          c3.24 0 5.96-1.07
          7.95-2.9
          l-3.87-3.01
          c-1.07.72-2.44
          1.15-4.08 1.15
          -3.13 0-5.78-2.11
          -6.73-4.95
          H1.28v3.11
          A12 12 0 0 0
          12 24z
        "
      />


      <path
        fill={
          GOOGLE_YELLOW
        }

        d="
          M5.27 14.29
          A7.2 7.2 0 0 1
          4.9 12
          c0-.8.14-1.57.37-2.29
          V6.6H1.28
          A12 12 0 0 0
          0 12
          c0 1.94.46 3.78
          1.28 5.4
          l3.99-3.11z
        "
      />


      <path
        fill={
          GOOGLE_RED
        }

        d="
          M12 4.77
          c1.76 0 3.34.6
          4.58 1.78
          l3.44-3.44
          C17.95 1.18
          15.24 0
          12 0
          A12 12 0 0 0
          1.28 6.6
          l3.99 3.11
          C6.22 6.88
          8.87 4.77
          12 4.77z
        "
      />

    </svg>
  );
}


/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  disabled = false,
  ...props
}) {
  return (
    <label className="block">

      <Label>
        {label}
      </Label>


      <input
        {...props}

        disabled={
          disabled
        }

        className={`
          mt-2

          h-11

          w-full

          rounded-xl

          border
          border-slate-200

          px-4

          text-sm

          outline-none

          transition-all
          duration-200

          focus:border-[#0062CC]/30
          focus:ring-4
          focus:ring-[#0062CC]/[0.04]

          ${
            disabled
              ? `
                cursor-not-allowed

                bg-slate-100

                text-slate-400
              `
              : `
                bg-white

                text-[#001F5C]
              `
          }
        `}
      />

    </label>
  );
}


/* =========================================================
   LABEL
========================================================= */

function Label({
  children,
}) {
  return (
    <div
      className="
        text-[8px]

        font-black
        uppercase

        tracking-[.14em]

        text-slate-500
      "
    >
      {children}
    </div>
  );
}


/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  title,
  description,
  checked,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type="button"

      onClick={
        disabled
          ? undefined
          : onClick
      }

      disabled={
        disabled
      }

      className={`
        flex

        items-center
        justify-between

        gap-4

        rounded-xl

        border
        border-slate-200

        p-4

        text-left

        transition-all
        duration-200

        ${
          disabled
            ? `
              cursor-not-allowed

              bg-slate-50

              opacity-70
            `
            : `
              bg-white

              hover:border-[#0062CC]/15
            `
        }
      `}
    >

      <div>

        <div
          className="
            text-xs

            font-black

            text-[#001F5C]
          "
        >
          {title}
        </div>


        <div
          className="
            mt-1

            text-[9px]

            leading-4

            text-slate-400
          "
        >
          {description}
        </div>

      </div>


      <div
        className={`
          relative

          h-6
          w-11

          shrink-0

          rounded-full

          transition-colors

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

            shadow-sm

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
   BADGE
========================================================= */

function Badge({
  children,
  google = false,
}) {
  return (
    <span
      className={`
        rounded-full

        px-2.5
        py-1

        text-[7px]

        font-black
        uppercase

        ${
          google
            ? `
              border
              border-[#FBBC05]/20

              bg-[#FFF8E1]

              text-[#B47C00]
            `
            : `
              bg-slate-100

              text-slate-500
            `
        }
      `}
    >
      {children}
    </span>
  );
}


/* =========================================================
   STAT CARD
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

          tracking-[.12em]

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