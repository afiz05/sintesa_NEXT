import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kdunit.json";

const Kdunit = (props) => {
  const filteredData = data.filter((item) => item.kddept === props.value);

  return (
    <div className="mt-2">
      <Select
        selectedKeys={props.kdunit ? [props.kdunit] : ["00"]}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          props.onChange(value);
        }}
        isDisabled={props.status !== "pilihunit"}
        size="sm"
        placeholder="Pilih Unit"
        className="max-w-xs"
      >
        <SelectItem key="00" value="00">
          Semua Unit
        </SelectItem>
        {filteredData.map((item, index) => (
          <SelectItem key={item.kdunit} value={item.kdunit}>
            {item.kdunit} - {item.nmunit}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Kdunit;
