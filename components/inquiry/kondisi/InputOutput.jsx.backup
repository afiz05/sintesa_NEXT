import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputOutput({ outputkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    outputkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 001,002,003, ...dst"
      isDisabled={status !== "kondisioutput"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputOutput;
