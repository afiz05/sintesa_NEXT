import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputProgram({ programkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    programkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02 ...dst"
      isDisabled={status !== "kondisiprogram"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputProgram;
