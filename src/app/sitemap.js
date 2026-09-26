/* =========================================================
   RAPID LAUNDROMAT
   DYNAMIC SITEMAP
========================================================= */

const SITE_URL =
  "https://rapidlaundromat.lk";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";


/* =========================================================
   STATIC IMPORTANT PAGES
========================================================= */

const STATIC_PAGES = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly",
  },

  {
    path: "/services",
    priority: 0.9,
    changeFrequency: "weekly",
  },

  {
    path: "/locations",
    priority: 0.9,
    changeFrequency: "weekly",
  },

  {
    path: "/commercial",
    priority: 0.8,
    changeFrequency: "monthly",
  },

  {
    path: "/gallery",
    priority: 0.6,
    changeFrequency: "monthly",
  },

  {
    path: "/contact",
    priority: 0.6,
    changeFrequency: "monthly",
  },
];


/* =========================================================
   HELPERS
========================================================= */

function normalizePath(
  path
) {
  if (!path) {
    return "/";
  }

  if (
    path === "/"
  ) {
    return "/";
  }

  return path.startsWith("/")
    ? path
    : `/${path}`;
}


function buildUrl(
  path
) {
  const normalized =
    normalizePath(
      path
    );

  if (
    normalized === "/"
  ) {
    return SITE_URL;
  }

  return `${SITE_URL}${normalized}`;
}


function validDate(
  value
) {
  if (!value) {
    return new Date();
  }

  const date =
    new Date(
      value
    );

  return Number.isNaN(
    date.getTime()
  )
    ? new Date()
    : date;
}


/* =========================================================
   FETCH PUBLIC SEO PAGES
========================================================= */

async function fetchSeoPages() {
  try {
    const response =
      await fetch(
        `${API_URL}/api/seo/public/pages`,
        {
          next: {
            revalidate:
              3600,
          },
        }
      );


    if (
      !response.ok
    ) {
      console.error(
        "SEO sitemap API error:",
        response.status
      );

      return [];
    }


    const result =
      await response.json();


    return Array.isArray(
      result?.data?.pages
    )
      ? result.data.pages
      : [];

  } catch (
    error
  ) {
    console.error(
      "SEO sitemap fetch error:",
      error
    );

    return [];
  }
}


/* =========================================================
   FETCH BRANCHES
========================================================= */

async function fetchBranches() {
  try {
    /*
     * Replace this URL if your public
     * branches API has another route.
     */

    const response =
      await fetch(
        `${API_URL}/api/locations/branches`,
        {
          next: {
            revalidate:
              3600,
          },
        }
      );


    if (
      !response.ok
    ) {
      console.error(
        "Branch sitemap API error:",
        response.status
      );

      return [];
    }


    const result =
      await response.json();


    /*
     * Supports:
     *
     * { data: { branches: [] } }
     *
     * { data: [] }
     *
     * { branches: [] }
     */

    if (
      Array.isArray(
        result?.data?.branches
      )
    ) {
      return result.data.branches;
    }


    if (
      Array.isArray(
        result?.data
      )
    ) {
      return result.data;
    }


    if (
      Array.isArray(
        result?.branches
      )
    ) {
      return result.branches;
    }


    return [];

  } catch (
    error
  ) {
    console.error(
      "Branch sitemap fetch error:",
      error
    );

    return [];
  }
}


/* =========================================================
   SITEMAP
========================================================= */

export default async function sitemap() {
  const [
    seoPages,
    branches,
  ] =
    await Promise.all([
      fetchSeoPages(),
      fetchBranches(),
    ]);


  /* =======================================================
     STATIC URLS
  ======================================================= */

  const staticUrls =
    STATIC_PAGES.map(
      (
        page
      ) => ({
        url:
          buildUrl(
            page.path
          ),

        lastModified:
          new Date(),

        changeFrequency:
          page.changeFrequency,

        priority:
          page.priority,
      })
    );


  /* =======================================================
     FIRESTORE SEO URLS
  ======================================================= */

  const seoUrls =
    seoPages
      .filter(
        (
          page
        ) =>
          page &&
          page.seo?.index !==
            false &&
          page.sitemap?.include !==
            false &&
          page.path
      )
      .map(
        (
          page
        ) => ({
          url:
            page.seo
              ?.canonical ||
            buildUrl(
              page.path
            ),

          lastModified:
            validDate(
              page.updatedAt
            ),

          changeFrequency:
            page.sitemap
              ?.changeFrequency ||
            "weekly",

          priority:
            Number(
              page.sitemap
                ?.priority ??
              0.7
            ),
        })
      );


  /* =======================================================
     BRANCH URLS
  ======================================================= */

  const branchUrls =
    branches
      .filter(
        (
          branch
        ) =>
          branch &&
          branch.active !==
            false &&
          branch.slug
      )
      .map(
        (
          branch
        ) => ({
          url:
            `${SITE_URL}/locations/${branch.slug}`,

          lastModified:
            validDate(
              branch.updatedAt
            ),

          changeFrequency:
            "weekly",

          priority:
            0.9,
        })
      );


  /* =======================================================
     REMOVE DUPLICATES
  ======================================================= */

  const combined = [
    ...staticUrls,
    ...seoUrls,
    ...branchUrls,
  ];


  const unique =
    new Map();


  combined.forEach(
    (
      item
    ) => {
      if (
        !item?.url
      ) {
        return;
      }

      unique.set(
        item.url,
        item
      );
    }
  );


  return Array.from(
    unique.values()
  );
}