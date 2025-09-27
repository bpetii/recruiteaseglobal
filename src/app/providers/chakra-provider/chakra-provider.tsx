"use client";

import { ChakraProvider as Provider } from "@chakra-ui/react";
import { system } from "../../theme";

const ChakraProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider value={system}>{children}</Provider>;
};

export default ChakraProvider;
