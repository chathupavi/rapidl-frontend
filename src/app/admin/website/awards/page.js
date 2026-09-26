"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Award,
  Edit3,
  ExternalLink,
  ImageIcon,
  Plus,
  Search,
  Star,
  Trash2,
  Trophy,
} from "lucide-react";

import PhotoUploader from "@/components/admin/locations/PhotoUploader";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   CREATE EMPTY FORM
========================================================= */

function createEmptyAward() {
  return {
    title: "",

    organization: "",

    year:
      new Date().getFullYear(),

    category: "",

    recognition: "",

    description: "",

    /*
     * Complete Firebase Storage
     * image object goes here.
     */
    image: null,

    sourceUrl: "",

    order: 0,

    featured: false,

    published: true,
  };
}


/* =========================================================
   PAGE
========================================================= */

export default function AwardsAdminPage() {
  const [
    awards,
    setAwards,
  ] =
    useState([]);


  const [
    form,
    setForm,
  ] =
    useState(
      createEmptyAward
    );


  const [
    editingId,
    setEditingId,
  ] =
    useState(null);


  const [
    search,
    setSearch,
  ] =
    useState("");


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    saving,
    setSaving,
  ] =
    useState(false);


  /* =======================================================
     LOAD AWARDS
  ======================================================= */

  async function loadAwards() {
    try {
      setLoading(
        true
      );


      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is missing."
        );
      }


      const response =
        await fetch(
          `${API_URL}/api/admin/awards`,
          {
            method:
              "GET",

            cache:
              "no-store",

            credentials:
              "include",

            headers: {
              Accept:
                "application/json",
            },
          }
        );


      const result =
        await response.json();


      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
          "Failed to load awards."
        );
      }


      setAwards(
        Array.isArray(
          result.awards
        )
          ? result.awards
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load awards:",
        error
      );
    } finally {
      setLoading(
        false
      );
    }
  }


  useEffect(() => {
    loadAwards();
  }, []);


  /* =======================================================
     FILTER
  ======================================================= */

  const filteredAwards =
    useMemo(
      () => {
        const keyword =
          search
            .trim()
            .toLowerCase();


        if (!keyword) {
          return awards;
        }


        return awards.filter(
          (
            award
          ) =>
            [
              award.title,
              award.organization,
              award.category,
              award.recognition,
              award.year,
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
                      keyword
                    )
              )
        );
      },
      [
        awards,
        search,
      ]
    );


  /* =======================================================
     FIELD CHANGE
  ======================================================= */

  function updateField(
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


  /* =======================================================
     EDIT
  ======================================================= */

  function editAward(
    award
  ) {
    setEditingId(
      award.id
    );


    setForm({
      title:
        award.title ||
        "",

      organization:
        award.organization ||
        "",

      year:
        award.year ||
        new Date()
          .getFullYear(),

      category:
        award.category ||
        "",

      recognition:
        award.recognition ||
        "",

      description:
        award.description ||
        "",

      /*
       * Existing Firebase
       * image object.
       */
      image:
        award.image ||
        null,

      sourceUrl:
        award.sourceUrl ||
        "",

      order:
        Number(
          award.order ||
          0
        ),

      featured:
        award.featured ===
        true,

      published:
        award.published !==
        false,
    });


    window.scrollTo({
      top: 0,

      behavior:
        "smooth",
    });
  }


  /* =======================================================
     RESET
  ======================================================= */

  function resetForm() {
    setEditingId(
      null
    );


    setForm(
      createEmptyAward()
    );
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();


    if (
      !form.title.trim()
    ) {
      alert(
        "Please enter the award title."
      );

      return;
    }


    try {
      setSaving(
        true
      );


      /*
       * IMPORTANT:
       *
       * form.image already contains
       * the Firebase Storage URL/path
       * returned by PhotoUploader.
       */

      const payload = {
        title:
          form.title.trim(),

        organization:
          form.organization.trim(),

        year:
          Number(
            form.year
          ),

        category:
          form.category.trim(),

        recognition:
          form.recognition.trim(),

        description:
          form.description.trim(),

        /*
         * Save complete image object
         * to Firestore.
         */
        image:
          form.image ||
          null,

        sourceUrl:
          form.sourceUrl.trim(),

        order:
          Number(
            form.order ||
            0
          ),

        featured:
          form.featured ===
          true,

        published:
          form.published !==
          false,
      };


      const url =
        editingId
          ? `${API_URL}/api/admin/awards/${editingId}`
          : `${API_URL}/api/admin/awards`;


      const response =
        await fetch(
          url,
          {
            method:
              editingId
                ? "PUT"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            credentials:
              "include",

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
        !result?.success
      ) {
        throw new Error(
          result?.message ||
          "Failed to save award."
        );
      }


      resetForm();


      await loadAwards();
    } catch (error) {
      console.error(
        "Save award failed:",
        error
      );


      alert(
        error?.message ||
        "Failed to save award."
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

  async function deleteAward(
    id
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this award?"
      );


    if (!confirmed) {
      return;
    }


    try {
      const response =
        await fetch(
          `${API_URL}/api/admin/awards/${id}`,
          {
            method:
              "DELETE",

            credentials:
              "include",

            headers: {
              Accept:
                "application/json",
            },
          }
        );


      const result =
        await response.json();


      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
          "Delete failed."
        );
      }


      if (
        editingId ===
        id
      ) {
        resetForm();
      }


      await loadAwards();
    } catch (error) {
      console.error(
        "Delete award failed:",
        error
      );


      alert(
        error?.message ||
        "Failed to delete award."
      );
    }
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-[#F5F8FC]
        p-5
        lg:p-8
      "
    >

      <div
        className="
          mx-auto
          max-w-[1500px]
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-4

            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                font-black
                uppercase
                tracking-[.17em]
                text-[#0062CC]
              "
            >
              <Trophy
                size={15}
              />

              Brand Recognition
            </div>


            <h1
              className="
                mt-3
                text-[clamp(2rem,4vw,3.5rem)]
                font-black
                tracking-[-.05em]
                text-[#001F5C]
              "
            >
              Awards & Recognition
            </h1>


            <p
              className="
                mt-2
                max-w-[680px]
                text-[.9rem]
                leading-7
                text-slate-500
              "
            >
              Manage company awards, achievements and external recognition
              displayed across the Rapid Laundromat website.
            </p>

          </div>


          <div
            className="
              rounded-full
              bg-[#001F5C]
              px-5
              py-3
              text-[9px]
              font-black
              uppercase
              tracking-[.13em]
              text-white
            "
          >
            {
              awards.length
            }{" "}
            {
              awards.length ===
              1
                ? "Award"
                : "Awards"
            }
          </div>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={
            handleSubmit
          }

          className="
            mt-8
            rounded-[28px]
            border
            border-[#001F5C]/[0.06]
            bg-white
            p-6
            shadow-[0_16px_45px_rgba(0,31,92,.04)]

            lg:p-8
          "
        >

          {/* FORM HEADER */}

          <div
            className="
              flex
              items-center
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

              {editingId ? (
                <Edit3
                  size={17}
                />
              ) : (
                <Plus
                  size={18}
                />
              )}

            </div>


            <div>

              <div
                className="
                  text-[1rem]
                  font-black
                  text-[#001F5C]
                "
              >
                {editingId
                  ? "Edit Award"
                  : "Add New Award"}
              </div>


              <div
                className="
                  mt-0.5
                  text-[.75rem]
                  text-slate-400
                "
              >
                Add award details and upload the award or certificate image.
              </div>

            </div>

          </div>


          {/* =================================================
              MAIN FIELDS
          ================================================= */}

          <div
            className="
              mt-7
              grid
              gap-4

              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            <Field
              label="Award Title"

              value={
                form.title
              }

              required

              placeholder="Best Laundry Service Provider"

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "title",
                    value
                  )
              }
            />


            <Field
              label="Awarding Organisation"

              value={
                form.organization
              }

              placeholder="Sri Lanka Business Awards"

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "organization",
                    value
                  )
              }
            />


            <Field
              label="Year"

              type="number"

              min="1900"

              max="2200"

              value={
                form.year
              }

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "year",
                    value
                  )
              }
            />


            <Field
              label="Category"

              value={
                form.category
              }

              placeholder="Service Excellence"

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "category",
                    value
                  )
              }
            />


            <Field
              label="Recognition"

              value={
                form.recognition
              }

              placeholder="Gold Award"

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "recognition",
                    value
                  )
              }
            />


            <Field
              label="Display Order"

              type="number"

              min="0"

              value={
                form.order
              }

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "order",
                    value
                  )
              }
            />

          </div>


          {/* =================================================
              DESCRIPTION + SOURCE
          ================================================= */}

          <div
            className="
              mt-4
              grid
              gap-4

              lg:grid-cols-2
            "
          >

            <div>

              <label
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.14em]
                  text-[#001F5C]/50
                "
              >
                Description
              </label>


              <textarea
                rows={6}

                value={
                  form.description
                }

                placeholder="Describe the award, achievement and why Rapid received this recognition..."

                onChange={
                  (
                    event
                  ) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                }

                className="
                  mt-2
                  min-h-[160px]
                  w-full
                  resize-none
                  rounded-[16px]
                  border
                  border-[#001F5C]/[0.08]
                  bg-[#F8FBFF]
                  px-4
                  py-3
                  text-[.9rem]
                  leading-6
                  text-[#001F5C]
                  outline-none
                  transition

                  placeholder:text-slate-400

                  focus:border-[#0062CC]/25
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#0062CC]/[0.04]
                "
              />

            </div>


            <div>

              <Field
                label="Official Source URL"

                type="url"

                value={
                  form.sourceUrl
                }

                placeholder="https://official-award-website.com/..."

                onChange={
                  (
                    value
                  ) =>
                    updateField(
                      "sourceUrl",
                      value
                    )
                }
              />


              <div
                className="
                  mt-3
                  rounded-[16px]
                  border
                  border-[#0062CC]/[0.07]
                  bg-[#F5FAFF]
                  px-4
                  py-4
                "
              >

                <div
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[.14em]
                    text-[#0062CC]
                  "
                >
                  Verification
                </div>


                <p
                  className="
                    mt-2
                    text-[.78rem]
                    leading-6
                    text-slate-500
                  "
                >
                  Add the official award organisation, news article or
                  recognition page whenever one is available.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              IMAGE UPLOADER
          ================================================= */}

          <div
            className="
              mt-7
              rounded-[22px]
              border
              border-[#001F5C]/[0.07]
              bg-[#F8FBFF]
              p-5

              lg:p-6
            "
          >

            <div
              className="
                flex
                items-start
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-[#0062CC]
                  shadow-[0_8px_24px_rgba(0,31,92,.05)]
                "
              >
                <ImageIcon
                  size={17}
                />
              </div>


              <div>

                <div
                  className="
                    text-[.9rem]
                    font-black
                    text-[#001F5C]
                  "
                >
                  Award Image
                </div>


                <div
                  className="
                    mt-1
                    text-[.75rem]
                    leading-5
                    text-slate-400
                  "
                >
                  Upload the award, trophy, certificate or official
                  recognition image.
                </div>

              </div>

            </div>


            <div
              className="
                mt-5
              "
            >

              <PhotoUploader
                value={
                  form.image
                    ? [
                        form.image,
                      ]
                    : []
                }

                type="award"

                folder="awards"

                multiple={
                  false
                }

                max={1}

                onChange={
                  (
                    images
                  ) => {
                    updateField(
                      "image",
                      images?.[0] ||
                        null
                    );
                  }
                }
              />

            </div>


            {/* IMAGE STATUS */}

            {form.image?.url && (
              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2
                  rounded-[14px]
                  bg-white
                  px-4
                  py-3
                  text-[.72rem]
                  text-slate-500
                "
              >

                <span
                  className="
                    font-black
                    text-emerald-600
                  "
                >
                  Image uploaded
                </span>


                {form.image.format && (
                  <span>
                    Format:{" "}
                    <strong
                      className="
                        uppercase
                        text-[#001F5C]
                      "
                    >
                      {
                        form.image.format
                      }
                    </strong>
                  </span>
                )}


                {form.image.originalName && (
                  <span
                    className="
                      max-w-[300px]
                      truncate
                    "
                  >
                    {
                      form.image.originalName
                    }
                  </span>
                )}

              </div>
            )}

          </div>


          {/* =================================================
              FLAGS
          ================================================= */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-x-8
              gap-y-4
            "
          >

            <Toggle
              label="Published"

              description="Show this award on the public website."

              checked={
                form.published
              }

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "published",
                    value
                  )
              }
            />


            <Toggle
              label="Featured"

              description="Give this award priority in featured displays."

              checked={
                form.featured
              }

              onChange={
                (
                  value
                ) =>
                  updateField(
                    "featured",
                    value
                  )
              }
            />

          </div>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              gap-3
            "
          >

            <button
              type="submit"

              disabled={
                saving
              }

              className="
                min-w-[150px]
                rounded-xl
                bg-[#0062CC]
                px-6
                py-3
                text-[9px]
                font-black
                uppercase
                tracking-[.13em]
                text-white
                transition

                hover:bg-[#0084E3]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Award"
                  : "Add Award"}
            </button>


            {editingId && (
              <button
                type="button"

                onClick={
                  resetForm
                }

                disabled={
                  saving
                }

                className="
                  rounded-xl
                  border
                  border-[#001F5C]/10
                  bg-white
                  px-6
                  py-3
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[.13em]
                  text-[#001F5C]
                  transition

                  hover:bg-slate-50
                "
              >
                Cancel
              </button>
            )}

          </div>

        </form>


        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className="
            relative
            mt-7
          "
        >

          <Search
            size={16}

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

            onChange={
              (
                event
              ) =>
                setSearch(
                  event.target.value
                )
            }

            placeholder="Search awards, organisations, categories..."

            className="
              h-12
              w-full
              rounded-[16px]
              border
              border-[#001F5C]/[0.07]
              bg-white
              pl-11
              pr-4
              text-[.85rem]
              text-[#001F5C]
              outline-none

              focus:border-[#0062CC]/20
            "
          />

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div
            className="
              mt-6
              grid
              gap-4

              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {[1, 2, 3].map(
              (
                item
              ) => (
                <div
                  key={
                    item
                  }
                  className="
                    h-[300px]
                    animate-pulse
                    rounded-[24px]
                    bg-white
                  "
                />
              )
            )}
          </div>
        )}


        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          filteredAwards.length ===
            0 && (
          <div
            className="
              mt-6
              rounded-[24px]
              border
              border-dashed
              border-[#001F5C]/10
              bg-white
              px-6
              py-16
              text-center
            "
          >

            <Trophy
              size={32}
              className="
                mx-auto
                text-[#0062CC]/35
              "
            />


            <div
              className="
                mt-4
                text-[1rem]
                font-black
                text-[#001F5C]
              "
            >
              No awards found
            </div>


            <div
              className="
                mt-1
                text-[.8rem]
                text-slate-400
              "
            >
              Add Rapid&apos;s first award or change your search.
            </div>

          </div>
        )}


        {/* =================================================
            AWARDS LIST
        ================================================= */}

        {!loading &&
          filteredAwards.length >
            0 && (
          <div
            className="
              mt-6
              grid
              gap-4

              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {filteredAwards.map(
              (
                award
              ) => (
                <article
                  key={
                    award.id
                  }

                  className="
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#001F5C]/[0.06]
                    bg-white
                    shadow-[0_12px_35px_rgba(0,31,92,.025)]
                  "
                >

                  {/* IMAGE */}

                  {award.image?.url ? (
                    <div
                      className="
                        relative
                        aspect-[16/9]
                        overflow-hidden
                        bg-[#EEF6FF]
                      "
                    >
                      <img
                        src={
                          award.image.url
                        }

                        alt={
                          award.title ||
                          "Award"
                        }

                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    </div>
                  ) : (
                    <div
                      className="
                        flex
                        aspect-[16/9]
                        items-center
                        justify-center
                        bg-[#F5FAFF]
                        text-[#0062CC]/40
                      "
                    >
                      <Trophy
                        size={42}
                        strokeWidth={1.3}
                      />
                    </div>
                  )}


                  <div
                    className="
                      p-5
                    "
                  >

                    {/* TOP */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#EEF6FF]
                          text-[#0062CC]
                        "
                      >
                        <Award
                          size={19}
                        />
                      </div>


                      <div
                        className="
                          flex
                          gap-2
                        "
                      >

                        <button
                          type="button"

                          aria-label="Edit award"

                          onClick={() =>
                            editAward(
                              award
                            )
                          }

                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#F5FAFF]
                            text-[#0062CC]
                            transition

                            hover:bg-[#EEF6FF]
                          "
                        >
                          <Edit3
                            size={14}
                          />
                        </button>


                        <button
                          type="button"

                          aria-label="Delete award"

                          onClick={() =>
                            deleteAward(
                              award.id
                            )
                          }

                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-red-50
                            text-red-500
                            transition

                            hover:bg-red-100
                          "
                        >
                          <Trash2
                            size={14}
                          />
                        </button>

                      </div>

                    </div>


                    {/* RECOGNITION */}

                    <div
                      className="
                        mt-5
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[.15em]
                        text-[#0084E3]
                      "
                    >
                      {
                        award.recognition ||
                        "Recognition"
                      }
                    </div>


                    {/* TITLE */}

                    <h3
                      className="
                        mt-2
                        text-[1.1rem]
                        font-black
                        leading-6
                        text-[#001F5C]
                      "
                    >
                      {
                        award.title
                      }
                    </h3>


                    {/* ORGANISATION */}

                    <div
                      className="
                        mt-2
                        text-[.8rem]
                        leading-5
                        text-slate-500
                      "
                    >
                      {
                        award.organization ||
                        "Awarding organisation not specified"
                      }

                      {award.year
                        ? ` • ${award.year}`
                        : ""}
                    </div>


                    {/* CATEGORY */}

                    {award.category && (
                      <div
                        className="
                          mt-2
                          text-[.72rem]
                          font-bold
                          text-slate-400
                        "
                      >
                        {
                          award.category
                        }
                      </div>
                    )}


                    {/* BADGES */}

                    <div
                      className="
                        mt-5
                        flex
                        flex-wrap
                        gap-2
                      "
                    >

                      <Badge
                        active={
                          award.published
                        }

                        label={
                          award.published
                            ? "Published"
                            : "Draft"
                        }
                      />


                      {award.featured && (
                        <Badge
                          active

                          label="Featured"

                          icon={
                            Star
                          }
                        />
                      )}

                    </div>


                    {/* SOURCE */}

                    {award.sourceUrl && (
                      <a
                        href={
                          award.sourceUrl
                        }

                        target="_blank"

                        rel="noopener noreferrer"

                        className="
                          mt-5
                          inline-flex
                          items-center
                          gap-2
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[.12em]
                          text-[#0062CC]
                        "
                      >
                        Official Source

                        <ExternalLink
                          size={12}
                        />
                      </a>
                    )}

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </div>

    </main>
  );
}


/* =========================================================
   FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  type = "text",
  ...props
}) {
  return (
    <div>

      <label
        className="
          text-[9px]
          font-black
          uppercase
          tracking-[.14em]
          text-[#001F5C]/50
        "
      >
        {
          label
        }
      </label>


      <input
        type={
          type
        }

        value={
          value
        }

        onChange={
          (
            event
          ) =>
            onChange(
              event.target.value
            )
        }

        {...props}

        className="
          mt-2
          h-12
          w-full
          rounded-[15px]
          border
          border-[#001F5C]/[0.08]
          bg-[#F8FBFF]
          px-4
          text-[.88rem]
          text-[#001F5C]
          outline-none
          transition

          placeholder:text-slate-400

          focus:border-[#0062CC]/25
          focus:bg-white
          focus:ring-4
          focus:ring-[#0062CC]/[0.04]
        "
      />

    </div>
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
    <label
      className="
        flex
        cursor-pointer
        items-start
        gap-3
      "
    >

      <input
        type="checkbox"

        checked={
          checked
        }

        onChange={
          (
            event
          ) =>
            onChange(
              event.target.checked
            )
        }

        className="
          mt-1
          h-4
          w-4
          shrink-0
          accent-[#0062CC]
        "
      />


      <div>

        <div
          className="
            text-[.82rem]
            font-black
            text-[#001F5C]
          "
        >
          {
            label
          }
        </div>


        {description && (
          <div
            className="
              mt-0.5
              text-[.7rem]
              leading-5
              text-slate-400
            "
          >
            {
              description
            }
          </div>
        )}

      </div>

    </label>
  );
}


/* =========================================================
   BADGE
========================================================= */

function Badge({
  label,
  active,
  icon: Icon,
}) {
  return (
    <span
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

        ${
          active
            ? `
              bg-[#EEF6FF]
              text-[#0062CC]
            `
            : `
              bg-slate-100
              text-slate-400
            `
        }
      `}
    >

      {Icon && (
        <Icon
          size={10}
        />
      )}


      {
        label
      }

    </span>
  );
}