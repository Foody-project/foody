import { Funnel_Display, Lexend } from "next/font/google";
import ReactQueryProvider from "@/utils/ReactQueryComponent";
import ClientProviders from "@/ClientProviders";

export const metadata = {
  title: "Discover - Foody",
};

const funnel = Funnel_Display({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const lexend = Lexend({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${funnel.className} ${lexend.className}`}>
      <ReactQueryProvider>
        <ClientProviders>
          <body>{children}</body>
        </ClientProviders>
      </ReactQueryProvider>
    </html>
  );
}
