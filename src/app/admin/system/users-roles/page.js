"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CheckCircle2,
  Edit3,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  X,
  XCircle,
} from "lucide-react";


/* =========================================================
   API
========================================================= */

const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;


/* =========================================================
   EMPTY FORM
========================================================= */

const EMPTY_FORM = {
  displayName: "",

  email: "",

  loginType:
    "password",

  password: "",

  active:
    true,
};


/* =========================================================
   PAGE
========================================================= */

export default function UsersRolesPage() {
  const [
    users,
    setUsers,
  ] = useState(
    []
  );


  const [
    overview,
    setOverview,
  ] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0,
  });


  const [
    loading,
    setLoading,
  ] = useState(
    true
  );


  const [
    saving,
    setSaving,
  ] = useState(
    false
  );


  const [
    deleting,
    setDeleting,
  ] = useState(
    null
  );


  const [
    search,
    setSearch,
  ] = useState(
    ""
  );


  const [
    form,
    setForm,
  ] = useState(
    EMPTY_FORM
  );


  const [
    editingUser,
    setEditingUser,
  ] = useState(
    null
  );


  const [
    editorOpen,
    setEditorOpen,
  ] = useState(
    false
  );


  const [
    error,
    setError,
  ] = useState(
    ""
  );


  const [
    success,
    setSuccess,
  ] = useState(
    ""
  );


  /* =======================================================
     LOAD
  ======================================================= */

  const loadUsers =
    useCallback(
      async () => {
        try {
          setLoading(
            true
          );


          setError(
            ""
          );


          const response =
            await fetch(
              `${API_URL}/api/admin-users`,
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


          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
              "Failed to load administrators."
            );
          }


          setUsers(
            result.data
              ?.users ||
            []
          );


          setOverview(
            result.data
              ?.overview || {
              total: 0,
              active: 0,
              inactive: 0,
              pending: 0,
            }
          );
        } catch (error) {
          console.error(
            "Load administrators:",
            error
          );


          setError(
            error.message
          );
        } finally {
          setLoading(
            false
          );
        }
      },
      []
    );


  useEffect(
    () => {
      loadUsers();
    },
    [
      loadUsers,
    ]
  );


  /* =======================================================
     FILTER
  ======================================================= */

  const filteredUsers =
    useMemo(
      () => {
        const query =
          search
            .trim()
            .toLowerCase();


        if (!query) {
          return users;
        }


        return users.filter(
          (
            user
          ) =>
            [
              user.email,
              user.displayName,
              user.loginType,
            ]
              .filter(Boolean)
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
        users,
        search,
      ]
    );


  /* =======================================================
     ADD
  ======================================================= */

  function addUser() {
    setEditingUser(
      null
    );


    setForm({
      ...EMPTY_FORM,
    });


    setError(
      ""
    );


    setSuccess(
      ""
    );


    setEditorOpen(
      true
    );
  }


  /* =======================================================
     EDIT
  ======================================================= */

  function editUser(
    user
  ) {
    setEditingUser(
      user
    );


    setForm({
      displayName:
        user.displayName ||
        "",

      email:
        user.email ||
        "",

      loginType:
        user.loginType ||
        (
          user.pending
            ? "google"
            : "password"
        ),

      password:
        "",

      active:
        user.active ===
        true,
    });


    setError(
      ""
    );


    setSuccess(
      ""
    );


    setEditorOpen(
      true
    );
  }


  /* =======================================================
     SAVE
  ======================================================= */

  async function saveUser() {
    try {
      setSaving(
        true
      );


      setError(
        ""
      );


      setSuccess(
        ""
      );


      if (
        !form.email.trim()
      ) {
        throw new Error(
          "Email address is required."
        );
      }


      if (
        !editingUser &&
        (
          form.loginType ===
            "password" ||
          form.loginType ===
            "both"
        ) &&
        form.password.length <
          8
      ) {
        throw new Error(
          "Password must contain at least 8 characters."
        );
      }


      let endpoint =
        `${API_URL}/api/admin-users`;

      let method =
        "POST";


      if (
        editingUser
          ?.pending
      ) {
        endpoint =
          `${API_URL}/api/admin-users/pending/${encodeURIComponent(
            editingUser.email
          )}`;

        method =
          "PATCH";
      } else if (
        editingUser?.uid
      ) {
        endpoint =
          `${API_URL}/api/admin-users/${editingUser.uid}`;

        method =
          "PATCH";
      }


      const response =
        await fetch(
          endpoint,
          {
            method,

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                displayName:
                  form.displayName.trim(),

                email:
                  form.email
                    .trim()
                    .toLowerCase(),

                loginType:
                  form.loginType,

                password:
                  form.password,

                active:
                  form.active,
              }),
          }
        );


      const result =
        await response.json();


      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
          "Failed to save administrator."
        );
      }


      setEditorOpen(
        false
      );


      setEditingUser(
        null
      );


      setSuccess(
        result.message ||
        "Administrator saved successfully."
      );


      await loadUsers();
    } catch (error) {
      console.error(
        "Save administrator:",
        error
      );


      setError(
        error.message
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

  async function deleteUser(
    user
  ) {
    const confirmed =
      window.confirm(
        `Delete administrator access for ${user.email}?`
      );


    if (!confirmed) {
      return;
    }


    try {
      const id =
        user.uid ||
        user.email;


      setDeleting(
        id
      );


      setError(
        ""
      );


      let endpoint;


      if (
        user.pending
      ) {
        endpoint =
          `${API_URL}/api/admin-users/pending/${encodeURIComponent(
            user.email
          )}`;
      } else {
        endpoint =
          `${API_URL}/api/admin-users/${user.uid}`;
      }


      const response =
        await fetch(
          endpoint,
          {
            method:
              "DELETE",

            credentials:
              "include",
          }
        );


      const result =
        await response.json();


      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
          "Delete failed."
        );
      }


      setSuccess(
        result.message ||
        "Administrator deleted."
      );


      await loadUsers();
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setDeleting(
        null
      );
    }
  }


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div
      className="
        min-h-screen

        bg-[#f6f8fc]

        px-4
        py-5

        sm:px-6
        lg:px-8
      "
    >

      <div
        className="
          mx-auto

          max-w-[1600px]

          space-y-6
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <section
          className="
            relative

            overflow-hidden

            rounded-[28px]

            border
            border-slate-200

            bg-white

            px-6
            py-7

            shadow-[0_18px_60px_rgba(15,23,42,.05)]

            sm:px-8
          "
        >

          <div
            className="
              pointer-events-none

              absolute

              -right-20
              -top-24

              h-72
              w-72

              rounded-full

              bg-gradient-to-br

              from-slate-400/10
              to-slate-700/5

              blur-3xl
            "
          />


          <div
            className="
              relative

              flex
              flex-col

              gap-5

              lg:flex-row
              lg:items-center
              lg:justify-between
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

                  tracking-[2px]

                  text-slate-500
                "
              >
                <ShieldCheck
                  size={13}
                />

                System Security
              </div>


              <h1
                className="
                  mt-2

                  text-2xl
                  font-black

                  tracking-[-.04em]

                  text-[#071b3d]

                  sm:text-3xl
                "
              >
                Admin Users
              </h1>


              <p
                className="
                  mt-2

                  max-w-2xl

                  text-xs
                  leading-6

                  text-slate-500
                "
              >
                Manage administrator accounts, login methods
                and access to the Rapid management system.
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
                  loadUsers
                }

                className="
                  flex
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

                  text-slate-500

                  transition

                  hover:border-slate-300
                "
              >
                <RefreshCw
                  size={13}
                />

                Refresh
              </button>


              <button
                type="button"

                onClick={
                  addUser
                }

                className="
                  flex
                  h-11

                  items-center
                  gap-2

                  rounded-xl

                  bg-[#334155]

                  px-5

                  text-[9px]
                  font-black

                  text-white

                  shadow-[0_12px_30px_rgba(51,65,85,.18)]

                  transition

                  hover:bg-[#1e293b]
                "
              >
                <UserPlus
                  size={14}
                />

                Add Administrator
              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            MESSAGES
        ================================================= */}

        {error && (
          <Message
            error
          >
            {error}
          </Message>
        )}


        {success && (
          <Message>
            {success}
          </Message>
        )}


        {/* =================================================
            METRICS
        ================================================= */}

        <div
          className="
            grid
            gap-4

            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <Metric
            label="Total Admins"

            value={
              overview.total
            }

            icon={
              Users
            }
          />


          <Metric
            label="Active Admins"

            value={
              overview.active
            }

            icon={
              UserCheck
            }
          />


          <Metric
            label="Inactive"

            value={
              overview.inactive
            }

            icon={
              XCircle
            }
          />


          <Metric
            label="Pending Google"

            value={
              overview.pending
            }

            icon={
              KeyRound
            }
          />

        </div>


        {/* =================================================
            DIRECTORY
        ================================================= */}

        <section
          className="
            rounded-[26px]

            border
            border-slate-200

            bg-white

            p-5

            shadow-[0_10px_40px_rgba(15,23,42,.035)]

            sm:p-6
          "
        >

          <div
            className="
              flex
              flex-col

              gap-4

              md:flex-row
              md:items-center
              md:justify-between
            "
          >

            <div>

              <div
                className="
                  text-[9px]
                  font-black
                  uppercase

                  tracking-[1.5px]

                  text-slate-400
                "
              >
                Access Directory
              </div>


              <h2
                className="
                  mt-1

                  text-lg
                  font-black

                  text-[#071b3d]
                "
              >
                Administrators
              </h2>


              <p
                className="
                  mt-1

                  text-[9px]

                  text-slate-400
                "
              >
                All accounts have administrator-level access.
              </p>

            </div>


            <div
              className="
                relative

                w-full

                md:max-w-[360px]
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

                placeholder="Search name, email or login method..."

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

                  text-slate-700

                  outline-none

                  transition

                  focus:border-slate-400
                  focus:bg-white
                "
              />

            </div>

          </div>


          {/* =================================================
              TABLE
          ================================================= */}

          <div
            className="
              mt-6

              overflow-x-auto
            "
          >

            <table
              className="
                w-full

                min-w-[900px]

                border-collapse
              "
            >

              <thead>

                <tr
                  className="
                    border-b
                    border-slate-100
                  "
                >

                  <TableHeader>
                    Administrator
                  </TableHeader>


                  <TableHeader>
                    Login Method
                  </TableHeader>


                  <TableHeader>
                    Status
                  </TableHeader>


                  <TableHeader>
                    Last Sign In
                  </TableHeader>


                  <TableHeader
                    right
                  >
                    Actions
                  </TableHeader>

                </tr>

              </thead>


              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan={5}

                      className="
                        py-20

                        text-center
                      "
                    >
                      <Loader2
                        size={24}

                        className="
                          mx-auto

                          animate-spin

                          text-slate-400
                        "
                      />
                    </td>

                  </tr>

                ) : filteredUsers.length ? (

                  filteredUsers.map(
                    (
                      user
                    ) => {

                      const deletingThis =
                        deleting ===
                        (
                          user.uid ||
                          user.email
                        );


                      return (

                        <tr
                          key={
                            user.uid ||
                            user.email
                          }

                          className="
                            border-b
                            border-slate-100

                            transition

                            last:border-0

                            hover:bg-slate-50/50
                          "
                        >

                          {/* USER */}

                          <td
                            className="
                              py-4
                              pr-4
                            "
                          >

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
                                  h-11
                                  w-11

                                  shrink-0

                                  items-center
                                  justify-center

                                  rounded-xl

                                  bg-gradient-to-br

                                  from-slate-100
                                  to-slate-200

                                  text-sm
                                  font-black

                                  text-slate-600
                                "
                              >
                                {getInitials(
                                  user
                                )}
                              </div>


                              <div
                                className="
                                  min-w-0
                                "
                              >

                                <div
                                  className="
                                    truncate

                                    text-[10px]
                                    font-black

                                    text-[#071b3d]
                                  "
                                >
                                  {
                                    user.displayName ||
                                    "Rapid Administrator"
                                  }
                                </div>


                                <div
                                  className="
                                    mt-1

                                    flex
                                    items-center
                                    gap-1.5

                                    text-[9px]

                                    text-slate-400
                                  "
                                >
                                  <Mail
                                    size={10}
                                  />

                                  {
                                    user.email
                                  }
                                </div>


                                <div
                                  className="
                                    mt-1

                                    text-[7px]
                                    font-black
                                    uppercase

                                    tracking-[1px]

                                    text-slate-300
                                  "
                                >
                                  Administrator
                                </div>

                              </div>

                            </div>

                          </td>


                          {/* LOGIN */}

                          <td>

                            <LoginBadge
                              type={
                                user.loginType
                              }
                            />

                          </td>


                          {/* STATUS */}

                          <td>

                            {user.pending ? (

                              <StatusBadge
                                type="pending"
                              >
                                Waiting for Google Login
                              </StatusBadge>

                            ) : user.active ? (

                              <StatusBadge
                                type="active"
                              >
                                Active
                              </StatusBadge>

                            ) : (

                              <StatusBadge
                                type="inactive"
                              >
                                Inactive
                              </StatusBadge>

                            )}

                          </td>


                          {/* LAST LOGIN */}

                          <td
                            className="
                              text-[9px]

                              text-slate-500
                            "
                          >
                            {
                              user.pending
                                ? "Not signed in yet"
                                : formatDate(
                                    user.lastSignInTime
                                  )
                            }
                          </td>


                          {/* ACTIONS */}

                          <td>

                            <div
                              className="
                                flex
                                justify-end
                                gap-2
                              "
                            >

                              <button
                                type="button"

                                onClick={() =>
                                  editUser(
                                    user
                                  )
                                }

                                title="Edit administrator"

                                className="
                                  flex
                                  h-9
                                  w-9

                                  items-center
                                  justify-center

                                  rounded-xl

                                  bg-slate-50

                                  text-slate-500

                                  transition

                                  hover:bg-blue-50
                                  hover:text-blue-600
                                "
                              >
                                <Edit3
                                  size={13}
                                />
                              </button>


                              <button
                                type="button"

                                disabled={
                                  deletingThis
                                }

                                onClick={() =>
                                  deleteUser(
                                    user
                                  )
                                }

                                title="Delete administrator"

                                className="
                                  flex
                                  h-9
                                  w-9

                                  items-center
                                  justify-center

                                  rounded-xl

                                  bg-red-50

                                  text-red-500

                                  transition

                                  hover:bg-red-100

                                  disabled:opacity-50
                                "
                              >
                                {deletingThis ? (

                                  <Loader2
                                    size={13}

                                    className="
                                      animate-spin
                                    "
                                  />

                                ) : (

                                  <Trash2
                                    size={13}
                                  />

                                )}
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={5}

                      className="
                        py-20

                        text-center
                      "
                    >

                      <Users
                        size={28}

                        className="
                          mx-auto

                          text-slate-300
                        "
                      />


                      <div
                        className="
                          mt-3

                          text-sm
                          font-black

                          text-slate-500
                        "
                      >
                        No administrators found
                      </div>


                      <p
                        className="
                          mt-1

                          text-[9px]

                          text-slate-400
                        "
                      >
                        Add an administrator or try another search.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>


      {/* ===================================================
          ADD / EDIT DRAWER
      =================================================== */}

      {editorOpen && (

        <AdminEditor
          form={
            form
          }

          setForm={
            setForm
          }

          user={
            editingUser
          }

          saving={
            saving
          }

          close={() =>
            setEditorOpen(
              false
            )
          }

          save={
            saveUser
          }
        />

      )}

    </div>
  );
}


/* =========================================================
   ADMIN EDITOR
========================================================= */

function AdminEditor({
  form,
  setForm,
  user,
  saving,
  close,
  save,
}) {
  function update(
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


  const editing =
    Boolean(user);


  const pending =
    user?.pending ===
    true;


  return (
    <div
      className="
        fixed
        inset-0
        z-[4000]
      "
    >

      {/* OVERLAY */}

      <button
        type="button"

        aria-label="Close"

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


      {/* DRAWER */}

      <aside
        className="
          absolute

          bottom-0
          right-0
          top-0

          w-full
          max-w-[580px]

          overflow-y-auto

          bg-white

          shadow-[-30px_0_80px_rgba(15,23,42,.2)]
        "
      >

        {/* HEADER */}

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
                flex
                items-center
                gap-2

                text-[9px]
                font-black
                uppercase

                tracking-[1.5px]

                text-slate-400
              "
            >
              <ShieldCheck
                size={12}
              />

              Administrator Access
            </div>


            <h2
              className="
                mt-1

                text-xl
                font-black

                text-[#071b3d]
              "
            >
              {editing
                ? "Edit Administrator"
                : "Add Administrator"}
            </h2>


            <p
              className="
                mt-1

                text-[9px]
                leading-5

                text-slate-400
              "
            >
              All accounts created here receive administrator access.
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

              shrink-0

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


        {/* FORM */}

        <div
          className="
            space-y-7

            p-6
          "
        >

          {/* BASIC */}

          <FormSection
            title="Administrator Details"
          >

            <Field
              label="Display Name"
            >

              <input
                value={
                  form.displayName
                }

                onChange={(
                  event
                ) =>
                  update(
                    "displayName",
                    event.target.value
                  )
                }

                placeholder="Administrator name"

                className={
                  inputClass
                }
              />

            </Field>


            <Field
              label="Email Address"
            >

              <input
                type="email"

                value={
                  form.email
                }

                onChange={(
                  event
                ) =>
                  update(
                    "email",
                    event.target.value
                  )
                }

                placeholder="admin@gmail.com"

                className={
                  inputClass
                }
              />

            </Field>

          </FormSection>


          {/* LOGIN */}

          <FormSection
            title="Authentication"
          >

            <Field
              label="Login Method"
            >

              <select
                value={
                  form.loginType
                }

                disabled={
                  pending
                }

                onChange={(
                  event
                ) =>
                  update(
                    "loginType",
                    event.target.value
                  )
                }

                className={
                  inputClass
                }
              >

                <option
                  value="password"
                >
                  Email & Password
                </option>


                <option
                  value="google"
                >
                  Google
                </option>


                <option
                  value="both"
                >
                  Email Password + Google
                </option>

              </select>

            </Field>


            {/* PASSWORD NEW USER */}

            {!editing &&
              (
                form.loginType ===
                  "password" ||
                form.loginType ===
                  "both"
              ) && (

              <Field
                label="Initial Password"
              >

                <input
                  type="password"

                  value={
                    form.password
                  }

                  onChange={(
                    event
                  ) =>
                    update(
                      "password",
                      event.target.value
                    )
                  }

                  placeholder="Minimum 8 characters"

                  className={
                    inputClass
                  }
                />

              </Field>

            )}


            {/* PASSWORD EDIT */}

            {editing &&
              !pending &&
              form.loginType !==
                "google" && (

              <Field
                label="New Password (Optional)"
              >

                <input
                  type="password"

                  value={
                    form.password
                  }

                  onChange={(
                    event
                  ) =>
                    update(
                      "password",
                      event.target.value
                    )
                  }

                  placeholder="Leave blank to keep existing password"

                  className={
                    inputClass
                  }
                />

              </Field>

            )}


            {/* GOOGLE INFORMATION */}

            {form.loginType ===
              "google" && (

              <div
                className="
                  rounded-xl

                  border
                  border-blue-100

                  bg-blue-50/60

                  p-4
                "
              >

                <div
                  className="
                    flex
                    gap-3
                  "
                >

                  <KeyRound
                    size={17}

                    className="
                      mt-0.5
                      shrink-0

                      text-[#0060d0]
                    "
                  />


                  <div>

                    <div
                      className="
                        text-[10px]
                        font-black

                        text-[#001f5c]
                      "
                    >
                      Google Authentication
                    </div>


                    <p
                      className="
                        mt-1

                        text-[9px]
                        leading-5

                        text-blue-700
                      "
                    >
                      This email address will be authorised to sign in
                      using Google. The Firebase UID and adminUsers
                      record are automatically linked after the first
                      successful Google login.
                    </p>

                  </div>

                </div>

              </div>

            )}

          </FormSection>


          {/* STATUS */}

          <FormSection
            title="Account Status"
          >

            <label
              className="
                flex
                cursor-pointer

                items-center
                justify-between

                gap-4

                rounded-xl

                border
                border-slate-200

                bg-white

                px-4
                py-4
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
                  Active Administrator
                </div>


                <div
                  className="
                    mt-1

                    text-[9px]
                    leading-5

                    text-slate-400
                  "
                >
                  Inactive accounts cannot log in to the admin panel.
                </div>

              </div>


              <button
                type="button"

                onClick={() =>
                  update(
                    "active",
                    !form.active
                  )
                }

                className={`
                  relative

                  h-6
                  w-11

                  shrink-0

                  rounded-full

                  transition

                  ${
                    form.active
                      ? "bg-emerald-500"
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
                      form.active
                        ? "left-6"
                        : "left-1"
                    }
                  `}
                />

              </button>

            </label>


            <div
              className="
                rounded-xl

                border
                border-slate-100

                bg-slate-50

                px-4
                py-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-[9px]
                  font-black

                  text-slate-500
                "
              >
                <ShieldCheck
                  size={12}
                />

                Role: Administrator
              </div>


              <div
                className="
                  mt-1

                  text-[8px]
                  leading-5

                  text-slate-400
                "
              >
                Role assignment is automatic. All accounts managed
                from this page use <strong>role: admin</strong>.
              </div>

            </div>

          </FormSection>


          {/* SAVE */}

          <button
            type="button"

            disabled={
              saving
            }

            onClick={
              save
            }

            className="
              flex
              h-12
              w-full

              items-center
              justify-center
              gap-2

              rounded-xl

              bg-[#334155]

              text-[9px]
              font-black
              uppercase

              tracking-[.6px]

              text-white

              shadow-[0_12px_28px_rgba(51,65,85,.18)]

              transition

              hover:bg-[#1e293b]

              disabled:cursor-wait
              disabled:opacity-50
            "
          >

            {saving && (
              <Loader2
                size={13}

                className="
                  animate-spin
                "
              />
            )}


            {saving
              ? "Saving..."
              : editing
              ? "Update Administrator"
              : "Create Administrator"}

          </button>

        </div>

      </aside>

    </div>
  );
}


/* =========================================================
   LOGIN BADGE
========================================================= */

function LoginBadge({
  type
}) {
  if (
    type ===
    "google"
  ) {
    return (
      <span
        className="
          inline-flex

          items-center
          gap-2

          rounded-lg

          bg-blue-50

          px-2.5
          py-1.5

          text-[8px]
          font-black

          text-blue-600
        "
      >
        <KeyRound
          size={10}
        />

        Google
      </span>
    );
  }


  if (
    type ===
    "both"
  ) {
    return (
      <span
        className="
          inline-flex

          items-center
          gap-2

          rounded-lg

          bg-purple-50

          px-2.5
          py-1.5

          text-[8px]
          font-black

          text-purple-600
        "
      >
        <LockKeyhole
          size={10}
        />

        Password + Google
      </span>
    );
  }


  return (
    <span
      className="
        inline-flex

        items-center
        gap-2

        rounded-lg

        bg-slate-100

        px-2.5
        py-1.5

        text-[8px]
        font-black

        text-slate-500
      "
    >
      <LockKeyhole
        size={10}
      />

      Password
    </span>
  );
}


/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  children,
  type,
}) {
  const styles = {
    active:
      "bg-emerald-50 text-emerald-600",

    inactive:
      "bg-red-50 text-red-500",

    pending:
      "bg-amber-50 text-amber-600",
  };


  return (
    <span
      className={`
        inline-flex

        items-center
        gap-1.5

        rounded-full

        px-2.5
        py-1

        text-[7px]
        font-black
        uppercase

        tracking-[.6px]

        ${
          styles[
            type
          ]
        }
      `}
    >

      {type ===
        "active" && (
        <CheckCircle2
          size={10}
        />
      )}


      {type ===
        "inactive" && (
        <XCircle
          size={10}
        />
      )}


      {type ===
        "pending" && (
        <KeyRound
          size={10}
        />
      )}


      {children}

    </span>
  );
}


/* =========================================================
   METRIC
========================================================= */

function Metric({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
        rounded-[22px]

        border
        border-slate-200

        bg-white

        p-5

        shadow-[0_8px_30px_rgba(15,23,42,.03)]
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <div
            className="
              text-[8px]
              font-black
              uppercase

              tracking-[1.2px]

              text-slate-400
            "
          >
            {label}
          </div>


          <div
            className="
              mt-2

              text-xl
              font-black

              text-[#071b3d]
            "
          >
            {value}
          </div>

        </div>


        <div
          className="
            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-xl

            bg-slate-100

            text-slate-600
          "
        >
          <Icon
            size={16}
          />
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   TABLE
========================================================= */

function TableHeader({
  children,
  right = false,
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


/* =========================================================
   FORM
========================================================= */

function FormSection({
  title,
  children,
}) {
  return (
    <section>

      <div
        className="
          mb-4

          text-[9px]
          font-black
          uppercase

          tracking-[1.5px]

          text-slate-500
        "
      >
        {title}
      </div>


      <div
        className="
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

      <span
        className="
          mb-2
          block

          text-[8px]
          font-black
          uppercase

          tracking-[1px]

          text-slate-400
        "
      >
        {label}
      </span>


      {children}

    </label>
  );
}


const inputClass =
  `
    h-11
    w-full

    rounded-xl

    border
    border-slate-200

    bg-white

    px-3

    text-xs
    font-semibold

    text-slate-700

    outline-none

    transition

    focus:border-[#64748b]

    disabled:cursor-not-allowed
    disabled:bg-slate-50
    disabled:text-slate-400
  `;


/* =========================================================
   MESSAGE
========================================================= */

function Message({
  children,
  error = false,
}) {
  return (
    <div
      className={`
        rounded-xl

        border

        px-4
        py-3

        text-[10px]
        font-bold

        ${
          error
            ? "border-red-100 bg-red-50 text-red-600"
            : "border-emerald-100 bg-emerald-50 text-emerald-600"
        }
      `}
    >
      {children}
    </div>
  );
}


/* =========================================================
   HELPERS
========================================================= */

function getInitials(
  user
) {
  const name =
    String(
      user.displayName ||
      ""
    ).trim();


  if (name) {
    return name
      .split(/\s+/)
      .slice(
        0,
        2
      )
      .map(
        (
          word
        ) =>
          word[0]
      )
      .join("")
      .toUpperCase();
  }


  return String(
    user.email?.[0] ||
    "A"
  ).toUpperCase();
}


function formatDate(
  value
) {
  if (!value) {
    return "Never";
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