import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataFungsi({ opsikatafungsi, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikatafungsi(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="ketik fungsi ..."
      isDisabled={status !== "katafungsi"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataFungsi;
