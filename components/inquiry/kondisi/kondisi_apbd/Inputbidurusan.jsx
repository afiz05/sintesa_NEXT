import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function Inputbidurusan({ bidurusankondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    bidurusankondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02 ...dst"
      isDisabled={status !== "kondisibidurusan"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default Inputbidurusan;
