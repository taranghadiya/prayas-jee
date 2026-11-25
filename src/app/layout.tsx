import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JEE Practice - National NTA CBT Examination & Preparation Platform",
  description:
    "Master JEE Main with official CBT interface simulation, full-length mock tests, chapter-wise questions, PYQs, and deep analytics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
