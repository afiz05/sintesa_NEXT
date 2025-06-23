#!/bin/bash

# Script to fix all broken InputKata files by extracting prop names from backup files

echo "Fixing all broken InputKata files..."

# Find all files with the broken pattern
broken_files=$(grep -l "function.*{ ," /Users/djpb/Documents/sintesaNEXT/components/inquiry/kondisi/*.jsx 2>/dev/null)

for file in $broken_files; do
    echo "Processing: $file"
    
    # Get the base filename
    basename_file=$(basename "$file")
    filename_without_ext="${basename_file%.jsx}"
    
    # Look for the backup file
    backup_file="${file}.backup.backup"
    
    if [ -f "$backup_file" ]; then
        echo "Found backup for $basename_file"
        
        # Extract prop name from backup
        prop_name=$(grep -o "function.*{[^}]*}" "$backup_file" | sed 's/.*{ *\([^,]*\) *, *status *}.*/\1/')
        
        # Extract placeholder from backup
        placeholder=$(grep -o "placeholder=\"[^\"]*\"" "$backup_file" | head -1 | sed 's/placeholder="\([^"]*\)"/\1/')
        
        # Extract status condition from backup  
        status_condition=$(grep -o "status !== \"[^\"]*\"" "$backup_file" | head -1 | sed 's/status !== "\([^"]*\)"/\1/')
        
        if [ -n "$prop_name" ] && [ "$prop_name" != "status" ]; then
            echo "Creating fixed version with prop: $prop_name"
            
            # Create the fixed file
            cat > "$file" << EOF
import React, { useState } from "react";
import { Textarea } from "@heroui/react";

function ${filename_without_ext}({ ${prop_name}, status }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    ${prop_name}(value);
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

export default ${filename_without_ext};
EOF
            echo "Fixed: $basename_file"
        else
            echo "Could not extract prop name for $basename_file"
        fi
    else
        echo "No backup found for $basename_file"
    fi
done

echo "All broken files have been processed!"
