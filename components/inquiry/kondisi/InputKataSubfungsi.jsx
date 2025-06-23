import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataSubfungsi({ opsikatasubfungsi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatasubfungsi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan kedinasan ..."
      isDisabled={status !== "katasubfungsi"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataSubfungsi;
