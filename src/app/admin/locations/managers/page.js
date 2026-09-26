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
  UserRound,
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
   EMPTY MANAGER
========================================================= */

const EMPTY = {
  locationIds: [],

  name: "",

  designation:
    "Branch Manager",

  phone: "",

  email: "",

  description: "",

  education: "",

  experience: "",

  joinedYear: "",

  photo: null,

  active: true,
};


/* =========================================================
   MANAGERS PAGE
========================================================= */

export default function ManagersPage() {
  const [
    managers,
    setManagers,
  ] =
    useState([]);


  const [
    locations,
    setLocations,
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
    useState(EMPTY);


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
     LOAD MANAGERS + LOCATIONS
  ======================================================= */

  async function load() {
    try {
      const [
        managersResponse,
        locationsResponse,
      ] =
        await Promise.all([
          fetch(
            `${API_URL}/api/locations/managers`,
            {
              credentials:
                "include",

              cache:
                "no-store",
            }
          ),

          fetch(
            `${API_URL}/api/locations/branches`,
            {
              credentials:
                "include",

              cache:
                "no-store",
            }
          ),
        ]);


      const managersResult =
        await managersResponse.json();


      const locationsResult =
        await locationsResponse.json();


      if (
        managersResponse.ok
      ) {
        setManagers(
          managersResult.data
            ?.managers ||
          []
        );
      }


      if (
        locationsResponse.ok
      ) {
        setLocations(
          locationsResult.data
            ?.branches ||
          []
        );
      }

    } catch (error) {
      console.error(
        "Failed to load managers:",
        error
      );
    }
  }


  useEffect(() => {
    load();
  }, []);


  /* =======================================================
     LOCATION MAP
  ======================================================= */

  const locationMap =
    useMemo(
      () =>
        Object.fromEntries(
          locations.map(
            (
              location
            ) => [
              location.id,

              {
                name:
                  location.name,

                shortName:
                  location.shortName,

                district:
                  location.district,

                type:
                  location.locationType ||
                  "branch",
              },
            ]
          )
        ),
      [
        locations,
      ]
    );


  /* =======================================================
     NORMALIZE MANAGER LOCATION IDS
  ======================================================= */

  function getManagerLocationIds(
    manager
  ) {
    if (
      Array.isArray(
        manager.locationIds
      )
    ) {
      return manager.locationIds;
    }


    if (
      manager.branchId
    ) {
      return [
        manager.branchId,
      ];
    }


    return [];
  }


  /* =======================================================
     SEARCH
  ======================================================= */

  const filtered =
    useMemo(
      () => {

        const query =
          search
            .toLowerCase()
            .trim();


        if (
          !query
        ) {
          return managers;
        }


        return managers.filter(
          (
            manager
          ) => {

            const managerLocationIds =
              getManagerLocationIds(
                manager
              );


            const locationNames =
              managerLocationIds.map(
                (
                  id
                ) =>
                  locationMap[id]
                    ?.name
              );


            return [
              manager.name,
              manager.designation,
              manager.phone,
              manager.email,
              ...locationNames,
            ]
              .filter(Boolean)
              .some(
                (
                  value
                ) =>
                  String(value)
                    .toLowerCase()
                    .includes(
                      query
                    )
              );
          }
        );
      },
      [
        managers,
        search,
        locationMap,
      ]
    );


  /* =======================================================
     COUNTS
  ======================================================= */

  const activeManagers =
    managers.filter(
      (
        manager
      ) =>
        manager.active
    ).length;


  const coveredLocations =
    new Set(
      managers.flatMap(
        (
          manager
        ) =>
          getManagerLocationIds(
            manager
          )
      )
    ).size;


  const coveredBranches =
    new Set(
      managers
        .flatMap(
          (
            manager
          ) =>
            getManagerLocationIds(
              manager
            )
        )
        .filter(
          (
            id
          ) =>
            (
              locationMap[id]
                ?.type ||
              "branch"
            ) === "branch"
        )
    ).size;


  const coveredOutlets =
    new Set(
      managers
        .flatMap(
          (
            manager
          ) =>
            getManagerLocationIds(
              manager
            )
        )
        .filter(
          (
            id
          ) =>
            locationMap[id]
              ?.type ===
            "outlet"
        )
    ).size;


  /* =======================================================
     OPEN ADD
  ======================================================= */

  function openAdd() {
    setEditingId(
      null
    );


    setForm({
      ...EMPTY,

      locationIds:
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
    manager
  ) {
    setEditingId(
      manager.id
    );


    setForm({
      ...EMPTY,

      ...manager,

      locationIds:
        getManagerLocationIds(
          manager
        ),
    });


    setModalOpen(
      true
    );
  }


  /* =======================================================
     TOGGLE LOCATION
  ======================================================= */

  function toggleLocation(
    locationId,
    checked
  ) {
    setForm(
      (
        previous
      ) => {

        const currentIds =
          Array.isArray(
            previous.locationIds
          )
            ? previous.locationIds
            : [];


        const updatedIds =
          checked
            ? [
                ...new Set([
                  ...currentIds,
                  locationId,
                ]),
              ]
            : currentIds.filter(
                (
                  id
                ) =>
                  id !==
                  locationId
              );


        return {
          ...previous,

          locationIds:
            updatedIds,
        };
      }
    );
  }


  /* =======================================================
     SAVE MANAGER
  ======================================================= */

  async function save(
    event
  ) {
    event.preventDefault();


    if (
      !Array.isArray(
        form.locationIds
      ) ||
      form.locationIds.length ===
        0
    ) {
      alert(
        "Please assign at least one branch or outlet."
      );

      return;
    }


    try {
      setSaving(
        true
      );


      const payload = {
        ...form,

        locationIds: [
          ...new Set(
            form.locationIds
              .map(
                (
                  id
                ) =>
                  String(id)
                    .trim()
              )
              .filter(Boolean)
          ),
        ],
      };


      /*
       * Remove old branchId from newly saved payload.
       * Existing records can still be read through fallback,
       * but new records should only use locationIds.
       */

      delete payload.branchId;


      const response =
        await fetch(
          editingId
            ? `${API_URL}/api/locations/managers/${editingId}`
            : `${API_URL}/api/locations/managers`,
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
          "Failed to save manager."
        );
      }


      setModalOpen(
        false
      );


      await load();

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

  async function remove(
    manager
  ) {
    if (
      !window.confirm(
        `Delete ${manager.name}?`
      )
    ) {
      return;
    }


    try {
      const response =
        await fetch(
          `${API_URL}/api/locations/managers/${manager.id}`,
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
        throw new Error(
          result.message ||
          "Delete failed."
        );
      }


      await load();

    } catch (error) {
      alert(
        error.message
      );
    }
  }


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <LocationPage
      eyebrow="Locations"

      title="Location Managers"

      description="Manage leadership across Rapid Laundromat branches and outlets. A manager can be assigned to one or multiple locations."

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

          Add Manager
        </button>
      }
    >

      {/* ===================================================
          METRICS
      =================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <LocationMetric
          label="Managers"
          value={
            managers.length
          }
        />


        <LocationMetric
          label="Active"
          value={
            activeManagers
          }
        />


        <LocationMetric
          label="Locations Covered"
          value={
            coveredLocations
          }
        />


        <LocationMetric
          label="Branches Covered"
          value={
            coveredBranches
          }
        />


        <LocationMetric
          label="Outlets Covered"
          value={
            coveredOutlets
          }
        />

      </div>


      {/* ===================================================
          SEARCH + MANAGER CARDS
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

            className={`${inputClass} pl-11`}

            placeholder="Search managers, branch, outlet, phone or email..."
          />

        </div>


        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filtered.map(
            (
              manager
            ) => {

              const managerLocationIds =
                getManagerLocationIds(
                  manager
                );


              return (
                <div
                  key={
                    manager.id
                  }

                  className="overflow-hidden rounded-[22px] border border-slate-200 bg-white"
                >

                  {/* =========================================
                      PHOTO
                  ========================================= */}

                  <div className="relative aspect-[4/3] bg-slate-100">

                    {manager.photo
                      ?.url ? (

                      <img
                        src={
                          manager
                            .photo
                            .url
                        }

                        alt={
                          manager.name
                        }

                        loading="lazy"

                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-slate-300">

                        <UserRound
                          size={40}
                        />

                      </div>

                    )}


                    <div className="absolute left-3 top-3">

                      <span
                        className={`rounded-full px-3 py-1 text-[8px] font-black uppercase ${
                          manager.active
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {
                          manager.active
                            ? "Active"
                            : "Inactive"
                        }
                      </span>

                    </div>

                  </div>


                  {/* =========================================
                      CONTENT
                  ========================================= */}

                  <div className="p-5">

                    <div className="text-base font-black text-[#071b3d]">
                      {
                        manager.name
                      }
                    </div>


                    <div className="mt-1 text-[10px] font-bold text-[#0060d0]">
                      {
                        manager.designation
                      }
                    </div>


                    {/* =======================================
                        ASSIGNED LOCATIONS
                    ======================================= */}

                    <div className="mt-4">

                      <div className="mb-2 text-[8px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Assigned Locations
                      </div>


                      <div className="flex flex-wrap gap-2">

                        {managerLocationIds.length >
                        0 ? (

                          managerLocationIds.map(
                            (
                              locationId
                            ) => {

                              const location =
                                locationMap[
                                  locationId
                                ];


                              if (
                                !location
                              ) {
                                return (
                                  <span
                                    key={
                                      locationId
                                    }

                                    className="rounded-full bg-slate-100 px-3 py-1.5 text-[8px] font-black text-slate-400"
                                  >
                                    Unknown Location
                                  </span>
                                );
                              }


                              const isOutlet =
                                location.type ===
                                "outlet";


                              return (
                                <span
                                  key={
                                    locationId
                                  }

                                  className={`
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    px-3
                                    py-1.5
                                    text-[8px]
                                    font-black
                                    uppercase
                                    tracking-[0.06em]

                                    ${
                                      isOutlet
                                        ? "bg-violet-50 text-violet-600"
                                        : "bg-blue-50 text-[#0060d0]"
                                    }
                                  `}
                                >

                                  {isOutlet ? (
                                    <Store
                                      size={10}
                                    />
                                  ) : (
                                    <Building2
                                      size={10}
                                    />
                                  )}

                                  {
                                    location.shortName ||
                                    location.name
                                  }

                                </span>
                              );
                            }
                          )

                        ) : (

                          <span className="text-[9px] text-slate-400">
                            No location assigned
                          </span>

                        )}

                      </div>

                    </div>


                    {manager.description && (

                      <p className="mt-4 line-clamp-3 text-[10px] leading-5 text-slate-500">
                        {
                          manager.description
                        }
                      </p>

                    )}


                    <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">

                      <button
                        type="button"

                        onClick={() =>
                          openEdit(
                            manager
                          )
                        }

                        className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-[9px] font-black text-[#0060d0] transition hover:bg-blue-100"
                      >
                        <Edit3
                          size={12}
                        />

                        Edit
                      </button>


                      <button
                        type="button"

                        onClick={() =>
                          remove(
                            manager
                          )
                        }

                        className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-[9px] font-black text-red-500 transition hover:bg-red-100"
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
          MANAGER MODAL
      =================================================== */}

      {modalOpen && (

        <Modal
          title={
            editingId
              ? "Edit Manager"
              : "Add Manager"
          }

          subtitle="Assign a manager to one or multiple Rapid branches and outlets."

          close={() =>
            setModalOpen(
              false
            )
          }
        >

          <form
            onSubmit={
              save
            }

            className="space-y-8"
          >

            {/* =============================================
                LOCATION ASSIGNMENT
            ============================================= */}

            <FormSection
              title="Location Assignment"
            >

              <Field
                label="Assigned Branches & Outlets"
                required
              >

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                  <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">

                    <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      Select one or more locations
                    </div>

                    <div className="mt-1 text-[9px] text-slate-400">
                      The same manager can oversee multiple branches and outlets.
                    </div>

                  </div>


                  <div className="max-h-[320px] divide-y divide-slate-100 overflow-y-auto">

                    {locations.map(
                      (
                        location
                      ) => {

                        const type =
                          location.locationType ||
                          "branch";


                        const isOutlet =
                          type ===
                          "outlet";


                        const checked =
                          form.locationIds.includes(
                            location.id
                          );


                        return (
                          <label
                            key={
                              location.id
                            }

                            className={`
                              flex
                              cursor-pointer
                              items-center
                              gap-4
                              px-4
                              py-3
                              transition

                              ${
                                checked
                                  ? "bg-blue-50/50"
                                  : "hover:bg-slate-50"
                              }
                            `}
                          >

                            <input
                              type="checkbox"

                              checked={
                                checked
                              }

                              onChange={(
                                event
                              ) =>
                                toggleLocation(
                                  location.id,
                                  event.target
                                    .checked
                                )
                              }

                              className="h-4 w-4 shrink-0"
                            />


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
                                  size={15}
                                />
                              ) : (
                                <Building2
                                  size={15}
                                />
                              )}
                            </div>


                            <div className="min-w-0 flex-1">

                              <div className="truncate text-xs font-black text-[#071b3d]">
                                {
                                  location.name
                                }
                              </div>


                              <div className="mt-1 flex flex-wrap items-center gap-2">

                                <span
                                  className={`
                                    text-[8px]
                                    font-black
                                    uppercase
                                    tracking-[0.1em]

                                    ${
                                      isOutlet
                                        ? "text-violet-600"
                                        : "text-[#0060d0]"
                                    }
                                  `}
                                >
                                  {
                                    isOutlet
                                      ? "Outlet"
                                      : "Branch"
                                  }
                                </span>


                                {location.district && (
                                  <>
                                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                                    <span className="text-[8px] font-bold text-slate-400">
                                      {
                                        location.district
                                      }
                                    </span>
                                  </>
                                )}

                              </div>

                            </div>


                            {checked && (

                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black uppercase text-emerald-600">
                                Assigned
                              </span>

                            )}

                          </label>
                        );
                      }
                    )}

                  </div>

                </div>


                <div className="mt-3 flex flex-wrap items-center gap-2">

                  <span className="text-[9px] font-bold text-slate-400">
                    {
                      form.locationIds.length
                    }{" "}
                    {
                      form.locationIds.length ===
                      1
                        ? "location selected"
                        : "locations selected"
                    }
                  </span>


                  {form.locationIds.length >
                    0 && (

                    <button
                      type="button"

                      onClick={() =>
                        setForm({
                          ...form,

                          locationIds:
                            [],
                        })
                      }

                      className="text-[9px] font-black text-red-400 hover:text-red-500"
                    >
                      Clear Selection
                    </button>

                  )}

                </div>

              </Field>

            </FormSection>


            {/* =============================================
                BASIC INFORMATION
            ============================================= */}

            <FormSection
              title="Manager Information"
            >

              <div className="grid gap-4 md:grid-cols-2">

                <Field
                  label="Manager Name"
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

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="Designation"
                >
                  <input
                    value={
                      form.designation
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        designation:
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
                  label="Contact Number"
                >
                  <input
                    value={
                      form.phone
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        phone:
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
                  label="Email"
                >
                  <input
                    type="email"

                    value={
                      form.email
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        email:
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
                  label="Joined Year"
                >
                  <input
                    type="number"

                    min="1900"

                    max="2100"

                    value={
                      form.joinedYear ||
                      ""
                    }

                    onChange={(
                      event
                    ) =>
                      setForm({
                        ...form,

                        joinedYear:
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

            </FormSection>


            {/* =============================================
                ABOUT
            ============================================= */}

            <FormSection
              title="Profile"
            >

              <Field
                label="About Manager"
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


              <Field
                label="Education"
              >
                <textarea
                  rows={3}

                  value={
                    form.education
                  }

                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,

                      education:
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


              <Field
                label="Experience"
              >
                <textarea
                  rows={4}

                  value={
                    form.experience
                  }

                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,

                      experience:
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
                PHOTO
            ============================================= */}

            <FormSection
              title="Manager Photo"
            >

              <Field
                label="Profile Photo"
              >

                <PhotoUploader
                  value={
                    form.photo
                      ? [
                          form.photo,
                        ]
                      : []
                  }

                  type="manager"

                  folder="managers"

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

                      photo:
                        images[0] ||
                        null,
                    })
                  }
                />

              </Field>

            </FormSection>


            {/* =============================================
                STATUS
            ============================================= */}

            <FormSection
              title="Status"
            >

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"

                  checked={
                    form.active
                  }

                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,

                      active:
                        event
                          .target
                          .checked,
                    })
                  }

                  className="h-4 w-4"
                />


                <span className="text-xs font-bold text-slate-600">
                  Active Manager
                </span>

              </label>

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
                    ? "Update Manager"
                    : "Add Manager"
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