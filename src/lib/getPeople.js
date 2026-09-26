const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL;


/* =========================================================
   GET BRANCHES
========================================================= */

export async function getPeopleBranches() {
  try {
    if (
      !API_URL
    ) {
      console.error(
        "NEXT_PUBLIC_API_URL is missing"
      );

      return [];
    }


    const response =
      await fetch(
        `${API_URL}/api/people/branches`,
        {
          next: {
            revalidate:
              60,
          },
        }
      );


    if (
      !response.ok
    ) {
      console.error(
        "Branches request failed:",
        response.status
      );

      return [];
    }


    const result =
      await response.json();


    if (
      !result.success ||
      !Array.isArray(
        result.branches
      )
    ) {
      return [];
    }


    return result.branches;
  } catch (error) {
    console.error(
      "getPeopleBranches:",
      error
    );

    return [];
  }
}


/* =========================================================
   GET MANAGERS
========================================================= */

export async function getBranchManagers() {
  try {
    if (
      !API_URL
    ) {
      console.error(
        "NEXT_PUBLIC_API_URL is missing"
      );

      return [];
    }


    const response =
      await fetch(
        `${API_URL}/api/people/managers`,
        {
          next: {
            revalidate:
              60,
          },
        }
      );


    if (
      !response.ok
    ) {
      console.error(
        "Managers request failed:",
        response.status
      );

      return [];
    }


    const result =
      await response.json();


    if (
      !result.success ||
      !Array.isArray(
        result.managers
      )
    ) {
      return [];
    }


    return result.managers;
  } catch (error) {
    console.error(
      "getBranchManagers:",
      error
    );

    return [];
  }
}