"use client";

import { Box, Container, Heading, Text, VStack, Button } from "@chakra-ui/react";

export default function HireCTA() {
  return (
    <Box as="section" py={{ base: 8, md: 10 }} bg="gray.50">
      <Container maxW="4xl">
        <Box bg="white" rounded="2xl" border="2px solid" borderColor="#AFC7E9" p={{ base: 8, md: 12 }} textAlign="center" shadow="sm">
          <VStack gap={5}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight="800" color="black">
              Készen állsz, hogy egyszerűbbé tedd a toborzást?
            </Heading>

            <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" maxW="2xl">
              Mi szűrünk, párosítunk, és elküldjük neked a legjobb jelölteket. Nincs zaj. Csak eredmények.
            </Text>

            <Button
              rounded="full"
              px={{ base: 8, md: 10 }}
              h={{ base: 12, md: 14 }}
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="700"
              bg="black"
              color="white"
              _hover={{ bg: "blackAlpha.800" }}
              shadow="md"
            >
              Konzultáció foglalása
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
