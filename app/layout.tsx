import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "xhy22x.exe",
  description: "Personal portofolio of xhy22x",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
