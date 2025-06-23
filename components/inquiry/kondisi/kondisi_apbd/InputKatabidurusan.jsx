import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKatabidurusan({ , status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    (value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      isDisabled={status !== "katabidurusan"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKatabidurusan;
