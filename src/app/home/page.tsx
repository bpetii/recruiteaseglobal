// app/page.tsx

import Testimonials from "@/components/Testimonials/Testimonials";
import Hero from "../../components/Home/Hero";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import ServicesSection from "../../components/ServiceSection/ServiceSection";
import TeamSection from "../../components/TeamSection/TeamSection";
import WhyChooseUsSection from "../../components/WhyChooseUsSection/WhyChooseUsSection";
import HireCTA from "@/components/HireCTA/HireCTA";
import StatsSection from "@/components/StatsSection/StatsSection";
import TestimonialSpotlight from "@/components/TestimonialSpotlight/TestimonialSpotlight";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <WhyChooseUsSection />
      <TestimonialSpotlight />
      <ServicesSection />
      <TeamSection />
{/*       <ProductsSection /> */}

      <HireCTA />
      {/* rest of your sections... */}
    </>
  );
}
