import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdPemilu.json";

const JenisPemilu = (props) => {
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
      placeholder="Pilih Belanja Pemilu"
      className="max-w-xs mb-1"
    >
      <SelectItem key="00" value="00" textValue="Semua Belanja dan Pemilu">
        Semua Belanja dan Pemilu
      </SelectItem>
      {data.map((pm, index) => (
        <SelectItem
          key={pm.kdpemilu}
          value={pm.kdpemilu}
          textValue={pm.nmpemilu}
        >
          {pm.nmpemilu}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisPemilu;
