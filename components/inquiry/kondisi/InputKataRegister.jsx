import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataRegister({ opsikataregister, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikataregister(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "kataregister"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataRegister;
