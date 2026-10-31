import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import skills from "./dictionaries/skills.json";
import GalaxyAscii from "./components/galaxy-ascii";
import Terminal from "./components/terminal";
import Spotify from "./components/spotify";

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main>

      <section id="intro" className="min-h-screen snap-start scroll-mt-16 px-5 py-10 md:py-20 lg:py-25 md:px-14 lg:px-20">
        <div className="grid grid-cols-1 rounded-sm border border-white lg:grid-cols-2 lg:gap-2">
          {/* art ascii galaxy */}
          <div className="flex justify-center text-xs md:text-sm overflow-hidden"><GalaxyAscii /></div>
          {/* terminal */}
          <div className="m-4 text-xs sm:text-base"><Terminal /></div>
        </div>
      </section>

      <section id="about" className="min-h-screen snap-start px-5 py-15 md:px-20 lg:px-30">
        <h2>{dict.about.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-0 md:space-y-8">
          {/* zone 1 */}
          <div className="space-y-4 md:space-y-8"> 
            {/* music design */}
            <div className="border-3 border-white/75 space-y-8 px-4 pt-4">
              {/* vinyl image */}
              <div className="border-4 border-white overflow-hidden">
                <Image src="/vinyl.gif" alt="Spinning vinyl record" width={1000} height={200} loading="eager" />
              </div>
              {/* spotify */}
              <Spotify />
            </div>
            {/* buildings skills */}
            <div className="border-2 border-t-white border-l-white/50 border-r-white/25 border-b-white/15">
              <div className="border-3 border-white/75 ">
                <p className="bg-white/75 font-pixel text-xs text-black md:text-sm px-4 py-2">[!] BUILDING MY SKILLS_</p>
                <p className="font-bold text-sm text-white/90 md:text-base px-4 pt-4 pb-2">{dict.about["building-skills-description"]}</p>
                <div className="flex flex-wrap gap-2 px-4 pt-2 pb-4">
                  <div className="border-2 border-t-white border-l-white/50 border-r-white/25 border-b-white/15">
                    <a href="https://tryhackme.com/p/xhy22x" target="_blank" rel="noopener noreferrer" className="block uppercase font-pixel bg-white/80 text-xs text-black hover:text-black/80 hover:bg-white/75 px-1 py-2">
                      [tryhackme]
                    </a>
                  </div>
                  <div className="border-2 border-t-white border-l-white/50 border-r-white/25 border-b-white/15">
                    <a href="https://www.root-me.org/xhy22x" target="_blank" rel="noopener noreferrer" className="block uppercase font-pixel bg-white/80 text-xs text-black hover:text-black/80 hover:bg-white/75 px-1 py-2">
                      [root-me]
                    </a>
                  </div>
                  <div className="border-2 border-t-white border-l-white/50 border-r-white/25 border-b-white/15">
                    <a href="https://profile.hackthebox.com/profile/019e6341-4902-72a5-a53a-6005fc01024c" target="_blank" rel="noopener noreferrer" className="block uppercase font-pixel bg-white/80 text-xs text-black hover:text-black/80 hover:bg-white/75 px-1 py-2">
                      [hackthebox]
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* zone 2 */}
          <div className="border-3 border-white/75 p-4 space-y-8">
            <div>
              <h2 className="uppercase mb-2">// Name</h2>
              <p className="text-white/80"> [@] Célia XU</p>
            </div>
            <div>
              <h2 className="uppercase">&gt; Education</h2>
              <hr className="border-1 border-white my-2" />
              <ul className="list-none">
                {dict.about["education-details"].map((element) => (
                  <li key={element} className="text-white/80 text-sm md:text-base">
                    {element ? `[+] ${element}` : "\u00A0"}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="uppercase">&gt; Interests</h2>
              <hr className="border-1 border-white my-2" />
              <ul className="list-none">
                {dict.about.interests.map((interest) => (
                  <li key={interest} className="text-white/80 text-sm md:text-base">
                    [+] {interest}
                  </li>
                ))}
              </ul>
            </div>
            <div className="font-sans">
              <h2 className="uppercase">[+] Skills</h2>
              <hr className="border-1 border-white mt-2 mb-4" />
              <ul className="flex flex-wrap gap-2 list-none">
                {skills.map((element) => (
                  <li key={element} className="border-[1.5px] bg-white/10 border-white/5 text-xs md:text-sm px-2 py-[5px]">
                    {element}
                  </li>
                ))}    
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="h-640">...</section>
      <section id="contact" className="h-640">...</section>
    </main>
  );
}
