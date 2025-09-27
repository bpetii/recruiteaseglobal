"use client";

import { Box, Container, SimpleGrid, Heading, Text, VStack, HStack, Image, Badge } from "@chakra-ui/react";
import { IconTarget, IconUsersGroup, IconShieldCheck } from "@tabler/icons-react";

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <VStack gap={1} textAlign="center">
      <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700">
        {value}
      </Text>
      <Text color="gray.700">{label}</Text>
    </VStack>
  );
}

export default function AboutUsSection() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack gap={4} textAlign="center" mb={{ base: 10, md: 14 }}>
          <Heading as="h2" textAlign="center" fontSize={{ base: "3xl", md: "4xl" }} mb={{ base: 10, md: 14 }} fontWeight="600">
            Rólunk
          </Heading>
          <Heading as="h2" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700">
            RecruitEase Global – emberek, akik összekötnek
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} color="gray.700" maxW="3xl">
            Nemzetközi fejvadász és HR csapat vagyunk. AI-alapú toborzás, digitális onboarding és adatvezérelt döntések: gyorsabb, pontosabb
            kiválasztás kevesebb energiával.
          </Text>
        </VStack>

        {/* Intro + Image */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }} alignItems="center">
          <Box rounded="lg" overflow="hidden" shadow="sm" bg="gray.100">
            <Image
              src="/images/about/team-work.jpg" // <- replace with your image
              alt="Our team"
              w="100%"
              h={{ base: "260px", md: "420px" }}
              objectFit="cover"
            />
          </Box>

          <VStack align="start" gap={5}>
            <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="600">
              Mi a küldetésünk?
            </Heading>
            <Text color="gray.700" fontSize={{ base: "md", md: "lg" }}>
              A tehetségeket és a vállalatokat közelebb hozzuk egymáshoz. Fókuszunk a minőségen, az átlátható folyamatokon és a jelöltélményen van – a
              vízumügyintézéstől az onboardingig.
            </Text>

            <VStack align="start" gap={4} w="full">
              <HStack align="start" gap={4}>
                <Box rounded="full" bg="gray.100" p={3} shadow="sm" lineHeight={0}>
                  <IconTarget size={22} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="600">Eredményorientált</Text>
                  <Text color="gray.700">Mérhető KPI-k: time-to-hire, quality-of-hire, retention.</Text>
                </VStack>
              </HStack>

              <HStack align="start" gap={4}>
                <Box rounded="full" bg="gray.100" p={3} shadow="sm" lineHeight={0}>
                  <IconUsersGroup size={22} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="600">Jelöltközpontú</Text>
                  <Text color="gray.700">Tiszta kommunikáció, gyors visszajelzés, korrekt folyamat.</Text>
                </VStack>
              </HStack>

              <HStack align="start" gap={4}>
                <Box rounded="full" bg="gray.100" p={3} shadow="sm" lineHeight={0}>
                  <IconShieldCheck size={22} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="600">Biztonság & megfelelőség</Text>
                  <Text color="gray.700">GDPR, adatvédelem, auditált eljárások.</Text>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>

        {/* Stats (custom, no Stat components) */}
        <Box mt={{ base: 12, md: 16 }}>
          <Box h="1px" bg="gray.200" mb={{ base: 8, md: 10 }} mx="auto" w="full" />
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 6, md: 8 }}>
            <StatItem value="300+" label="Sikeres elhelyezés" />
            <StatItem value="25" label="Kezelt ország" />
            <StatItem value="4.9/5" label="Ügyfél-elégedettség" />
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
