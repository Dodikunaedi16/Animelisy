import { autUserSession } from "@/libs/auth-libs";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const user = await autUserSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center p-6">
      <div className="bg-gray-950 border border-gray-800 rounded-3xl shadow-lg p-10 w-full max-w-lg text-center transition-all hover:shadow-amber-500/40 hover:scale-[1.015] duration-300">
        
        {/* Profile Section */}
        <div className="flex justify-center mb-6">
          <Image
            src={user.image}
            alt={`${user.name}'s profile`}
            width={100}
            height={100}
            className="rounded-full ring-4 ring-amber-400 shadow-lg"
          />
        </div>

        {/* Welcome */}
        <h1 className="text-3xl font-bold text-amber-400 mb-1">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          Anda telah berhasil masuk ke dashboard Anda.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 mb-6">
          <Link
            href="/users/dashboard/collection"
            className="bg-amber-400 text-black font-semibold py-2.5 px-4 rounded-xl shadow-md hover:bg-amber-500 transition"
          >
            📁 My Collection
          </Link>
          <Link
            href="/users/dashboard/comments"
            className="bg-amber-400 text-black font-semibold py-2.5 px-4 rounded-xl shadow-md hover:bg-amber-500 transition"
          >
            💬 My Comments
          </Link>
        </div>

        {/* Back Button */}
        <Link href="/">
          <button className="text-sm text-gray-400 hover:text-amber-400 transition">
            ← Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
