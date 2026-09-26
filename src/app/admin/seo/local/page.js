"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  Edit3,
  Loader2,
  MapPin,
  Save,
  Store,
  X,
  XCircle,
} from "lucide-react";

import {
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


export default function LocalSeoPage() {
  const [
    branches,
    setBranches,
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
    editing,
    setEditing,
  ] = useState(
    null
  );

  const [
    lastUpdated,
    setLastUpdated,
  ] = useState(
    new Date()
  );


  const loadBranches =
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
              `${API_URL}/api/seo/local`,
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

          setBranches(
            result.data
              ?.branches ||
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
      loadBranches();
    },
    [
      loadBranches,
    ]
  );


  return (
    <SeoPageShell>

      <SeoHeader
        icon={
          MapPin
        }
        eyebrow="Search & Visibility"
        title="Local SEO"
        description="
          Optimize each Rapid branch for location-based
          discovery, Google local intent and near-me searches.
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
              loadBranches(
                true
              )
            }
          />
        }
      />


      <SeoMain>

        {loading ? (

          <div
            className="
              flex
              min-h-[60vh]
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

        ) : (

          <>
            <section>

              <div
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[2px]
                  text-[#0060d0]
                "
              >
                Branch Visibility
              </div>

              <h2
                className="
                  mt-1
                  text-lg
                  font-black
                  tracking-tight
                  text-[#071b3d]
                "
              >
                Local Search Readiness
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-slate-400
                "
              >
                Branch-level SEO health based on location,
                contact, schema and page optimization.
              </p>


              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-5
                  xl:grid-cols-2
                "
              >

                {branches.map(
                  (
                    branch
                  ) => (
                    <BranchSeoCard
                      key={
                        branch.id
                      }
                      branch={
                        branch
                      }
                      edit={() =>
                        setEditing(
                          structuredClone(
                            branch
                          )
                        )
                      }
                    />
                  )
                )}

              </div>

            </section>
          </>

        )}

      </SeoMain>


      {editing && (
        <LocalSeoEditor
          branch={
            editing
          }
          close={() =>
            setEditing(
              null
            )
          }
          refresh={
            loadBranches
          }
        />
      )}

    </SeoPageShell>
  );
}


/* =========================================================
   BRANCH CARD
========================================================= */

function BranchSeoCard({
  branch,
  edit,
}) {
  return (
    <SeoCard>

      <SeoCardHeader
        eyebrow={
          branch.district ||
          "Branch"
        }
        title={
          branch.name
        }
        description={
          branch.address ||
          "Branch address not configured"
        }
        action={
          <div
            className="
              text-right
            "
          >
            <div
              className="
                text-2xl
                font-black
                text-[#071b3d]
              "
            >
              {branch.score}
            </div>

            <div
              className="
                text-[7px]
                font-black
                uppercase
                tracking-[1px]
                text-slate-400
              "
            >
              Local Score
            </div>
          </div>
        }
      />


      <div
        className="
          mt-6
          grid
          grid-cols-2
          gap-3
        "
      >
        {Object.entries(
          branch.checks ||
            {}
        ).map(
          ([
            key,
            value,
          ]) => (
            <LocalCheck
              key={
                key
              }
              label={
                labelize(
                  key
                )
              }
              ok={
                value
              }
            />
          )
        )}
      </div>


      <div
        className="
          mt-6
          flex
          items-center
          justify-between
          gap-4
          border-t
          border-slate-100
          pt-5
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-[9px]
            font-semibold
            text-slate-400
          "
        >
          <Store
            size={12}
          />

          {
            branch.seo
              ? "SEO configured"
              : "SEO setup required"
          }
        </div>


        <button
          type="button"
          onClick={
            edit
          }
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-xl
            bg-[#00195f]
            px-4
            text-[9px]
            font-black
            text-white
            transition
            hover:bg-[#00277f]
          "
        >
          <Edit3
            size={12}
          />

          Optimize Branch
        </button>
      </div>

    </SeoCard>
  );
}


/* =========================================================
   CHECK
========================================================= */

function LocalCheck({
  label,
  ok,
}) {
  const Icon =
    ok
      ? CheckCircle2
      : XCircle;


  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-slate-100
        bg-slate-50/60
        px-3
        py-3
      "
    >

      <div
        className={`
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-lg
          ${
            ok
              ? "bg-emerald-50 text-emerald-500"
              : "bg-rose-50 text-rose-500"
          }
        `}
      >
        <Icon
          size={12}
        />
      </div>


      <span
        className="
          text-[9px]
          font-black
          text-slate-600
        "
      >
        {label}
      </span>

    </div>
  );
}


/* =========================================================
   EDITOR
========================================================= */

function LocalSeoEditor({
  branch,
  close,
  refresh,
}) {
  const [
    form,
    setForm,
  ] = useState(
    branch.seo || {
      seo: {
        title:
          "",

        description:
          "",

        canonical:
          "",

        index:
          true,
      },

      keywords: {
        primary:
          "",

        secondary:
          [],
      },

      social: {
        ogTitle:
          "",

        ogDescription:
          "",

        ogImage:
          "",
      },
    }
  );

  const [
    saving,
    setSaving,
  ] = useState(
    false
  );


  function update(
    group,
    field,
    value
  ) {
    setForm(
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


  async function save() {
    try {
      setSaving(
        true
      );

      const response =
        await fetch(
          `${API_URL}/api/seo/local/${branch.id}`,
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
                form
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

      close();

      await refresh(
        true
      );
    } finally {
      setSaving(
        false
      );
    }
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
          max-w-[660px]
          overflow-y-auto
          bg-white
          shadow-[-30px_0_80px_rgba(15,23,42,.2)]
        "
      >

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
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
              Local SEO
            </div>

            <h2
              className="
                mt-1
                text-xl
                font-black
                text-[#071b3d]
              "
            >
              {branch.name}
            </h2>

            <p
              className="
                mt-1
                text-[10px]
                text-slate-400
              "
            >
              {branch.address}
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
            space-y-5
            p-6
          "
        >

          <Field
            label="SEO Title"
          >
            <input
              className={
                inputClass
              }
              value={
                form.seo
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
            />
          </Field>


          <Field
            label="Meta Description"
          >
            <textarea
              className={
                textareaClass
              }
              value={
                form.seo
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
            />
          </Field>


          <Field
            label="Primary Local Keyword"
          >
            <input
              className={
                inputClass
              }
              value={
                form.keywords
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
            />
          </Field>


          <Field
            label="Secondary Keywords"
          >
            <input
              className={
                inputClass
              }
              value={
                (
                  form.keywords
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
            />
          </Field>


          <Field
            label="Canonical URL"
          >
            <input
              className={
                inputClass
              }
              value={
                form.seo
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
            />
          </Field>


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
              text-white
              shadow-[0_12px_28px_rgba(0,25,95,.18)]
              transition
              hover:bg-[#00277f]
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

            Save Local SEO
          </button>

        </div>

      </aside>

    </div>
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


function labelize(
  value
) {
  return value
    .replace(
      /^has/,
      ""
    )
    .replace(
      /([A-Z])/g,
      " $1"
    )
    .trim();
}