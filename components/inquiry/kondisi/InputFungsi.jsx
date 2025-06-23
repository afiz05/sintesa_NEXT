import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputFungsi({ fungsikondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    fungsikondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisifungsi"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputFungsi;
