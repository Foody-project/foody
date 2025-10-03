"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ReactQueryProvider from "@/utils/ReactQueryComponent";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}
