import React, { useContext } from "react";
import { Select, SelectItem } from "@heroui/react";
import MyContext from "@/utils/Context";
import data from "../../../data/Kdlokasi.json";

const Kdlokasi = (props) => {
  // Destructure the new popoverClassName and triggerClassName props
  const { popoverClassName, triggerClassName } = props;
  const { role, kdlokasi } = useContext(MyContext);
  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "XX";
    if (props.onChange) {
      props.onChange(val);
    }
  };

  // Determine user permissions
  // Treat empty role as admin for backward compatibility
  const canSeeAllProvinces =
    role === "0" || role === "1" || role === "X" || role === "" || !role; // Determine selectable data based on role
  const selectableData = canSeeAllProvinces
    ? data
    : data.filter((item) => item.kdlokasi === kdlokasi);
  // Ensure the selected value exists in the collection
  const availableKeys = ["XX", ...selectableData.map((item) => item.kdlokasi)];
  const currentValue = props.value || "XX";
  const validSelectedValue = availableKeys.includes(currentValue)
    ? currentValue
    : "XX";

  return (
    <Select
      isVirtualized
      selectedKeys={new Set([validSelectedValue])}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.status !== "pilihprov"}
      size={props.size || "sm"}
      placeholder={props.placeholder || "Pilih Provinsi"}
      className={props.className || "w-full min-w-0 max-w-full"}
      disallowEmptySelection
      aria-label="Pilih Provinsi"
      classNames={{
        popoverContent: popoverClassName || "w-80 sm:w-96",
        trigger: `${triggerClassName || "w-full"} max-w-full`,
        value: "truncate pr-8 max-w-full overflow-hidden",
        mainWrapper: "w-full max-w-full",
        innerWrapper: "w-full max-w-full overflow-hidden",
        base: "w-full max-w-full",
        label: "truncate",
      }}
    >
      {" "}
      <SelectItem key="XX" textValue="Semua Provinsi">
        Semua Provinsi
      </SelectItem>
      {selectableData.map((item) => (
        <SelectItem
          key={item.kdlokasi}
          textValue={`${item.kdlokasi} - ${item.nmlokasi}`}
        >
          <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
            {item.kdlokasi} - {item.nmlokasi}
          </span>
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdlokasi;
