import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import ValuesBanner from "@/components/ValuesBanner";
import Trust from "@/components/Trust";
import Services from "@/components/Services";
import Signature from "@/components/Signature";
import Why from "@/components/Why";
import Commercial from "@/components/Commercial";
import Booking from "@/components/Booking";
import Tech from "@/components/Tech";
import Founder from "@/components/Founder";
import Gallery from "@/components/Gallery";
import Values from "@/components/Values";
import Reviews from "@/components/Reviews";
import Locations from "@/components/Locations";
import Vision from "@/components/Vision";
import SeoPages from "@/components/SeoPages";
import Delivery from "@/components/Delivery";
import Faq from "@/components/Faq";
import Social from "@/components/Social";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getSection } from "@/lib/getSection";

export default async  function Home() {
  const hero = await getSection("hero"); 
  const statsStrip = await getSection("stats-strip"); 
  const valuesBanner = await getSection("values-banner"); 
  const trust = await getSection("trust"); 
  const services = await getSection("services"); 
  return (
    <>
      <Navbar />
      <main>
        <Hero data={hero} />
        <StatsStrip data={statsStrip} />
        <ValuesBanner data={valuesBanner}/>
        <Trust data={trust} />
        <Services data={services} />
        <Signature />
        <Why />
        <Commercial />
        <Booking />
        <Tech />
        <Founder />
        <Gallery />
        <Values />
        <Reviews />
        <Locations />
        <Vision />
        <SeoPages />
        <Delivery />
        <Faq />
        <Social />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}