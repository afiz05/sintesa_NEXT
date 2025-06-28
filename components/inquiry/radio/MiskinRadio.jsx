import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

function MiskinRadio({ miskinRadio, selectedValue }) {
  return (
    <RadioGroup
      value={selectedValue}
      onChange={miskinRadio}
      name="radioGroupmiskin"
      orientation="horizontal"
      className="fade-in pilihan"
    >
      <Radio value="1">Kode</Radio>
      <Radio value="2">Kode Uraian</Radio>
      <Radio value="3">Uraian</Radio>
    </RadioGroup>
  );
}

export default MiskinRadio;
