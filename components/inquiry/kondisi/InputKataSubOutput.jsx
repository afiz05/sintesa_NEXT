import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataSubOutput({ opsikatasuboutput, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatasuboutput(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="ketik nama ro ..."
      isDisabled={status !== "katasuboutput"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataSubOutput;
