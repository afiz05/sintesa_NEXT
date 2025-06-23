import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputDept({ deptkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    deptkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 001,002,003, ...dst"
      onChange={handleInputChange}
      isDisabled={status !== "kondisidept"}
      isRequired
      size="sm"
    />
  );
}

export default InputDept;
