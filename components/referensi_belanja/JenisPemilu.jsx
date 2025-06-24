import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/KdPemilu.json";

const JenisPemilu = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Belanja Pemilu"
      className="max-w-xs mb-1"
    >
      <SelectItem key="00" value="00">
        Semua Belanja dan Pemilu
      </SelectItem>
      {data.map((pm, index) => (
        <SelectItem key={pm.kdpemilu} value={pm.kdpemilu}>
          {pm.nmpemilu}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisPemilu;
