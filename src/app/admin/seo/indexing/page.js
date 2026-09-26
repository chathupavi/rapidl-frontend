"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  FileSearch,
  Globe2,
  Link2,
  Loader2,
  Save,
  ShieldCheck,
} from "lucide-react";

import {
  RefreshButton,
  SeoCard,
  SeoCardHeader,
  SeoHeader,
  SeoMain,
  SeoMetricCard,
  SeoPageShell,
  inputClass,
} from "../_components/SeoUI";


const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function IndexingPage() {
  const [
    data,
    setData,
  ] = useState(
    null
  );

  const [
    settings,
    setSettings,
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
    refreshing,
    setRefreshing,
  ] = useState(
    false
  );

  const [
    saving,
    setSaving,
  ] = useState(
    false
  );

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(
    new Date()
  );


  const load =
    useCallback(
      async (
        silent =
          false
      ) => {
        try {
          if (silent) {
            setRefreshing(
              true
            );
          } else {
            setLoading(
              true
            );
          }

          const response =
            await fetch(
              `${API_URL}/api/seo/indexing`,
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
              result.message
            );
          }

          setData(
            result.data
          );

          setSettings(
            result.data
              ?.settings ||
            {}
          );

          setLastUpdated(
            new Date()
          );
        } finally {
          setLoading(
            false
          );

          setRefreshing(
            false
          );
        }
      },
      []
    );


  useEffect(
    () => {
      load();
    },
    [
      load,
    ]
  );


  async function save() {
    try {
      setSaving(
        true
      );

      const response =
        await fetch(
          `${API_URL}/api/seo/indexing/settings`,
          {
            method:
              "PUT",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                settings
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
          result.message
        );
      }

      await load(
        true
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  if (
    loading ||
    !settings
  ) {
    return (
      <SeoPageShell>
        <div
          className="
            flex
            min-h-screen
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
      </SeoPageShell>
    );
  }


  const metrics =
    data?.metrics ||
    {};


  return (
    <SeoPageShell>

      <SeoHeader
        icon={
          Globe2
        }
        eyebrow="Search & Visibility"
        title="Indexing"
        description="
          Control search-engine discovery, sitemap inclusion,
          robots behavior and canonical readiness.
        "
        lastUpdated={
          lastUpdated
        }
        actions={
          <RefreshButton
            refreshing={
              refreshing
            }
            onClick={() =>
              load(
                true
              )
            }
          />
        }
      />


      <SeoMain>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <SeoMetricCard
            label="SEO Pages"
            value={
              metrics.total ||
              0
            }
            description="Configured pages"
            icon={
              Globe2
            }
            index={0}
          />

          <SeoMetricCard
            label="Indexable"
            value={
              metrics.indexable ||
              0
            }
            description="Search eligible"
            icon={
              FileSearch
            }
            index={1}
          />

          <SeoMetricCard
            label="Noindex"
            value={
              metrics.noindex ||
              0
            }
            description="Search excluded"
            icon={
              ShieldCheck
            }
            index={2}
          />

          <SeoMetricCard
            label="Missing Canonical"
            value={
              metrics
                .missingCanonical ||
              0
            }
            description="Canonical issues"
            icon={
              Link2
            }
            index={3}
          />
        </div>


        <section
          className="
            grid
            grid-cols-1
            gap-6
            xl:grid-cols-[420px_minmax(0,1fr)]
          "
        >

          <SeoCard>

            <SeoCardHeader
              eyebrow="Search Controls"
              title="Robots & Crawling"
              description="
                Configure search-engine access
                without manually editing robots.txt.
              "
            />


            <div
              className="
                mt-6
                space-y-3
              "
            >

              <Toggle
                label="Allow Search Engines"
                description="Allow crawlers to access public website pages."
                value={
                  settings
                    .allowSearchEngines
                }
                change={(
                  value
                ) =>
                  setSettings({
                    ...settings,

                    allowSearchEngines:
                      value,
                  })
                }
              />

              <Toggle
                label="Block /admin"
                description="Prevent admin pages from being crawled."
                value={
                  settings
                    .blockAdmin
                }
                change={(
                  value
                ) =>
                  setSettings({
                    ...settings,

                    blockAdmin:
                      value,
                  })
                }
              />

              <Toggle
                label="Block /api"
                description="Prevent API routes from appearing in search."
                value={
                  settings
                    .blockApi
                }
                change={(
                  value
                ) =>
                  setSettings({
                    ...settings,

                    blockApi:
                      value,
                  })
                }
              />

              <Toggle
                label="Block /login"
                description="Exclude the administrator login page."
                value={
                  settings
                    .blockLogin
                }
                change={(
                  value
                ) =>
                  setSettings({
                    ...settings,

                    blockLogin:
                      value,
                  })
                }
              />


              <label
                className="
                  block
                  pt-2
                "
              >
                <div
                  className="
                    mb-2
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[1px]
                    text-slate-400
                  "
                >
                  Sitemap URL
                </div>

                <input
                  value={
                    settings
                      .sitemapUrl ||
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    setSettings({
                      ...settings,

                      sitemapUrl:
                        event.target.value,
                    })
                  }
                  className={
                    inputClass
                  }
                />
              </label>


              <button
                type="button"
                onClick={
                  save
                }
                disabled={
                  saving
                }
                className="
                  mt-3
                  flex
                  h-11
                  w-full
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
                  hover:bg-[#00277f]
                  disabled:opacity-50
                "
              >
                {saving ? (
                  <Loader2
                    size={12}
                    className="
                      animate-spin
                    "
                  />
                ) : (
                  <Save
                    size={12}
                  />
                )}

                Save Indexing Settings
              </button>

            </div>

          </SeoCard>


          <SeoCard>

            <SeoCardHeader
              eyebrow="Technical SEO"
              title="Page Indexability"
              description="
                Review which URLs can be indexed,
                appear in the sitemap and have canonical URLs.
              "
            />


            <div
              className="
                mt-6
                overflow-x-auto
              "
            >
              <table
                className="
                  w-full
                  min-w-[760px]
                "
              >
                <thead>
                  <tr>
                    <TH>
                      Page
                    </TH>

                    <TH>
                      Index
                    </TH>

                    <TH>
                      Sitemap
                    </TH>

                    <TH>
                      Canonical
                    </TH>
                  </tr>
                </thead>

                <tbody>
                  {(
                    data?.pages ||
                    []
                  ).map(
                    (
                      page
                    ) => (
                      <tr
                        key={
                          page.id
                        }
                        className="
                          border-t
                          border-slate-100
                        "
                      >
                        <td
                          className="
                            py-4
                            pr-4
                          "
                        >
                          <div
                            className="
                              text-xs
                              font-black
                              text-[#071b3d]
                            "
                          >
                            {page.name ||
                              page.pageKey}
                          </div>

                          <div
                            className="
                              mt-1
                              text-[9px]
                              text-slate-400
                            "
                          >
                            {page.path}
                          </div>
                        </td>

                        <TD>
                          <StatusPill
                            yes={
                              page.seo
                                .index
                            }
                          />
                        </TD>

                        <TD>
                          <StatusPill
                            yes={
                              page
                                .sitemap
                                .include
                            }
                          />
                        </TD>

                        <TD>
                          <StatusPill
                            yes={
                              Boolean(
                                page.seo
                                  .canonical
                              )
                            }
                            yesText="Configured"
                            noText="Missing"
                          />
                        </TD>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

          </SeoCard>

        </section>

      </SeoMain>

    </SeoPageShell>
  );
}


function Toggle({
  label,
  description,
  value,
  change,
}) {
  return (
    <button
      type="button"
      onClick={() =>
        change(
          !value
        )
      }
      className="
        flex
        w-full
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-slate-100
        bg-slate-50/60
        px-4
        py-4
        text-left
      "
    >
      <div>
        <div
          className="
            text-xs
            font-black
            text-slate-700
          "
        >
          {label}
        </div>

        <div
          className="
            mt-1
            text-[9px]
            leading-5
            text-slate-400
          "
        >
          {description}
        </div>
      </div>

      <span
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition
          ${
            value
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
            transition-all
            ${
              value
                ? "left-6"
                : "left-1"
            }
          `}
        />
      </span>
    </button>
  );
}


function StatusPill({
  yes,
  yesText =
    "Yes",
  noText =
    "No",
}) {
  return (
    <span
      className={`
        inline-flex
        rounded-lg
        px-2
        py-1
        text-[8px]
        font-black
        ${
          yes
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600"
        }
      `}
    >
      {yes
        ? yesText
        : noText}
    </span>
  );
}


function TH({
  children,
}) {
  return (
    <th
      className="
        pb-3
        text-left
        text-[8px]
        font-black
        uppercase
        tracking-[1px]
        text-slate-400
      "
    >
      {children}
    </th>
  );
}


function TD({
  children,
}) {
  return (
    <td
      className="
        py-4
        pr-4
        text-[10px]
        font-semibold
        text-slate-500
      "
    >
      {children}
    </td>
  );
}