import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputUnit({ unitkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    unitkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      size="sm"
      onChange={handleInputChange}
      isDisabled={status !== "kondisiunit"}
      isRequired
    />
  );
}

export default InputUnit;
