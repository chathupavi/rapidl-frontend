"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  UserRound,
  Users,
  X,
} from "lucide-react";

import {
  AdminCustomerPage,
  Metric,
  Panel,
} from "@/components/admin/customers/CustomerUI";


/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   LEAD STAGES
========================================================= */

const LEAD_STAGES = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
];


/* =========================================================
   PAGE
========================================================= */

export default function ContactsLeadsPage() {
  const [
    activeTab,
    setActiveTab,
  ] = useState(
    "contacts"
  );


  const [
    contactsData,
    setContactsData,
  ] = useState(
    null
  );


  const [
    leadsData,
    setLeadsData,
  ] = useState(
    null
  );


  const [
    loadingContacts,
    setLoadingContacts,
  ] = useState(
    true
  );


  const [
    loadingLeads,
    setLoadingLeads,
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
    contactSearch,
    setContactSearch,
  ] = useState(
    ""
  );


  const [
    leadSearch,
    setLeadSearch,
  ] = useState(
    ""
  );


  const [
    selectedContact,
    setSelectedContact,
  ] = useState(
    null
  );


  const [
    selectedLead,
    setSelectedLead,
  ] = useState(
    null
  );


  const [
    error,
    setError,
  ] = useState(
    ""
  );


  /* =======================================================
     LOAD CONTACTS
  ======================================================= */

  const loadContacts =
    useCallback(
      async () => {
        try {
          setLoadingContacts(
            true
          );


          setError(
            ""
          );


          if (!API_URL) {
            throw new Error(
              "NEXT_PUBLIC_API_URL is not configured."
            );
          }


          const response =
            await fetch(
              `${API_URL}/api/customers/contacts`,
              {
                method:
                  "GET",

                credentials:
                  "include",

                headers: {
                  Accept:
                    "application/json",
                },

                cache:
                  "no-store",
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
              "Failed to load contacts."
            );
          }


          setContactsData(
            result.data
          );
        } catch (
          error
        ) {
          console.error(
            "Contacts Error:",
            error
          );


          setError(
            error.message ||
            "Failed to load customer contacts."
          );


          setContactsData({
            overview: {
              total:
                0,

              unread:
                0,

              new:
                0,

              contacted:
                0,

              resolved:
                0,
            },

            contacts:
              [],
          });
        } finally {
          setLoadingContacts(
            false
          );
        }
      },
      []
    );


  /* =======================================================
     LOAD LEADS
  ======================================================= */

  const loadLeads =
    useCallback(
      async () => {
        try {
          setLoadingLeads(
            true
          );


          setError(
            ""
          );


          if (!API_URL) {
            throw new Error(
              "NEXT_PUBLIC_API_URL is not configured."
            );
          }


          const response =
            await fetch(
              `${API_URL}/api/customers/leads`,
              {
                method:
                  "GET",

                credentials:
                  "include",

                headers: {
                  Accept:
                    "application/json",
                },

                cache:
                  "no-store",
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
              "Failed to load leads."
            );
          }


          setLeadsData(
            result.data
          );
        } catch (
          error
        ) {
          console.error(
            "Leads Error:",
            error
          );


          setError(
            error.message ||
            "Failed to load commercial leads."
          );


          setLeadsData({
            overview: {
              total:
                0,

              new:
                0,

              qualified:
                0,

              won:
                0,

              lost:
                0,

              pipelineValue:
                0,
            },

            leads:
              [],
          });
        } finally {
          setLoadingLeads(
            false
          );
        }
      },
      []
    );


  /* =======================================================
     LOAD EVERYTHING
  ======================================================= */

  const loadAll =
    useCallback(
      async (
        silent = false
      ) => {
        try {
          if (silent) {
            setRefreshing(
              true
            );
          }


          await Promise.all([
            loadContacts(),
            loadLeads(),
          ]);
        } finally {
          setRefreshing(
            false
          );
        }
      },
      [
        loadContacts,
        loadLeads,
      ]
    );


  useEffect(() => {
    loadAll();
  }, [
    loadAll,
  ]);


  /* =======================================================
     FILTER CONTACTS
  ======================================================= */

  const contacts =
    useMemo(
      () => {
        const list =
          contactsData
            ?.contacts ||
          [];


        if (
          !contactSearch.trim()
        ) {
          return list;
        }


        const query =
          contactSearch
            .trim()
            .toLowerCase();


        return list.filter(
          (
            contact
          ) =>
            [
              contact.name,
              contact.email,
              contact.phone,
              contact.subject,
              contact.message,
              contact.branchName,
              contact.status,
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
                      query
                    )
              )
        );
      },
      [
        contactsData,
        contactSearch,
      ]
    );


  /* =======================================================
     FILTER LEADS
  ======================================================= */

  const leads =
    useMemo(
      () => {
        const list =
          leadsData?.leads ||
          [];


        if (
          !leadSearch.trim()
        ) {
          return list;
        }


        const query =
          leadSearch
            .trim()
            .toLowerCase();


        return list.filter(
          (
            lead
          ) =>
            [
              lead.name,
              lead.company,
              lead.email,
              lead.phone,
              lead.service,
              lead.businessType,
              lead.location,
              lead.source,
              lead.owner,
              lead.branchName,
              lead.requirements,
              lead.frequency,
              lead.volume,
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
                      query
                    )
              )
        );
      },
      [
        leadsData,
        leadSearch,
      ]
    );


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AdminCustomerPage
      eyebrow="Customers"
      title="Contacts & Leads"
      description="Manage customer enquiries and track commercial opportunities through the Rapid sales pipeline."
    >

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-5
            py-4
            text-xs
            font-semibold
            text-red-600
          "
        >
          {error}
        </div>
      )}


      {/* ===================================================
          TABS
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4

          rounded-[22px]

          border
          border-slate-200

          bg-white

          p-2

          shadow-[0_8px_30px_rgba(15,23,42,.035)]

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div
          className="
            flex

            rounded-xl

            bg-slate-50

            p-1
          "
        >

          {/* CONTACTS */}

          <button
            type="button"

            onClick={() =>
              setActiveTab(
                "contacts"
              )
            }

            className={`
              flex
              items-center
              gap-2

              rounded-lg

              px-4
              py-2.5

              text-[10px]
              font-black

              transition

              ${
                activeTab ===
                "contacts"
                  ? "bg-white text-[#00195f] shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }
            `}
          >
            <MessageSquare
              size={14}
            />

            Contacts

            <span
              className={`
                rounded-full

                px-2
                py-0.5

                text-[8px]

                ${
                  activeTab ===
                  "contacts"
                    ? "bg-blue-50 text-[#0060d0]"
                    : "bg-slate-100 text-slate-400"
                }
              `}
            >
              {
                contactsData
                  ?.overview
                  ?.total ||
                0
              }
            </span>
          </button>


          {/* LEADS */}

          <button
            type="button"

            onClick={() =>
              setActiveTab(
                "leads"
              )
            }

            className={`
              flex
              items-center
              gap-2

              rounded-lg

              px-4
              py-2.5

              text-[10px]
              font-black

              transition

              ${
                activeTab ===
                "leads"
                  ? "bg-white text-[#00195f] shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }
            `}
          >
            <BriefcaseBusiness
              size={14}
            />

            Commercial Leads

            <span
              className={`
                rounded-full

                px-2
                py-0.5

                text-[8px]

                ${
                  activeTab ===
                  "leads"
                    ? "bg-blue-50 text-[#0060d0]"
                    : "bg-slate-100 text-slate-400"
                }
              `}
            >
              {
                leadsData
                  ?.overview
                  ?.total ||
                0
              }
            </span>
          </button>

        </div>


        {/* REFRESH */}

        <button
          type="button"

          onClick={() =>
            loadAll(
              true
            )
          }

          disabled={
            refreshing
          }

          className="
            flex
            h-10

            items-center
            justify-center
            gap-2

            rounded-xl

            border
            border-slate-200

            bg-white

            px-4

            text-[10px]
            font-black

            text-slate-500

            transition

            hover:border-blue-200
            hover:text-[#0060d0]

            disabled:cursor-wait
            disabled:opacity-50
          "
        >
          <RefreshCw
            size={13}

            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          Refresh
        </button>

      </div>


      {/* ===================================================
          CONTACTS
      =================================================== */}

      {activeTab ===
        "contacts" && (

        <ContactsTab
          data={
            contactsData
          }

          contacts={
            contacts
          }

          loading={
            loadingContacts
          }

          search={
            contactSearch
          }

          setSearch={
            setContactSearch
          }

          openContact={
            setSelectedContact
          }
        />

      )}


      {/* ===================================================
          LEADS
      =================================================== */}

      {activeTab ===
        "leads" && (

        <LeadsTab
          data={
            leadsData
          }

          leads={
            leads
          }

          loading={
            loadingLeads
          }

          search={
            leadSearch
          }

          setSearch={
            setLeadSearch
          }

          openLead={
            setSelectedLead
          }

          reload={
            loadLeads
          }
        />

      )}


      {/* ===================================================
          CONTACT DRAWER
      =================================================== */}

      {selectedContact && (

        <ContactDrawer
          contact={
            selectedContact
          }

          close={() =>
            setSelectedContact(
              null
            )
          }

          reload={
            loadContacts
          }
        />

      )}


      {/* ===================================================
          LEAD DRAWER
      =================================================== */}

      {selectedLead && (

        <LeadDrawer
          lead={
            selectedLead
          }

          close={() =>
            setSelectedLead(
              null
            )
          }

          reload={
            loadLeads
          }
        />

      )}

    </AdminCustomerPage>
  );
}


/* =========================================================
   CONTACTS TAB
========================================================= */

function ContactsTab({
  data,
  contacts,
  loading,
  search,
  setSearch,
  openContact,
}) {
  return (
    <>
      {/* KPI */}

      <div
        className="
          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-5
        "
      >

        <Metric
          label="Total Contacts"

          value={
            data?.overview
              ?.total ||
            0
          }

          icon={
            MessageSquare
          }
        />


        <Metric
          label="Unread"

          value={
            data?.overview
              ?.unread ||
            0
          }

          icon={
            Mail
          }
        />


        <Metric
          label="New"

          value={
            data?.overview
              ?.new ||
            0
          }

          icon={
            Clock3
          }
        />


        <Metric
          label="Contacted"

          value={
            data?.overview
              ?.contacted ||
            0
          }

          icon={
            Phone
          }
        />


        <Metric
          label="Resolved"

          value={
            data?.overview
              ?.resolved ||
            0
          }

          icon={
            CheckCircle2
          }
        />

      </div>


      <Panel>

        <SectionHeader
          eyebrow="Customer Inbox"
          title="Contact Enquiries"
          description="Messages submitted through the Rapid Laundromat website contact form."
        />


        <SearchBar
          value={
            search
          }

          setValue={
            setSearch
          }

          placeholder="Search customer, email, phone, branch, message..."
        />


        {loading ? (

          <LoadingState />

        ) : contacts.length ? (

          <div
            className="
              mt-5

              overflow-hidden

              rounded-2xl

              border
              border-slate-200
            "
          >

            {contacts.map(
              (
                contact
              ) => (

                <button
                  key={
                    contact.id
                  }

                  type="button"

                  onClick={() =>
                    openContact(
                      contact
                    )
                  }

                  className="
                    flex
                    w-full

                    items-center
                    gap-4

                    border-b
                    border-slate-100

                    px-5
                    py-4

                    text-left

                    transition

                    last:border-b-0

                    hover:bg-blue-50/30
                  "
                >

                  <div
                    className={`
                      relative

                      flex
                      h-10
                      w-10

                      shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      ${
                        contact.read ===
                        true
                          ? "bg-slate-50 text-slate-400"
                          : "bg-blue-50 text-[#0060d0]"
                      }
                    `}
                  >

                    <UserRound
                      size={16}
                    />


                    {contact.read !==
                      true && (

                      <span
                        className="
                          absolute
                          right-0
                          top-0

                          h-2.5
                          w-2.5

                          rounded-full

                          border-2
                          border-white

                          bg-[#168cff]
                        "
                      />

                    )}

                  </div>


                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <div
                        className="
                          truncate

                          text-xs
                          font-black

                          text-[#071b3d]
                        "
                      >
                        {
                          contact.name ||
                          "Unknown Customer"
                        }
                      </div>


                      {contact.read !==
                        true && (

                        <span
                          className="
                            rounded-full

                            bg-blue-50

                            px-2
                            py-0.5

                            text-[7px]
                            font-black
                            uppercase

                            text-[#0060d0]
                          "
                        >
                          Unread
                        </span>

                      )}

                    </div>


                    <div
                      className="
                        mt-1

                        truncate

                        text-[10px]
                        font-semibold

                        text-slate-500
                      "
                    >
                      {
                        contact.subject ||
                        "Website Contact Enquiry"
                      }
                    </div>


                    <div
                      className="
                        mt-1

                        truncate

                        text-[9px]

                        text-slate-400
                      "
                    >
                      {
                        contact.message ||
                        "No message"
                      }
                    </div>


                    {contact.branchName && (
                      <div
                        className="
                          mt-2

                          inline-flex

                          items-center
                          gap-1.5

                          text-[8px]
                          font-bold

                          text-[#0060d0]
                        "
                      >
                        <MapPin
                          size={10}
                        />

                        {
                          contact.branchName
                        }
                      </div>
                    )}

                  </div>


                  <div
                    className="
                      hidden

                      text-right

                      sm:block
                    "
                  >

                    <ContactStatus
                      status={
                        contact.status
                      }
                    />


                    <div
                      className="
                        mt-2

                        text-[8px]

                        text-slate-400
                      "
                    >
                      {formatDate(
                        contact.createdAt
                      )}
                    </div>

                  </div>


                  <ArrowRight
                    size={14}

                    className="
                      shrink-0
                      text-slate-300
                    "
                  />

                </button>

              )
            )}

          </div>

        ) : (

          <EmptyState
            title="No contacts found"
            description="Website contact enquiries will appear here."
          />

        )}

      </Panel>
    </>
  );
}


/* =========================================================
   LEADS TAB
========================================================= */

function LeadsTab({
  data,
  leads,
  loading,
  search,
  setSearch,
  openLead,
  reload,
}) {
  return (
    <>
      {/* KPI */}

      <div
        className="
          grid
          gap-4

          sm:grid-cols-2
          xl:grid-cols-5
        "
      >

        <Metric
          label="Total Leads"

          value={
            data?.overview
              ?.total ||
            0
          }

          icon={
            Users
          }
        />


        <Metric
          label="New Leads"

          value={
            data?.overview
              ?.new ||
            0
          }

          icon={
            Target
          }
        />


        <Metric
          label="Qualified"

          value={
            data?.overview
              ?.qualified ||
            0
          }

          icon={
            TrendingUp
          }
        />


        <Metric
          label="Won"

          value={
            data?.overview
              ?.won ||
            0
          }

          icon={
            CheckCircle2
          }
        />


        <Metric
          label="Pipeline Value"

          value={formatCurrency(
            data?.overview
              ?.pipelineValue
          )}

          icon={
            Banknote
          }
        />

      </div>


      <Panel>

        <SectionHeader
          eyebrow="Commercial Pipeline"
          title="Commercial Opportunities"
          description="Commercial proposal requests from the Rapid Business Care form."
        />


        <SearchBar
          value={
            search
          }

          setValue={
            setSearch
          }

          placeholder="Search company, contact, branch, service or location..."
        />


        {loading ? (

          <LoadingState />

        ) : (

          <div
            className="
              mt-6
              overflow-x-auto
            "
          >

            <div
              className="
                flex
                min-w-[1500px]
                gap-4
              "
            >

              {LEAD_STAGES.map(
                (
                  stage
                ) => {

                  const stageLeads =
                    leads.filter(
                      (
                        lead
                      ) =>
                        String(
                          lead.stage ||
                          "new"
                        )
                          .toLowerCase() ===
                        stage
                    );


                  return (
                    <LeadColumn
                      key={
                        stage
                      }

                      stage={
                        stage
                      }

                      leads={
                        stageLeads
                      }

                      openLead={
                        openLead
                      }

                      reload={
                        reload
                      }
                    />
                  );
                }
              )}

            </div>

          </div>

        )}

      </Panel>
    </>
  );
}


/* =========================================================
   LEAD COLUMN
========================================================= */

function LeadColumn({
  stage,
  leads,
  openLead,
  reload,
}) {
  return (
    <div
      className="
        w-[255px]
        shrink-0
      "
    >

      <div
        className="
          mb-3

          flex
          items-center
          justify-between

          px-1
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <StageDot
            stage={
              stage
            }
          />


          <span
            className="
              text-[9px]
              font-black
              uppercase

              tracking-[1.3px]

              text-slate-500
            "
          >
            {stage}
          </span>

        </div>


        <span
          className="
            rounded-full

            bg-slate-100

            px-2
            py-1

            text-[8px]
            font-black

            text-slate-500
          "
        >
          {
            leads.length
          }
        </span>

      </div>


      <div
        className="
          min-h-[180px]

          space-y-3

          rounded-2xl

          bg-slate-50/70

          p-2.5
        "
      >

        {leads.length ? (

          leads.map(
            (
              lead
            ) => (

              <LeadPipelineCard
                key={
                  lead.id
                }

                lead={
                  lead
                }

                openLead={
                  openLead
                }

                reload={
                  reload
                }
              />

            )
          )

        ) : (

          <div
            className="
              flex
              h-28

              items-center
              justify-center

              text-[9px]
              font-semibold

              text-slate-300
            "
          >
            No leads
          </div>

        )}

      </div>

    </div>
  );
}


/* =========================================================
   LEAD CARD
========================================================= */

function LeadPipelineCard({
  lead,
  openLead,
  reload,
}) {
  const [
    advancing,
    setAdvancing,
  ] = useState(
    false
  );


  const currentStage =
    String(
      lead.stage ||
      "new"
    ).toLowerCase();


  const stageIndex =
    LEAD_STAGES.indexOf(
      currentStage
    );


  const wonIndex =
    LEAD_STAGES.indexOf(
      "won"
    );


  const canAdvance =
    stageIndex >=
      0 &&
    stageIndex <
      wonIndex;


  async function advanceLead(
    event
  ) {
    event.stopPropagation();


    if (
      !canAdvance ||
      advancing
    ) {
      return;
    }


    const nextStage =
      LEAD_STAGES[
        stageIndex +
        1
      ];


    try {
      setAdvancing(
        true
      );


      const response =
        await fetch(
          `${API_URL}/api/customers/leads/${lead.id}`,
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
                stage:
                  nextStage,
              }),
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
          "Failed to update lead."
        );
      }


      await reload();
    } catch (
      error
    ) {
      console.error(
        "Advance Lead Error:",
        error
      );
    } finally {
      setAdvancing(
        false
      );
    }
  }


  return (
    <div
      role="button"

      tabIndex={0}

      onClick={() =>
        openLead(
          lead
        )
      }

      onKeyDown={(
        event
      ) => {
        if (
          event.key ===
            "Enter" ||
          event.key ===
            " "
        ) {
          openLead(
            lead
          );
        }
      }}

      className="
        w-full

        cursor-pointer

        rounded-xl

        border
        border-slate-200

        bg-white

        p-4

        text-left

        shadow-sm

        transition

        hover:-translate-y-0.5
        hover:border-blue-200
        hover:shadow-md
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
            h-8
            w-8

            items-center
            justify-center

            rounded-lg

            bg-blue-50

            text-[#0060d0]
          "
        >
          <BriefcaseBusiness
            size={14}
          />
        </div>


        <PriorityBadge
          value={
            lead.priority
          }
        />

      </div>


      <div
        className="
          mt-3

          truncate

          text-xs
          font-black

          text-[#071b3d]
        "
      >
        {
          lead.company ||
          lead.name ||
          "Unnamed Lead"
        }
      </div>


      {lead.company &&
        lead.name && (

        <div
          className="
            mt-1

            truncate

            text-[9px]

            text-slate-400
          "
        >
          {
            lead.name
          }
        </div>

      )}


      {lead.branchName && (
        <div
          className="
            mt-2

            flex
            items-center
            gap-1.5

            text-[8px]
            font-bold

            text-slate-400
          "
        >
          <MapPin
            size={10}
          />

          {
            lead.branchName
          }
        </div>
      )}


      <div
        className="
          mt-3

          rounded-lg

          bg-slate-50

          px-3
          py-2
        "
      >

        <div
          className="
            text-[7px]
            font-black
            uppercase

            tracking-wider

            text-slate-400
          "
        >
          Requirement
        </div>


        <div
          className="
            mt-1

            truncate

            text-[9px]
            font-bold

            text-slate-600
          "
        >
          {
            lead.service ||
            "Commercial Laundry"
          }
        </div>

      </div>


      {lead.frequency && (
        <div
          className="
            mt-2

            text-[8px]

            text-slate-400
          "
        >
          Frequency:{" "}

          <span
            className="
              font-bold
              text-slate-600
            "
          >
            {
              lead.frequency
            }
          </span>
        </div>
      )}


      {Number(
        lead.estimatedValue ||
        0
      ) >
        0 && (

        <div
          className="
            mt-3

            text-xs
            font-black

            text-[#0060d0]
          "
        >
          {formatCurrency(
            lead.estimatedValue
          )}
        </div>

      )}


      {canAdvance && (

        <button
          type="button"

          onClick={
            advanceLead
          }

          disabled={
            advancing
          }

          className="
            mt-4

            flex
            w-full

            items-center
            justify-center
            gap-1.5

            rounded-lg

            bg-blue-50

            py-2

            text-[8px]
            font-black
            uppercase

            tracking-wider

            text-[#0060d0]

            transition

            hover:bg-[#0060d0]
            hover:text-white

            disabled:cursor-wait
            disabled:opacity-50
          "
        >
          {
            advancing
              ? "Updating..."
              : "Next Stage"
          }

          {!advancing && (
            <ArrowRight
              size={11}
            />
          )}
        </button>

      )}

    </div>
  );
}


/* =========================================================
   CONTACT DRAWER
========================================================= */

function ContactDrawer({
  contact,
  close,
  reload,
}) {
  const [
    saving,
    setSaving,
  ] = useState(
    false
  );


  const [
    notes,
    setNotes,
  ] = useState(
    contact.notes ||
    ""
  );


  async function updateContact(
    updates,
    shouldClose = true
  ) {
    try {
      setSaving(
        true
      );


      const response =
        await fetch(
          `${API_URL}/api/customers/contacts/${contact.id}`,
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
              JSON.stringify(
                updates
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
          "Failed to update contact."
        );
      }


      await reload();


      if (
        shouldClose
      ) {
        close();
      }
    } catch (
      error
    ) {
      console.error(
        "Update Contact Error:",
        error
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  return (
    <DrawerShell
      title="Contact Enquiry"

      subtitle={
        contact.name ||
        "Customer"
      }

      close={
        close
      }
    >

      {/* STATUS */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2
        "
      >

        <ContactStatus
          status={
            contact.status
          }
        />


        {contact.read !==
          true && (

          <span
            className="
              rounded-full

              bg-blue-50

              px-3
              py-1

              text-[8px]
              font-black
              uppercase

              text-[#0060d0]
            "
          >
            Unread
          </span>

        )}


        {contact.emailStatus && (
          <span
            className="
              rounded-full

              bg-slate-100

              px-3
              py-1

              text-[8px]
              font-black
              uppercase

              text-slate-500
            "
          >
            Email{" "}
            {
              contact.emailStatus
            }
          </span>
        )}

      </div>


      {/* CUSTOMER */}

      <DrawerSection
        title="Customer"
      >

        <DrawerRow
          icon={
            UserRound
          }

          label="Name"

          value={
            contact.name
          }
        />


        <DrawerRow
          icon={
            Mail
          }

          label="Email"

          value={
            contact.email
          }
        />


        <DrawerRow
          icon={
            Phone
          }

          label="Phone"

          value={
            contact.phone
          }
        />

      </DrawerSection>


      {/* BRANCH */}

      <DrawerSection
        title="Rapid Branch"
      >

        <DrawerRow
          icon={
            MapPin
          }

          label="Branch"

          value={
            contact.branchName
          }
        />

      </DrawerSection>


      {/* ENQUIRY */}

      <DrawerSection
        title="Enquiry"
      >

        <div
          className="
            p-4
          "
        >

          {contact.subject && (
            <>
              <div
                className="
                  text-[8px]
                  font-black
                  uppercase

                  tracking-wider

                  text-slate-400
                "
              >
                Subject
              </div>


              <div
                className="
                  mt-1

                  text-xs
                  font-black

                  text-[#071b3d]
                "
              >
                {
                  contact.subject
                }
              </div>
            </>
          )}


          <div
            className="
              mt-4

              text-[8px]
              font-black
              uppercase

              tracking-wider

              text-slate-400
            "
          >
            Message
          </div>


          <p
            className="
              mt-2

              whitespace-pre-wrap

              text-xs
              leading-6

              text-slate-600
            "
          >
            {
              contact.message ||
              "No message"
            }
          </p>


          <div
            className="
              mt-5

              text-[8px]
              font-black
              uppercase

              tracking-wider

              text-slate-400
            "
          >
            Received
          </div>


          <div
            className="
              mt-1

              text-xs
              font-bold

              text-slate-600
            "
          >
            {formatDateTime(
              contact.createdAt
            )}
          </div>

        </div>

      </DrawerSection>


      {/* INTERNAL NOTES */}

      <LeadField
        label="Internal Notes"
      >
        <textarea
          rows={4}

          value={
            notes
          }

          onChange={(
            event
          ) =>
            setNotes(
              event.target.value
            )
          }

          placeholder="Internal notes about this enquiry..."

          className="
            w-full

            resize-none

            rounded-xl

            border
            border-slate-200

            bg-white

            px-3
            py-3

            text-xs
            leading-6

            text-slate-600

            outline-none

            focus:border-[#168cff]
          "
        />
      </LeadField>


      <button
        type="button"

        disabled={
          saving
        }

        onClick={() =>
          updateContact(
            {
              notes,
            },
            false
          )
        }

        className="
          w-full

          rounded-xl

          border
          border-slate-200

          bg-white

          py-3

          text-[10px]
          font-black

          text-slate-600

          transition

          hover:border-blue-200
          hover:text-[#0060d0]

          disabled:opacity-50
        "
      >
        Save Notes
      </button>


      {/* ACTIONS */}

      <div
        className="
          grid
          gap-3

          sm:grid-cols-2
        "
      >

        <button
          type="button"

          disabled={
            saving
          }

          onClick={() =>
            updateContact({
              status:
                "contacted",

              read:
                true,

              notes,
            })
          }

          className="
            rounded-xl

            bg-blue-50

            py-3

            text-[10px]
            font-black

            text-[#0060d0]

            transition

            hover:bg-blue-100

            disabled:opacity-50
          "
        >
          Mark Contacted
        </button>


        <button
          type="button"

          disabled={
            saving
          }

          onClick={() =>
            updateContact({
              status:
                "resolved",

              read:
                true,

              notes,
            })
          }

          className="
            rounded-xl

            bg-emerald-50

            py-3

            text-[10px]
            font-black

            text-emerald-600

            transition

            hover:bg-emerald-100

            disabled:opacity-50
          "
        >
          Resolve
        </button>

      </div>

    </DrawerShell>
  );
}


/* =========================================================
   LEAD DRAWER
========================================================= */

function LeadDrawer({
  lead,
  close,
  reload,
}) {
  const [
    form,
    setForm,
  ] = useState({
    stage:
      lead.stage ||
      "new",

    priority:
      lead.priority ||
      "medium",

    owner:
      lead.owner ||
      "",

    estimatedValue:
      lead.estimatedValue ||
      "",

    notes:
      lead.notes ||
      "",

    nextFollowUp:
      toDateInput(
        lead.nextFollowUp
      ),
  });


  const [
    saving,
    setSaving,
  ] = useState(
    false
  );


  async function save() {
    try {
      setSaving(
        true
      );


      const response =
        await fetch(
          `${API_URL}/api/customers/leads/${lead.id}`,
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
                ...form,

                estimatedValue:
                  Number(
                    form.estimatedValue ||
                    0
                  ),

                nextFollowUp:
                  form.nextFollowUp ||
                  null,
              }),
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
          "Failed to update lead."
        );
      }


      await reload();

      close();
    } catch (
      error
    ) {
      console.error(
        "Save Lead Error:",
        error
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  return (
    <DrawerShell
      title="Commercial Opportunity"

      subtitle={
        lead.company ||
        lead.name ||
        "Commercial Lead"
      }

      close={
        close
      }
    >

      {/* TOP STATUS */}

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >

        <LeadStageBadge
          stage={
            lead.stage
          }
        />


        <PriorityBadge
          value={
            lead.priority
          }
        />


        {lead.branchName && (
          <span
            className="
              inline-flex

              items-center
              gap-1.5

              rounded-full

              bg-blue-50

              px-3
              py-1

              text-[8px]
              font-black
              uppercase

              text-[#0060d0]
            "
          >
            <MapPin
              size={9}
            />

            {
              lead.branchName
            }
          </span>
        )}

      </div>


      {/* CONTACT */}

      <DrawerSection
        title="Contact Person"
      >

        <DrawerRow
          icon={
            UserRound
          }

          label="Contact"

          value={
            lead.name
          }
        />


        <DrawerRow
          icon={
            Mail
          }

          label="Email"

          value={
            lead.email
          }
        />


        <DrawerRow
          icon={
            Phone
          }

          label="Phone / WhatsApp"

          value={
            lead.phone
          }
        />

      </DrawerSection>


      {/* BUSINESS */}

      <DrawerSection
        title="Business"
      >

        <DrawerRow
          icon={
            Building2
          }

          label="Company"

          value={
            lead.company
          }
        />


        <DrawerRow
          icon={
            BriefcaseBusiness
          }

          label="Business Type"

          value={
            lead.businessType
          }
        />


        <DrawerRow
          icon={
            MapPin
          }

          label="Business Location"

          value={
            lead.location
          }
        />


        <DrawerRow
          icon={
            MapPin
          }

          label="Nearest Rapid Branch"

          value={
            lead.branchName
          }
        />

      </DrawerSection>


      {/* SERVICE */}

      <DrawerSection
        title="Service Requirement"
      >

        <DrawerRow
          icon={
            Target
          }

          label="Service"

          value={
            lead.service
          }
        />


        <DrawerRow
          icon={
            BriefcaseBusiness
          }

          label="Estimated Weekly Volume"

          value={
            lead.volume
          }
        />


        <DrawerRow
          icon={
            Clock3
          }

          label="Frequency"

          value={
            lead.frequency
          }
        />

      </DrawerSection>


      {/* REQUIREMENTS */}

      <DrawerSection
        title="Customer Requirements"
      >

        <div
          className="
            p-4
          "
        >

          <div
            className="
              text-[8px]
              font-black
              uppercase

              tracking-wider

              text-slate-400
            "
          >
            Laundry Requirements
          </div>


          <p
            className="
              mt-2

              whitespace-pre-wrap

              text-xs
              leading-6

              text-slate-600
            "
          >
            {
              lead.requirements ||
              "No requirements provided."
            }
          </p>


          {lead.additionalRequirements && (
            <>
              <div
                className="
                  mt-5

                  text-[8px]
                  font-black
                  uppercase

                  tracking-wider

                  text-slate-400
                "
              >
                Additional Requirements
              </div>


              <p
                className="
                  mt-2

                  whitespace-pre-wrap

                  text-xs
                  leading-6

                  text-slate-600
                "
              >
                {
                  lead.additionalRequirements
                }
              </p>
            </>
          )}

        </div>

      </DrawerSection>


      {/* LEAD MANAGEMENT */}

      <div
        className="
          rounded-2xl

          border
          border-blue-100

          bg-blue-50/40

          p-5
        "
      >

        <div
          className="
            mb-5

            text-[9px]
            font-black
            uppercase

            tracking-[1.4px]

            text-[#0060d0]
          "
        >
          Lead Management
        </div>


        <div
          className="
            grid
            gap-4

            sm:grid-cols-2
          "
        >

          {/* STAGE */}

          <LeadField
            label="Stage"
          >

            <select
              value={
                form.stage
              }

              onChange={(
                event
              ) =>
                setForm(
                  (
                    previous
                  ) => ({
                    ...previous,

                    stage:
                      event
                        .target
                        .value,
                  })
                )
              }

              className="
                h-11
                w-full

                rounded-xl

                border
                border-slate-200

                bg-white

                px-3

                text-xs
                font-bold

                text-slate-600

                outline-none

                focus:border-[#168cff]
              "
            >

              {LEAD_STAGES.map(
                (
                  stage
                ) => (

                  <option
                    key={
                      stage
                    }

                    value={
                      stage
                    }
                  >
                    {formatStage(
                      stage
                    )}
                  </option>

                )
              )}

            </select>

          </LeadField>


          {/* PRIORITY */}

          <LeadField
            label="Priority"
          >

            <select
              value={
                form.priority
              }

              onChange={(
                event
              ) =>
                setForm(
                  (
                    previous
                  ) => ({
                    ...previous,

                    priority:
                      event
                        .target
                        .value,
                  })
                )
              }

              className="
                h-11
                w-full

                rounded-xl

                border
                border-slate-200

                bg-white

                px-3

                text-xs
                font-bold

                text-slate-600

                outline-none

                focus:border-[#168cff]
              "
            >

              <option
                value="low"
              >
                Low
              </option>

              <option
                value="medium"
              >
                Medium
              </option>

              <option
                value="high"
              >
                High
              </option>

            </select>

          </LeadField>


          {/* VALUE */}

          <LeadField
            label="Estimated Value (LKR)"
          >

            <input
              type="number"

              min="0"

              step="1"

              value={
                form.estimatedValue
              }

              onChange={(
                event
              ) =>
                setForm(
                  (
                    previous
                  ) => ({
                    ...previous,

                    estimatedValue:
                      event
                        .target
                        .value,
                  })
                )
              }

              placeholder="0"

              className="
                h-11
                w-full

                rounded-xl

                border
                border-slate-200

                bg-white

                px-3

                text-xs
                font-bold

                text-slate-600

                outline-none

                focus:border-[#168cff]
              "
            />

          </LeadField>


          {/* FOLLOWUP */}

          <LeadField
            label="Next Follow-up"
          >

            <input
              type="date"

              value={
                form.nextFollowUp
              }

              onChange={(
                event
              ) =>
                setForm(
                  (
                    previous
                  ) => ({
                    ...previous,

                    nextFollowUp:
                      event
                        .target
                        .value,
                  })
                )
              }

              className="
                h-11
                w-full

                rounded-xl

                border
                border-slate-200

                bg-white

                px-3

                text-xs
                font-bold

                text-slate-600

                outline-none

                focus:border-[#168cff]
              "
            />

          </LeadField>

        </div>


        {/* OWNER */}

        <div
          className="
            mt-4
          "
        >
          <LeadField
            label="Owner"
          >

            <input
              value={
                form.owner
              }

              onChange={(
                event
              ) =>
                setForm(
                  (
                    previous
                  ) => ({
                    ...previous,

                    owner:
                      event
                        .target
                        .value,
                  })
                )
              }

              placeholder="Assigned team member"

              className="
                h-11
                w-full

                rounded-xl

                border
                border-slate-200

                bg-white

                px-3

                text-xs
                font-bold

                text-slate-600

                outline-none

                focus:border-[#168cff]
              "
            />

          </LeadField>
        </div>


        {/* NOTES */}

        <div
          className="
            mt-4
          "
        >
          <LeadField
            label="Internal Lead Notes"
          >

            <textarea
              rows={5}

              value={
                form.notes
              }

              onChange={(
                event
              ) =>
                setForm(
                  (
                    previous
                  ) => ({
                    ...previous,

                    notes:
                      event
                        .target
                        .value,
                  })
                )
              }

              placeholder="Add follow-up notes, customer discussions, quotation details..."

              className="
                w-full

                resize-none

                rounded-xl

                border
                border-slate-200

                bg-white

                px-3
                py-3

                text-xs
                leading-6

                text-slate-600

                outline-none

                focus:border-[#168cff]
              "
            />

          </LeadField>
        </div>

      </div>


      {/* META */}

      <div
        className="
          grid
          gap-3

          rounded-2xl

          border
          border-slate-100

          bg-slate-50/60

          p-4

          sm:grid-cols-2
        "
      >

        <MetaValue
          label="Received"

          value={formatDateTime(
            lead.createdAt
          )}
        />


        <MetaValue
          label="Source"

          value={
            lead.source ||
            "Website"
          }
        />

      </div>


      {/* SAVE */}

      <button
        type="button"

        onClick={
          save
        }

        disabled={
          saving
        }

        className="
          w-full

          rounded-xl

          bg-[#00195f]

          py-3.5

          text-[10px]
          font-black
          uppercase

          tracking-[1px]

          text-white

          transition

          hover:bg-[#0060d0]

          disabled:cursor-wait
          disabled:opacity-50
        "
      >
        {
          saving
            ? "Saving..."
            : "Save Lead Changes"
        }
      </button>

    </DrawerShell>
  );
}


/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div>

      <div
        className="
          text-[9px]
          font-black
          uppercase

          tracking-[1.7px]

          text-[#0060d0]
        "
      >
        {eyebrow}
      </div>


      <h2
        className="
          mt-1

          text-base
          font-black

          text-[#071b3d]
        "
      >
        {title}
      </h2>


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
  );
}


/* =========================================================
   SEARCH
========================================================= */

function SearchBar({
  value,
  setValue,
  placeholder,
}) {
  return (
    <div
      className="
        relative
        mt-5
      "
    >

      <Search
        size={14}

        className="
          absolute
          left-3.5
          top-1/2

          -translate-y-1/2

          text-slate-400
        "
      />


      <input
        value={
          value
        }

        onChange={(
          event
        ) =>
          setValue(
            event.target.value
          )
        }

        placeholder={
          placeholder
        }

        className="
          h-11
          w-full

          rounded-xl

          border
          border-slate-200

          bg-slate-50/70

          pl-10
          pr-4

          text-xs
          font-semibold

          text-slate-700

          outline-none

          transition

          focus:border-[#168cff]
          focus:bg-white
        "
      />

    </div>
  );
}


/* =========================================================
   CONTACT STATUS
========================================================= */

function ContactStatus({
  status,
}) {
  const value =
    String(
      status ||
      "new"
    ).toLowerCase();


  const styles = {
    new:
      "bg-blue-50 text-[#0060d0]",

    contacted:
      "bg-amber-50 text-amber-600",

    resolved:
      "bg-emerald-50 text-emerald-600",
  };


  return (
    <span
      className={`
        inline-flex

        rounded-full

        px-3
        py-1

        text-[8px]
        font-black
        uppercase

        tracking-wider

        ${
          styles[value] ||
          "bg-slate-100 text-slate-500"
        }
      `}
    >
      {value}
    </span>
  );
}


/* =========================================================
   LEAD STAGE
========================================================= */

function LeadStageBadge({
  stage,
}) {
  const value =
    String(
      stage ||
      "new"
    ).toLowerCase();


  const styles = {
    new:
      "bg-blue-50 text-[#0060d0]",

    contacted:
      "bg-cyan-50 text-cyan-600",

    qualified:
      "bg-violet-50 text-violet-600",

    proposal:
      "bg-amber-50 text-amber-600",

    negotiation:
      "bg-orange-50 text-orange-600",

    won:
      "bg-emerald-50 text-emerald-600",

    lost:
      "bg-red-50 text-red-500",
  };


  return (
    <span
      className={`
        rounded-full

        px-3
        py-1

        text-[8px]
        font-black
        uppercase

        tracking-wider

        ${
          styles[value] ||
          "bg-slate-100 text-slate-500"
        }
      `}
    >
      {formatStage(
        value
      )}
    </span>
  );
}


/* =========================================================
   PRIORITY
========================================================= */

function PriorityBadge({
  value,
}) {
  const priority =
    String(
      value ||
      "medium"
    ).toLowerCase();


  const styles = {
    high:
      "bg-red-50 text-red-500",

    medium:
      "bg-amber-50 text-amber-600",

    low:
      "bg-slate-100 text-slate-500",
  };


  return (
    <span
      className={`
        rounded-full

        px-2
        py-1

        text-[7px]
        font-black
        uppercase

        ${
          styles[
            priority
          ] ||
          styles.medium
        }
      `}
    >
      {priority}
    </span>
  );
}


/* =========================================================
   STAGE DOT
========================================================= */

function StageDot({
  stage,
}) {
  let className =
    "bg-slate-400";


  if (
    stage ===
    "new"
  ) {
    className =
      "bg-[#168cff]";
  }


  if (
    stage ===
    "contacted"
  ) {
    className =
      "bg-cyan-500";
  }


  if (
    stage ===
    "qualified"
  ) {
    className =
      "bg-violet-500";
  }


  if (
    stage ===
      "proposal" ||
    stage ===
      "negotiation"
  ) {
    className =
      "bg-amber-500";
  }


  if (
    stage ===
    "won"
  ) {
    className =
      "bg-emerald-500";
  }


  if (
    stage ===
    "lost"
  ) {
    className =
      "bg-red-400";
  }


  return (
    <span
      className={`
        h-2
        w-2

        rounded-full

        ${className}
      `}
    />
  );
}


/* =========================================================
   DRAWER
========================================================= */

function DrawerShell({
  title,
  subtitle,
  close,
  children,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[2000]
      "
    >

      <button
        type="button"

        aria-label="Close"

        onClick={
          close
        }

        className="
          absolute
          inset-0

          bg-[#071b3d]/30

          backdrop-blur-[2px]
        "
      />


      <aside
        className="
          absolute

          bottom-0
          right-0
          top-0

          w-full
          max-w-[540px]

          overflow-y-auto

          bg-white

          shadow-[-20px_0_60px_rgba(15,23,42,.18)]
        "
      >

        <div
          className="
            sticky
            top-0
            z-10

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

                tracking-[1.7px]

                text-[#0060d0]
              "
            >
              {title}
            </div>


            <h2
              className="
                mt-1

                text-lg
                font-black

                text-[#071b3d]
              "
            >
              {subtitle}
            </h2>

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

              transition

              hover:bg-slate-200
            "
          >
            <X
              size={15}
            />
          </button>

        </div>


        <div
          className="
            space-y-6
            p-6
          "
        >
          {children}
        </div>

      </aside>

    </div>
  );
}


/* =========================================================
   DRAWER SECTION
========================================================= */

function DrawerSection({
  title,
  children,
}) {
  return (
    <section>

      <div
        className="
          mb-3

          text-[9px]
          font-black
          uppercase

          tracking-[1.4px]

          text-[#0060d0]
        "
      >
        {title}
      </div>


      <div
        className="
          overflow-hidden

          rounded-2xl

          border
          border-slate-200
        "
      >
        {children}
      </div>

    </section>
  );
}


/* =========================================================
   DRAWER ROW
========================================================= */

function DrawerRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        border-b
        border-slate-100

        px-4
        py-3

        last:border-0
      "
    >

      <div
        className="
          flex
          h-8
          w-8

          shrink-0

          items-center
          justify-center

          rounded-lg

          bg-slate-50

          text-[#0060d0]
        "
      >
        <Icon
          size={13}
        />
      </div>


      <div
        className="
          min-w-0
        "
      >

        <div
          className="
            text-[8px]
            font-black
            uppercase

            tracking-wider

            text-slate-400
          "
        >
          {label}
        </div>


        <div
          className="
            mt-0.5

            break-words

            text-xs
            font-bold

            text-slate-700
          "
        >
          {
            value ||
            "—"
          }
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   LEAD FIELD
========================================================= */

function LeadField({
  label,
  children,
}) {
  return (
    <label
      className="
        block
      "
    >

      <span
        className="
          mb-2
          block

          text-[8px]
          font-black
          uppercase

          tracking-[1.2px]

          text-slate-400
        "
      >
        {label}
      </span>


      {children}

    </label>
  );
}


/* =========================================================
   META
========================================================= */

function MetaValue({
  label,
  value,
}) {
  return (
    <div>

      <div
        className="
          text-[7px]
          font-black
          uppercase

          tracking-[1px]

          text-slate-400
        "
      >
        {label}
      </div>


      <div
        className="
          mt-1

          break-words

          text-[10px]
          font-bold

          text-slate-600
        "
      >
        {
          value ||
          "—"
        }
      </div>

    </div>
  );
}


/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div
      className="
        mt-5

        h-64

        animate-pulse

        rounded-2xl

        bg-slate-50
      "
    />
  );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  title,
  description,
}) {
  return (
    <div
      className="
        mt-5

        flex
        min-h-[220px]
        flex-col

        items-center
        justify-center

        rounded-2xl

        border
        border-dashed
        border-slate-200

        bg-slate-50/40

        p-6

        text-center
      "
    >

      <MessageSquare
        size={24}

        className="
          text-slate-300
        "
      />


      <div
        className="
          mt-3

          text-sm
          font-black

          text-slate-600
        "
      >
        {title}
      </div>


      <p
        className="
          mt-1

          max-w-sm

          text-[10px]
          leading-5

          text-slate-400
        "
      >
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(
  value
) {
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
    Number(
      value ||
      0
    )
  );
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(
  value
) {
  if (!value) {
    return "—";
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
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


/* =========================================================
   FORMAT DATE + TIME
========================================================= */

function formatDateTime(
  value
) {
  if (!value) {
    return "—";
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "—";
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
   DATE INPUT
========================================================= */

function toDateInput(
  value
) {
  if (!value) {
    return "";
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }


  return date
    .toISOString()
    .slice(
      0,
      10
    );
}


/* =========================================================
   FORMAT STAGE
========================================================= */

function formatStage(
  stage
) {
  if (!stage) {
    return "New";
  }


  return String(
    stage
  )
    .replace(
      /-/g,
      " "
    )
    .replace(
      /\b\w/g,
      (
        character
      ) =>
        character.toUpperCase()
    );
}