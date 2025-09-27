"use client";

import { Box, Container, Grid, GridItem, Heading, Text, VStack, HStack, Image, Input, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <Box>
      <Container py={{ base: 14, md: 20 }}>
        <Heading as="h2" textAlign={{ base: "left", md: "center" }} fontSize={{ base: "3xl", md: "5xl" }} mb={{ base: 8, md: 12 }} fontWeight="700">
          Lépj kapcsolatba velünk!
        </Heading>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1.2fr" }} gap={{ base: 8, md: 12 }} alignItems="start">
          {/* Left: Image */}
          <GridItem>
            <Box bg="gray.100" rounded="lg" overflow="hidden" shadow="sm">
              <Image src="/contact.jpg" /* replace with your image */ alt="Kapcsolat" w="100%" h={{ base: "240px", md: "520px" }} objectFit="cover" />
            </Box>
          </GridItem>

          {/* Right: Form */}
          <GridItem>
            <VStack align="stretch" gap={6}>
              {/* Name row */}
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="600">Név</Text>
                </HStack>
                <HStack gap={4}>
                  <Box flex="1">
                    <Text mb={2} color="gray.700" fontSize="sm">
                      First Name
                    </Text>
                    <Input name="firstName" value={form.firstName} onChange={onChange} />
                  </Box>
                  <Box flex="1">
                    <Text mb={2} color="gray.700" fontSize="sm">
                      Last Name
                    </Text>
                    <Input name="lastName" value={form.lastName} onChange={onChange} />
                  </Box>
                </HStack>
              </Box>

              {/* Email */}
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="600">E-mail cím</Text>
                </HStack>
                <Input type="email" name="email" value={form.email} onChange={onChange} />
              </Box>

              {/* Message */}
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="600">Üzenet</Text>
                </HStack>
                <Textarea name="message" value={form.message} onChange={onChange} minH="180px" resize="vertical" />
              </Box>

              <Button alignSelf="flex-start" rounded="full" bg="black" color="white" px={8} h="12" _hover={{ bg: "blackAlpha.800" }}>
                KÜLDÉS
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
