import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputProv({ provkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    provkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 001,002,003, ...dst"
      isDisabled={status !== "kondisiprov"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputProv;
