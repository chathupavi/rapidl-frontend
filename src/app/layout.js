import "./globals.css";
import "leaflet/dist/leaflet.css";

import Script from "next/script";

import {
  Barlow,
  Barlow_Condensed,
} from "next/font/google";


/* =========================================================
   SITE
========================================================= */

const SITE_URL =
  "https://rapidlaundromat.lk";

const SITE_NAME =
  "Rapid Laundromat";


/* =========================================================
   FONTS
========================================================= */

const barlow =
  Barlow({
    subsets: [
      "latin",
    ],

    weight: [
      "300",
      "400",
      "500",
      "600",
      "700",
    ],

    variable:
      "--font-barlow",

    display:
      "swap",
  });


const barlowCondensed =
  Barlow_Condensed({
    subsets: [
      "latin",
    ],

    weight: [
      "400",
      "600",
      "700",
      "800",
      "900",
    ],

    variable:
      "--font-barlow-condensed",

    display:
      "swap",
  });


/* =========================================================
   METADATA
========================================================= */

export const metadata = {
  metadataBase:
    new URL(
      SITE_URL
    ),

  title: {
    default:
      "Rapid Laundromat | Premium Laundry & Garment Care in Sri Lanka",

    template:
      "%s | Rapid Laundromat",
  },

  description:
    "Premium laundry, dry cleaning, ironing and garment care services in Sri Lanka. Visit Rapid Laundromat in Kurunegala and Kandy for professional personal and commercial laundry care.",

  applicationName:
    SITE_NAME,

  authors: [
    {
      name:
        SITE_NAME,

      url:
        SITE_URL,
    },
  ],

  creator:
    SITE_NAME,

  publisher:
    SITE_NAME,


  /* =======================================================
     ROBOTS
  ======================================================= */

  robots: {
    index:
      true,

    follow:
      true,

    googleBot: {
      index:
        true,

      follow:
        true,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },


  /* =======================================================
     ICONS
  ======================================================= */

  icons: {
    icon: [
      {
        url:
          "/favicon.ico",

        sizes:
          "any",
      },

      {
        url:
          "/icon.png",

        type:
          "image/png",

        sizes:
          "48x48",
      },

      {
        url:
          "/icon-192.png",

        type:
          "image/png",

        sizes:
          "192x192",
      },

      {
        url:
          "/icon-512.png",

        type:
          "image/png",

        sizes:
          "512x512",
      },
    ],

    shortcut: [
      {
        url:
          "/favicon.ico",
      },
    ],

    apple: [
      {
        url:
          "/apple-icon.png",

        sizes:
          "180x180",

        type:
          "image/png",
      },
    ],
  },


  /* =======================================================
     CANONICAL
  ======================================================= */

  alternates: {
    canonical:
      "/",
  },


  /* =======================================================
     OPEN GRAPH
  ======================================================= */

  openGraph: {
    title:
      "Rapid Laundromat | Premium Laundry & Garment Care in Sri Lanka",

    description:
      "Premium laundry, dry cleaning and garment care services across Sri Lanka, with professional personal and commercial laundry solutions.",

    url:
      SITE_URL,

    siteName:
      SITE_NAME,

    locale:
      "en_LK",

    type:
      "website",

    images: [
      {
        url:
          "/images/og-cover.jpg",

        width:
          1200,

        height:
          630,

        alt:
          "Rapid Laundromat - Premium Laundry and Garment Care",
      },
    ],
  },


  /* =======================================================
     TWITTER
  ======================================================= */

  twitter: {
    card:
      "summary_large_image",

    title:
      "Rapid Laundromat | Premium Laundry & Garment Care in Sri Lanka",

    description:
      "Premium laundry, dry cleaning and garment care services across Sri Lanka.",

    images: [
      "/images/og-cover.jpg",
    ],
  },

  category:
    "Laundry Service",
};


/* =========================================================
   ORGANIZATION STRUCTURED DATA
========================================================= */

const organizationSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "Organization",

  "@id":
    `${SITE_URL}/#organization`,

  name:
    SITE_NAME,

  alternateName:
    "Rapid",

  url:
    `${SITE_URL}/`,

  logo: {
    "@type":
      "ImageObject",

    url:
      `${SITE_URL}/icon-512.png`,

    width:
      512,

    height:
      512,
  },

  sameAs: [
    // Add official social links when ready
    // "https://www.facebook.com/...",
    // "https://www.instagram.com/...",
  ],
};


/* =========================================================
   WEBSITE STRUCTURED DATA
========================================================= */

const websiteSchema = {
  "@context":
    "https://schema.org",

  "@type":
    "WebSite",

  "@id":
    `${SITE_URL}/#website`,

  url:
    `${SITE_URL}/`,

  name:
    SITE_NAME,

  alternateName: [
    "Rapid",
    "Rapid Laundromat Sri Lanka",
  ],

  publisher: {
    "@id":
      `${SITE_URL}/#organization`,
  },

  inLanguage:
    "en-LK",
};


/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}) {
  const measurementId =
    process.env
      .NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en-LK"
      data-scroll-behavior="smooth"
    >
      <body
        className={`
          ${barlow.variable}
          ${barlowCondensed.variable}
        `}
      >

        {/* =================================================
            ORGANIZATION SCHEMA
        ================================================= */}

        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                organizationSchema
              ),
          }}
        />


        {/* =================================================
            WEBSITE SCHEMA
        ================================================= */}

        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                websiteSchema
              ),
          }}
        />


        {/* =================================================
            APPLICATION
        ================================================= */}

        {children}


        {/* =================================================
            GOOGLE ANALYTICS
        ================================================= */}

        {measurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
              strategy="afterInteractive"
            />

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer =
                  window.dataLayer || [];

                function gtag() {
                  window.dataLayer.push(
                    arguments
                  );
                }

                gtag(
                  'js',
                  new Date()
                );

                gtag(
                  'config',
                  '${measurementId}',
                  {
                    send_page_view: true
                  }
                );
              `}
            </Script>
          </>
        )}

      </body>
    </html>
  );
}