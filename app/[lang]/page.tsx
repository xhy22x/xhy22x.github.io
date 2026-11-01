import Image from "next/image";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import { getDictionary, hasLocale } from "./dictionaries";
import { FaGithub, FaLinkedin, FaEnvelope, FaFile } from "react-icons/fa";
import skills from "./dictionaries/skills.json";
import GalaxyAscii from "./components/galaxy-ascii";
import Terminal from "./components/terminal";
import Spotify from "./components/spotify";
import { FaA } from "react-icons/fa6";

type repo = {
  id: number
  name: string
  html_url: string
  pushed_at: string
  description: string | null
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  'use cache'
  cacheLife('hours')
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  const username = 'xhy22x'
  const repos: repo[] = []
  for (let page = 1; ; page++) {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}`)
    if (!res.ok) throw new Error(`Erreur Github : ${res.status}`)
    const batch: repo[] = await res.json()
    repos.push(...batch)
    if (batch.length < 100) break
  }

  const reposWithLanguages = await Promise.all(
    repos.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/languages`)
      if (!res.ok) throw new Error(`Github error: ${res.status}`)
      const languages: Record<string, number> = await res.json()
      return { ...repo, languages }
    })
  )

  reposWithLanguages.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())

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
                    <a href="https://profile.hackthebox.com/profile/019e6341-4902-72a5-a53a-6005fc01024c?utm_medium=copy_url" target="_blank" rel="noopener noreferrer" className="block uppercase font-pixel bg-white/80 text-xs text-black hover:text-black/80 hover:bg-white/75 px-1 py-2">
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

      <section id="projects" className="min-h-screen snap-start px-5 py-15 md:px-20 lg:px-30">
        <h2>{dict.projects.title}</h2>
        <div>
          {reposWithLanguages.map((repo) => (
            <article key={repo.id} className="font-pixel text-sm my-4">
              <details name="github-repositories" className="smooth-details group">
                <summary className="flex cursor-pointer list-none justify-between group-hover:text-red-900">
                  <span className="text-[10px] sm:text-xs">{repo.name}/</span>
                </summary>
                
                {/* repository information */}
                <div className="border border-white/20 mt-3 mx-2 p-2">
                  <p className="font-pixel border-b border-white/20 text-[10px] text-white/30 uppercase sm:text-[11px] pb-1 mb-2">[“] {dict.projects["repo-info"]}</p>
                  <p className="font-sans text-[10px] text-white/40 uppercase sm:text-xs">{dict.projects.description}</p>
                  <p className={`font-sans text-xs mt-1.5 mb-3 ${repo.description?.trim() ? "text-white/70" : "border-l-2 pl-1 text-red-900/80"}`}>{repo.description?.trim() || dict.projects["no-description"]}</p>
                  <p className="font-sans text-[10px] text-white/40 uppercase sm:text-xs">{dict.projects.lang}</p>
                  <ul className="font-sans flex flex-wrap gap-2 mt-1.5 mb-3">
                      {Object.keys(repo.languages ?? {}).length > 0 ? (
                          Object.keys(repo.languages).map((language) => (
                              <li key={`${repo.id}-${language}`} className="border border-white/10 bg-white/10 px-1 py-0.5 text-[10px] text-white/60 sm:text-xs">
                                  {language}
                              </li>
                          ))) : (<li className="text-red-900/80 border-l-2 pl-1 my-1">{dict.projects["not-specified"]}.</li>)}
                  </ul>  
                  <a href={repo.html_url} target="blank_" rel="noopener noreferrer" className="ml-auto flex w-fit items-center gap-2 border-2 border-t-white/20 border-l-white/10 border-r-black/25 border-b-black/50 bg-white/10 font-sans uppercase text-xs text-white/75 transition-all duration-350 ease-out hover:text-white hover:border-t-white/2 hover:border-l-white/4 hover:border-r-white/10 hover:border-b-white/15 hover:bg-white/5 active:translate-y-px active:scale-[0.98] active:bg-white/10 active:text-white active:border-t-black/40 active:border-l-black/40 active:border-r-white/20 active:border-b-white/20 px-2 py-1 mt-4 sm:mt-2"><FaGithub /><span>{dict.projects["view-repo"]}</span></a>
                </div>
              </details>
              <hr className="border-white/10 mt-4" />
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="min-h-screen snap-start px-5 py-15 md:px-20 lg:px-30">
        <h2>contact</h2> 
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* contact details */}
            <div className="space-y-8">
              <p className="text-xs sm:text-base">{dict.contact.description}</p>
              <div className="flex gap-6 justify-center md:justify-start">
                <a href="https://github.com/xhy22x" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 hover:bg-white/5"><FaGithub size={20} /></a>
                <a href="https://www.linkedin.com/in/xhy22x/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 hover:bg-white/5"><FaLinkedin size={20} /></a>
                <a href="mailto:celia.xu@oteria.fr" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/60 hover:bg-white/5"><FaEnvelope size={20} /></a>
              </div>
            </div>
            {/* decorative image */}
            <div className="flex items-start justify-end">
              <Image src="/sword.jpg" alt="sword" width={450} height={40} className="h-auto w-[300px] sm:w-[350px] md:w-[450px]" />
            </div>
          </div>
          {/* CV */}
          <div className="flex justify-center">
            <a href="https://drive.google.com/drive/folders/1LEiDW2rybWE53Q6Ax6GWttbpJFQ61kHR?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex w-full justify-center items-center gap-2 rounded-md bg-white/5 border border-white/10 shadow-[0_0_8px_rgba(255,255,255,0.10)] hover:bg-white/8 py-4">
              <FaFile size={20} />
              <span className="uppercase">{dict.contact["cv-link"]}</span>
            </a>
          </div>
        </div>   
      </section>
    </main>
  );
}
