import React, { useState } from "react";
import { Input } from "@heroui/react";

function InputKataDept({ opsikatadept, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;

    opsikatadept(value);
  };

  return (
    <Input
      placeholder="misalkan keuangan ..."
      className="mt-1"
      isDisabled={status !== "katadept"}
      onChange={handleInputChange}
      required
      size="sm"
    />
  );
}

export default InputKataDept;
