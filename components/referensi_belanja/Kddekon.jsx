import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kddekon.json";

const Kddekon = (props) => {
  return (
    <div className="mt-2">
      <Select
        selectedKeys={props.value ? [props.value] : ["00"]}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          props.onChange(value);
        }}
        isDisabled={props.status !== "pilihdekon"}
        size="sm"
        placeholder="Pilih Kewenangan"
        className="max-w-xs"
      >
        <SelectItem key="00" value="00">
          Semua Kewenangan
        </SelectItem>
        {data.map((kl, index) => (
          <SelectItem key={kl.kddekon} value={kl.kddekon}>
            {kl.kddekon} - {kl.nmdekon}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Kddekon;
