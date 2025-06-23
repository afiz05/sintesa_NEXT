import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputDekon({ dekonkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    dekonkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisidekon"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputDekon;
