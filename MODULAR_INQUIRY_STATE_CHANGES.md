# Modular Inquiry Form - State Name Changes Guide

## Overview

This document provides a comprehensive guide for changing filter state names in the **new modular inquiry system** without affecting legacy components or unrelated files.

## Important: Scope of Changes

⚠️ **WARNING**: Only modify files in the modular inquiry system. Do NOT change:

- Legacy files (e.g., `components/inquiry/formInquiry.jsx`)
- Global context files (e.g., `utils/Contex.tsx`)
- Data files with similar field names used for different purposes

## Modular Inquiry System Files (Safe to Modify)

### 1. Core Hook Files

- `d:\sintesaNEXT\components\inquiry\hooks\useInquiryState.js`
- `d:\sintesaNEXT\components\inquiry\hooks\useQueryBuilder.js`

### 2. Component Files

- `d:\sintesaNEXT\components\inquiry\formInquiryMod.jsx`
- `d:\sintesaNEXT\components\inquiry\components\FilterSelector.jsx`

### 3. Filter Files

- `d:\sintesaNEXT\components\inquiry\filters\LocationFilter.js`
- `d:\sintesaNEXT\components\inquiry\filters\FilterBuilder.js`
- `d:\sintesaNEXT\components\inquiry\examples\QueryBuilderExample.jsx`

### 4. Documentation Files

- `d:\sintesaNEXT\QUERY_BUILDER_FIXES_SUMMARY.md`
- `d:\sintesaNEXT\STATE_SYNCHRONIZATION_ANALYSIS.md`

## Recent Change Example: kdprov → kdlokasi

### State Changes Made:

1. **Filter visibility state**: `kdprov` → `kdlokasi`
2. **State setter**: `setKdprov` → `setKdlokasi`
3. **Radio state**: `provradio` → `locradio`
4. **SQL column references**: `a.kdprov` → `a.kdlokasi`
5. **Join conditions**: `a.kdprov=p.kdprov` → `a.kdlokasi=p.kdlokasi`
6. **Description field**: `nmprov` → `nmlokasi` (for display text)

### Files Modified:

#### 1. useInquiryState.js

```javascript
// BEFORE
const [kdprov, setKdprov] = useState(false);
const [provradio, setProvradio] = useState("1");

// AFTER
const [kdlokasi, setKdlokasi] = useState(false);
const [locradio, setLocradio] = useState("1");
```

#### 2. useQueryBuilder.js

```javascript
// BEFORE
kdprov,
if (kdprov) {
  kolom.push("a.kdprov");
  joinClause += ` LEFT JOIN dbref.t_prov p ON a.kdprov=p.kdprov`;
  whereConditions.push(`a.kdprov = '${prov}'`);
}

// AFTER
kdlokasi,
if (kdlokasi) {
  kolom.push("a.kdlokasi");
  // Special logic for year 2025
  if (thang === "2025") {
    joinClause += ` LEFT JOIN dbref.t_lokasi_2025 p ON a.kdlokasi=p.kdlokasi`;
  } else {
    joinClause += ` LEFT JOIN dbref.t_prov p ON a.kdlokasi=p.kdlokasi`;
  }
  whereConditions.push(`a.kdlokasi = '${prov}'`);
}
```

#### 3. LocationFilter.js

```javascript
// BEFORE
constructor() {
  super("kdlokasi", "provinsi", {
    joinCondition: "a.kdprov=p.kdprov",
  });
}

// AFTER
constructor() {
  super("kdlokasi", "provinsi", {
    joinCondition: "a.kdlokasi=p.kdlokasi",
  });
}

// Added special buildJoinClause method for 2025 table logic
buildJoinClause(thang = "") {
  if (thang === "2025") {
    return ` LEFT JOIN ${this.referenceTable.schema}.t_lokasi_2025 ${this.referenceTable.alias} ON a.kdlokasi=${this.referenceTable.alias}.kdlokasi`;
  }
  // Default behavior for other years
  const yearSuffix = this.referenceTable.hasYear ? `_${thang}` : "";
  const tableName = `${this.referenceTable.schema}.${this.referenceTable.table}${yearSuffix}`;
  return ` LEFT JOIN ${tableName} ${this.referenceTable.alias} ON ${this.referenceTable.joinCondition}`;
}
```

#### 4. Component Props Updates

```javascript
// In formInquiryMod.jsx, FilterSelector.jsx, etc.
// BEFORE
kdprov: isEnabled,
setKdprov,

// AFTER
kdlokasi: isEnabled,
setKdlokasi,
```

## Step-by-Step Guide for Future State Changes

### Step 1: Identify the Change

Example: Changing `kdunit` to `kdorganisasi`

### Step 2: Update useInquiryState.js

1. Change state variable name
2. Change setter function name
3. Update radio state if applicable
4. Update return object

### Step 3: Update useQueryBuilder.js

1. Change destructured variable name
2. Update all references in SQL building logic
3. Update join conditions
4. Update WHERE clauses

### Step 4: Update Filter Classes

1. Modify constructor field name
2. Update join conditions
3. Add special table logic if needed

### Step 5: Update Description Field Names

⚠️ **Important**: When changing a filter state name, also update the corresponding description field names in SQL queries.

**Example**: When changing `kdprov` → `kdlokasi`, also change `nmprov` → `nmlokasi`

1. **LocationFilter.js**: Update `nameField` property

   ```javascript
   // BEFORE
   nameField: "nmprov",

   // AFTER
   nameField: "nmlokasi",
   ```

2. **useQueryBuilder.js**: Update column selections and WHERE clauses

   ```javascript
   // BEFORE
   kolom.push("a.kdprov", "p.nmprov");
   kolom.push("p.nmprov");
   whereConditions.push(`p.nmprov like '%${katalokasi}%'`);

   // AFTER
   kolom.push("a.kdlokasi", "p.nmlokasi");
   kolom.push("p.nmlokasi");
   whereConditions.push(`p.nmlokasi like '%${katalokasi}%'`);
   ```

**Search Command**:

```bash
# Find description field references
grep -r "nmprov" components/inquiry/
```

### Step 6: Update Components

1. Update prop names in component files
2. Update destructuring in components
3. Update JSX references

### Step 7: Update Documentation

1. Update technical documentation
2. Update comments in code
3. Update this guide with new changes

## Search Commands for Future Changes

Use these grep commands to find all instances when changing a state name:

```bash
# Find all references to old state name
grep -r "oldStateName" components/inquiry/

# Find specific patterns
grep -r "kdprov" components/inquiry/hooks/
grep -r "kdprov" components/inquiry/filters/
grep -r "kdprov" components/inquiry/components/
```

## Testing Checklist

After making state name changes:

1. ✅ Check for TypeScript/JavaScript errors
2. ✅ Verify all components compile
3. ✅ Test filter functionality
4. ✅ Verify SQL generation
5. ✅ Test special year logic (if applicable)
6. ✅ Ensure legacy system unaffected

## Related Database Changes

### Year-Specific Table Logic

For the `kdlokasi` change, we implemented special logic:

- **Year 2025**: Uses `dbref.t_lokasi_2025` table
- **Other years**: Uses default `dbref.t_prov` table
- **Join condition**: Always `a.kdlokasi=p.kdlokasi`

This pattern can be replicated for other filters that need year-specific tables.

## Files to NEVER Modify

❌ **Do not change these files** (they serve different purposes):

- `utils/Contex.tsx` - Global context for different functionality
- `components/inquiry/formInquiry.jsx` - Legacy form for comparison
- `data/*.json` - Data files with field names for different purposes
- Any non-modular inquiry components

## Validation Commands

After changes, run these to validate:

```bash
# Check for errors in modular files
npm run build
npm run lint

# Search for remaining old references
grep -r "oldStateName" components/inquiry/
```

## Change History

| Date       | Old State | New State | Reason                                                | Files Modified | Additional Changes |
| ---------- | --------- | --------- | ----------------------------------------------------- | -------------- | ------------------ |
| 2025-06-27 | kdprov    | kdlokasi  | Consistency with database schema + 2025 table support | 8 files        | nmprov → nmlokasi  |

## Notes

- Always backup files before making changes
- Test thoroughly after modifications
- Keep legacy system intact for comparison
- Document all changes in this file
- Use consistent naming conventions
- Consider database implications for new state names

---

**Last Updated**: June 27, 2025  
**Maintainer**: Development Team  
**Purpose**: Guide for safe state name changes in modular inquiry system
