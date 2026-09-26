const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   PUBLIC AWARDS
========================================================= */

export async function getPublicAwards() {
  if (!API_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is missing."
    );
  }


  const response =
    await fetch(
      `${API_URL}/api/awards`,
      {
        method:
          "GET",

        headers: {
          Accept:
            "application/json",
        },

        cache:
          "no-store",
      }
    );


  let result =
    null;


  try {
    result =
      await response.json();
  } catch {
    result =
      null;
  }


  if (
    !response.ok ||
    !result?.success
  ) {
    throw new Error(
      result?.message ||
      "Failed to load awards."
    );
  }


  return Array.isArray(
    result.awards
  )
    ? result.awards
    : [];
}


/* =========================================================
   ADMIN - GET ALL
========================================================= */

export async function getAdminAwards() {
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

        headers: {
          Accept:
            "application/json",
        },

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
    !result?.success
  ) {
    throw new Error(
      result?.message ||
      "Failed to load awards."
    );
  }


  return Array.isArray(
    result.awards
  )
    ? result.awards
    : [];
}


/* =========================================================
   ADMIN - CREATE
========================================================= */

export async function createAward(
  payload
) {
  const response =
    await fetch(
      `${API_URL}/api/admin/awards`,
      {
        method:
          "POST",

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
      "Failed to create award."
    );
  }


  return result.award;
}


/* =========================================================
   ADMIN - UPDATE
========================================================= */

export async function updateAward(
  id,
  payload
) {
  const response =
    await fetch(
      `${API_URL}/api/admin/awards/${id}`,
      {
        method:
          "PUT",

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
      "Failed to update award."
    );
  }


  return result.award;
}


/* =========================================================
   ADMIN - DELETE
========================================================= */

export async function deleteAward(
  id
) {
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
      "Failed to delete award."
    );
  }


  return result;
}