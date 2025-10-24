import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Li Lab - The Ohio State University",
  description: "Dr. Haichang Li's research laboratory at The Ohio State University College of Veterinary Medicine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/osulogofavicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/osulogofavicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/osulogofavicon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/osulogofavicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/osulogofavicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/osulogofavicon/android-chrome-512x512.png" />
        <link rel="manifest" href="/osulogofavicon/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
