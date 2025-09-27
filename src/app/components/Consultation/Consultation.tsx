"use client";

import { useState } from "react";
import { Box, Button, Container, Flex, Grid, GridItem, Heading, Text, VStack, HStack, Badge, Input, Textarea } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const TIMES = ["09:00", "09:50", "10:40", "11:30", "12:20", "13:10", "14:00", "14:50", "15:40"];

export default function ConsultationLayout() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [slot, setSlot] = useState<string | null>(null);

  const [info, setInfo] = useState({ name: "", email: "", phone: "", notes: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInfo((s) => ({ ...s, [e.target.name]: e.target.value }));

  const dateLabel =
    selected &&
    new Intl.DateTimeFormat("hu-HU", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(selected);

  return (
    <Container maxW="6xl" py={{ base: 10, md: 16 }} minH="100vh">
      <Heading as="h2" textAlign="center" fontSize={{ base: "3xl", md: "4xl" }} mb={{ base: 10, md: 14 }} fontWeight="600">
        Konzultáció foglalás
      </Heading>
      {/* Header / Summary */}
      <VStack align="start" gap={3} mb={6}>
        <Text fontWeight="700">IDŐPONT</Text>
        <Box bg="white" rounded="lg" shadow="sm" p={{ base: 4, md: 6 }} w="full">
          <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={1}>
            Konzultáció Kovács Amandával
          </Heading>
          <Text color="gray.700">50 minutes</Text>

          {step === 2 && selected && slot && (
            <Box mt={4} p={4} rounded="md" bg="gray.50" border="1px solid" borderColor="gray.200">
              <VStack align="start" gap={1}>
                <Text fontWeight="600">{dateLabel}</Text>
                <HStack gap={2} wrap="wrap">
                  <Badge bg="gray.100">Időpont: {slot}</Badge>
                  <Badge bg="gray.100">Időzóna: {TZ}</Badge>
                </HStack>
              </VStack>
            </Box>
          )}
        </Box>
      </VStack>

      {step === 1 && (
        // STEP 1: calendar + time slots
        <Box bg="white" rounded="lg" shadow="sm" p={{ base: 4, md: 6 }}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 6, md: 10 }} alignItems="start">
            <GridItem>
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                weekStartsOn={1}
                styles={{
                  day: { fontSize: "14px" },
                  head_cell: { fontSize: "12px", color: "#6B7280" },
                  nav_button: { border: "1px solid #E5E7EB", borderRadius: 8 },
                  caption_label: { fontWeight: 600 },
                }}
              />
            </GridItem>

            <GridItem>
              <VStack align="start" gap={4}>
                <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
                  {selected ? dateLabel : "Válassz egy napot"}
                </Heading>

                <Grid templateColumns={{ base: "1fr 1fr", sm: "repeat(3, 1fr)" }} gap={4} w="full" pt={2}>
                  {TIMES.map((t) => (
                    <Button
                      key={t}
                      variant="outline"
                      borderColor="gray.300"
                      rounded="md"
                      onClick={() => setSlot(t)}
                      disabled={!selected}
                      aria-pressed={slot === t}
                      {...(slot === t ? { bg: "black", color: "white", _hover: { bg: "black" } } : {})}
                    >
                      {t}
                    </Button>
                  ))}
                </Grid>

                <Flex gap={3} pt={4}>
                  <Button
                    rounded="full"
                    px={6}
                    bg="black"
                    color="white"
                    _hover={{ bg: "blackAlpha.800" }}
                    onClick={() => setStep(2)}
                    disabled={!selected || !slot}
                  >
                    Tovább
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelected(undefined);
                      setSlot(null);
                    }}
                  >
                    Mégse
                  </Button>
                </Flex>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      )}

      {step === 2 && (
        // STEP 2: personal info (labels + inputs only)
        <Box bg="white" rounded="lg" shadow="sm" p={{ base: 4, md: 6 }}>
          <VStack align="stretch" gap={5}>
            <Heading as="h3" fontSize={{ base: "lg", md: "xl" }}>
              Személyes adatok
            </Heading>

            <Box>
              <Text mb={2} fontWeight="600">
                Teljes név
              </Text>
              <Input name="name" value={info.name} onChange={onChange} placeholder="Írd be a neved" />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600">
                Email cím
              </Text>
              <Input type="email" name="email" value={info.email} onChange={onChange} placeholder="pl. te@ceged.hu" />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600">
                Telefonszám
              </Text>
              <Input name="phone" value={info.phone} onChange={onChange} placeholder="+36..." />
            </Box>

            <Box>
              <Text mb={2} fontWeight="600">
                Megjegyzés
              </Text>
              <Textarea name="notes" value={info.notes} onChange={onChange} placeholder="Röviden írd le, miben segíthetünk" />
            </Box>

            <Flex gap={3} pt={2}>
              <Button variant="outline" onClick={() => setStep(1)}>
                Vissza
              </Button>
              <Button rounded="full" px={6} bg="black" color="white" _hover={{ bg: "blackAlpha.800" }}>
                Foglalás megerősítése
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}
    </Container>
  );
}
