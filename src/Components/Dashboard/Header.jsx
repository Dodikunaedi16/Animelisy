"use client";
import { SquareArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ title }) => {
  const router = useRouter();

  const hendelBack = (event) => {
    event.preventDefault();
    router.back();
  };

  return (
    <header className="w-full py-6 bg-gray-900 text-center border-b border-gray-700 shadow-sm">
      <div className="flex justify-center items-center gap-2 mb-1">
        <SquareArrowUpRight className="text-amber-500 animate-bounce" size={20} />
        <button
          className="text-sm tracking-widest text-amber-500 font-semibold"
          onClick={hendelBack}
        >
          Koleksi App
        </button>
      </div>
      <h3 className="text-3xl font-bold text-amber-50 tracking-wide">{title}</h3>
    </header>
  );
};

export default Header;
