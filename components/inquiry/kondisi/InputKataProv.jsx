import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataProv({ opsikataprov, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikataprov(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      isDisabled={status !== "kataprov"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataProv;
