import AnnouncementBar from "@/components/features/landing/AnnouncementBar";
import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";

import ContactHero from "@/components/features/contact/ContactHero";
import ContactInfoCards from "@/components/features/contact/ContactInfoCards";
import ContactForm from "@/components/features/contact/ContactForm";
import LocationMap from "@/components/features/contact/LocationMap";
import ContactFAQ from "@/components/features/contact/ContactFAQ";
import NewsletterCTA from "@/components/features/contact/NewsletterCTA";

export const metadata = {
  title: "Contact Us — Time Aura",
  description:
    "Get in touch with the Time Aura team — questions, order support, or feedback, we're here to help.",
};

export default function ContactPage() {
  return (
    <main className="w-full bg-[#FAFAFA] text-neutral-900 overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />
      <ContactHero />
      <ContactInfoCards />

      <section className="w-full bg-[#FAFAFA] py-4 lg:py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContactForm />
          <LocationMap />
        </div>
      </section>

      <ContactFAQ />
      <NewsletterCTA />
      <Footer />
    </main>
  );
}
