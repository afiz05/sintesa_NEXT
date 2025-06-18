# Dynamic Table & Rounding Implementation

## Overview

The Belanja query system now supports:

1. **Dynamic Table Selection** based on selected year (Tahun dropdown)
2. **Automatic Rounding** based on selected pembulatan (Rupiah, Ribu, Juta, Miliar, Triliun)

## Implementation Details

### 1. Dynamic Table Generation

The system now generates table names dynamically based on the selected year:

- **2024**: `monev2024.pagu_real_detail_harian_2024`
- **2025**: `monev2025.pagu_real_detail_harian_2025`
- **Pattern**: `monev{YEAR}.pagu_real_detail_harian_{YEAR}`

### 2. Rounding System

Monetary values (PAGU_DIPA, REALISASI, BLOKIR) are automatically rounded based on pembulatan selection:

| Pembulatan | Divisor           | Example           | Result    |
| ---------- | ----------------- | ----------------- | --------- |
| Rupiah     | 1                 | 1,500,000         | 1,500,000 |
| Ribu       | 1,000             | 1,500,000         | 1,500.00  |
| Juta       | 1,000,000         | 1,500,000         | 1.50      |
| Miliar     | 1,000,000,000     | 1,500,000,000     | 1.50      |
| Triliun    | 1,000,000,000,000 | 1,500,000,000,000 | 1.50      |

### 3. Updated Query Generators

All query generators now support:

- `selectedTahun`: For dynamic table selection
- `selectedPembulatan`: For automatic rounding

**Updated Files:**

- `CombinedQueryGenerator.tsx`
- `KementerianQueryGenerator.tsx`
- `EselonIQueryGenerator.tsx`
- `CutOffQueryGenerator.tsx`

### 4. Context Integration

The header now provides real-time feedback showing:

- Current table being used
- Selected report type
- Applied rounding configuration

## Usage Example

```typescript
// Context provides the values
const { selectedTahun, selectedJenisLaporan, selectedPembulatan } =
  useBelanja();

// Query generator uses all three parameters
const query = CombinedQueryGenerator.generateQuery({
  switches: {
    /* filter states */
  },
  formState: {
    /* form values */
  },
  selectedJenisLaporan: "Pagu Realisasi",
  selectedTahun: "2024", // → Uses monev2024 table
  selectedPembulatan: "Juta", // → Divides amounts by 1,000,000
});
```

## Benefits

1. **Year Flexibility**: Easy to query different years' data
2. **Automatic Formatting**: No manual rounding calculations needed
3. **Consistent Implementation**: All generators follow same pattern
4. **Type Safety**: TypeScript interfaces ensure proper parameter passing
5. **Real-time Feedback**: UI shows current configuration
