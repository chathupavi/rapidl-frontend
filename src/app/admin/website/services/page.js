"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BriefcaseBusiness,
  Building2,
  CirclePlus,
  Eye,
  EyeOff,
  Footprints,
  Heart,
  Hotel,
  LayoutGrid,
  Loader2,
  PanelsTopLeft,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  ScanSearch,
  Search,
  Shirt,
  Sparkles,
  Trash2,
  Truck,
  X,
  Zap,
} from "lucide-react";


/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   NORMAL CARE ICONS
========================================================= */

const NORMAL_ICON_OPTIONS = [
  {
    value: "Shirt",
    label: "Garment",
    icon: Shirt,
  },
  {
    value: "Sparkles",
    label: "Premium",
    icon: Sparkles,
  },
  {
    value: "Zap",
    label: "Express",
    icon: Zap,
  },
  {
    value: "Hotel",
    label: "Hotel",
    icon: Hotel,
  },
  {
    value: "PanelsTopLeft",
    label: "Curtain",
    icon: PanelsTopLeft,
  },
  {
    value: "ScanSearch",
    label: "Specialist",
    icon: ScanSearch,
  },
  {
    value: "Truck",
    label: "Delivery",
    icon: Truck,
  },
  {
    value: "Building2",
    label: "Business",
    icon: Building2,
  },
  {
    value: "BriefcaseBusiness",
    label: "Uniform",
    icon: BriefcaseBusiness,
  },
  {
    value: "Footprints",
    label: "Shoes",
    icon: Footprints,
  },
  {
    value: "LayoutGrid",
    label: "Carpet",
    icon: LayoutGrid,
  },
  {
    value: "Heart",
    label: "Gentle",
    icon: Heart,
  },
];


const NORMAL_ICON_MAP = {
  Shirt,
  Sparkles,
  Zap,
  Hotel,
  PanelsTopLeft,
  ScanSearch,
  Truck,
  Building2,
  BriefcaseBusiness,
  Footprints,
  LayoutGrid,
  Heart,
};


/* =========================================================
   SIGNATURE CARE EMOJIS
========================================================= */

const SIGNATURE_EMOJIS = [
  {
    category: "Booking / Actions",
    emojis: [
      "📅",
      "🗓️",
      "⏰",
      "🕐",
      "⌛",
      "✅",
      "❌",
      "🔍",
      "➕",
      "➡️",
      "⬅️",
      "📌",
      "🔔",
    ],
  },

  {
    category: "Communication",
    emojis: [
      "💬",
      "📞",
      "☎️",
      "📱",
      "✉️",
      "📧",
      "📝",
      "📢",
      "📣",
      "👨‍💼",
      "👰",
      "🛏️",
      "🪟",
      "⚡",
    ],
  },

  {
    category: "Location",
    emojis: [
      "📍",
      "🏠",
      "🏡",
      "🏢",
      "🏬",
      "🌍",
      "🌎",
      "🗺️",
      "🚩",
      "👠",
      "🛋️",
      "🏨",
      "🍽️",
      "🏥",
      "💆",
      "🏭",
    ],
  },

  {
    category: "Laundry / Garment Care",
    emojis: [
      "👕",
      "👔",
      "👗",
      "👚",
      "🧥",
      "👖",
      "🧦",
      "🩳",
      "🧺",
      "🧼",
      "🫧",
      "💧",
      "🚿",
      "♨️",
      "✨",
      "🌟",
    ],
  },

  {
    category: "Cleaning / Quality",
    emojis: [
      "🧹",
      "🧽",
      "🪣",
      "🧴",
      "🛁",
      "🧤",
      "🌿",
      "🍃",
      "💎",
      "🏆",
      "👷",
    ],
  },

  {
    category: "Delivery / Transport",
    emojis: [
      "🚚",
      "🚛",
      "🚗",
      "🚙",
      "🏍️",
      "🚐",
      "📦",
      "🛻",
      "🛵",
      "🧳",
    ],
  },

  {
    category: "Business / Commercial",
    emojis: [
      "🏭",
      "🏪",
      "🏦",
      "💼",
      "🤝",
      "👥",
      "👤",
      "📊",
      "📈",
      "📉",
      "💰",
      "💵",
    ],
  },

  {
    category: "Trust / Security",
    emojis: [
      "⭐",
      "🥇",
      "🥈",
      "🥉",
      "🏅",
      "🛡️",
      "🔒",
      "👍",
      "👌",
      "❤️",
      "💙",
      "🤍",
    ],
  },

  {
    category: "Technology",
    emojis: [
      "💻",
      "🖥️",
      "📲",
      "⚙️",
      "🔧",
      "🔗",
      "☁️",
      "🖨️",
    ],
  },

  {
    category: "Services",
    emojis: [
      "🧾",
      "📋",
      "📄",
      "🎯",
      "🚀",
      "💡",
      "🔥",
      "🎉",
      "🎁",
    ],
  },

  {
    category: "Social Media",
    emojis: [
      "📸",
      "🎥",
      "▶️",
      "👏",
      "😊",
      "😍",
      "🥰",
    ],
  },

  {
    category: "Nature / Premium",
    emojis: [
      "🌱",
      "🌸",
      "🌺",
      "🌈",
      "☀️",
      "🌙",
    ],
  },
];


/* =========================================================
   EMPTY FORM
========================================================= */

const INITIAL_FORM = {
  slug: "",

  number: "",

  serviceType: "normal",

  title: "",

  description: "",

  category: "",

  tag: "",

  icon: "Shirt",

  iconType: "lucide",

  badge: "",

  href: "",

  suitableFor: [],

  includes: [],

  featured: false,

  published: false,

  order: 0,

  slugEdited: false,
};


/* =========================================================
   MAIN PAGE
========================================================= */

export default function ServicesAdminPage() {
  const [
    services,
    setServices,
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
    filter,
    setFilter,
  ] = useState("all");


  const [
    updatingId,
    setUpdatingId,
  ] = useState(null);


  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);


  const [
    selectedService,
    setSelectedService,
  ] = useState(null);


  /* =======================================================
     LOAD SERVICES
  ======================================================= */

  const loadServices =
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
              `${API_URL}/api/services`,
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
                "Failed to load services."
            );
          }


          const list =
            Array.isArray(
              result.services
            )
              ? result.services
              : [];


          list.sort(
            sortServices
          );


          setServices(
            list
          );
        } catch (error) {
          console.error(
            "Load services error:",
            error
          );


          setError(
            error.message ||
              "Unable to load services."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );


  useEffect(() => {
    loadServices();
  }, [loadServices]);


  /* =======================================================
     MODAL
  ======================================================= */

  function openAddModal() {
    setSelectedService(
      null
    );

    setModalOpen(
      true
    );
  }


  function openEditModal(
    service
  ) {
    setSelectedService(
      service
    );

    setModalOpen(
      true
    );
  }


  function closeModal() {
    setModalOpen(
      false
    );

    setSelectedService(
      null
    );
  }


  /* =======================================================
     SAVE CALLBACK
  ======================================================= */

  function handleSaved(
    savedService
  ) {
    setServices(
      (current) => {
        const exists =
          current.some(
            (item) =>
              item.id ===
              savedService.id
          );


        const next =
          exists
            ? current.map(
                (item) =>
                  item.id ===
                  savedService.id
                    ? savedService
                    : item
              )
            : [
                ...current,
                savedService,
              ];


        return next.sort(
          sortServices
        );
      }
    );


    closeModal();
  }


  /* =======================================================
     PUBLISH
  ======================================================= */

  async function togglePublish(
    service
  ) {
    try {
      setUpdatingId(
        service.id
      );


      const response =
        await fetch(
          `${API_URL}/api/services/${encodeURIComponent(
            service.id
          )}/publish`,
          {
            method:
              "PATCH",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },
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
            "Unable to update publish status."
        );
      }


      setServices(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              service.id
                ? {
                    ...item,

                    published:
                      result.published,
                  }
                : item
          )
      );
    } catch (error) {
      console.error(
        "Publish error:",
        error
      );


      window.alert(
        error.message ||
          "Unable to update publish status."
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
    service
  ) {
    const confirmed =
      window.confirm(
        `Delete "${service.title}" permanently?`
      );


    if (!confirmed) {
      return;
    }


    try {
      setUpdatingId(
        service.id
      );


      const response =
        await fetch(
          `${API_URL}/api/services/${encodeURIComponent(
            service.id
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
            "Unable to delete service."
        );
      }


      setServices(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              service.id
          )
      );
    } catch (error) {
      console.error(
        "Delete service:",
        error
      );


      window.alert(
        error.message ||
          "Unable to delete service."
      );
    } finally {
      setUpdatingId(
        null
      );
    }
  }


  /* =======================================================
     FILTERED SERVICES
  ======================================================= */

  const filteredServices =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase();


        return services.filter(
          (service) => {
            const matchesSearch =
              !query ||
              service.title
                ?.toLowerCase()
                .includes(
                  query
                ) ||
              service.category
                ?.toLowerCase()
                .includes(
                  query
                ) ||
              service.tag
                ?.toLowerCase()
                .includes(
                  query
                ) ||
              service.slug
                ?.toLowerCase()
                .includes(
                  query
                );


            const matchesType =
              filter ===
                "all" ||
              service.serviceType ===
                filter;


            return (
              matchesSearch &&
              matchesType
            );
          }
        );
      },
      [
        services,
        search,
        filter,
      ]
    );


  /* =======================================================
     STATS
  ======================================================= */

  const normalCount =
    services.filter(
      (service) =>
        service.serviceType ===
        "normal"
    ).length;


  const signatureCount =
    services.filter(
      (service) =>
        service.serviceType ===
        "signature"
    ).length;


  const publishedCount =
    services.filter(
      (service) =>
        service.published
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
                  text-[10px]
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
                Services
              </h1>


              <p
                className="
                  mt-3
                  max-w-[760px]
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Manage both the main Services section and premium Signature
                Care section from one place.
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
                  loadServices
                }
                disabled={
                  loading
                }
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-[#001F5C]
                  transition
                  hover:border-[#0062CC]/20
                  hover:text-[#0062CC]
                  disabled:opacity-50
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
                  openAddModal
                }
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#001F5C]
                  via-[#0062CC]
                  to-[#0084E3]
                  px-5
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-white
                  shadow-[0_10px_25px_rgba(0,98,204,.18)]
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-[0_16px_35px_rgba(0,98,204,.25)]
                "
              >
                <CirclePlus
                  size={15}
                />

                Add Service
              </button>
            </div>
          </div>


          {/* STATS */}

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            <StatCard
              label="Total Services"
              value={
                services.length
              }
            />

            <StatCard
              label="Normal Care"
              value={
                normalCount
              }
            />

            <StatCard
              label="Signature Care"
              value={
                signatureCount
              }
            />

            <StatCard
              label="Published"
              value={
                publishedCount
              }
            />
          </div>


          {/* FILTER */}

          <div
            className="
              mt-7
              rounded-[22px]
              border
              border-slate-200/80
              bg-white
              p-4
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                <FilterButton
                  active={
                    filter ===
                    "all"
                  }
                  onClick={() =>
                    setFilter(
                      "all"
                    )
                  }
                >
                  All
                </FilterButton>


                <FilterButton
                  active={
                    filter ===
                    "normal"
                  }
                  onClick={() =>
                    setFilter(
                      "normal"
                    )
                  }
                >
                  Normal Care
                </FilterButton>


                <FilterButton
                  active={
                    filter ===
                    "signature"
                  }
                  onClick={() =>
                    setFilter(
                      "signature"
                    )
                  }
                >
                  Signature Care
                </FilterButton>
              </div>


              <div
                className="
                  relative
                  w-full
                  max-w-[420px]
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
                  placeholder="Search services..."
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
                    placeholder:text-slate-400
                    focus:border-[#0062CC]/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#0062CC]/[0.05]
                  "
                />
              </div>
            </div>
          </div>


          {error && (
            <div
              className="
                mt-5
                rounded-[18px]
                border
                border-red-200
                bg-red-50
                px-5
                py-4
                text-sm
                font-semibold
                text-red-600
              "
            >
              {error}
            </div>
          )}


          {/* SERVICES */}

          <div className="mt-6">
            {loading ? (
              <LoadingState />
            ) : filteredServices.length ===
              0 ? (
              <EmptyState
                onAdd={
                  openAddModal
                }
              />
            ) : (
              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {filteredServices.map(
                  (service) => (
                    <AdminServiceCard
                      key={
                        service.id
                      }
                      service={
                        service
                      }
                      loading={
                        updatingId ===
                        service.id
                      }
                      onEdit={() =>
                        openEditModal(
                          service
                        )
                      }
                      onPublish={() =>
                        togglePublish(
                          service
                        )
                      }
                      onDelete={() =>
                        handleDelete(
                          service
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


      {/* SAME POPUP FOR ADD + EDIT */}

      {modalOpen && (
        <ServiceEditorModal
          key={
            selectedService?.id ||
            "new-service"
          }
          service={
            selectedService
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
   SERVICE EDITOR MODAL
========================================================= */

function ServiceEditorModal({
  service = null,
  onClose,
  onSaved,
}) {
  const isEdit =
    Boolean(
      service?.id
    );


  const [
    form,
    setForm,
  ] = useState(
    () =>
      service
        ? createFormFromService(
            service
          )
        : {
            ...INITIAL_FORM,
          }
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
     ESCAPE + BODY LOCK
  ======================================================= */

  useEffect(() => {
    const previousOverflow =
      document.body.style
        .overflow;


    document.body.style.overflow =
      "hidden";


    function handleEscape(
      event
    ) {
      if (
        event.key ===
          "Escape" &&
        !saving
      ) {
        onClose();
      }
    }


    window.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );


      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    onClose,
    saving,
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
     SERVICE TYPE
  ======================================================= */

  function setServiceType(
    type
  ) {
    setForm(
      (current) => ({
        ...current,

        serviceType:
          type,

        iconType:
          type ===
          "signature"
            ? "emoji"
            : "lucide",

        icon:
          type ===
          "signature"
            ? isEmoji(
                current.icon
              )
              ? current.icon
              : "✨"
            : NORMAL_ICON_MAP[
                  current.icon
                ]
              ? current.icon
              : "Shirt",
      })
    );
  }


  /* =======================================================
     TITLE + SLUG
  ======================================================= */

  function handleTitleChange(
    value
  ) {
    const slug =
      generateSlug(
        value
      );


    setForm(
      (current) => ({
        ...current,

        title:
          value,

        slug:
          isEdit ||
          current.slugEdited
            ? current.slug
            : slug,

        href:
          isEdit ||
          current.slugEdited
            ? current.href
            : slug
            ? `/services/${slug}`
            : "",
      })
    );
  }


  function handleSlugChange(
    value
  ) {
    if (isEdit) {
      return;
    }


    const slug =
      generateSlug(
        value
      );


    setForm(
      (current) => ({
        ...current,

        slug,

        href:
          `/services/${slug}`,

        slugEdited:
          true,
      })
    );
  }


  /* =======================================================
     ARRAY HELPERS
  ======================================================= */

  function addArrayItem(
    field
  ) {
    setForm(
      (current) => ({
        ...current,

        [field]: [
          ...current[field],
          "",
        ],
      })
    );
  }


  function updateArrayItem(
    field,
    index,
    value
  ) {
    setForm(
      (current) => {
        const next = [
          ...current[field],
        ];


        next[index] =
          value;


        return {
          ...current,

          [field]:
            next,
        };
      }
    );
  }


  function removeArrayItem(
    field,
    index
  ) {
    setForm(
      (current) => ({
        ...current,

        [field]:
          current[
            field
          ].filter(
            (
              _,
              itemIndex
            ) =>
              itemIndex !==
              index
          ),
      })
    );
  }


  /* =======================================================
     VALIDATE
  ======================================================= */

  function validate() {
    if (
      !form.title.trim()
    ) {
      return "Service title is required.";
    }


    if (
      !form.slug.trim()
    ) {
      return "Service slug is required.";
    }


    if (
      form.serviceType ===
        "normal" &&
      !form.category.trim()
    ) {
      return "Normal Care services require a category.";
    }


    if (
      form.serviceType ===
        "signature" &&
      !form.tag.trim()
    ) {
      return "Signature Care services require a tag.";
    }


    if (
      !form.icon
    ) {
      return "Please select an icon.";
    }


    return "";
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();


    const validationError =
      validate();


    if (
      validationError
    ) {
      setError(
        validationError
      );

      return;
    }


    try {
      setSaving(true);

      setError("");


      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is missing."
        );
      }


      const payload = {
        number:
          form.number.trim(),

        serviceType:
          form.serviceType,

        title:
          form.title.trim(),

        description:
          form.description.trim(),

        category:
          form.serviceType ===
          "normal"
            ? form.category.trim()
            : "",

        tag:
          form.serviceType ===
          "signature"
            ? form.tag.trim()
            : "",

        icon:
          form.icon,

        iconType:
          form.serviceType ===
          "signature"
            ? "emoji"
            : "lucide",

        badge:
          form.badge.trim(),

        href:
          form.href.trim(),

        suitableFor:
          form.serviceType ===
          "normal"
            ? cleanStringArray(
                form.suitableFor
              )
            : [],

        includes:
          form.serviceType ===
          "normal"
            ? cleanStringArray(
                form.includes
              )
            : [],

        featured:
          form.serviceType ===
          "normal"
            ? Boolean(
                form.featured
              )
            : false,

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


      if (!isEdit) {
        payload.slug =
          form.slug.trim();
      }


      const endpoint =
        isEdit
          ? `${API_URL}/api/services/${encodeURIComponent(
              service.id
            )}`
          : `${API_URL}/api/services`;


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
            "Unable to save service."
        );
      }


      onSaved(
        result.service
      );
    } catch (error) {
      console.error(
        "Save service error:",
        error
      );


      setError(
        error.message ||
          "Unable to save service."
      );
    } finally {
      setSaving(false);
    }
  }


  /* =======================================================
     PREVIEW ICON
  ======================================================= */

  const PreviewLucideIcon =
    NORMAL_ICON_MAP[
      form.icon
    ] ||
    Sparkles;


  /* =======================================================
     MODAL
  ======================================================= */

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

      {/* BACKDROP */}

      <button
        type="button"
        aria-label="Close service editor"
        onClick={() => {
          if (!saving) {
            onClose();
          }
        }}
        className="
          absolute
          inset-0
          bg-[#000D27]/70
          backdrop-blur-sm
        "
      />


      {/* MODAL */}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-editor-title"
        className="
          relative
          z-10
          flex
          max-h-[94vh]
          w-full
          max-w-[1100px]
          flex-col
          overflow-hidden
          rounded-[30px]
          bg-white
          shadow-[0_40px_130px_rgba(0,13,39,.40)]
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            shrink-0
            items-start
            justify-between
            gap-5
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
                text-[9px]
                font-black
                uppercase
                tracking-[0.17em]
                text-[#0062CC]
              "
            >
              {isEdit
                ? "Edit Service"
                : "New Service"}
            </div>


            <h2
              id="service-editor-title"
              className="
                mt-2
                text-2xl
                font-black
                tracking-[-0.04em]
                text-[#001F5C]
              "
            >
              {isEdit
                ? service.title
                : "Add New Service"}
            </h2>


            <p
              className="
                mt-1
                max-w-[650px]
                text-xs
                leading-5
                text-slate-400
              "
            >
              Normal Care uses Lucide icons. Signature Care uses premium
              emoji icons matching your Signature Care design.
            </p>
          </div>


          <button
            type="button"
            disabled={
              saving
            }
            onClick={
              onClose
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-500
              transition
              hover:bg-red-50
              hover:text-red-500
              disabled:opacity-50
            "
          >
            <X size={17} />
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

          {/* SCROLLABLE CONTENT */}

          <div
            className="
              flex-1
              overflow-y-auto
              overscroll-contain
              px-6
              py-6
              sm:px-8
            "
          >

            {error && (
              <div
                className="
                  mb-6
                  rounded-[14px]
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-red-600
                "
              >
                {error}
              </div>
            )}


            {/* ===============================================
                DISPLAY AREA
            =============================================== */}

            <div>
              <SectionLabel>
                Display Area
              </SectionLabel>


              <div
                className="
                  mt-3
                  grid
                  gap-3
                  md:grid-cols-2
                "
              >
                <ServiceTypeCard
                  active={
                    form.serviceType ===
                    "normal"
                  }
                  title="Normal Care"
                  subtitle="Services.js"
                  description="Main soft-blue Services section. Uses Lucide icons and detailed service information."
                  onClick={() =>
                    setServiceType(
                      "normal"
                    )
                  }
                />


                <ServiceTypeCard
                  active={
                    form.serviceType ===
                    "signature"
                  }
                  signature
                  title="Signature Care"
                  subtitle="SignatureCare.js"
                  description="Premium dark section. Uses emoji icons, Signature tags and luxury service presentation."
                  onClick={() =>
                    setServiceType(
                      "signature"
                    )
                  }
                />
              </div>
            </div>


            {/* ===============================================
                BASIC INFORMATION
            =============================================== */}

            <section
              className="
                mt-7
                rounded-[22px]
                border
                border-slate-200/80
                bg-[#FAFCFF]
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  border-b
                  border-slate-200/70
                  pb-4
                "
              >
                <div>
                  <h3
                    className="
                      text-sm
                      font-black
                      text-[#001F5C]
                    "
                  >
                    Service Information
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                    "
                  >
                    Main content displayed on the public website.
                  </p>
                </div>


                {/* ICON PREVIEW */}

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-[15px]

                    ${
                      form.serviceType ===
                      "signature"
                        ? `
                          border
                          border-[#41B6FF]/20
                          bg-[#001F5C]
                          text-[1.65rem]
                        `
                        : `
                          bg-[#EEF6FF]
                          text-[#0062CC]
                        `
                    }
                  `}
                >
                  {form.serviceType ===
                  "signature" ? (
                    form.icon ||
                    "✨"
                  ) : (
                    <PreviewLucideIcon
                      size={19}
                    />
                  )}
                </div>
              </div>


              <div
                className="
                  mt-5
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >
                <Input
                  label="Service Title"
                  value={
                    form.title
                  }
                  onChange={(
                    event
                  ) =>
                    handleTitleChange(
                      event.target
                        .value
                    )
                  }
                  placeholder={
                    form.serviceType ===
                    "signature"
                      ? "Luxury Shoe & Bag Care"
                      : "Wash, Dry & Iron"
                  }
                  required
                />


                <Input
                  label="Slug"
                  value={
                    form.slug
                  }
                  disabled={
                    isEdit
                  }
                  onChange={(
                    event
                  ) =>
                    handleSlugChange(
                      event.target
                        .value
                    )
                  }
                  placeholder="luxury-shoe-bag-care"
                  required
                  helper={
                    isEdit
                      ? "Slug is locked because it is the Firestore document ID."
                      : "Used for the Firestore document ID and service URL."
                  }
                />


                {form.serviceType ===
                  "normal" && (
                  <Input
                    label="Service Number"
                    value={
                      form.number
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "number",
                        event.target
                          .value
                      )
                    }
                    placeholder="01"
                  />
                )}


                {form.serviceType ===
                  "normal" && (
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
                    placeholder="Everyday Care"
                    required
                  />
                )}


                {form.serviceType ===
                  "signature" && (
                  <Input
                    label="Signature Tag"
                    value={
                      form.tag
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "tag",
                        event.target
                          .value
                      )
                    }
                    placeholder="Premium Restoration"
                    required
                    helper="Displayed above the Signature Care service name."
                  />
                )}


                {form.serviceType ===
                  "normal" && (
                  <Input
                    label="Badge"
                    value={
                      form.badge
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "badge",
                        event.target
                          .value
                      )
                    }
                    placeholder="1 Hour Service"
                  />
                )}


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


                <Input
                  label="Service Page Link"
                  value={
                    form.href
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "href",
                      event.target
                        .value
                    )
                  }
                  placeholder="/services/dry-cleaning"
                  helper="Can be used when a dedicated service page is available."
                />
              </div>


              <div className="mt-4">
                <Textarea
                  label="Description"
                  value={
                    form.description
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "description",
                      event.target
                        .value
                    )
                  }
                  placeholder={
                    form.serviceType ===
                    "signature"
                      ? "Deep cleaning, conditioning and restoration for luxury items..."
                      : "Professional cleaning and finishing for daily wear..."
                  }
                />
              </div>
            </section>


            {/* ===============================================
                NORMAL CARE ICON PICKER
            =============================================== */}

            {form.serviceType ===
              "normal" && (
              <section
                className="
                  mt-5
                  rounded-[22px]
                  border
                  border-slate-200/80
                  bg-white
                  p-5
                "
              >
                <div>
                  <h3
                    className="
                      text-sm
                      font-black
                      text-[#001F5C]
                    "
                  >
                    Service Icon
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-400
                    "
                  >
                    Lucide icon displayed on the normal service card.
                  </p>
                </div>


                <div
                  className="
                    mt-4
                    grid
                    grid-cols-3
                    gap-2
                    sm:grid-cols-4
                    lg:grid-cols-6
                  "
                >
                  {NORMAL_ICON_OPTIONS.map(
                    (option) => {
                      const Icon =
                        option.icon;


                      const selected =
                        form.icon ===
                        option.value;


                      return (
                        <button
                          key={
                            option.value
                          }
                          type="button"
                          onClick={() =>
                            updateField(
                              "icon",
                              option.value
                            )
                          }
                          className={`
                            flex
                            min-h-[82px]
                            flex-col
                            items-center
                            justify-center
                            gap-2
                            rounded-[14px]
                            border
                            px-2
                            transition

                            ${
                              selected
                                ? `
                                  border-[#0062CC]
                                  bg-[#EEF6FF]
                                  text-[#0062CC]
                                `
                                : `
                                  border-slate-200
                                  bg-[#FAFCFF]
                                  text-slate-400
                                  hover:border-[#0062CC]/20
                                  hover:text-[#0062CC]
                                `
                            }
                          `}
                        >
                          <Icon
                            size={18}
                          />

                          <span
                            className="
                              text-[8px]
                              font-black
                              uppercase
                              tracking-[0.07em]
                            "
                          >
                            {
                              option.label
                            }
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              </section>
            )}


            {/* ===============================================
                SIGNATURE EMOJI PICKER
            =============================================== */}

            {form.serviceType ===
              "signature" && (
              <SignatureEmojiPicker
                value={
                  form.icon
                }
                onChange={(
                  emoji
                ) =>
                  updateField(
                    "icon",
                    emoji
                  )
                }
              />
            )}


            {/* ===============================================
                NORMAL DETAILS ONLY
            =============================================== */}

            {form.serviceType ===
              "normal" && (
              <div
                className="
                  mt-5
                  grid
                  gap-5
                  lg:grid-cols-2
                "
              >
                <ArrayEditor
                  title="Suitable For"
                  description="Garments, customers or use cases this service is suited for."
                  items={
                    form.suitableFor
                  }
                  placeholder="e.g. Office wear"
                  onAdd={() =>
                    addArrayItem(
                      "suitableFor"
                    )
                  }
                  onUpdate={(
                    index,
                    value
                  ) =>
                    updateArrayItem(
                      "suitableFor",
                      index,
                      value
                    )
                  }
                  onRemove={(
                    index
                  ) =>
                    removeArrayItem(
                      "suitableFor",
                      index
                    )
                  }
                />


                <ArrayEditor
                  title="Service Includes"
                  description="Processing steps or treatments included in this service."
                  items={
                    form.includes
                  }
                  placeholder="e.g. Steam ironing"
                  onAdd={() =>
                    addArrayItem(
                      "includes"
                    )
                  }
                  onUpdate={(
                    index,
                    value
                  ) =>
                    updateArrayItem(
                      "includes",
                      index,
                      value
                    )
                  }
                  onRemove={(
                    index
                  ) =>
                    removeArrayItem(
                      "includes",
                      index
                    )
                  }
                />
              </div>
            )}


            {/* ===============================================
                VISIBILITY
            =============================================== */}

            <section
              className="
                mt-5
                rounded-[22px]
                border
                border-slate-200/80
                bg-white
                p-5
              "
            >
              <h3
                className="
                  text-sm
                  font-black
                  text-[#001F5C]
                "
              >
                Visibility
              </h3>


              <p
                className="
                  mt-1
                  text-[11px]
                  text-slate-400
                "
              >
                Control where and how this service appears.
              </p>


              <div
                className={`
                  mt-4
                  grid
                  gap-3

                  ${
                    form.serviceType ===
                    "normal"
                      ? "sm:grid-cols-2"
                      : "sm:grid-cols-1"
                  }
                `}
              >
                {form.serviceType ===
                  "normal" && (
                  <Toggle
                    label="Featured Service"
                    description="Display this service in the larger featured cards."
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
                )}


                <Toggle
                  label="Published"
                  description={
                    form.serviceType ===
                    "signature"
                      ? "Show this item inside Signature Care."
                      : "Show this service inside the main Services section."
                  }
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
              shrink-0
              items-center
              justify-between
              gap-3
              border-t
              border-slate-100
              bg-white
              px-6
              py-4
              sm:px-8
            "
          >
            <div
              className="
                hidden
                sm:block
              "
            >
              <div
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-slate-400
                "
              >
                {form.serviceType ===
                "signature"
                  ? "Signature Care"
                  : "Normal Care"}
              </div>


              {isEdit && (
                <div
                  className="
                    mt-1
                    text-[10px]
                    text-slate-400
                  "
                >
                  {service.id}
                </div>
              )}
            </div>


            <div
              className="
                ml-auto
                flex
                gap-3
              "
            >
              <button
                type="button"
                onClick={
                  onClose
                }
                disabled={
                  saving
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                  transition
                  hover:bg-slate-50
                  disabled:opacity-50
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
                  min-w-[145px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#001F5C]
                  via-[#0062CC]
                  to-[#0084E3]
                  px-6
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-white
                  shadow-[0_10px_28px_rgba(0,98,204,.20)]
                  transition
                  hover:-translate-y-0.5
                  disabled:cursor-not-allowed
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
                  : "Add Service"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}


/* =========================================================
   SIGNATURE EMOJI PICKER
========================================================= */

function SignatureEmojiPicker({
  value,
  onChange,
}) {
  return (
    <section
      className="
        mt-5
        overflow-hidden
        rounded-[22px]
        border
        border-[#001F5C]/10
        bg-[#001F5C]
        p-5
      "
    >
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
              tracking-[0.17em]
              text-[#41B6FF]
            "
          >
            Signature Care
          </div>


          <h3
            className="
              mt-2
              text-sm
              font-black
              text-white
            "
          >
            Choose Emoji
          </h3>


          <p
            className="
              mt-1
              text-[11px]
              leading-5
              text-white/45
            "
          >
            These icons match the visual style used in your Signature Care
            cards.
          </p>
        </div>


        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-[18px]
            border
            border-[#41B6FF]/15
            bg-gradient-to-br
            from-[#0062CC]/30
            via-[#0084E3]/25
            to-[#41B6FF]/15
            text-[2rem]
          "
        >
          {value || "✨"}
        </div>
      </div>


      <div
        className="
          mt-6
          max-h-[380px]
          space-y-6
          overflow-y-auto
          pr-2
        "
      >
        {SIGNATURE_EMOJIS.map(
          (group) => (
            <div
              key={
                group.category
              }
            >
              <div
                className="
                  mb-3
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[#41B6FF]/70
                "
              >
                {group.category}
              </div>


              <div
                className="
                  grid
                  grid-cols-7
                  gap-2
                  sm:grid-cols-10
                  lg:grid-cols-13
                "
              >
                {group.emojis.map(
                  (emoji) => {
                    const selected =
                      value ===
                      emoji;


                    return (
                      <button
                        key={
                          emoji
                        }
                        type="button"
                        onClick={() =>
                          onChange(
                            emoji
                          )
                        }
                        className={`
                          flex
                          aspect-square
                          items-center
                          justify-center
                          rounded-xl
                          border
                          text-[1.35rem]
                          transition-all

                          ${
                            selected
                              ? `
                                scale-105
                                border-[#41B6FF]
                                bg-[#0084E3]/30
                                shadow-[0_0_20px_rgba(65,182,255,.18)]
                              `
                              : `
                                border-white/[0.06]
                                bg-white/[0.04]
                                hover:border-[#41B6FF]/30
                                hover:bg-white/[0.08]
                              `
                          }
                        `}
                      >
                        {emoji}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}


/* =========================================================
   ADMIN SERVICE CARD
========================================================= */

function AdminServiceCard({
  service,
  loading,
  onEdit,
  onPublish,
  onDelete,
}) {
  const signature =
    service.serviceType ===
    "signature";


  const Icon =
    NORMAL_ICON_MAP[
      service.icon
    ] ||
    Sparkles;


  return (
    <article
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_10px_35px_rgba(15,23,42,.035)]
        transition-all
        duration-300
        hover:border-[#0062CC]/15
        hover:shadow-[0_18px_50px_rgba(0,31,92,.07)]
      "
    >
      <div className="p-5">

        {/* ICON + BADGES */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <div
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-[14px]

              ${
                signature
                  ? `
                    border
                    border-[#41B6FF]/15
                    bg-[#001F5C]
                    text-[1.45rem]
                  `
                  : `
                    bg-[#EEF6FF]
                    text-[#0062CC]
                  `
              }
            `}
          >
            {signature ? (
              service.icon ||
              "✨"
            ) : (
              <Icon
                size={17}
              />
            )}
          </div>


          <div
            className="
              flex
              flex-wrap
              justify-end
              gap-2
            "
          >
            <span
              className={`
                rounded-full
                px-3
                py-1.5
                text-[7px]
                font-black
                uppercase
                tracking-[0.11em]

                ${
                  signature
                    ? `
                      bg-[#001F5C]
                      text-[#41B6FF]
                    `
                    : `
                      bg-[#EEF6FF]
                      text-[#0062CC]
                    `
                }
              `}
            >
              {signature
                ? "Signature Care"
                : "Normal Care"}
            </span>


            <span
              className={`
                rounded-full
                px-3
                py-1.5
                text-[7px]
                font-black
                uppercase
                tracking-[0.11em]

                ${
                  service.published
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
              {service.published
                ? "Published"
                : "Draft"}
            </span>
          </div>
        </div>


        {/* META */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
          "
        >
          {!signature &&
            service.number && (
              <>
                <span
                  className="
                    text-[8px]
                    font-black
                    text-slate-300
                  "
                >
                  {
                    service.number
                  }
                </span>

                <span
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-slate-300
                  "
                />
              </>
            )}


          <span
            className="
              text-[8px]
              font-black
              uppercase
              tracking-[0.15em]
              text-[#0084E3]
            "
          >
            {signature
              ? service.tag ||
                "Signature Care"
              : service.category ||
                "Service"}
          </span>
        </div>


        {/* TITLE */}

        <h2
          className="
            mt-2
            text-[1.15rem]
            font-black
            leading-[1.2]
            tracking-[-0.035em]
            text-[#001F5C]
          "
        >
          {service.title}
        </h2>


        {/* DESCRIPTION */}

        <p
          className="
            mt-3
            line-clamp-2
            min-h-[40px]
            text-xs
            leading-5
            text-slate-500
          "
        >
          {service.description ||
            "No description added."}
        </p>


        {/* META BADGES */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            gap-2
          "
        >
          <span
            className="
              rounded-full
              bg-slate-100
              px-3
              py-1.5
              text-[7px]
              font-black
              uppercase
              tracking-[0.11em]
              text-slate-500
            "
          >
            Order{" "}
            {service.order ??
              0}
          </span>


          {!signature &&
            service.featured && (
              <span
                className="
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1.5
                  text-[7px]
                  font-black
                  uppercase
                  tracking-[0.11em]
                  text-[#0062CC]
                "
              >
                Featured
              </span>
            )}


          {service.badge && (
            <span
              className="
                rounded-full
                bg-violet-50
                px-3
                py-1.5
                text-[7px]
                font-black
                uppercase
                tracking-[0.11em]
                text-violet-600
              "
            >
              {
                service.badge
              }
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
          className={`
            flex
            min-h-[48px]
            items-center
            justify-center
            gap-2
            px-4
            text-[9px]
            font-black
            uppercase
            tracking-[0.11em]
            transition
            disabled:opacity-50

            ${
              service.published
                ? `
                  text-slate-500
                  hover:bg-slate-50
                `
                : `
                  text-[#0062CC]
                  hover:bg-blue-50
                `
            }
          `}
        >
          {loading ? (
            <Loader2
              size={14}
              className="animate-spin"
            />
          ) : service.published ? (
            <EyeOff
              size={14}
            />
          ) : (
            <Eye
              size={14}
            />
          )}


          {service.published
            ? "Unpublish"
            : "Publish"}
        </button>


        <button
          type="button"
          disabled={
            loading
          }
          onClick={
            onEdit
          }
          aria-label={`Edit ${service.title}`}
          className="
            flex
            w-12
            items-center
            justify-center
            border-l
            border-slate-100
            text-slate-400
            transition
            hover:bg-blue-50
            hover:text-[#0062CC]
            disabled:opacity-50
          "
        >
          <Pencil
            size={14}
          />
        </button>


        <button
          type="button"
          disabled={
            loading
          }
          onClick={
            onDelete
          }
          aria-label={`Delete ${service.title}`}
          className="
            flex
            w-12
            items-center
            justify-center
            border-l
            border-slate-100
            text-slate-400
            transition
            hover:bg-red-50
            hover:text-red-500
            disabled:opacity-50
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
   SERVICE TYPE CARD
========================================================= */

function ServiceTypeCard({
  active,
  signature = false,
  title,
  subtitle,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className={`
        relative
        overflow-hidden
        rounded-[18px]
        border
        p-5
        text-left
        transition-all
        duration-300

        ${
          active
            ? signature
              ? `
                border-[#001F5C]
                bg-[#001F5C]
                shadow-[0_15px_40px_rgba(0,31,92,.18)]
              `
              : `
                border-[#0062CC]
                bg-[#EEF6FF]
                shadow-[0_12px_35px_rgba(0,98,204,.08)]
              `
            : `
              border-slate-200
              bg-white
              hover:border-[#0062CC]/25
            `
        }
      `}
    >
      {active && (
        <div
          className={`
            absolute
            right-4
            top-4
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            text-[9px]
            font-black

            ${
              signature
                ? `
                  bg-[#41B6FF]
                  text-[#001F5C]
                `
                : `
                  bg-[#0062CC]
                  text-white
                `
            }
          `}
        >
          ✓
        </div>
      )}


      <div
        className={`
          text-[8px]
          font-black
          uppercase
          tracking-[0.15em]

          ${
            active &&
            signature
              ? "text-[#41B6FF]"
              : "text-[#0084E3]"
          }
        `}
      >
        {subtitle}
      </div>


      <div
        className={`
          mt-2
          text-[1rem]
          font-black

          ${
            active &&
            signature
              ? "text-white"
              : "text-[#001F5C]"
          }
        `}
      >
        {title}
      </div>


      <p
        className={`
          mt-2
          max-w-[420px]
          text-xs
          leading-5

          ${
            active &&
            signature
              ? "text-white/55"
              : "text-slate-400"
          }
        `}
      >
        {description}
      </p>
    </button>
  );
}


/* =========================================================
   ARRAY EDITOR
========================================================= */

function ArrayEditor({
  title,
  description,
  items,
  placeholder,
  onAdd,
  onUpdate,
  onRemove,
}) {
  return (
    <section
      className="
        rounded-[22px]
        border
        border-slate-200/80
        bg-white
        p-5
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-black
              text-[#001F5C]
            "
          >
            {title}
          </h3>


          <p
            className="
              mt-1
              text-[11px]
              leading-5
              text-slate-400
            "
          >
            {description}
          </p>
        </div>


        <button
          type="button"
          onClick={
            onAdd
          }
          className="
            inline-flex
            h-9
            shrink-0
            items-center
            gap-1.5
            rounded-lg
            bg-[#EEF6FF]
            px-3
            text-[8px]
            font-black
            uppercase
            tracking-[0.1em]
            text-[#0062CC]
          "
        >
          <Plus size={12} />

          Add
        </button>
      </div>


      <div
        className="
          mt-4
          space-y-2
        "
      >
        {items.length ===
        0 ? (
          <button
            type="button"
            onClick={
              onAdd
            }
            className="
              w-full
              rounded-xl
              border
              border-dashed
              border-slate-200
              px-4
              py-7
              text-xs
              font-semibold
              text-slate-400
              transition
              hover:border-[#0062CC]/25
              hover:text-[#0062CC]
            "
          >
            + Add first item
          </button>
        ) : (
          items.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  index
                }
                className="
                  flex
                  gap-2
                "
              >
                <input
                  value={
                    item
                  }
                  onChange={(
                    event
                  ) =>
                    onUpdate(
                      index,
                      event.target
                        .value
                    )
                  }
                  placeholder={
                    placeholder
                  }
                  className="
                    h-10
                    flex-1
                    rounded-lg
                    border
                    border-slate-200
                    bg-[#FAFCFF]
                    px-3
                    text-xs
                    text-[#001F5C]
                    outline-none
                    focus:border-[#0062CC]/30
                    focus:bg-white
                  "
                />


                <button
                  type="button"
                  onClick={() =>
                    onRemove(
                      index
                    )
                  }
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    text-slate-400
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-500
                  "
                >
                  <Trash2
                    size={13}
                  />
                </button>
              </div>
            )
          )
        )}
      </div>
    </section>
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
        gap-5
        rounded-[18px]
        border
        border-slate-200
        bg-[#FAFCFF]
        p-4
        text-left
        transition
        hover:border-[#0062CC]/20
      "
    >
      <div>
        <div
          className="
            text-sm
            font-black
            text-[#001F5C]
          "
        >
          {label}
        </div>

        <div
          className="
            mt-1
            text-[11px]
            leading-5
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
            shadow
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
   INPUT
========================================================= */

function Input({
  label,
  helper,
  disabled,
  ...props
}) {
  return (
    <label className="block">
      <SectionLabel>
        {label}
      </SectionLabel>


      <input
        {...props}
        disabled={
          disabled
        }
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
          transition
          placeholder:text-slate-400
          focus:border-[#0062CC]/30
          focus:ring-4
          focus:ring-[#0062CC]/[0.05]
          disabled:cursor-not-allowed
          disabled:bg-slate-100
          disabled:text-slate-400
        "
      />


      {helper && (
        <span
          className="
            mt-1.5
            block
            text-[10px]
            leading-4
            text-slate-400
          "
        >
          {helper}
        </span>
      )}
    </label>
  );
}


/* =========================================================
   TEXTAREA
========================================================= */

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
        rows={4}
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
          transition
          placeholder:text-slate-400
          focus:border-[#0062CC]/30
          focus:ring-4
          focus:ring-[#0062CC]/[0.05]
        "
      />
    </label>
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
        text-[9px]
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
   FILTER
========================================================= */

function FilterButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className={`
        rounded-xl
        px-4
        py-2.5
        text-[9px]
        font-black
        uppercase
        tracking-[0.11em]
        transition

        ${
          active
            ? `
              bg-[#001F5C]
              text-white
            `
            : `
              bg-slate-100
              text-slate-500
              hover:bg-blue-50
              hover:text-[#0062CC]
            `
        }
      `}
    >
      {children}
    </button>
  );
}


/* =========================================================
   STAT
========================================================= */

function StatCard({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[20px]
        border
        border-slate-200/80
        bg-white
        px-5
        py-4
      "
    >
      <div
        className="
          text-[9px]
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
          tracking-[-0.04em]
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
        rounded-[24px]
        border
        border-slate-200
        bg-white
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          text-sm
          font-bold
          text-slate-400
        "
      >
        <Loader2
          size={20}
          className="
            animate-spin
            text-[#0062CC]
          "
        />

        Loading services...
      </div>
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
        rounded-[26px]
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-16
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-[#EEF6FF]
          text-[#0062CC]
        "
      >
        <Sparkles
          size={22}
        />
      </div>


      <h2
        className="
          mt-5
          text-xl
          font-black
          text-[#001F5C]
        "
      >
        No services found
      </h2>


      <p
        className="
          mx-auto
          mt-2
          max-w-md
          text-sm
          leading-6
          text-slate-500
        "
      >
        Create your first Normal Care or Signature Care service.
      </p>


      <button
        type="button"
        onClick={
          onAdd
        }
        className="
          mt-6
          inline-flex
          h-11
          items-center
          gap-2
          rounded-xl
          bg-[#0062CC]
          px-5
          text-[9px]
          font-black
          uppercase
          tracking-[0.12em]
          text-white
        "
      >
        <CirclePlus
          size={14}
        />

        Add Service
      </button>
    </div>
  );
}


/* =========================================================
   HELPERS
========================================================= */

function generateSlug(
  value
) {
  return String(
    value || ""
  )
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}


function cleanStringArray(
  items
) {
  if (
    !Array.isArray(
      items
    )
  ) {
    return [];
  }


  return items
    .map(
      (item) =>
        String(
          item || ""
        ).trim()
    )
    .filter(
      Boolean
    );
}


function sortServices(
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


function isEmoji(
  value
) {
  if (
    !value ||
    NORMAL_ICON_MAP[value]
  ) {
    return false;
  }

  return true;
}


function createFormFromService(
  service
) {
  const serviceType =
    service.serviceType ===
    "signature"
      ? "signature"
      : "normal";


  return {
    slug:
      service.slug ||
      service.id ||
      "",

    number:
      service.number ||
      "",

    serviceType,

    title:
      service.title ||
      service.name ||
      "",

    description:
      service.description ||
      service.desc ||
      "",

    category:
      service.category ||
      "",

    tag:
      service.tag ||
      "",

    icon:
      service.icon ||
      (
        serviceType ===
        "signature"
          ? "✨"
          : "Shirt"
      ),

    iconType:
      serviceType ===
      "signature"
        ? "emoji"
        : "lucide",

    badge:
      service.badge ||
      "",

    href:
      service.href ||
      "",

    suitableFor:
      Array.isArray(
        service.suitableFor
      )
        ? [
            ...service.suitableFor,
          ]
        : [],

    includes:
      Array.isArray(
        service.includes
      )
        ? [
            ...service.includes,
          ]
        : [],

    featured:
      Boolean(
        service.featured
      ),

    published:
      Boolean(
        service.published
      ),

    order:
      Number(
        service.order ||
        0
      ),

    slugEdited:
      true,
  };
}