import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdkomponen = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.status !== "pilihkomponen"}
      placeholder={props.placeholder || "Pilih Komponen"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Komponen">
        Semua Komponen
      </SelectItem>
    </Select>
  );
};

export default Kdkomponen;
