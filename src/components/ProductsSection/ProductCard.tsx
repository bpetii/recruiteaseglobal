"use client";

import { Box, VStack, Heading, Text, Button, Image } from "@chakra-ui/react";

type ProductCardProps = {
  title: string;
  description: string;
  price: string;
  image: string;
};

export function ProductCard({ title, description, price, image }: ProductCardProps) {
  return (
    <Box rounded="lg" overflow="hidden" bg="gray.50" shadow="sm" transition="all .2s ease" _hover={{ transform: "translateY(-4px)", shadow: "md" }}>
      {/* Product image */}
      <Image src={image} alt={title} w="100%" h="220px" objectFit="cover" />

      {/* Content */}
      <VStack align="start" gap={3} px={6} py={6}>
        <Heading as="h3" fontSize="xl" fontWeight="600">
          {title}
        </Heading>
        <Text fontSize="md" color="gray.600">
          {description}
        </Text>

        <Text fontSize="lg" fontWeight="700" color="black">
          {price}
        </Text>

        {/* <Button rounded="full" bg="black" color="white" _hover={{ bg: "blackAlpha.800" }} mt={2} alignSelf="stretch">
          Vásárlás
        </Button> */}
      </VStack>
    </Box>
  );
}
