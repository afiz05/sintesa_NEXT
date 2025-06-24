import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/KdMiskin.json";

const JenisMiskin = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Jenis Kemiskinan Ekstrim"
      className="max-w-xs mb-1"
    >
      <SelectItem key="00" value="00">
        Semua Belanja dan Kemiskinan Ekstrim
      </SelectItem>
      {data.map((ms, index) => (
        <SelectItem key={ms.kdmiskin} value={ms.kdmiskin}>
          {ms.nmmiskin}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisMiskin;
