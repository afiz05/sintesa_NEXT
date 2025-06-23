import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKanwil({ kanwilkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    kanwilkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisikanwil"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKanwil;
