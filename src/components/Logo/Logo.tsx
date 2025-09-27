import { Box, Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Box display="flex" alignItems="flex-start" fontWeight="bold">
      <Text fontSize="2xl" letterSpacing="wide">
        RECRUITEASE
      </Text>
      <Text fontSize="xs" ml="1" mt="-1" fontWeight="semibold">
        global
      </Text>
    </Box>
  );
}
