import React, { useContext } from "react";
import MyContext from "@/utils/Context";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdkanwil.json";

const Kdkanwil = (props) => {
  const { role, kdkanwil } = useContext(MyContext);

  const handleSelectionChange = (keys) => {
    const selected = Array.from(keys)[0] || "XX";
    if (props.onChange) {
      props.onChange(selected);
    }
  };

  // Get the filter province value (if provided)
  const filterKdlokasi = props.kdlokasi;

  // Filter Kanwil data based on province selection
  const availableData = data.filter((item) => {
    // If kdlokasi is "XX" or falsy (no specific province selected), show all kanwil
    // When a specific province is selected, only show kanwil for that province
    // Also exclude kdkanwil="XX" to avoid duplicate keys with hardcoded "Semua Kanwil"
    if (filterKdlokasi && filterKdlokasi !== "XX") {
      return item.kdlokasi === filterKdlokasi && item.kdkanwil !== "XX";
    }
    // Show all kanwil when no province filter is applied
    return item.kdkanwil !== "XX";
  });

  // Role-based filtering with fallback for empty/undefined roles
  const shouldShowAll =
    role === "0" || role === "1" || role === "X" || !role || role === "";

  // Ensure the selected value is valid
  const availableKeys = ["XX", ...availableData.map((item) => item.kdkanwil)];
  const currentValue = props.value || "XX";
  const validSelectedValue = availableKeys.includes(currentValue)
    ? currentValue
    : "XX";

  return (
    <Select
      aria-label="Pilih Kanwil"
      selectedKeys={[validSelectedValue]}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.status !== "pilihkanwil"}
      size={props.size || "sm"}
      placeholder={props.placeholder || "Pilih Kanwil"}
      className={props.className || "min-w-0 flex-[2]"}
      disallowEmptySelection
    >
      <SelectItem key="XX" value="XX" textValue="Semua Kanwil">
        Semua Kanwil
      </SelectItem>
      {shouldShowAll
        ? availableData.map((item) => (
            <SelectItem
              key={item.kdkanwil}
              value={item.kdkanwil}
              textValue={`${item.kdkanwil} - ${item.nmkanwil}`}
            >
              {item.kdkanwil} - {item.nmkanwil}
            </SelectItem>
          ))
        : availableData
            .filter((item) => item.kdkanwil === kdkanwil)
            .map((item) => (
              <SelectItem
                key={item.kdkanwil}
                value={item.kdkanwil}
                textValue={`${item.kdkanwil} - ${item.nmkanwil}`}
              >
                {item.kdkanwil} - {item.nmkanwil}
              </SelectItem>
            ))}
    </Select>
  );
};

export default Kdkanwil;
