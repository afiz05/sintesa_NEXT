import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataItem({ opsikataitem, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikataitem(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      isDisabled={status !== "kataitem"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataItem;
