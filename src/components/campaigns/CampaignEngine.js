"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  ArrowUpRight,
  X,
} from "lucide-react";


const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;


const OVERLAY_TYPES = [
  "modal",
  "bottom-sheet",
  "fullscreen",
];


/* =========================================================
   ENGINE
========================================================= */

export default function CampaignEngine() {
  const pathname =
    usePathname();


  const [
    campaigns,
    setCampaigns,
  ] = useState(
    []
  );


  const [
    dismissed,
    setDismissed,
  ] = useState(
    []
  );


  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(
    () => {
      let mounted =
        true;


      async function load() {
        try {
          const response =
            await fetch(
              `${API_URL}/api/campaigns/active`,
              {
                cache:
                  "no-store",
              }
            );


          const result =
            await response.json();


          if (
            !mounted ||
            !response.ok ||
            !result.success
          ) {
            return;
          }


          setCampaigns(
            result.data
              ?.campaigns ||
            []
          );
        } catch (
          error
        ) {
          console.error(
            "Campaign Engine:",
            error
          );
        }
      }


      load();


      return () => {
        mounted =
          false;
      };
    },
    []
  );


  /* =======================================================
     FILTER
  ======================================================= */

  const eligible =
    useMemo(
      () =>
        campaigns.filter(
          (
            campaign
          ) =>
            !dismissed.includes(
              campaign.id
            ) &&
            campaignMatchesPath(
              campaign,
              pathname
            ) &&
            canShowCampaign(
              campaign
            )
        ),
      [
        campaigns,
        dismissed,
        pathname,
      ]
    );


  /*
   * Because campaigns are already sorted by backend priority,
   * find() automatically gives us the highest-priority item.
   */

  const overlay =
    eligible.find(
      (
        campaign
      ) =>
        OVERLAY_TYPES.includes(
          campaign.displayType
        )
    );


  const announcement =
    eligible.find(
      (
        campaign
      ) =>
        campaign.displayType ===
        "announcement-bar"
    );


  const floating =
    eligible.find(
      (
        campaign
      ) =>
        campaign.displayType ===
        "floating-card"
    );


  /* =======================================================
     DISMISS
  ======================================================= */

  const dismiss =
    useCallback(
      (
        campaign
      ) => {
        recordFrequency(
          campaign
        );


        setDismissed(
          (
            previous
          ) => [
            ...new Set([
              ...previous,
              campaign.id,
            ]),
          ]
        );
      },
      []
    );


  return (
    <>
      {announcement && (
        <AnnouncementCampaign
          campaign={
            announcement
          }

          dismiss={() =>
            dismiss(
              announcement
            )
          }
        />
      )}


      {floating && (
        <FloatingCampaign
          campaign={
            floating
          }

          dismiss={() =>
            dismiss(
              floating
            )
          }
        />
      )}


      {overlay && (
        <DelayedOverlay
          campaign={
            overlay
          }

          dismiss={() =>
            dismiss(
              overlay
            )
          }
        />
      )}
    </>
  );
}


/* =========================================================
   DELAY
========================================================= */

function DelayedOverlay({
  campaign,
  dismiss,
}) {
  const [
    visible,
    setVisible,
  ] = useState(
    false
  );


  useEffect(
    () => {
      const delay =
        Math.max(
          0,
          Number(
            campaign.behavior
              ?.delaySeconds ||
            0
          )
        ) *
        1000;


      const timeout =
        setTimeout(
          () => {
            setVisible(
              true
            );


            recordImpression(
              campaign
            );
          },
          delay
        );


      return () =>
        clearTimeout(
          timeout
        );
    },
    [
      campaign.id,
      campaign.behavior,
    ]
  );


  if (!visible) {
    return null;
  }


  if (
    campaign.displayType ===
    "fullscreen"
  ) {
    return (
      <FullscreenCampaign
        campaign={
          campaign
        }

        dismiss={
          dismiss
        }
      />
    );
  }


  if (
    campaign.displayType ===
    "bottom-sheet"
  ) {
    return (
      <BottomSheetCampaign
        campaign={
          campaign
        }

        dismiss={
          dismiss
        }
      />
    );
  }


  return (
    <ModalCampaign
      campaign={
        campaign
      }

      dismiss={
        dismiss
      }
    />
  );
}


/* =========================================================
   MODAL
========================================================= */

function ModalCampaign({
  campaign,
  dismiss,
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

        overflow-y-auto

        bg-[#00102e]/70

        p-4

        backdrop-blur-md
      "
    >

      <CampaignCreative
        campaign={
          campaign
        }

        dismiss={
          dismiss
        }

        className="
          max-w-[760px]

          rounded-[30px]
        "
      />

    </div>
  );
}


/* =========================================================
   BOTTOM SHEET
========================================================= */

function BottomSheetCampaign({
  campaign,
  dismiss,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[5000]

        flex
        items-end
        justify-center

        bg-[#00102e]/50

        sm:items-center
        sm:p-4
      "
    >

      <CampaignCreative
        campaign={
          campaign
        }

        dismiss={
          dismiss
        }

        className="
          max-w-[720px]

          rounded-t-[30px]

          sm:rounded-[30px]
        "
      />

    </div>
  );
}


/* =========================================================
   FULLSCREEN
========================================================= */

function FullscreenCampaign({
  campaign,
  dismiss,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[5000]

        overflow-y-auto

        bg-white
      "
    >

      <CampaignCreative
        campaign={
          campaign
        }

        dismiss={
          dismiss
        }

        className="
          min-h-screen
        "
      />

    </div>
  );
}


/* =========================================================
   CREATIVE
========================================================= */

function CampaignCreative({
  campaign,
  dismiss,
  className = "",
}) {
  return (
    <article
      className={`
        relative

        w-full

        overflow-hidden

        bg-white

        shadow-[0_40px_140px_rgba(0,0,0,.35)]

        ${className}
      `}
    >

      <button
        type="button"

        onClick={
          dismiss
        }

        aria-label="Close campaign"

        className="
          absolute
          right-4
          top-4
          z-30

          flex
          h-10
          w-10

          items-center
          justify-center

          rounded-full

          bg-black/40

          text-white

          backdrop-blur-md

          transition

          hover:bg-black/60
        "
      >
        <X
          size={15}
        />
      </button>


      <CampaignMedia
        campaign={
          campaign
        }
      />


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

              text-[#0062cc]
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

            text-2xl
            font-black

            tracking-[-.04em]

            text-[#001f5c]

            sm:text-3xl
          "
        >
          {
            campaign.headline
          }
        </h2>


        {campaign.description && (
          <p
            className="
              mt-3

              text-xs
              leading-6

              text-slate-500

              sm:text-sm
            "
          >
            {
              campaign.description
            }
          </p>
        )}


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

                flex
                items-center
                gap-2

                text-[8px]
                font-black
                uppercase

                tracking-[1.5px]

                text-[#0062cc]
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

              campaignEndAt={
                campaign.endAt
              }

              onExpired={
                dismiss
              }
            />

          </div>

        )}


        {campaign.primaryCta
          ?.enabled &&
          campaign.primaryCta
            ?.url && (

          <a
            href={
              campaign.primaryCta
                .url
            }

            onClick={() =>
              recordClick(
                campaign
              )
            }

            className="
              mt-7

              flex
              h-12

              items-center
              justify-center
              gap-2

              rounded-xl

              bg-gradient-to-r

              from-[#001f5c]
              to-[#0062cc]

              text-xs
              font-black

              text-white

              shadow-[0_12px_30px_rgba(0,98,204,.22)]

              transition

              hover:shadow-[0_16px_36px_rgba(0,98,204,.3)]
            "
          >
            {
              campaign.primaryCta
                .label ||
              "Learn More"
            }

            <ArrowUpRight
              size={13}
            />
          </a>

        )}


        {campaign.secondaryCta
          ?.enabled && (

          <button
            type="button"

            onClick={
              dismiss
            }

            className="
              mt-3
              w-full

              py-2

              text-[9px]
              font-bold

              text-slate-400

              transition

              hover:text-slate-600
            "
          >
            {
              campaign.secondaryCta
                .label ||
              "Maybe Later"
            }
          </button>

        )}

      </div>

    </article>
  );
}


/* =========================================================
   MEDIA
========================================================= */

function CampaignMedia({
  campaign,
}) {
  const media =
    campaign.media;


  if (
    !media?.url
  ) {
    return null;
  }


  if (
    media.type ===
    "video"
  ) {
    return (
      <video
        src={
          media.url
        }

        poster={
          media.posterUrl ||
          undefined
        }

        autoPlay
        muted
        loop
        playsInline

        className="
          h-[250px]
          w-full

          object-cover

          sm:h-[320px]
        "
      />
    );
  }


  return (
    <img
      src={
        media.url
      }

      alt={
        campaign.headline ||
        campaign.title
      }

      className="
        h-[250px]
        w-full

        object-cover

        sm:h-[320px]
      "
    />
  );
}


/* =========================================================
   ANNOUNCEMENT
========================================================= */

function AnnouncementCampaign({
  campaign,
  dismiss,
}) {
  useEffect(
    () => {
      recordImpression(
        campaign
      );
    },
    [
      campaign.id,
    ]
  );


  return (
    <>
      {/* SPACE RESERVED ABOVE NAVBAR */}
      <div
        className="
          h-[52px]
          sm:h-[48px]
        "
        aria-hidden="true"
      />


      <div
        className="
          fixed
          left-0
          right-0
          top-0

          z-[4500]

          min-h-[48px]

          bg-gradient-to-r
          from-[#001f5c]
          via-[#003f99]
          to-[#0062cc]

          px-4
          py-2.5

          text-white

          shadow-[0_8px_30px_rgba(0,31,92,.18)]
        "
      >

        <div
          className="
            mx-auto

            flex
            min-h-[28px]
            max-w-[1500px]

            items-center
            justify-between

            gap-3
          "
        >

          <div
            className="
              flex
              min-w-0
              flex-1

              items-center
              gap-3
            "
          >

            {campaign.eyebrow && (

              <span
                className="
                  hidden
                  shrink-0

                  rounded-full

                  border
                  border-white/20

                  bg-white/10

                  px-2.5
                  py-1

                  text-[7px]
                  font-black
                  uppercase

                  tracking-[1.2px]

                  text-blue-100

                  sm:inline-flex
                "
              >
                {
                  campaign.eyebrow
                }
              </span>

            )}


            <div
              className="
                min-w-0

                text-[9px]
                leading-4

                sm:text-[10px]
              "
            >

              <strong
                className="
                  font-black
                "
              >
                {
                  campaign.headline
                }
              </strong>


              {campaign.description && (

                <span
                  className="
                    ml-2

                    hidden

                    text-blue-100

                    md:inline
                  "
                >
                  {
                    campaign.description
                  }
                </span>

              )}

            </div>

          </div>


          <div
            className="
              flex
              shrink-0

              items-center
              gap-2
            "
          >

            {campaign.primaryCta
              ?.enabled &&
              campaign.primaryCta
                ?.url && (

              <a
                href={
                  campaign.primaryCta
                    .url
                }

                onClick={() =>
                  recordClick(
                    campaign
                  )
                }

                className="
                  hidden

                  rounded-lg

                  bg-white

                  px-3
                  py-1.5

                  text-[8px]
                  font-black

                  text-[#001f5c]

                  transition

                  hover:bg-blue-50

                  sm:inline-flex
                "
              >
                {
                  campaign.primaryCta
                    .label
                }
              </a>

            )}


            <button
              type="button"

              onClick={
                dismiss
              }

              aria-label="Close announcement"

              className="
                flex
                h-8
                w-8

                items-center
                justify-center

                rounded-full

                bg-white/10

                text-white

                transition

                hover:bg-white/20
              "
            >
              <X
                size={13}
              />
            </button>

          </div>

        </div>

      </div>
    </>
  );
}


/* =========================================================
   FLOATING
========================================================= */

function FloatingCampaign({
  campaign,
  dismiss,
}) {
  useEffect(
    () => {
      recordImpression(
        campaign
      );
    },
    [
      campaign.id,
    ]
  );


  return (
    <aside
      className="
        fixed
        bottom-5
        right-5
        z-[4400]

        w-[calc(100%-40px)]
        max-w-[360px]

        overflow-hidden

        rounded-[24px]

        border
        border-slate-200

        bg-white

        shadow-[0_25px_80px_rgba(15,23,42,.22)]
      "
    >

      <button
        type="button"

        onClick={
          dismiss
        }

        className="
          absolute
          right-3
          top-3
          z-20

          flex
          h-8
          w-8

          items-center
          justify-center

          rounded-full

          bg-black/40

          text-white
        "
      >
        <X
          size={12}
        />
      </button>


      {campaign.media
        ?.url && (

        <CampaignMedia
          campaign={
            campaign
          }
        />

      )}


      <div
        className="
          p-5
        "
      >

        {campaign.eyebrow && (
          <div
            className="
              text-[7px]
              font-black
              uppercase

              tracking-[1.3px]

              text-[#0062cc]
            "
          >
            {
              campaign.eyebrow
            }
          </div>
        )}


        <div
          className="
            mt-1

            text-sm
            font-black

            text-[#001f5c]
          "
        >
          {
            campaign.headline
          }
        </div>


        <p
          className="
            mt-2

            text-[10px]
            leading-5

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
              mt-4
            "
          >
            <LiveCountdown
              targetAt={
                campaign.countdown
                  .targetAt ||
                campaign.endAt
              }

              campaignEndAt={
                campaign.endAt
              }

              onExpired={
                dismiss
              }

              compact
            />
          </div>

        )}


        {campaign.primaryCta
          ?.enabled &&
          campaign.primaryCta
            ?.url && (

          <a
            href={
              campaign.primaryCta
                .url
            }

            onClick={() =>
              recordClick(
                campaign
              )
            }

            className="
              mt-4

              flex
              h-10

              items-center
              justify-center

              rounded-xl

              bg-[#001f5c]

              text-[9px]
              font-black

              text-white
            "
          >
            {
              campaign.primaryCta
                .label
            }
          </a>

        )}

      </div>

    </aside>
  );
}


/* =========================================================
   COUNTDOWN
========================================================= */

function LiveCountdown({
  targetAt,
  campaignEndAt,
  onExpired,
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
      const timer =
        setInterval(
          () => {
            const next =
              getRemaining(
                targetAt
              );


            setRemaining(
              next
            );


            /*
             * Only automatically hide when the campaign
             * itself has expired.
             *
             * If targetAt is a branch opening but campaign
             * continues after opening, the creative stays.
             */

            if (
              campaignEndAt &&
              new Date(
                campaignEndAt
              ).getTime() <=
                Date.now()
            ) {
              clearInterval(
                timer
              );


              onExpired?.();
            }
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
      campaignEndAt,
      onExpired,
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

      {[
        [
          "Days",
          remaining.days,
        ],

        [
          "Hrs",
          remaining.hours,
        ],

        [
          "Min",
          remaining.minutes,
        ],

        [
          "Sec",
          remaining.seconds,
        ],
      ].map(
        (
          [
            label,
            value,
          ]
        ) => (

          <div
            key={
              label
            }

            className="
              rounded-xl

              border
              border-blue-100

              bg-gradient-to-b

              from-white
              to-blue-50

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

                text-[#0062cc]
              "
            >
              {label}
            </div>

          </div>

        )
      )}

    </div>
  );
}


/* =========================================================
   TARGETING
========================================================= */

function campaignMatchesPath(
  campaign,
  pathname
) {
  if (!pathname) {
    return true;
  }


  if (
    pathname ===
      "/admin" ||
    pathname.startsWith(
      "/admin/"
    )
  ) {
    return false;
  }


  const targeting =
    campaign.targeting ||
    {};


  const excluded =
    targeting.excludedPages ||
    [];


  const excludedMatch =
    excluded.some(
      (
        path
      ) =>
        matchPath(
          pathname,
          path
        )
    );


  if (
    excludedMatch
  ) {
    return false;
  }


  if (
    targeting.allPages !==
    false
  ) {
    return true;
  }


  return (
    targeting.pages ||
    []
  ).some(
    (
      path
    ) =>
      matchPath(
        pathname,
        path
      )
  );
}


function matchPath(
  pathname,
  target
) {
  if (!target) {
    return false;
  }


  if (
    target ===
    "/"
  ) {
    return (
      pathname ===
      "/"
    );
  }


  return (
    pathname ===
      target ||
    pathname.startsWith(
      `${target}/`
    )
  );
}


/* =========================================================
   FREQUENCY
========================================================= */

function canShowCampaign(
  campaign
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }


  const mode =
    campaign.behavior
      ?.frequencyMode ||
    "once-per-session";


  const key =
    `rapid_campaign_${campaign.id}`;


  if (
    mode ===
    "every-visit"
  ) {
    return true;
  }


  if (
    mode ===
    "once-per-session"
  ) {
    return (
      sessionStorage.getItem(
        key
      ) !==
      "shown"
    );
  }


  const value =
    localStorage.getItem(
      key
    );


  if (
    mode ===
    "once-only"
  ) {
    return (
      value !==
      "shown"
    );
  }


  if (
    mode ===
    "once-per-day"
  ) {
    if (!value) {
      return true;
    }


    return (
      Date.now() -
      Number(
        value
      )
    ) >
      24 *
      60 *
      60 *
      1000;
  }


  if (
    mode ===
    "every-x-hours"
  ) {
    if (!value) {
      return true;
    }


    const hours =
      Math.max(
        1,
        Number(
          campaign.behavior
            ?.repeatHours ||
          24
        )
      );


    return (
      Date.now() -
      Number(
        value
      )
    ) >
      hours *
      60 *
      60 *
      1000;
  }


  return true;
}


function recordFrequency(
  campaign
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }


  const mode =
    campaign.behavior
      ?.frequencyMode ||
    "once-per-session";


  const key =
    `rapid_campaign_${campaign.id}`;


  if (
    mode ===
    "once-per-session"
  ) {
    sessionStorage.setItem(
      key,
      "shown"
    );

    return;
  }


  if (
    mode ===
    "once-only"
  ) {
    localStorage.setItem(
      key,
      "shown"
    );

    return;
  }


  if (
    mode ===
      "once-per-day" ||
    mode ===
      "every-x-hours"
  ) {
    localStorage.setItem(
      key,
      String(
        Date.now()
      )
    );
  }
}


/* =========================================================
   ANALYTICS PLACEHOLDERS
========================================================= */

function recordImpression(
  campaign
) {
  /*
   * Next step:
   * send campaign_impression to GA4 or
   * /api/campaigns/:id/events.
   */

  console.debug(
    "Campaign impression:",
    campaign.id
  );
}


function recordClick(
  campaign
) {
  console.debug(
    "Campaign click:",
    campaign.id
  );
}


/* =========================================================
   TIME
========================================================= */

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