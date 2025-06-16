# Query Generation Module

This module provides modular query generation for different filter types in the Belanja inquiry system.

## Overview

The query generation logic has been extracted from the monolithic `generateSQLQuery` function into modular, maintainable components. Each filter type (Kementerian, Eselon, Satker, etc.) has its own dedicated query generator.

## Structure

```
query-generate/
├── index.tsx                      # Main exports and QueryOrchestrator
├── KementerianQueryGenerator.tsx  # Kementerian-specific query logic
├── README.md                      # This file
└── [Future generators]
    ├── EselonQueryGenerator.tsx   # TODO: Eselon I query logic
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

## Usage

### Direct Usage

```typescript
import { KementerianQueryGenerator } from "./query-generate";

const query = KementerianQueryGenerator.generateQuery({
  kementerianEnabled: true,
  kementerian: new Set(["01", "02"]),
  kementerianTampilan: "kode_uraian",
  cutOff: "januari",
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
2. 🔄 **Phase 2**: Create `EselonQueryGenerator` and `SatkerQueryGenerator`
3. 🔄 **Phase 3**: Add other filter generators (CutOff, Provinsi, etc.)
4. 🔄 **Phase 4**: Replace original `generateSQLQuery` with `QueryOrchestrator`
5. 🔄 **Phase 5**: Add comprehensive testing and validation

## Benefits

- **Modularity**: Each filter type is self-contained and testable
- **Maintainability**: Easier to modify specific query logic
- **Scalability**: Easy to add new filter types
- **Readability**: Clear separation of concerns
- **Testability**: Each generator can be unit tested independently

## Key Features

### Validation

```typescript
const validation = KementerianQueryGenerator.validateParams(params);
if (!validation.isValid) {
  console.error("Validation errors:", validation.errors);
}
```

### Query Explanation

```typescript
const explanation = KementerianQueryGenerator.getQueryExplanation(params);
console.log("Query purpose:", explanation);
```

### Type Safety

All generators use TypeScript interfaces for:

- Input parameters
- Configuration objects
- Return types
- Validation results

## TODO

- [ ] Implement EselonQueryGenerator
- [ ] Implement SatkerQueryGenerator
- [ ] Add comprehensive unit tests
- [ ] Add query optimization hints
- [ ] Add query caching mechanisms
- [ ] Integrate with existing form-summary.tsx
