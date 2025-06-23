import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataOutput({ opsikataoutput, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikataoutput(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      isDisabled={status !== "kataoutput"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataOutput;
