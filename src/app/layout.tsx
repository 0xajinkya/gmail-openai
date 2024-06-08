import type { Metadata } from "next";
import "./globals.css";
import { AllProviders } from "@/components";

export const metadata: Metadata = {
  metadataBase: new URL("https://fannymagnet.vercel.app"),
  title: "Gmail - OpenAI",
  description: "Simpifying your gmails using AI.",
  applicationName: "Gmail - OpenAI",
  authors: [
    {
      url: "https://linkedin.com/in/0xajinkya",
      name: "Ajinkya",
    },
  ],
  creator: "Gmail - OpenAI",
  robots: {
    googleBot: {
      index: true,
      follow: true,
      noarchive: false,
      nosnippet: false,
      noimageindex: true,
      nocache: false,
      notranslate: true,
      indexifembedded: false,
      nositelinkssearchbox: true,
      unavailable_after: "2025-01-01",
      "max-video-preview": 120,
      "max-image-preview": "standard",
      "max-snippet": 150,
    },
  },
  openGraph: {
    type: "website",
    title: "Gmail - OpenAI",
    description: "Simpifying your gmails using AI.",
    siteName: "Gmail - OpenAI",
    url: "https://fannymagnet.vercel.app",
  },
  themeColor: "#010120",
  keywords: [
    "Gmail",
    "OpenAI",
    "mail",
    "ai",
    "super ai",
    "gmail and ai",
    "dall-e",
    "chat gpt",
  ],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
