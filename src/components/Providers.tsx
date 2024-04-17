"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
