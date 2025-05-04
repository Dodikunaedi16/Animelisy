// Mengambil data dari API publik berdasarkan resource dan query
export const getAnimeRespons = async (resource, query = "") => {
  try {
    const queryString = query ? `?${query}` : "";
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}${queryString}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Gagal fetch: ${response.status} ${response.statusText}`);
    }

    const anime = await response.json();
    return anime;
  } catch (error) {
    console.error("Error saat mengambil data anime:", error);
    return { data: [] };
  }
};

// Mengambil nested property dari response API
export const getNestedAnimeRespons = async (resource, objectProperty) => {
  const response = await getAnimeRespons(resource);

  if (!response?.data || !Array.isArray(response.data)) {
    console.warn("Data tidak tersedia atau format salah.");
    return [];
  }

  return response.data.flatMap((item) => item[objectProperty] || []);
};

// Mengacak data dan mengambil sejumlah item (gap)
export const reproduce = (data, gap) => {
  if (!Array.isArray(data) || data.length < gap) {
    console.warn("Data terlalu sedikit atau tidak valid.");
    return { data: data || [] };
  }

  const first = Math.floor(Math.random() * (data.length - gap));
  const last = first + gap;

  return {
    data: data.slice(first, last),
  };
};
