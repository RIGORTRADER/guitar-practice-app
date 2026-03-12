import type { Metadata } from "next";
import "./globals.css";

const themeInitScript = `
(() => {
  try {
    const savedTheme = window.localStorage.getItem("guitar-practice-theme");
    const theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;

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
    <html lang="tr" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
