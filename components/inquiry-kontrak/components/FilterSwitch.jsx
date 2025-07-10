import React from "react";
import { Switch } from "@heroui/react";

const FilterSwitch = ({
  id,
  checked,
  onChange,
  label,
  size = "sm",
  disabled = false,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-2 py-1 rounded-2xl shadow-sm transition-all duration-300 group ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <Switch
        id={id}
        isSelected={checked}
        onValueChange={disabled ? undefined : onChange}
        size={size}
        isDisabled={disabled}
        aria-label={label}
        aria-labelledby={`${id}-label`}
        classNames={{
          wrapper:
            "group-data-[selected=true]:bg-gradient-to-r group-data-[selected=true]:from-purple-400 group-data-[selected=true]:to-blue-400",
          thumb: "group-data-[selected=true]:bg-white shadow-lg",
        }}
      />
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={`text-sm font-medium transition-colors duration-200 flex-1 ${
          disabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 group-hover:text-purple-600 cursor-pointer"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FilterSwitch;
