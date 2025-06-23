import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataLevel({ , status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    (value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="ketik level1/level2/level3 ..."
      isDisabled={status !== "katalevel"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKataLevel;
