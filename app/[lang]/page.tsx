import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  return (
    <main>
      <div className="h-600"></div>
    </main>
  );
}
