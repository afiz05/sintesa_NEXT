import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputMP({ MPkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    MPkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "kondisiMP"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputMP;
