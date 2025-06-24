import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kdprogram.json";

const Kdprogram = (props) => {
  return (
    <Select
      selectedKeys={props.kdprogram ? [props.kdprogram] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      isDisabled={props.status !== "pilihprogram"}
      size="sm"
      placeholder="Pilih Program"
      className="max-w-xs mb-2"
    >
      <SelectItem key="00" value="00">
        Semua Program
      </SelectItem>
      {data
        .filter(
          (item) => item.kddept === props.kddept && item.kdunit === props.kdunit
        )
        .map((item) => (
          <SelectItem key={item.kdprogram} value={item.kdprogram}>
            {item.kdprogram} - {item.nmprogram}
          </SelectItem>
        ))}
    </Select>
  );
};

export default Kdprogram;
