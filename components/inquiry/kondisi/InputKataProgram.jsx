import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataProgram({ opsikataprogram, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikataprogram(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan dukungan manajemen ..."
      isDisabled={status !== "kataprogram"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataProgram;
