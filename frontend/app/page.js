import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Hero from "@/components/features/landing/Hero";
import PerfumeSpotlight from "@/components/features/landing/PerfumeSpotlight";
import Categories from "@/components/features/landing/Categories";
import BestSellers from "@/components/features/landing/BestSellers";
import Testimonials from "@/components/features/landing/Testimonials";
import PerksBanner from "@/components/features/landing/PerksBanner";
import Footer from "@/components/features/landing/Footer";

export const metadata = {
  title: "Time Aura — SHOP PREMIUM. SHOP SMART. Moments, Made for You",
  description:
    "Premium watches, wallets, and perfumes — where sophistication meets timeless style.",
};

export default function HomePage() {
  return (
    <main className="w-full bg-[#FAFAFA] text-neutral-900 overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <PerfumeSpotlight />
      <Categories />
      <BestSellers />
      <Testimonials />
      <PerksBanner />
      <Footer />
    </main>
  );
}
