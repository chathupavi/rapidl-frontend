"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  MessageCircleReply,
  Plus,
  Star,
  ThumbsUp,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";

import {
  AdminCustomerPage,
  Metric,
  Panel,
} from "@/components/admin/customers/CustomerUI";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";


export default function ReviewsPage() {
  const [
    data,
    setData,
  ] =
    useState(null);

  const [
    showAddReview,
    setShowAddReview,
  ] =
    useState(false);

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [
    form,
    setForm,
  ] =
    useState({
      author: "",
      phone: "",
      branch: "",
      rating: 5,
      comment: "",
    });

  const [
    deletingId,
    setDeletingId,
  ] =
    useState(null);


  /* =======================================================
     LOAD REVIEWS
  ======================================================= */

  async function loadReviews() {
    try {
      const response =
        await fetch(
          `${API_URL}/api/customers/reviews`,
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
          "Failed to load reviews."
        );
      }

      setData(
        result.data
      );
    } catch (error) {
      console.error(
        "Reviews Error:",
        error
      );
    }
  }


  useEffect(() => {
    loadReviews();
  }, []);


  /* =======================================================
     FORM CHANGE
  ======================================================= */

  function handleChange(
    event
  ) {
    const {
      name,
      value,
    } =
      event.target;

    setForm(
      (previous) => ({
        ...previous,

        [name]:
          value,
      })
    );
  }


  /* =======================================================
     CREATE MANUAL REVIEW
  ======================================================= */

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    try {
      setSubmitting(
        true
      );

      const response =
        await fetch(
          `${API_URL}/api/customers/reviews`,
          {
            method:
              "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                ...form,

                rating:
                  Number(
                    form.rating
                  ),
              }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Failed to add review."
        );
      }

      setForm({
        author: "",
        phone: "",
        branch: "",
        rating: 5,
        comment: "",
      });

      setShowAddReview(
        false
      );

      await loadReviews();
    } catch (error) {
      console.error(
        "Create Review Error:",
        error
      );

      alert(
        error.message
      );
    } finally {
      setSubmitting(
        false
      );
    }
  }


  /* =======================================================
     PUBLISH / UNPUBLISH
  ======================================================= */

  async function togglePublish(
    review
  ) {
    try {
      const response =
        await fetch(
          `${API_URL}/api/customers/reviews/${review.id}/publish`,
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
              JSON.stringify({
                published:
                  !review.published,
              }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Failed to update review."
        );
      }

      await loadReviews();
    } catch (error) {
      console.error(
        "Publish Review Error:",
        error
      );

      alert(
        error.message
      );
    }
  }

  /* =======================================================
   DELETE MANUAL REVIEW
======================================================= */

async function deleteReview(
  review
) {
  /*
   * Frontend protection.
   * Backend also checks this.
   */
  if (
    String(
      review.source || ""
    ).toLowerCase() !==
    "manual"
  ) {
    alert(
      "Only manually added reviews can be deleted."
    );

    return;
  }

  const confirmed =
    window.confirm(
      `Delete the review from ${
        review.author ||
        review.name ||
        "this customer"
      }?\n\nThis action cannot be undone.`
    );

  if (!confirmed) {
    return;
  }

  try {
    setDeletingId(
      review.id
    );

    const response =
      await fetch(
        `${API_URL}/api/customers/reviews/${review.id}`,
        {
          method:
            "DELETE",

          credentials:
            "include",
        }
      );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        "Failed to delete review."
      );
    }

    await loadReviews();
  } catch (error) {
    console.error(
      "Delete Review Error:",
      error
    );

    alert(
      error.message
    );
  } finally {
    setDeletingId(
      null
    );
  }
}


  return (
    <AdminCustomerPage
      eyebrow="Customers"
      title="Reviews"
      description="Monitor customer satisfaction, ratings and reviews across Rapid Laundromat."
    >

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <Metric
          label="Reviews"
          value={
            data?.overview
              ?.total ||
            0
          }
          icon={Star}
        />

        <Metric
          label="Average Rating"
          value={
            data?.overview
              ?.averageRating ||
            "0.0"
          }
          icon={Star}
        />

        <Metric
          label="5 Star"
          value={
            data?.overview
              ?.fiveStar ||
            0
          }
          icon={ThumbsUp}
        />

        <Metric
          label="Low Rating"
          value={
            data?.overview
              ?.lowRating ||
            0
          }
          icon={
            TriangleAlert
          }
        />

        <Metric
          label="Published"
          value={
            data?.overview
              ?.published ||
            0
          }
          icon={
            MessageCircleReply
          }
        />

      </div>


      {/* =====================================================
          REVIEW PANEL
      ===================================================== */}

      <Panel>

        {/* TOP BAR */}

        <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="text-[9px] font-black uppercase tracking-[1.7px] text-[#0060d0]">
              Review Management
            </div>

            <h2 className="mt-1 text-base font-black text-[#071b3d]">
              Customer Reviews
            </h2>

            <p className="mt-1 text-[10px] text-slate-400">
              Manage Google and manual reviews and choose which reviews appear on the website.
            </p>

          </div>


          <div className="flex items-center gap-2">

            <button
              type="button"

              onClick={() =>
                setShowAddReview(
                  true
                )
              }

              className="flex h-10 items-center gap-2 rounded-xl bg-[#00195f] px-4 text-[10px] font-black text-white transition hover:bg-[#0060d0]"
            >

              <Plus
                size={14}
              />

              Add Review

            </button>

          </div>

        </div>


        {/* ===================================================
            REVIEW LIST
        =================================================== */}

        <div className="mt-5 space-y-4">

          {(data?.reviews || [])
            .map(
              (review) => (

                <div
                  key={
                    review.id
                  }

                  className="rounded-2xl border border-slate-200 p-5"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                      <div className="font-black text-[#071b3d]">
                        {
                          review.author ||
                          review.name ||
                          "Customer"
                        }
                      </div>


                      {/* STARS */}

                      <div className="mt-2 flex gap-0.5">

                        {Array.from({
                          length: 5,
                        }).map(
                          (
                            _,
                            index
                          ) => (

                            <Star
                              key={
                                index
                              }

                              size={13}

                              className={
                                index <
                                Number(
                                  review.rating ||
                                  0
                                )
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-200"
                              }
                            />

                          )
                        )}

                      </div>

                    </div>


                    {/* SOURCE + PUBLISH STATUS */}

                    <div className="flex flex-wrap items-center gap-2">

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[8px] font-black uppercase text-slate-500">
                        {
                          review.source ||
                          "Website"
                        }
                      </span>


                      {review.published ? (

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[8px] font-black uppercase text-emerald-600">
                          Published
                        </span>

                      ) : (

                        <span className="rounded-full bg-amber-50 px-3 py-1 text-[8px] font-black uppercase text-amber-600">
                          Unpublished
                        </span>

                      )}

                    </div>

                  </div>


                  {/* REVIEW */}

                  <p className="mt-4 text-xs leading-6 text-slate-500">

                    {
                      review.comment ||
                      review.text ||
                      "No written review."
                    }

                  </p>


                  {/* BRANCH */}

                  {review.branch && (

                    <div className="mt-3 text-[9px] font-bold text-slate-400">

                      Branch:{" "}

                      <span className="text-slate-600">
                        {
                          review.branch
                        }
                      </span>

                    </div>

                  )}


                  {/* RAPID REPLY */}

                  {review.reply && (

                    <div className="mt-4 rounded-xl bg-blue-50 p-4">

                      <div className="text-[8px] font-black uppercase tracking-wider text-[#0060d0]">
                        Rapid Reply
                      </div>

                      <p className="mt-2 text-[10px] leading-5 text-slate-600">
                        {
                          review.reply
                        }
                      </p>

                    </div>

                  )}


                  {/* ACTIONS */}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  
                    {/* LEFT SIDE - DELETE MANUAL REVIEW */}
                  
                    <div>
                  
                      {String(
                        review.source || ""
                      ).toLowerCase() ===
                        "manual" && (
                  
                        <button
                          type="button"
                  
                          onClick={() =>
                            deleteReview(
                              review
                            )
                          }
                  
                          disabled={
                            deletingId ===
                            review.id
                          }
                  
                          className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-[9px] font-black uppercase tracking-wider text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                  
                          <Trash2
                            size={12}
                          />
                  
                          {
                            deletingId ===
                            review.id
                              ? "Deleting..."
                              : "Delete"
                          }
                  
                        </button>
                  
                      )}
                  
                    </div>
                  
                  
                    {/* RIGHT SIDE - PUBLISH */}
                  
                    <button
                      type="button"
                  
                      onClick={() =>
                        togglePublish(
                          review
                        )
                      }
                  
                      className={
                        review.published
                          ? "rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[9px] font-black uppercase tracking-wider text-red-500 transition hover:bg-red-100"
                          : "rounded-xl bg-[#0060d0] px-4 py-2 text-[9px] font-black uppercase tracking-wider text-white transition hover:bg-[#004fab]"
                      }
                    >
                  
                      {
                        review.published
                          ? "Unpublish"
                          : "Publish"
                      }
                  
                    </button>
                  
                  </div>

                </div>

              )
            )}

        </div>

      </Panel>


      {/* =====================================================
          ADD REVIEW POPUP
      ===================================================== */}

      {showAddReview && (

        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">

          {/* BACKDROP */}

          <button
            type="button"

            aria-label="Close"

            onClick={() =>
              setShowAddReview(
                false
              )
            }

            className="absolute inset-0 bg-[#071b3d]/35 backdrop-blur-[2px]"
          />


          {/* MODAL */}

          <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,.25)]">


            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <div className="text-[9px] font-black uppercase tracking-[1.7px] text-[#0060d0]">
                  Manual Review
                </div>

                <h2 className="mt-1 text-lg font-black text-[#071b3d]">
                  Add Customer Review
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  The review will be saved as unpublished until you approve it.
                </p>

              </div>


              <button
                type="button"

                onClick={() =>
                  setShowAddReview(
                    false
                  )
                }

                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
              >

                <X
                  size={15}
                />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }

              className="space-y-5 p-6"
            >

              {/* NAME */}

              <FormField
                label="Customer Name"
                required
              >

                <input
                  name="author"

                  value={
                    form.author
                  }

                  onChange={
                    handleChange
                  }

                  required

                  placeholder="Enter customer name"

                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-700 outline-none transition focus:border-[#168cff] focus:bg-white"
                />

              </FormField>


              <div className="grid gap-4 sm:grid-cols-2">

                {/* PHONE */}

                <FormField
                  label="Phone"
                >

                  <input
                    name="phone"

                    value={
                      form.phone
                    }

                    onChange={
                      handleChange
                    }

                    placeholder="07X XXX XXXX"

                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-700 outline-none focus:border-[#168cff]"
                  />

                </FormField>


                {/* BRANCH */}

                <FormField
                  label="Branch"
                >

                  <select
                    name="branch"

                    value={
                      form.branch
                    }

                    onChange={
                      handleChange
                    }

                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-700 outline-none focus:border-[#168cff]"
                  >

                    <option value="">
                      Select Branch
                    </option>

                    <option value="Kurunegala">
                      Kurunegala
                    </option>

                    <option value="Kandy">
                      Kandy
                    </option>

                  </select>

                </FormField>

              </div>


              {/* RATING */}

              <FormField
                label="Rating"
                required
              >

                <div className="flex items-center gap-2">

                  {[
                    1,
                    2,
                    3,
                    4,
                    5,
                  ].map(
                    (rating) => (

                      <button
                        key={
                          rating
                        }

                        type="button"

                        onClick={() =>
                          setForm(
                            (
                              previous
                            ) => ({
                              ...previous,

                              rating,
                            })
                          )
                        }

                        className="transition hover:scale-110"
                      >

                        <Star
                          size={25}

                          className={
                            rating <=
                            Number(
                              form.rating
                            )
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }
                        />

                      </button>

                    )
                  )}

                  <span className="ml-2 text-xs font-black text-[#071b3d]">

                    {
                      form.rating
                    }

                    /5

                  </span>

                </div>

              </FormField>


              {/* REVIEW */}

              <FormField
                label="Review"
                required
              >

                <textarea
                  name="comment"

                  value={
                    form.comment
                  }

                  onChange={
                    handleChange
                  }

                  required

                  rows={5}

                  placeholder="Enter customer review..."

                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold leading-6 text-slate-700 outline-none transition focus:border-[#168cff] focus:bg-white"
                />

              </FormField>


              {/* NOTICE */}

              <div className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-[10px] leading-5 text-amber-700">

                This review will not appear on the landing page until you press
                <strong> Publish</strong>.

              </div>


              {/* BUTTONS */}

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"

                  onClick={() =>
                    setShowAddReview(
                      false
                    )
                  }

                  className="h-10 rounded-xl border border-slate-200 px-5 text-[10px] font-black text-slate-500"
                >

                  Cancel

                </button>


                <button
                  type="submit"

                  disabled={
                    submitting
                  }

                  className="flex h-10 items-center gap-2 rounded-xl bg-[#00195f] px-5 text-[10px] font-black text-white disabled:opacity-50"
                >

                  <Plus
                    size={13}
                  />

                  {
                    submitting
                      ? "Adding..."
                      : "Add Review"
                  }

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </AdminCustomerPage>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  children,
  required = false,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-[9px] font-black uppercase tracking-[1.2px] text-slate-500">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </span>

      {children}

    </label>
  );
}