#!/bin/bash

# Script to fix broken kondisi files with missing prop names

echo "Fixing broken kondisi files..."

# Array of files that need fixing
broken_files=(
    "InputKataFungsi.jsx:opsikatasfungsi"
    "InputKataItem.jsx:opsikataitem"
    "InputKatakegiatan.jsx:opsikataprogram"
    "InputKataKomponen.jsx:opsikatakomponen"
    "InputKataKppn.jsx:opsikatakppn"
    "InputKataOutput.jsx:opsikataoutput"
    "InputKataProgram.jsx:opsikataprogram"
    "InputKataProv.jsx:opsikataprov"
    "InputKataRegister.jsx:opsikataregister"
    "InputKataSdana.jsx:opsikatsdana"
    "InputKataSubfungsi.jsx:opsikatasubfungsi"
    "InputKataSubKomponen.jsx:opsikatasubkomponen"
    "InputKataSubOutput.jsx:opsikatasuboutput"
)

for item in "${broken_files[@]}"; do
    IFS=':' read -r filename propname <<< "$item"
    filepath="/Users/djpb/Documents/sintesaNEXT/components/inquiry/kondisi/$filename"
    
    if [ -f "$filepath" ]; then
        echo "Fixing $filename with prop $propname"
        
        # Extract function name
        functionName=$(echo "$filename" | sed 's/\.jsx$//')
        
        # Get original placeholder from backup file
        backup_file="${filepath}.backup.backup"
        if [ -f "$backup_file" ]; then
            placeholder=$(grep -o "placeholder=\"[^\"]*\"" "$backup_file" | head -1 | sed 's/placeholder="\([^"]*\)"/\1/')
            status_condition=$(grep -o "status !== \"[^\"]*\"" "$backup_file" | head -1 | sed 's/status !== "\([^"]*\)"/\1/')
        else
            placeholder="Enter text..."
            status_condition="condition"
        fi
        
        # Create new file content
        cat > "$filepath" << EOF
import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function ${functionName}({ ${propname}, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    ${propname}(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="${placeholder}"
      isDisabled={status !== "${status_condition}"}
      onChange={handleInputChange}
      isRequired
      size="sm"
      className="mt-1"
    />
  );
}

export default ${functionName};
EOF
        echo "Fixed: $filename"
    fi
done

echo "All broken files have been fixed!"
