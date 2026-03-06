import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "L DHANUSH RAJ",
  description: "AI Enthusiast, Developer & Entrepreneur",
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased overflow-x-hidden bg-white text-[#333333]">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
