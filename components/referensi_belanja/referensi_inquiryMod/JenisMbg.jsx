import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdMbg.json";

const JenisMbg = (props) => {
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
      placeholder="Pilih Intervensi"
      className="max-w-full"
      aria-label="Pilih Jenis MBG"
    >
      <SelectItem key="00" value="00" textValue="Semua Intervensi">
        Semua Intervensi
      </SelectItem>
      {data.map((mbg, index) => (
        <SelectItem key={mbg.kdmbg} value={mbg.kdmbg} textValue={mbg.nmmbg}>
          {mbg.nmmbg}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisMbg;
