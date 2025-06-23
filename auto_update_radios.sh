#!/bin/bash

# Auto-update script for standard 3-option radio components
echo "🚀 Auto-updating standard radio components with enhanced styling..."

# Array of standard radio components (3 options: Kode, Kode Uraian, Uraian)
standard_radios=(
  "akunRadio.jsx"
  "subfungsiRadio.jsx"
  "programRadio.jsx"
  "kegiatanRadio.jsx"
  "outputRadio.jsx"
  "sdanaRadio.jsx"
  "satkerRadio.jsx"
  "kanwilRadio.jsx"
  "kppnRadio.jsx"
  "kabkotaRadio.jsx"
  "provRadio.jsx"
  "dekonRadio.jsx"
)

base_dir="/Users/djpb/Documents/sintesaNEXT/components/inquiry/radio"

for radio_file in "${standard_radios[@]}"; do
  file_path="$base_dir/$radio_file"
  
  if [ -f "$file_path" ]; then
    echo "📝 Processing: $radio_file"
    
    # Read the content and extract the function name and status condition
    function_name=$(grep -o 'function [A-Za-z]*Radio' "$file_path" | sed 's/function //')
    status_condition=$(grep -o 'status !== "[^"]*"' "$file_path" | head -1)
    
    if [ ! -z "$function_name" ] && [ ! -z "$status_condition" ]; then
      echo "   ✓ Found: $function_name with condition: $status_condition"
      
      # Create backup
      cp "$file_path" "${file_path}.backup"
      
      # Apply enhanced styling using a more targeted approach
      # This preserves the structure while enhancing the styling
      sed -i '' '
        /orientation="horizontal"/a\
        classNames={{\
          wrapper: "gap-3 flex-wrap",\
        }}
      ' "$file_path"
      
      # Update individual Radio components with enhanced styling
      sed -i '' 's/<Radio value="1">Kode<\/Radio>/<Radio value="1" classNames={{ base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105", label: "text-sm font-medium text-default-700", control: "data-[selected=true]:bg-primary border-primary" }}>Kode<\/Radio>/g' "$file_path"
      
      sed -i '' 's/<Radio value="2">Kode Uraian<\/Radio>/<Radio value="2" classNames={{ base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105", label: "text-sm font-medium text-default-700", control: "data-[selected=true]:bg-primary border-primary" }}>Kode Uraian<\/Radio>/g' "$file_path"
      
      sed -i '' 's/<Radio value="3">Uraian<\/Radio>/<Radio value="3" classNames={{ base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105", label: "text-sm font-medium text-default-700", control: "data-[selected=true]:bg-primary border-primary" }}>Uraian<\/Radio>/g' "$file_path"
      
      echo "   ✅ Updated successfully!"
    else
      echo "   ❌ Could not parse $radio_file - skipping"
    fi
  else
    echo "   ❌ File not found: $radio_file"
  fi
done

echo ""
echo "🎉 Auto-update completed!"
echo "📁 Backups created with .backup extension"
echo "🔍 Please verify the updates and test the components"
