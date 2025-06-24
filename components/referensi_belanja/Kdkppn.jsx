import React, { useContext } from "react";
import MyContext from "@/utils/Context";
import data from "../../data/Kdkppn.json";
import { Select, SelectItem } from "@heroui/react";

const Kdkppn = (props) => {
  const { role, kdkppn } = useContext(MyContext);
  let options = [];
  if (role === "0" || role === "1") {
    options.push(
      <SelectItem key="000" value="000">
        Semua KPPN
      </SelectItem>
    );
    options = options.concat(
      data.map((item) => (
        <SelectItem key={item.kdkppn} value={item.kdkppn}>
          {item.kdkppn} - {item.nmkppn}
        </SelectItem>
      ))
    );
  } else if (role === "3") {
    options = data
      .filter((item) => item.kdkppn === kdkppn)
      .map((item) => (
        <SelectItem key={item.kdkppn} value={item.kdkppn}>
          {item.kdkppn} - {item.nmkppn}
        </SelectItem>
      ));
  } else {
    options.push(
      <SelectItem key="000" value="000">
        Semua KPPN
      </SelectItem>
    );
  }
  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKey={props.value}
          onSelectionChange={props.onChange}
          className="form-select form-select-sm text-select mb-2"
          aria-label=".form-select-sm"
          isDisabled={props.status !== "pilihkppn"}
          disallowEmptySelection={false}
          placeholder="Pilih KPPN"
        >
          {options}
        </Select>
      </div>
    </div>
  );
};

export default Kdkppn;
