import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/KdInflasiInquiry.json";

const JenisInflasiInquiry = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Jenis Inflasi"
      className="max-w-xs mb-1"
    >
      <SelectItem key="00" value="00">
        Semua Belanja dan Inflasi
      </SelectItem>
      {data.map((inf, index) => (
        <SelectItem key={inf.kdinflasi} value={inf.kdinflasi}>
          {inf.nminflasi}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisInflasiInquiry;
