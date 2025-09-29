"use client";

import { useState } from "react";
import { Box, Button, Container, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { login } from "@/services/apiServices";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const router = useRouter();

  const submit = async () => {
    setErr(null);
    setLoading(true);
    try {
      await login(password);

      router.push("/admin");
      router.refresh();
    } catch (e: any) {
      setErr(e.message || "Ismeretlen hiba");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="sm" py={24}>
      <VStack gap={6} align="stretch">
        <Heading size="lg" textAlign="center">
          Admin belépés
        </Heading>
        <Box>
          <Text mb={2} fontWeight="600">
            Jelszó
          </Text>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
        </Box>
        {err && (
          <Text color="red.500" fontSize="sm">
            {err}
          </Text>
        )}
        <Button onClick={submit} disabled={!password} loading={loading} bg="black" color="white" _hover={{ bg: "blackAlpha.800" }}>
          Belépés
        </Button>
      </VStack>
    </Container>
  );
}
