"use client";

import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { ServiceCard } from "./ServiceCard";

const SERVICES = [
  {
    title: "Immigráció és vízumügyintézés",
    description: "Vízum, tartózkodási engedély és relokáció teljes körű intézése.",
    image: "/services/service-1.jpg",
  },
  {
    title: "Toborzás és kiválasztás",
    description: "Fejvadászat, AI-alapú előszűrés, shortlist és interjúk lebonyolítása.",
    image: "/services/service-2.jpg",
  },
  {
    title: "Vállalati HR megoldások",
    description: "HR audit, onboarding, mobilitás és belső működés támogatása.",
    image: "/services/service-3.jpg",
  },
  {
    title: "Digitális és AI-alapú HR",
    description: "Job Fit Score, chatbot, videóinterjú és automatizált dokumentumkezelés.",
    image: "/services/service-4.jpg",
  },
  {
    title: "Tréningek és fejlesztések",
    description: "Vezetői és csapattréningek: kommunikáció, interjútechnika, onboarding.",
    image: "/services/service-5.jpg",
  },
  {
    title: "Employer branding és kommunikáció",
    description: "Tartalomgyártás, videós álláshirdetések és karrieroldal optimalizálás.",
    image: "/services/service-6.jpg",
  },
];

export default function ServicesSection() {
  return (
    <Container py={{ base: 14, md: 20 }}>
      <Heading as="h2" textAlign="center" fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 10, md: 14 }} fontWeight="700">
        Szolgáltatásaink
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, xl: 6 }} gap={{ base: 6, md: 8 }}>
        {SERVICES.map((s) => (
          <ServiceCard key={s.title} title={s.title} description={s.description} image={s.image} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
