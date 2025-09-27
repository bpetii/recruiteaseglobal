// src/utils/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

let globalQueryClient: QueryClient | null = null;

export const getQueryClient = () => {
  if (!globalQueryClient) {
    globalQueryClient = new QueryClient();
  }
  return globalQueryClient;
};
