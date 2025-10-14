"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, Container, Flex, HStack, IconButton, Link as ChakraLink, Button, Text, useDisclosure, VStack, Heading } from "@chakra-ui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { Logo } from "../Logo/Logo";
import { useTranslation } from "react-i18next";
import translations from "@/translations";

const LINKS = [
  { href: "/", key: translations.home },
  { href: "/services", key: translations.services },
  { href: "/packages", key: translations.packages },
  { href: "/about-us", key: translations.aboutUs },
  { href: "/contact", key: translations.contact },
];

function NavLink({ href, children, isActive, onClick }: { href: string; children: React.ReactNode; isActive?: boolean; onClick?: () => void }) {
  return (
    <ChakraLink
      as={NextLink}
      href={href}
      onClick={onClick}
      px={3}
      py={2}
      fontWeight={500}
      color="black"
      _hover={{ textDecoration: "none", color: "gray.700" }}
      position="relative"
      _after={
        isActive
          ? {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "2px",
              bg: "black",
              borderRadius: "full",
              transition: "all 0.2s ease",
            }
          : undefined
      }
    >
      {children}
    </ChakraLink>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const { open, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      bg="transparent"
      right={0}
      left={0}
      py={[5, 5]}
      zIndex={100}
      bgGradient="linear(to-r, #1b1a19, #2a2827, #2f2d2c)"
      bgClip="padding-box"
      backdropFilter="saturate(140%) blur(6px)"
    >
      <Container px={[3, 5]} bg="inherit">
        <Flex align="center" justify="space-between">
          <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
            <Logo />
          </ChakraLink>

          {/* desktop */}
          <HStack gap={5} display={{ base: "none", lg: "flex" }}>
            {LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} isActive={pathname === l.href}>
                {t(l.key)}
              </NavLink>
            ))}
            <ChakraLink as={NextLink} href="/consultation" _hover={{ textDecoration: "none" }}>
              <Button rounded="full" px={6} py={6} color="blackAlpha.900" bg="#AFC7E9" _hover={{ bg: "#9FBAE4" }} fontWeight={600}>
                {t(translations.consultation)}
              </Button>
            </ChakraLink>
          </HStack>

          {/* mobile toggle */}
          <IconButton
            aria-label="Menü megnyitása"
            variant="ghost"
            color="black"
            display={{ base: "inline-flex", lg: "none" }}
            onClick={open ? onClose : onOpen}
            fontSize="2xl"
          >
            {open ? <IconX size={36} /> : <IconMenu2 size={36} />}
          </IconButton>
        </Flex>
      </Container>

      {/* BACKDROP with fade (CSS only) */}
      <Box
        position="fixed"
        inset={0}
        bg="blackAlpha.300"
        h={"100dvh"}
        zIndex={109}
        display={{ base: "block", lg: "none" }}
        opacity={open ? 1 : 0}
        transition="opacity .2s ease"
        pointerEvents={open ? "auto" : "none"}
        onClick={onClose}
      />

      {/* FULLSCREEN OVERLAY with slide + fade (CSS only) */}
      <Box
        position="fixed"
        inset={0}
        bg="gray.100"
        h={"100dvh"}
        overflow="hidden"
        zIndex={110}
        display={{ base: "block", lg: "none" }}
        transform={open ? "translateY(0)" : "translateY(-10px)"}
        opacity={open ? 1 : 0}
        transition="transform .22s ease, opacity .22s ease"
        pointerEvents={open ? "auto" : "none"}
      >
        {/* overlay header */}
        <Container py={5} px={[3, 5]} bg="inherit">
          <Flex align="center" justify="space-between">
            <ChakraLink as={NextLink} href="/" onClick={onClose} _hover={{ textDecoration: "none" }}>
              <Logo />
            </ChakraLink>
            <IconButton aria-label="Menü bezárása" variant="ghost" onClick={onClose} fontSize="2xl">
              <IconX size={36} />
            </IconButton>
          </Flex>
        </Container>

        {/* centered big links */}
        <Flex direction="column" align="center" pt={10} gap={"70px"}>
          {/* nav links */}
          <VStack justify="start" as="nav" gap={8} textAlign="center">
            {LINKS.map((l, i) => (
              <ChakraLink key={l.href} as={NextLink} href={l.href} onClick={onClose} _hover={{ textDecoration: "none" }}>
                <Text
                  fontSize="2xl"
                  lineHeight="1.1"
                  fontWeight={500}
                  color="black"
                  transition="transform .2s ease, opacity .2s ease"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {t(l.key)}
                </Text>
              </ChakraLink>
            ))}
          </VStack>

          {/* CTA button */}
          <Box textAlign="center">
            <ChakraLink as={NextLink} href="/consultation" _hover={{ textDecoration: "none" }} onClick={onClose}>
              <Button w="200px" py={7} rounded="full" bg="black" color="white" fontSize="lg" _hover={{ bg: "blackAlpha.800" }} shadow="lg">
                {t(translations.consultation)}
              </Button>
            </ChakraLink>
          </Box>
        </Flex>

        {/* bottom pill CTA */}
      </Box>
    </Box>
  );
}
