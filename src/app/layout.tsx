import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { cookies } from "next/headers";
import { ToastContainer } from "@/lib/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Migrate Mate | Profile"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Build preloaded redux state from cookies on the server to avoid hydration mismatch
  const cookieStore = await cookies();
  const hasFoundJobCookie = cookieStore.get("hasFoundJob")?.value;
  const step1Raw = cookieStore.get("cancelStep1")?.value;
  const initialState: Record<string, unknown> = {};
  if (hasFoundJobCookie !== undefined) {
    initialState.foundJob = { hasFoundJob: hasFoundJobCookie === "true" };
  }
  if (step1Raw) {
    try {
      initialState.cancelFlow = { step1: JSON.parse(step1Raw) };
    } catch {}
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}
      >
        <Providers initialState={initialState}>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
