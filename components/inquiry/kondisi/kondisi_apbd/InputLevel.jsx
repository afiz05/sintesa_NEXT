import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputLevel({ levelkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    levelkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 511111,511112 ...dst"
      isDisabled={status !== "kondisilevel"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputLevel;
