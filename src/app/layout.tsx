import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "健康雑学ブログ - 健康に関する役立つ情報をお届け",
  description: "最新の科学で解明された健康にまつわる知識を発信。幸せの第一歩は自分の体から。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Preconnect for microCMS images */}
        <link rel="preconnect" href="https://images.microcms-assets.io" crossOrigin="anonymous" />
        <GoogleAnalytics />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 bg-white">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
