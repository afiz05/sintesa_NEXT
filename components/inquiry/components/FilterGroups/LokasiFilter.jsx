import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { MapPin } from "lucide-react";
import Kdlokasi from "../../../referensi_belanja/Kdlokasi";

const LokasiFilter = ({ inquiryState, onFilterChange }) => {
  const { prov, setProv } = inquiryState;
  // Local state for filter fields
  const [lokasikondisi, setLokasikondisi] = React.useState(""); // Masukkan Kondisi
  const [katalokasi, setKatalokasi] = React.useState(""); // Mengandung Kata
  const [locradio, setLocradio] = React.useState("1"); // Select value: "1", "2", "3", "4"

  // 4 display options, matching KementerianFilter
  const LocOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Uraian" },
    { value: "3", label: "Kode Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Notify parent or query generator whenever any filter changes
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        prov,
        lokasikondisi,
        katalokasi,
        locradio,
      });
    }
  }, [prov, lokasikondisi, katalokasi, locradio, onFilterChange]);

  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-100 shadow-sm">
      <div className="flex flex-row items-center gap-4 w-full">
        <h6 className="font-semibold mb-0 min-w-[100px] flex-[2] flex items-center gap-2">
          <MapPin size={18} className="text-primary" />
          Provinsi
        </h6>
        <Kdlokasi
          value={prov}
          onChange={(e) => setProv(e.target.value || e)}
          className="min-w-0 flex-[2]"
          size="sm"
          placeholder="Input Provinsi"
          status="pilihprov"
        />
        <Input
          placeholder="Masukkan Kondisi"
          className="min-w-0 flex-[2]"
          size="sm"
          value={lokasikondisi}
          onChange={(e) => setLokasikondisi(e.target.value)}
        />
        <Input
          placeholder="Mengandung Kata"
          className="min-w-0 flex-[2]"
          size="sm"
          value={katalokasi}
          onChange={(e) => setKatalokasi(e.target.value)}
        />
        <Select
          aria-label="Pilih tampilan"
          className="min-w-0 flex-[2]"
          size="sm"
          selectedKeys={[locradio]}
          onSelectionChange={(key) => {
            let selected = key;
            if (key && typeof key !== "string" && key.size) {
              selected = Array.from(key)[0];
            }
            if (!selected) {
              setLocradio("1");
              return;
            }
            setLocradio(selected);
          }}
          disallowEmptySelection
        >
          {LocOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default LokasiFilter;
