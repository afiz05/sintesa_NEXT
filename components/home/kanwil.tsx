"use client";

import { useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

interface KanwilData {
  kdkanwil: string;
  nmkanwil: string;
}

interface KanwilProps {
  dataKanwil: KanwilData[];
}

export const Kanwil: React.FC<KanwilProps> = ({ dataKanwil }) => {
  useEffect(() => {
    if (!dataKanwil || dataKanwil.length === 0) {
      console.warn("dataKanwil kosong atau tidak tersedia");
    } else {
      console.log("dataKanwil tersedia:", dataKanwil);
    }
  }, [dataKanwil]);

  const mappedKanwil = dataKanwil.map((item) => ({
    key: item.kdkanwil,
    label: item.nmkanwil,
    value: item.kdkanwil,
  }));

  return (
    <Autocomplete
      placeholder="Pilih Kanwil"
      className="w-full sm:w-44 lg:w-52 h-10"
      size="md"
      variant="flat"
      color="default"
      classNames={{
        base: "rounded-lg bg-slate-50/80 dark:bg-slate-800/80",
        selectorButton:
          "rounded-lg bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 data-[hover=true]:bg-slate-100/80 dark:data-[hover=true]:bg-slate-700/80",
        listbox: "rounded-lg bg-slate-50/95 dark:bg-slate-800/95",
        popoverContent:
          "rounded-lg bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60",
      }}
      allowsCustomValue
      // items={mappedKanwil}
      defaultItems={mappedKanwil}
    >
      {(item) => (
        <AutocompleteItem key={item.key} className="capitalize">
          {item.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
