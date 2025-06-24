import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdregister = (props) => {
  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKey={props.kdregister}
          onSelectionChange={props.onChange}
          className="form-select form-select-sm"
          aria-label=".form-select-sm"
          isDisabled={props.status !== "pilihregister"}
          disallowEmptySelection={false}
          placeholder="Pilih Register"
        >
          <SelectItem key="SEMUAREGISTER" value="SEMUAREGISTER">
            Semua Register
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Kdregister;
