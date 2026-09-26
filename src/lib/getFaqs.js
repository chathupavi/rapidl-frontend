const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   GET PUBLISHED FAQS
========================================================= */

export async function getPublishedFaqs() {
  try {
    if (!API_URL) {
      console.error(
        "NEXT_PUBLIC_API_URL is missing"
      );

      return [];
    }


    const response =
      await fetch(
        `${API_URL}/api/faqs/published`,
        {
          next: {
            revalidate: 60,
          },
        }
      );


    if (!response.ok) {
      console.error(
        "FAQ request failed:",
        response.status,
        response.statusText
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
      "getPublishedFaqs error:",
      error
    );

    return [];
  }
}