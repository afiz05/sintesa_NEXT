import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputSubOutput({ suboutputkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    suboutputkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 001,002,003, ...dst"
      isDisabled={status !== "kondisisuboutput"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputSubOutput;
