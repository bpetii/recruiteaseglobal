"use client";

import NextLink from "next/link";
import { Box, VStack, Heading, Text, Button, Link as ChakraLink, Image } from "@chakra-ui/react";

type TeamMemberCardProps = {
  name: string;
  role: string;
  image: string; // public path or URL
  href?: string; // optional CTA link (defaults to /konzultacio)
};

export function TeamMemberCard({ name, role, image, href = "/consultation" }: TeamMemberCardProps) {
  return (
    <Box bg="gray.100" rounded={["none", "lg"]} p={{ base: 6, md: 8 }} textAlign="center" shadow="sm">
      {/* Big circular photo */}
      <Box mx="auto" w={{ base: "220px", md: "300px" }} h={{ base: "220px", md: "300px" }} rounded="full" overflow="hidden" mb={{ base: 6, md: 8 }}>
        <Image src={image} alt={name} w="100%" h="100%" objectFit="cover" />
      </Box>

      <VStack gap={1} mb={{ base: 5, md: 6 }}>
        <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="600">
          {name}
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.700" textTransform="uppercase" letterSpacing="wide">
          {role}
        </Text>
      </VStack>

      <ChakraLink as={NextLink} href={href} _hover={{ textDecoration: "none" }}>
        <Button
          rounded="full"
          bg="black"
          color="white"
          px={{ base: 6, md: 8 }}
          h={{ base: 12, md: 12 }}
          _hover={{ bg: "blackAlpha.800" }}
          shadow="md"
        >
          KONZULTÁCIÓT KÉREK
        </Button>
      </ChakraLink>
    </Box>
  );
}
