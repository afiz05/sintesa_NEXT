import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kdsfungsi.json";

const Kdsfungsi = (props) => {
  return (
    <Select
      selectedKeys={props.kdsfungsi ? [props.kdsfungsi] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      isDisabled={props.status !== "pilihsubfungsi"}
      size="sm"
      placeholder="Pilih Sub Fungsi"
      className="max-w-xs mb-2"
    >
      <SelectItem key="00" value="00">
        Semua Sub Fungsi
      </SelectItem>
      {data
        .filter((item) => item.kdfungsi === props.kdfungsi)
        .map((kl, index) => (
          <SelectItem key={kl.kdsfungsi} value={kl.kdsfungsi}>
            {kl.kdsfungsi} - {kl.nmsfungsi}
          </SelectItem>
        ))}
    </Select>
  );
};

export default Kdsfungsi;
