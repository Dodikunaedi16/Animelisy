import { getAnimeRespons } from "@/libs/api-libs";
import VidioPlayer from "@/Components/utilites/VidioPlayer";
import Image from "next/image";
import CollectionButton from "@/Components/AnimeTrailer/CollectionButton";
import { autUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import CommentInput from "@/Components/AnimeTrailer/CommentInput";
import CommentBox from "@/Components/AnimeTrailer/CommentBox";

const Page = async ({ params }) => {
  const { id } = params;

  // Ambil data anime
  let anime = null;
  try {
    anime = await getAnimeRespons(`anime/${id}`);
  } catch (err) {
    console.error("Gagal mengambil data anime:", err);
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-500">
          Terjadi kesalahan saat memuat anime.
        </h1>
      </div>
    );
  }

  const data = anime?.data;
  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-yellow-500">
          Anime tidak ditemukan.
        </h1>
      </div>
    );
  }

  // Ambil session user
  let user = null;
  try {
    user = await autUserSession();
  } catch (err) {
    console.error("Gagal mengambil session user:", err);
  }

  // Ambil data koleksi dari database
  let collection = null;
  if (user?.email) {
    try {
      collection = await prisma.collection.findFirst({
        where: {
          user_email: user.email,
          anime_mal_id: id,
        },
      });
    } catch (err) {
      console.error("Gagal mengambil koleksi:", err);
    }
  }

  return (
    <>
      <div className="pt-4 px-4">
        <h3 className="text-xl font-bold">
          {data.title} - {data.year || "Tahun tidak diketahui"}
        </h3>

        {!collection && user && (
          <CollectionButton
            anime_mal_id={id}
            user_email={user.email}
            anime_image={data.images.webp.image_url}
            anime_title={data.title}
          />
        )}
      </div>

      <div className="pt-4 px-4 flex gap-2 overflow-x-auto">
        <InfoCard title="PERINGKAT" value={data.rank} />
        <InfoCard title="SKOR" value={data.score} />
        <InfoCard title="ANGGOTA" value={data.members} />
        <InfoCard title="EPISODE" value={data.episodes} />
        <InfoCard title="RATING" value={data.rating} />
        <InfoCard title="DURASI" value={data.duration} />
      </div>

      <div className="pt-4 px-4 flex gap-4 sm:flex-nowrap flex-wrap">
        <Image
          src={data.images.webp.image_url}
          alt={`Poster ${data.title}`}
          width={250}
          height={350}
          className="rounded object-cover w-full max-w-[250px]"
        />
        <p className="text-justify text-lg leading-relaxed">
          {data.synopsis || "Sinopsis tidak tersedia."}
        </p>
      </div>

      <div className="pt-6 px-4">
        <VidioPlayer youtubeid={data.trailer?.youtube_id} />
      </div>

      <div className="pt-6 px-4 space-y-6">
        {user && (
          <CommentInput
            anime_mal_id={id}
            user_email={user.email}
            username={user?.name}
            anime_title={data.title}
          />
        )}

        <CommentBox anime_mal_id={id} />
      </div>
    </>
  );
};

// Komponen InfoCard tetap sama
const InfoCard = ({ title, value }) => (
  <div className="min-w-[90px] text-center rounded border border-white p-2 bg-gray-800 text-white shadow-sm">
    <h3 className="text-xs font-semibold uppercase">{title}</h3>
    <p className="text-sm">{value || "-"}</p>
  </div>
);

export default Page;
