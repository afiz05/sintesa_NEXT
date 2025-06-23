import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputSatker({ satkerkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    satkerkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 423900,527060,000001, ...dst"
      className="mt-1"
      isDisabled={status !== "kondisisatker"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputSatker;
