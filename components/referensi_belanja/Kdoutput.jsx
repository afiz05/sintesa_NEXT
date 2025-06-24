import React from "react";
import data from "../../data/Kdoutput.json";
import { Select, SelectItem } from "@heroui/react";

const Kdoutput = (props) => {
  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKey={props.kdoutput}
          onSelectionChange={props.onChange}
          className="form-select form-select-sm"
          aria-label=".form-select-sm"
          isDisabled={props.status !== "pilihoutput"}
          disallowEmptySelection={false}
          placeholder="Pilih Output"
        >
          <SelectItem key="SEMUAOUTPUT" value="SEMUAOUTPUT">
            Semua Output
          </SelectItem>
          {data
            .filter(
              (item) =>
                item.kddept === props.kddept &&
                item.kdunit === props.kdunit &&
                item.kdprogram === props.kdprogram &&
                item.kdgiat === props.kdgiat
            )
            .map((item) => (
              <SelectItem key={item.kdoutput} value={item.kdoutput}>
                {item.kdoutput} - {item.nmoutput}
              </SelectItem>
            ))}
        </Select>
      </div>
    </div>
  );
};

export default Kdoutput;
