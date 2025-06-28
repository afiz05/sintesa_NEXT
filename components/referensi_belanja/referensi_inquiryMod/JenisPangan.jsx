import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdPangan.json";

const JenisPangan = (props) => {
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
      placeholder="Pilih Ketahanan Pangan"
      className="max-w-xs mb-1"
    >
      <SelectItem
        key="00"
        value="00"
        textValue="Semua Belanja dan Ketahanan Pangan"
      >
        Semua Belanja dan Ketahanan Pangan
      </SelectItem>
      {data.map((pg, index) => (
        <SelectItem
          key={pg.kdpangan}
          value={pg.kdpangan}
          textValue={pg.nmpangan}
        >
          {pg.nmpangan}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisPangan;
