"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { getDictionary } from "../dictionaries";

export default function Navbar({ dict }: { dict: Awaited<ReturnType<typeof getDictionary>> }) {
    const pathname = usePathname();
    const lang = pathname.split("/")[1];
    const nextLang = lang === "en" ? "fr" : "en";

    const [activeSection, setActiveSection] = useState("");
    const [isVisible, setVisible] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const scrollAtY = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {console.log('Active section:', entry.target.id) ; setActiveSection(entry.target.id);}
                })
            }, { rootMargin: '-45% 0px -45% 0px' }
        )
        document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [pathname])

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.8);
            if (isOpen && Math.abs(window.scrollY - scrollAtY.current) >= 50) setOpen(false);
        };
        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();
        return () => { window.removeEventListener("scroll", handleScroll);}
    }, [isOpen]);

    useEffect(() => {
        const savedScroll = sessionStorage.getItem("scrolling");
        if (savedScroll === null) return;
        requestAnimationFrame(() => {
            window.scrollTo(0, Number(savedScroll));
            sessionStorage.removeItem("scrolling");
        })
    }, []);

    function toogleMenu() {
        if (!isOpen) scrollAtY.current = window.scrollY;
        setOpen(!isOpen);
    }

    return (
        <nav className={`fixed top-0 w-full z-50 flex justify-between items-center bg-background border-b border-b-white p-4 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} `}>
            <a href="#" className="font-pixel text-sm m-1">
                @xhy22x
            </a>
            <div className="flex gap-4">
                <div className={`absolute top-full left-0 z-40 w-full bg-black border-b border-b-white transition-all duration-300 ease-in-out md:static md:w-auto md:border-b-0 md:bg-transparent md:translate-y-0 md:opacity-100 md:pointer-events-auto md:transition-none ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-0 opacity-0 pointer-events-none"} `}>
                    <div className={`${isOpen ? "flex" : "hidden"} flex-col mx-4 mb-4 gap-3 md:flex md:flex-row md:m-0 md:gap-6`}>
                        <a href="#about" className={`transition-colors duration-300 ease-in-out hover:text-white ${activeSection === 'about' ? 'text-white' : 'text-white/60'}`} onClick={() => setOpen(false)}>{dict.navbar.about}</a>
                        <a href="#projects" className={`transition-colors duration-300 ease-in-out hover:text-white ${activeSection === 'projects' ? 'text-white' : 'text-white/60'}`} onClick={() => setOpen(false)}>{dict.navbar.projects}</a>
                        <a href="#contact" className={`transition-colors duration-300 ease-in-out hover:text-white ${activeSection === 'contact' ? 'text-white' : 'text-white/60'}`} onClick={() => setOpen(false)}>{dict.navbar.contact}</a>
                    </div>
                </div>
                <button className="cursor-pointer rounded-sm border border-white/10 bg-white/3 hover:bg-white/6 duration-400 px-2" onClick={() => {sessionStorage.setItem("scrolling", String(window.scrollY)); const path = pathname.replace(`/${lang}`, `/${nextLang}`); window.location.assign(path + window.location.search)}}>
                    {nextLang.toUpperCase()}
                </button>
                <button className="cursor-pointer rounded-xs border border-white hover:bg-white/6 duration-400 w-8 md:hidden" onClick={toogleMenu} >
                    {isOpen ? "X" : "☰"}
                </button>
            </div>
        </nav>
    );
}