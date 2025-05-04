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

  const anime = await getAnimeRespons(`anime/${id}`);
  const user = await autUserSession();

  const collection = await prisma.collection.findFirst({
    where: {
      user_email: user?.email,
      anime_mal_id: id,
    },
  });

  const data = anime?.data;

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

const InfoCard = ({ title, value }) => (
  <div className="min-w-[90px] text-center rounded border border-white p-2 bg-gray-800 text-white shadow-sm">
    <h3 className="text-xs font-semibold uppercase">{title}</h3>
    <p className="text-sm">{value || "-"}</p>
  </div>
);

export default Page;
