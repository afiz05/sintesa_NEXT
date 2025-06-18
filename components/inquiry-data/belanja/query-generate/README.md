# Query Generation Module

This module provides modular query generation for different filter types in the Belanja inquiry system.

## Overview

The query generation logic has been extracted from the monolithic `generateSQLQuery` function into modular, maintainable components. Each filter type (Kementerian, Eselon, Satker, etc.) has its own dedicated query generator.

## Structure

```
query-generate/
├── index.tsx                      # Main exports and CombinedQueryGenerator
├── KementerianQueryGenerator.tsx  # Kementerian-specific query logic
├── EselonIQueryGenerator.tsx      # EselonI-specific query logic
├── CombinedQueryGenerator.tsx     # Multi-filter combinations (NEW!)
├── EselonIQueryExamples.tsx       # Usage examples for EselonI
├── CombinedQueryTest.ts           # Test examples for combined filters
├── README.md                      # This file
└── [Future generators]
    ├── SatkerQueryGenerator.tsx   # TODO: Satker query logic
    └── ...                        # Other filter generators
```

## Current Implementation

### KementerianQueryGenerator

Handles all kementerian-related query generation with support for:

- **Report Types**:

  - Pagu Realisasi (special aggregated queries)
  - Standard reports (detailed queries)

- **Display Options (Tampilan)**:

  - `kode`: Show only department codes (kddept)
  - `uraian`: Show only department names (nmdept)
  - `kode_uraian`: Show both codes and names
  - `jangan_tampilkan`: Exclude kementerian from display

- **Selection Types**:
  - All departments (when no specific selection)
  - Specific departments (when departments are selected)
  - No data (when tampilan is "jangan_tampilkan")

### CombinedQueryGenerator (NEW!)

**The main innovation** - handles multiple filter combinations in a scalable way:

- **Single Filter Support**:

  - Automatically delegates to specialized generators (Kementerian, EselonI)
  - Maintains backward compatibility

- **Multi-Filter Combinations**:

  - **Kementerian + EselonI**: Shows both filters working together
  - Proper JOIN logic with multiple reference tables
  - Smart WHERE clause combining both filter conditions

- **Scalable Architecture**:

  - Easy to add new combinations (Satker, Provinsi, etc.)
  - Type-safe interfaces for all combinations
  - Fallback to original logic for unsupported combinations

- **Smart Query Building**:
  - Detects Pagu Realisasi vs Standard queries
  - Handles different display preferences for each filter
  - Proper aggregation and grouping for summary reports

### EselonIQueryGenerator

Handles all EselonI-related query generation with support for:

- **Report Types**:

  - All standard reports with EselonI filtering
  - Cut-off date filtering integration

- **Display Options (Tampilan)**:

  - `kode`: Show only EselonI codes (kdunit)
  - `uraian`: Show only EselonI names (nmunit)
  - `kode_uraian`: Show both codes and names
  - `jangan_tampilkan`: Exclude EselonI from display (show all columns)

- **Selection Types**:
  - All EselonI levels (when no specific selection)
  - Specific EselonI levels (when levels are selected)
  - Filtered by cut-off dates and report types

## Usage

### Direct Usage

```typescript
import {
  KementerianQueryGenerator,
  EselonIQueryGenerator,
  CombinedQueryGenerator,
} from "./query-generate";

// Single filter queries
const kementerianQuery = KementerianQueryGenerator.generateQuery({
  kementerianEnabled: true,
  kementerian: new Set(["01", "02"]),
  kementerianTampilan: "kode_uraian",
  cutOff: "januari",
  selectedJenisLaporan: "Pagu Realisasi",
});

const eselonIQuery = EselonIQueryGenerator.generateQuery({
  eselonIEnabled: true,
  eselonI: new Set(["01", "02"]),
  eselonITampilan: "kode_uraian",
  cutOff: "juni",
  selectedJenisLaporan: "semua",
});

// 🎯 COMBINED QUERY (NEW!)
const combinedQuery = CombinedQueryGenerator.generateQuery({
  switches: {
    kementerian: true,
    eselonI: true,
    satker: false,
    cutOff: false,
  },
  formState: {
    kementerian: new Set(["01", "02"]),
    kementerianTampilan: "kode",
    eselonI: new Set(["01", "03"]),
    eselonTampilan: "uraian",
    cutOff: "desember",
  },
  selectedJenisLaporan: "Pagu Realisasi",
});
```

### Via QueryOrchestrator

```typescript
import { QueryOrchestrator } from './query-generate';

const query = QueryOrchestrator.generateQuery({
  switches: { kementerian: true, eselonI: false, ... },
  formState: { kementerian: new Set(['01']), ... },
  selectedJenisLaporan: 'Pagu Realisasi'
});
```

## Migration Strategy

The migration from the monolithic `generateSQLQuery` function follows this approach:

1. ✅ **Phase 1**: Extract Kementerian logic into `KementerianQueryGenerator`
2. ✅ **Phase 2**: Create `EselonIQueryGenerator` with full EselonI support
3. 🔄 **Phase 3**: Create `SatkerQueryGenerator` and other filter generators
4. 🔄 **Phase 4**: Add comprehensive testing and validation
5. 🔄 **Phase 5**: Replace original `generateSQLQuery` with `QueryOrchestrator`

## Benefits

- **Modularity**: Each filter type is self-contained and testable
- **Maintainability**: Easier to modify specific query logic
- **Scalability**: Easy to add new filter types
- **Readability**: Clear separation of concerns
- **Testability**: Each generator can be unit tested independently

## Key Features

### Validation

```typescript
// Kementerian validation
const kementerianValidation =
  KementerianQueryGenerator.validateParams(kementerianParams);
if (!kementerianValidation) {
  console.error("Kementerian validation failed");
}

// EselonI validation
const eselonIValidation = EselonIQueryGenerator.validateParams(eselonIParams);
if (!eselonIValidation) {
  console.error("EselonI validation failed");
}
```

### Examples

```typescript
// Get built-in examples
const kementerianExamples = KementerianQueryGenerator.getExamples();
const eselonIExamples = EselonIQueryGenerator.getExamples();

console.log("Kementerian examples:", kementerianExamples);
console.log("EselonI examples:", eselonIExamples);
```

### Type Safety

All generators use TypeScript interfaces for:

- Input parameters
- Configuration objects
- Return types
- Validation results

## TODO

- [x] Implement EselonIQueryGenerator
- [x] Add EselonI query examples and documentation
- [ ] Implement SatkerQueryGenerator
- [ ] Add comprehensive unit tests
- [ ] Add query optimization hints
- [ ] Add query caching mechanisms
- [ ] Integrate remaining generators with existing form-summary.tsx
