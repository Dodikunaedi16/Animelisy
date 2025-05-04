import Header from "@/Components/AnimeTrailer/Header";
import AnimeTrailer from "@/Components/AnimeTrailer";
import {
  getAnimeRespons,
  getNestedAnimeRespons,
  reproduce,
} from "@/libs/api-libs";

const Page = async () => {
  const topAnime = await getAnimeRespons("top/anime", "limit=8");
  let recomendedAnime = await getNestedAnimeRespons(
    "recommendations/anime",
    "entry"
  );

  recomendedAnime = reproduce(recomendedAnime, 8);

  return (
    <main className="space-y-12 px-4 md:px-8 lg:px-16 py-10 bg-gradient-to-b from-gray-950 via-black to-gray-900 min-h-screen">
      {/* Anime Terpopuler */}
      <section>
        <Header
          title="🔥 Paling Populer"
          linkTitle="Lihat Semua"
          linkHref="/populer"
        />
        <AnimeTrailer api={topAnime} />
      </section>

      {/* Anime Rekomendasi */}
      <section>
        <Header
          title="✨ Rekomendasi untuk Kamu"
          linkTitle="Lihat Semua"
          linkHref="/populer"
        />
        <AnimeTrailer api={recomendedAnime} />
      </section>
    </main>
  );
};

export default Page;
