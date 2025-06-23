import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

function DekonRadio({ dekonRadio, selectedValue, status }) {
  const handleRadioChange = (value) => {
    dekonRadio(value);
  };

  return (
    <div className="fade-in pilihan">
      <RadioGroup
        value={selectedValue}
        onValueChange={handleRadioChange}
        isDisabled={status !== "pilihdekon"}
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

export default DekonRadio;
