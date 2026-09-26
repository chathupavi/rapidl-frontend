"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Building2,
  CirclePlus,
  Factory,
  GripVertical,
  Hotel,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Sparkles,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";


/* =========================================================
   CONFIG
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   ICON OPTIONS
========================================================= */

const ICON_OPTIONS = [
  {
    value: "Hotel",
    label: "Hotel",
    icon: Hotel,
  },
  {
    value: "Building2",
    label: "Business",
    icon: Building2,
  },
  {
    value: "Factory",
    label: "Factory",
    icon: Factory,
  },
  {
    value: "UtensilsCrossed",
    label: "Restaurant",
    icon: UtensilsCrossed,
  },
  {
    value: "Sparkles",
    label: "Premium",
    icon: Sparkles,
  },
];


const ICON_MAP = {
  Hotel,
  Building2,
  Factory,
  UtensilsCrossed,
  Sparkles,
};


/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_FORM = {
  label:
    "Commercial Laundry",

  heading:
    "Built for businesses that",

  headingHighlight:
    "cannot compromise.",

  description:
    "Reliable commercial laundry solutions designed for businesses that need consistent quality, hygiene, turnaround and professional presentation.",

  eyebrow:
    "Commercial Solutions",

  benefits: [
    {
      title:
        "Consistent Quality",

      description:
        "Structured processes and quality controls for every commercial order.",

      icon:
        "Sparkles",
    },

    {
      title:
        "Reliable Turnaround",

      description:
        "Scheduled processing designed around your operational requirements.",

      icon:
        "Building2",
    },

    {
      title:
        "Scalable Capacity",

      description:
        "Laundry support for growing businesses and high-volume requirements.",

      icon:
        "Factory",
    },
  ],

  industries: [
    {
      title:
        "Hotels & Hospitality",

      description:
        "Professional linen, towel, uniform and guest laundry support.",

      icon:
        "Hotel",

      active:
        true,
    },

    {
      title:
        "Restaurants",

      description:
        "Table linen, kitchen fabrics, aprons and staff uniform care.",

      icon:
        "UtensilsCrossed",

      active:
        true,
    },

    {
      title:
        "Corporate & Offices",

      description:
        "Professional uniform and textile care for modern workplaces.",

      icon:
        "Building2",

      active:
        true,
    },

    {
      title:
        "Industrial",

      description:
        "Structured garment and textile processing for operational environments.",

      icon:
        "Factory",

      active:
        true,
    },
  ],

  primaryButton: {
    label:
      "Request a Proposal",

    href:
      "#contact",
  },

  secondaryButton: {
    label:
      "Talk to Our Team",

    href:
      "#contact",
  },

  published:
    true,
};


/* =========================================================
   PAGE
========================================================= */

export default function CommercialAdminPage() {
  const [
    form,
    setForm,
  ] = useState(
    DEFAULT_FORM
  );


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  const [
    success,
    setSuccess,
  ] = useState("");


  /* =======================================================
     LOAD
  ======================================================= */

  const loadCommercial =
    useCallback(
      async () => {
        try {
          setLoading(true);

          setError("");

          setSuccess("");


          if (!API_URL) {
            throw new Error(
              "NEXT_PUBLIC_API_URL is missing."
            );
          }


          const response =
            await fetch(
              `${API_URL}/api/sections/commercial`,
              {
                credentials:
                  "include",

                cache:
                  "no-store",
              }
            );


          const result =
            await response.json();


          if (!response.ok) {
            throw new Error(
              result.message ||
                "Unable to load Commercial section."
            );
          }


          const data =
            result.data ||
            result.section ||
            result;


          setForm({
            ...DEFAULT_FORM,
            ...data,

            benefits:
              Array.isArray(
                data?.benefits
              )
                ? data.benefits
                : DEFAULT_FORM.benefits,

            industries:
              Array.isArray(
                data?.industries
              )
                ? data.industries
                : DEFAULT_FORM.industries,

            primaryButton: {
              ...DEFAULT_FORM.primaryButton,
              ...data?.primaryButton,
            },

            secondaryButton: {
              ...DEFAULT_FORM.secondaryButton,
              ...data?.secondaryButton,
            },
          });
        } catch (error) {
          console.error(
            "Commercial load error:",
            error
          );


          setError(
            error.message ||
              "Unable to load Commercial section."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );


  useEffect(() => {
    loadCommercial();
  }, [loadCommercial]);


  /* =======================================================
     BASIC FIELD
  ======================================================= */

  function updateField(
    field,
    value
  ) {
    setForm(
      (current) => ({
        ...current,

        [field]:
          value,
      })
    );
  }


  /* =======================================================
     BUTTON FIELD
  ======================================================= */

  function updateButton(
    field,
    key,
    value
  ) {
    setForm(
      (current) => ({
        ...current,

        [field]: {
          ...current[field],

          [key]:
            value,
        },
      })
    );
  }


  /* =======================================================
     BENEFITS
  ======================================================= */

  function addBenefit() {
    setForm(
      (current) => ({
        ...current,

        benefits: [
          ...current.benefits,

          {
            title: "",
            description: "",
            icon:
              "Sparkles",
          },
        ],
      })
    );
  }


  function updateBenefit(
    index,
    field,
    value
  ) {
    setForm(
      (current) => {
        const benefits = [
          ...current.benefits,
        ];


        benefits[index] = {
          ...benefits[index],

          [field]:
            value,
        };


        return {
          ...current,

          benefits,
        };
      }
    );
  }


  function removeBenefit(
    index
  ) {
    setForm(
      (current) => ({
        ...current,

        benefits:
          current.benefits.filter(
            (
              _,
              itemIndex
            ) =>
              itemIndex !==
              index
          ),
      })
    );
  }


  /* =======================================================
     INDUSTRIES
  ======================================================= */

  function addIndustry() {
    setForm(
      (current) => ({
        ...current,

        industries: [
          ...current.industries,

          {
            title: "",
            description: "",
            icon:
              "Building2",

            active:
              true,
          },
        ],
      })
    );
  }


  function updateIndustry(
    index,
    field,
    value
  ) {
    setForm(
      (current) => {
        const industries = [
          ...current.industries,
        ];


        industries[index] = {
          ...industries[index],

          [field]:
            value,
        };


        return {
          ...current,

          industries,
        };
      }
    );
  }


  function removeIndustry(
    index
  ) {
    setForm(
      (current) => ({
        ...current,

        industries:
          current.industries.filter(
            (
              _,
              itemIndex
            ) =>
              itemIndex !==
              index
          ),
      })
    );
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function handleSave(
    event
  ) {
    event.preventDefault();


    try {
      setSaving(true);

      setError("");

      setSuccess("");


      if (!form.heading.trim()) {
        throw new Error(
          "Commercial heading is required."
        );
      }


      const payload = {
        ...form,

        benefits:
          form.benefits
            .map(
              (
                item
              ) => ({
                title:
                  String(
                    item.title ||
                      ""
                  ).trim(),

                description:
                  String(
                    item.description ||
                      ""
                  ).trim(),

                icon:
                  item.icon ||
                  "Sparkles",
              })
            )
            .filter(
              (
                item
              ) =>
                item.title
            ),

        industries:
          form.industries
            .map(
              (
                item
              ) => ({
                title:
                  String(
                    item.title ||
                      ""
                  ).trim(),

                description:
                  String(
                    item.description ||
                      ""
                  ).trim(),

                icon:
                  item.icon ||
                  "Building2",

                active:
                  Boolean(
                    item.active
                  ),
              })
            )
            .filter(
              (
                item
              ) =>
                item.title
            ),
      };


      const response =
        await fetch(
          `${API_URL}/api/sections/commercial`,
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
                payload
              ),
          }
        );


      const result =
        await response.json();


      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save Commercial section."
        );
      }


      setSuccess(
        "Commercial section updated successfully."
      );
    } catch (error) {
      console.error(
        "Commercial save error:",
        error
      );


      setError(
        error.message ||
          "Unable to save Commercial section."
      );
    } finally {
      setSaving(false);
    }
  }


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[500px]
          items-center
          justify-center
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-sm
            font-bold
            text-slate-400
          "
        >
          <Loader2
            size={20}
            className="
              animate-spin
              text-[#0062CC]
            "
          />

          Loading Commercial content...
        </div>
      </div>
    );
  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <form
      onSubmit={
        handleSave
      }
      className="
        mx-auto
        max-w-[1500px]
      "
    >

      {/* ===================================================
          HEADER
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-5
          xl:flex-row
          xl:items-end
          xl:justify-between
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
              tracking-[0.17em]
              text-[#0062CC]
            "
          >
            <Building2
              size={14}
            />

            Content Studio
          </div>


          <h1
            className="
              mt-3
              text-3xl
              font-black
              tracking-[-0.045em]
              text-[#001F5C]
              sm:text-4xl
            "
          >
            Commercial
          </h1>


          <p
            className="
              mt-3
              max-w-[700px]
              text-sm
              leading-6
              text-slate-500
            "
          >
            Manage Rapid's commercial laundry messaging, business benefits,
            target industries and proposal actions.
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
              loadCommercial
            }
            disabled={
              saving
            }
            className="
              inline-flex
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
              uppercase
              tracking-[0.12em]
              text-[#001F5C]
              transition
              hover:text-[#0062CC]
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={14}
            />

            Reload
          </button>


          <button
            type="submit"
            disabled={
              saving
            }
            className="
              inline-flex
              h-11
              min-w-[140px]
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#001F5C]
              via-[#0062CC]
              to-[#0084E3]
              px-6
              text-[9px]
              font-black
              uppercase
              tracking-[0.12em]
              text-white
              shadow-[0_10px_28px_rgba(0,98,204,.20)]
              transition
              hover:-translate-y-0.5
              disabled:opacity-60
            "
          >
            {saving ? (
              <Loader2
                size={14}
                className="animate-spin"
              />
            ) : (
              <Save
                size={14}
              />
            )}

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>


      {/* STATUS */}

      {error && (
        <div
          className="
            mt-6
            rounded-[16px]
            border
            border-red-200
            bg-red-50
            px-5
            py-4
            text-xs
            font-bold
            text-red-600
          "
        >
          {error}
        </div>
      )}


      {success && (
        <div
          className="
            mt-6
            rounded-[16px]
            border
            border-emerald-200
            bg-emerald-50
            px-5
            py-4
            text-xs
            font-bold
            text-emerald-600
          "
        >
          {success}
        </div>
      )}


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <div
        className="
          mt-7
          grid
          gap-6
          xl:grid-cols-[1fr_340px]
        "
      >

        {/* LEFT */}

        <div
          className="
            space-y-6
          "
        >

          {/* HERO CONTENT */}

          <EditorSection
            title="Commercial Introduction"
            description="Main heading and messaging for the commercial section."
          >
            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              <Input
                label="Section Label"
                value={
                  form.label
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "label",
                    event.target
                      .value
                  )
                }
                placeholder="Commercial Laundry"
              />


              <Input
                label="Eyebrow"
                value={
                  form.eyebrow
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "eyebrow",
                    event.target
                      .value
                  )
                }
                placeholder="Commercial Solutions"
              />


              <Input
                label="Heading"
                value={
                  form.heading
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "heading",
                    event.target
                      .value
                  )
                }
                placeholder="Built for businesses that"
              />


              <Input
                label="Highlighted Heading"
                value={
                  form.headingHighlight
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "headingHighlight",
                    event.target
                      .value
                  )
                }
                placeholder="cannot compromise."
              />
            </div>


            <div className="mt-4">
              <Textarea
                label="Description"
                value={
                  form.description
                }
                onChange={(
                  event
                ) =>
                  updateField(
                    "description",
                    event.target
                      .value
                  )
                }
                placeholder="Describe Rapid's commercial laundry offering..."
              />
            </div>
          </EditorSection>


          {/* =================================================
              BENEFITS
          ================================================= */}

          <EditorSection
            title="Commercial Benefits"
            description="Key reasons businesses should choose Rapid."
            action={
              <button
                type="button"
                onClick={
                  addBenefit
                }
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#EEF6FF]
                  px-3
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.1em]
                  text-[#0062CC]
                "
              >
                <Plus
                  size={12}
                />

                Add Benefit
              </button>
            }
          >
            <div
              className="
                space-y-3
              "
            >
              {form.benefits.map(
                (
                  benefit,
                  index
                ) => (
                  <BenefitEditor
                    key={
                      index
                    }
                    benefit={
                      benefit
                    }
                    index={
                      index
                    }
                    onUpdate={
                      updateBenefit
                    }
                    onDelete={() =>
                      removeBenefit(
                        index
                      )
                    }
                  />
                )
              )}


              {form.benefits.length ===
                0 && (
                <EmptyEditor
                  label="No benefits added"
                  onClick={
                    addBenefit
                  }
                />
              )}
            </div>
          </EditorSection>


          {/* =================================================
              INDUSTRIES
          ================================================= */}

          <EditorSection
            title="Industries We Serve"
            description="Business sectors displayed in the Commercial section."
            action={
              <button
                type="button"
                onClick={
                  addIndustry
                }
                className="
                  inline-flex
                  h-9
                  items-center
                  gap-2
                  rounded-lg
                  bg-[#EEF6FF]
                  px-3
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.1em]
                  text-[#0062CC]
                "
              >
                <CirclePlus
                  size={12}
                />

                Add Industry
              </button>
            }
          >
            <div
              className="
                grid
                gap-3
                lg:grid-cols-2
              "
            >
              {form.industries.map(
                (
                  industry,
                  index
                ) => (
                  <IndustryEditor
                    key={
                      index
                    }
                    industry={
                      industry
                    }
                    index={
                      index
                    }
                    onUpdate={
                      updateIndustry
                    }
                    onDelete={() =>
                      removeIndustry(
                        index
                      )
                    }
                  />
                )
              )}
            </div>


            {form.industries.length ===
              0 && (
              <EmptyEditor
                label="No industries added"
                onClick={
                  addIndustry
                }
              />
            )}
          </EditorSection>

        </div>


        {/* =================================================
            RIGHT SETTINGS
        ================================================= */}

        <aside
          className="
            space-y-5
          "
        >

          {/* PUBLISH */}

          <EditorSection
            title="Publishing"
            description="Control whether Commercial content is active."
          >
            <Toggle
              label="Published"
              description="Allow this commercial section to be displayed on the public website."
              checked={
                form.published
              }
              onChange={() =>
                updateField(
                  "published",
                  !form.published
                )
              }
            />
          </EditorSection>


          {/* PRIMARY CTA */}

          <EditorSection
            title="Primary Action"
            description="Main commercial conversion button."
          >
            <div
              className="
                space-y-4
              "
            >
              <Input
                label="Button Label"
                value={
                  form.primaryButton
                    .label
                }
                onChange={(
                  event
                ) =>
                  updateButton(
                    "primaryButton",
                    "label",
                    event.target
                      .value
                  )
                }
                placeholder="Request a Proposal"
              />


              <Input
                label="Button Link"
                value={
                  form.primaryButton
                    .href
                }
                onChange={(
                  event
                ) =>
                  updateButton(
                    "primaryButton",
                    "href",
                    event.target
                      .value
                  )
                }
                placeholder="#contact"
              />
            </div>
          </EditorSection>


          {/* SECONDARY CTA */}

          <EditorSection
            title="Secondary Action"
            description="Alternative contact action."
          >
            <div
              className="
                space-y-4
              "
            >
              <Input
                label="Button Label"
                value={
                  form.secondaryButton
                    .label
                }
                onChange={(
                  event
                ) =>
                  updateButton(
                    "secondaryButton",
                    "label",
                    event.target
                      .value
                  )
                }
                placeholder="Talk to Our Team"
              />


              <Input
                label="Button Link"
                value={
                  form.secondaryButton
                    .href
                }
                onChange={(
                  event
                ) =>
                  updateButton(
                    "secondaryButton",
                    "href",
                    event.target
                      .value
                  )
                }
                placeholder="#contact"
              />
            </div>
          </EditorSection>

        </aside>
      </div>


      {/* BOTTOM SAVE */}

      <div
        className="
          mt-7
          flex
          justify-end
        "
      >
        <button
          type="submit"
          disabled={
            saving
          }
          className="
            inline-flex
            h-12
            min-w-[165px]
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#001F5C]
            via-[#0062CC]
            to-[#0084E3]
            px-6
            text-[9px]
            font-black
            uppercase
            tracking-[0.12em]
            text-white
            shadow-[0_12px_30px_rgba(0,98,204,.20)]
            disabled:opacity-60
          "
        >
          {saving ? (
            <Loader2
              size={14}
              className="animate-spin"
            />
          ) : (
            <Save
              size={14}
            />
          )}

          {saving
            ? "Saving..."
            : "Save Commercial"}
        </button>
      </div>

    </form>
  );
}


/* =========================================================
   BENEFIT EDITOR
========================================================= */

function BenefitEditor({
  benefit,
  index,
  onUpdate,
  onDelete,
}) {
  return (
    <div
      className="
        grid
        gap-3
        rounded-[18px]
        border
        border-slate-200
        bg-[#FAFCFF]
        p-4
        md:grid-cols-[40px_1fr_170px_40px]
        md:items-start
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          text-slate-300
        "
      >
        <GripVertical
          size={16}
        />
      </div>


      <div
        className="
          space-y-3
        "
      >
        <Input
          label={`Benefit ${index + 1}`}
          value={
            benefit.title
          }
          onChange={(
            event
          ) =>
            onUpdate(
              index,
              "title",
              event.target
                .value
            )
          }
          placeholder="Consistent Quality"
        />


        <Textarea
          label="Description"
          value={
            benefit.description
          }
          onChange={(
            event
          ) =>
            onUpdate(
              index,
              "description",
              event.target
                .value
            )
          }
          rows={2}
          placeholder="Describe this benefit..."
        />
      </div>


      <IconSelect
        value={
          benefit.icon
        }
        onChange={(
          value
        ) =>
          onUpdate(
            index,
            "icon",
            value
          )
        }
      />


      <button
        type="button"
        onClick={
          onDelete
        }
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          border
          border-slate-200
          bg-white
          text-slate-400
          transition
          hover:border-red-200
          hover:bg-red-50
          hover:text-red-500
        "
      >
        <Trash2
          size={14}
        />
      </button>
    </div>
  );
}


/* =========================================================
   INDUSTRY EDITOR
========================================================= */

function IndustryEditor({
  industry,
  index,
  onUpdate,
  onDelete,
}) {
  const Icon =
    ICON_MAP[
      industry.icon
    ] ||
    Building2;


  return (
    <div
      className="
        rounded-[18px]
        border
        border-slate-200
        bg-[#FAFCFF]
        p-4
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#EEF6FF]
            text-[#0062CC]
          "
        >
          <Icon
            size={16}
          />
        </div>


        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <button
            type="button"
            onClick={() =>
              onUpdate(
                index,
                "active",
                !industry.active
              )
            }
            className={`
              rounded-full
              px-3
              py-1.5
              text-[7px]
              font-black
              uppercase
              tracking-[0.1em]

              ${
                industry.active
                  ? `
                    bg-emerald-50
                    text-emerald-600
                  `
                  : `
                    bg-slate-100
                    text-slate-400
                  `
              }
            `}
          >
            {industry.active
              ? "Active"
              : "Hidden"}
          </button>


          <button
            type="button"
            onClick={
              onDelete
            }
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-slate-400
              hover:bg-red-50
              hover:text-red-500
            "
          >
            <Trash2
              size={13}
            />
          </button>
        </div>
      </div>


      <div
        className="
          mt-4
          space-y-3
        "
      >
        <Input
          label="Industry Name"
          value={
            industry.title
          }
          onChange={(
            event
          ) =>
            onUpdate(
              index,
              "title",
              event.target
                .value
            )
          }
          placeholder="Hotels & Hospitality"
        />


        <Textarea
          label="Description"
          value={
            industry.description
          }
          onChange={(
            event
          ) =>
            onUpdate(
              index,
              "description",
              event.target
                .value
            )
          }
          rows={2}
          placeholder="Describe the commercial requirement..."
        />


        <IconSelect
          value={
            industry.icon
          }
          onChange={(
            value
          ) =>
            onUpdate(
              index,
              "icon",
              value
            )
          }
        />
      </div>
    </div>
  );
}


/* =========================================================
   ICON SELECT
========================================================= */

function IconSelect({
  value,
  onChange,
}) {
  return (
    <label className="block">
      <SectionLabel>
        Icon
      </SectionLabel>


      <select
        value={
          value
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target
              .value
          )
        }
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          text-xs
          font-semibold
          text-[#001F5C]
          outline-none
          focus:border-[#0062CC]/30
        "
      >
        {ICON_OPTIONS.map(
          (
            option
          ) => (
            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {
                option.label
              }
            </option>
          )
        )}
      </select>
    </label>
  );
}


/* =========================================================
   EDITOR SECTION
========================================================= */

function EditorSection({
  title,
  description,
  action,
  children,
}) {
  return (
    <section
      className="
        rounded-[22px]
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(15,23,42,.025)]
        sm:p-6
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-5
          border-b
          border-slate-100
          pb-4
        "
      >
        <div>
          <h2
            className="
              text-sm
              font-black
              text-[#001F5C]
            "
          >
            {title}
          </h2>


          {description && (
            <p
              className="
                mt-1
                text-[11px]
                leading-5
                text-slate-400
              "
            >
              {description}
            </p>
          )}
        </div>


        {action}
      </div>


      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}


/* =========================================================
   INPUT
========================================================= */

function Input({
  label,
  ...props
}) {
  return (
    <label className="block">
      <SectionLabel>
        {label}
      </SectionLabel>


      <input
        {...props}
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          text-[#001F5C]
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-[#0062CC]/30
          focus:ring-4
          focus:ring-[#0062CC]/[0.05]
        "
      />
    </label>
  );
}


/* =========================================================
   TEXTAREA
========================================================= */

function Textarea({
  label,
  rows = 4,
  ...props
}) {
  return (
    <label className="block">
      <SectionLabel>
        {label}
      </SectionLabel>


      <textarea
        {...props}
        rows={
          rows
        }
        className="
          mt-2
          w-full
          resize-none
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          leading-6
          text-[#001F5C]
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-[#0062CC]/30
          focus:ring-4
          focus:ring-[#0062CC]/[0.05]
        "
      />
    </label>
  );
}


/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  label,
  description,
  checked,
  onChange,
}) {
  return (
    <button
      type="button"
      onClick={
        onChange
      }
      className="
        flex
        w-full
        items-center
        justify-between
        gap-4
        rounded-[16px]
        border
        border-slate-200
        bg-[#FAFCFF]
        p-4
        text-left
      "
    >
      <div>
        <div
          className="
            text-sm
            font-black
            text-[#001F5C]
          "
        >
          {label}
        </div>


        <p
          className="
            mt-1
            text-[10px]
            leading-5
            text-slate-400
          "
        >
          {description}
        </p>
      </div>


      <div
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full
          transition-colors

          ${
            checked
              ? "bg-[#0062CC]"
              : "bg-slate-300"
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
            shadow
            transition-transform

            ${
              checked
                ? "translate-x-6"
                : "translate-x-1"
            }
          `}
        />
      </div>
    </button>
  );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyEditor({
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className="
        flex
        min-h-[110px]
        w-full
        items-center
        justify-center
        rounded-[16px]
        border
        border-dashed
        border-slate-300
        bg-[#FAFCFF]
        text-xs
        font-bold
        text-slate-400
        transition
        hover:border-[#0062CC]/30
        hover:text-[#0062CC]
      "
    >
      + {label}
    </button>
  );
}


/* =========================================================
   LABEL
========================================================= */

function SectionLabel({
  children,
}) {
  return (
    <div
      className="
        text-[8px]
        font-black
        uppercase
        tracking-[0.14em]
        text-slate-500
      "
    >
      {children}
    </div>
  );
}