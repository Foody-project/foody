import type { Metadata } from "next";
import "../globals.css";
import ReactQueryProvider from "../../lib/ReactQueryComponent";

export const metadata: Metadata = {
  title: "Discover - Find",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }} className="dark">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
