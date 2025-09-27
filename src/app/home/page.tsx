// app/page.tsx

import Hero from "../components/Home/Hero";
import ProductsSection from "../components/ProductsSection/ProductsSection";
import ServicesSection from "../components/ServiceSection/ServiceSection";
import TeamSection from "../components/TeamSection/TeamSection";
import WhyChooseUsSection from "../components/WhyChooseUsSection/WhyChooseUsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUsSection />
      <ServicesSection />
      <TeamSection />
      <ProductsSection />
      {/* rest of your sections... */}
    </>
  );
}
