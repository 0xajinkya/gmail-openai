import type { Metadata } from "next";
import "./globals.css";
import { AllProviders } from "@/components";


export const metadata: Metadata = {
  title: "Gmail - OpenAI",
  description: "Simpifying your gmails using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AllProviders>{children}</AllProviders>
      </body>
    </html>
  );
}
