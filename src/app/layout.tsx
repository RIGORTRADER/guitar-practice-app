import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bugün Gitarda Ne Çalışsam?",
  description:
    "Günlük gitar çalışma planı oluştur, oturumlarını kaydet ve çalışma dengesini takip et.",
  applicationName: "Bugün Gitarda Ne Çalışsam?",
  keywords: [
    "gitar",
    "gitar çalışma planı",
    "günlük pratik",
    "gitar egzersizi",
    "practice tracker",
  ],
  openGraph: {
    title: "Bugün Gitarda Ne Çalışsam?",
    description:
      "Günlük gitar çalışma planı oluştur, oturumlarını kaydet ve çalışma dengesini takip et.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
