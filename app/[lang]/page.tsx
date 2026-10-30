import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import GalaxyAscii from "./components/galaxy-ascii";
import Terminal from "./components/terminal";

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main>
      <section id="intro" className="min-h-screen snap-start px-5 py-10 md:py-20 lg:py-25 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 rounded-sm border border-white lg:grid-cols-2 lg:gap-2">
          {/* art ascii galaxy */}
          <div className="flex justify-center text-xs md:text-sm overflow-hidden"><GalaxyAscii /></div>
          {/* terminal */}
          <div className="m-4 text-xs sm:text-base"><Terminal /></div>
        </div>
      </section>

      <section id="about" className="h-640">...</section>
      <section id="projects" className="h-640">...</section>
      <section id="contact" className="h-640">...</section>
    </main>
  );
}
