"use client";
import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputPRI({ PRIkondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    PRIkondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "kondisiPRI"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default InputPRI;
