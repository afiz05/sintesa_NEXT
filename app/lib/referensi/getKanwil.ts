import Encrypt from "@/utils/Encrypt";
import { cookies } from "next/headers";

export async function getKanwil() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("nextToken")?.value;

    if (!token) {
      throw new Error("Token tidak tersedia. Autentikasi gagal.");
    }

    const encodedQuery = encodeURIComponent(
      `SELECT kdkanwil, nmkanwil FROM dbref.t_kanwil_2025`
    );
    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const res = await fetch("http://localhost:88/next/referensi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: cleanedQuery }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Gagal mengambil data Kanwil dari API");
    }

    const json = await res.json();
    return json.result ?? [];
  } catch (error) {
    console.error("[getKanwil] Terjadi error saat fetch:", error);
    throw error;
  }
}
