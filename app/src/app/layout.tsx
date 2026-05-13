import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "International Diploma — Immersive Language Learning for Global Certification",
  description:
    "Learn French, German & Japanese through immersive AI-powered training. Prepare for DELF, Goethe-Zertifikat, and JLPT certifications with expert trainers. Join 12,000+ students at ISML.",
  keywords: "French learning, German learning, Japanese learning, DELF preparation, Goethe certification, JLPT preparation, language immersion, AI language coach, international certification",
  openGraph: {
    title: "International Diploma — Immersive Language Learning for Global Certification",
    description: "AI-powered immersive learning for French, German & Japanese certifications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        {children}
      </body>
    </html>
  );
}
