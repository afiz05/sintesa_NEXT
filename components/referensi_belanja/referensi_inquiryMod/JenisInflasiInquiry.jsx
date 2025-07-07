import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdInflasiInquiry.json";

const JenisInflasiInquiry = (props) => {
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
      placeholder="Pilih Jenis Inflasi"
      className="max-w-2xl"
      aria-label="Pilih Jenis Inflasi"
    >
      <SelectItem key="00" value="00" textValue="Semua Belanja dan Inflasi">
        Semua Belanja dan Inflasi
      </SelectItem>
      {data.map((inf, index) => (
        <SelectItem
          key={inf.kdinflasi}
          value={inf.kdinflasi}
          textValue={inf.nminflasi}
        >
          {inf.nminflasi}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisInflasiInquiry;
