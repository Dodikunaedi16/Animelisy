"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearchInput = (event) => {
    const keyword = searchRef.current.value;
    if (!keyword || keyword.trim() === "") return;
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        placeholder="Cari anime..."
        className="bg-white text-black p-3 pl-10 pr-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
        ref={searchRef}
        onKeyDown={handleSearchInput}
      />
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-3 text-amber-500 hover:text-amber-700 transition-colors"
        onClick={handleSearchInput}
      >
        <MagnifyingGlass size={24} />
      </button>
    </div>
  );
};

export default InputSearch;
