"use client";

import NextLink from "next/link";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Link,
  Button,
  Input,
  Flex,
  Link as ChakraLink,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { IconBrandLinkedin, IconBrandInstagram, IconBrandTwitter, IconWorld } from "@tabler/icons-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { subscribeNewsLetter } from "@/services/apiServices";
import { toaster } from "../ui/toaster";
import { Logo } from "../Logo/Logo";

/* ---------- language options (Chakra v3 list collection) ---------- */
const languages = createListCollection({
  items: [
    { label: "Magyar", value: "hu" },
    { label: "English", value: "en" },
  ],
});

/* ---------- small helpers ---------- */
function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <VStack align="start" gap={4}>
      <Text fontWeight="800" color="white">
        {title}
      </Text>
      <VStack align="start" gap={3} color="whiteAlpha.800">
        {children}
      </VStack>
    </VStack>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = useMutation({
    mutationFn: async () => subscribeNewsLetter(email.trim()),
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Sikeres feliratkozás",
        description: "Köszönjük! Hamarosan jelentkezünk híreinkkel.",
        closable: true,
      });
      setEmail("");
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        title: "Sikertelen feliratkozás",
        description: error?.message || "Hiba történt a feliratkozás során.",
        closable: true,
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
    <Box as="footer" position="relative" overflow="hidden" bg="#212121" color="white">
      {/* decorative blobs */}
      <Box position="absolute" w="80" h="80" top="-10" left="-10" rounded="full" bgGradient="radial(#4caf5030, transparent 70%)" filter="blur(8px)" />
      <Box
        position="absolute"
        w="96"
        h="96"
        bottom="-14"
        right="-10"
        rounded="full"
        bgGradient="radial(#8ab4ff30, transparent 70%)"
        filter="blur(10px)"
      />

      <Container maxW="8xl" px={{ base: 4, md: 6 }} py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 2, md: 12 }}>
          {/* Brand + newsletter */}
          <VStack align="start" gap={5}>
            <Logo />
            <Text fontSize="sm" color="whiteAlpha.700">
              © {new Date().getFullYear()} RecruitEase Kft. Minden jog fenntartva.
            </Text>

            {/* Compact newsletter */}
            <VStack align="start" gap={2} w="full" mt={2}>
              <Text fontWeight="700" color="white">
                Hírlevél
              </Text>
              <HStack w="full" maxW={{ base: "full", sm: "22rem" }} gap={3}>
                <Input
                  type="email"
                  placeholder="E-mail cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="whiteAlpha.100"
                  color="white"
                  borderColor="whiteAlpha.300"
                  _placeholder={{ color: "whiteAlpha.600" }}
                  _focus={{ borderColor: "whiteAlpha.700", boxShadow: "none" }}
                  rounded="md"
                />
                <Button
                  rounded="full"
                  bg="white"
                  color="black"
                  _hover={{ bg: "whiteAlpha.900" }}
                  onClick={onSubmit}
                  disabled={handleSubscribe.isPending}
                >
                  Feliratkozás
                </Button>
              </HStack>
            </VStack>
          </VStack>

          {/* Learn More */}
          <Column title="Tudj meg többet">
            <Link as={NextLink} color="white" href="/about-us" _hover={{ color: "white" }}>
              Rólunk
            </Link>
            <Link as={NextLink} color="white" href="/how-it-works" _hover={{ color: "white" }}>
              Adatkezelési tájékoztató
            </Link>
            <Link as={NextLink} color="white" href="/results" _hover={{ color: "white" }}>
              ÁSZF
            </Link>
          </Column>

          {/* For Employers */}
          <Column title="Munkaadóknak">
            <Link as={NextLink} color="white" href="/start-hiring" _hover={{ color: "white" }}>
              Toborzás indítása
            </Link>
            <Link as={NextLink} color="white" href="/pricing" _hover={{ color: "white" }}>
              Árak & csomagok
            </Link>
            <Link as={NextLink} color="white" href="/resources" _hover={{ color: "white" }}>
              HR anyagok
            </Link>
            <Link as={NextLink} color="white" href="/stories" _hover={{ color: "white" }}>
              Sikertörténetek
            </Link>
            <Link as={NextLink} color="white" href="/faq" _hover={{ color: "white" }}>
              GYIK
            </Link>
          </Column>

          {/* For Candidates + Social + Language (grouped to mirror reference) */}
          <VStack align="start" gap={8}>
            {/*   <Column title="Jelölteknek">
              <Link as={NextLink} href="/roles" _hover={{ color: "white" }}>
                Állások
              </Link>
              <Link as={NextLink} href="/talent-pool" _hover={{ color: "white" }}>
                Csatlakozz a Talent Poolhoz
              </Link>
              <Link as={NextLink} href="/tips" _hover={{ color: "white" }}>
                Tippek & tanácsok
              </Link>
            </Column> */}

            <VStack align="start" gap={4}>
              <Text fontWeight="800">Közösség</Text>
              <HStack gap={2}>
                <ChakraLink as={NextLink} href="https://linkedin.com" aria-label="LinkedIn">
                  <Button color="white" variant="ghost" rounded="full" p={2} _hover={{ bg: "whiteAlpha.200" }}>
                    <IconBrandLinkedin size={20} />
                  </Button>
                </ChakraLink>
                <ChakraLink as={NextLink} href="https://twitter.com" aria-label="Twitter / X">
                  <Button color="white" variant="ghost" rounded="full" p={2} _hover={{ bg: "whiteAlpha.200" }}>
                    <IconBrandTwitter size={20} />
                  </Button>
                </ChakraLink>
                <ChakraLink as={NextLink} href="https://instagram.com" aria-label="Instagram">
                  <Button color="white" variant="ghost" rounded="full" p={2} _hover={{ bg: "whiteAlpha.200" }}>
                    <IconBrandInstagram size={20} />
                  </Button>
                </ChakraLink>
              </HStack>

              {/* Language switch */}
              <HStack>
                <Select.Root defaultValue={["hu"]} collection={languages} size="sm">
                  <Select.Trigger
                    rounded="full"
                    px="3"
                    bg="whiteAlpha.100"
                    color="white"
                    borderColor="whiteAlpha.300"
                    _hover={{ borderColor: "whiteAlpha.500" }}
                  >
                    <IconWorld />
                    <Select.ValueText placeholder="Nyelv" />
                  </Select.Trigger>
                  <Select.Content bg="blackAlpha.300">
                    {languages.items.map((lang) => (
                      <Select.Item key={lang.value} item={lang}>
                        {lang.label}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </HStack>
            </VStack>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
