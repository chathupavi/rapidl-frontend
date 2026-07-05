import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import ValuesBanner from "@/components/ValuesBanner";
import Trust from "@/components/Trust";
import Services from "@/components/Services";

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
      </main>
    </>
  );
}