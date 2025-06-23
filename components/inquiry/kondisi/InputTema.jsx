import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputTema({ Temakondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    Temakondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "kondisiTema"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputTema;
