import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

function KegiatanRadio({ kegiatanRadio, selectedValue, status }) {
  const handleRadioChange = (value) => {
    kegiatanRadio(value);
  };

  return (
    <div className="fade-in pilihan">
      <RadioGroup
        value={selectedValue}
        onValueChange={handleRadioChange}
        isDisabled={status !== "pilihkegiatan"}
        orientation="horizontal"
        size="sm"
      >
        <Radio value="1">Kode</Radio>
        <Radio value="2">Kode Uraian</Radio>
        <Radio value="3">Uraian</Radio>
        {/* Uncomment if needed:
        <Radio value="4">Jangan Tampil</Radio>
        */}
      </RadioGroup>
    </div>
  );
}

export default KegiatanRadio;
