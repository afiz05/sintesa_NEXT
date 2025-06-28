import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdprogram.json";

const Kdprogram = (props) => {
  const filteredData = data.filter(
    (item) => item.kddept === props.kddept && item.kdunit === props.kdunit
  );

  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.status !== "pilihprogram"}
      placeholder={props.placeholder || "Pilih Program"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Program">
        Semua Program
      </SelectItem>
      {filteredData.map((item) => (
        <SelectItem
          key={item.kdprogram}
          textValue={`${item.kdprogram} - ${item.nmprogram}`}
        >
          {item.kdprogram} - {item.nmprogram}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdprogram;
