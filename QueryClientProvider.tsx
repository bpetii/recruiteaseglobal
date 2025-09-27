"use client";

import { getQueryClient } from "@/app/queryClients";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return <ReactQueryClientProvider client={getQueryClient()}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
