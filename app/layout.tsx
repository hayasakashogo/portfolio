import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { BackgroundWrapper } from "@/components/background/BackgroundWrapper";
import Footer from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/MobileMenu";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shogo Hayasaka — Portfolio",
  description:
    "フロントエンドエンジニアとして、UI/UXにこだわったWebの設計・実装に日々向き合っています。2025年には宅地建物取引士を取得。技術の枠にとどまらず、異分野にも手を伸ばしながら、自分だけの視座を持つエンジニアでありたいと考えています。"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
        >
          <SmoothScroll />
          <BackgroundWrapper />
          <MobileMenu />
          <div className="page-content">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
