import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdsubkomponen = (props) => {
  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKey={props.kdsubkomponen}
          onSelectionChange={props.onChange}
          className="form-select form-select-sm"
          aria-label=".form-select-sm"
          isDisabled={props.status !== "pilihsubkomponen"}
          disallowEmptySelection={false}
          placeholder="Pilih Sub Komponen"
        >
          <SelectItem key="SEMUASUBKOMPONEN" value="SEMUASUBKOMPONEN">
            Semua Sub Komponen
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Kdsubkomponen;
