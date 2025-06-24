import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kdfungsi.json";

const Kdfungsi = (props) => {
  return (
    <Select
      selectedKeys={props.kdfungsi ? [props.kdfungsi] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      isDisabled={props.status !== "pilihfungsi"}
      size="sm"
      placeholder="Pilih Fungsi"
      className="max-w-xs mb-2"
    >
      <SelectItem key="00" value="00">
        Semua Fungsi
      </SelectItem>
      {data.map((kl, index) => (
        <SelectItem key={kl.kdfungsi} value={kl.kdfungsi}>
          {kl.kdfungsi} - {kl.nmfungsi}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdfungsi;
