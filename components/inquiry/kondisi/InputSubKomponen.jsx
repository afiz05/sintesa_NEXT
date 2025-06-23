import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputSubKomponen({ subkomponenkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    subkomponenkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisisubkomponen"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputSubKomponen;
