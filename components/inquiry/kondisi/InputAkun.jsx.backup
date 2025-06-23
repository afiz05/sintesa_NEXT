import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputAkun({ akunkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    akunkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 511111,511112 ...dst"
      isDisabled={status !== "kondisiakun"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputAkun;
