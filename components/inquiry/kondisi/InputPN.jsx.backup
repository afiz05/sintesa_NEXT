import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputPN({ PNkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    PNkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "kondisiPN"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputPN;
