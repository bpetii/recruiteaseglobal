"use client";

import * as React from "react";
import { Box, Container, Heading, Text, SimpleGrid, Card, Button, HStack, Input, Badge, Table, VStack, Menu, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { acceptAppointment, logout, rejectAppointment } from "@/services/apiServices";
import { Appointment, AppointmentStatus, ContactMessage, NewsletterSubscription } from "@prisma/client";
import { IconArrowDown, IconChevronDown } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";

// If you have Prisma client types, you can import them:
// import { Appointment, ContactMessage, NewsletterSubscription } from "@prisma/client";

// Minimal shapes to keep this portable

function formatDate(d: Date | string) {
  try {
    const dt = typeof d === "string" ? new Date(d) : d;
    return new Intl.DateTimeFormat("hu-HU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dt);
  } catch {
    return String(d);
  }
}

export default function AdminDashboard({
  appointments,
  messages,
  subscriptions,
}: {
  appointments: Appointment[];
  messages: ContactMessage[];
  subscriptions: NewsletterSubscription[];
}) {
  // local filters
  const router = useRouter();
  const [search, setSearch] = React.useState("");

  const apptFiltered = React.useMemo(() => {
    if (!search.trim()) return appointments;
    const q = search.toLowerCase();
    return appointments.filter((a) =>
      [a.name, a.email, a.phoneNumber, a.time, a.timezone].filter(Boolean).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [appointments, search]);

  const msgFiltered = React.useMemo(() => {
    if (!search.trim()) return messages;
    const q = search.toLowerCase();
    return messages.filter((m) => [m.firstName, m.lastName, m.email, m.message].filter(Boolean).some((v) => String(v).toLowerCase().includes(q)));
  }, [messages, search]);

  const subFiltered = React.useMemo(() => {
    if (!search.trim()) return subscriptions;
    const q = search.toLowerCase();
    return subscriptions.filter((s) => [s.email].some((v) => String(v).toLowerCase().includes(q)));
  }, [subscriptions, search]);

  const handleLogout = async () => {
    try {
      await logout();

      router.push("/admin/login");
      router.refresh();
    } catch (e: any) {
      console.error(e.message || "Ismeretlen hiba");
    }
  };

  function statusColor(s?: AppointmentStatus) {
    switch (s) {
      case AppointmentStatus.ACCEPTED:
        return "green";
      case AppointmentStatus.REJECTED:
        return "red";
      case AppointmentStatus.PENDING:
        return "yellow";
      default:
        return "gray";
    }
  }

  const handleAccept = useMutation({
    mutationFn: async (id: string) => {
      await acceptAppointment(id);
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Időpont elfogadva",
        closable: true,
      });

      router.refresh();
    },
    onError: (error: any) => {
      console.log({ ...error });
      toaster.create({
        type: "error",
        title: "Nem sikerült elfogadni az időpontot",
        description: error?.message || "Hiba történt",
      });
    },
  });

  const handleReject = useMutation({
    mutationFn: async (id: string) => {
      await rejectAppointment(id);
    },
    onSuccess: () => {
      toaster.create({
        type: "success",
        title: "Időpont elutasítva",
        closable: true,
      });

      router.refresh();
    },
    onError: (error: any) => {
      console.log({ ...error });
      toaster.create({
        type: "error",
        title: "Nem sikerült elutasítani az időpontot",
        description: error?.message || "Hiba történt",
      });
    },
  });

  return (
    <Box py={{ base: 10, md: 14 }}>
      <Container maxW="7xl">
        <VStack align="stretch" p={8} gap={6}>
          <HStack justify="space-between">
            <Heading size="lg">Admin Dashboard</Heading>
            <Button variant="outline" colorScheme="red" onClick={handleLogout}>
              Kijelentkezés
            </Button>
          </HStack>
          <Heading mb={2} fontWeight={800}>
            Admin
          </Heading>
          <Text color="gray.600" mb={6}>
            Áttekintés: időpontok, kapcsolatfelvételek, feliratkozások
          </Text>

          {/* quick stats */}
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} mb={8}>
            <Card.Root p={5} shadow="sm" borderColor="blackAlpha.100">
              <Card.Title>Időpontok</Card.Title>
              <Card.Description>
                <Heading size="lg">{appointments.length}</Heading>
              </Card.Description>
            </Card.Root>

            <Card.Root p={5} shadow="sm" borderColor="blackAlpha.100">
              <Card.Title>Kapcsolatfelvételek</Card.Title>
              <Card.Description>
                <Heading size="lg">{messages.length}</Heading>
              </Card.Description>
            </Card.Root>

            <Card.Root p={5} shadow="sm" borderColor="blackAlpha.100">
              <Card.Title>Hírlevél feliratkozók</Card.Title>
              <Card.Description>
                <Heading size="lg">{subscriptions.length}</Heading>
              </Card.Description>
            </Card.Root>
          </SimpleGrid>

          {/* search & actions */}
          <HStack mb={6} gap={3} flexWrap="wrap">
            <Input
              placeholder="Keresés (név, e-mail, telefon, megjegyzés...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              maxW={{ base: "full", md: "24rem" }}
            />
          </HStack>

          {/* Appointments */}
          <Card.Root mb={8} p={0} overflow="hidden" borderColor="blackAlpha.100">
            <Card.Header px={5} py={4}>
              <HStack justify="space-between" w="full">
                <HStack gap={3}>
                  <Heading size="md">Időpontok</Heading>
                  <Badge colorPalette="green">{apptFiltered.length}</Badge>
                </HStack>
                {/*  <Button onClick={exportAppointments} leftIcon={<IconDownload size={18} />} variant="subtle">
                Export (CSV)
              </Button> */}
              </HStack>
            </Card.Header>
            <Card.Body px={0} pb={0}>
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Név</Table.ColumnHeader>
                    <Table.ColumnHeader>E-mail</Table.ColumnHeader>
                    <Table.ColumnHeader>Telefon</Table.ColumnHeader>
                    <Table.ColumnHeader>Dátum</Table.ColumnHeader>
                    <Table.ColumnHeader>Idő</Table.ColumnHeader>
                    <Table.ColumnHeader>Időzóna</Table.ColumnHeader>
                    <Table.ColumnHeader>Státusz</Table.ColumnHeader> {/* NEW */}
                    <Table.ColumnHeader>Műveletek</Table.ColumnHeader> {/* NEW */}
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {apptFiltered.map((a) => (
                    <Table.Row key={String(a.id)}>
                      <Table.Cell>{a.name ?? "-"}</Table.Cell>
                      <Table.Cell>{a.email ?? "-"}</Table.Cell>
                      <Table.Cell>{a.phoneNumber ?? "-"}</Table.Cell>
                      <Table.Cell>{typeof a.date === "string" ? a.date : formatDate(a.date)}</Table.Cell>
                      <Table.Cell>{a.time}</Table.Cell>
                      <Table.Cell>{a.timezone ?? "Europe/Budapest"}</Table.Cell>
                      {/* Status badge */}
                      <Table.Cell>
                        <Badge colorPalette={statusColor(a.status)} variant="subtle">
                          {a.status ?? "PENDING"}
                        </Badge>
                      </Table.Cell>

                      {/* Actions menu (Chakra v3) */}
                      <Table.Cell>
                        <Menu.Root>
                          <Menu.Trigger asChild>
                            <Button
                              size="xs"
                              variant="outline"
                              rounded="full"
                              px="3"
                              bg="white"
                              borderColor="blackAlpha.300"
                              _hover={{ bg: "blackAlpha.50", borderColor: "blackAlpha.400" }}
                            >
                              Művelet
                            </Button>
                          </Menu.Trigger>
                          <Portal>
                            <Menu.Positioner>
                              {a.status === AppointmentStatus.PENDING && (
                                <Menu.Content>
                                  <Menu.Item onClick={() => handleAccept.mutate(a.id)} value="accept">
                                    Elfogadás
                                  </Menu.Item>
                                  <Menu.Item onClick={() => handleReject.mutate(a.id)} value="reject">
                                    Elutasítás
                                  </Menu.Item>
                                </Menu.Content>
                              )}
                            </Menu.Positioner>
                          </Portal>
                        </Menu.Root>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                  {!apptFiltered.length && (
                    <Table.Row>
                      <Table.Cell colSpan={6} textAlign="center" py={8}>
                        Nincs találat.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Root>
            </Card.Body>
          </Card.Root>

          {/* Contact messages */}
          <Card.Root mb={8} p={0} overflow="hidden" borderColor="blackAlpha.100">
            <Card.Header px={5} py={4}>
              <HStack justify="space-between" w="full">
                <HStack gap={3}>
                  <Heading size="md">Kapcsolatfelvételek</Heading>
                  <Badge colorPalette="blue">{msgFiltered.length}</Badge>
                </HStack>
                {/* <Button onClick={exportMessages} leftIcon={<IconDownload size={18} />} variant="subtle">
                Export (CSV)
              </Button> */}
              </HStack>
            </Card.Header>
            <Card.Body px={0} pb={0}>
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Név</Table.ColumnHeader>
                    <Table.ColumnHeader>E-mail</Table.ColumnHeader>
                    <Table.ColumnHeader>Üzenet</Table.ColumnHeader>
                    <Table.ColumnHeader>Érkezett</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {msgFiltered.map((m) => (
                    <Table.Row key={String(m.id)}>
                      <Table.Cell>{[m.firstName, m.lastName].filter(Boolean).join(" ") || "-"}</Table.Cell>
                      <Table.Cell>{m.email}</Table.Cell>
                      <Table.Cell maxW="lg">
                        <Text>{m.message ?? "-"}</Text>
                      </Table.Cell>
                      <Table.Cell>{formatDate(m.createdAt)}</Table.Cell>
                    </Table.Row>
                  ))}
                  {!msgFiltered.length && (
                    <Table.Row>
                      <Table.Cell colSpan={4} textAlign="center" py={8}>
                        Nincs találat.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Root>
            </Card.Body>
          </Card.Root>

          {/* Newsletter */}
          <Card.Root p={0} overflow="hidden" borderColor="blackAlpha.100">
            <Card.Header px={5} py={4}>
              <HStack justify="space-between" w="full">
                <HStack gap={3}>
                  <Heading size="md">Hírlevél feliratkozók</Heading>
                  <Badge colorPalette="purple">{subFiltered.length}</Badge>
                </HStack>
                {/*   <Button onClick={exportSubscriptions} leftIcon={<IconDownload size={18} />} variant="subtle">
                Export (CSV)
              </Button> */}
              </HStack>
            </Card.Header>
            <Card.Body px={0} pb={0}>
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>E-mail</Table.ColumnHeader>
                    <Table.ColumnHeader>Feliratkozott</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {subFiltered.map((s) => (
                    <Table.Row key={String(s.id)}>
                      <Table.Cell>{s.email}</Table.Cell>
                      <Table.Cell>{formatDate(s.createdAt)}</Table.Cell>
                    </Table.Row>
                  ))}
                  {!subFiltered.length && (
                    <Table.Row>
                      <Table.Cell colSpan={2} textAlign="center" py={8}>
                        Nincs találat.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Root>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
}
