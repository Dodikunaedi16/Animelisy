import Header from '@/Components/Dashboard/Header';
import { autUserSession } from '@/libs/auth-libs';
import prisma from '@/libs/prisma';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
  const user = await autUserSession();

  if (!user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-xl font-semibold">
        Kamu belum login.
      </div>
    );
  }

  const comments = await prisma.comment.findMany({
    where: { user_email: user.email },
    orderBy: { id: 'desc' },
  });

  return (
    
    <>
     <Header title="My Comment" />
      <div className="p-6 min-h-screen bg-gray-950">

{comments.length === 0 ? (
  <div className="flex flex-col items-center justify-center text-white mt-20">
    <MessageCircle size={64} className="text-gray-500 mb-4" />
    <p className="text-lg">Belum ada komentar yang kamu buat.</p>
  </div>
) : (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {comments.map((comment) => (
      <Link
        href={`/anime/${comment.anime_mal_id}`}
        key={comment.id}
        className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
      >
        <h2 className="text-xl font-semibold text-amber-300 mb-2 truncate">
          {comment.anime_title}
        </h2>
        <p className="text-white text-sm line-clamp-4">{comment.comment}</p>
        <div className="mt-4 text-xs text-gray-500">
          MAL ID: {comment.anime_mal_id}
        </div>
      </Link>
    ))}
  </div>
)}
</div>
    </>
    
  );
};

export default Page;
