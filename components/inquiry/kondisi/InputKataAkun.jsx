import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function InputKataAkun({ opsikataakun, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    opsikataakun(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="ketik akun/bkpk/jenbel ..."
      isDisabled={status !== "kataakun"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default InputKataAkun;
