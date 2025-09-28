// app/page.tsx

import Testimonials from "@/components/Testimonials/Testimonials";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import ServicesSection from "../../components/ServiceSection/ServiceSection";
import TeamSection from "../../components/TeamSection/TeamSection";
import WhyChooseUsSection from "../../components/WhyChooseUsSection/WhyChooseUsSection";
import Hero2 from "@/components/Home/Hero2";

export default function HomePage() {
  return (
    <>
      <Hero2 />
      <WhyChooseUsSection />
      <ServicesSection />
      <TeamSection />
      <ProductsSection />
      <Testimonials />
      {/* rest of your sections... */}
    </>
  );
}
