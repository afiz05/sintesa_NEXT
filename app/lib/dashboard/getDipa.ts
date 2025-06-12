import Encrypt from "@/utils/Encrypt";
import { cookies } from "next/headers";

export async function getDipa() {
  try {
    const cookieStore = cookies(); // langsung tanpa await
    const token = (await cookieStore).get("nextToken")?.value;

    // console.log("[getDipa] Token dari cookie:", token);

    if (!token) {
      // console.warn("[getDipa] Token tidak ditemukan di cookie");
      throw new Error("Token tidak tersedia. Autentikasi gagal.");
    }

    const encodedQuery = encodeURIComponent(
      `SELECT 
  SUM(pagu) AS pagu,
  SUM(realisasi) AS realisasi,
  SUM(pagu) - SUM(realisasi) AS sisa,
  (SELECT SUM(jml) FROM dashboard.dipa_satker_rekap where thang='2022') AS jumlah_dipa ,
  ROUND(SUM(persen_dipa) / 1000000, 2) AS persen
FROM dashboard.pagu_real_kl prk where thang='2022' and kddept<>'999' limit 1;`
    );
    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const res = await fetch("http://localhost:88/next/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // wajib agar body dibaca sebagai JSON
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: cleanedQuery }), // ← HARUS dibungkus JSON.stringify
      cache: "no-store",
    });

    // console.log("[getDipa] Status response:", res.status);

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error("Gagal mengambil data DIPA dari API");
    }

    const json = await res.json();
    return json.result?.[0] ?? null;
  } catch (error) {
    console.error("[getDipa] Terjadi error saat fetch:", error);
    throw error; // lanjutkan throw agar bisa ditangkap di atas jika perlu
  }
}
