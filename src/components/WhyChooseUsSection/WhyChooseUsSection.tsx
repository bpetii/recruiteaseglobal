"use client";

import { Box, Container, Grid, GridItem, Heading, Text, HStack, VStack, Badge, Image } from "@chakra-ui/react";
import { IconCpu, IconUserCheck, IconHandClick, IconShieldCheck, IconSparkles } from "@tabler/icons-react";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <HStack align="start" gap={4}>
      {/* star-like accent */}
      <Badge rounded="full" px="1.5" py="1" bg="purple.50" color="purple.600" border="1px solid" borderColor="purple.100" mt="1" flexShrink={0}>
        <IconSparkles size={16} />
      </Badge>

      <VStack align="start" gap={1}>
        <HStack gap={2}>
          <Heading as="h3" fontSize="xl" fontWeight="700">
            {title}
          </Heading>
        </HStack>
        <Text fontSize="md" color="blackAlpha.700">
          {desc}
        </Text>
      </VStack>
    </HStack>
  );
}

export default function WhyChooseUsSection() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }} bg="gray.50">
      <Container maxW="7xl" px={0}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="center"
          bg="white"
          rounded={{ base: "2xl", md: "3xl" }}
          p={{ base: 6, md: 10 }}
          boxShadow="0 10px 30px rgba(0,0,0,.06)"
        >
          {/* LEFT: heading + features */}
          <GridItem>
            <VStack align="start" gap={{ base: 8, md: 10 }}>
              <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" letterSpacing="-0.02em" lineHeight="1.1">
                Miért válassz minket?
              </Heading>

              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 6, md: 8 }}>
                <Feature
                  icon={<IconCpu size={22} />}
                  title="Innováció a HR-ben"
                  desc="AI-alapú toborzás, digitális onboarding, smart matching – gyorsabb, pontosabb kiválasztás kevesebb energiával."
                />
                <Feature
                  icon={<IconCpu size={22} />}
                  title="AI-alapú előszűrés"
                  desc="Okos szűrés és rangsorolás a jelöltek kompetenciái és illeszkedése alapján."
                />
                <Feature
                  icon={<IconUserCheck size={22} />}
                  title="Smart matching"
                  desc="Automatikus ajánlások a legjobb jelölt-pozíció párosításokra."
                />
                <Feature
                  icon={<IconHandClick size={22} />}
                  title="Digitális onboarding"
                  desc="Szerződések, űrlapok, feladatok – minden egy helyen, papír nélkül."
                />
                <Feature
                  icon={<IconShieldCheck size={22} />}
                  title="Adatbiztonság & megfelelőség"
                  desc="GDPR-kompatibilis folyamatok és szerepkör alapú hozzáférések."
                />
              </Grid>
            </VStack>
          </GridItem>

          {/* RIGHT: rounded image panel */}
          <GridItem>
            <Box position="relative" rounded={{ base: "xl", md: "3xl" }} overflow="hidden">
              <Image
                alt="Happy team"
                src="/happy-team.jpg" // <- replace with your asset
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
