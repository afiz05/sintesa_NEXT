import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdsoutput = (props) => {
  // Check if parent filters are selected to enable this component
  const isEnabled =
    props.status === "pilihsuboutput" || props.status === "pilihsoutput";

  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={!isEnabled}
      placeholder={props.placeholder || "Pilih Sub Output"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Sub Output">
        Semua Sub Output
      </SelectItem>
    </Select>
  );
};

export default Kdsoutput;
