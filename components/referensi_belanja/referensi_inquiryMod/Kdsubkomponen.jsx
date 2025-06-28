import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdsubkomponen = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.status !== "pilihsubkomponen"}
      placeholder={props.placeholder || "Pilih Sub Komponen"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Sub Komponen">
        Semua Sub Komponen
      </SelectItem>
    </Select>
  );
};

export default Kdsubkomponen;
