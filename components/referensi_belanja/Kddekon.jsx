import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kddekon.json";

const Kddekon = (props) => {
  // Destructure props for easier access and clarity
  const {
    value,
    onChange,
    status,
    size,
    placeholder,
    className,
    popoverClassName,
    triggerClassName,
  } = props;

  // Standardized handler to always pass a string value to the parent
  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "00"; // Use "00" as the default key
    if (onChange) onChange(val);
  };

  return (
    <Select
      isVirtualized
      // Use selectedKeys (plural) which expects an array for better compatibility
      selectedKeys={[String(value || "00")]}
      onSelectionChange={handleSelectionChange}
      isDisabled={status !== "pilihdekon"}
      size={size || "sm"}
      placeholder={placeholder || "Pilih Kewenangan"}
      className={className || "w-full min-w-0 max-w-full"}
      disallowEmptySelection
      aria-label="Pilih Kewenangan"
      classNames={{
        // Apply custom class from props for popover width, with a default
        popoverContent: popoverClassName || "w-80 sm:w-96",
        // Make trigger responsive - full width by default, can be overridden
        trigger: `${triggerClassName || "w-full"} max-w-full`,
        // Fix the value display to prevent stretching when long text is selected
        value: "truncate pr-8 max-w-full overflow-hidden",
        // Ensure the main input area doesn't expand
        mainWrapper: "w-full max-w-full",
        innerWrapper: "w-full max-w-full overflow-hidden",
        // Additional constraint on the base element
        base: "w-full max-w-full",
        // Ensure the label area doesn't expand
        label: "truncate",
      }}
    >
      <SelectItem key="00" textValue="Semua Kewenangan">
        Semua Kewenangan
      </SelectItem>
      {data.map((item) => (
        <SelectItem
          key={String(item.kddekon)}
          textValue={`${item.kddekon} - ${item.nmdekon}`}
        >
          {/* This span applies ellipsis for clean UI with long text */}
          <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
            {item.kddekon} - {item.nmdekon}
          </span>
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kddekon;
