import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataSdana({ opsikatasdana, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatasdana(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "katasdana"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataSdana;
