import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdunit.json";

const Kdunit = (props) => {
  // Destructure props for easier access and clarity
  const {
    value,
    onChange,
    status,
    size,
    placeholder,
    className,
    kddept,
    popoverClassName,
    triggerClassName,
    isDisabled,
    ...otherProps
  } = props;

  // Handler to always pass a string value to the parent component.
  // This matches the robust handler from Kddept.jsx
  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "XX";
    if (onChange) onChange(val);
  };

  return (
    <Select
      isVirtualized
      // Use selectedKeys (plural) which expects an array
      selectedKeys={[value || "XX"]}
      onSelectionChange={handleSelectionChange}
      // Combine the original disabled logic with new isDisabled prop
      isDisabled={isDisabled || status !== "pilihunit"}
      size={size || "sm"}
      placeholder={placeholder || "Pilih Unit"}
      className={className || "w-full min-w-0 max-w-full"}
      disallowEmptySelection
      aria-label="Pilih Unit"
      classNames={{
        // Apply custom class from props for popover width, with a sensible default
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
      <SelectItem key="XX" textValue="Semua Unit">
        Semua Unit
      </SelectItem>
      {data
        // Preserve the crucial filtering logic from the original component
        .filter((item) => !kddept || item.kddept === kddept)
        .map((item) => (
          <SelectItem
            key={item.kdunit}
            textValue={`${item.kdunit} - ${item.nmunit}`}
          >
            {/* This span applies ellipsis for clean UI with long text */}
            <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
              {item.kdunit} - {item.nmunit}
            </span>
          </SelectItem>
        ))}
    </Select>
  );
};

export default Kdunit;
