import Link from "next/link";
import Image from "next/image";
import Header from "@/Components/Dashboard/Header";
import { autUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";

const Page = async () => {
  const user = await autUserSession();
  const collection = await prisma.collection.findMany({
    where: { user_email: user.email },
  });

  return (
    <section className="mt-6 px-4 w-full">
      <Header title="My Collection" />

      {collection.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">
          Koleksi kamu masih kosong 😢
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {collection.map((collect, index) => (
            <Link
              key={index}
              href={`/anime/${collect.anime_mal_id}`}
              className="group relative border-2 border-amber-400 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={collect.anime_image || "/placeholder.jpg"}
                alt={collect.anime_title || "Anime"}
                width={400}
                height={400}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 w-full bg-amber-400 bg-opacity-90 h-16 flex items-center justify-center">
                <h5 className="text-lg text-black font-semibold text-center px-4 truncate">
                  {collect.anime_title || "Judul Tidak Diketahui"}
                </h5>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
