"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Activity,
  AlarmClock,
  Archive,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  Edit3,
  Eye,
  ImageIcon,
  Loader2,
  Megaphone,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Timer,
  Trash2,
  Video,
  X,
} from "lucide-react";

import CampaignMediaUploader from
  "@/components/admin/marketing/CampaignMediaUploader";


/* =========================================================
   API
========================================================= */

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;


if (!API_URL) {
  console.warn(
    "NEXT_PUBLIC_API_URL is not configured."
  );
}


/* =========================================================
   CONSTANTS
========================================================= */

const CAMPAIGN_TYPES = [
  {
    value:
      "promotion",

    label:
      "Promotion",
  },

  {
    value:
      "branch-launch",

    label:
      "Branch Launch",
  },

  {
    value:
      "coming-soon",

    label:
      "Coming Soon",
  },

  {
    value:
      "seasonal",

    label:
      "Seasonal",
  },

  {
    value:
      "service-launch",

    label:
      "Service Launch",
  },

  {
    value:
      "commercial",

    label:
      "Commercial",
  },

  {
    value:
      "event",

    label:
      "Event",
  },

  {
    value:
      "announcement",

    label:
      "Announcement",
  },

  {
    value:
      "community",

    label:
      "Community",
  },

  {
    value:
      "general",

    label:
      "General",
  },
];


const DISPLAY_TYPES = [
  {
    value:
      "modal",

    label:
      "Popup Modal",
  },

  {
    value:
      "announcement-bar",

    label:
      "Announcement Bar",
  },

  {
    value:
      "floating-card",

    label:
      "Floating Card",
  },

  {
    value:
      "bottom-sheet",

    label:
      "Bottom Sheet",
  },

  {
    value:
      "fullscreen",

    label:
      "Fullscreen",
  },

  {
    value:
      "hero-banner",

    label:
      "Hero Banner",
  },
];


const STATUS_FILTERS = [
  "all",
  "active",
  "scheduled",
  "draft",
  "paused",
  "ended",
  "archived",
];


/* =========================================================
   EMPTY FORM
========================================================= */

function getEmptyForm() {
  return {
    title:
      "",

    campaignType:
      "promotion",

    eyebrow:
      "",

    headline:
      "",

    description:
      "",

    displayType:
      "modal",

    media: {
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
    },

    primaryCta: {
      enabled:
        true,

      label:
        "Learn More",

      url:
        "",

      type:
        "link",
    },

    secondaryCta: {
      enabled:
        true,

      label:
        "Maybe Later",
    },

    startAt:
      "",

    endAt:
      "",

    countdown: {
      enabled:
        true,

      targetAt:
        "",

      label:
        "Offer Ends In",
    },

    behavior: {
      delaySeconds:
        3,

      frequencyMode:
        "once-per-session",

      repeatHours:
        24,
    },

    targeting: {
      allPages:
        true,

      pages:
        [],

      excludedPages: [
        "/admin",
      ],
    },

    priority:
      50,

    published:
      false,

    paused:
      false,

    archived:
      false,
  };
}


/* =========================================================
   PAGE
========================================================= */

export default function CampaignsPage() {
  const [
    campaigns,
    setCampaigns,
  ] = useState(
    []
  );


  const [
    overview,
    setOverview,
  ] = useState(
    {}
  );


  const [
    form,
    setForm,
  ] = useState(
    getEmptyForm
  );


  const [
    editingId,
    setEditingId,
  ] = useState(
    null
  );


  const [
    uploadKey,
    setUploadKey,
  ] = useState(
    ""
  );


  const [
    showEditor,
    setShowEditor,
  ] = useState(
    false
  );


  const [
    previewCampaign,
    setPreviewCampaign,
  ] = useState(
    null
  );


  const [
    loading,
    setLoading,
  ] = useState(
    true
  );


  const [
    saving,
    setSaving,
  ] = useState(
    false
  );


  const [
    deletingId,
    setDeletingId,
  ] = useState(
    null
  );


  const [
    search,
    setSearch,
  ] = useState(
    ""
  );


  const [
    filter,
    setFilter,
  ] = useState(
    "all"
  );


  const [
    error,
    setError,
  ] = useState(
    ""
  );


  const [
    success,
    setSuccess,
  ] = useState(
    ""
  );


  /* =======================================================
     LOAD
  ======================================================= */

  const loadCampaigns =
    useCallback(
      async () => {
        try {
          setLoading(
            true
          );


          setError(
            ""
          );


          const response =
            await fetch(
              `${API_URL}/api/campaigns`,
              {
                method:
                  "GET",

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
              "Failed to load campaigns."
            );
          }


          setCampaigns(
            result.data
              ?.campaigns ||
            []
          );


          setOverview(
            result.data
              ?.overview ||
            {}
          );
        } catch (
          error
        ) {
          console.error(
            "Load Campaigns:",
            error
          );


          setError(
            error.message ||
            "Failed to load campaigns."
          );
        } finally {
          setLoading(
            false
          );
        }
      },
      []
    );


  useEffect(
    () => {
      loadCampaigns();
    },
    [
      loadCampaigns,
    ]
  );


  /* =======================================================
     FILTER
  ======================================================= */

  const visibleCampaigns =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase();


        return campaigns.filter(
          (
            campaign
          ) => {
            const statusMatch =
              filter ===
                "all" ||
              campaign.status ===
                filter;


            const searchMatch =
              !query ||
              [
                campaign.title,
                campaign.headline,
                campaign.description,
                campaign.campaignType,
                campaign.displayType,
                campaign.status,
              ]
                .filter(
                  Boolean
                )
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


            return (
              statusMatch &&
              searchMatch
            );
          }
        );
      },
      [
        campaigns,
        search,
        filter,
      ]
    );


  /* =======================================================
     CREATE
  ======================================================= */

  function createCampaign() {
    setForm(
      getEmptyForm()
    );


    setEditingId(
      null
    );


    setUploadKey(
      createClientId()
    );


    setSuccess(
      ""
    );


    setError(
      ""
    );


    setShowEditor(
      true
    );
  }


  /* =======================================================
     EDIT
  ======================================================= */

  function editCampaign(
    campaign
  ) {
    setEditingId(
      campaign.id
    );


    setUploadKey(
      campaign.id
    );


    setForm({
      title:
        campaign.title ||
        "",

      campaignType:
        campaign.campaignType ||
        "promotion",

      eyebrow:
        campaign.eyebrow ||
        "",

      headline:
        campaign.headline ||
        "",

      description:
        campaign.description ||
        "",

      displayType:
        campaign.displayType ||
        "modal",

      media: {
        type:
          campaign.media
            ?.type ||
          "none",

        url:
          campaign.media
            ?.url ||
          "",

        path:
          campaign.media
            ?.path ||
          "",

        posterUrl:
          campaign.media
            ?.posterUrl ||
          "",

        posterPath:
          campaign.media
            ?.posterPath ||
          "",

        originalName:
          campaign.media
            ?.originalName ||
          "",

        mimeType:
          campaign.media
            ?.mimeType ||
          "",

        size:
          Number(
            campaign.media
              ?.size ||
            0
          ),
      },

      primaryCta: {
        enabled:
          campaign.primaryCta
            ?.enabled ===
          true,

        label:
          campaign.primaryCta
            ?.label ||
          "",

        url:
          campaign.primaryCta
            ?.url ||
          "",

        type:
          campaign.primaryCta
            ?.type ||
          "link",
      },

      secondaryCta: {
        enabled:
          campaign.secondaryCta
            ?.enabled ===
          true,

        label:
          campaign.secondaryCta
            ?.label ||
          "",
      },

      startAt:
        toDateTimeLocal(
          campaign.startAt
        ),

      endAt:
        toDateTimeLocal(
          campaign.endAt
        ),

      countdown: {
        enabled:
          campaign.countdown
            ?.enabled ===
          true,

        targetAt:
          toDateTimeLocal(
            campaign.countdown
              ?.targetAt
          ),

        label:
          campaign.countdown
            ?.label ||
          "Ends In",
      },

      behavior: {
        delaySeconds:
          Number(
            campaign.behavior
              ?.delaySeconds ??
            3
          ),

        frequencyMode:
          campaign.behavior
            ?.frequencyMode ||
          "once-per-session",

        repeatHours:
          Number(
            campaign.behavior
              ?.repeatHours ||
            24
          ),
      },

      targeting: {
        allPages:
          campaign.targeting
            ?.allPages !==
          false,

        pages:
          campaign.targeting
            ?.pages ||
          [],

        excludedPages:
          campaign.targeting
            ?.excludedPages ||
          [
            "/admin",
          ],
      },

      priority:
        Number(
          campaign.priority ??
          50
        ),

      published:
        campaign.published ===
        true,

      paused:
        campaign.paused ===
        true,

      archived:
        campaign.archived ===
        true,
    });


    setSuccess(
      ""
    );


    setError(
      ""
    );


    setShowEditor(
      true
    );
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function saveCampaign() {
    try {
      setSaving(
        true
      );


      setError(
        ""
      );


      setSuccess(
        ""
      );


      if (
        !form.title.trim()
      ) {
        throw new Error(
          "Campaign name is required."
        );
      }


      if (
        !form.headline.trim()
      ) {
        throw new Error(
          "Campaign headline is required."
        );
      }


      const payload = {
        ...form,

        startAt:
          localDateToISO(
            form.startAt
          ),

        endAt:
          localDateToISO(
            form.endAt
          ),

        countdown: {
          ...form.countdown,

          targetAt:
            form.countdown
              .enabled
              ? localDateToISO(
                  form.countdown
                    .targetAt ||
                  form.endAt
                )
              : null,
        },
      };


      const endpoint =
        editingId
          ? `${API_URL}/api/campaigns/${editingId}`
          : `${API_URL}/api/campaigns`;


      const response =
        await fetch(
          endpoint,
          {
            method:
              editingId
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
          "Failed to save campaign."
        );
      }


      setShowEditor(
        false
      );


      setSuccess(
        editingId
          ? "Campaign updated successfully."
          : "Campaign created successfully."
      );


      setEditingId(
        null
      );


      await loadCampaigns();
    } catch (
      error
    ) {
      console.error(
        "Save Campaign:",
        error
      );


      setError(
        error.message ||
        "Failed to save campaign."
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

  async function removeCampaign(
    campaign
  ) {
    const confirmed =
      window.confirm(
        `Delete "${campaign.title}"?`
      );


    if (!confirmed) {
      return;
    }


    try {
      setDeletingId(
        campaign.id
      );


      const response =
        await fetch(
          `${API_URL}/api/campaigns/${campaign.id}`,
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
          "Delete failed."
        );
      }


      /*
       * Remove media AFTER the campaign has been deleted.
       */

      if (
        campaign.media
          ?.path
      ) {
        await fetch(
          `${API_URL}/api/campaigns/media`,
          {
            method:
              "DELETE",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                path:
                  campaign.media
                    .path,
              }),
          }
        ).catch(
          () => {}
        );
      }


      setSuccess(
        "Campaign deleted."
      );


      await loadCampaigns();
    } catch (
      error
    ) {
      setError(
        error.message
      );
    } finally {
      setDeletingId(
        null
      );
    }
  }


  /* =======================================================
     STATE
  ======================================================= */

  async function changeState(
    campaign,
    updates
  ) {
    try {
      const response =
        await fetch(
          `${API_URL}/api/campaigns/${campaign.id}/state`,
          {
            method:
              "PATCH",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                updates
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
          "Failed to update campaign."
        );
      }


      await loadCampaigns();
    } catch (
      error
    ) {
      setError(
        error.message
      );
    }
  }


  /* =======================================================
     DUPLICATE
  ======================================================= */

  function duplicateCampaign(
    campaign
  ) {
    editCampaign({
      ...campaign,

      id:
        null,

      title:
        `${campaign.title} Copy`,

      published:
        false,

      paused:
        false,

      archived:
        false,
    });


    setEditingId(
      null
    );


    setUploadKey(
      createClientId()
    );
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        min-h-screen

        bg-[#f6f8fc]

        px-4
        py-5

        sm:px-6
        lg:px-8
      "
    >

      <div
        className="
          mx-auto

          max-w-[1600px]

          space-y-6
        "
      >

        {/* HEADER */}

        <section
          className="
            relative

            overflow-hidden

            rounded-[28px]

            border
            border-slate-200

            bg-white

            px-6
            py-7

            shadow-[0_18px_60px_rgba(15,23,42,.05)]

            sm:px-8
          "
        >

          <div
            className="
              pointer-events-none

              absolute

              -right-20
              -top-20

              h-72
              w-72

              rounded-full

              bg-gradient-to-br

              from-[#ff416c]/10
              to-[#ff4b2b]/5

              blur-3xl
            "
          />


          <div
            className="
              relative

              flex
              flex-col

              gap-5

              lg:flex-row
              lg:items-center
              lg:justify-between
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

                  tracking-[2px]

                  text-[#ff416c]
                "
              >
                <Sparkles
                  size={13}
                />

                Marketing Command Center
              </div>


              <h1
                className="
                  mt-2

                  text-2xl
                  font-black

                  tracking-[-.04em]

                  text-[#071b3d]

                  sm:text-3xl
                "
              >
                Campaigns & Promotions
              </h1>


              <p
                className="
                  mt-2

                  max-w-2xl

                  text-xs
                  leading-6

                  text-slate-500
                "
              >
                Create, schedule and control website promotions,
                announcements, branch launches and campaign experiences.
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
                  loadCampaigns
                }

                className="
                  flex
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

                  text-slate-500
                "
              >
                <RefreshCw
                  size={13}
                />

                Refresh
              </button>


              <button
                type="button"

                onClick={
                  createCampaign
                }

                className="
                  flex
                  h-11

                  items-center
                  gap-2

                  rounded-xl

                  bg-[#00195f]

                  px-5

                  text-[9px]
                  font-black

                  text-white

                  shadow-[0_12px_30px_rgba(0,25,95,.18)]

                  transition

                  hover:bg-[#0060d0]
                "
              >
                <Plus
                  size={14}
                />

                Add Campaign
              </button>

            </div>

          </div>

        </section>


        {/* MESSAGES */}

        {error && (
          <Message
            type="error"
          >
            {error}
          </Message>
        )}


        {success && (
          <Message
            type="success"
          >
            {success}
          </Message>
        )}


        {/* KPI */}

        <div
          className="
            grid
            gap-4

            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-6
          "
        >

          <Metric
            label="Total"
            value={
              overview.total ||
              0
            }
            icon={
              Megaphone
            }
          />


          <Metric
            label="Active"
            value={
              overview.active ||
              0
            }
            icon={
              Activity
            }
          />


          <Metric
            label="Scheduled"
            value={
              overview.scheduled ||
              0
            }
            icon={
              CalendarDays
            }
          />


          <Metric
            label="Drafts"
            value={
              overview.draft ||
              0
            }
            icon={
              Edit3
            }
          />


          <Metric
            label="Paused"
            value={
              overview.paused ||
              0
            }
            icon={
              Pause
            }
          />


          <Metric
            label="Ended"
            value={
              overview.ended ||
              0
            }
            icon={
              CheckCircle2
            }
          />

        </div>


        {/* MAIN PANEL */}

        <section
          className="
            rounded-[26px]

            border
            border-slate-200

            bg-white

            p-5

            shadow-[0_10px_40px_rgba(15,23,42,.035)]

            sm:p-6
          "
        >

          <div
            className="
              flex
              flex-col

              gap-4

              xl:flex-row
              xl:items-end
              xl:justify-between
            "
          >

            <div>

              <div
                className="
                  text-[9px]
                  font-black
                  uppercase

                  tracking-[1.6px]

                  text-[#ff416c]
                "
              >
                Campaign Library
              </div>


              <h2
                className="
                  mt-1

                  text-lg
                  font-black

                  text-[#071b3d]
                "
              >
                Campaign Control
              </h2>

            </div>


            <div
              className="
                relative

                w-full

                xl:max-w-[360px]
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

                placeholder="Search campaigns..."

                className="
                  h-11
                  w-full

                  rounded-xl

                  border
                  border-slate-200

                  bg-slate-50

                  pl-11
                  pr-4

                  text-xs
                  font-semibold

                  text-slate-700

                  outline-none

                  focus:border-[#168cff]
                  focus:bg-white
                "
              />

            </div>

          </div>


          {/* FILTERS */}

          <div
            className="
              mt-5

              flex
              gap-2

              overflow-x-auto

              pb-1
            "
          >

            {STATUS_FILTERS.map(
              (
                status
              ) => (

                <button
                  key={
                    status
                  }

                  type="button"

                  onClick={() =>
                    setFilter(
                      status
                    )
                  }

                  className={`
                    shrink-0

                    rounded-xl

                    px-4
                    py-2.5

                    text-[8px]
                    font-black
                    uppercase

                    tracking-[.8px]

                    ${
                      filter ===
                      status
                        ? "bg-[#00195f] text-white"
                        : "bg-slate-50 text-slate-400 hover:text-slate-600"
                    }
                  `}
                >
                  {status}

                  <span
                    className="
                      ml-2
                      opacity-60
                    "
                  >
                    {status ===
                    "all"
                      ? campaigns.length
                      : campaigns.filter(
                          (
                            campaign
                          ) =>
                            campaign.status ===
                            status
                        ).length}
                  </span>
                </button>

              )
            )}

          </div>


          {/* LIST */}

          {loading ? (

            <div
              className="
                flex
                min-h-[300px]

                items-center
                justify-center
              "
            >
              <Loader2
                size={24}
                className="
                  animate-spin

                  text-[#0060d0]
                "
              />
            </div>

          ) : visibleCampaigns.length ? (

            <div
              className="
                mt-6

                grid
                gap-4

                lg:grid-cols-2
                2xl:grid-cols-3
              "
            >

              {visibleCampaigns.map(
                (
                  campaign
                ) => (

                  <CampaignCard
                    key={
                      campaign.id
                    }

                    campaign={
                      campaign
                    }

                    edit={() =>
                      editCampaign(
                        campaign
                      )
                    }

                    preview={() =>
                      setPreviewCampaign(
                        campaign
                      )
                    }

                    duplicate={() =>
                      duplicateCampaign(
                        campaign
                      )
                    }

                    remove={() =>
                      removeCampaign(
                        campaign
                      )
                    }

                    deleting={
                      deletingId ===
                      campaign.id
                    }

                    state={
                      (
                        updates
                      ) =>
                        changeState(
                          campaign,
                          updates
                        )
                    }
                  />

                )
              )}

            </div>

          ) : (

            <div
              className="
                mt-6

                flex
                min-h-[260px]
                flex-col

                items-center
                justify-center

                rounded-2xl

                border
                border-dashed
                border-slate-200

                bg-slate-50/40

                text-center
              "
            >
              <Megaphone
                size={26}
                className="
                  text-slate-300
                "
              />

              <div
                className="
                  mt-3

                  text-sm
                  font-black

                  text-slate-600
                "
              >
                No campaigns found
              </div>
            </div>

          )}

        </section>

      </div>


      {/* EDITOR */}

      {showEditor && (

        <CampaignEditor
          form={
            form
          }

          setForm={
            setForm
          }

          editing={
            Boolean(
              editingId
            )
          }

          editingId={
            editingId
          }

          uploadKey={
            uploadKey
          }

          saving={
            saving
          }

          save={
            saveCampaign
          }

          close={() =>
            setShowEditor(
              false
            )
          }

          preview={() =>
            setPreviewCampaign({
              ...form,

              startAt:
                localDateToISO(
                  form.startAt
                ),

              endAt:
                localDateToISO(
                  form.endAt
                ),

              countdown: {
                ...form.countdown,

                targetAt:
                  localDateToISO(
                    form.countdown
                      .targetAt ||
                    form.endAt
                  ),
              },
            })
          }
        />

      )}


      {/* PREVIEW */}

      {previewCampaign && (

        <CampaignPreview
          campaign={
            previewCampaign
          }

          close={() =>
            setPreviewCampaign(
              null
            )
          }
        />

      )}

    </div>
  );
}


/* =========================================================
   CARD
========================================================= */

function CampaignCard({
  campaign,
  edit,
  preview,
  duplicate,
  remove,
  deleting,
  state,
}) {
  return (
    <article
      className="
        overflow-hidden

        rounded-[22px]

        border
        border-slate-200

        bg-white

        transition

        hover:-translate-y-0.5
        hover:shadow-[0_16px_40px_rgba(15,23,42,.08)]
      "
    >

      {/* MEDIA */}

      {campaign.media
        ?.url && (

        <div
          className="
            relative

            h-[160px]

            overflow-hidden

            bg-slate-950
          "
        >

          {campaign.media
            .type ===
          "video" ? (

            <video
              src={
                campaign.media
                  .url
              }

              muted
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
                campaign.media
                  .url
              }

              alt={
                campaign.headline
              }

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
            "
          >
            <StatusBadge
              status={
                campaign.status
              }
            />
          </div>

        </div>

      )}


      <div
        className="
          p-5
        "
      >

        {!campaign.media
          ?.url && (

          <StatusBadge
            status={
              campaign.status
            }
          />

        )}


        <div
          className="
            mt-3

            flex
            items-start
            justify-between
            gap-4
          "
        >

          <div
            className="
              min-w-0
            "
          >

            <div
              className="
                text-[8px]
                font-black
                uppercase

                tracking-[1px]

                text-[#ff416c]
              "
            >
              {
                campaign.campaignType
              }
            </div>


            <h3
              className="
                mt-1

                text-sm
                font-black

                text-[#071b3d]
              "
            >
              {
                campaign.title
              }
            </h3>

          </div>


          <div
            className="
              rounded-lg

              bg-blue-50

              px-2
              py-1

              text-[7px]
              font-black
              uppercase

              text-[#0060d0]
            "
          >
            {
              campaign.displayType
            }
          </div>

        </div>


        <p
          className="
            mt-3

            line-clamp-2

            text-[10px]
            leading-5

            text-slate-400
          "
        >
          {
            campaign.description ||
            campaign.headline
          }
        </p>


        <div
          className="
            mt-4

            grid
            grid-cols-2
            gap-2
          "
        >

          <InfoBox
            label="Starts"
            value={formatDate(
              campaign.startAt
            )}
          />


          <InfoBox
            label="Ends"
            value={formatDate(
              campaign.endAt
            )}
          />

        </div>


        {campaign.status ===
          "active" &&
          campaign.countdown
            ?.enabled && (

          <div
            className="
              mt-4
            "
          >
            <LiveCountdown
              targetAt={
                campaign.countdown
                  .targetAt ||
                campaign.endAt
              }

              compact
            />
          </div>

        )}

      </div>


      {/* ACTIONS */}

      <div
        className="
          grid
          grid-cols-5

          border-t
          border-slate-100

          bg-slate-50/50

          p-2
        "
      >

        <Action
          icon={
            Eye
          }

          label="Preview"

          onClick={
            preview
          }
        />


        <Action
          icon={
            Edit3
          }

          label="Edit"

          onClick={
            edit
          }
        />


        <Action
          icon={
            Copy
          }

          label="Copy"

          onClick={
            duplicate
          }
        />


        {campaign.status ===
          "active" ? (

          <Action
            icon={
              Pause
            }

            label="Pause"

            onClick={() =>
              state({
                paused:
                  true,
              })
            }
          />

        ) : campaign.status ===
          "paused" ? (

          <Action
            icon={
              Play
            }

            label="Resume"

            onClick={() =>
              state({
                paused:
                  false,
              })
            }
          />

        ) : (

          <Action
            icon={
              campaign.archived
                ? Play
                : Archive
            }

            label={
              campaign.archived
                ? "Restore"
                : "Archive"
            }

            onClick={() =>
              state({
                archived:
                  !campaign.archived,
              })
            }
          />

        )}


        <Action
          icon={
            deleting
              ? Loader2
              : Trash2
          }

          label="Delete"

          danger

          onClick={
            remove
          }
        />

      </div>

    </article>
  );
}


/* =========================================================
   EDITOR
========================================================= */

function CampaignEditor({
  form,
  setForm,
  editing,
  editingId,
  uploadKey,
  saving,
  save,
  close,
  preview,
}) {
  function update(
    field,
    value
  ) {
    setForm(
      (
        previous
      ) => ({
        ...previous,

        [field]:
          value,
      })
    );
  }


  function nested(
    group,
    field,
    value
  ) {
    setForm(
      (
        previous
      ) => ({
        ...previous,

        [group]: {
          ...previous[
            group
          ],

          [field]:
            value,
        },
      })
    );
  }


  return (
    <div
      className="
        fixed
        inset-0
        z-[3000]
      "
    >

      <button
        type="button"

        onClick={
          close
        }

        className="
          absolute
          inset-0

          bg-[#071b3d]/45

          backdrop-blur-[2px]
        "
      />


      <aside
        className="
          absolute

          bottom-0
          right-0
          top-0

          w-full
          max-w-[760px]

          overflow-y-auto

          bg-white

          shadow-[-30px_0_80px_rgba(15,23,42,.2)]
        "
      >

        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-20

            flex
            items-start
            justify-between

            border-b
            border-slate-100

            bg-white/95

            px-6
            py-5

            backdrop-blur
          "
        >

          <div>

            <div
              className="
                text-[9px]
                font-black
                uppercase

                tracking-[1.6px]

                text-[#ff416c]
              "
            >
              Campaign Builder
            </div>


            <h2
              className="
                mt-1

                text-xl
                font-black

                text-[#071b3d]
              "
            >
              {editing
                ? "Edit Campaign"
                : "Create Campaign"}
            </h2>

          </div>


          <button
            type="button"

            onClick={
              close
            }

            className="
              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-xl

              bg-slate-100

              text-slate-500
            "
          >
            <X
              size={15}
            />
          </button>

        </div>


        <div
          className="
            space-y-8

            p-6
          "
        >

          {/* BASIC */}

          <EditorSection
            title="Campaign Basics"
            description="Internal information used to organize the campaign."
          >

            <Field
              label="Campaign Name"
            >
              <input
                value={
                  form.title
                }

                onChange={(
                  event
                ) =>
                  update(
                    "title",
                    event.target.value
                  )
                }

                placeholder="Weekend Laundry Promotion"

                className={
                  inputClass
                }
              />
            </Field>


            <div
              className="
                grid
                gap-4

                sm:grid-cols-2
              "
            >

              <Field
                label="Campaign Type"
              >
                <select
                  value={
                    form.campaignType
                  }

                  onChange={(
                    event
                  ) =>
                    update(
                      "campaignType",
                      event.target.value
                    )
                  }

                  className={
                    inputClass
                  }
                >
                  {CAMPAIGN_TYPES.map(
                    (
                      item
                    ) => (

                    <option
                      key={
                        item.value
                      }

                      value={
                        item.value
                      }
                    >
                      {
                        item.label
                      }
                    </option>

                    )
                  )}
                </select>
              </Field>


              <Field
                label="Display Style"
              >
                <select
                  value={
                    form.displayType
                  }

                  onChange={(
                    event
                  ) =>
                    update(
                      "displayType",
                      event.target.value
                    )
                  }

                  className={
                    inputClass
                  }
                >
                  {DISPLAY_TYPES.map(
                    (
                      item
                    ) => (

                    <option
                      key={
                        item.value
                      }

                      value={
                        item.value
                      }
                    >
                      {
                        item.label
                      }
                    </option>

                    )
                  )}
                </select>
              </Field>

            </div>

          </EditorSection>


          {/* CREATIVE */}

          <EditorSection
            title="Campaign Creative"
            description="Upload the image or video customers will see."
          >

            <CampaignMediaUploader
              value={
                form.media
              }

              uploadKey={
                editingId ||
                uploadKey
              }

              onChange={(
                media
              ) =>
                update(
                  "media",
                  media
                )
              }
            />

          </EditorSection>


          {/* COPY */}

          <EditorSection
            title="Campaign Message"
            description="The actual message presented to customers."
          >

            <Field
              label="Eyebrow"
            >
              <input
                value={
                  form.eyebrow
                }

                onChange={(
                  event
                ) =>
                  update(
                    "eyebrow",
                    event.target.value
                  )
                }

                placeholder="LIMITED OFFER"

                className={
                  inputClass
                }
              />
            </Field>


            <Field
              label="Headline"
            >
              <input
                value={
                  form.headline
                }

                onChange={(
                  event
                ) =>
                  update(
                    "headline",
                    event.target.value
                  )
                }

                placeholder="Give Your Laundry the Rapid Treatment"

                className={
                  inputClass
                }
              />
            </Field>


            <Field
              label="Description"
            >
              <textarea
                rows={5}

                value={
                  form.description
                }

                onChange={(
                  event
                ) =>
                  update(
                    "description",
                    event.target.value
                  )
                }

                placeholder="Campaign description..."

                className={
                  textareaClass
                }
              />
            </Field>

          </EditorSection>


          {/* CTA */}

          <EditorSection
            title="Call to Action"
            description="Drive customers to booking, locations, services or another page."
          >

            <Toggle
              label="Enable Main Button"

              checked={
                form.primaryCta
                  .enabled
              }

              onChange={(
                value
              ) =>
                nested(
                  "primaryCta",
                  "enabled",
                  value
                )
              }
            />


            {form.primaryCta
              .enabled && (

              <div
                className="
                  grid
                  gap-4

                  sm:grid-cols-2
                "
              >

                <Field
                  label="Button Text"
                >
                  <input
                    value={
                      form.primaryCta
                        .label
                    }

                    onChange={(
                      event
                    ) =>
                      nested(
                        "primaryCta",
                        "label",
                        event.target.value
                      )
                    }

                    placeholder="Book Now"

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="Destination"
                >
                  <input
                    value={
                      form.primaryCta
                        .url
                    }

                    onChange={(
                      event
                    ) =>
                      nested(
                        "primaryCta",
                        "url",
                        event.target.value
                      )
                    }

                    placeholder="/services or https://..."

                    className={
                      inputClass
                    }
                  />
                </Field>

              </div>

            )}


            <Toggle
              label="Show Secondary Dismiss Button"

              checked={
                form.secondaryCta
                  .enabled
              }

              onChange={(
                value
              ) =>
                nested(
                  "secondaryCta",
                  "enabled",
                  value
                )
              }
            />


            {form.secondaryCta
              .enabled && (

              <Field
                label="Secondary Button Text"
              >
                <input
                  value={
                    form.secondaryCta
                      .label
                  }

                  onChange={(
                    event
                  ) =>
                    nested(
                      "secondaryCta",
                      "label",
                      event.target.value
                    )
                  }

                  className={
                    inputClass
                  }
                />
              </Field>

            )}

          </EditorSection>


          {/* SCHEDULE */}

          <EditorSection
            title="Schedule"
            description="The backend will only expose this campaign during this period."
          >

            <div
              className="
                grid
                gap-4

                sm:grid-cols-2
              "
            >

              <Field
                label="Starts"
              >
                <input
                  type="datetime-local"

                  value={
                    form.startAt
                  }

                  onChange={(
                    event
                  ) =>
                    update(
                      "startAt",
                      event.target.value
                    )
                  }

                  className={
                    inputClass
                  }
                />
              </Field>


              <Field
                label="Ends"
              >
                <input
                  type="datetime-local"

                  value={
                    form.endAt
                  }

                  onChange={(
                    event
                  ) =>
                    update(
                      "endAt",
                      event.target.value
                    )
                  }

                  className={
                    inputClass
                  }
                />
              </Field>

            </div>

          </EditorSection>


          {/* COUNTDOWN */}

          <EditorSection
            title="Countdown"
            description="Use campaign expiry or a separate event date such as a branch opening."
          >

            <Toggle
              label="Show Countdown"

              checked={
                form.countdown
                  .enabled
              }

              onChange={(
                value
              ) =>
                nested(
                  "countdown",
                  "enabled",
                  value
                )
              }
            />


            {form.countdown
              .enabled && (

              <div
                className="
                  grid
                  gap-4

                  sm:grid-cols-2
                "
              >

                <Field
                  label="Countdown Label"
                >
                  <input
                    value={
                      form.countdown
                        .label
                    }

                    onChange={(
                      event
                    ) =>
                      nested(
                        "countdown",
                        "label",
                        event.target.value
                      )
                    }

                    placeholder="Offer Ends In"

                    className={
                      inputClass
                    }
                  />
                </Field>


                <Field
                  label="Countdown Target"
                >
                  <input
                    type="datetime-local"

                    value={
                      form.countdown
                        .targetAt
                    }

                    onChange={(
                      event
                    ) =>
                      nested(
                        "countdown",
                        "targetAt",
                        event.target.value
                      )
                    }

                    className={
                      inputClass
                    }
                  />
                </Field>

              </div>

            )}

          </EditorSection>


          {/* BEHAVIOUR */}

          <EditorSection
            title="Display Behaviour"
            description="Control urgency without annoying visitors."
          >

            <div
              className="
                grid
                gap-4

                sm:grid-cols-3
              "
            >

              <Field
                label="Delay Seconds"
              >
                <input
                  type="number"

                  min="0"
                  max="60"

                  value={
                    form.behavior
                      .delaySeconds
                  }

                  onChange={(
                    event
                  ) =>
                    nested(
                      "behavior",
                      "delaySeconds",
                      Number(
                        event.target.value
                      )
                    )
                  }

                  className={
                    inputClass
                  }
                />
              </Field>


              <Field
                label="Frequency"
              >
                <select
                  value={
                    form.behavior
                      .frequencyMode
                  }

                  onChange={(
                    event
                  ) =>
                    nested(
                      "behavior",
                      "frequencyMode",
                      event.target.value
                    )
                  }

                  className={
                    inputClass
                  }
                >
                  <option
                    value="every-visit"
                  >
                    Every Visit
                  </option>

                  <option
                    value="once-per-session"
                  >
                    Once Per Session
                  </option>

                  <option
                    value="once-per-day"
                  >
                    Once Per Day
                  </option>

                  <option
                    value="every-x-hours"
                  >
                    Every X Hours
                  </option>

                  <option
                    value="once-only"
                  >
                    Only Once
                  </option>
                </select>
              </Field>


              <Field
                label="Repeat Hours"
              >
                <input
                  type="number"

                  min="1"

                  disabled={
                    form.behavior
                      .frequencyMode !==
                    "every-x-hours"
                  }

                  value={
                    form.behavior
                      .repeatHours
                  }

                  onChange={(
                    event
                  ) =>
                    nested(
                      "behavior",
                      "repeatHours",
                      Number(
                        event.target.value
                      )
                    )
                  }

                  className={
                    inputClass
                  }
                />
              </Field>

            </div>


            <Field
              label="Priority 0 - 100"
            >
              <input
                type="range"

                min="0"
                max="100"

                value={
                  form.priority
                }

                onChange={(
                  event
                ) =>
                  update(
                    "priority",
                    Number(
                      event.target.value
                    )
                  )
                }

                className="
                  w-full
                "
              />


              <div
                className="
                  mt-2

                  text-xs
                  font-black

                  text-[#0060d0]
                "
              >
                {
                  form.priority
                }
              </div>
            </Field>

          </EditorSection>


          {/* TARGETING */}

          <EditorSection
            title="Page Targeting"
            description="Choose where this campaign is allowed to appear."
          >

            <Toggle
              label="Show on all public pages"

              checked={
                form.targeting
                  .allPages
              }

              onChange={(
                value
              ) =>
                nested(
                  "targeting",
                  "allPages",
                  value
                )
              }
            />


            {!form.targeting
              .allPages && (

              <Field
                label="Allowed Pages"
              >
                <input
                  value={
                    form.targeting
                      .pages
                      .join(
                        ", "
                      )
                  }

                  onChange={(
                    event
                  ) =>
                    nested(
                      "targeting",
                      "pages",
                      parsePaths(
                        event.target.value
                      )
                    )
                  }

                  placeholder="/, /services, /locations/kandy"

                  className={
                    inputClass
                  }
                />
              </Field>

            )}


            <Field
              label="Excluded Pages"
            >
              <input
                value={
                  form.targeting
                    .excludedPages
                    .join(
                      ", "
                    )
                }

                onChange={(
                  event
                ) =>
                  nested(
                    "targeting",
                    "excludedPages",
                    parsePaths(
                      event.target.value
                    )
                  )
                }

                placeholder="/admin"

                className={
                  inputClass
                }
              />
            </Field>

          </EditorSection>


          {/* STATE */}

          <EditorSection
            title="Publishing"
          >

            <Toggle
              label="Published"

              checked={
                form.published
              }

              onChange={(
                value
              ) =>
                update(
                  "published",
                  value
                )
              }
            />


            <Toggle
              label="Pause Campaign"

              checked={
                form.paused
              }

              onChange={(
                value
              ) =>
                update(
                  "paused",
                  value
                )
              }
            />

          </EditorSection>


          {/* BUTTONS */}

          <div
            className="
              grid
              gap-3

              sm:grid-cols-2
            "
          >

            <button
              type="button"

              onClick={
                preview
              }

              className="
                flex
                h-12

                items-center
                justify-center
                gap-2

                rounded-xl

                border
                border-slate-200

                bg-white

                text-[9px]
                font-black
                uppercase

                text-slate-600
              "
            >
              <Eye
                size={13}
              />

              Preview
            </button>


            <button
              type="button"

              disabled={
                saving
              }

              onClick={
                save
              }

              className="
                flex
                h-12

                items-center
                justify-center
                gap-2

                rounded-xl

                bg-[#00195f]

                text-[9px]
                font-black
                uppercase

                text-white

                transition

                hover:bg-[#0060d0]

                disabled:opacity-50
              "
            >
              {saving && (
                <Loader2
                  size={13}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : editing
                ? "Update Campaign"
                : "Create Campaign"}
            </button>

          </div>

        </div>

      </aside>

    </div>
  );
}


/* =========================================================
   PREVIEW
========================================================= */

function CampaignPreview({
  campaign,
  close,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[5000]

        flex
        items-center
        justify-center

        bg-[#00102e]/70

        p-4

        backdrop-blur-md
      "
    >

      <div
        className="
          relative

          w-full
          max-w-[760px]

          overflow-hidden

          rounded-[30px]

          bg-white

          shadow-[0_40px_140px_rgba(0,0,0,.35)]
        "
      >

        <button
          type="button"

          onClick={
            close
          }

          className="
            absolute
            right-4
            top-4
            z-20

            flex
            h-9
            w-9

            items-center
            justify-center

            rounded-full

            bg-black/45

            text-white
          "
        >
          <X
            size={14}
          />
        </button>


        {campaign.media
          ?.url && (

          campaign.media
            .type ===
          "video" ? (

            <video
              src={
                campaign.media
                  .url
              }

              autoPlay
              muted
              loop
              playsInline

              className="
                h-[280px]
                w-full

                object-cover
              "
            />

          ) : (

            <img
              src={
                campaign.media
                  .url
              }

              alt={
                campaign.headline
              }

              className="
                h-[280px]
                w-full

                object-cover
              "
            />

          )

        )}


        <div
          className="
            p-7

            sm:p-9
          "
        >

          {campaign.eyebrow && (
            <div
              className="
                text-[9px]
                font-black
                uppercase

                tracking-[2px]

                text-[#0060d0]
              "
            >
              {
                campaign.eyebrow
              }
            </div>
          )}


          <h2
            className="
              mt-2

              text-3xl
              font-black

              tracking-[-.04em]

              text-[#001f5c]
            "
          >
            {
              campaign.headline ||
              "Campaign headline"
            }
          </h2>


          <p
            className="
              mt-3

              text-sm
              leading-6

              text-slate-500
            "
          >
            {
              campaign.description
            }
          </p>


          {campaign.countdown
            ?.enabled && (

            <div
              className="
                mt-6
              "
            >

              <div
                className="
                  mb-2

                  text-[8px]
                  font-black
                  uppercase

                  tracking-[1.4px]

                  text-[#0060d0]
                "
              >
                {
                  campaign.countdown
                    .label
                }
              </div>


              <LiveCountdown
                targetAt={
                  campaign.countdown
                    .targetAt ||
                  campaign.endAt
                }
              />

            </div>

          )}


          {campaign.primaryCta
            ?.enabled && (

            <div
              className="
                mt-7

                flex
                h-12

                items-center
                justify-center

                rounded-xl

                bg-gradient-to-r

                from-[#001f5c]
                to-[#0062cc]

                text-xs
                font-black

                text-white
              "
            >
              {
                campaign.primaryCta
                  .label ||
                "Learn More"
              }
            </div>

          )}

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   COUNTDOWN
========================================================= */

function LiveCountdown({
  targetAt,
  compact = false,
}) {
  const [
    remaining,
    setRemaining,
  ] = useState(
    getRemaining(
      targetAt
    )
  );


  useEffect(
    () => {
      setRemaining(
        getRemaining(
          targetAt
        )
      );


      const timer =
        setInterval(
          () => {
            setRemaining(
              getRemaining(
                targetAt
              )
            );
          },
          1000
        );


      return () =>
        clearInterval(
          timer
        );
    },
    [
      targetAt,
    ]
  );


  return (
    <div
      className="
        grid
        grid-cols-4
        gap-2
      "
    >

      <CountdownCell
        label="Days"
        value={
          remaining.days
        }
        compact={
          compact
        }
      />


      <CountdownCell
        label="Hrs"
        value={
          remaining.hours
        }
        compact={
          compact
        }
      />


      <CountdownCell
        label="Min"
        value={
          remaining.minutes
        }
        compact={
          compact
        }
      />


      <CountdownCell
        label="Sec"
        value={
          remaining.seconds
        }
        compact={
          compact
        }
      />

    </div>
  );
}


function CountdownCell({
  label,
  value,
  compact,
}) {
  return (
    <div
      className="
        rounded-xl

        border
        border-blue-100

        bg-blue-50/60

        py-2.5

        text-center
      "
    >

      <div
        className={`
          font-black
          text-[#001f5c]

          ${
            compact
              ? "text-sm"
              : "text-xl"
          }
        `}
      >
        {String(
          value
        ).padStart(
          2,
          "0"
        )}
      </div>


      <div
        className="
          mt-0.5

          text-[6px]
          font-black
          uppercase

          tracking-[1px]

          text-[#0060d0]
        "
      >
        {label}
      </div>

    </div>
  );
}


/* =========================================================
   UI
========================================================= */

function Metric({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        rounded-[20px]

        border
        border-slate-200

        bg-white

        p-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              text-[8px]
              font-black
              uppercase

              tracking-[1.2px]

              text-slate-400
            "
          >
            {label}
          </div>


          <div
            className="
              mt-2

              text-xl
              font-black

              text-[#071b3d]
            "
          >
            {value}
          </div>

        </div>


        <div
          className="
            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-xl

            bg-rose-50

            text-[#ff416c]
          "
        >
          <Icon
            size={15}
          />
        </div>

      </div>

    </div>
  );
}


function EditorSection({
  title,
  description,
  children,
}) {
  return (
    <section>

      <div
        className="
          mb-4
        "
      >

        <div
          className="
            text-[9px]
            font-black
            uppercase

            tracking-[1.5px]

            text-[#0060d0]
          "
        >
          {title}
        </div>


        {description && (
          <p
            className="
              mt-1

              text-[9px]
              leading-5

              text-slate-400
            "
          >
            {description}
          </p>
        )}

      </div>


      <div
        className="
          space-y-4
        "
      >
        {children}
      </div>

    </section>
  );
}


function Field({
  label,
  children,
}) {
  return (
    <label
      className="
        block
      "
    >

      <span
        className="
          mb-2
          block

          text-[8px]
          font-black
          uppercase

          tracking-[1px]

          text-slate-400
        "
      >
        {label}
      </span>


      {children}

    </label>
  );
}


function Toggle({
  label,
  checked,
  onChange,
}) {
  return (
    <label
      className="
        flex
        cursor-pointer

        items-center
        justify-between

        rounded-xl

        border
        border-slate-200

        px-4
        py-3
      "
    >

      <span
        className="
          text-xs
          font-bold

          text-slate-600
        "
      >
        {label}
      </span>


      <button
        type="button"

        onClick={() =>
          onChange(
            !checked
          )
        }

        className={`
          relative

          h-6
          w-11

          rounded-full

          transition

          ${
            checked
              ? "bg-[#0060d0]"
              : "bg-slate-200"
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

            transition

            ${
              checked
                ? "left-6"
                : "left-1"
            }
          `}
        />
      </button>

    </label>
  );
}


function StatusBadge({
  status,
}) {
  const styles = {
    active:
      "bg-emerald-50 text-emerald-600",

    scheduled:
      "bg-blue-50 text-[#0060d0]",

    draft:
      "bg-slate-100 text-slate-500",

    paused:
      "bg-amber-50 text-amber-600",

    ended:
      "bg-violet-50 text-violet-600",

    archived:
      "bg-slate-200 text-slate-500",
  };


  return (
    <span
      className={`
        inline-flex

        items-center
        gap-1.5

        rounded-full

        px-2.5
        py-1

        text-[7px]
        font-black
        uppercase

        tracking-[.8px]

        ${
          styles[
            status
          ] ||
          styles.draft
        }
      `}
    >

      {status ===
        "active" && (
        <span
          className="
            h-1.5
            w-1.5

            animate-pulse

            rounded-full

            bg-emerald-500
          "
        />
      )}


      {status}

    </span>
  );
}


function InfoBox({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-xl

        bg-slate-50

        p-3
      "
    >

      <div
        className="
          text-[7px]
          font-black
          uppercase

          text-slate-400
        "
      >
        {label}
      </div>


      <div
        className="
          mt-1

          text-[9px]
          font-bold

          text-slate-600
        "
      >
        {value}
      </div>

    </div>
  );
}


function Action({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"

      onClick={
        onClick
      }

      className={`
        flex
        h-10
        flex-col

        items-center
        justify-center
        gap-1

        rounded-lg

        text-[6px]
        font-black
        uppercase

        transition

        ${
          danger
            ? "text-red-400 hover:bg-red-50 hover:text-red-500"
            : "text-slate-400 hover:bg-white hover:text-[#0060d0]"
        }
      `}
    >
      <Icon
        size={12}

        className={
          Icon ===
          Loader2
            ? "animate-spin"
            : ""
        }
      />

      {label}
    </button>
  );
}


function Message({
  type,
  children,
}) {
  return (
    <div
      className={`
        rounded-xl

        border

        px-4
        py-3

        text-[10px]
        font-bold

        ${
          type ===
          "error"
            ? "border-red-100 bg-red-50 text-red-600"
            : "border-emerald-100 bg-emerald-50 text-emerald-600"
        }
      `}
    >
      {children}
    </div>
  );
}


/* =========================================================
   CLASSES
========================================================= */

const inputClass =
  `
    h-11
    w-full

    rounded-xl

    border
    border-slate-200

    bg-white

    px-3

    text-xs
    font-semibold

    text-slate-700

    outline-none

    transition

    focus:border-[#168cff]
  `;


const textareaClass =
  `
    w-full

    resize-none

    rounded-xl

    border
    border-slate-200

    bg-white

    px-3
    py-3

    text-xs
    leading-6

    text-slate-700

    outline-none

    transition

    focus:border-[#168cff]
  `;


/* =========================================================
   HELPERS
========================================================= */

function createClientId() {
  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return crypto.randomUUID();
  }


  return `campaign-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}


function parsePaths(
  value
) {
  return String(
    value ||
    ""
  )
    .split(",")
    .map(
      (
        item
      ) =>
        item.trim()
    )
    .filter(
      Boolean
    );
}


function localDateToISO(
  value
) {
  if (!value) {
    return null;
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return null;
  }


  return date
    .toISOString();
}


function toDateTimeLocal(
  value
) {
  if (!value) {
    return "";
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }


  const timezoneOffset =
    date.getTimezoneOffset();


  const local =
    new Date(
      date.getTime() -
      timezoneOffset *
        60000
    );


  return local
    .toISOString()
    .slice(
      0,
      16
    );
}


function formatDate(
  value
) {
  if (!value) {
    return "Not set";
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
  }


  return date
    .toLocaleString(
      "en-LK",
      {
        day:
          "2-digit",

        month:
          "short",

        year:
          "numeric",

        hour:
          "2-digit",

        minute:
          "2-digit",
      }
    );
}


function getRemaining(
  value
) {
  if (!value) {
    return {
      total:
        0,

      days:
        0,

      hours:
        0,

      minutes:
        0,

      seconds:
        0,
    };
  }


  const difference =
    Math.max(
      new Date(
        value
      ).getTime() -
        Date.now(),
      0
    );


  const total =
    Math.floor(
      difference /
      1000
    );


  return {
    total,

    days:
      Math.floor(
        total /
        86400
      ),

    hours:
      Math.floor(
        (
          total %
          86400
        ) /
        3600
      ),

    minutes:
      Math.floor(
        (
          total %
          3600
        ) /
        60
      ),

    seconds:
      total %
      60,
  };
}