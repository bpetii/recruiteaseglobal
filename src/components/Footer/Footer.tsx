"use client";

import { subscribeNewsLetter } from "@/services/apiServices";
import { Box, Container, Heading, Text, HStack, Input, Button, Link, VStack, Flex } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toaster } from "../ui/toaster";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = useMutation({
    mutationFn: async () => {
      await subscribeNewsLetter(email);
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        description: "Sikeres feliratkozás",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        title: "Sikertelen feliratkozás",
        description: error.message || "Hiba történt a feliratkozás során.",
      });
      console.error("Error while adding rental object note:", error);
    },
  });

  return (
    <Box borderTop="1px solid" borderColor="blackAlpha.200" w="full">
      <Container px={[3, 5]} py={{ base: 8, md: 8, lg: 10 }} bg="white">
        <Flex justifyContent="space-between" direction={["column", "row"]} gap={{ base: 10, md: 16 }}>
          {/* Left: Newsletter */}
          <VStack align="start" gap={6} maxW="4xl">
            <Heading as="h2" fontSize={{ base: "3xl", md: "3xl", lg: "5xl" }} lineHeight="1.05" fontWeight="700">
              Maradj naprakész
            </Heading>
            <Text fontSize={{ base: "md", md: "xl" }} color="blackAlpha.800">
              Iratkozz fel az email címeddel, hogy megkapd híreinket és frissítéseinket.
            </Text>

            <Box w="full">
              <HStack gap={{ base: 3, md: 4 }} align="center" flexWrap={{ base: "wrap", md: "nowrap" }}>
                <Input
                  type="email"
                  placeholder="E-mail cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  bg="blackAlpha.50"
                  borderColor="blackAlpha.200"
                  _placeholder={{ color: "blackAlpha.500" }}
                  _focus={{ borderColor: "blackAlpha.400", boxShadow: "none" }}
                  maxW={{ base: "full", md: "28rem" }}
                  rounded="md"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  px={{ base: 6, md: 10 }}
                  h={{ base: 12, md: 14 }}
                  rounded="full"
                  bg="black"
                  onClick={() => handleSubscribe.mutate()}
                  loading={handleSubscribe.isPending}
                  color="white"
                  _hover={{ bg: "blackAlpha.800" }}
                  fontWeight="700"
                  gap="wide"
                >
                  FELIRATKOZÁS
                </Button>
              </HStack>
            </Box>
          </VStack>

          {/* Right: Company info */}
          <VStack align="start" gap={6}>
            <Heading as="h3" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="600">
              Recruiteaseglobal
            </Heading>

            <VStack align="start" gap={1} fontSize={{ base: "md", md: "xl" }}>
              <Text>12345 Váci út</Text>
              <Text>Budapest, Hűvösvölgyi út 74</Text>
            </VStack>

            <VStack align="start" gap={2} fontSize={{ base: "md", md: "xl" }}>
              <Link href="mailto:biro.peti09@gmail.com" textDecoration="underline">
                biro.peti09@gmail.com
              </Link>
              <Link href="tel:+15555555555" textDecoration="underline">
                (555) 555-5555
              </Link>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}
