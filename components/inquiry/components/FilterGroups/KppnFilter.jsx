import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Banknote } from "lucide-react";
import Kdkppn from "../../../referensi_belanja/Kdkppn";

const KppnFilter = ({ inquiryState, onFilterChange }) => {
  const { kppn, setKppn } = inquiryState;
  // Local state for filter fields
  const [kppnkondisi, setKppnkondisi] = React.useState(""); // Masukkan Kondisi
  const [katakppn, setKatakppn] = React.useState(""); // Mengandung Kata
  const [kppnradio, setKppnradio] = React.useState("1"); // Select value: "1", "2", "3", "4"

  // 4 display options, matching KementerianFilter
  const KppnOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Uraian" },
    { value: "3", label: "Kode Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Notify parent or query generator whenever any filter changes
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        kppn,
        kppnkondisi,
        katakppn,
        kppnradio,
      });
    }
  }, [kppn, kppnkondisi, katakppn, kppnradio, onFilterChange]);

  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-100 shadow-sm">
      <div className="flex flex-row items-center gap-4 w-full">
        <h6 className="font-semibold mb-0 min-w-[100px] flex-[2] flex items-center gap-2">
          <Banknote size={18} className="text-primary" />
          KPPN
        </h6>
        <Kdkppn
          value={kppn}
          onChange={(e) => setKppn(e.target.value || e)}
          className="min-w-0 flex-[2]"
          size="sm"
          placeholder="Input KPPN"
          status="pilihkppn"
        />
        <Input
          placeholder="Masukkan Kondisi"
          className="min-w-0 flex-[2]"
          size="sm"
          value={kppnkondisi}
          onChange={(e) => setKppnkondisi(e.target.value)}
        />
        <Input
          placeholder="Mengandung Kata"
          className="min-w-0 flex-[2]"
          size="sm"
          value={katakppn}
          onChange={(e) => setKatakppn(e.target.value)}
        />
        <Select
          aria-label="Pilih tampilan"
          className="min-w-0 flex-[2]"
          size="sm"
          selectedKeys={[kppnradio]}
          onSelectionChange={(key) => {
            let selected = key;
            if (key && typeof key !== "string" && key.size) {
              selected = Array.from(key)[0];
            }
            if (!selected) {
              setKppnradio("1");
              return;
            }
            setKppnradio(selected);
          }}
          disallowEmptySelection
        >
          {KppnOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default KppnFilter;
