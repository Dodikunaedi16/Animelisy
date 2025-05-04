'use client'

import React, { useState } from 'react'

const CollectionButton = ({ anime_mal_id, user_email,anime_image, anime_title }) => {
  const [isCreated, setIsCreated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCollection = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const data = { anime_mal_id, user_email, anime_image, anime_title }

      const response = await fetch("/api/v1/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.status === 200 && result?.isCreate) {
        setIsCreated(true)
      }
    } catch (error) {
      console.error('Gagal menambahkan ke koleksi:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      {isCreated ? (
        <p className="text-sm text-green-500 font-medium">
          Berhasil ditambahkan ke koleksi
        </p>
      ) : (
        <button
          onClick={handleCollection}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-all 
            ${loading ? 'bg-amber-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'}
          `}
        >
          {loading ? 'Menyimpan...' : 'Tambah ke Koleksi'}
        </button>
      )}
    </div>
  )
}

export default CollectionButton
