"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  console.log("tes");

  useEffect(() => {
    router.replace("/dashboard"); // atau pakai basePath jika perlu
  }, [router]);

  return null; // Atau bisa tampilkan spinner sementara
}
