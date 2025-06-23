import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputItem({ itemkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    itemkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisiitem"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputItem;
