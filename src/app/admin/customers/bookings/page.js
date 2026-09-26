"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  RefreshCw,
  Search,
  ShoppingBag,
  UserRound,
  X,
  XCircle,
} from "lucide-react";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080";


/* =========================================================
   FORMATTERS
========================================================= */

function formatCurrency(value) {
  return new Intl.NumberFormat(
    "en-LK",
    {
      style:
        "currency",

      currency:
        "LKR",

      maximumFractionDigits:
        0,
    }
  ).format(
    Number(value || 0)
  );
}


function formatNumber(value) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(
    Number(value || 0)
  );
}


function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-LK",
    {
      day:
        "2-digit",

      month:
        "short",

      year:
        "numeric",
    }
  );
}


function formatDateTime(value) {
  if (!value) {
    return "—";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
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


/* =========================================================
   PAGE
========================================================= */

export default function CustomerBookingsPage() {
  const [
    data,
    setData,
  ] =
    useState(null);


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    refreshing,
    setRefreshing,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    search,
    setSearch,
  ] =
    useState("");


  const [
    branch,
    setBranch,
  ] =
    useState("");


  const [
    service,
    setService,
  ] =
    useState("");


  const [
    status,
    setStatus,
  ] =
    useState("");


  const [
    paymentStatus,
    setPaymentStatus,
  ] =
    useState("");


  const [
    from,
    setFrom,
  ] =
    useState("");


  const [
    to,
    setTo,
  ] =
    useState("");


  const [
    selectedBooking,
    setSelectedBooking,
  ] =
    useState(null);


  const [
    lastUpdated,
    setLastUpdated,
  ] =
    useState(
      new Date()
    );


  /* =======================================================
     LOAD BOOKINGS
  ======================================================= */

  const loadBookings =
    useCallback(
      async (
        silent = false
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

          setError("");


          const params =
            new URLSearchParams();


          if (branch) {
            params.set(
              "branch",
              branch
            );
          }


          if (service) {
            params.set(
              "service",
              service
            );
          }


          if (status) {
            params.set(
              "status",
              status
            );
          }


          if (
            paymentStatus
          ) {
            params.set(
              "paymentStatus",
              paymentStatus
            );
          }


          if (from) {
            params.set(
              "from",
              from
            );
          }


          if (to) {
            params.set(
              "to",
              to
            );
          }


          const response =
            await fetch(
              `${API_URL}/api/customers/bookings?${params.toString()}`,
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


          if (!response.ok) {
            throw new Error(
              result?.error ||
                result?.message ||
                `Bookings API returned ${response.status}`
            );
          }


          setData(
            result.data
          );


          setLastUpdated(
            new Date()
          );
        } catch (error) {
          console.error(
            "Bookings Error:",
            error
          );

          setError(
            error.message ||
              "Unable to load bookings."
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
      [
        branch,
        service,
        status,
        paymentStatus,
        from,
        to,
      ]
    );


  useEffect(() => {
    loadBookings();
  }, [loadBookings]);


  /* =======================================================
     LOCAL SEARCH
  ======================================================= */

  const bookings =
    data?.bookings ||
    [];


  const filteredBookings =
    useMemo(
      () => {
        if (
          !search.trim()
        ) {
          return bookings;
        }


        const query =
          search
            .trim()
            .toLowerCase();


        return bookings.filter(
          (booking) =>
            [
              booking.bookingNumber,
              booking.customer
                ?.name,
              booking.customer
                ?.phone,
              booking.customer
                ?.email,
              booking.branch
                ?.name,
              booking.service
                ?.name,
            ]
              .filter(Boolean)
              .some(
                (value) =>
                  String(
                    value
                  )
                    .toLowerCase()
                    .includes(
                      query
                    )
              )
        );
      },
      [
        bookings,
        search,
      ]
    );


  if (
    loading &&
    !data
  ) {
    return (
      <BookingsSkeleton />
    );
  }


  const overview =
    data?.overview ||
    {};


  return (
    <div className="min-h-screen bg-[#f6f8fc]">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-slate-200/80 bg-white">

        <div className="px-6 py-6 lg:px-8">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#00195f] text-white">

                  <ShoppingBag
                    size={16}
                  />

                </div>

                <span className="text-[10px] font-black uppercase tracking-[2px] text-[#0060d0]">
                  Customers
                </span>

              </div>


              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#071b3d]">
                Bookings
              </h1>


              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Monitor customer bookings, service requests, branch activity and payment status from one workspace.
              </p>

            </div>


            <div className="flex items-center gap-3">

              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">

                <Clock3
                  size={12}
                />

                Updated{" "}

                {lastUpdated.toLocaleTimeString(
                  [],
                  {
                    hour:
                      "2-digit",

                    minute:
                      "2-digit",
                  }
                )}

              </div>


              <button
                type="button"

                onClick={() =>
                  loadBookings(
                    true
                  )
                }

                disabled={
                  refreshing
                }

                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-[#0060d0]"
              >

                <RefreshCw
                  size={14}

                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh

              </button>

            </div>

          </div>

        </div>

      </header>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="space-y-6 px-6 py-6 lg:px-8">


        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}


        {/* ===================================================
            KPI
        =================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <BookingMetric
            label="Total Bookings"

            value={formatNumber(
              overview.totalBookings
            )}

            icon={
              ShoppingBag
            }
          />


          <BookingMetric
            label="Booking Value"

            value={formatCurrency(
              overview.totalRevenue
            )}

            icon={
              Banknote
            }
          />


          <BookingMetric
            label="Pending"

            value={formatNumber(
              overview.pending
            )}

            icon={
              Clock3
            }

            tone="warning"
          />


          <BookingMetric
            label="Completed"

            value={formatNumber(
              overview.completed
            )}

            icon={
              CheckCircle2
            }

            tone="success"
          />


          <BookingMetric
            label="Cancelled"

            value={formatNumber(
              overview.cancelled
            )}

            icon={
              XCircle
            }

            tone="danger"
          />

        </section>


        {/* ===================================================
            FILTER PANEL
        =================================================== */}

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,.035)]">

          <div className="flex flex-col gap-4">


            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">


              {/* SEARCH */}

              <div className="relative min-w-0 flex-1">

                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
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

                  placeholder="Search booking, customer, phone, email..."

                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 text-xs font-semibold text-slate-700 outline-none transition focus:border-[#168cff] focus:bg-white"
                />

              </div>


              <button
                type="button"

                onClick={() => {
                  setSearch("");
                  setBranch("");
                  setService("");
                  setStatus("");
                  setPaymentStatus("");
                  setFrom("");
                  setTo("");
                }}

                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-[10px] font-black uppercase tracking-wider text-slate-500"
              >

                <X
                  size={13}
                />

                Clear

              </button>

            </div>


            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">


              <FilterSelect
                value={
                  branch
                }

                onChange={
                  setBranch
                }

                label="Branch"

                options={
                  data?.filters
                    ?.branches ||
                  []
                }
              />


              <FilterSelect
                value={
                  service
                }

                onChange={
                  setService
                }

                label="Service"

                options={
                  data?.filters
                    ?.services ||
                  []
                }
              />


              <SimpleSelect
                value={
                  status
                }

                onChange={
                  setStatus
                }

                label="Status"

                options={[
                  "pending",
                  "confirmed",
                  "processing",
                  "completed",
                  "cancelled",
                ]}
              />


              <SimpleSelect
                value={
                  paymentStatus
                }

                onChange={
                  setPaymentStatus
                }

                label="Payment"

                options={[
                  "pending",
                  "paid",
                  "failed",
                  "refunded",
                ]}
              />


              <DateField
                label="From"

                value={
                  from
                }

                onChange={
                  setFrom
                }
              />


              <DateField
                label="To"

                value={
                  to
                }

                onChange={
                  setTo
                }
              />

            </div>

          </div>

        </section>


        {/* ===================================================
            BOOKINGS TABLE
        =================================================== */}

        <section className="rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,.035)]">


          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">

            <div>

              <div className="text-[9px] font-black uppercase tracking-[1.7px] text-[#0060d0]">
                Customer Operations
              </div>

              <h2 className="mt-1 text-base font-black text-[#071b3d]">
                Booking Register
              </h2>

            </div>


            <div className="rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-black text-slate-500">

              {formatNumber(
                filteredBookings.length
              )}{" "}
              records

            </div>

          </div>


          {filteredBookings.length ? (

            <div className="overflow-x-auto">

              <div className="min-w-[1200px]">


                <div className="grid grid-cols-[130px_1fr_160px_150px_120px_120px_130px_45px] bg-slate-50 px-5 py-3 text-[9px] font-black uppercase tracking-wider text-slate-400">

                  <span>
                    Booking
                  </span>

                  <span>
                    Customer
                  </span>

                  <span>
                    Branch
                  </span>

                  <span>
                    Service
                  </span>

                  <span>
                    Status
                  </span>

                  <span>
                    Payment
                  </span>

                  <span className="text-right">
                    Value
                  </span>

                  <span />

                </div>


                {filteredBookings.map(
                  (booking) => (

                    <BookingRow
                      key={
                        booking.id
                      }

                      booking={
                        booking
                      }

                      onOpen={() =>
                        setSelectedBooking(
                          booking
                        )
                      }
                    />

                  )
                )}

              </div>

            </div>

          ) : (

            <EmptyState />

          )}

        </section>

      </main>


      {/* =====================================================
          DETAILS DRAWER
      ===================================================== */}

      {selectedBooking && (

        <BookingDrawer
          booking={
            selectedBooking
          }

          onClose={() =>
            setSelectedBooking(
              null
            )
          }
        />

      )}

    </div>
  );
}


/* =========================================================
   BOOKING ROW
========================================================= */

function BookingRow({
  booking,
  onOpen,
}) {
  return (
    <button
      type="button"

      onClick={
        onOpen
      }

      className="grid w-full grid-cols-[130px_1fr_160px_150px_120px_120px_130px_45px] items-center border-t border-slate-100 px-5 py-4 text-left transition hover:bg-blue-50/30"
    >

      <div>

        <div className="text-xs font-black text-[#071b3d]">
          {
            booking.bookingNumber
          }
        </div>

        <div className="mt-1 text-[8px] text-slate-400">
          {formatDate(
            booking.createdAt
          )}
        </div>

      </div>


      <div className="min-w-0">

        <div className="truncate text-xs font-black text-slate-700">
          {
            booking.customer
              ?.name
          }
        </div>

        <div className="mt-1 truncate text-[9px] text-slate-400">
          {
            booking.customer
              ?.phone ||
            booking.customer
              ?.email ||
            "No contact"
          }
        </div>

      </div>


      <span className="truncate text-xs font-bold text-slate-500">
        {
          booking.branch
            ?.name
        }
      </span>


      <span className="truncate text-xs font-bold text-slate-500">
        {
          booking.service
            ?.name
        }
      </span>


      <StatusBadge
        value={
          booking.status
        }
      />


      <PaymentBadge
        value={
          booking.paymentStatus
        }
      />


      <span className="text-right text-xs font-black text-[#071b3d]">
        {formatCurrency(
          booking.total
        )}
      </span>


      <ChevronRight
        size={15}
        className="ml-auto text-slate-300"
      />

    </button>
  );
}


/* =========================================================
   DRAWER
========================================================= */

function BookingDrawer({
  booking,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[1000]">


      <button
        type="button"

        aria-label="Close booking"

        onClick={
          onClose
        }

        className="absolute inset-0 bg-[#071b3d]/25 backdrop-blur-[2px]"
      />


      <aside className="absolute bottom-0 right-0 top-0 w-full max-w-[500px] overflow-y-auto bg-white shadow-[-20px_0_50px_rgba(15,23,42,.16)]">


        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">

          <div>

            <div className="text-[9px] font-black uppercase tracking-[1.6px] text-[#0060d0]">
              Booking Details
            </div>

            <div className="mt-1 text-lg font-black text-[#071b3d]">
              {
                booking.bookingNumber
              }
            </div>

          </div>


          <button
            type="button"

            onClick={
              onClose
            }

            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
          >

            <X
              size={16}
            />

          </button>

        </div>


        <div className="space-y-6 p-6">


          <div className="flex flex-wrap gap-2">

            <StatusBadge
              value={
                booking.status
              }
            />

            <PaymentBadge
              value={
                booking.paymentStatus
              }
            />

          </div>


          {/* CUSTOMER */}

          <DrawerSection
            title="Customer"
          >

            <InfoRow
              icon={
                UserRound
              }

              label="Name"

              value={
                booking.customer
                  ?.name
              }
            />


            <InfoRow
              icon={
                Phone
              }

              label="Phone"

              value={
                booking.customer
                  ?.phone
              }
            />


            <InfoRow
              icon={
                Mail
              }

              label="Email"

              value={
                booking.customer
                  ?.email
              }
            />

          </DrawerSection>


          {/* BOOKING */}

          <DrawerSection
            title="Booking"
          >

            <InfoRow
              icon={
                Building2Icon
              }

              label="Branch"

              value={
                booking.branch
                  ?.name
              }
            />


            <InfoRow
              icon={
                PackageCheck
              }

              label="Service"

              value={
                booking.service
                  ?.name
              }
            />


            <InfoRow
              icon={
                Banknote
              }

              label="Booking Value"

              value={
                formatCurrency(
                  booking.total
                )
              }
            />


            <InfoRow
              icon={
                CalendarDays
              }

              label="Created"

              value={
                formatDateTime(
                  booking.createdAt
                )
              }
            />

          </DrawerSection>


          {/* DELIVERY */}

          <DrawerSection
            title="Pickup & Delivery"
          >

            <InfoRow
              icon={
                CalendarDays
              }

              label="Pickup"

              value={
                formatDateTime(
                  booking.pickupDate
                )
              }
            />


            <InfoRow
              icon={
                CalendarDays
              }

              label="Delivery"

              value={
                formatDateTime(
                  booking.deliveryDate
                )
              }
            />


            <InfoRow
              icon={
                MapPin
              }

              label="Address"

              value={
                booking.address ||
                "—"
              }
            />

          </DrawerSection>


          {booking.notes && (

            <DrawerSection
              title="Customer Notes"
            >

              <div className="rounded-xl bg-slate-50 p-4 text-xs leading-6 text-slate-500">
                {
                  booking.notes
                }
              </div>

            </DrawerSection>

          )}

        </div>

      </aside>

    </div>
  );
}


/* =========================================================
   KPI
========================================================= */

function BookingMetric({
  label,
  value,
  icon: Icon,
  tone = "blue",
}) {
  const toneClasses = {
    blue:
      "bg-blue-50 text-[#0060d0]",

    warning:
      "bg-amber-50 text-amber-600",

    success:
      "bg-emerald-50 text-emerald-600",

    danger:
      "bg-red-50 text-red-500",
  };


  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,.035)]">

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          toneClasses[
            tone
          ]
        }`}
      >

        <Icon
          size={17}
        />

      </div>


      <div className="mt-5 text-2xl font-black text-[#071b3d]">
        {value}
      </div>


      <div className="mt-1 text-[11px] font-black text-slate-600">
        {label}
      </div>

    </div>
  );
}


/* =========================================================
   FILTER COMPONENTS
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label>

      <span className="mb-1.5 block text-[8px] font-black uppercase tracking-[1.2px] text-slate-400">
        {label}
      </span>

      <select
        value={
          value
        }

        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }

        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 outline-none"
      >

        <option value="">
          All
        </option>

        {options.map(
          (option) => (

            <option
              key={
                option.id
              }

              value={
                option.id
              }
            >
              {
                option.name
              }
            </option>

          )
        )}

      </select>

    </label>
  );
}


function SimpleSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label>

      <span className="mb-1.5 block text-[8px] font-black uppercase tracking-[1.2px] text-slate-400">
        {label}
      </span>

      <select
        value={
          value
        }

        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }

        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[10px] font-bold capitalize text-slate-600 outline-none"
      >

        <option value="">
          All
        </option>

        {options.map(
          (option) => (

            <option
              key={
                option
              }

              value={
                option
              }
            >
              {
                option
              }
            </option>

          )
        )}

      </select>

    </label>
  );
}


function DateField({
  label,
  value,
  onChange,
}) {
  return (
    <label>

      <span className="mb-1.5 block text-[8px] font-black uppercase tracking-[1.2px] text-slate-400">
        {label}
      </span>

      <input
        type="date"

        value={
          value
        }

        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }

        className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 outline-none"
      />

    </label>
  );
}


/* =========================================================
   BADGES
========================================================= */

function StatusBadge({
  value,
}) {
  const status =
    String(
      value || "unknown"
    ).toLowerCase();


  let classes =
    "bg-slate-100 text-slate-500";


  if (
    status ===
    "pending"
  ) {
    classes =
      "bg-amber-50 text-amber-600";
  }


  if (
    status ===
      "confirmed" ||
    status ===
      "processing"
  ) {
    classes =
      "bg-blue-50 text-[#0060d0]";
  }


  if (
    status ===
      "completed" ||
    status ===
      "complete"
  ) {
    classes =
      "bg-emerald-50 text-emerald-600";
  }


  if (
    status ===
      "cancelled" ||
    status ===
      "canceled"
  ) {
    classes =
      "bg-red-50 text-red-500";
  }


  return (
    <span
      className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-wider ${classes}`}
    >
      {status}
    </span>
  );
}


function PaymentBadge({
  value,
}) {
  const status =
    String(
      value || "unknown"
    ).toLowerCase();


  let classes =
    "bg-slate-100 text-slate-500";


  if (
    status ===
    "paid"
  ) {
    classes =
      "bg-emerald-50 text-emerald-600";
  }


  if (
    status ===
    "pending"
  ) {
    classes =
      "bg-amber-50 text-amber-600";
  }


  if (
    status ===
      "failed" ||
    status ===
      "refunded"
  ) {
    classes =
      "bg-red-50 text-red-500";
  }


  return (
    <span
      className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[8px] font-black uppercase tracking-wider ${classes}`}
    >
      {status}
    </span>
  );
}


/* =========================================================
   DRAWER COMPONENTS
========================================================= */

function DrawerSection({
  title,
  children,
}) {
  return (
    <section>

      <div className="mb-3 text-[9px] font-black uppercase tracking-[1.5px] text-[#0060d0]">
        {title}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        {children}
      </div>

    </section>
  );
}


function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">

        <Icon
          size={14}
        />

      </div>

      <div className="min-w-0">

        <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">
          {label}
        </div>

        <div className="mt-0.5 break-words text-xs font-bold text-slate-700">
          {value || "—"}
        </div>

      </div>

    </div>
  );
}


function Building2Icon(
  props
) {
  return (
    <MapPin
      {...props}
    />
  );
}


/* =========================================================
   EMPTY / SKELETON
========================================================= */

function EmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">

      <Filter
        size={25}
        className="text-slate-300"
      />

      <div className="mt-3 text-sm font-black text-slate-600">
        No bookings found
      </div>

      <p className="mt-1 max-w-md text-[10px] leading-5 text-slate-400">
        Change the filters or search criteria to view additional customer bookings.
      </p>

    </div>
  );
}


function BookingsSkeleton() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] p-6">

      <div className="h-28 animate-pulse rounded-[24px] bg-white" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {Array.from({
          length: 5,
        }).map(
          (_, index) => (

            <div
              key={
                index
              }

              className="h-36 animate-pulse rounded-[22px] bg-white"
            />

          )
        )}

      </div>

      <div className="mt-6 h-24 animate-pulse rounded-[24px] bg-white" />

      <div className="mt-6 h-[500px] animate-pulse rounded-[24px] bg-white" />

    </div>
  );
}