import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/KdIkn.json";

const JenisIkn = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Jenis IKN"
      className="max-w-xs mb-1"
    >
      <SelectItem key="00" value="00">
        Semua Belanja dan IKN
      </SelectItem>
      {data.map((ikn, index) => (
        <SelectItem key={ikn.kdikn} value={ikn.kdikn}>
          {ikn.nmikn}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisIkn;
