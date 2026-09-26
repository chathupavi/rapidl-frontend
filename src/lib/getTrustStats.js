const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   GET PUBLISHED VALUE STRIP
========================================================= */

export async function getPublishedTrustStats() {
  try {
    if (!API_URL) {
      console.error(
        "NEXT_PUBLIC_API_URL is missing"
      );

      return [];
    }


    const response =
      await fetch(
        `${API_URL}/api/trust-stats/published`,
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
        "Value Strip request failed:",
        response.status
      );

      return [];
    }


    const result =
      await response.json();


    if (
      !result.success ||
      !Array.isArray(
        result.items
      )
    ) {
      return [];
    }


    return result.items;
  } catch (error) {
    console.error(
      "getPublishedTrustStats:",
      error
    );

    return [];
  }
}