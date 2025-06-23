import React, { useContext, useState } from "react";
import { Textarea } from "@heroui/react";

function InputKppn({ kppnkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    kppnkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 079,080,081, ...dst"
      className="mt-1"
      isDisabled={status !== "kondisikppn"}
      onChange={handleInputChange}
      size="sm"
    />
  );
}

export default InputKppn;
