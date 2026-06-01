import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Tracker from "@/components/Tracker";
import { getConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

export default function Home() {
  const cfg = getConfig();
  return (
    <main className="overflow-x-hidden">
      <Tracker />
      <Navbar />
      <Hero title={cfg.heroTitle} subtitle={cfg.heroSubtitle} />
      <Benefits />
      <HowItWorks />
      <Pricing plans={cfg.plans} />
      <Testimonials />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
