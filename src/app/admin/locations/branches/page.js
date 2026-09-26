"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Building2,
  Edit3,
  MapPin,
  Plus,
  Search,
  Store,
  Trash2,
} from "lucide-react";

import PhotoUploader from "@/components/admin/locations/PhotoUploader";

import {
  Field,
  inputClass,
  LocationMetric,
  LocationPage,
  Modal,
  textareaClass,
} from "@/components/admin/locations/LocationUI";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";


/* =========================================================
   EMPTY LOCATION
========================================================= */

const EMPTY_BRANCH = {
  locationType:
    "branch",

  name:
    "",

  shortName:
    "",

  slug:
    "",

  address:
    "",

  district:
    "",

  province:
    "",

  latitude:
    "",

  longitude:
    "",

  googleMapUrl:
    "",

  phone:
    "",

  secondaryPhone:
    "",

  whatsapp:
    "",

  email:
    "",

  description:
    "",

  services:
    [],

  openingHours: {
    monday:
      "",

    tuesday:
      "",

    wednesday:
      "",

    thursday:
      "",

    friday:
      "",

    saturday:
      "",

    sunday:
      "",
  },

  coverImage:
    null,

  gallery:
    [],

  active:
    true,

  featured:
    false,
};


const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];


/* =========================================================
   PAGE
========================================================= */

export default function BranchesPage() {
  const [
    branches,
    setBranches,
  ] =
    useState([]);


  const [
    search,
    setSearch,
  ] =
    useState("");


  const [
    form,
    setForm,
  ] =
    useState(
      EMPTY_BRANCH
    );


  const [
    modalOpen,
    setModalOpen,
  ] =
    useState(false);


  const [
    editingId,
    setEditingId,
  ] =
    useState(null);


  const [
    saving,
    setSaving,
  ] =
    useState(false);


  /* =======================================================
     LOAD LOCATIONS
  ======================================================= */

  async function loadBranches() {
    try {
      const response =
        await fetch(
          `${API_URL}/api/locations/branches`,
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
        response.ok
      ) {
        setBranches(
          result.data
            ?.branches ||
          []
        );
      }
    } catch (error) {
      console.error(
        "Failed to load locations:",
        error
      );
    }
  }


  useEffect(() => {
    loadBranches();
  }, []);


  /* =======================================================
     FILTER
  ======================================================= */

  const filtered =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase();


        if (!query) {
          return branches;
        }


        return branches.filter(
          (branch) =>
            [
              branch.name,
              branch.shortName,
              branch.address,
              branch.district,
              branch.province,
              branch.locationType,
            ]
              .filter(Boolean)
              .some(
                (value) =>
                  String(value)
                    .toLowerCase()
                    .includes(
                      query
                    )
              )
        );
      },
      [
        branches,
        search,
      ]
    );


  /* =======================================================
     COUNTS
  ======================================================= */

  const totalBranches =
    branches.filter(
      (location) =>
        (
          location.locationType ||
          "branch"
        ) === "branch"
    ).length;


  const totalOutlets =
    branches.filter(
      (location) =>
        location.locationType ===
        "outlet"
    ).length;


  const activeLocations =
    branches.filter(
      (location) =>
        location.active
    ).length;


  const districtCount =
    new Set(
      branches
        .map(
          (location) =>
            location.district
        )
        .filter(Boolean)
    ).size;


  /* =======================================================
     OPEN ADD
  ======================================================= */

  function openAdd() {
    setEditingId(
      null
    );


    setForm({
      ...EMPTY_BRANCH,

      openingHours: {
        ...EMPTY_BRANCH
          .openingHours,
      },

      services:
        [],

      gallery:
        [],
    });


    setModalOpen(
      true
    );
  }


  /* =======================================================
     OPEN EDIT
  ======================================================= */

  function openEdit(
    branch
  ) {
    setEditingId(
      branch.id
    );


    setForm({
      ...EMPTY_BRANCH,
      ...branch,

      locationType:
        branch.locationType ||
        "branch",

      openingHours: {
        ...EMPTY_BRANCH
          .openingHours,

        ...branch
          .openingHours,
      },

      services:
        Array.isArray(
          branch.services
        )
          ? branch.services
          : [],

      gallery:
        Array.isArray(
          branch.gallery
        )
          ? branch.gallery
          : [],
    });


    setModalOpen(
      true
    );
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function saveBranch(
    event
  ) {
    event.preventDefault();


    try {
      setSaving(
        true
      );


      const payload = {
        ...form,

        locationType:
          form.locationType ===
          "outlet"
            ? "outlet"
            : "branch",
      };


      const url =
        editingId
          ? `${API_URL}/api/locations/branches/${editingId}`
          : `${API_URL}/api/locations/branches`;


      const response =
        await fetch(
          url,
          {
            method:
              editingId
                ? "PATCH"
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
        !response.ok
      ) {
        throw new Error(
          result.message ||
          "Failed to save location."
        );
      }


      setModalOpen(
        false
      );


      await loadBranches();
    } catch (error) {
      alert(
        error.message
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  /* =======================================================
     DELETE
  ======================================================= */

  async function deleteBranch(
    branch
  ) {
    const typeLabel =
      (
        branch.locationType ||
        "branch"
      ) === "outlet"
        ? "outlet"
        : "branch";


    if (
      !window.confirm(
        `Delete ${branch.name} ${typeLabel}?\n\nThis will also delete its managers, team members and stored images.`
      )
    ) {
      return;
    }


    try {
      const response =
        await fetch(
          `${API_URL}/api/locations/branches/${branch.id}`,
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
        !response.ok
      ) {
        alert(
          result.message ||
          "Delete failed."
        );

        return;
      }


      await loadBranches();
    } catch (error) {
      alert(
        error.message ||
        "Delete failed."
      );
    }
  }


  /* =======================================================
     CURRENT TYPE
  ======================================================= */

  const currentTypeLabel =
    form.locationType ===
    "outlet"
      ? "Outlet"
      : "Branch";


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <LocationPage
      eyebrow="Locations"

      title="Branches & Outlets"

      description="Manage every Rapid Laundromat branch and outlet, including location information, opening hours, contact details, services and media."

      action={
        <button
          type="button"

          onClick={
            openAdd
          }

          className="flex h-11 items-center gap-2 rounded-xl bg-[#00195f] px-5 text-[10px] font-black text-white transition hover:bg-[#0060d0]"
        >
          <Plus
            size={14}
          />

          Add Branch / Outlet
        </button>
      }
    >

      {/* ===================================================
          METRICS
      =================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <LocationMetric
          label="Total Locations"
          value={
            branches.length
          }
        />


        <LocationMetric
          label="Branches"
          value={
            totalBranches
          }
        />


        <LocationMetric
          label="Outlets"
          value={
            totalOutlets
          }
        />


        <LocationMetric
          label="Active"
          value={
            activeLocations
          }
        />


        <LocationMetric
          label="Districts"
          value={
            districtCount
          }
        />

      </div>


      {/* ===================================================
          SEARCH + CARDS
      =================================================== */}

      <div className="rounded-[24px] border border-slate-200 bg-white p-5">

        <div className="relative">

          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />


          <input
            value={
              search
            }

            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }

            placeholder="Search location, branch, outlet, district, address..."

            className={`${inputClass} pl-11`}
          />

        </div>


        <div className="mt-5 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">

          {filtered.map(
            (
              branch
            ) => {

              const locationType =
                branch.locationType ||
                "branch";


              const isOutlet =
                locationType ===
                "outlet";


              return (
                <div
                  key={
                    branch.id
                  }

                  className="overflow-hidden rounded-[22px] border border-slate-200 bg-white"
                >

                  {/* =========================================
                      IMAGE
                  ========================================= */}

                  <div className="relative aspect-[16/9] bg-slate-100">

                    {branch
                      .coverImage
                      ?.url ? (

                      <img
                        src={
                          branch
                            .coverImage
                            .url
                        }

                        alt={
                          `${branch.name} ${
                            isOutlet
                              ? "outlet"
                              : "branch"
                          }`
                        }

                        loading="lazy"

                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-slate-300">

                        {isOutlet ? (
                          <Store
                            size={32}
                          />
                        ) : (
                          <Building2
                            size={32}
                          />
                        )}

                      </div>

                    )}


                    {/* =======================================
                        BADGES
                    ======================================= */}

                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-[8px]
                          font-black
                          uppercase

                          ${
                            isOutlet
                              ? "bg-violet-600 text-white"
                              : "bg-[#0060d0] text-white"
                          }
                        `}
                      >
                        {
                          isOutlet
                            ? "Outlet"
                            : "Branch"
                        }
                      </span>


                      <span
                        className={`rounded-full px-3 py-1 text-[8px] font-black uppercase ${
                          branch.active
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {
                          branch.active
                            ? "Active"
                            : "Inactive"
                        }
                      </span>

                    </div>

                  </div>


                  {/* =========================================
                      CARD CONTENT
                  ========================================= */}

                  <div className="p-5">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <div className="text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
                          {
                            isOutlet
                              ? "Rapid Outlet"
                              : "Rapid Branch"
                          }
                        </div>


                        <h3 className="mt-1 truncate text-base font-black text-[#071b3d]">
                          {
                            branch.name
                          }
                        </h3>

                      </div>


                      <div
                        className={`
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl

                          ${
                            isOutlet
                              ? "bg-violet-50 text-violet-600"
                              : "bg-blue-50 text-[#0060d0]"
                          }
                        `}
                      >
                        {isOutlet ? (
                          <Store
                            size={16}
                          />
                        ) : (
                          <Building2
                            size={16}
                          />
                        )}
                      </div>

                    </div>


                    <div className="mt-2 flex items-start gap-2 text-[10px] leading-5 text-slate-400">

                      <MapPin
                        size={12}
                        className="mt-1 shrink-0"
                      />

                      <span>
                        {
                          branch.address ||
                          branch.district ||
                          "No address"
                        }
                      </span>

                    </div>


                    <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">

                      <button
                        type="button"

                        onClick={() =>
                          openEdit(
                            branch
                          )
                        }

                        className="flex h-9 items-center gap-2 rounded-xl bg-blue-50 px-4 text-[9px] font-black text-[#0060d0] transition hover:bg-blue-100"
                      >
                        <Edit3
                          size={12}
                        />

                        Edit
                      </button>


                      <button
                        type="button"

                        onClick={() =>
                          deleteBranch(
                            branch
                          )
                        }

                        className="flex h-9 items-center gap-2 rounded-xl bg-red-50 px-4 text-[9px] font-black text-red-500 transition hover:bg-red-100"
                      >
                        <Trash2
                          size={12}
                        />

                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </div>


      {/* ===================================================
          MODAL
      =================================================== */}

      {modalOpen && (

        <Modal
          title={
            editingId
              ? `Edit ${currentTypeLabel}`
              : "Add Branch / Outlet"
          }

          subtitle="Manage branch or outlet information, location, contact details, opening hours, services and media."

          close={() =>
            setModalOpen(
              false
            )
          }
        >

          <form
            onSubmit={
              saveBranch
            }

            className="space-y-8"
          >

            {/* =============================================
                BASIC INFORMATION
            ============================================= */}

            <FormSection
              title="Basic Information"
            >

              {/* ===========================================
                  LOCATION TYPE
              =========================================== */}

              <Field
                label="Location Type"
                required
              >

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"

                    onClick={() =>
                      setForm({
                        ...form,

                        locationType:
                          "branch",
                      })
                    }

                    className={`
                      flex
                      h-12
                      items-center
                      justify-center
                      gap-2

                      rounded-xl
                      border

                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.08em]

                      transition-all

                      ${
                        form.locationType ===
                        "branch"
                          ? "border-[#0060d0] bg-[#0060d0] text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-[#0060d0]/30 hover:bg-blue-50"
                      }
                    `}
                  >
                    <Building2
                      size={15}
                    />

                    Branch
                  </button>


                  <button
                    type="button"

                    onClick={() =>
                      setForm({
                        ...form,

                        locationType:
                          "outlet",
                      })
                    }

                    className={`
                      flex
                      h-12
                      items-center
                      justify-center
                      gap-2

                      rounded-xl
                      border

                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.08em]

                      transition-all

                      ${
                        form.locationType ===
                        "outlet"
                          ? "border-violet-600 bg-violet-600 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:bg-violet-50"
                      }
                    `}
                  >
                    <Store
                      size={15}
                    />

                    Outlet
                  </button>

                </div>

              </Field>


              <div className="grid gap-4 md:grid-cols-3">

                <Field
                  label={`${currentTypeLabel} Name`}
                  required
                >
                  <input
                    required

                    value={
                      form.name
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        name:
                          event
                            .target
                            .value,
                      })
                    }

                    placeholder={`Rapid Laundromat ${currentTypeLabel} Name`}

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="Short Name"
                >
                  <input
                    value={
                      form.shortName
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        shortName:
                          event
                            .target
                            .value,
                      })
                    }

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="URL Slug"
                >
                  <input
                    value={
                      form.slug
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        slug:
                          event
                            .target
                            .value,
                      })
                    }

                    placeholder="kandy"

                    className={
                      inputClass
                    }
                  />
                </Field>

              </div>


              <Field
                label="Description"
              >
                <textarea
                  rows={4}

                  value={
                    form.description
                  }

                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,

                      description:
                        event
                          .target
                          .value,
                    })
                  }

                  className={
                    textareaClass
                  }
                />
              </Field>

            </FormSection>


            {/* =============================================
                LOCATION
            ============================================= */}

            <FormSection
              title="Location"
            >

              <Field
                label="Address"
              >
                <textarea
                  rows={3}

                  value={
                    form.address
                  }

                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,

                      address:
                        event
                          .target
                          .value,
                    })
                  }

                  className={
                    textareaClass
                  }
                />
              </Field>


              <div className="grid gap-4 md:grid-cols-2">

                <Field
                  label="District"
                >
                  <input
                    value={
                      form.district
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        district:
                          event
                            .target
                            .value,
                      })
                    }

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="Province"
                >
                  <input
                    value={
                      form.province
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        province:
                          event
                            .target
                            .value,
                      })
                    }

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="Latitude"
                >
                  <input
                    type="number"

                    step="any"

                    value={
                      form.latitude ??
                      ""
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        latitude:
                          event
                            .target
                            .value,
                      })
                    }

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="Longitude"
                >
                  <input
                    type="number"

                    step="any"

                    value={
                      form.longitude ??
                      ""
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        longitude:
                          event
                            .target
                            .value,
                      })
                    }

                    className={
                      inputClass
                    }
                  />
                </Field>

              </div>


              <Field
                label="Google Maps Link"
              >
                <input
                  value={
                    form.googleMapUrl
                  }

                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,

                      googleMapUrl:
                        event
                          .target
                          .value,
                    })
                  }

                  className={
                    inputClass
                  }
                />
              </Field>


              {form.latitude &&
                form.longitude && (

                  <iframe
                    title="Location Map"

                    src={`https://www.google.com/maps?q=${form.latitude},${form.longitude}&z=15&output=embed`}

                    className="h-[280px] w-full rounded-2xl border-0"

                    loading="lazy"
                  />

                )}

            </FormSection>


            {/* =============================================
                CONTACT
            ============================================= */}

            <FormSection
              title="Contact Information"
            >

              <div className="grid gap-4 md:grid-cols-2">

                {[
                  [
                    "phone",
                    "Main Contact Number",
                  ],

                  [
                    "secondaryPhone",
                    "Secondary Contact",
                  ],

                  [
                    "whatsapp",
                    "WhatsApp",
                  ],

                  [
                    "email",
                    "Email",
                  ],
                ].map(
                  ([
                    key,
                    label,
                  ]) => (

                    <Field
                      key={
                        key
                      }

                      label={
                        label
                      }
                    >
                      <input
                        value={
                          form[
                            key
                          ] ||
                          ""
                        }

                        onChange={(
                          event
                        ) =>
                          setForm({
                            ...form,

                            [key]:
                              event
                                .target
                                .value,
                          })
                        }

                        className={
                          inputClass
                        }
                      />
                    </Field>

                  )
                )}

              </div>

            </FormSection>


            {/* =============================================
                OPENING HOURS
            ============================================= */}

            <FormSection
              title="Opening Hours"
            >

              <div className="grid gap-4 md:grid-cols-2">

                {DAYS.map(
                  (
                    day
                  ) => (

                    <Field
                      key={
                        day
                      }

                      label={
                        day
                          .charAt(0)
                          .toUpperCase() +
                        day.slice(1)
                      }
                    >
                      <input
                        placeholder="7:30 AM - 6:00 PM"

                        value={
                          form
                            .openingHours[
                            day
                          ] ||
                          ""
                        }

                        onChange={(
                          event
                        ) =>
                          setForm({
                            ...form,

                            openingHours: {
                              ...form.openingHours,

                              [day]:
                                event
                                  .target
                                  .value,
                            },
                          })
                        }

                        className={
                          inputClass
                        }
                      />
                    </Field>

                  )
                )}

              </div>

            </FormSection>


            {/* =============================================
                SERVICES
            ============================================= */}

            <FormSection
              title="Services"
            >

              <Field
                label="Services separated by commas"
              >
                <input
                  value={
                    Array.isArray(
                      form.services
                    )
                      ? form.services.join(
                          ", "
                        )
                      : ""
                  }

                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,

                      services:
                        event
                          .target
                          .value
                          .split(
                            ","
                          )
                          .map(
                            (
                              item
                            ) =>
                              item.trim()
                          )
                          .filter(
                            Boolean
                          ),
                    })
                  }

                  placeholder="Laundry, Dry Cleaning, Shoe Cleaning"

                  className={
                    inputClass
                  }
                />
              </Field>

            </FormSection>


            {/* =============================================
                COVER PHOTO
            ============================================= */}

            <FormSection
              title={`${currentTypeLabel} Cover Photo`}
            >

              <PhotoUploader
                value={
                  form.coverImage
                    ? [
                        form.coverImage,
                      ]
                    : []
                }

                type="branch"

                folder={`branches/${form.slug || "temporary"}/cover`}

                multiple={
                  false
                }

                max={
                  1
                }

                onChange={(
                  images
                ) =>
                  setForm({
                    ...form,

                    coverImage:
                      images[0] ||
                      null,
                  })
                }
              />

            </FormSection>


            {/* =============================================
                GALLERY
            ============================================= */}

            <FormSection
              title={`${currentTypeLabel} Gallery`}
            >

              <PhotoUploader
                value={
                  form.gallery
                }

                type="branch"

                folder={`branches/${form.slug || "temporary"}/gallery`}

                max={
                  12
                }

                onChange={(
                  gallery
                ) =>
                  setForm({
                    ...form,

                    gallery,
                  })
                }
              />

            </FormSection>


            {/* =============================================
                VISIBILITY
            ============================================= */}

            <FormSection
              title="Visibility"
            >

              <div className="flex flex-wrap gap-5">

                <CheckField
                  label={`Active ${currentTypeLabel}`}

                  checked={
                    form.active
                  }

                  onChange={(
                    value
                  ) =>
                    setForm({
                      ...form,

                      active:
                        value,
                    })
                  }
                />


                <CheckField
                  label={`Featured ${currentTypeLabel}`}

                  checked={
                    form.featured
                  }

                  onChange={(
                    value
                  ) =>
                    setForm({
                      ...form,

                      featured:
                        value,
                    })
                  }
                />

              </div>

            </FormSection>


            {/* =============================================
                ACTIONS
            ============================================= */}

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

              <button
                type="button"

                onClick={() =>
                  setModalOpen(
                    false
                  )
                }

                className="h-11 rounded-xl border border-slate-200 px-6 text-[10px] font-black text-slate-500 transition hover:bg-slate-50"
              >
                Cancel
              </button>


              <button
                type="submit"

                disabled={
                  saving
                }

                className="h-11 rounded-xl bg-[#00195f] px-7 text-[10px] font-black text-white transition hover:bg-[#0060d0] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {
                  saving
                    ? "Saving..."
                    : editingId
                    ? `Update ${currentTypeLabel}`
                    : `Add ${currentTypeLabel}`
                }
              </button>

            </div>

          </form>

        </Modal>

      )}

    </LocationPage>
  );
}


/* =========================================================
   FORM SECTION
========================================================= */

function FormSection({
  title,
  children,
}) {
  return (
    <section className="space-y-4">

      <div className="border-b border-slate-100 pb-2 text-xs font-black text-[#071b3d]">
        {
          title
        }
      </div>

      {
        children
      }

    </section>
  );
}


/* =========================================================
   CHECK FIELD
========================================================= */

function CheckField({
  label,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">

      <input
        type="checkbox"

        checked={
          checked
        }

        onChange={(
          event
        ) =>
          onChange(
            event.target
              .checked
          )
        }

        className="h-4 w-4"
      />


      <span className="text-xs font-bold text-slate-600">
        {
          label
        }
      </span>

    </label>
  );
}