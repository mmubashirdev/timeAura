import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";

import AboutHero from "@/components/features/about/AboutHero";
import OurStory from "@/components/features/about/OurStory";
import Differentiators from "@/components/features/about/Differentiators";
import Stats from "@/components/features/about/Stats";
import HowItWorks from "@/components/features/about/HowItWorks";
import AboutTestimonials from "@/components/features/about/AboutTestimonials";
import CtaBanner from "@/components/features/about/CtaBanner";

export const metadata = {
  title: "About Us — Time Aura",
  description:
    "Time Aura is a curated marketplace connecting you with authentic premium products from trusted brands and verified sellers.",
};

export default function AboutPage() {
  return (
    <main className="w-full bg-[#FAFAFA] text-neutral-900 overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />
      <AboutHero />
      <OurStory />
      <Differentiators />
      <Stats />
      <HowItWorks />
      <AboutTestimonials />
      <CtaBanner />
      <Footer />
    </main>
  );
}
