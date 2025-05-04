"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {
  const [comment, setComment] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsCreated(false);

    if (!comment.trim()) {
      setError("Komentar tidak boleh kosong.");
      return;
    }

    const data = { anime_mal_id, user_email, comment, username, anime_title };

    try {
      const response = await fetch("/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.isCreate) {
        setIsCreated(true);
        setComment("");
        router.refresh();
      } else {
        setError("Gagal mengirim komentar.");
      }
    } catch (err) {
      console.error("Posting error:", err);
      setError("Terjadi kesalahan server.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto mt-8"
    >
      {isCreated && (
        <p className="text-green-400 text-center font-semibold">
          ✅ Komentar berhasil dikirim!
        </p>
      )}
      {error && (
        <p className="text-red-400 text-center font-medium">{error}</p>
      )}
      <textarea
        value={comment}
        onChange={handleInputChange}
        placeholder="Tulis komentar kamu di sini..."
        className="w-full h-32 p-3 rounded-md resize-none bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-400 transition-all mx-auto"
      >
        💬 Posting Komentar
      </button>
    </form>
  );
};

export default CommentInput;
