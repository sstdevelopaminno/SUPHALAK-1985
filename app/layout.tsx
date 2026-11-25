import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./visual-refresh.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://suphalak1985.com"),
  alternates: { canonical: "/" },
  title: "บริษัท ศุภลักษณ์ 1985 จำกัด | SUPHALAK 1985 CO., LTD.",
  description:
    "บริษัท ศุภลักษณ์ 1985 จำกัด ธุรกิจจำหน่ายสินค้าอุปโภคบริโภค ค้าปลีก ค้าส่ง และบริการจัดร้านค้า",
  applicationName: "SUPHALAK 1985",
  icons: { icon: "/images/lion.webp" },
  openGraph: {
    url: "https://suphalak1985.com/",
    type: "website",
    locale: "th_TH",
    title: "SUPHALAK 1985 CO., LTD.",
    description: "ค้าปลีก ค้าส่ง และบริการจัดร้านค้าแบบครบวงจร",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081c34",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
