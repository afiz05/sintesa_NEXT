import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdblokir = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.status !== "pilihblokir"}
      placeholder={props.placeholder || "Pilih Blokir"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Blokir">
        Semua Blokir
      </SelectItem>
    </Select>
  );
};

export default Kdblokir;
