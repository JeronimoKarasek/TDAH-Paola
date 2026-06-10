import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import TedhStory from "@/components/TedhStory";
import HowItWorks from "@/components/HowItWorks";
import AppFeatures from "@/components/AppFeatures";
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
      <Navbar tedhImageUrl={cfg.tedhImageUrl} social={cfg.social} />
      <Hero
        title={cfg.heroTitle}
        subtitle={cfg.heroSubtitle}
        tedhImageUrl={cfg.tedhImageUrl}
        social={cfg.social}
      />
      <Benefits />
      <TedhStory tedhImageUrl={cfg.tedhImageUrl} />
      <HowItWorks tedhImageUrl={cfg.tedhImageUrl} />
      <AppFeatures />
      <Pricing plans={cfg.plans} />
      <Testimonials />
      <CTA social={cfg.social} />
      <FAQ />
      <Footer tedhImageUrl={cfg.tedhImageUrl} social={cfg.social} />
    </main>
  );
}
