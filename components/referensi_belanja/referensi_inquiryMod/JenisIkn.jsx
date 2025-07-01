import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdIkn.json";

const JenisIkn = (props) => {
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
      placeholder="Pilih Jenis IKN"
      className="max-w-xs mb-1"
      aria-label="Pilih Jenis IKN"
    >
      <SelectItem key="00" value="00" textValue="Semua Belanja dan IKN">
        Semua Belanja dan IKN
      </SelectItem>
      {data.map((ikn, index) => (
        <SelectItem key={ikn.kdikn} value={ikn.kdikn} textValue={ikn.nmikn}>
          {ikn.nmikn}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisIkn;
