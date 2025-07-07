import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdPN.json";

const KodePN = (props) => {
  const selectedValue =
    props.value && props.value !== "" && props.value !== "XX"
      ? props.value
      : "00";

  return (
    <Select
      selectedKeys={new Set([selectedValue])}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Prioritas Nasional"
      className="max-w-2xl"
    >
      <SelectItem key="00" value="00" textValue="Semua Prioritas Nasional">
        Semua Prioritas Nasional
      </SelectItem>
      {data.map((item, index) => (
        <SelectItem
          key={item.kdpn}
          value={item.kdpn}
          textValue={`${item.kdpn} - ${item.nmpn}`}
        >
          {item.kdpn} - {item.nmpn}
        </SelectItem>
      ))}
    </Select>
  );
};

export default KodePN;
