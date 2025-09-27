"use client";

import { useMemo, useState } from "react";
import { Box, Button, Container, Flex, Grid, GridItem, Heading, Text, VStack, HStack, Badge, Input, Textarea } from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";
import { submitAppointment } from "@/services/apiServices";
import { useRouter } from "next/navigation";

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const TIMES = ["09:00", "09:50", "10:40", "11:30", "12:20", "13:10", "14:00", "14:50", "15:40"];

type AppointmentLite = { date: string; time: string }; // from server: date = "YYYY-MM-DD"
type Info = { name: string; email: string; phone: string; notes: string };

// make a YYYY-MM-DD key in UTC (matches server's toISOString().slice(0,10))
function dateToUtcKey(d: Date) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function ConsultationLayout({ appointments }: { appointments: AppointmentLite[] }) {
  console.log(appointments);
  const router = useRouter();

  // Map: "YYYY-MM-DD" -> Set<time>
  const bookedMap = useMemo(() => {
    const m = new Map<string, Set<string>>();
    for (const a of appointments) {
      if (!m.has(a.date)) m.set(a.date, new Set());
      m.get(a.date)!.add(a.time);
    }
    return m;
  }, [appointments]);

  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [slot, setSlot] = useState<string | null>(null);
  const [info, setInfo] = useState<Info>({ name: "", email: "", phone: "", notes: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInfo((s) => ({ ...s, [e.target.name]: e.target.value }));

  function dateToLocalKey(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  // 2) Use the local key for the selected day
  const isoDay = useMemo(() => (selected ? dateToLocalKey(selected) : null), [selected]);

  // 3) Use the same local key when checking fully-booked days
  function isDayFullyBooked(date: Date) {
    const key = dateToLocalKey(date);
    const set = bookedMap.get(key);
    return !!set && set.size >= TIMES.length;
  }

  console.log(isoDay);

  // 4) Time-slot check stays the same but now receives the correct key
  function isTimeBooked(dateKey: string | null, time: string) {
    if (!dateKey) return false;
    const set = bookedMap.get(dateKey);
    return !!set && set.has(time);
  }

  const dateLabel = useMemo(
    () =>
      selected &&
      new Intl.DateTimeFormat("hu-HU", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(selected),
    [selected]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!info.name.trim() || !info.email.trim() || !isoDay || !slot) {
        throw new Error("Kérjük töltsd ki a nevet, e-mailt és válassz dátumot/ időpontot.");
      }
      if (!/^\S+@\S+\.\S+$/.test(info.email)) {
        throw new Error("Érvénytelen e-mail cím.");
      }
      await submitAppointment({
        name: info.name.trim(),
        email: info.email.trim(),
        phoneNumber: info.phone.trim(),
        notes: info.notes.trim(),
        date: isoDay,
        time: slot!,
        timezone: TZ,
      });
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Foglalás elküldve",
        description: "Hamarosan visszaigazolunk e-mailben.",
        closable: true,
      });
      // Refresh server data so newly booked slots/ days get disabled
      router.refresh();

      // Reset flow
      setStep(1);
      setSelected(undefined);
      setSlot(null);
      setInfo({ name: "", email: "", phone: "", notes: "" });
    },
    onError: (err: any) => {
      toaster.create({
        type: "error",
        title: "Hiba történt",
        description: err?.message ?? "Nem sikerült elküldeni a foglalást.",
        closable: true,
      });
      console.error(err);
    },
  });

  return (
    <Container maxW="6xl" py={{ base: 10, md: 16 }} minH="100vh">
      <Heading as="h2" textAlign="center" fontSize={{ base: "3xl", md: "4xl" }} mb={{ base: 10, md: 14 }} fontWeight="600">
        Konzultáció foglalás
      </Heading>

      {/* Summary */}
      <VStack align="start" gap={3} mb={6}>
        <Text fontWeight="700">IDŐPONT</Text>
        <Box bg="white" rounded="lg" shadow="sm" p={{ base: 4, md: 6 }} w="full">
          <Heading as="h3" fontSize={{ base: "lg", md: "xl" }} mb={1}>
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
        <Box bg="white" rounded="lg" shadow="sm" p={{ base: 4, md: 6 }}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 6, md: 10 }} alignItems="start">
            <GridItem>
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={(d) => {
                  setSelected(d ?? undefined);
                  setSlot(null);
                }}
                weekStartsOn={1}
                disabled={(date) => isDayFullyBooked(date)} // now correct
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
                <Heading as="h4" fontSize={{ base: "lg", md: "xl" }}>
                  {selected ? dateLabel : "Válassz egy napot"}
                </Heading>

                <Grid templateColumns={{ base: "1fr 1fr", sm: "repeat(3, 1fr)" }} gap={4} w="full" pt={2}>
                  {TIMES.map((t) => {
                    console.log(isoDay, t, isTimeBooked(isoDay, t));
                    const booked = isTimeBooked(isoDay, t);
                    const active = slot === t;
                    return (
                      <Button
                        key={t}
                        variant="outline"
                        borderColor="gray.300"
                        rounded="md"
                        onClick={() => !booked && setSlot(t)}
                        disabled={!selected || booked}
                        aria-pressed={active}
                        {...(active ? { bg: "black", color: "white", _hover: { bg: "black" } } : {})}
                      >
                        {t}
                      </Button>
                    );
                  })}
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
        <Box bg="white" rounded="lg" shadow="sm" p={{ base: 4, md: 6 }}>
          <VStack align="stretch" gap={5}>
            <Heading as="h4" fontSize={{ base: "lg", md: "xl" }}>
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
              <Button rounded="full" px={6} bg="black" color="white" _hover={{ bg: "blackAlpha.800" }} onClick={() => mutate()} disabled={isPending}>
                {isPending ? "Küldés..." : "Foglalás megerősítése"}
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}
    </Container>
  );
}
