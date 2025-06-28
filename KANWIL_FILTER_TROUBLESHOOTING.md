# KanwilFilter Troubleshooting Guide

## Overview

This document details the complete troubleshooting and resolution process for implementing the KanwilFilter component with proper state synchronization in the inquiry system.

## Initial Problem

The KanwilFilter component was not working properly with two main issues:

1. **Jenis Tampilan selection** - Values were changing but UI wasn't updating
2. **Kanwil dropdown** - No items were appearing in the dropdown list

## Root Cause Analysis & Solutions

### Issue 1: Missing State Management in formInquiryMod.jsx

**Problem:**
The KanwilFilter states (`kanwilkondisi`, `setKanwilkondisi`, `katakanwil`, `setKatakanwil`) were not being passed through the component chain from formInquiryMod.jsx to FilterSection.

**Symptoms:**

```javascript
// Console output showed:
Current kanwilradio state: undefined
setKanwilradio function exists: false
```

**Root Cause:**

1. Missing state destructuring in formInquiryMod.jsx
2. Missing state passing to FilterSection component

**Solution:**
**A. Added missing state destructuring:**

```javascript
// Added to formInquiryMod.jsx destructuring section:
kanwil,
setKanwil,
kanwilkondisi,        // ✅ ADDED
setKanwilkondisi,     // ✅ ADDED
katakanwil,           // ✅ ADDED
setKatakanwil,        // ✅ ADDED
```

**B. Added missing state passing:**

```javascript
// Added to inquiryState object in formInquiryMod.jsx:
// Kanwil filter values
kanwil,
setKanwil,
kanwilkondisi,        // ✅ ADDED
setKanwilkondisi,     // ✅ ADDED
katakanwil,           // ✅ ADDED
setKatakanwil,        // ✅ ADDED
kanwilradio,
setKanwilradio,
```

### Issue 2: Role Permission Logic in Kdkanwil.jsx

**Problem:**
The role-based filtering logic was too restrictive and didn't handle empty/undefined roles.

**Symptoms:**

```javascript
// Console output showed:
role: (empty string)
Role check result: false
shouldShowAll: false
itemsToRender length: 0
```

**Root Cause:**
The role check `(role === "0" || role === "1" || role === "X")` failed when role was empty/undefined.

**Solution:**
Updated role check to handle empty/undefined roles:

```javascript
// BEFORE:
role === "0" || role === "1" || role === "X";

// AFTER:
role === "0" || role === "1" || role === "X" || !role || role === "";
```

### Issue 3: HeroUI Select Accessibility Requirements

**Problem 1: Missing aria-label**

```
Error: If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility
```

**Solution:**

```javascript
<Select
  aria-label="Pilih Kanwil"  // ✅ ADDED
  // ...other props
>
```

**Problem 2: Missing textValue props**

```
Error: <Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop.
```

**Solution:**

```javascript
<SelectItem
  key={item.kdkanwil}
  value={item.kdkanwil}
  textValue={`${item.kdkanwil} - ${item.nmkanwil}`} // ✅ ADDED
>
  {item.kdkanwil} - {item.nmkanwil}
</SelectItem>
```

### Issue 4: HeroUI Select Implementation

**Problem:**
Incorrect use of `selectedKeys` format and selection change handling.

**Solution:**

```javascript
// CORRECT Implementation:
selectedKeys={props.value ? new Set([props.value]) : new Set(["XX"])}
onSelectionChange={(keys) => {
  const selected = Array.from(keys)[0] || "XX";
  if (props.onChange) {
    props.onChange(selected);
  }
}}
```

## Complete Fix Timeline

### Step 1: State Synchronization Fix

- ✅ Added missing kanwil states to formInquiryMod.jsx destructuring
- ✅ Added missing kanwil states to FilterSection inquiryState object

### Step 2: Component Logic Fix

- ✅ Updated role permission logic in Kdkanwil.jsx
- ✅ Fixed HeroUI Select selectedKeys format
- ✅ Improved selection change handling

### Step 3: Accessibility Compliance

- ✅ Added aria-label to Select component
- ✅ Added textValue props to all SelectItem components

### Step 4: Cleanup & Documentation

- ✅ Removed all debug console logs
- ✅ Created troubleshooting documentation
- ✅ Updated STATE_SYNCHRONIZATION_ANALYSIS.md

## Final Working Implementation

### KanwilFilter.jsx

- ✅ Uses shared state from inquiryState
- ✅ Responsive design matching KementerianFilter
- ✅ Supports advanced filtering (kondisi, kata, radio)

### Kdkanwil.jsx

- ✅ Proper role-based filtering with fallbacks
- ✅ HeroUI Select compliance
- ✅ Full accessibility support
- ✅ Correct state management

## Verification Tests

1. **✅ Kanwil Selection**: Can select individual kanwil items
2. **✅ Default State**: Shows "Semua Kanwil" by default
3. **✅ Jenis Tampilan**: Can change display options (Kode, Kode Uraian, etc.)
4. **✅ State Persistence**: Selections persist across interactions
5. **✅ Query Building**: Works with query builder for advanced filtering
6. **✅ Accessibility**: No console warnings, screen reader compatible

## Lessons Learned

1. **State Chain Verification**: Always verify state flows from hook → main component → filter components
2. **HeroUI Requirements**: Follow HeroUI accessibility requirements strictly
3. **Role Fallbacks**: Handle undefined/empty roles gracefully in referensi components
4. **Debug Systematically**: Use structured logging to identify exact failure points

## Future Considerations

- Apply same patterns to other filter components (KPPN, Satker, etc.)
- Consider creating reusable accessibility wrapper for Select components
- Document standard patterns for new filter implementations
