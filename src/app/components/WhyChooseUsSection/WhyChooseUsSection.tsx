"use client";

import { Box, Container, SimpleGrid, Heading, Text, HStack, VStack, Badge } from "@chakra-ui/react";
import { IconCpu, IconUserCheck, IconHandClick, IconShieldCheck } from "@tabler/icons-react";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <HStack align="start" gap={4}>
      <Box rounded="full" bg="gray.100" p={3} lineHeight={0} shadow="sm" flexShrink={0}>
        {icon}
      </Box>
      <VStack align="start" gap={1}>
        <Heading as="h3" fontSize="lg" fontWeight="600">
          {title}
        </Heading>
        <Text fontSize="md" color="gray.700">
          {desc}
        </Text>
      </VStack>
    </HStack>
  );
}

export default function WhyChooseUsSection() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack gap={4} textAlign="center" mb={{ base: 10, md: 14 }}>
          <Heading as="h2" textAlign="center" fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 10, md: 14 }} fontWeight="700">
            Miért válassz minket?
          </Heading>
        </VStack>

        {/* Features */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 6, md: 10 }}>
          <Feature
            icon={<IconCpu size={26} />}
            title="Innováció a HR-ben"
            desc="AI-alapú toborzás, digitális onboarding, smart matching – gyorsabb, pontosabb kiválasztás kevesebb energiával."
          />
          <Feature
            icon={<IconCpu size={26} />}
            title="AI-alapú előszűrés"
            desc="Okos szűrés és rangsorolás a jelöltek kompetenciái és illeszkedése alapján."
          />
          <Feature icon={<IconUserCheck size={26} />} title="Smart matching" desc="Automatikus ajánlások a legjobb jelölt-pozíció párosításokra." />
          <Feature
            icon={<IconHandClick size={26} />}
            title="Digitális onboarding"
            desc="Szerződések, űrlapok, feladatok – minden egy helyen, papír nélkül."
          />
          <Feature
            icon={<IconShieldCheck size={26} />}
            title="Adatbiztonság & megfelelőség"
            desc="GDPR-kompatibilis folyamatok és szerepkör alapú hozzáférések."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
