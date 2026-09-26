import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import TrustStrip from "@/components/site/TrustStrip";
import Services from "@/components/site/Services";
import SignatureCare from "@/components/site/SignatureCare";

import {
  getServiceGroups,
} from "@/lib/getServices";

import WhyRapid from "@/components/site/WhyRapid";
import Awards from "@/components/site/Awards";
import Process from "@/components/site/Process";
import Locations from "@/components/site/Locations";
import People from "@/components/site/People";
import Reviews from "@/components/site/Reviews";
import Commercial from "@/components/site/Commercial";
import Gallery from "@/components/site/Gallery";
import BookingCTA from "@/components/site/BookingCTA";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

import CampaignPopup from "@/components/marketing/CampaignPopup";
import CampaignHeroSlot from "@/components/campaigns/CampaignHeroSlot";
import CampaignEngine from "@/components/campaigns/CampaignEngine";

import {
  getPublishedGallery,
} from "@/lib/getGallery";

import {
  getPublishedFaqs,
} from "@/lib/getFaqs";

import {
  getPublishedTrustStats,
} from "@/lib/getTrustStats";

import {
  getSection,
} from "@/lib/getSection";

import {
  getPublicAwards,
} from "@/lib/getAwards";


/* =========================================================
   HOMEPAGE METADATA
========================================================= */

export const metadata = {
  title:
    "Rapid Laundromat | Professional Laundry & Garment Care",

  description:
    "Rapid Laundromat provides professional laundry, dry cleaning, washing, ironing and garment care services in Sri Lanka.",

  alternates: {
    canonical:
      "https://rapidlaundromat.lk/",
  },

  openGraph: {
    title:
      "Rapid Laundromat | Professional Laundry & Garment Care",

    description:
      "Professional laundry, dry cleaning, washing, ironing and garment care services in Sri Lanka.",

    url:
      "https://rapidlaundromat.lk/",

    siteName:
      "Rapid Laundromat",

    type:
      "website",

    locale:
      "en_LK",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Rapid Laundromat | Professional Laundry & Garment Care",

    description:
      "Professional laundry, dry cleaning, washing, ironing and garment care services in Sri Lanka.",
  },
};


/* =========================================================
   PAGE
========================================================= */

export default async function Home() {
  const [
    hero,
    serviceGroups,
    trustStats,
    galleryItems,
    faqItems,
    awards,
  ] = await Promise.all([
    getSection(
      "hero"
    ),

    getServiceGroups(),

    getPublishedTrustStats(),

    getPublishedGallery(),

    getPublishedFaqs(),

    getPublicAwards(),
  ]);


  const {
    normalServices,
    signatureServices,
  } = serviceGroups;


  return (
    <>
      <Navbar />

      <CampaignPopup />

      <CampaignEngine />


      <main>

        <Hero
          data={
            hero
          }
        />


        <CampaignHeroSlot />


        <TrustStrip
          items={
            trustStats
          }
        />


        <Services
          data={{
            services:
              normalServices,
          }}
        />


        <SignatureCare
          data={{
            services:
              signatureServices,
          }}
        />


        <WhyRapid />


        <Awards
          data={{
            items:
              awards,
          }}
        />


        <Process />


        <Locations />


        <People />


        <Reviews />


        <Commercial />


        <Gallery
          data={{
            items:
              galleryItems,
          }}
        />


        <BookingCTA />


        <FAQ
          data={{
            items:
              faqItems,
          }}
        />


        <Contact />


        <Footer />

      </main>
    </>
  );
}