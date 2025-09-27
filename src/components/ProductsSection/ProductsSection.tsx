"use client";

import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";

const PRODUCTS = [
  {
    title: "Alap HR Csomag",
    description: "Alapvető HR támogatás kisvállalkozások számára.",
    price: "29 900 Ft",
    image: "/products/product-1.jpg",
  },
  {
    title: "Prémium Toborzás",
    description: "AI-alapú előszűrés és profi jelöltkezelés.",
    price: "59 900 Ft",
    image: "/products/product-2.jpg",
  },
  {
    title: "Employer Branding",
    description: "Márkaépítés, tartalomgyártás és karrieroldal optimalizálás.",
    price: "89 900 Ft",
    image: "/products/product-3.jpg",
  },
];

export default function ProductsSection() {
  return (
    <Box as="section" bg="gray.50">
      <Container maxW="7xl" py={{ base: 14, md: 20 }}>
        <Heading as="h2" textAlign="center" fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 10, md: 14 }} fontWeight="700">
          Termékeink
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 6, md: 8 }}>
          {PRODUCTS.map((p) => (
            <ProductCard key={p.title} title={p.title} description={p.description} price={p.price} image={p.image} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
