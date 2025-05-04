import Image from "next/image";
import Link from "next/link";

const AnimeTrailer = ({ api }) => {
  if (!api || !api.data || api.data.length === 0) {
    return <p className="text-center py-10 text-gray-400">Anime tidak ditemukan.</p>;
  }

  return (
    <div className="grid gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {api.data.map((anime, index) => (
        <Link
          key={index}
          href={`/anime/${anime.mal_id}`}
          className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-rose-500/30 transition-all group"
        >
          <div className="relative w-full h-60">
            <Image
              src={anime.images?.webp?.image_url || "/fallback.jpg"}
              alt={anime.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-amber-300 font-semibold text-lg line-clamp-2 group-hover:text-rose-400 transition-colors">
              {anime.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AnimeTrailer;
