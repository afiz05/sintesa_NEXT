"use client";

import { useContext, useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem, Skeleton } from "@heroui/react";

import MyContext from "@/utils/Contex";
import Encrypt from "@/utils/Encrypt";

import { handleHttpError } from "@/utils/handleError";

interface KddeptData {
  kddept: string;
  nmdept: string;
}

interface KddeptProps {
  onKddeptChange: (kddeptValue: string) => void;
  selectedKddept: string;
}

export const Kddept = ({ onKddeptChange, selectedKddept }: KddeptProps) => {
  const [dataKddept, setDataKddept] = useState<KddeptData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(MyContext);

  const { token, axiosJWT, statusLogin } = context! as {
    token: string;
    axiosJWT: any;
    statusLogin: any;
  };

  const getData = async () => {
    const encodedQuery = encodeURIComponent(
      `SELECT kddept, nmdept FROM dbref2025.t_dept_2025  order by kddept asc;`
    );
    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const encryptedQuery = Encrypt(cleanedQuery);

    try {
      setLoading(true);

      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_GET_REFERENSI}`,
        { query: encryptedQuery },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add "Nasional" option at the beginning
      const nasionalOption = { kddept: "000", nmdept: "SEMUA KL" };
      const deptData = [nasionalOption, ...(response.data.result || [])];
      setDataKddept(deptData);
    } catch (err: any) {
      const { status, data } = err.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend "
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Skeleton className="w-full sm:w-44 lg:w-52 h-10 rounded-lg" />;
  }

  return (
    <Autocomplete
      placeholder="Pilih Kementerian"
      className="w-full sm:w-44 lg:w-52 h-10"
      size="md"
      variant="flat"
      color="default"
      selectedKey={selectedKddept}
      onSelectionChange={(key) => onKddeptChange(key as string)}
      classNames={{
        base: "rounded-lg bg-slate-50/80 dark:bg-slate-800/80",
        selectorButton:
          "rounded-lg bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 data-[hover=true]:bg-slate-100/80 dark:data-[hover=true]:bg-slate-700/80",
        listbox: "rounded-lg bg-slate-50/95 dark:bg-slate-800/95 p-2",
        popoverContent:
          "rounded-lg bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 !z-50 !mt-2 shadow-lg",
      }}
      allowsCustomValue
      defaultItems={dataKddept}
    >
      {(item) => (
        <AutocompleteItem
          key={item.kddept}
          textValue={
            item.kddept === "000"
              ? item.nmdept
              : `${item.nmdept} ${item.kddept}`
          }
        >
          {item.kddept === "000"
            ? item.nmdept
            : `${item.nmdept} - (${item.kddept})`}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
