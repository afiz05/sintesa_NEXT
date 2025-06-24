import React from "react";
import data from "../../data/Kdsatker.json";
import { Select, SelectItem } from "@heroui/react";

const Kdsatker = (props) => {
  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKey={props.kdsatker}
          onSelectionChange={props.onChange}
          className="form-select form-select-sm"
          aria-label=".form-select-sm"
          isDisabled={props.status !== "pilihsatker"}
          disallowEmptySelection={false}
          placeholder="Pilih Satker"
        >
          <SelectItem key="SEMUASATKER" value="SEMUASATKER">
            Semua Satker
          </SelectItem>
          {data
            .filter(
              (item) =>
                item.kddept === props.kddept && item.kdunit === props.kdunit
            )
            .map((item) => (
              <SelectItem key={item.kdsatker} value={item.kdsatker}>
                {item.kdsatker} - {item.nmsatker}
              </SelectItem>
            ))}
        </Select>
      </div>
    </div>
  );
};

export default Kdsatker;
