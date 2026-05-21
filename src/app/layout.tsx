import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://swayday.com"
  ),
  title: "SWAYDAY — Liveband",
  description:
    "SWAYDAY är ett modernt liveband som spelar på bröllop, företagsevent och konserter. Boka oss för din nästa kväll.",
  openGraph: {
    title: "SWAYDAY",
    description: "Modernt liveband — bröllop, företagsevent, konserter",
    images: ["https://pub-9e5c7500d8b14a3196c2f3c24474759b.r2.dev/logo/swaydaylogo_full_res_VIT.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sv"
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-brand-dark text-white font-body antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
