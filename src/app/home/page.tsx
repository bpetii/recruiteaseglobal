// app/page.tsx

import Testimonials from "@/components/Testimonials/Testimonials";
import Hero from "../../components/Home/Hero";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import ServicesSection from "../../components/ServiceSection/ServiceSection";
import TeamSection from "../../components/TeamSection/TeamSection";
import WhyChooseUsSection from "../../components/WhyChooseUsSection/WhyChooseUsSection";
import HireCTA from "@/components/HireCTA/HireCTA";
import StatsSection from "@/components/StatsSection/StatsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUsSection />
      <StatsSection />
      <ServicesSection />
      <TeamSection />
      <ProductsSection />
      <Testimonials />
      <HireCTA />
      {/* rest of your sections... */}
    </>
  );
}
