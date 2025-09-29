"use client";

import * as React from "react";
import { Box, Container, Heading, Text, SimpleGrid, Card, Button, HStack, Input, Badge, Table } from "@chakra-ui/react";
import { IconDownload } from "@tabler/icons-react";

// If you have Prisma client types, you can import them:
// import { Appointment, ContactMessage, NewsletterSubscription } from "@prisma/client";

// Minimal shapes to keep this portable
type Appointment = {
  id: string | number;
  name?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  notes?: string | null;
  date: Date | string; // from server
  time: string;
  timezone?: string | null;
  createdAt?: Date | string;
};

type ContactMessage = {
  id: string | number;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  message?: string | null;
  createdAt: Date | string;
};

type NewsletterSubscription = {
  id: string | number;
  email: string;
  createdAt: Date | string;
};

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

function toCSV(rows: Record<string, any>[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = (v: any) =>
    `"${String(v ?? "")
      .replace(/"/g, '""')
      .replace(/\n/g, " ")}"`;
  const lines = [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))];
  return lines.join("\n");
}

function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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

  const exportAppointments = () => {
    const csv = toCSV(
      apptFiltered.map((a) => ({
        id: a.id,
        name: a.name ?? "",
        email: a.email ?? "",
        phoneNumber: a.phoneNumber ?? "",
        date: typeof a.date === "string" ? a.date : a.date.toISOString(),
        time: a.time,
        timezone: a.timezone ?? "",
        notes: a.notes ?? "",
        createdAt: a.createdAt && typeof a.createdAt !== "string" ? a.createdAt.toISOString() : a.createdAt ?? "",
      }))
    );
    downloadCSV("appointments.csv", csv);
  };

  const exportMessages = () => {
    const csv = toCSV(
      msgFiltered.map((m) => ({
        id: m.id,
        firstName: m.firstName ?? "",
        lastName: m.lastName ?? "",
        email: m.email,
        message: m.message ?? "",
        createdAt: m.createdAt && typeof m.createdAt !== "string" ? m.createdAt.toISOString() : m.createdAt ?? "",
      }))
    );
    downloadCSV("contact_messages.csv", csv);
  };

  const exportSubscriptions = () => {
    const csv = toCSV(
      subFiltered.map((s) => ({
        id: s.id,
        email: s.email,
        createdAt: s.createdAt && typeof s.createdAt !== "string" ? s.createdAt.toISOString() : s.createdAt ?? "",
      }))
    );
    downloadCSV("newsletter_subscriptions.csv", csv);
  };

  return (
    <Box py={{ base: 10, md: 14 }}>
      <Container maxW="7xl">
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
      </Container>
    </Box>
  );
}
