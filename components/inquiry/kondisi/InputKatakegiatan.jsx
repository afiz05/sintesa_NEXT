import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKatakegiatan({ opsikatakegiatan, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatakegiatan(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan jakarta ..."
      isDisabled={status !== "katagiat"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKatakegiatan;
