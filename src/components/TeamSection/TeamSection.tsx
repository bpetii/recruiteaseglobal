"use client";

import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { TeamMemberCard } from "./TeamMemberCard";

const TEAM = [
  {
    name: "Sáfrány Réka",
    role: "Recruiter",
    image: "/team/person-1.jpg",
  },
  {
    name: "Biró Péter",
    role: "Design Director",
    image: "/team/person-2.jpg",
  },
  {
    name: "Karl Holland",
    role: "Sales Manager",
    image: "/team/person-3.jpg",
  },
];

export default function TeamSection() {
  return (
    <Box as="section" py={{ base: 14, md: 20 }}>
      <Container maxW="7xl">
        <Heading as="h2" textAlign="center" fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 10, md: 14 }} fontWeight="700">
          Találkozz a csapattal!
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
          {TEAM.map((m) => (
            <TeamMemberCard key={m.name} name={m.name} role={m.role} image={m.image} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
