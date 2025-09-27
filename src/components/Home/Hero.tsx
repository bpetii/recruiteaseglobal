"use client";

import NextLink from "next/link";
import { Box, Container, Heading, Text, VStack, Button, Link as ChakraLink } from "@chakra-ui/react";

/**
 * Props:
 * - bgImage: url to the hero background
 */
export default function Hero({
  bgImage = "/desktop.jpg", // change to your image path
}: {
  bgImage?: string;
}) {
  return (
    <Box
      as="section"
      position="relative"
      // full-bleed background
      bgImage={`url(${bgImage})`}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      // height: full viewport minus navbar (~64px mobile / ~72px desktop)
      minH={{ base: "calc(100dvh - 56px)", md: "calc(100dvh - 72px)" }}
      display="flex"
      alignItems="center"
      // vignette / gradient overlay (using two layers for depth)
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient: "linear(to-b, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
      }}
      _after={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient: "linear(to-r, rgba(0,0,0,0.25), rgba(0,0,0,0.15))",
      }}
    >
      <Container position="relative" zIndex={1}>
        <VStack gap={{ base: 6, md: 8 }} textAlign="center" align="center" maxW="full">
          <Heading as="h1" color="white" fontWeight="700" letterSpacing="-0.02em" lineHeight="1.05" fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}>
            Connect talents worldwide!
          </Heading>

          <Text fontWeight="700" color="white" fontSize={{ base: "lg", md: "xl" }}>
            Toborzás határok nélkül. Tehetségek, akik mozgásban tartják a világot.
          </Text>

          <Text color="whiteAlpha.900" fontSize={{ base: "md", md: "xl" }} maxW="3xl">
            A RecruitEase Global a nemzetközi fejvadászat és HR szolgáltatások szakértője – vízumügyintézéstől az onboardingig.
          </Text>

          <ChakraLink as={NextLink} href="/consultation" _hover={{ textDecoration: "none" }}>
            <Button
              rounded="full"
              px={{ base: 8, md: 10 }}
              h={{ base: 12, md: 14 }}
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="700"
              bg="#AFC7E9"
              color="blackAlpha.900"
              _hover={{ bg: "#9FBAE4" }}
              shadow="md"
            >
              KONZULTÁCIÓT KÉREK
            </Button>
          </ChakraLink>
        </VStack>
      </Container>
    </Box>
  );
}
