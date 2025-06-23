#!/bin/bash

# Define components to create
components=(
    "SubfungsiRadio:subfungsiRadio:pilihsubfungsi"
    "ProgramRadio:programRadio:pilihprogram"
    "KegiatanRadio:kegiatanRadio:pilihkegiatan"
    "OutputRadio:outputRadio:pilihoutput"
    "KanwilRadio:kanwilRadio:pilihkanwil"
    "KppnRadio:kppnRadio:pilihkppn"
    "SatkerRadio:satkerRadio:pilihsatker"
)

for component in "${components[@]}"; do
    IFS=':' read -r name prop condition <<< "$component"
    filename=$(echo "$name" | sed 's/Radio$/Radio.jsx/')
    
    cat > "/Users/djpb/Documents/sintesaNEXT/components/inquiry/radio/${filename}" << EOF
import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

function ${name}({ ${prop}, selectedValue, status }) {
  const handleRadioChange = (value) => {
    ${prop}(value);
  };

  return (
    <div className="fade-in pilihan">
      <RadioGroup
        value={selectedValue}
        onValueChange={handleRadioChange}
        isDisabled={status !== "${condition}"}
        orientation="horizontal"
        size="sm"
      >
        <Radio value="1">Kode</Radio>
        <Radio value="2">Kode Uraian</Radio>
        <Radio value="3">Uraian</Radio>
        {/* Uncomment if needed:
        <Radio value="4">Jangan Tampil</Radio>
        */}
      </RadioGroup>
    </div>
  );
}

export default ${name};
EOF
    
    echo "Created ${filename}"
done

echo "All components created successfully!"
