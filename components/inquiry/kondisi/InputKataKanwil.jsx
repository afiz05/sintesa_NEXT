import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataKanwil({ opsikatakanwil, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatakanwil(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      className="mt-1"
      isDisabled={status !== "katakanwil"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKataKanwil;
