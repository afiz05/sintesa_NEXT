"use client";

import { Input } from "@heroui/react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "../icons/searchicon";
import { HasilPencarianSatker } from "./HasilPencarianSatker";
import { useSatkerService } from "@/services/satkerService.js";

export const PencarianSatker = ({
  placeholder = "Ketik Kode atau Nama Satker...",
  className = "w-full",
}) => {
  const [nilaiPencarian, setNilaiPencarian] = useState("");
  const [hasilPencarian, setHasilPencarian] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [tampilkanHasil, setTampilkanHasil] = useState(false);
  const pencarianRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  const { cariSatker } = useSatkerService();

  // Debounce untuk pencarian
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (nilaiPencarian.length >= 3) {
        lakukan_pencarian();
      } else {
        setHasilPencarian([]);
        setTampilkanHasil(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [nilaiPencarian]);

  // Handle click outside untuk menutup hasil pencarian
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pencarianRef.current &&
        !pencarianRef.current.contains(event.target)
      ) {
        setTampilkanHasil(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const lakukan_pencarian = async () => {
    if (nilaiPencarian.length < 3) return;

    setSedangMemuat(true);
    try {
      const hasil = await cariSatker(nilaiPencarian);
      setHasilPencarian(hasil);
      setTampilkanHasil(true);
    } catch (error) {
      console.error("Error saat mencari satker:", error);
      setHasilPencarian([]);
    } finally {
      setSedangMemuat(false);
    }
  };

  const tanganiPilihSatker = (satker) => {
    setNilaiPencarian(satker.nama);
    setTampilkanHasil(false);
    // Navigate ke halaman detail satker menggunakan router.push
    router.push(`/satker/${satker.id}`);
  };

  const tanganiInputFocus = () => {
    if (hasilPencarian.length > 0) {
      setTampilkanHasil(true);
    }
  };

  return (
    <div ref={pencarianRef} className={`relative ${className}`}>
      <Input
        ref={inputRef}
        startContent={<SearchIcon />}
        isClearable
        value={nilaiPencarian}
        onValueChange={setNilaiPencarian}
        onFocus={tanganiInputFocus}
        className="w-full"
        classNames={{
          input: "w-full",
          mainWrapper: "w-full",
        }}
        placeholder={placeholder}
        // description={
        //   nilaiPencarian.length > 0 && nilaiPencarian.length < 3
        //     ? `Minimal 3 karakter (${nilaiPencarian.length}/3)`
        //     : undefined
        // }
      />

      {tampilkanHasil && (
        <HasilPencarianSatker
          hasil={hasilPencarian}
          sedangMemuat={sedangMemuat}
          onPilihSatker={tanganiPilihSatker}
          kataPencarian={nilaiPencarian}
          inputRef={inputRef}
        />
      )}
    </div>
  );
};
