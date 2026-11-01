import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export const metadata: Metadata = {
  title: "xhy22x.exe",
  description: "Personal portfolio of xhy22x",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default async function RootLayout({ children, params, }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <html lang={lang} className="h-full antialiased snap-y snap-proximity scroll-smooth">
      <body className="min-h-full flex flex-col">
        <Navbar dict={dict} />
        {children}
        <Footer dict={dict} />
      </body>
    </html>
  );
}
