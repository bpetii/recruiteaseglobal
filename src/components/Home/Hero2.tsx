"use client";

import NextLink from "next/link";
import { Box, Container, Grid, GridItem, Heading, Text, VStack, HStack, Button, Badge, Link as ChakraLink, Avatar } from "@chakra-ui/react";
import { keyframes } from "@chakra-ui/system";
import { motion } from "framer-motion";
import { IconThumbUp, IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

/* -------- animated greeting chip -------- */
const GREETINGS = ["Hola", "Hello", "Szia", "Bonjour", "Ciao", "Hallo"];

const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(6px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0)    scale(1); }
`;

function AnimatedGreeting() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % GREETINGS.length), 1300);
    return () => clearInterval(id);
  }, []);
  return (
    <Text
      key={GREETINGS[i]}
      animation={`${fadeSlideIn} .25s ease`}
      as="span"
      fontWeight="700"
      letterSpacing="wide"
      fontSize={{ base: "4xl", md: "5xl" }}
      color="black"
      px={3}
      py={1}
      borderRadius="full"
      bg="blackAlpha.100"
      backdropFilter="saturate(140%) blur(4px)"
      display="inline-block"
    >
      {GREETINGS[i]} 👋
    </Text>
  );
}

/* -------- tiny float animations for cards -------- */
const floatA = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 4.5, repeat: Infinity },
};
const floatB = {
  animate: { y: [0, 6, 0] },
  transition: { duration: 5.2, repeat: Infinity },
};

const MBox = motion(Box);

/* -------- single candidate card -------- */
function CandidateCard({
  name,
  role,
  image,
  accent = "#EAF0FF",
  badge,
}: {
  name: string;
  role: string;
  image: string;
  accent?: string;
  badge?: React.ReactNode;
}) {
  return (
    <Box
      bg="white"
      rounded="2xl"
      p={4}
      boxShadow="0 10px 30px rgba(0,0,0,.08)"
      border="1px solid"
      borderColor="blackAlpha.100"
      backdropFilter="saturate(120%) blur(2px)"
      minW={{ base: "240px", md: "260px" }}
    >
      <HStack gap={3} align="center">
        <Avatar.Root>
          <Avatar.Fallback />
          <Avatar.Image src={image} alt={name} />
        </Avatar.Root>
        <VStack align="start" gap={0}>
          <Text fontWeight="700">{name}</Text>
          <Text color="blackAlpha.700" fontSize="sm">
            {role}
          </Text>
        </VStack>
      </HStack>

      {badge ? (
        <HStack mt={3} gap={2}>
          {badge}
        </HStack>
      ) : null}

      <Box mt={4} rounded="xl" bg={accent} h="8" w="full" opacity={0.6} border="1px dashed" borderColor="blackAlpha.200" />
    </Box>
  );
}

/* -------- hero component -------- */
export default function Hero({ bg = "linear-gradient(115deg,#FFF7F0 0%,#F7F2FF 55%,#F2FBFF 100%)" }: { bg?: string }) {
  return (
    <Box as="section" position="relative" bg={bg}>
      {/* subtle vignette */}
      <Box position="absolute" inset={0} pointerEvents="none" bgGradient="radial( at 80% 10%, rgba(255,255,255,.6), transparent 40% )" />
      <Container maxW="7xl" py={{ base: 14, md: 20 }}>
        <Grid templateColumns={{ base: "1fr", lg: "1.05fr 0.95fr" }} gap={{ base: 10, lg: 8 }} alignItems="center">
          {/* LEFT: copy */}
          <GridItem>
            <VStack align="start" gap={{ base: 5, md: 6 }}>
              <AnimatedGreeting />

              <Heading as="h1" fontWeight="800" letterSpacing="-0.02em" lineHeight="1.05" fontSize={{ base: "4xl", md: "6xl" }}>
                Connect talents{" "}
                <Box as="span" bg="black" color="white" px={2} rounded="md">
                  worldwide!
                </Box>
              </Heading>

              <Text color="blackAlpha.800" fontSize={{ base: "lg", md: "xl" }} maxW="40rem">
                Toborzás határok nélkül. Tehetségek, akik mozgásban tartják a világot.
              </Text>

              <Text color="blackAlpha.900" fontSize={{ base: "md", md: "xl" }} maxW="3xl">
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
          </GridItem>

          {/* RIGHT: playful cards */}
          <GridItem>
            <Box position="relative" h={{ base: "360px", md: "460px" }}>
              {/* background blob */}
              <Box position="absolute" inset="0" bgGradient="radial( at 60% 40%, rgba(175,199,233,.35), transparent 45% )" filter="blur(24px)" />

              <MBox position="absolute" top="8%" left={{ base: "2%", md: "8%" }} {...floatA}>
                <CandidateCard
                  name="Andrew Crew"
                  role="Developer"
                  image="/avatars/andrew.jpg"
                  badge={
                    <Badge colorPalette="green" variant="subtle" rounded="full" px={2}>
                      <HStack gap={1}>
                        <IconThumbUp size={16} />
                        <Text fontSize="xs" fontWeight="700">
                          Best fit
                        </Text>
                      </HStack>
                    </Badge>
                  }
                />
              </MBox>

              <MBox position="absolute" bottom="10%" left={{ base: "6%", md: "16%" }} {...floatB}>
                <CandidateCard name="Eva Byrne" role="Account Manager" image="/avatars/eva.jpg" accent="#FFEEDB" />
              </MBox>

              <MBox position="absolute" top={{ base: "22%", md: "12%" }} right={{ base: "4%", md: "6%" }} {...floatB}>
                <Box mb={2} ml={3}>
                  <Badge rounded="full" px={3} py={1} bg="white" border="1px solid" borderColor="blackAlpha.200">
                    Financial specialist
                  </Badge>
                </Box>
                <Box
                  bg="white"
                  rounded="3xl"
                  overflow="hidden"
                  boxShadow="0 12px 30px rgba(0,0,0,.1)"
                  border="1px solid"
                  borderColor="blackAlpha.100"
                  w={{ base: "180px", md: "220px" }}
                  h={{ base: "240px", md: "280px" }}
                  display="grid"
                  placeItems="center"
                >
                  <Avatar.Root size="2xl">
                    <Avatar.Fallback />
                    <Avatar.Image src="/avatars/sofia.jpg" alt="Sofia" />
                  </Avatar.Root>
                  <HStack mt={2} ml={3}>
                    <IconStarFilled size={16} color="#F5C044" />
                    <Text fontSize="xs" color="blackAlpha.700">
                      Shortlisted
                    </Text>
                  </HStack>
                </Box>
              </MBox>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
