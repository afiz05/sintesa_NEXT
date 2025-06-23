import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataKppn({ opsikatakppn, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatakppn(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="ketik kppn ..."
      isDisabled={status !== "katakppn"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataKppn;
