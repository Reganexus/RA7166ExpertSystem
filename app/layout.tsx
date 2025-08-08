import type { Metadata } from "next";
import { Merriweather_Sans } from "next/font/google";
import "./globals.css";

const merritweather = Merriweather_Sans({
  variable: "--font-merritweather-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RA7166 Expert System",
  description: "An Expert System for the Republic Act 7166 of the Philippines for Electoral Offenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merritweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
