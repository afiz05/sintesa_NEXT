import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function Inputurusan({ urusankondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    urusankondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02 ...dst"
      isDisabled={status !== "kondisiurusan"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default Inputurusan;
