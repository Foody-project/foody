import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import ReactQueryProvider from "@/utils/ReactQueryComponent";
import ClientProviders from "@/ClientProviders";
import "../globals.css";

export const metadata: Metadata = {
  title: "Unauthorized",
};

const funnel = Funnel_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={funnel.className}>
      <body style={{ minHeight: "100vh" }} className="dark">
        <ReactQueryProvider>
          <ClientProviders>{children}</ClientProviders>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
