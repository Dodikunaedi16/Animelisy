import prisma from '@/libs/prisma';
import React from 'react';

const CommentBox = async ({ anime_mal_id }) => {
  const comments = await prisma.comment.findMany({
    where: { anime_mal_id },
    orderBy: { id: 'desc' }, // agar komentar terbaru muncul di atas
  });

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h3 className="text-xl font-semibold text-amber-500 mb-4">Komentar</h3>
      {comments.length === 0 ? (
        <p className="text-gray-400 italic text-center">Belum ada komentar.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
            >
              <p className="text-amber-400 font-semibold">{comment.username}</p>
              <p className="text-white mt-1">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
