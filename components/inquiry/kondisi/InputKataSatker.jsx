import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataSatker({ opsikatasatker, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatasatker(value); // Mengirim nilai input ke komponen induk
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan polres nias ..."
      className="mt-1"
      isDisabled={status !== "katasatker"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKataSatker;
