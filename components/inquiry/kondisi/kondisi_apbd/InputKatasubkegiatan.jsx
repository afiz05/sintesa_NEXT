import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKatasubkegiatan({ , status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    (value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      isDisabled={status !== "katasubgiat"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputKatasubkegiatan;
