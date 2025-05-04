"use client";

import React, { useEffect, useState } from "react";
import HeaderMenu from "@/Components/utilites/HeaderMenu";
import Pagination from "@/Components/utilites/Pagination";
import AnimeTrailer from "@/Components/AnimeTrailer";
import { getAnimeRespons } from "@/libs/api-libs";

const Page = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const populerAnime = await getAnimeRespons("top/anime", `page=${page}`);
    setTopAnime(populerAnime);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 py-10 px-4 md:px-8 lg:px-16 space-y-8">
      <HeaderMenu
        title={`🎬 Anime Terpopuler - Halaman ${page}`}
        className="text-2xl font-bold text-amber-400 text-center"
      />

      {isLoading ? (
        <p className="text-center text-white py-12 animate-pulse">
          Memuat data anime...
        </p>
      ) : (
        <AnimeTrailer api={topAnime} />
      )}

      <Pagination
        page={page}
        lastPage={topAnime?.pagination?.last_visible_page || 1}
        setPage={setPage}
      />
    </main>
  );
};

export default Page;
