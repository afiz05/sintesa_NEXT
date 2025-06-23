#!/bin/bash

# Script to update all radio components with enhanced styling

echo "Updating radio components with enhanced styling..."

# List of radio files to update
radio_files=(
  "unitRadio.jsx"
  "dekonRadio.jsx"
  "provRadio.jsx"
  "kabkotaRadio.jsx"
  "kanwilRadio.jsx"
  "kppnRadio.jsx"
  "satkerRadio.jsx"
  "akunRadio.jsx"
  "fungsiRadio.jsx"
  "subfungsiRadio.jsx"
  "programRadio.jsx"
  "kegiatanRadio.jsx"
  "outputRadio.jsx"
  "sdanaRadio.jsx"
  "pnRadio.jsx"
  "ppRadio.jsx"
  "soutputRadio.jsx"
  "kegppRadio.jsx"
  "priRadio.jsx"
  "MpRadio.jsx"
  "TemaRadio.jsx"
  "IknRadio.jsx"
  "InflasiRadio.jsx"
)

# Base directory
base_dir="/Users/djpb/Documents/sintesaNEXT/components/inquiry/radio"

for file in "${radio_files[@]}"; do
  if [ -f "$base_dir/$file" ]; then
    echo "Processing: $file"
    
    # Add enhanced styling to each Radio component
    sed -i '' 's/classNames={{/classNames={{\
              base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 data-[disabled=true]:opacity-50 transition-all duration-200 hover:scale-105",\
              label: "text-sm font-medium text-default-700",\
              control: "data-[selected=true]:bg-primary border-primary",\
            }}\
          classNames={{/' "$base_dir/$file"
    
    # Update RadioGroup wrapper styling
    sed -i '' 's/orientation="horizontal"/orientation="horizontal"\
        classNames={{\
          wrapper: "gap-3 flex-wrap",\
        }}/' "$base_dir/$file"
    
    echo "Updated: $file"
  else
    echo "File not found: $file"
  fi
done

echo "All radio components have been updated with enhanced styling!"
