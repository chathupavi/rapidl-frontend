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
  UsersRound,
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


/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";


/* =========================================================
   EMPTY FORM

   branchId is retained for backend compatibility.
   It now represents any Rapid location document ID:
   - Branch
   - Outlet
========================================================= */

const EMPTY = {
  branchId: "",

  /*
   * Keep member names as plain text while editing.
   * Convert to array only when saving.
   */

  memberNamesText: "",

  teamPhoto:
    null,
};


/* =========================================================
   HELPERS
========================================================= */

function getLocationType(
  location
) {
  return (
    location?.locationType ||
    "branch"
  );
}


function isOutletLocation(
  location
) {
  return (
    getLocationType(
      location
    ) === "outlet"
  );
}


function getLocationLabel(
  location
) {
  return isOutletLocation(
    location
  )
    ? "Outlet"
    : "Branch";
}


/* =========================================================
   TEAMS PAGE
========================================================= */

export default function TeamsPage() {
  const [
    teams,
    setTeams,
  ] =
    useState([]);


  const [
    locations,
    setLocations,
  ] =
    useState([]);


  const [
    locationFilter,
    setLocationFilter,
  ] =
    useState("");


  const [
    typeFilter,
    setTypeFilter,
  ] =
    useState("");


  const [
    search,
    setSearch,
  ] =
    useState("");


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
    form,
    setForm,
  ] =
    useState(EMPTY);


  const [
    saving,
    setSaving,
  ] =
    useState(false);


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  /* =======================================================
     LOAD DATA
  ======================================================= */

  async function load() {
    try {
      setLoading(
        true
      );


      const [
        teamResponse,
        locationResponse,
      ] =
        await Promise.all([
          fetch(
            `${API_URL}/api/locations/teams`,
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


      const teamResult =
        await teamResponse.json();


      const locationResult =
        await locationResponse.json();


      if (
        !teamResponse.ok
      ) {
        throw new Error(
          teamResult.message ||
          "Failed to load location teams."
        );
      }


      if (
        !locationResponse.ok
      ) {
        throw new Error(
          locationResult.message ||
          "Failed to load locations."
        );
      }


      /*
       * Supports:
       *
       * data.teams
       *
       * and legacy:
       *
       * data.members
       */

      setTeams(
        teamResult.data
          ?.teams ||
        teamResult.data
          ?.members ||
        []
      );


      /*
       * Endpoint remains /branches,
       * but collection may contain both
       * branches and outlets.
       */

      setLocations(
        locationResult.data
          ?.branches ||
        []
      );

    } catch (error) {
      console.error(
        "Failed to load teams:",
        error
      );

    } finally {
      setLoading(
        false
      );
    }
  }


  useEffect(() => {
    load();
  }, []);


  /* =======================================================
     ACTIVE LOCATIONS
  ======================================================= */

  const activeLocations =
    useMemo(
      () =>
        locations.filter(
          (
            location
          ) =>
            location &&
            location.active !==
              false
        ),
      [
        locations,
      ]
    );


  /* =======================================================
     LOCATION MAP
  ======================================================= */

  const locationMap =
    useMemo(
      () => {

        return Object.fromEntries(
          activeLocations.map(
            (
              location
            ) => [
              String(
                location.id
              ),

              {
                ...location,

                type:
                  getLocationType(
                    location
                  ),

                label:
                  getLocationLabel(
                    location
                  ),
              },
            ]
          )
        );

      },
      [
        activeLocations,
      ]
    );


  /* =======================================================
     BRANCH / OUTLET LISTS
  ======================================================= */

  const branches =
    useMemo(
      () =>
        activeLocations.filter(
          (
            location
          ) =>
            getLocationType(
              location
            ) === "branch"
        ),
      [
        activeLocations,
      ]
    );


  const outlets =
    useMemo(
      () =>
        activeLocations.filter(
          (
            location
          ) =>
            getLocationType(
              location
            ) === "outlet"
        ),
      [
        activeLocations,
      ]
    );


  /* =======================================================
     NORMALIZE TEAM MEMBER NAMES
  ======================================================= */

  function getMemberNames(
    team
  ) {
    if (
      Array.isArray(
        team?.memberNames
      )
    ) {
      return team.memberNames;
    }


    return [];
  }


  /* =======================================================
     FILTER TEAMS
  ======================================================= */

  const filtered =
    useMemo(
      () => {

        return teams.filter(
          (
            team
          ) => {

            const location =
              locationMap[
                String(
                  team.branchId
                )
              ];


            /* -------------------------------------------
               LOCATION FILTER
            ------------------------------------------- */

            if (
              locationFilter &&
              String(
                team.branchId
              ) !==
                String(
                  locationFilter
                )
            ) {
              return false;
            }


            /* -------------------------------------------
               TYPE FILTER
            ------------------------------------------- */

            if (
              typeFilter
            ) {
              const type =
                location?.type ||
                "branch";


              if (
                type !==
                typeFilter
              ) {
                return false;
              }
            }


            /* -------------------------------------------
               SEARCH
            ------------------------------------------- */

            const query =
              search
                .trim()
                .toLowerCase();


            if (
              !query
            ) {
              return true;
            }


            const names =
              getMemberNames(
                team
              );


            return [
              location?.name,
              location?.shortName,
              location?.district,
              location?.province,
              location?.label,
              ...names,
            ]
              .filter(Boolean)
              .some(
                (
                  value
                ) =>
                  String(
                    value
                  )
                    .toLowerCase()
                    .includes(
                      query
                    )
              );
          }
        );

      },
      [
        teams,
        search,
        locationFilter,
        typeFilter,
        locationMap,
      ]
    );


  /* =======================================================
     ADD TEAM
  ======================================================= */

  function openAdd() {
    setEditingId(
      null
    );


    setForm({
      ...EMPTY,

      branchId:
        locationFilter ||
        "",
    });


    setModalOpen(
      true
    );
  }


  /* =======================================================
     EDIT TEAM
  ======================================================= */

  function openEdit(
    team
  ) {
    const memberNames =
      getMemberNames(
        team
      );


    setEditingId(
      team.id
    );


    setForm({
      branchId:
        team.branchId ||
        "",

      memberNamesText:
        memberNames.join(
          "\n"
        ),

      teamPhoto:
        team.teamPhoto ||
        null,
    });


    setModalOpen(
      true
    );
  }


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  function closeModal() {
    if (
      saving
    ) {
      return;
    }


    setModalOpen(
      false
    );


    setEditingId(
      null
    );


    setForm(
      EMPTY
    );
  }


  /* =======================================================
     CONVERT TEXTAREA TO ARRAY
  ======================================================= */

  function parseMemberNames(
    value
  ) {
    return value
      .split(
        /\r?\n/
      )
      .map(
        (
          name
        ) =>
          name.trim()
      )
      .filter(
        Boolean
      );
  }


  /* =======================================================
     SELECTED LOCATION
  ======================================================= */

  const selectedLocation =
    form.branchId
      ? locationMap[
          String(
            form.branchId
          )
        ] ||
        null
      : null;


  const selectedLocationLabel =
    selectedLocation
      ? getLocationLabel(
          selectedLocation
        )
      : "Location";


  const selectedIsOutlet =
    selectedLocation
      ? isOutletLocation(
          selectedLocation
        )
      : false;


  /* =======================================================
     SAVE TEAM
  ======================================================= */

  async function save(
    event
  ) {
    event.preventDefault();


    const memberNames =
      parseMemberNames(
        form.memberNamesText
      );


    if (
      !form.branchId
    ) {
      alert(
        "Please select a branch or outlet."
      );

      return;
    }


    if (
      memberNames.length ===
      0
    ) {
      alert(
        "Please enter at least one team member name."
      );

      return;
    }


    if (
      !form.teamPhoto
    ) {
      alert(
        "Please upload a team photo."
      );

      return;
    }


    try {
      setSaving(
        true
      );


      /*
       * branchId is retained intentionally.
       *
       * The value can now represent:
       * - branch document ID
       * - outlet document ID
       */

      const payload = {
        branchId:
          form.branchId,

        memberNames,

        teamPhoto:
          form.teamPhoto,
      };


      const response =
        await fetch(
          editingId
            ? `${API_URL}/api/locations/teams/${editingId}`
            : `${API_URL}/api/locations/teams`,
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
          "Failed to save location team."
        );
      }


      setModalOpen(
        false
      );


      setEditingId(
        null
      );


      setForm(
        EMPTY
      );


      await load();

    } catch (error) {
      alert(
        error.message ||
        "Failed to save location team."
      );

    } finally {
      setSaving(
        false
      );
    }
  }


  /* =======================================================
     DELETE TEAM
  ======================================================= */

  async function remove(
    team
  ) {
    const location =
      locationMap[
        String(
          team.branchId
        )
      ];


    const locationName =
      location?.name ||
      "this location";


    const locationLabel =
      location
        ? getLocationLabel(
            location
          )
        : "Location";


    const confirmed =
      window.confirm(
        `Delete team information for ${locationName} ${locationLabel.toLowerCase()}?`
      );


    if (
      !confirmed
    ) {
      return;
    }


    try {
      const response =
        await fetch(
          `${API_URL}/api/locations/teams/${team.id}`,
          {
            method:
              "DELETE",

            credentials:
              "include",
          }
        );


      let result = {};


      try {
        result =
          await response.json();

      } catch {
        result = {};
      }


      if (
        !response.ok
      ) {
        throw new Error(
          result.message ||
          "Failed to delete location team."
        );
      }


      await load();

    } catch (error) {
      alert(
        error.message ||
        "Failed to delete location team."
      );
    }
  }


  /* =======================================================
     METRICS
  ======================================================= */

  const totalMembers =
    teams.reduce(
      (
        total,
        team
      ) =>
        total +
        getMemberNames(
          team
        ).length,
      0
    );


  const locationsWithTeams =
    new Set(
      teams
        .map(
          (
            team
          ) =>
            team.branchId
        )
        .filter(
          Boolean
        )
    ).size;


  const branchesWithTeams =
    new Set(
      teams
        .filter(
          (
            team
          ) => {

            const location =
              locationMap[
                String(
                  team.branchId
                )
              ];


            return (
              getLocationType(
                location
              ) === "branch"
            );
          }
        )
        .map(
          (
            team
          ) =>
            team.branchId
        )
        .filter(
          Boolean
        )
    ).size;


  const outletsWithTeams =
    new Set(
      teams
        .filter(
          (
            team
          ) => {

            const location =
              locationMap[
                String(
                  team.branchId
                )
              ];


            return (
              getLocationType(
                location
              ) === "outlet"
            );
          }
        )
        .map(
          (
            team
          ) =>
            team.branchId
        )
        .filter(
          Boolean
        )
    ).size;


  /* =======================================================
     CURRENT FORM MEMBER COUNT
  ======================================================= */

  const currentMemberNames =
    parseMemberNames(
      form.memberNamesText
    );


  const currentMemberCount =
    currentMemberNames.length;


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <LocationPage
      eyebrow="Locations"

      title="Location Teams"

      description="Manage team photos and team member information across Rapid Laundromat branches and outlets."

      action={
        <button
          type="button"

          onClick={
            openAdd
          }

          className="
            flex
            h-11
            items-center
            gap-2

            rounded-xl

            bg-[#00195f]

            px-5

            text-[10px]
            font-black

            text-white

            transition

            hover:bg-[#00277f]
          "
        >
          <Plus
            size={14}
          />

          Add Location Team
        </button>
      }
    >

      {/* ===================================================
          METRICS
      =================================================== */}

      <div
        className="
          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-5
        "
      >

        <LocationMetric
          label="Teams"
          value={
            teams.length
          }
        />


        <LocationMetric
          label="Team Members"
          value={
            totalMembers
          }
        />


        <LocationMetric
          label="Locations Covered"
          value={
            locationsWithTeams
          }
        />


        <LocationMetric
          label="Branches"
          value={
            branchesWithTeams
          }
        />


        <LocationMetric
          label="Outlets"
          value={
            outletsWithTeams
          }
        />

      </div>


      {/* ===================================================
          MAIN SECTION
      =================================================== */}

      <div
        className="
          rounded-[24px]

          border
          border-slate-200

          bg-white

          p-5
        "
      >

        {/* =================================================
            SEARCH + FILTERS
        ================================================= */}

        <div
          className="
            grid
            gap-3

            lg:grid-cols-[1fr_190px_280px]
          "
        >

          {/* SEARCH */}

          <div
            className="
              relative
            "
          >

            <Search
              size={14}

              className="
                absolute
                left-4
                top-1/2

                -translate-y-1/2

                text-slate-400
              "
            />


            <input
              type="text"

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

              placeholder="Search location or team member..."
            />

          </div>


          {/* TYPE FILTER */}

          <select
            value={
              typeFilter
            }

            onChange={(
              event
            ) => {
              setTypeFilter(
                event.target.value
              );

              setLocationFilter(
                ""
              );
            }}

            className={
              inputClass
            }
          >

            <option value="">
              All Types
            </option>

            <option value="branch">
              Branches
            </option>

            <option value="outlet">
              Outlets
            </option>

          </select>


          {/* LOCATION FILTER */}

          <select
            value={
              locationFilter
            }

            onChange={(
              event
            ) =>
              setLocationFilter(
                event.target.value
              )
            }

            className={
              inputClass
            }
          >

            <option value="">
              All Locations
            </option>


            {activeLocations
              .filter(
                (
                  location
                ) =>
                  !typeFilter ||
                  getLocationType(
                    location
                  ) ===
                    typeFilter
              )
              .map(
                (
                  location
                ) => {

                  const label =
                    getLocationLabel(
                      location
                    );


                  return (
                    <option
                      key={
                        location.id
                      }

                      value={
                        location.id
                      }
                    >
                      {label} •{" "}
                      {
                        location.name
                      }
                    </option>
                  );
                }
              )}

          </select>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div
            className="
              flex
              min-h-52
              items-center
              justify-center
            "
          >

            <div
              className="
                text-[10px]
                font-bold
                text-slate-400
              "
            >
              Loading location teams...
            </div>

          </div>

        ) : filtered.length ? (

          /* ===============================================
             TEAM CARDS
          =============================================== */

          <div
            className="
              mt-5

              grid
              gap-5

              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {filtered.map(
              (
                team
              ) => {

                const names =
                  getMemberNames(
                    team
                  );


                const location =
                  locationMap[
                    String(
                      team.branchId
                    )
                  ];


                const locationName =
                  location?.name ||
                  "Unknown Location";


                const locationLabel =
                  location
                    ? getLocationLabel(
                        location
                      )
                    : "Location";


                const isOutlet =
                  location
                    ? isOutletLocation(
                        location
                      )
                    : false;


                const LocationIcon =
                  isOutlet
                    ? Store
                    : Building2;


                return (
                  <div
                    key={
                      team.id
                    }

                    className="
                      overflow-hidden

                      rounded-[24px]

                      border
                      border-slate-200

                      bg-white

                      transition
                      duration-300

                      hover:-translate-y-0.5
                      hover:shadow-lg
                    "
                  >

                    {/* =====================================
                        TEAM PHOTO
                    ===================================== */}

                    <div
                      className="
                        relative

                        aspect-[16/10]

                        overflow-hidden

                        bg-slate-100
                      "
                    >

                      {team
                        .teamPhoto
                        ?.url ? (

                        <img
                          src={
                            team
                              .teamPhoto
                              .url
                          }

                          alt={`${locationName} ${locationLabel.toLowerCase()} team`}

                          loading="lazy"

                          className="
                            h-full
                            w-full

                            object-cover

                            transition
                            duration-500

                            hover:scale-[1.02]
                          "
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-full
                            flex-col
                            items-center
                            justify-center
                            gap-2

                            text-slate-300
                          "
                        >
                          <UsersRound
                            size={40}
                          />

                          <span
                            className="
                              text-[9px]
                              font-bold
                            "
                          >
                            No Team Photo
                          </span>
                        </div>

                      )}


                      {/* LOCATION TYPE */}

                      <div
                        className="
                          absolute
                          left-3
                          top-3
                        "
                      >
                        <div
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
                            tracking-[.1em]

                            shadow-sm

                            backdrop-blur

                            ${
                              isOutlet
                                ? "bg-violet-600/95 text-white"
                                : "bg-[#0060d0]/95 text-white"
                            }
                          `}
                        >
                          <LocationIcon
                            size={10}
                          />

                          {
                            locationLabel
                          }
                        </div>
                      </div>


                      {/* MEMBER COUNT */}

                      <div
                        className="
                          absolute
                          bottom-3
                          right-3

                          rounded-full

                          bg-white/95

                          px-3
                          py-1.5

                          text-[8px]
                          font-black

                          text-[#00195f]

                          shadow-sm

                          backdrop-blur
                        "
                      >
                        {names.length}{" "}

                        {names.length ===
                        1
                          ? "Member"
                          : "Members"}
                      </div>

                    </div>


                    {/* =====================================
                        CARD CONTENT
                    ===================================== */}

                    <div
                      className="
                        p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2

                          text-[8px]
                          font-black
                          uppercase
                          tracking-[0.16em]

                          text-[#0060d0]
                        "
                      >
                        <LocationIcon
                          size={11}
                        />

                        Rapid {locationLabel}
                      </div>


                      <div
                        className="
                          mt-1

                          text-lg
                          font-black

                          text-[#071b3d]
                        "
                      >
                        {
                          locationName
                        }
                      </div>


                      {(location?.district ||
                        location?.province) && (

                        <div
                          className="
                            mt-2

                            flex
                            items-center
                            gap-1.5

                            text-[9px]
                            font-semibold

                            text-slate-400
                          "
                        >
                          <MapPin
                            size={11}
                          />

                          {
                            [
                              location
                                ?.district,

                              location
                                ?.province,
                            ]
                              .filter(
                                Boolean
                              )
                              .join(
                                " • "
                              )
                          }
                        </div>

                      )}


                      {/* ===================================
                          TEAM MEMBER NAMES
                      ==================================== */}

                      <div
                        className="
                          mt-5
                        "
                      >

                        <div
                          className="
                            mb-3

                            flex
                            items-center
                            gap-2
                          "
                        >

                          <UsersRound
                            size={14}

                            className="
                              text-[#0060d0]
                            "
                          />


                          <span
                            className="
                              text-[8px]
                              font-black
                              uppercase
                              tracking-[0.12em]

                              text-slate-400
                            "
                          >
                            Team Members
                          </span>

                        </div>


                        {names.length ? (

                          <div
                            className="
                              flex
                              flex-wrap
                              gap-2
                            "
                          >

                            {names.map(
                              (
                                name,
                                index
                              ) => (

                                <span
                                  key={`${team.id}-${index}`}

                                  className="
                                    rounded-lg

                                    border
                                    border-slate-100

                                    bg-slate-50

                                    px-3
                                    py-2

                                    text-[9px]
                                    font-bold

                                    text-slate-600
                                  "
                                >
                                  {
                                    name
                                  }
                                </span>

                              )
                            )}

                          </div>

                        ) : (

                          <div
                            className="
                              text-[9px]
                              text-slate-400
                            "
                          >
                            No team members added.
                          </div>

                        )}

                      </div>


                      {/* ===================================
                          ACTIONS
                      ==================================== */}

                      <div
                        className="
                          mt-5

                          flex
                          justify-end
                          gap-2

                          border-t
                          border-slate-100

                          pt-4
                        "
                      >

                        <button
                          type="button"

                          onClick={() =>
                            openEdit(
                              team
                            )
                          }

                          className="
                            rounded-xl

                            bg-blue-50

                            px-3
                            py-2

                            text-[8px]
                            font-black

                            text-[#0060d0]

                            transition

                            hover:bg-blue-100
                          "
                        >
                          <Edit3
                            size={11}

                            className="
                              mr-1
                              inline
                            "
                          />

                          Edit
                        </button>


                        <button
                          type="button"

                          onClick={() =>
                            remove(
                              team
                            )
                          }

                          className="
                            rounded-xl

                            bg-red-50

                            px-3
                            py-2

                            text-[8px]
                            font-black

                            text-red-500

                            transition

                            hover:bg-red-100
                          "
                        >
                          <Trash2
                            size={11}

                            className="
                              mr-1
                              inline
                            "
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

        ) : (

          /* ===============================================
             EMPTY STATE
          =============================================== */

          <div
            className="
              mt-6

              flex
              min-h-52
              flex-col
              items-center
              justify-center

              rounded-2xl

              border
              border-dashed
              border-slate-200
            "
          >

            <UsersRound
              size={30}

              className="
                text-slate-300
              "
            />


            <div
              className="
                mt-3

                text-xs
                font-black

                text-slate-500
              "
            >
              No location teams found
            </div>


            <div
              className="
                mt-1

                text-[9px]

                text-slate-400
              "
            >
              Add a team photo and member names for a branch or outlet.
            </div>

          </div>

        )}

      </div>


      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {modalOpen && (

        <Modal
          title={
            editingId
              ? selectedLocation
                ? `Edit ${selectedLocationLabel} Team`
                : "Edit Location Team"
              : "Add Location Team"
          }

          subtitle="Create and manage a team for a Rapid Laundromat branch or outlet."

          close={
            closeModal
          }
        >

          <form
            onSubmit={
              save
            }

            className="
              space-y-6
            "
          >

            {/* =============================================
                LOCATION
            ============================================= */}

            <Field
              label="Location"
              required
            >

              <div
                className="
                  grid
                  gap-3
                "
              >

                {/* TYPE LEGEND */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      bg-blue-50

                      px-3
                      py-1.5

                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.08em]

                      text-[#0060d0]
                    "
                  >
                    <Building2
                      size={10}
                    />

                    Branch
                  </span>


                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      bg-violet-50

                      px-3
                      py-1.5

                      text-[8px]
                      font-black
                      uppercase
                      tracking-[.08em]

                      text-violet-600
                    "
                  >
                    <Store
                      size={10}
                    />

                    Outlet
                  </span>

                </div>


                <select
                  required

                  value={
                    form.branchId
                  }

                  onChange={(
                    event
                  ) =>
                    setForm(
                      (
                        previous
                      ) => ({
                        ...previous,

                        branchId:
                          event
                            .target
                            .value,
                      })
                    )
                  }

                  className={
                    inputClass
                  }
                >

                  <option value="">
                    Select Branch / Outlet
                  </option>


                  {branches.length >
                    0 && (

                    <optgroup
                      label="Branches"
                    >

                      {branches.map(
                        (
                          location
                        ) => (

                          <option
                            key={
                              location.id
                            }

                            value={
                              location.id
                            }
                          >
                            {
                              location.name
                            }

                            {location.district
                              ? ` — ${location.district}`
                              : ""}
                          </option>

                        )
                      )}

                    </optgroup>

                  )}


                  {outlets.length >
                    0 && (

                    <optgroup
                      label="Outlets"
                    >

                      {outlets.map(
                        (
                          location
                        ) => (

                          <option
                            key={
                              location.id
                            }

                            value={
                              location.id
                            }
                          >
                            {
                              location.name
                            }

                            {location.district
                              ? ` — ${location.district}`
                              : ""}
                          </option>

                        )
                      )}

                    </optgroup>

                  )}

                </select>


                {/* SELECTED LOCATION PREVIEW */}

                {selectedLocation && (

                  <div
                    className={`
                      flex
                      items-center
                      gap-3

                      rounded-xl

                      border

                      px-4
                      py-3

                      ${
                        selectedIsOutlet
                          ? "border-violet-100 bg-violet-50/60"
                          : "border-blue-100 bg-blue-50/60"
                      }
                    `}
                  >

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
                          selectedIsOutlet
                            ? "bg-violet-100 text-violet-600"
                            : "bg-blue-100 text-[#0060d0]"
                        }
                      `}
                    >
                      {selectedIsOutlet ? (
                        <Store
                          size={15}
                        />
                      ) : (
                        <Building2
                          size={15}
                        />
                      )}
                    </div>


                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >

                      <div
                        className="
                          truncate

                          text-xs
                          font-black

                          text-[#071b3d]
                        "
                      >
                        {
                          selectedLocation.name
                        }
                      </div>


                      <div
                        className="
                          mt-1

                          text-[8px]
                          font-black
                          uppercase
                          tracking-[.1em]

                          text-slate-400
                        "
                      >
                        {
                          selectedLocationLabel
                        }

                        {selectedLocation
                          .district
                          ? ` • ${selectedLocation.district}`
                          : ""}
                      </div>

                    </div>

                  </div>

                )}

              </div>

            </Field>


            {/* =============================================
                TEAM PHOTO
            ============================================= */}

            <Field
              label={`${selectedLocationLabel} Team Photo`}
              required
            >

              <PhotoUploader
                value={
                  form.teamPhoto
                    ? [
                        form.teamPhoto,
                      ]
                    : []
                }

                type="team"

                folder={`teams/${form.branchId || "temporary"}`}

                multiple={
                  false
                }

                max={
                  1
                }

                onChange={(
                  images
                ) =>
                  setForm(
                    (
                      previous
                    ) => ({
                      ...previous,

                      teamPhoto:
                        images[0] ||
                        null,
                    })
                  )
                }
              />


              <div
                className="
                  mt-2

                  text-[9px]
                  leading-5

                  text-slate-400
                "
              >
                Upload one clear group photo of the selected{" "}
                {selectedLocation
                  ? selectedLocationLabel.toLowerCase()
                  : "branch or outlet"}{" "}
                team.
              </div>

            </Field>


            {/* =============================================
                TEAM MEMBER NAMES
            ============================================= */}

            <Field
              label="Team Member Names"
              required
            >

              <textarea
                required

                rows={
                  10
                }

                value={
                  form.memberNamesText
                }

                onChange={(
                  event
                ) => {

                  /*
                   * Keep exactly what is typed.
                   * Do not parse until save.
                   */

                  const value =
                    event
                      .target
                      .value;


                  setForm(
                    (
                      previous
                    ) => ({
                      ...previous,

                      memberNamesText:
                        value,
                    })
                  );

                }}

                className={`${textareaClass} min-h-[220px] resize-y`}

                placeholder={`Enter one team member per line

Example:

Dulakshi Perera
Kasun Silva
Nimesha Fernando
Amali Jayasinghe`}
              />


              {/* HELP TEXT + COUNT */}

              <div
                className="
                  mt-3

                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                "
              >

                <div
                  className="
                    text-[9px]
                    leading-5

                    text-slate-400
                  "
                >
                  Press Enter after each name to add the next team member.
                </div>


                {currentMemberCount >
                  0 && (

                  <div
                    className="
                      rounded-full

                      bg-blue-50

                      px-3
                      py-1.5

                      text-[8px]
                      font-black

                      text-[#0060d0]
                    "
                  >
                    {
                      currentMemberCount
                    }{" "}

                    {
                      currentMemberCount ===
                      1
                        ? "member"
                        : "members"
                    }
                  </div>

                )}

              </div>

            </Field>


            {/* =============================================
                NAME PREVIEW
            ============================================= */}

            {currentMemberCount >
              0 && (

              <div
                className="
                  rounded-2xl

                  border
                  border-slate-100

                  bg-slate-50/70

                  p-4
                "
              >

                <div
                  className="
                    mb-3

                    flex
                    items-center
                    gap-2
                  "
                >

                  <UsersRound
                    size={13}

                    className="
                      text-[#0060d0]
                    "
                  />


                  <div
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.12em]

                      text-slate-400
                    "
                  >
                    Member Preview
                  </div>

                </div>


                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >

                  {currentMemberNames.map(
                    (
                      name,
                      index
                    ) => (

                      <div
                        key={`${name}-${index}`}

                        className="
                          rounded-lg

                          border
                          border-slate-200

                          bg-white

                          px-3
                          py-2

                          text-[9px]
                          font-bold

                          text-slate-600
                        "
                      >
                        {
                          name
                        }
                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            {/* =============================================
                ACTIONS
            ============================================= */}

            <div
              className="
                flex
                justify-end
                gap-3

                border-t
                border-slate-100

                pt-5
              "
            >

              <button
                type="button"

                disabled={
                  saving
                }

                onClick={
                  closeModal
                }

                className="
                  h-11

                  rounded-xl

                  border
                  border-slate-200

                  px-6

                  text-[10px]
                  font-black

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
                  h-11

                  rounded-xl

                  bg-[#00195f]

                  px-7

                  text-[10px]
                  font-black

                  text-white

                  transition

                  hover:bg-[#00277f]

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {
                  saving
                    ? "Saving..."
                    : editingId
                    ? `Update ${selectedLocationLabel} Team`
                    : selectedLocation
                    ? `Add ${selectedLocationLabel} Team`
                    : "Add Team"
                }

              </button>

            </div>

          </form>

        </Modal>

      )}

    </LocationPage>
  );
}