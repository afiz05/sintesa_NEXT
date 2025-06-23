#!/bin/bash

# Enhanced Radio Components Styling Template
# This script creates a template for consistent radio styling across all components

echo "Creating enhanced radio styling template..."

# Define the enhanced radio styling classes
RADIO_BASE_CLASSES="inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105"
RADIO_LABEL_CLASSES="text-sm font-medium text-default-700"
RADIO_CONTROL_CLASSES="data-[selected=true]:bg-primary border-primary"
RADIOGROUP_WRAPPER_CLASSES="gap-3 flex-wrap"

# Create template function
create_enhanced_radio_template() {
cat << 'EOF'
// Enhanced Radio Template - Copy this styling to radio components

// RadioGroup styling:
classNames={{
  wrapper: "gap-3 flex-wrap",
}}

// Individual Radio styling:
classNames={{
  base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105",
  label: "text-sm font-medium text-default-700",
  control: "data-[selected=true]:bg-primary border-primary",
}}

// Features included:
// ✅ Card-like appearance with border
// ✅ Hover effects with scale
// ✅ Smooth transitions
// ✅ Primary color theming
// ✅ Proper spacing and typography
// ✅ Disabled state handling
// ✅ Responsive flex wrapping

EOF
}

# Create the template file
create_enhanced_radio_template > "/Users/djpb/Documents/sintesaNEXT/radio_styling_template.md"

echo "✅ Template created at: radio_styling_template.md"
echo ""
echo "📋 Quick update guide:"
echo "1. Add to RadioGroup: classNames={{ wrapper: \"gap-3 flex-wrap\" }}"
echo "2. Add to each Radio: the classNames object from template"
echo "3. Ensure proper transition effects and hover states"
echo ""
echo "🎨 Enhanced features:"
echo "- Card-like design with subtle borders"
echo "- Smooth hover animations with scale effect"
echo "- Primary color theme integration"
echo "- Better spacing and typography"
echo "- Responsive flex wrapping"

# List radio files that need updating
echo ""
echo "📂 Radio files to update:"
find /Users/djpb/Documents/sintesaNEXT/components/inquiry/radio -name "*Radio.jsx" -type f | sort
