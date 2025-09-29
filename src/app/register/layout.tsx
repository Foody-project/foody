import { Funnel_Display } from "next/font/google";

export const metadata = {
  title: "Register - Foody",
};

const funnel = Funnel_Display({
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
    <html lang="en" className={funnel.className}>
      <body style={{ minHeight: "100vh" }} className="dark">
        {children}
      </body>
    </html>
  );
}
