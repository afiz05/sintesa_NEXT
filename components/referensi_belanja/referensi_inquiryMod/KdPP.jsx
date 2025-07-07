import React, { useEffect } from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Prioritas.json";

const KodePP = (props) => {
  // Reset to "00" when kdPN changes
  useEffect(() => {
    if (props.kdPN && props.value !== "00") {
      props.onChange("00");
    }
  }, [props.kdPN]);

  // Filter data based on selected kdPN (parent)
  const filteredData =
    props.kdPN && props.kdPN !== "00"
      ? data.filter((item) => item.kdpn === props.kdPN)
      : data;

  // Debug log to verify filtering
  console.log(
    "KdPP - kdPN:",
    props.kdPN,
    "filteredData length:",
    filteredData.length
  );

  // Ensure we have a valid selectedKeys Set
  const selectedKeys =
    props.value && props.value !== "" && props.value !== "XX"
      ? [props.value]
      : ["00"];

  return (
    <Select
      selectedKeys={new Set(selectedKeys)}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Program Prioritas"
      className="max-w-2xl"
    >
      <SelectItem key="00" value="00" textValue="Semua Program Prioritas">
        Semua Program Prioritas
      </SelectItem>
      {filteredData.map((item, index) => (
        <SelectItem
          key={`${item.kdpn}-${item.kdpp}`}
          value={item.kdpp}
          textValue={`${item.kdpp} - ${item.nmpp}`}
        >
          {item.kdpp} - {item.nmpp}
        </SelectItem>
      ))}
    </Select>
  );
};

export default KodePP;
