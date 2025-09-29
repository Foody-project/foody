import ReactQueryProvider from "../../utils/ReactQueryComponent";
import { Funnel_Display, Lexend } from "next/font/google";

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
        <body>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
