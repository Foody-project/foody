import type { Metadata } from "next";
import ReactQueryProvider from "../../lib/ReactQueryComponent";
import "../globals.css";

export const metadata: Metadata = {
  title: "Home - Find",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }} className="dark">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
