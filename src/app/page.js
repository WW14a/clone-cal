"use client";
import Hero from "@/components/hero";
import Nav from "../components/navbar";
import ProductShowcase from "@/components/productShowCase";
import CompanyLogos from "@/components/companyLogos";
import ScheduleSection from "@/components/scheduleSection";
import CalAiSection from "@/components/calAiSection";
import CalAiWindow from "@/components/calAiWindow";
import FeaturesGridSection from "@/components/featuresGridSection";
import AppStoreSection from "@/components/appStoreSection";
import AgentsSection from "@/components/agentsSection";
import CustomersSection from "@/components/cutomerSection";
import TestimonialSection from "@/components/testimonialSection";
import EventsSection from "@/components/eventSection";
import EnterpriseSection from "@/components/enterpriseSection";
import FaqSection from "@/components/faqSection";
import CtaSection from "@/components/ctaSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />
      <ProductShowcase />
      <CompanyLogos />
      <ScheduleSection />
      <CalAiSection />
      <CalAiWindow />
      <FeaturesGridSection />
      <AppStoreSection />
      <AgentsSection />
      <CustomersSection />
      <TestimonialSection />
      <EventsSection />
      <EnterpriseSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
