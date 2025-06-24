import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/KdPangan.json";

const JenisPangan = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Ketahanan Pangan"
      className="max-w-xs mb-1"
    >
      <SelectItem key="00" value="00">
        Semua Belanja dan Ketahanan Pangan
      </SelectItem>
      {data.map((pg, index) => (
        <SelectItem key={pg.kdpangan} value={pg.kdpangan}>
          {pg.nmpangan}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisPangan;
