/* =========================================================
   GET PUBLISHED SERVICES
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


export async function getPublishedServices() {
  try {
    if (!API_URL) {
      console.error(
        "NEXT_PUBLIC_API_URL is missing"
      );

      return [];
    }


    const response =
      await fetch(
        `${API_URL}/api/services/published`,
        {
          next: {
            revalidate: 60,
          },
        }
      );


    if (!response.ok) {
      console.error(
        "Published services request failed:",
        response.status,
        response.statusText
      );

      return [];
    }


    const result =
      await response.json();


    if (
      !result.success ||
      !Array.isArray(result.services)
    ) {
      return [];
    }


    return result.services
      .filter(
        (service) =>
          service.published === true
      )
      .sort(
        (a, b) =>
          Number(a.order ?? 999) -
          Number(b.order ?? 999)
      );
  } catch (error) {
    console.error(
      "getPublishedServices error:",
      error
    );

    return [];
  }
}


/* =========================================================
   GET SERVICE GROUPS
========================================================= */

export async function getServiceGroups() {
  const services =
    await getPublishedServices();


  const normalServices =
    services.filter(
      (service) =>
        service.serviceType ===
        "normal"
    );


  const signatureServices =
    services.filter(
      (service) =>
        service.serviceType ===
        "signature"
    );


  return {
    normalServices,
    signatureServices,
  };
}


/* =========================================================
   OPTIONAL INDIVIDUAL HELPERS
========================================================= */

export async function getNormalServices() {
  const {
    normalServices,
  } =
    await getServiceGroups();

  return normalServices;
}


export async function getSignatureServices() {
  const {
    signatureServices,
  } =
    await getServiceGroups();

  return signatureServices;
}