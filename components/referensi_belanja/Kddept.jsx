import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kddept.json";

const Kddept = (props) => {
  // Destructure the new popoverClassName prop to separate it from other props
  const { popoverClassName, triggerClassName } = props;

  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "000";
    if (props.onChange) props.onChange(val);
  };

  return (
    <Select
      isVirtualized
      selectedKeys={[props.value || "000"]}
      onSelectionChange={handleSelectionChange}
      size={props.size || "sm"}
      className={props.className || "w-full min-w-0 max-w-full"}
      disallowEmptySelection
      aria-label="Pilih Kementerian"
      placeholder="Pilih Kementerian"
      classNames={{
        // Apply the custom class from props for the popover's content area.
        // If no class is provided, it defaults to a reasonable responsive width.
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
      <SelectItem key="000" textValue="Semua Kementerian">
        Semua Kementerian
      </SelectItem>
      {data.map((kl) => (
        <SelectItem key={kl.kddept} textValue={`${kl.kddept} - ${kl.nmdept}`}>
          {/* This span remains to apply ellipsis if the text overflows the container width */}
          <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
            {kl.kddept} - {kl.nmdept}
          </span>
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kddept;
