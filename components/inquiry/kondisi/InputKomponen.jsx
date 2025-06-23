import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKomponen({ komponenkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    komponenkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisikomponen"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKomponen;
