import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputSdana({ sdanakondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    sdanakondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 001,002,003, ...dst"
      isDisabled={status !== "kondisisdana"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputSdana;
