import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataUnit({ opsikataunit, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikataunit(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="ketik unit ..."
      className="mt-1"
      isDisabled={status !== "kataunit"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKataUnit;
