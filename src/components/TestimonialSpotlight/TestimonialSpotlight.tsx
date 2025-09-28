"use client";

import { Box, Container, Grid, GridItem, Heading, Text, HStack, IconButton, Image, VStack } from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

type Spotlight = {
  name: string;
  role: string;
  company: string;
  quote: string;
  photo: string;
};

const DATA: Spotlight[] = [
  {
    name: "Maya Lin",
    role: "VP of People",
    company: "SeedFlow",
    quote: "We’ve hired faster and smarter since switching — it’s like having a recruiter built into our hiring process.",
    photo: "/testimonials/person-1.jpg",
  },
  {
    name: "Daniel Smith",
    role: "Head of Talent",
    company: "Nexora",
    quote: "Shortlists went from weeks to days. Clear comms, pre-vetted intros, just results.",
    photo: "/testimonials/person-2.jpg",
  },
  {
    name: "Anna Kovács",
    role: "HR Director",
    company: "UrbanIQ",
    quote: "Pontosan olyan jelölteket kaptunk, akik illenek a csapatunkhoz. Gyors és átlátható folyamat.",
    photo: "/testimonials/person-3.jpg",
  },
];

export default function TestimonialSpotlight() {
  const [index, setIndex] = useState(0);
  const total = DATA.length;
  const t = DATA[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <Box as="section" bg="gray.50">
      <Container maxW="6xl">
        <VStack gap={10} textAlign="center">
          {/*  <Box>
            <Text fontSize="lg" fontWeight="600" color="blackAlpha.700">
              Vélemények
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700">
              Rólunk mondták
            </Heading>
          </Box> */}
          <Box bg="white" border="2px solid" borderColor="#AFC7E9" rounded={{ base: "2xl", md: "3xl" }} p={{ base: 6, md: 10 }} shadow="sm">
            <Grid templateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }} gap={{ base: 6, md: 10 }} alignItems="center">
              {/* Photo */}
              <GridItem>
                <Image rounded="2xl" alt={t.name} src={t.photo} objectFit="cover" w="100%" h={{ base: "240px", md: "320px" }} />
              </GridItem>

              {/* Quote & Meta */}
              <GridItem>
                <VStack align="start" gap={5}>
                  <Heading as="h3" fontSize={{ base: "2xl", md: "3xl" }} lineHeight="1.25" fontWeight="800">
                    {t.quote}
                  </Heading>

                  <Text fontWeight="700">
                    {t.name}
                    <Text as="span" fontWeight="500" color="blackAlpha.700">
                      {` , ${t.role}, ${t.company}`}
                    </Text>
                  </Text>

                  {/* Controls */}
                  <HStack gap={4} pt={2}>
                    <IconButton aria-label="Előző" onClick={prev} rounded="full" variant="outline">
                      <IconArrowLeft size={18} />
                    </IconButton>
                    <Text fontWeight="600">{`${index + 1}/${total}`}</Text>
                    <IconButton aria-label="Következő" onClick={next} rounded="full" variant="outline">
                      <IconArrowRight size={18} />
                    </IconButton>
                  </HStack>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
