import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/KdPN.json";

const KodePN = (props) => {
  return (
    <div className="mt-2">
      <Select
        selectedKeys={props.PN ? [props.PN] : ["00"]}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          props.onChange(value);
        }}
        isDisabled={props.status !== "pilihPN"}
        size="sm"
        placeholder="Pilih Prioritas Nasional"
        className="max-w-xs"
      >
        <SelectItem key="00" value="00">
          Semua Prioritas Nasional
        </SelectItem>
        {data.map((item, index) => (
          <SelectItem key={item.kdpn} value={item.kdpn}>
            {item.kdpn} - {item.nmpn}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default KodePN;
