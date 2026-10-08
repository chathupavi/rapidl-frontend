/* =============================================================================
   RAPID LAUNDROMAT — HIGH-PERFORMANCE SEARCH ENGINE SITEMAP ENGINE
   Target: Next.js App Router (app/sitemap.js)
   Pattern: Single-Page Architecture + High-Value Dynamic Local Hubs
============================================================================= */

import { MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://rapidlaundromat.lk"
).replace(/\/+$/, "");

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

// Baseline date for static core pages (updates upon build/deploy)
const SYSTEM_DEPLOY_TIMESTAMP = new Date("2026-03-01T00:00:00.000Z");

/* =============================================================================
   DATA FETCHING WITH CIRCUIT BREAKERS & TIMEOUTS
============================================================================= */

async function fetchWithTimeout(endpoint, timeoutMs = 4500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Stale-While-Revalidate: 1 hour edge cache
      headers: {
        Accept: "application/json",
        "User-Agent": "RapidLaundromat-SitemapEngine/2.0",
      },
    });
    clearTimeout(id);

    if (!res.ok) {
      console.warn(`[Sitemap] Endpoint ${endpoint} returned status: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    console.error(`[Sitemap Error] Request failed for ${endpoint}:`, err.message);
    return null;
  }
}

async function getSeoEntities() {
  const payload = await fetchWithTimeout("/api/seo/public/pages");
  return Array.isArray(payload?.data?.pages) ? payload.data.pages : [];
}

async function getBranchLocations() {
  const payload = await fetchWithTimeout("/api/locations/branches");
  if (Array.isArray(payload?.data?.branches)) return payload.data.branches;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.branches)) return payload.branches;
  return [];
}

/* =============================================================================
   HELPERS & SANITIZATION
============================================================================= */

function parseIsoDate(val, fallback = SYSTEM_DEPLOY_TIMESTAMP) {
  if (!val) return fallback;
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

function cleanSlug(slug) {
  if (!slug || typeof slug !== "string") return "";
  return slug
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9-_]/g, ""); // Clean URL injection safety
}

/* =============================================================================
   SITEMAP EXPORT
============================================================================= */

/**
 * @returns {Promise<MetadataRoute.Sitemap>}
 */
export default async function sitemap() {
  const [seoPages, branches] = await Promise.all([
    getSeoEntities(),
    getBranchLocations(),
  ]);

  // 1. Process active branch landing pages (/locations/[slug])
  const validBranches = branches.filter(
    (b) => b && b.active !== false && Boolean(b.slug)
  );

  const branchEntries = validBranches.map((branch) => {
    const slug = cleanSlug(branch.slug);
    const lastmod = parseIsoDate(branch.updatedAt || branch.modifiedAt);

    return {
      url: `${SITE_URL}/locations/${slug}`,
      lastModified: lastmod,
      changeFrequency: "weekly",
      priority: 0.9, // Local landing pages are primary conversion vectors
    };
  });

  // Calculate homepage lastModified dynamically based on latest branch update
  let latestBranchUpdate = SYSTEM_DEPLOY_TIMESTAMP;
  for (const entry of branchEntries) {
    if (entry.lastModified > latestBranchUpdate) {
      latestBranchUpdate = entry.lastModified;
    }
  }

  // 2. Core Indexable Routes (Single Page Architecture)
  // Sub-sections (#commercial, #services, #contact) MUST remain mapped to "/"
  const coreEntries = [
    {
      url: SITE_URL,
      lastModified: latestBranchUpdate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/locations`,
      lastModified: latestBranchUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 3. Dynamic standalone CMS pages (e.g., Blog, Terms, Privacy)
  // Explicitly filter out hash anchors, draft pages, or noindex directives
  const cmsEntries = seoPages
    .filter((page) => {
      if (!page || !page.path) return false;
      const path = String(page.path).trim();
      const isAnchor = path.includes("#");
      const isExplicitNoIndex =
        page.seo?.index === false ||
        page.seo?.noindex === true ||
        page.sitemap?.include === false;

      return !isAnchor && !isExplicitNoIndex;
    })
    .map((page) => {
      const cleanPath = "/" + page.path.replace(/^\/+|\/+$/g, "");
      const canonical = page.seo?.canonical?.startsWith(SITE_URL)
        ? page.seo.canonical
        : `${SITE_URL}${cleanPath}`;

      return {
        url: canonical,
        lastModified: parseIsoDate(page.updatedAt || page.publishedAt),
        changeFrequency: page.sitemap?.changeFrequency || "monthly",
        priority: Math.min(Math.max(Number(page.sitemap?.priority ?? 0.6), 0.1), 0.8),
      };
    });

  // 4. Enterprise Deduplication via Canonical URL Map
  const urlRegistry = new Map();

  [...coreEntries, ...branchEntries, ...cmsEntries].forEach((item) => {
    if (item?.url) {
      const normalizedUrl = item.url.replace(/\/+$/, ""); // Consistent trailing slash handling
      if (!urlRegistry.has(normalizedUrl)) {
        urlRegistry.set(normalizedUrl, {
          ...item,
          url: normalizedUrl === SITE_URL ? `${SITE_URL}/` : normalizedUrl,
        });
      }
    }
  });

  return Array.from(urlRegistry.values());
}