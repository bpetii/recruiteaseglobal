"use client";

import { Box, Container, Heading, Text, VStack, HStack, Avatar } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Testimonial = {
  name: string;
  text: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Meng Qingmao",
    text: "Vélemény szöveg helye. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    avatar: "/avatars/meng.jpg",
  },
  {
    name: "Gülsah Yüksel",
    text: "Vélemény szöveg helye. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    avatar: "/avatars/gulsah.jpg",
  },
  {
    name: "Kovács Péter",
    text: "Nagyon profi csapat, minden kérdésemre gyors választ kaptam. Csak ajánlani tudom!",
    avatar: "/avatars/peter.jpg",
  },
];

const MotionHStack = motion(HStack);

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // autoplay every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box as="section" py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="6xl">
        <VStack gap={10} textAlign="center">
          <Box>
            <Text fontSize="lg" fontWeight="600" color="blackAlpha.700">
              Vélemények
            </Text>
            <Heading as="h2" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700">
              Rólunk mondták
            </Heading>
          </Box>

          <Box overflow="hidden" w="full">
            <MotionHStack
              gap={6}
              w="full" // ⬅️ keep the track width = container
              style={{ willChange: "transform" }}
              animate={{ x: `calc(-100% * ${index})` }} // ⬅️ move by one viewport each step
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {testimonials.map((t, i) => (
                <Box key={i} flex="0 0 100%" bg="blackAlpha.50" rounded="lg" p={{ base: 6, md: 8 }} textAlign="left" shadow="sm">
                  <Avatar.Root mb={5}>
                    <Avatar.Fallback />
                    <Avatar.Image src={t.avatar} alt={t.name} />
                  </Avatar.Root>
                  <Text px={1} wordBreak="break-word" fontSize={{ base: "md", md: "lg" }} mb={4}>
                    “{t.text}”
                  </Text>
                  <HStack>
                    <Text fontWeight="600">{t.name}</Text>
                  </HStack>
                </Box>
              ))}
            </MotionHStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
