import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdMP.json";

const JenisMP = (props) => {
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
      placeholder="Pilih Major Project"
      className="max-w-2xl"
    >
      <SelectItem key="00" value="00" textValue="Semua Major Project">
        Semua Major Project
      </SelectItem>
      {data.map((mp, index) => (
        <SelectItem
          key={mp.kdmp}
          value={mp.kdmp}
          textValue={`${mp.kdmp} - ${mp.nmmp}`}
        >
          {mp.kdmp} - {mp.nmmp}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisMP;
