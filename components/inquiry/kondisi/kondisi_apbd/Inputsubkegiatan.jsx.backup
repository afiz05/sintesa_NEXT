import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function Inputsubkegiatan({ subkegiatankondisi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    subkegiatankondisi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="misalkan 01,02 ...dst"
      isDisabled={status !== "kondisisubgiat"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default Inputsubkegiatan;
