import "./globals.css";
import "leaflet/dist/leaflet.css";

import { Barlow, Barlow_Condensed } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

/* =========================================================
   SITE CONSTANTS & SECURE SERVER API URL
========================================================= */

const SITE_URL = "https://rapidlaundromat.lk";
const SITE_NAME = "Rapid Laundromat";

// Prioritizes private server API URL; falls back to public if not defined
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

/* =========================================================
   FONTS
========================================================= */

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

/* =========================================================
   STATIC METADATA (SERP OPTIMIZED)
========================================================= */

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Rapid Laundromat | Laundry & Garment Care Sri Lanka",
    template: "%s | Rapid Laundromat",
  },

  description:
    "Professional laundry, dry cleaning, and ironing services across Sri Lanka. Fast, affordable personal and commercial garment care.",

  applicationName: SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  // Relative canonical prevents child pages from defaulting to the root URL
  alternates: {
    canonical: "./",
  },

  openGraph: {
    title: "Rapid Laundromat | Premium Laundry & Garment Care Sri Lanka",
    description:
      "Professional laundry, dry cleaning, and garment care services across Sri Lanka.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Rapid Laundromat - Premium Laundry and Garment Care Sri Lanka",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rapid Laundromat | Premium Laundry Care Sri Lanka",
    description:
      "Professional laundry, dry cleaning, and commercial garment care across Sri Lanka.",
    images: ["/images/og-cover.jpg"],
  },

  category: "Laundry Service",
};

/* =========================================================
   SECURE SERVER-SIDE DATA FETCHING (FOR DYNAMIC SCHEMA)
========================================================= */

async function getBranchesForSchema() {
  if (!API_URL) return [];

  try {
    const res = await fetch(`${API_URL}/api/people/branches`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });

    if (!res.ok) return [];

    const result = await res.json();
    return Array.isArray(result?.branches)
      ? result.branches.filter((b) => b && b.active !== false)
      : [];
  } catch (err) {
    console.error("Schema branch fetch error:", err);
    return [];
  }
}

/* =========================================================
   SCHEMA GRAPH GENERATOR
========================================================= */

function buildJsonLdGraph(branches) {
  // Map dynamic branches into Schema.org format
  const branchSchemas = branches.map((branch) => {
    const slug = branch.slug || branch.id;
    const branchUrl = `${SITE_URL}/locations/${slug}`;

    return {
      "@type": "DryCleaningOrLaundry",
      "@id": `${branchUrl}#business`,
      name: `Rapid Laundromat - ${branch.name}`,
      url: branchUrl,
      telephone: branch.phone || undefined,
      email: branch.email || undefined,
      priceRange: "$$",
      currenciesAccepted: "LKR",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.address || "",
        addressLocality: branch.district || "",
        addressRegion: branch.province || "",
        addressCountry: "LK",
      },
      ...(branch.latitude && branch.longitude
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: Number(branch.latitude),
              longitude: Number(branch.longitude),
            },
          }
        : {}),
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}`,
        name: SITE_NAME,
        alternateName: ["Rapid", "Rapid Laundromat Sri Lanka"],
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-LK",
      },
      {
        "@type": "DryCleaningOrLaundry",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Rapid Laundromat",
        url: `${SITE_URL}`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/images/og-cover.jpg`,
        priceRange: "$$",
        currenciesAccepted: "LKR",
        paymentAccepted: "Cash, Credit Card, Bank Transfer",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Sri Lanka" },
        ],
        // Service Catalog (Signals offerings that exist as homepage sections)
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Laundry & Garment Care Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Dry Cleaning",
                description:
                  "Professional delicate fabric, designer wear, and suit dry cleaning.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Laundry",
                description:
                  "Bulk linen, hotel, restaurant, and corporate laundering contracts.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Wash & Fold",
                description:
                  "Everyday laundry wash, dry, and clean fold solutions.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Steam Pressing & Ironing",
                description:
                  "High-pressure steam pressing and wrinkle removal.",
              },
            },
          ],
        },
        // Attaches all active branches dynamically
        subOrganization: branchSchemas,
      },
    ],
  };
}

/* =========================================================
   ROOT LAYOUT (ASYNC SERVER COMPONENT)
========================================================= */

export default async function RootLayout({ children }) {
  const branches = await getBranchesForSchema();
  const jsonLdGraph = buildJsonLdGraph(branches);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en-LK" data-scroll-behavior="smooth">
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
      >
        {/* Instant server-rendered JSON-LD schema for Googlebot */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
        />

        {children}

        {/* Optimized GA4 via official Next.js third-party package */}
        {measurementId && <GoogleAnalytics gaId={measurementId} />}
      </body>
    </html>
  );
}