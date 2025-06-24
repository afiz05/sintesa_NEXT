import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdsoutput = (props) => {
  return (
    <div className="mt-2">
      <Select
        selectedKey={props.kdoutput}
        onSelectionChange={props.onChange}
        className="form-select form-select-sm"
        aria-label=".form-select-sm"
        isDisabled={props.status !== "pilihsuboutput"}
        disallowEmptySelection={false}
        placeholder="Pilih Sub Output"
      >
        <SelectItem key="SEMUASUBOUTPUT" value="SEMUASUBOUTPUT">
          Semua Sub Output
        </SelectItem>
      </Select>
    </div>
  );
};

export default Kdsoutput;
