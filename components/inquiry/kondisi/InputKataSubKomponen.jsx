import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataSubKomponen({ opsikatasubkomponen, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatasubkomponen(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan pendidikan ..."
      isDisabled={status !== "katasubkomponen"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataSubKomponen;
