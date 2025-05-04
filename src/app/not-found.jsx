"use client";

import { FileSearch } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const Notfound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="text-center space-y-6">
        <FileSearch size={64} className="mx-auto text-amber-500 animate-pulse" />
        <h1 className="text-4xl font-bold text-amber-500">404 - Not Found</h1>
        <button
          onClick={() => router.back()}
          className="mt-4 px-5 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Notfound;
