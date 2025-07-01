import React from "react";
import { Select, SelectItem } from "@heroui/react";

const KodeKegPP = (props) => {
  // Helper to get default selection
  const getDefaultSelection = () => {
    if (props.kdkp && props.kdkp !== "XX") return [props.kdkp];
    return ["00"]; // Default to "Semua Kegiatan Prioritas"
  };

  return (
    <Select
      selectedKeys={getDefaultSelection()}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange(selected);
      }}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="00" textValue="Semua Kegiatan Prioritas">
        Semua Kegiatan Prioritas
      </SelectItem>
    </Select>
  );
};

export default KodeKegPP;
