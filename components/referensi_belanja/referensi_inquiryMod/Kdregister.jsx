import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdregister = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.isDisabled || props.status !== "pilihregister"}
      placeholder={props.placeholder || "Pilih Register"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Register">
        Semua Register
      </SelectItem>
    </Select>
  );
};

export default Kdregister;
