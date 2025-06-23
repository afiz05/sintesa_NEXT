import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKegPP({ KegPPkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    KegPPkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "kondisiKegPP"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKegPP;
