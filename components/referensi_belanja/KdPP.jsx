import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Prioritas.json";

const KodePP = (props) => {
  const filteredData = data.filter((item) => item.kdpn === props.kdPN);

  return (
    <div className="mt-2">
      <Select
        selectedKeys={props.PP ? [props.PP] : ["00"]}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          props.onChange(value);
        }}
        isDisabled={props.status !== "pilihPP"}
        size="sm"
        placeholder="Pilih Program Prioritas"
        className="max-w-xs"
      >
        <SelectItem key="00" value="00">
          Semua Program Prioritas
        </SelectItem>
        {filteredData.map((item, index) => (
          <SelectItem key={item.kdpp} value={item.kdpp}>
            {item.kdpp} - {item.nmpp}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default KodePP;
