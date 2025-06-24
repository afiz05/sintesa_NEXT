import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Landmark } from "lucide-react";
import Kdkanwil from "../../../referensi_belanja/Kdkanwil";

const KanwilFilter = ({ inquiryState, onFilterChange }) => {
  const { kdkanwil, setKdkanwil } = inquiryState;
  // Local state for filter fields
  const [kanwilkondisi, setKanwilkondisi] = React.useState(""); // Masukkan Kondisi
  const [katakanwil, setKatakanwil] = React.useState(""); // Mengandung Kata
  const [kanwilradio, setKanwilradio] = React.useState("1"); // Select value: "1", "2", "3", "4"

  // 4 display options, matching KementerianFilter
  const KanwilOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Uraian" },
    { value: "3", label: "Kode Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Notify parent or query generator whenever any filter changes
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        kdkanwil,
        kanwilkondisi,
        katakanwil,
        kanwilradio,
      });
    }
  }, [kdkanwil, kanwilkondisi, katakanwil, kanwilradio, onFilterChange]);

  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-100 shadow-sm">
      <div className="flex flex-row items-center gap-4 w-full">
        <h6 className="font-semibold mb-0 min-w-[100px] flex-[2] flex items-center gap-2">
          <Landmark size={18} className="text-primary" />
          Kanwil
        </h6>
        <Kdkanwil
          value={kdkanwil}
          onChange={(e) => setKdkanwil(e.target.value || e)}
          className="min-w-0 flex-[2]"
          size="sm"
          placeholder="Input Kanwil"
          status="pilihkanwil"
        />
        <Input
          placeholder="Masukkan Kondisi"
          className="min-w-0 flex-[2]"
          size="sm"
          value={kanwilkondisi}
          onChange={(e) => setKanwilkondisi(e.target.value)}
        />
        <Input
          placeholder="Mengandung Kata"
          className="min-w-0 flex-[2]"
          size="sm"
          value={katakanwil}
          onChange={(e) => setKatakanwil(e.target.value)}
        />
        <Select
          aria-label="Pilih tampilan"
          className="min-w-0 flex-[2]"
          size="sm"
          selectedKeys={[kanwilradio]}
          onSelectionChange={(key) => {
            let selected = key;
            if (key && typeof key !== "string" && key.size) {
              selected = Array.from(key)[0];
            }
            if (!selected) {
              setKanwilradio("1");
              return;
            }
            setKanwilradio(selected);
          }}
          disallowEmptySelection
        >
          {KanwilOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default KanwilFilter;
