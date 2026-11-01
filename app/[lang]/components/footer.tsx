import type { getDictionary } from "../dictionaries";

export default function Footer({ dict }: { dict: Awaited<ReturnType<typeof getDictionary>> }) {
    return (
        <footer className="snap-end border-t border-white/20 py-6 text-center">
            <p className="text-xs md:text-sm text-white/30">{dict.footer.copyright}</p>
        </footer>
    );
}