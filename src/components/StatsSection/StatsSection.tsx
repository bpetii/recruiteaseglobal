"use client";

import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
};

function StatCard({ value, suffix, label, duration = 4 }: StatProps) {
  return (
    <MotionBox
      whileInView={{ opacity: [0, 1], y: [12, 0] }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      bg="white"
      border="2px solid"
      borderColor="#AFC7E9"
      rounded="2xl"
      shadow="sm"
      p={{ base: 6, md: 8 }}
      textAlign="center"
    >
      <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" color="black">
        <CountUp end={value} duration={duration} suffix={suffix || ""} />
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} color="gray.700" mt={2}>
        {label}
      </Text>
    </MotionBox>
  );
}

export default function StatsSection() {
  return (
    <Box as="section" py={{ base: 8, md: 10 }}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 6, md: 8 }}>
          <StatCard value={6} suffix=" nap" label="Átlagos betöltési idő" />
          <StatCard value={58} suffix="%" label="Ügyfeleink újra minket választanak" />
          <StatCard value={318} suffix="+" label="Cég talált tökéletes jelöltet" />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
