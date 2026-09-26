"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Edit3,
  FileText,
  Loader2,
  Save,
  Search,
  X,
} from "lucide-react";

import {
  HealthBadge,
  RefreshButton,
  SeoCard,
  SeoCardHeader,
  SeoHeader,
  SeoMain,
  SeoPageShell,
  inputClass,
  textareaClass,
} from "../_components/SeoUI";


const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


export default function PageSeoPage() {
  const [
    pages,
    setPages,
  ] = useState(
    []
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
    search,
    setSearch,
  ] = useState(
    ""
  );

  const [
    editor,
    setEditor,
  ] = useState(
    null
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


  const loadPages =
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
              `${API_URL}/api/seo/pages`,
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

          setPages(
            result.data
              ?.pages ||
            []
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
      loadPages();
    },
    [
      loadPages,
    ]
  );


  const filtered =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase();

        if (!query) {
          return pages;
        }

        return pages.filter(
          (
            page
          ) =>
            [
              page.name,
              page.path,
              page.seo
                ?.title,
              page.keywords
                ?.primary,
            ]
              .filter(
                Boolean
              )
              .join(" ")
              .toLowerCase()
              .includes(
                query
              )
        );
      },
      [
        pages,
        search,
      ]
    );


  async function savePage() {
    if (!editor) {
      return;
    }

    try {
      setSaving(
        true
      );

      const response =
        await fetch(
          `${API_URL}/api/seo/pages/${editor.id}`,
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
                editor
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

      setEditor(
        null
      );

      await loadPages(
        true
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  return (
    <SeoPageShell>

      <SeoHeader
        icon={
          FileText
        }
        eyebrow="Search & Visibility"
        title="Page SEO"
        description="
          Optimize search metadata, target keywords,
          canonical URLs, social previews and
          structured data for every public page.
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
              loadPages(
                true
              )
            }
          />
        }
      />


      <SeoMain>

        <SeoCard>

          <SeoCardHeader
            eyebrow="Page Optimization"
            title="SEO Page Directory"
            description="
              Review search readiness and optimization
              health across public website pages.
            "
          />


          <div
            className="
              mt-6
              flex
              flex-col
              gap-4
              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div
              className="
                relative
                w-full
                md:max-w-[420px]
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
                placeholder="Search page, path or keyword..."
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
                  outline-none
                  transition
                  focus:border-[#0060d0]
                  focus:bg-white
                "
              />
            </div>


            <div
              className="
                rounded-full
                bg-blue-50
                px-3
                py-1.5
                text-[10px]
                font-black
                text-[#0060d0]
              "
            >
              {filtered.length} Pages
            </div>

          </div>


          <div
            className="
              mt-6
              overflow-x-auto
            "
          >

            <table
              className="
                w-full
                min-w-[950px]
              "
            >

              <thead>
                <tr>
                  <TH>
                    Page
                  </TH>

                  <TH>
                    Primary Keyword
                  </TH>

                  <TH>
                    Score
                  </TH>

                  <TH>
                    Health
                  </TH>

                  <TH>
                    Index
                  </TH>

                  <TH right>
                    Action
                  </TH>
                </tr>
              </thead>


              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan={6}
                      className="
                        py-20
                        text-center
                      "
                    >
                      <Loader2
                        size={22}
                        className="
                          mx-auto
                          animate-spin
                          text-[#0060d0]
                        "
                      />
                    </td>
                  </tr>

                ) : filtered.map(
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
                        transition
                        hover:bg-blue-50/20
                      "
                    >

                      <td
                        className="
                          py-4
                          pr-5
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

                        <div
                          className="
                            mt-1
                            max-w-[420px]
                            truncate
                            text-[9px]
                            text-slate-400
                          "
                        >
                          {page.seo
                            ?.title ||
                            "No SEO title"}
                        </div>
                      </td>


                      <TD>
                        {page
                          .keywords
                          ?.primary ||
                          "—"}
                      </TD>


                      <td>
                        <div
                          className="
                            text-sm
                            font-black
                            text-[#071b3d]
                          "
                        >
                          {page.score}
                        </div>

                        <div
                          className="
                            mt-1
                            h-1.5
                            w-20
                            overflow-hidden
                            rounded-full
                            bg-slate-100
                          "
                        >
                          <div
                            style={{
                              width:
                                `${page.score}%`,
                            }}
                            className="
                              h-full
                              rounded-full
                              bg-gradient-to-r
                              from-[#00195f]
                              to-[#4fc3f7]
                            "
                          />
                        </div>
                      </td>


                      <TD>
                        <HealthBadge
                          health={
                            page.health
                          }
                        />
                      </TD>


                      <TD>
                        <span
                          className={`
                            inline-flex
                            rounded-lg
                            px-2
                            py-1
                            text-[8px]
                            font-black
                            ${
                              page.seo
                                ?.index
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-slate-500"
                            }
                          `}
                        >
                          {page.seo
                            ?.index
                            ? "INDEX"
                            : "NOINDEX"}
                        </span>
                      </TD>


                      <td
                        className="
                          text-right
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setEditor(
                              structuredClone(
                                page
                              )
                            )
                          }
                          className="
                            inline-flex
                            h-9
                            items-center
                            gap-2
                            rounded-xl
                            bg-blue-50
                            px-3
                            text-[9px]
                            font-black
                            text-[#0060d0]
                            transition
                            hover:bg-blue-100
                          "
                        >
                          <Edit3
                            size={12}
                          />

                          Optimize
                        </button>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </SeoCard>

      </SeoMain>


      {editor && (
        <PageSeoEditor
          page={
            editor
          }
          setPage={
            setEditor
          }
          close={() =>
            setEditor(
              null
            )
          }
          save={
            savePage
          }
          saving={
            saving
          }
        />
      )}

    </SeoPageShell>
  );
}


/* =========================================================
   EDITOR
========================================================= */

function PageSeoEditor({
  page,
  setPage,
  close,
  save,
  saving,
}) {
  function update(
    group,
    field,
    value
  ) {
    setPage(
      (
        current
      ) => ({
        ...current,

        [group]: {
          ...current[
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
        z-[5000]
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
          right-0
          top-0
          h-full
          w-full
          max-w-[720px]
          overflow-y-auto
          bg-white
          shadow-[-30px_0_80px_rgba(15,23,42,.2)]
        "
      >

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
                tracking-[1.8px]
                text-[#0060d0]
              "
            >
              SEO Optimization
            </div>

            <h2
              className="
                mt-1
                text-xl
                font-black
                text-[#071b3d]
              "
            >
              {page.name ||
                page.path}
            </h2>

            <p
              className="
                mt-1
                text-[10px]
                text-slate-400
              "
            >
              {page.path}
            </p>

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
              size={14}
            />
          </button>
        </div>


        <div
          className="
            space-y-8
            p-6
          "
        >

          <EditorSection
            eyebrow="Search"
            title="Search Metadata"
          >

            <Field
              label="SEO Title"
            >
              <input
                value={
                  page.seo
                    ?.title ||
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "seo",
                    "title",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              />

              <Counter
                value={
                  page.seo
                    ?.title ||
                  ""
                }
                max={60}
              />
            </Field>


            <Field
              label="Meta Description"
            >
              <textarea
                value={
                  page.seo
                    ?.description ||
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "seo",
                    "description",
                    event.target.value
                  )
                }
                className={
                  textareaClass
                }
              />

              <Counter
                value={
                  page.seo
                    ?.description ||
                  ""
                }
                max={160}
              />
            </Field>


            <Field
              label="Canonical URL"
            >
              <input
                value={
                  page.seo
                    ?.canonical ||
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "seo",
                    "canonical",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              />
            </Field>


            <SwitchRow
              title="Allow Indexing"
              description="Allow search engines to index this page."
              value={
                page.seo
                  ?.index !==
                false
              }
              onChange={(
                value
              ) =>
                update(
                  "seo",
                  "index",
                  value
                )
              }
            />

          </EditorSection>


          <EditorSection
            eyebrow="Keywords"
            title="Search Targeting"
          >

            <Field
              label="Primary Keyword"
            >
              <input
                value={
                  page.keywords
                    ?.primary ||
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "keywords",
                    "primary",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              />
            </Field>


            <Field
              label="Secondary Keywords"
            >
              <input
                value={
                  (
                    page
                      .keywords
                      ?.secondary ||
                    []
                  ).join(
                    ", "
                  )
                }
                onChange={(
                  event
                ) =>
                  update(
                    "keywords",
                    "secondary",
                    event.target.value
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
                      )
                  )
                }
                className={
                  inputClass
                }
              />
            </Field>

          </EditorSection>


          <EditorSection
            eyebrow="Social"
            title="Open Graph Metadata"
          >

            <Field
              label="Social Title"
            >
              <input
                value={
                  page.social
                    ?.ogTitle ||
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "social",
                    "ogTitle",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              />
            </Field>


            <Field
              label="Social Description"
            >
              <textarea
                value={
                  page.social
                    ?.ogDescription ||
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "social",
                    "ogDescription",
                    event.target.value
                  )
                }
                className={
                  textareaClass
                }
              />
            </Field>


            <Field
              label="Open Graph Image URL"
            >
              <input
                value={
                  page.social
                    ?.ogImage ||
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "social",
                    "ogImage",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
              />
            </Field>

          </EditorSection>


          <EditorSection
            eyebrow="Preview"
            title="Google Search Preview"
          >
            <div
              className="
                rounded-[18px]
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
              "
            >
              <div
                className="
                  text-[10px]
                  text-slate-500
                "
              >
                rapidlaundromat.lk
                {page.path}
              </div>

              <div
                className="
                  mt-2
                  text-[18px]
                  leading-6
                  text-[#1a0dab]
                "
              >
                {page.seo
                  ?.title ||
                  "SEO Title"}
              </div>

              <div
                className="
                  mt-1.5
                  text-[11px]
                  leading-5
                  text-slate-600
                "
              >
                {page.seo
                  ?.description ||
                  "Meta description preview will appear here."}
              </div>
            </div>
          </EditorSection>


          <button
            type="button"
            onClick={
              save
            }
            disabled={
              saving
            }
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#00195f]
              text-[10px]
              font-black
              uppercase
              tracking-[.6px]
              text-white
              shadow-[0_12px_28px_rgba(0,25,95,.18)]
              transition
              hover:bg-[#00277f]
              disabled:opacity-50
            "
          >
            {saving ? (
              <Loader2
                size={13}
                className="
                  animate-spin
                "
              />
            ) : (
              <Save
                size={13}
              />
            )}

            Save SEO Changes
          </button>

        </div>

      </aside>

    </div>
  );
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function EditorSection({
  eyebrow,
  title,
  children,
}) {
  return (
    <section>

      <div
        className="
          text-[9px]
          font-black
          uppercase
          tracking-[1.8px]
          text-[#0060d0]
        "
      >
        {eyebrow}
      </div>


      <h3
        className="
          mt-1
          text-base
          font-black
          text-[#071b3d]
        "
      >
        {title}
      </h3>


      <div
        className="
          mt-4
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
        {label}
      </div>

      {children}
    </label>
  );
}


function Counter({
  value,
  max,
}) {
  return (
    <div
      className="
        mt-1
        text-right
        text-[8px]
        font-semibold
        text-slate-400
      "
    >
      {value.length}/{max}
    </div>
  );
}


function SwitchRow({
  title,
  description,
  value,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onChange(
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
        border-slate-200
        bg-slate-50/40
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
          {title}
        </div>

        <div
          className="
            mt-1
            text-[9px]
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


function TH({
  children,
  right =
    false,
}) {
  return (
    <th
      className={`
        pb-3
        text-[8px]
        font-black
        uppercase
        tracking-[1px]
        text-slate-400
        ${
          right
            ? "text-right"
            : "text-left"
        }
      `}
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