export function handleApiError(error: unknown): string {
  if (typeof window !== "undefined" && !navigator.onLine) {
    return "Tidak ada koneksi internet. Silakan periksa jaringan Anda.";
  }

  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "Gagal mengambil data. Periksa koneksi atau server tidak merespons.";
  }

  if (error instanceof Error) {
    // Kesalahan umum JavaScript
    if (error.name === "AbortError") {
      return "Permintaan dibatalkan (timeout).";
    }

    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    // Fetch Response object (misalnya dari fetch error manual)
    if ("status" in error && "statusText" in error) {
      const status = (error as any).status;
      const statusText = (error as any).statusText;

      switch (status) {
        case 400:
          return "Permintaan tidak valid (400).";
        case 401:
          return "Tidak terautentikasi (401). Silakan login kembali.";
        case 403:
          return "Tidak memiliki izin untuk mengakses (403).";
        case 404:
          return "Data tidak ditemukan (404).";
        case 408:
          return "Permintaan melebihi batas waktu (408).";
        case 429:
          return "Terlalu banyak permintaan (429). Coba lagi nanti.";
        case 500:
          return "Kesalahan server internal (500).";
        case 502:
        case 503:
        case 504:
          return "Server tidak tersedia. Coba lagi nanti.";
        default:
          return `Terjadi kesalahan (status ${status}: ${statusText}).`;
      }
    }

    // Struktur umum dari response body JSON error
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }

    if ("error" in error && typeof error.error === "string") {
      return error.error;
    }

    if ("detail" in error && typeof error.detail === "string") {
      return error.detail;
    }
  }

  return "Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.";
}
