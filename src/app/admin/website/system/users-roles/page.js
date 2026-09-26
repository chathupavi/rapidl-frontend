"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BadgeCheck,
  BriefcaseBusiness,
  CirclePlus,
  Edit3,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";


const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   INITIAL USER
========================================================= */

const INITIAL_USER = {
  displayName: "",
  email: "",
  role: "",
  password: "",

  loginMethods: [
    "google",
  ],

  active: true,
};


/* =========================================================
   INITIAL ROLE
========================================================= */

const INITIAL_ROLE = {
  name: "",
  description: "",
  active: true,
  permissions: [],
};


/* =========================================================
   PAGE
========================================================= */

export default function UsersRolesPage() {
  const [
    tab,
    setTab,
  ] =
    useState("users");


  const [
    users,
    setUsers,
  ] =
    useState([]);


  const [
    roles,
    setRoles,
  ] =
    useState([]);


  const [
    loading,
    setLoading,
  ] =
    useState(true);


  const [
    search,
    setSearch,
  ] =
    useState("");


  const [
    error,
    setError,
  ] =
    useState("");


  const [
    userModal,
    setUserModal,
  ] =
    useState(false);


  const [
    roleModal,
    setRoleModal,
  ] =
    useState(false);


  const [
    selectedUser,
    setSelectedUser,
  ] =
    useState(null);


  const [
    selectedRole,
    setSelectedRole,
  ] =
    useState(null);


  /* =======================================================
     LOAD
  ======================================================= */

  const loadData =
    useCallback(
      async () => {
        try {
          setLoading(
            true
          );

          setError(
            ""
          );


          const [
            usersResponse,
            rolesResponse,
          ] =
            await Promise.all([
              fetch(
                `${API_URL}/api/admin-users`,
                {
                  credentials:
                    "include",

                  cache:
                    "no-store",
                }
              ),

              fetch(
                `${API_URL}/api/admin-users/roles`,
                {
                  credentials:
                    "include",

                  cache:
                    "no-store",
                }
              ),
            ]);


          const [
            usersResult,
            rolesResult,
          ] =
            await Promise.all([
              usersResponse.json(),
              rolesResponse.json(),
            ]);


          if (
            !usersResponse.ok
          ) {
            throw new Error(
              usersResult.message ||
                "Unable to load users."
            );
          }


          if (
            !rolesResponse.ok
          ) {
            throw new Error(
              rolesResult.message ||
                "Unable to load roles."
            );
          }


          setUsers(
            Array.isArray(
              usersResult.users
            )
              ? usersResult.users
              : []
          );


          setRoles(
            Array.isArray(
              rolesResult.roles
            )
              ? rolesResult.roles
              : []
          );
        } catch (error) {
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


  useEffect(() => {
    loadData();
  }, [loadData]);


  /* =======================================================
     FILTER USERS
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
          (user) =>
            user.email
              ?.toLowerCase()
              .includes(
                query
              ) ||
            user.displayName
              ?.toLowerCase()
              .includes(
                query
              ) ||
            user.role
              ?.toLowerCase()
              .includes(
                query
              )
        );
      },
      [
        users,
        search,
      ]
    );


  /* =======================================================
     DELETE USER
  ======================================================= */

  async function deleteUser(
    user
  ) {
    if (
      !window.confirm(
        `Delete ${user.email}?\n\nThis will remove both the Firebase Authentication account and Firestore admin profile.`
      )
    ) {
      return;
    }


    try {
      const response =
        await fetch(
          `${API_URL}/api/admin-users/${user.uid}`,
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
          result.message
        );
      }


      setUsers(
        (current) =>
          current.filter(
            (item) =>
              item.uid !==
              user.uid
          )
      );
    } catch (error) {
      window.alert(
        error.message
      );
    }
  }


  /* =======================================================
     ACTIVE
  ======================================================= */

  async function toggleActive(
    user
  ) {
    try {
      const response =
        await fetch(
          `${API_URL}/api/admin-users/${user.uid}/active`,
          {
            method:
              "PATCH",

            credentials:
              "include",
          }
        );


      const result =
        await response.json();


      if (!response.ok) {
        throw new Error(
          result.message
        );
      }


      setUsers(
        (current) =>
          current.map(
            (item) =>
              item.uid ===
              user.uid
                ? {
                    ...item,

                    active:
                      result.active,
                  }
                : item
          )
      );
    } catch (error) {
      window.alert(
        error.message
      );
    }
  }


  return (
    <>
      <main
        className="
          min-h-screen
          bg-[#F4F7FB]
          p-5
          sm:p-7
          lg:p-10
        "
      >
        <div
          className="
            mx-auto
            max-w-[1600px]
          "
        >

          {/* HEADER */}

          <div
            className="
              flex
              flex-col
              gap-6
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
                  tracking-[.17em]
                  text-[#0062CC]
                "
              >
                <ShieldCheck
                  size={14}
                />

                System
              </div>


              <h1
                className="
                  mt-3
                  text-3xl
                  font-black
                  tracking-[-.045em]
                  text-[#001F5C]
                  sm:text-4xl
                "
              >
                Users & Roles
              </h1>


              <p
                className="
                  mt-3
                  max-w-[720px]
                  text-sm
                  leading-6
                  text-slate-500
                "
              >
                Manage administrator accounts, roles, account status and
                allowed authentication methods.
              </p>
            </div>


            <div
              className="
                flex
                gap-3
              "
            >
              <button
                type="button"
                onClick={
                  loadData
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
                  text-[8px]
                  font-black
                  uppercase
                  text-[#001F5C]
                "
              >
                <RefreshCw
                  size={14}
                />

                Refresh
              </button>


              <button
                type="button"
                onClick={() => {
                  if (
                    tab ===
                    "users"
                  ) {
                    setSelectedUser(
                      null
                    );

                    setUserModal(
                      true
                    );
                  } else {
                    setSelectedRole(
                      null
                    );

                    setRoleModal(
                      true
                    );
                  }
                }}
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#001F5C]
                  via-[#0062CC]
                  to-[#0084E3]
                  px-5
                  text-[8px]
                  font-black
                  uppercase
                  text-white
                "
              >
                <CirclePlus
                  size={14}
                />

                {tab ===
                "users"
                  ? "Add User"
                  : "Add Role"}
              </button>
            </div>
          </div>


          {/* STATS */}

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-3
            "
          >
            <Stat
              label="Admin Users"
              value={
                users.length
              }
            />

            <Stat
              label="Active Users"
              value={
                users.filter(
                  (user) =>
                    user.active
                ).length
              }
            />

            <Stat
              label="Roles"
              value={
                roles.length
              }
            />
          </div>


          {/* TAB BAR */}

          <div
            className="
              mt-7
              flex
              gap-1
              rounded-[18px]
              border
              border-slate-200
              bg-white
              p-1.5
            "
          >
            <Tab
              active={
                tab ===
                "users"
              }
              onClick={() =>
                setTab(
                  "users"
                )
              }
            >
              <UsersRound
                size={14}
              />

              Users
            </Tab>


            <Tab
              active={
                tab ===
                "roles"
              }
              onClick={() =>
                setTab(
                  "roles"
                )
              }
            >
              <ShieldCheck
                size={14}
              />

              Roles
            </Tab>
          </div>


          {error && (
            <div
              className="
                mt-5
                rounded-xl
                bg-red-50
                p-4
                text-sm
                font-semibold
                text-red-600
              "
            >
              {error}
            </div>
          )}


          {tab ===
          "users" ? (
            <>

              {/* SEARCH */}

              <div
                className="
                  mt-5
                  rounded-[18px]
                  border
                  border-slate-200
                  bg-white
                  p-4
                "
              >
                <div
                  className="
                    relative
                    max-w-[480px]
                  "
                >
                  <Search
                    size={15}
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
                        event.target
                          .value
                      )
                    }
                    placeholder="Search users..."
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-[#F8FAFC]
                      pl-11
                      pr-4
                      text-sm
                      outline-none
                    "
                  />
                </div>
              </div>


              {/* USERS */}

              <div
                className="
                  mt-5
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-slate-200
                  bg-white
                "
              >
                {loading ? (
                  <Loading />
                ) : (
                  filteredUsers.map(
                    (user) => (
                      <UserRow
                        key={
                          user.uid
                        }
                        user={
                          user
                        }
                        onEdit={() => {
                          setSelectedUser(
                            user
                          );

                          setUserModal(
                            true
                          );
                        }}
                        onActive={() =>
                          toggleActive(
                            user
                          )
                        }
                        onDelete={() =>
                          deleteUser(
                            user
                          )
                        }
                      />
                    )
                  )
                )}
              </div>
            </>
          ) : (
            <RolesView
              roles={
                roles
              }
              onEdit={(
                role
              ) => {
                setSelectedRole(
                  role
                );

                setRoleModal(
                  true
                );
              }}
              onDeleted={(
                id
              ) =>
                setRoles(
                  (current) =>
                    current.filter(
                      (role) =>
                        role.id !==
                        id
                    )
                )
              }
            />
          )}

        </div>
      </main>


      {userModal && (
        <UserModal
          key={
            selectedUser
              ?.uid ||
            "new"
          }
          user={
            selectedUser
          }
          roles={
            roles
          }
          onClose={() =>
            setUserModal(
              false
            )
          }
          onSaved={(
            saved
          ) => {
            setUsers(
              (current) => {
                const exists =
                  current.some(
                    (user) =>
                      user.uid ===
                      saved.uid
                  );


                return exists
                  ? current.map(
                      (user) =>
                        user.uid ===
                        saved.uid
                          ? saved
                          : user
                    )
                  : [
                      ...current,
                      saved,
                    ];
              }
            );

            setUserModal(
              false
            );
          }}
        />
      )}


      {roleModal && (
        <RoleModal
          key={
            selectedRole
              ?.id ||
            "new-role"
          }
          role={
            selectedRole
          }
          onClose={() =>
            setRoleModal(
              false
            )
          }
          onSaved={(
            saved
          ) => {
            setRoles(
              (current) => {
                const exists =
                  current.some(
                    (role) =>
                      role.id ===
                      saved.id
                  );


                return exists
                  ? current.map(
                      (role) =>
                        role.id ===
                        saved.id
                          ? saved
                          : role
                    )
                  : [
                      ...current,
                      saved,
                    ];
              }
            );

            setRoleModal(
              false
            );
          }}
        />
      )}
    </>
  );
}


/* =========================================================
   USER ROW
========================================================= */

function UserRow({
  user,
  onEdit,
  onActive,
  onDelete,
}) {
  const google =
    user.loginMethods
      ?.includes(
        "google"
      );


  const password =
    user.loginMethods
      ?.includes(
        "password"
      );


  return (
    <div
      className="
        grid
        gap-5
        border-b
        border-slate-100
        p-5
        last:border-0
        lg:grid-cols-[1fr_180px_220px_auto]
        lg:items-center
      "
    >
      <div
        className="
          flex
          items-center
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
            rounded-full
            bg-[#EEF6FF]
            text-[#0062CC]
          "
        >
          <UserRound
            size={17}
          />
        </div>


        <div>
          <div
            className="
              font-black
              text-[#001F5C]
            "
          >
            {user.displayName ||
              "Admin User"}
          </div>

          <div
            className="
              mt-1
              flex
              items-center
              gap-1.5
              text-xs
              text-slate-400
            "
          >
            <Mail
              size={11}
            />

            {user.email}
          </div>
        </div>
      </div>


      <div>
        <SmallLabel>
          Role
        </SmallLabel>

        <div
          className="
            mt-1
            text-xs
            font-black
            text-[#001F5C]
          "
        >
          {user.role}
        </div>
      </div>


      <div>
        <SmallLabel>
          Sign-in
        </SmallLabel>

        <div
          className="
            mt-2
            flex
            flex-wrap
            gap-2
          "
        >
          {google && (
            <ProviderBadge>
              Google
            </ProviderBadge>
          )}

          {password && (
            <ProviderBadge>
              Email
            </ProviderBadge>
          )}
        </div>
      </div>


      <div
        className="
          flex
          items-center
          justify-end
          gap-2
        "
      >
        <button
          onClick={
            onActive
          }
          className={`
            flex
            h-9
            items-center
            gap-2
            rounded-lg
            px-3
            text-[7px]
            font-black
            uppercase

            ${
              user.active
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-500"
            }
          `}
        >
          {user.active ? (
            <Eye
              size={12}
            />
          ) : (
            <EyeOff
              size={12}
            />
          )}

          {user.active
            ? "Active"
            : "Disabled"}
        </button>


        <IconButton
          onClick={
            onEdit
          }
        >
          <Edit3
            size={14}
          />
        </IconButton>


        <IconButton
          danger
          onClick={
            onDelete
          }
        >
          <Trash2
            size={14}
          />
        </IconButton>
      </div>
    </div>
  );
}


/* =========================================================
   USER MODAL
========================================================= */

function UserModal({
  user,
  roles,
  onClose,
  onSaved,
}) {
  const isEdit =
    Boolean(
      user?.uid
    );


  const [
    form,
    setForm,
  ] =
    useState({
      ...INITIAL_USER,
      ...(user || {}),

      password:
        "",
    });


  const [
    saving,
    setSaving,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  function set(
    name,
    value
  ) {
    setForm(
      (current) => ({
        ...current,
        [name]:
          value,
      })
    );
  }


  function toggleMethod(
    method
  ) {
    setForm(
      (current) => {
        const exists =
          current.loginMethods.includes(
            method
          );


        return {
          ...current,

          loginMethods:
            exists
              ? current.loginMethods.filter(
                  (item) =>
                    item !==
                    method
                )
              : [
                  ...current.loginMethods,
                  method,
                ],
        };
      }
    );
  }


  async function save(
    event
  ) {
    event.preventDefault();


    try {
      setSaving(
        true
      );

      setError(
        ""
      );


      const payload = {
        email:
          form.email.trim(),

        displayName:
          form.displayName.trim(),

        role:
          form.role,

        active:
          Boolean(
            form.active
          ),

        loginMethods:
          form.loginMethods,
      };


      if (
        form.password
      ) {
        payload.password =
          form.password;
      }


      const response =
        await fetch(
          isEdit
            ? `${API_URL}/api/admin-users/${user.uid}`
            : `${API_URL}/api/admin-users`,
          {
            method:
              isEdit
                ? "PUT"
                : "POST",

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
          result.message
        );
      }


      onSaved(
        result.user
      );
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  return (
    <ModalShell
      title={
        isEdit
          ? "Edit User"
          : "Add User"
      }
      subtitle="Administrator Account"
      onClose={
        onClose
      }
    >
      <form
        onSubmit={
          save
        }
      >
        <div
          className="
            space-y-5
            p-6
          "
        >
          {error && (
            <ErrorBox>
              {error}
            </ErrorBox>
          )}


          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            <Input
              label="Name"
              value={
                form.displayName
              }
              onChange={(
                event
              ) =>
                set(
                  "displayName",
                  event.target
                    .value
                )
              }
              placeholder="John Silva"
            />


            <Input
              label="Email"
              type="email"
              value={
                form.email
              }
              onChange={(
                event
              ) =>
                set(
                  "email",
                  event.target
                    .value
                )
              }
              placeholder="john@rapid.lk"
            />
          </div>


          <label className="block">
            <SmallLabel>
              Role
            </SmallLabel>

            <select
              value={
                form.role
              }
              onChange={(
                event
              ) =>
                set(
                  "role",
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
                px-4
                text-sm
                outline-none
              "
            >
              <option value="">
                Select role
              </option>

              {roles
                .filter(
                  (role) =>
                    role.active !==
                    false
                )
                .map(
                  (role) => (
                    <option
                      key={
                        role.id
                      }
                      value={
                        role.id
                      }
                    >
                      {role.name}
                    </option>
                  )
                )}
            </select>
          </label>


          {/* LOGIN METHOD */}

          <div>
            <SmallLabel>
              Allowed Sign-in Methods
            </SmallLabel>


            <div
              className="
                mt-2
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              <MethodCard
                title="Google"
                description="User can sign in with their Google account."
                icon={
                  BadgeCheck
                }
                selected={
                  form.loginMethods.includes(
                    "google"
                  )
                }
                onClick={() =>
                  toggleMethod(
                    "google"
                  )
                }
              />


              <MethodCard
                title="Email & Password"
                description="User can sign in using an email address and password."
                icon={
                  KeyRound
                }
                selected={
                  form.loginMethods.includes(
                    "password"
                  )
                }
                onClick={() =>
                  toggleMethod(
                    "password"
                  )
                }
              />
            </div>
          </div>


          {/* PASSWORD */}

          {form.loginMethods.includes(
            "password"
          ) && (
            <Input
              label={
                isEdit
                  ? "New Password (optional)"
                  : "Password"
              }
              type="password"
              value={
                form.password
              }
              onChange={(
                event
              ) =>
                set(
                  "password",
                  event.target
                    .value
                )
              }
              placeholder={
                isEdit
                  ? "Leave blank to keep current password"
                  : "Minimum 6 characters"
              }
            />
          )}


          <Toggle
            title="Active Account"
            description="Inactive accounts cannot access the administration system."
            checked={
              form.active
            }
            onClick={() =>
              set(
                "active",
                !form.active
              )
            }
          />
        </div>


        <ModalFooter
          onClose={
            onClose
          }
          saving={
            saving
          }
          label={
            isEdit
              ? "Save Changes"
              : "Create User"
          }
        />
      </form>
    </ModalShell>
  );
}


/* =========================================================
   ROLE VIEW
========================================================= */

function RolesView({
  roles,
  onEdit,
  onDeleted,
}) {
  async function remove(
    role
  ) {
    if (
      !window.confirm(
        `Delete role "${role.name}"?`
      )
    ) {
      return;
    }


    try {
      const response =
        await fetch(
          `${API_URL}/api/admin-users/roles/${role.id}`,
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
          result.message
        );
      }


      onDeleted(
        role.id
      );
    } catch (error) {
      window.alert(
        error.message
      );
    }
  }


  return (
    <div
      className="
        mt-5
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {roles.map(
        (role) => (
          <article
            key={
              role.id
            }
            className="
              rounded-[22px]
              border
              border-slate-200
              bg-white
              p-5
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#EEF6FF]
                  text-[#0062CC]
                "
              >
                <ShieldCheck
                  size={17}
                />
              </div>

              {role.system && (
                <ProviderBadge>
                  System
                </ProviderBadge>
              )}
            </div>


            <h3
              className="
                mt-5
                font-black
                text-[#001F5C]
              "
            >
              {role.name}
            </h3>


            <p
              className="
                mt-2
                min-h-[42px]
                text-xs
                leading-5
                text-slate-400
              "
            >
              {role.description ||
                "No description."}
            </p>


            <div
              className="
                mt-5
                flex
                gap-2
              "
            >
              <button
                onClick={() =>
                  onEdit(
                    role
                  )
                }
                className="
                  flex
                  h-9
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#EEF6FF]
                  text-[7px]
                  font-black
                  uppercase
                  text-[#0062CC]
                "
              >
                <Edit3
                  size={12}
                />

                Edit
              </button>


              {!role.system && (
                <IconButton
                  danger
                  onClick={() =>
                    remove(
                      role
                    )
                  }
                >
                  <Trash2
                    size={13}
                  />
                </IconButton>
              )}
            </div>
          </article>
        )
      )}
    </div>
  );
}


/* =========================================================
   ROLE MODAL
========================================================= */

function RoleModal({
  role,
  onClose,
  onSaved,
}) {
  const isEdit =
    Boolean(
      role?.id
    );


  const [
    form,
    setForm,
  ] =
    useState({
      ...INITIAL_ROLE,
      ...(role || {}),
    });


  const [
    saving,
    setSaving,
  ] =
    useState(false);


  const [
    error,
    setError,
  ] =
    useState("");


  async function save(
    event
  ) {
    event.preventDefault();


    try {
      setSaving(
        true
      );

      setError(
        ""
      );


      const response =
        await fetch(
          isEdit
            ? `${API_URL}/api/admin-users/roles/${role.id}`
            : `${API_URL}/api/admin-users/roles`,
          {
            method:
              isEdit
                ? "PUT"
                : "POST",

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


      if (!response.ok) {
        throw new Error(
          result.message
        );
      }


      onSaved(
        result.role
      );
    } catch (error) {
      setError(
        error.message
      );
    } finally {
      setSaving(
        false
      );
    }
  }


  return (
    <ModalShell
      title={
        isEdit
          ? "Edit Role"
          : "Add Role"
      }
      subtitle="Access Role"
      onClose={
        onClose
      }
    >
      <form
        onSubmit={
          save
        }
      >
        <div
          className="
            space-y-5
            p-6
          "
        >
          {error && (
            <ErrorBox>
              {error}
            </ErrorBox>
          )}


          <Input
            label="Role Name"
            value={
              form.name
            }
            disabled={
              Boolean(
                role?.system
              )
            }
            onChange={(
              event
            ) =>
              setForm({
                ...form,

                name:
                  event.target
                    .value,
              })
            }
            placeholder="Content Manager"
          />


          <label>
            <SmallLabel>
              Description
            </SmallLabel>

            <textarea
              value={
                form.description
              }
              onChange={(
                event
              ) =>
                setForm({
                  ...form,

                  description:
                    event.target
                      .value,
                })
              }
              rows={4}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-slate-200
                p-4
                text-sm
                outline-none
              "
            />
          </label>


          <Toggle
            title="Active Role"
            description="Inactive roles cannot be assigned to new users."
            checked={
              form.active
            }
            onClick={() =>
              setForm({
                ...form,

                active:
                  !form.active,
              })
            }
          />
        </div>


        <ModalFooter
          onClose={
            onClose
          }
          saving={
            saving
          }
          label="Save Role"
        />
      </form>
    </ModalShell>
  );
}


/* =========================================================
   UI COMPONENTS
========================================================= */

function MethodCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className={`
        rounded-[16px]
        border
        p-4
        text-left
        transition

        ${
          selected
            ? "border-[#0062CC] bg-[#EEF6FF]"
            : "border-slate-200 bg-white"
        }
      `}
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <Icon
          size={17}
          className="
            text-[#0062CC]
          "
        />

        <div
          className={`
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            border

            ${
              selected
                ? "border-[#0062CC] bg-[#0062CC] text-white"
                : "border-slate-300"
            }
          `}
        >
          {selected && (
            <BadgeCheck
              size={12}
            />
          )}
        </div>
      </div>


      <div
        className="
          mt-3
          text-xs
          font-black
          text-[#001F5C]
        "
      >
        {title}
      </div>

      <div
        className="
          mt-1
          text-[10px]
          leading-4
          text-slate-400
        "
      >
        {description}
      </div>
    </button>
  );
}


function ModalShell({
  title,
  subtitle,
  onClose,
  children,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[300]
        flex
        items-center
        justify-center
        p-4
      "
    >
      <button
        className="
          absolute
          inset-0
          bg-[#000D27]/70
          backdrop-blur-sm
        "
        onClick={
          onClose
        }
      />


      <div
        className="
          relative
          z-10
          max-h-[94vh]
          w-full
          max-w-[760px]
          overflow-y-auto
          rounded-[26px]
          bg-white
          shadow-[0_40px_130px_rgba(0,13,39,.4)]
        "
      >
        <div
          className="
            flex
            justify-between
            border-b
            border-slate-100
            p-6
          "
        >
          <div>
            <SmallLabel>
              {subtitle}
            </SmallLabel>

            <h2
              className="
                mt-2
                text-2xl
                font-black
                text-[#001F5C]
              "
            >
              {title}
            </h2>
          </div>


          <button
            type="button"
            onClick={
              onClose
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-slate-100
            "
          >
            <X
              size={17}
            />
          </button>
        </div>


        {children}
      </div>
    </div>
  );
}


function ModalFooter({
  onClose,
  saving,
  label,
}) {
  return (
    <div
      className="
        flex
        justify-end
        gap-3
        border-t
        border-slate-100
        p-5
      "
    >
      <button
        type="button"
        onClick={
          onClose
        }
        className="
          h-11
          rounded-xl
          border
          border-slate-200
          px-5
          text-[8px]
          font-black
          uppercase
        "
      >
        Cancel
      </button>


      <button
        type="submit"
        disabled={
          saving
        }
        className="
          flex
          h-11
          min-w-[140px]
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#0062CC]
          px-5
          text-[8px]
          font-black
          uppercase
          text-white
        "
      >
        {saving && (
          <Loader2
            size={13}
            className="animate-spin"
          />
        )}

        {saving
          ? "Saving..."
          : label}
      </button>
    </div>
  );
}


function Input({
  label,
  ...props
}) {
  return (
    <label className="block">
      <SmallLabel>
        {label}
      </SmallLabel>

      <input
        {...props}
        className="
          mt-2
          h-11
          w-full
          rounded-xl
          border
          border-slate-200
          px-4
          text-sm
          outline-none
          disabled:bg-slate-100
        "
      />
    </label>
  );
}


function Toggle({
  title,
  description,
  checked,
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
        w-full
        items-center
        justify-between
        gap-5
        rounded-xl
        border
        border-slate-200
        p-4
        text-left
      "
    >
      <div>
        <div
          className="
            text-xs
            font-black
            text-[#001F5C]
          "
        >
          {title}
        </div>

        <div
          className="
            mt-1
            text-[10px]
            text-slate-400
          "
        >
          {description}
        </div>
      </div>


      <div
        className={`
          relative
          h-6
          w-11
          shrink-0
          rounded-full

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


function Tab({
  active,
  onClick,
  children,
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className={`
        flex
        h-10
        items-center
        gap-2
        rounded-xl
        px-5
        text-[8px]
        font-black
        uppercase

        ${
          active
            ? "bg-[#001F5C] text-white"
            : "text-slate-400"
        }
      `}
    >
      {children}
    </button>
  );
}


function IconButton({
  danger,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      {...props}
      className={`
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-slate-200

        ${
          danger
            ? "text-slate-400 hover:bg-red-50 hover:text-red-500"
            : "text-slate-400 hover:bg-blue-50 hover:text-[#0062CC]"
        }
      `}
    >
      {children}
    </button>
  );
}


function ProviderBadge({
  children,
}) {
  return (
    <span
      className="
        rounded-full
        bg-[#EEF6FF]
        px-2.5
        py-1
        text-[7px]
        font-black
        uppercase
        text-[#0062CC]
      "
    >
      {children}
    </span>
  );
}


function SmallLabel({
  children,
}) {
  return (
    <div
      className="
        text-[8px]
        font-black
        uppercase
        tracking-[.14em]
        text-slate-400
      "
    >
      {children}
    </div>
  );
}


function Stat({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      <SmallLabel>
        {label}
      </SmallLabel>

      <div
        className="
          mt-2
          text-2xl
          font-black
          text-[#001F5C]
        "
      >
        {value}
      </div>
    </div>
  );
}


function Loading() {
  return (
    <div
      className="
        flex
        min-h-[260px]
        items-center
        justify-center
      "
    >
      <Loader2
        className="
          animate-spin
          text-[#0062CC]
        "
      />
    </div>
  );
}


function ErrorBox({
  children,
}) {
  return (
    <div
      className="
        rounded-xl
        bg-red-50
        p-4
        text-xs
        font-semibold
        text-red-600
      "
    >
      {children}
    </div>
  );
}