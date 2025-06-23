import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataKomponen({ opsikatakomponen, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatakomponen(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      isDisabled={status !== "katakomponen"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataKomponen;
