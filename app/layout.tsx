import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const heading = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Onel Farmz | 80% Organic Broiler Chickens",
  description: "The premier source for ethically-raised, premium organic broiler chickens in Minna, Niger State.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}