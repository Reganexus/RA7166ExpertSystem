import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], 
  variable: "--font-lato", 
});

export const metadata: Metadata = {
  title: "RA7166 Expert System",
  description: "An Expert System for the Republic Act 7166 of the Philippines for Electoral Offenses",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
