"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  X,
} from "lucide-react";


const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;


/* =========================================================
   PUBLIC CAMPAIGN POPUP
========================================================= */

export default function CampaignPopup() {
  const [
    campaign,
    setCampaign,
  ] = useState(
    null
  );


  const [
    visible,
    setVisible,
  ] = useState(
    false
  );


  /* =======================================================
     CHECK FREQUENCY
  ======================================================= */

  const canShow =
    useCallback(
      (
        item
      ) => {
        const key =
          `rapid_campaign_${item.id}`;


        if (
          item.frequencyMode ===
          "every-visit"
        ) {
          return true;
        }


        if (
          item.frequencyMode ===
          "once-per-session"
        ) {
          return (
            sessionStorage.getItem(
              key
            ) !==
            "shown"
          );
        }


        const stored =
          localStorage.getItem(
            key
          );


        if (
          item.frequencyMode ===
          "once-only"
        ) {
          return !stored;
        }


        if (
          item.frequencyMode ===
          "once-per-day"
        ) {
          if (!stored) {
            return true;
          }


          const last =
            Number(
              stored
            );


          return (
            Date.now() -
            last
          ) >
          86400000;
        }


        return true;
      },
      []
    );


  /* =======================================================
     LOAD
  ======================================================= */

  useEffect(
    () => {
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


          const campaigns =
            result.data
              ?.campaigns ||
            [];


          const popup =
            campaigns.find(
              (
                item
              ) =>
                item.displayType ===
                  "modal" &&
                canShow(
                  item
                )
            );


          if (!popup) {
            return;
          }


          setCampaign(
            popup
          );


          setTimeout(
            () => {
              setVisible(
                true
              );
            },
            3000
          );
        } catch (
          error
        ) {
          console.error(
            "Campaign Popup Error:",
            error
          );
        }
      }


      load();
    },
    [
      canShow,
    ]
  );


  /* =======================================================
     CLOSE
  ======================================================= */

  function close() {
    if (!campaign) {
      return;
    }


    const key =
      `rapid_campaign_${campaign.id}`;


    if (
      campaign.frequencyMode ===
      "once-per-session"
    ) {
      sessionStorage.setItem(
        key,
        "shown"
      );
    }


    if (
      campaign.frequencyMode ===
      "once-per-day"
    ) {
      localStorage.setItem(
        key,
        String(
          Date.now()
        )
      );
    }


    if (
      campaign.frequencyMode ===
      "once-only"
    ) {
      localStorage.setItem(
        key,
        "shown"
      );
    }


    setVisible(
      false
    );
  }


  if (
    !campaign ||
    !visible
  ) {
    return null;
  }


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

          shadow-[0_40px_150px_rgba(0,0,0,.4)]
        "
      >

        <button
          onClick={
            close
          }

          className="
            absolute
            right-4
            top-4
            z-30

            flex
            h-9
            w-9

            items-center
            justify-center

            rounded-full

            bg-black/35

            text-white

            backdrop-blur
          "
        >
          <X
            size={14}
          />
        </button>


        {/* MEDIA */}

        {campaign.mediaType ===
          "image" &&
          campaign.mediaUrl && (

          <img
            src={
              campaign.mediaUrl
            }

            alt={
              campaign.headline
            }

            className="
              h-[250px]
              w-full

              object-cover

              sm:h-[320px]
            "
          />

        )}


        {campaign.mediaType ===
          "video" &&
          campaign.mediaUrl && (

          <video
            src={
              campaign.mediaUrl
            }

            poster={
              campaign.posterUrl
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

        )}


        {/* CONTENT */}

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
                campaign={
                  campaign
                }

                close={
                  close
                }
              />

            </div>

          )}


          {campaign.primaryCta
            ?.enabled && (

            <a
              href={
                campaign.primaryCta
                  .url
              }

              onClick={
                close
              }

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

                shadow-[0_12px_30px_rgba(0,98,204,.22)]
              "
            >
              {
                campaign.primaryCta
                  .label
              }
            </a>

          )}


          {campaign.secondaryCta
            ?.enabled && (

            <button
              onClick={
                close
              }

              className="
                mt-3
                w-full

                py-2

                text-[9px]
                font-bold

                text-slate-400
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

      </div>

    </div>
  );
}


/* =========================================================
   LIVE COUNTDOWN
========================================================= */

function LiveCountdown({
  campaign,
  close,
}) {
  const target =
    campaign.countdown
      ?.targetAt ||
    campaign.endAt;


  const [
    remaining,
    setRemaining,
  ] = useState(
    getRemaining(
      target
    )
  );


  useEffect(
    () => {
      const timer =
        setInterval(
          () => {
            const next =
              getRemaining(
                target
              );


            setRemaining(
              next
            );


            if (
              next.total <=
              0
            ) {
              close();
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
      target,
      close,
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

      <CountdownUnit
        value={
          remaining.days
        }

        label="Days"
      />


      <CountdownUnit
        value={
          remaining.hours
        }

        label="Hours"
      />


      <CountdownUnit
        value={
          remaining.minutes
        }

        label="Minutes"
      />


      <CountdownUnit
        value={
          remaining.seconds
        }

        label="Seconds"
      />

    </div>
  );
}


function CountdownUnit({
  value,
  label,
}) {
  return (
    <div
      className="
        rounded-xl

        border
        border-blue-100

        bg-gradient-to-b

        from-white
        to-blue-50

        py-3

        text-center
      "
    >

      <div
        className="
          text-lg
          font-black

          text-[#001f5c]

          sm:text-xl
        "
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
          mt-1

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
  );
}


function getRemaining(
  value
) {
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