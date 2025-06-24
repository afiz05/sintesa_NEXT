import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Map } from "lucide-react";
import Kdkabkota from "../../../referensi_belanja/Kdkabkota";

const KabkotaFilter = ({ inquiryState, onFilterChange }) => {
  const { kabkota, setKabkota, prov } = inquiryState;
  // Local state for filter fields
  const [kabkotakondisi, setKabkotakondisi] = React.useState(""); // Masukkan Kondisi
  const [katakabkota, setKatakabkota] = React.useState(""); // Mengandung Kata
  const [kabkotaradio, setKabkotaradio] = React.useState("1"); // Select value: "1", "2", "3", "4"

  const KabkotaOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Uraian" },
    { value: "3", label: "Kode Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Notify parent or query generator whenever any filter changes
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        kabkota,
        kabkotakondisi,
        katakabkota,
        kabkotaradio,
      });
    }
  }, [kabkota, kabkotakondisi, katakabkota, kabkotaradio, onFilterChange]);

  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-100 shadow-sm">
      <div className="flex flex-row items-center gap-4 w-full">
        <h6 className="font-semibold mb-0 min-w-[100px] flex-[2] flex items-center gap-2">
          <Map size={18} className="text-primary" />
          Kabupaten/Kota
        </h6>
        <Kdkabkota
          value={kabkota}
          onChange={(e) => setKabkota(e.target.value || e)}
          kdlokasi={prov}
          className="min-w-0 flex-[2]"
          size="sm"
          placeholder="Input Kabupaten/Kota"
          status="pilihkdkabkota"
        />
        <Input
          placeholder="Masukkan Kondisi"
          className="min-w-0 flex-[2]"
          size="sm"
          value={kabkotakondisi}
          onChange={(e) => setKabkotakondisi(e.target.value)}
        />
        <Input
          placeholder="Mengandung Kata"
          className="min-w-0 flex-[2]"
          size="sm"
          value={katakabkota}
          onChange={(e) => setKatakabkota(e.target.value)}
        />
        <Select
          aria-label="Pilih tampilan"
          className="min-w-0 flex-[2]"
          size="sm"
          selectedKeys={[kabkotaradio]}
          onSelectionChange={(key) => {
            let selected = key;
            if (key && typeof key !== "string" && key.size) {
              selected = Array.from(key)[0];
            }
            if (!selected) {
              setKabkotaradio("1");
              return;
            }
            setKabkotaradio(selected);
          }}
          disallowEmptySelection
        >
          {KabkotaOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default KabkotaFilter;
