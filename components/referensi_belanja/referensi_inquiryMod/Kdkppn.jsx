import React, { useContext } from "react";
import MyContext from "@/utils/Context";
import data from "../../../data/Kdkppn.json";
import { Select, SelectItem } from "@heroui/react";

const Kdkppn = (props) => {
  const { role, kdkppn } = useContext(MyContext);

  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "XX";
    if (props.onChange) {
      props.onChange(val);
    }
  };

  // Get the filter kanwil value (if provided)
  const filterKdkanwil = props.kdkanwil;

  // Filter KPPN data based on kanwil selection
  const availableData = data.filter((item) => {
    // If kdkanwil is "XX" or falsy (no specific kanwil selected), show no additional kppn
    // Only show kppn when a specific kanwil is selected
    // Also exclude kdkppn="XX" to avoid duplicate keys with hardcoded "Semua KPPN"
    return (
      filterKdkanwil &&
      filterKdkanwil !== "XX" &&
      item.kdkanwil === filterKdkanwil &&
      item.kdkppn !== "XX"
    );
  });

  // Role-based filtering with fallback for empty/undefined roles
  let options = [];
  const shouldShowAll =
    role === "0" || role === "1" || role === "X" || !role || role === "";

  if (shouldShowAll) {
    options.push(
      <SelectItem key="XX" value="XX" textValue="Semua KPPN">
        Semua KPPN
      </SelectItem>
    );
    options = options.concat(
      availableData.map((item) => (
        <SelectItem
          key={item.kdkppn}
          value={item.kdkppn}
          textValue={`${item.kdkppn} - ${item.nmkppn}`}
        >
          {item.kdkppn} - {item.nmkppn}
        </SelectItem>
      ))
    );
  } else if (role === "3") {
    options = availableData
      .filter((item) => item.kdkppn === kdkppn)
      .map((item) => (
        <SelectItem
          key={item.kdkppn}
          value={item.kdkppn}
          textValue={`${item.kdkppn} - ${item.nmkppn}`}
        >
          {item.kdkppn} - {item.nmkppn}
        </SelectItem>
      ));
  } else {
    options.push(
      <SelectItem key="XX" value="XX" textValue="Semua KPPN">
        Semua KPPN
      </SelectItem>
    );
  }

  // Ensure the selected value is valid
  const availableKeys = ["XX", ...availableData.map((item) => item.kdkppn)];
  const currentValue = props.value || "XX";
  const validSelectedValue = availableKeys.includes(currentValue)
    ? currentValue
    : "XX";

  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKeys={[validSelectedValue]}
          onSelectionChange={handleSelectionChange}
          className={
            props.className || "form-select form-select-sm text-select mb-2"
          }
          size={props.size || "sm"}
          aria-label="Pilih KPPN"
          isDisabled={props.isDisabled || props.status !== "pilihkppn"}
          disallowEmptySelection
          placeholder={props.placeholder || "Pilih KPPN"}
        >
          {options}
        </Select>
      </div>
    </div>
  );
};

export default Kdkppn;
