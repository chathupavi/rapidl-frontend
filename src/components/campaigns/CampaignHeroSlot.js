"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
} from "lucide-react";


const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;


/* =========================================================
   HERO CAMPAIGN SLOT
========================================================= */

export default function CampaignHeroSlot() {
  const [
    campaign,
    setCampaign,
  ] = useState(
    null
  );


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


          if (
            !response.ok ||
            !result.success
          ) {
            return;
          }


          const hero =
            (
              result.data
                ?.campaigns ||
              []
            ).find(
              (
                item
              ) =>
                item.displayType ===
                "hero-banner"
            );


          setCampaign(
            hero ||
            null
          );
        } catch (
          error
        ) {
          console.error(
            error
          );
        }
      }


      load();
    },
    []
  );


  if (!campaign) {
    return null;
  }


  return (
<section
  className="
    mx-auto

    w-full
    max-w-[1500px]

    px-4

    pt-6
    pb-8

    sm:px-6
    sm:pt-8
    sm:pb-10

    lg:px-8
    lg:pt-10
    lg:pb-12
  "
>

      <div
        className="
          relative

          overflow-hidden

          rounded-[26px]

          bg-gradient-to-r

          from-[#001f5c]
          to-[#0062cc]

          text-white
        "
      >

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
                absolute
                inset-0

                h-full
                w-full

                object-cover

                opacity-30
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
                absolute
                inset-0

                h-full
                w-full

                object-cover

                opacity-30
              "
            />

          )

        )}


        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r

            from-[#001f5c]
            via-[#001f5c]/85
            to-[#0062cc]/30
          "
        />


        <div
          className="
            relative

            max-w-3xl

            px-6
            py-9

            sm:px-9
            sm:py-12
          "
        >

          {campaign.eyebrow && (
            <div
              className="
                text-[9px]
                font-black
                uppercase

                tracking-[2px]

                text-blue-200
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

              max-w-xl

              text-xs
              leading-6

              text-blue-100
            "
          >
            {
              campaign.description
            }
          </p>


          {campaign.primaryCta
            ?.enabled &&
            campaign.primaryCta
              ?.url && (

            <a
              href={
                campaign.primaryCta
                  .url
              }

              className="
                mt-6

                inline-flex

                h-11

                items-center
                gap-2

                rounded-xl

                bg-white

                px-5

                text-[9px]
                font-black

                text-[#001f5c]
              "
            >
              {
                campaign.primaryCta
                  .label
              }

              <ArrowRight
                size={12}
              />
            </a>

          )}

        </div>

      </div>

    </section>
  );
}