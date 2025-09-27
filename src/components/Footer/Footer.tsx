"use client";

import { subscribeNewsLetter } from "@/services/apiServices";
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  Input,
  Button,
  Link,
  VStack,
  Flex,
  SimpleGrid,
  Select,
  Link as ChakraLink,
  createListCollection,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import NextLink from "next/link";
import { IconBrandLinkedin, IconBrandInstagram, IconWorld } from "@tabler/icons-react";
import { Logo } from "../Logo/Logo";

const languages = createListCollection({
  items: [
    { label: "Magyar", value: "hu" },
    { label: "English", value: "en" },
  ],
});

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = useMutation({
    mutationFn: async () => {
      await subscribeNewsLetter(email);
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Sikeres feliratkozás",
        description: "Köszönjük! Hamarosan jelentkezünk híreinkkel.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        title: "Sikertelen feliratkozás",
        description: error?.message || "Hiba történt a feliratkozás során.",
      });
    },
  });

  const onSubmit = () => {
    if (!email.trim()) {
      toaster.create({ type: "warning", title: "Adj meg egy e-mail címet!" });
      return;
    }
    handleSubscribe.mutate();
  };

  return (
    <Box as="footer" bg="white" color="black" borderTop="1px solid" borderColor="blackAlpha.200" w="full">
      <Container px={{ base: 4, md: 6 }} py={{ base: 10, md: 12, lg: 14 }} maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 10, md: 12 }} alignItems="start">
          {/* Brand + socials + compact newsletter */}
          <VStack align="start" gap={5}>
            <Logo />

            <Text maxW="sm" lineHeight="1.35">
              Partner a tehetségek világában
            </Text>

            <HStack gap={3}>
              <ChakraLink as={NextLink} href="https://linkedin.com" _hover={{ textDecoration: "none" }}>
                <Button variant="ghost" rounded="md" p={2}>
                  <IconBrandLinkedin size={22} />
                </Button>
              </ChakraLink>

              <ChakraLink as={NextLink} href="https://instagram.com" _hover={{ textDecoration: "none" }}>
                <Button variant="ghost" rounded="md" p={2}>
                  <IconBrandInstagram size={22} />
                </Button>
              </ChakraLink>
            </HStack>

            {/* Newsletter */}
            <VStack align="start" gap={2} w="full" mt={2}>
              <Text fontWeight="600">Hírlevél</Text>
              <HStack w="full" maxW={{ base: "full", md: "22rem" }} gap={3}>
                <Input
                  type="email"
                  placeholder="E-mail cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="white"
                  borderColor="blackAlpha.300"
                  _focus={{ borderColor: "blackAlpha.500", boxShadow: "none" }}
                  rounded="md"
                />
                <Button
                  rounded="full"
                  bg="black"
                  color="white"
                  _hover={{ bg: "blackAlpha.800" }}
                  onClick={onSubmit}
                  disabled={handleSubscribe.isPending}
                >
                  FELIRATKOZÁS
                </Button>
              </HStack>
            </VStack>
          </VStack>

          {/* Company links */}
          <VStack align="start" gap={4}>
            <Text fontWeight="800">Cég</Text>
            <VStack align="start" gap={3} fontSize={{ base: "md" }}>
              <Link as={NextLink} href="/about-us" _hover={{ textDecoration: "underline" }}>
                Rólunk
              </Link>
              <Link as={NextLink} href="/adatkezeles" _hover={{ textDecoration: "underline" }}>
                Adatkezelési tájékoztató
              </Link>
              <Link as={NextLink} href="/aszf" _hover={{ textDecoration: "underline" }}>
                ÁSZF
              </Link>
            </VStack>
          </VStack>

          {/* Contact + language */}
          <VStack align="start" gap={4}>
            <Text fontWeight="800">Kapcsolat</Text>
            <VStack align="start" gap={3} fontSize={{ base: "md" }}>
              <Link href="mailto:info@recruiteaseglobal.com" textDecoration="underline">
                info@recruiteaseglobal.com
              </Link>
              <Link href="tel:+36301234567" textDecoration="underline">
                +36 30 123 4567
              </Link>
            </VStack>

            {/* Language switch with Select */}
            <HStack gap={2} pt={2}>
              <Select.Root defaultValue={["hu"]} collection={languages} size="sm" width="auto">
                <Select.Trigger w="fit-content" bg="white" borderColor="blackAlpha.800" _hover={{ borderColor: "blackAlpha.400" }} rounded="full">
                  <IconWorld />
                  <Select.ValueText placeholder="Válassz nyelvet" />
                </Select.Trigger>

                <Select.Content>
                  {languages.items.map((lang) => (
                    <Select.Item key={lang.value} item={lang}>
                      {lang.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </HStack>
          </VStack>
        </SimpleGrid>

        {/* bottom row */}
        <Box h="1px" bg="blackAlpha.300" my={{ base: 8, md: 10 }} />

        <Flex direction={{ base: "column", md: "row" }} gap={4} align="center" justify="space-between">
          <Text fontSize="sm" opacity={0.8}>
            © {new Date().getFullYear()} RecruitEase Kft. Minden jog fenntartva.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
