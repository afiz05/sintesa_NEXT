#!/bin/bash

# Script to convert all Form.Control in kondisi files to HeroUI Textarea

echo "Converting kondisi files from Form.Control to HeroUI Textarea..."

# Get all files that contain Form.Control
files=$(grep -r "Form\.Control" /Users/djpb/Documents/sintesaNEXT/components/inquiry/kondisi/ 2>/dev/null | cut -d: -f1 | sort | uniq)

for file in $files; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Create backup
        cp "$file" "${file}.backup"
        
        # Read the original file to extract function name and props
        functionName=$(grep "function.*{" "$file" | sed 's/.*function \([^(]*\)(.*/\1/')
        
        # Extract the prop name and status condition from the file
        propName=$(grep -o "[a-zA-Z]*kondisi" "$file" | head -1)
        statusCondition=$(grep -o "status !== \"[^\"]*\"" "$file" | head -1 | sed 's/status !== "\([^"]*\)"/\1/')
        
        # Extract placeholder from original file
        placeholder=$(grep -o "placeholder=\"[^\"]*\"" "$file" | head -1 | sed 's/placeholder="\([^"]*\)"/\1/')
        
        if [ -z "$placeholder" ]; then
            placeholder="Enter text..."
        fi
        
        # Generate new file content
        cat > "$file" << EOF
import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function ${functionName}({ ${propName}, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    ${propName}(value);
  };

  return (
    <Textarea
      minRows={3}
      placeholder="${placeholder}"
      isDisabled={status !== "${statusCondition}"}
      onChange={handleInputChange}
      isRequired
      size="sm"
    />
  );
}

export default ${functionName};
EOF
        
        echo "Converted: $file"
    fi
done

echo "Conversion completed!"
echo "Backup files created with .backup extension"
