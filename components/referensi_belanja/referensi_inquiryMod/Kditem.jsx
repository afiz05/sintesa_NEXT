import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kditem = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.status !== "pilihitem"}
      placeholder={props.placeholder || "Pilih Item"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Item">
        Semua Item
      </SelectItem>
    </Select>
  );
};

export default Kditem;
