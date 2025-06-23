import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function Inputkdkabkota({ kdkabkotakondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    kdkabkotakondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02,03, ...dst"
      isDisabled={status !== "kondisikdkabkota"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default Inputkdkabkota;
