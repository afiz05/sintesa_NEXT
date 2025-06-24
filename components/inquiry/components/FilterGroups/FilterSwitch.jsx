import React from "react";
import { Switch } from "@heroui/react";

const FilterSwitch = ({ id, checked, onChange, label, size = "sm" }) => (
  <div className="flex items-center">
    <Switch id={id} checked={checked} onChange={onChange} size={size} />
    <label htmlFor={id} className="ml-2 text-xs font-semibold">
      {label}
    </label>
  </div>
);

export default FilterSwitch;
