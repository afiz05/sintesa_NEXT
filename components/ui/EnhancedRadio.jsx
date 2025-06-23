import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

// Enhanced Radio Component dengan styling yang konsisten
const EnhancedRadio = ({
  value,
  isDisabled = false,
  children,
  className = "",
}) => (
  <Radio
    value={value}
    isDisabled={isDisabled}
    classNames={{
      base: `inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[200px] cursor-pointer rounded-lg gap-2 p-3 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 data-[disabled=true]:opacity-50 transition-all duration-200 ${className}`,
      label: "text-sm font-medium text-default-700",
      wrapper: "group-data-[selected=true]:border-primary",
      control:
        "data-[selected=true]:bg-primary data-[selected=true]:border-primary",
    }}
  >
    {children}
  </Radio>
);

// Enhanced RadioGroup Component
const EnhancedRadioGroup = ({
  value,
  onValueChange,
  isDisabled = false,
  orientation = "horizontal",
  size = "sm",
  children,
  className = "",
}) => (
  <div className={`fade-in pilihan ${className}`}>
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      isDisabled={isDisabled}
      orientation={orientation}
      size={size}
      classNames={{
        wrapper: "gap-2 flex-wrap",
        base: "data-[selected=true]:bg-primary-50",
      }}
    >
      {children}
    </RadioGroup>
  </div>
);

export { EnhancedRadio, EnhancedRadioGroup };
