import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shubhampatel.dev"),
  title: "Shubham Patel — Backend, Distributed Systems & Agentic AI",
  description:
    "Software engineer building production backend, multi-cloud, and agentic-AI systems. 1.5+ years shipping at Iolite. Open to SDE / AI engineer roles.",
  keywords: [
    "Shubham Patel",
    "Software Engineer",
    "Backend Engineer",
    "Agentic AI",
    "LangGraph",
    "RAG",
    "DevOps",
    "Multi-cloud",
    "Disaster Recovery",
    "Distributed Systems",
    "India",
    "Ahmedabad",
  ],
  authors: [{ name: "Shubham Patel" }],
  openGraph: {
    title: "Shubham Patel — Backend, Distributed Systems & Agentic AI",
    description:
      "Production backend, multi-cloud DR, and agentic-AI systems. Open to SDE / AI engineer roles.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham Patel — Backend, Distributed Systems & Agentic AI",
    description:
      "Production backend, multi-cloud DR, and agentic-AI systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased text-ink bg-paper">
        {children}
      </body>
    </html>
  );
}
