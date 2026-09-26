const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


/* =========================================================
   GET PUBLISHED GALLERY
========================================================= */

export async function getPublishedGallery() {
  try {
    if (!API_URL) {
      console.error(
        "NEXT_PUBLIC_API_URL is missing"
      );

      return [];
    }


    const response =
      await fetch(
        `${API_URL}/api/gallery/published`,
        {
          next: {
            revalidate: 60,
          },
        }
      );


    if (!response.ok) {
      console.error(
        "Gallery request failed:",
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
      "getPublishedGallery:",
      error
    );


    return [];
  }
}