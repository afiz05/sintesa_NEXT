# PowerShell script to add aria-label attributes to Select components for accessibility
$files = Get-ChildItem -Path "components\referensi_belanja\referensi_inquiryMod\*.jsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Skip if aria-label already exists
    if ($content -match 'aria-label=') {
        Write-Host "Skipping $($file.Name) - aria-label already exists"
        continue
    }
    
    # Extract placeholder value and add aria-label
    if ($content -match 'placeholder="([^"]*)"') {
        $placeholderValue = $Matches[1]
        
        # Replace placeholder line to include aria-label
        $newContent = $content -replace 'placeholder="([^"]*)"(\s+)(className="[^"]*")', 'placeholder="$1"$2className="$3"$2aria-label="$1"'
        
        if ($newContent -ne $content) {
            Set-Content -Path $file.FullName -Value $newContent
            Write-Host "Updated $($file.Name) - Added aria-label: $placeholderValue"
        }
    }
    elseif ($content -match 'placeholder=\{[^}]*\}') {
        # Handle dynamic placeholders - add a generic aria-label
        $newContent = $content -replace '(placeholder=\{[^}]*\})(\s+)(className="[^"]*")', '$1$2className="$3"$2aria-label="Select option"'
        
        if ($newContent -ne $content) {
            Set-Content -Path $file.FullName -Value $newContent
            Write-Host "Updated $($file.Name) - Added generic aria-label"
        }
    }
}

Write-Host "Accessibility fixes completed!"
