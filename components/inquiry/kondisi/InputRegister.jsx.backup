import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputRegister({ registerkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    registerkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisiregister"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputRegister;
