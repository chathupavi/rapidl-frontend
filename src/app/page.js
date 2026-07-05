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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <ValuesBanner />
        <Trust />
        <Services />
        <Signature />
        <Why />
        <Commercial />
        <Booking />
      </main>
    </>
  );
}