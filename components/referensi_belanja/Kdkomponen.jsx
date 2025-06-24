import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdkomponen = (props) => {
  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKey={props.kdkomponen}
          onSelectionChange={props.onChange}
          className="form-select form-select-sm"
          aria-label=".form-select-sm"
          isDisabled={props.status !== "pilihkomponen"}
          disallowEmptySelection={false}
          placeholder="Pilih Komponen"
        >
          <SelectItem key="SEMUAKOMPONEN" value="SEMUAKOMPONEN">
            Semua Komponen
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Kdkomponen;
