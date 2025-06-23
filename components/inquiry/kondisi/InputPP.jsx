import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputPP({ PPkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    PPkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "kondisiPP"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputPP;
