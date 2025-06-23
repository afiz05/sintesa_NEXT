import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputSubfungsi({ subfungsikondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    subfungsikondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisisubfungsi"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputSubfungsi;
