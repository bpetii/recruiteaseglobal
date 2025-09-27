"use client";

import NextLink from "next/link";
import { Box, VStack, Heading, Text, Link as ChakraLink, Image } from "@chakra-ui/react";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string; // public path or URL
  href?: string; // optional detail page
};

export function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  const Card = (
    <Box
      rounded={["none", "lg"]}
      overflow="hidden"
      bg="gray.100"
      shadow="sm"
      transition="transform .2s ease, box-shadow .2s ease"
      _hover={{ transform: "translateY(-4px)", shadow: "md" }}
    >
      {/* Top image */}
      <Image src={image} alt={title} w="100%" h="160px" objectFit="cover" display="block" />

      {/* Body */}
      <VStack gap={3} align="center" px={6} py={6} textAlign="center">
        <Heading as="h3" fontSize="xl" fontWeight="600" lineHeight="1.2">
          {title}
        </Heading>
        <Text fontSize="md" color="gray.700">
          {description}
        </Text>
      </VStack>
    </Box>
  );

  return href ? (
    <ChakraLink as={NextLink} href={href} _hover={{ textDecoration: "none" }}>
      {Card}
    </ChakraLink>
  ) : (
    Card
  );
}
