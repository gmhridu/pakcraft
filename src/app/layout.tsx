import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PakCrafteds – Handcrafted Quality for Everyday Living",
  description:
    "An online store delivering carefully curated handcrafted goods from around the world. Shop premium leather goods, kitchenware, home decor, fashion accessories, and more.",
  keywords: [
    "PakCrafteds",
    "handcrafted",
    "artisan",
    "leather goods",
    "kitchenware",
    "home decor",
    "gifts",
    "premium quality",
  ],
  authors: [{ name: "PakCrafteds" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "PakCrafteds – Handcrafted Quality for Everyday Living",
    description:
      "An online store delivering carefully curated handcrafted goods from around the world",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
