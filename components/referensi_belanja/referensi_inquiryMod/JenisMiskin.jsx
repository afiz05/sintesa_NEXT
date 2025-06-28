import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdMiskin.json";

const JenisMiskin = (props) => {
  // Ensure we have a valid selectedKeys Set
  const selectedKeys =
    props.value && props.value !== "" && props.value !== "XX"
      ? [props.value]
      : ["00"];

  return (
    <Select
      selectedKeys={new Set(selectedKeys)}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Jenis Kemiskinan Ekstrim"
      className="max-w-xs mb-1"
    >
      <SelectItem
        key="00"
        value="00"
        textValue="Semua Belanja dan Kemiskinan Ekstrim"
      >
        Semua Belanja dan Kemiskinan Ekstrim
      </SelectItem>
      {data.map((ms, index) => (
        <SelectItem
          key={ms.kdmiskin}
          value={ms.kdmiskin}
          textValue={ms.nmmiskin}
        >
          {ms.nmmiskin}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisMiskin;
