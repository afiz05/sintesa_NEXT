# Fungsi & Sub-Fungsi Filter State Synchronization Guide

## Overview

This document outlines the complete state synchronization implementation for the Fungsi (Function) and Sub-Fungsi (Sub-Function) filters in the inquiry system.

## State Architecture

### 1. Core State Variables (useInquiryState.js)

#### Filter Switch States

```javascript
const [kdfungsi, setKdfungsi] = useState(false); // Fungsi filter toggle
const [kdsfungsi, setKdsfungsi] = useState(false); // Sub-fungsi filter toggle
```

#### Filter Values

```javascript
const [fungsi, setFungsi] = useState("XX"); // Selected function code
const [fungsikondisi, setFungsikondisi] = useState(""); // Advanced condition filter
const [katafungsi, setKatafungsi] = useState(""); // Keyword search
const [sfungsi, setSfungsi] = useState("XX"); // Selected sub-function code
const [subfungsikondisi, setSubfungsikondisi] = useState(""); // Advanced condition filter
const [katasubfungsi, setKatasubfungsi] = useState(""); // Keyword search
```

#### Display Radio States

```javascript
const [fungsiradio, setFungsiradio] = useState("1"); // How to display function
const [subfungsiradio, setSubfungsiradio] = useState("1"); // How to display sub-function
```

### 2. State Flow & Synchronization

#### Component Hierarchy

```
formInquiryMod.jsx
├── FilterSelector.jsx (FilterSection)
    ├── FungsiFilter.jsx (when kdfungsi === true)
    └── SubfungsiFilter.jsx (when kdsfungsi === true)
```

#### State Passing Chain

1. **useInquiryState.js** → **formInquiryMod.jsx** (via destructuring)
2. **formInquiryMod.jsx** → **FilterSelector.jsx** (via inquiryState prop)
3. **FilterSelector.jsx** → **FungsiFilter.jsx** & **SubfungsiFilter.jsx** (via inquiryState prop)

### 3. Filter Components

#### FungsiFilter Component

- **Location**: `components/inquiry/components/FilterGroups/FungsiFilter.jsx`
- **Icon**: BookText (lucide-react)
- **Background**: Purple to blue gradient
- **Fields**:
  - Function Selection (Kdfungsi component)
  - Condition Input (comma-separated codes, supports ! for exclude)
  - Keyword Search (search by function name)
  - Display Type (Kode/Kode Uraian/Uraian/Jangan Tampilkan)

#### SubfungsiFilter Component

- **Location**: `components/inquiry/components/FilterGroups/SubfungsiFilter.jsx`
- **Icon**: Layers (lucide-react)
- **Background**: Indigo to purple gradient
- **Fields**:
  - Sub-Function Selection (Kdsfungsi component - filtered by parent function)
  - Condition Input (comma-separated codes, supports ! for exclude)
  - Keyword Search (search by sub-function name)
  - Display Type (Kode/Kode Uraian/Uraian/Jangan Tampilkan)

### 4. Reference Components

#### Kdfungsi Component

- **Location**: `components/referensi_belanja/Kdfungsi.jsx`
- **Data Source**: `data/Kdfungsi.json`
- **Props**:
  - `kdfungsi`: Selected function code
  - `onChange`: Function to update selection
  - `status`: Component status ("pilihfungsi" to enable)
- **Default Mapping**: "XX" state → "00" component (Semua Fungsi)

#### Kdsfungsi Component

- **Location**: `components/referensi_belanja/Kdsfungsi.jsx`
- **Data Source**: `data/Kdsfungsi.json`
- **Props**:
  - `kdsfungsi`: Selected sub-function code
  - `kdfungsi`: Parent function code (for filtering)
  - `onChange`: Function to update selection
  - `status`: Component status ("pilihsubfungsi" to enable)
- **Default Mapping**: "XX" state → "00" component (Semua Sub Fungsi)

### 5. Query Builder Integration

#### Filter Logic (useQueryBuilder.js)

```javascript
// Function filter - only apply if kdfungsi switch is enabled
if (kdfungsi === true) {
  // Advanced condition filtering with include/exclude logic
  if (fungsikondisi && fungsikondisi.trim() !== "") {
    // Handle comma-separated codes with ! for exclude
  } else if (fungsi !== "XX") {
    conditions.push(`a.kdfungsi = '${fungsi}'`);
  }

  // Keyword search with database join
  if (katafungsi && katafungsi.trim() !== "") {
    // JOIN with ref_fungsi table for name search
  }
}

// Similar logic for sub-function filter
```

#### GROUP BY Logic

```javascript
// Function grouping - only if kdfungsi filter switch is enabled
if (kdfungsi === true && fungsiradio !== "4") {
  if (fungsiradio === "1") {
    // Show code only
  } else if (fungsiradio === "2") {
    // Show code + description
  } else if (fungsiradio === "3") {
    // Show description only
  }
}
```

### 6. State Reset & Default Values

#### Reset Function (formInquiryMod.jsx)

```javascript
const handleReset = () => {
  // Filter switches
  setKdfungsi(false);
  setKdsfungsi(false);

  // Filter values
  setFungsi("XX");
  setFungsikondisi("");
  setKatafungsi("");
  setSfungsi("XX");
  setSubfungsikondisi("");
  setKatasubfungsi("");

  // Display options
  setFungsiradio("1");
  setSubfungsiradio("1");
};
```

### 7. Key Relationships

#### Parent-Child Dependency

- **SubfungsiFilter** depends on **FungsiFilter** selection
- When `fungsi` changes, `Kdsfungsi` component filters sub-functions
- Both filters can be used independently or together

#### Switch-Filter Relationship

- **FungsiFilter** only renders when `kdfungsi === true`
- **SubfungsiFilter** only renders when `kdsfungsi === true`
- Query building only includes filters when their switches are enabled

### 8. Data Format & Values

#### Function Codes

- **State Default**: "XX" (no specific selection)
- **Component Default**: "00" (Semua Fungsi)
- **Valid Codes**: "01", "02", "03", etc. (from Kdfungsi.json)

#### Sub-Function Codes

- **State Default**: "XX" (no specific selection)
- **Component Default**: "00" (Semua Sub Fungsi)
- **Valid Codes**: "01", "02", "03", etc. (from Kdsfungsi.json, filtered by parent function)

#### Display Options

1. **"1"** - Kode (Show code only)
2. **"2"** - Kode Uraian (Show code + description)
3. **"3"** - Uraian (Show description only)
4. **"4"** - Jangan Tampilkan (Don't display in results)

### 9. Advanced Filtering Features

#### Condition Filtering

- **Format**: Comma-separated codes
- **Include**: "01,02,03" (include these codes)
- **Exclude**: "!01,!02" (exclude these codes)
- **Mixed**: "01,02,!03" (include 01,02 but exclude 03)

#### Keyword Search

- Searches in function/sub-function names (nmfungsi/nmsfungsi)
- Uses LIKE '%keyword%' in SQL
- Requires database JOIN with reference tables

### 10. Error Handling & Validation

#### Default Value Mapping

- Components handle "XX" → "00" mapping automatically
- No manual validation needed for default states
- HeroUI Select components require `textValue` props for proper functionality

#### State Consistency

- All state variables properly exported from useInquiryState.js
- All variables passed through component chain
- Query builder receives all necessary state variables

## Implementation Status

✅ **Completed Features:**

- Modern UI components with HeroUI
- Complete state management
- Advanced filtering (condition + keyword)
- Query builder integration
- Parent-child filter relationship
- Default value handling
- Reset functionality
- Switch-based filter control

✅ **All Tests Passing:**

- No compilation errors
- Proper state synchronization
- Correct default selections
- Query generation working

## Usage Examples

### Basic Function Filter

1. Enable "Fungsi" switch in FilterSelector
2. Select function from dropdown (defaults to "Semua Fungsi")
3. Choose display type (defaults to "Kode")
4. Filter appears in generated SQL query

### Advanced Function Filter

1. Enable "Fungsi" switch
2. Use condition input: "01,02,!10" (include 01,02 but exclude 10)
3. Use keyword search: "UMUM" (search for functions containing "UMUM")
4. Both conditions combined in WHERE clause

### Sub-Function with Parent Dependency

1. Enable "Fungsi" switch, select specific function (e.g., "01")
2. Enable "Sub-fungsi" switch
3. Sub-function dropdown automatically filters to show only sub-functions under "01"
4. Both function and sub-function filters apply to query

This implementation provides a complete, robust, and user-friendly function and sub-function filtering system that integrates seamlessly with the existing inquiry architecture.
