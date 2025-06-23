import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function Inputkegiatan({ kegiatankondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    kegiatankondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02 ...dst"
      isDisabled={status !== "kondisigiat"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default Inputkegiatan;
