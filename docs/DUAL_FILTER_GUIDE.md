# Kanwil and Kddept Dual Filter Implementation Guide

This comprehensive guide explains how to implement both Kanwil (Kantor Wilayah) and Kddept (Kode Departemen) filtering in dashboard components using props-based architecture.

## Overview

The filtering system supports dual filtering capabilities allowing users to filter data by:

- **Kanwil (Regional Offices)**: Geographical filtering
- **Kddept (Department Codes)**: Ministry/Department filtering

Both filters work independently and can be combined for more specific data filtering.

## Architecture

### Components Hierarchy

```
Dashboard Loading
├── Filters
│   ├── Thang (Year)
│   ├── Kddept (Department) ← New Props
│   └── Kanwil (Regional) ← Updated Props
└── Data Components
    ├── GetDipa ← Updated Props
    ├── GetBelanjaTerbesar ← Updated Props
    └── GetPerformaTerbesar ← Updated Props
```

## Component Interfaces

### 1. Filter Components

#### Kanwil Component

```typescript
interface KanwilProps {
  onKanwilChange: (kanwilValue: string) => void;
  selectedKanwil: string;
}

export const Kanwil = ({ onKanwilChange, selectedKanwil }: KanwilProps) => {
  // Controlled component using selectedKanwil as value
  // Calls onKanwilChange when user selects different region
};
```

#### Kddept Component

```typescript
interface KddeptProps {
  onKddeptChange: (kddeptValue: string) => void;
  selectedKddept: string;
}

export const Kddept = ({ onKddeptChange, selectedKddept }: KddeptProps) => {
  // Controlled component using selectedKddept as value
  // Calls onKddeptChange when user selects different department
};
```

### 2. Data Components

All data components accept both filter props:

```typescript
interface DataComponentProps {
  selectedKanwil?: string;
  selectedKddept?: string;
}
```

#### Example Implementation:

```typescript
export const GetDipa = ({ selectedKanwil, selectedKddept }: GetDipaProps) => {
  const getData = async () => {
    // Kanwil filtering
    let kanwilFilter = "";
    if (selectedKanwil && selectedKanwil !== "00") {
      kanwilFilter = ` and kdkanwil='${selectedKanwil}'`;
    }

    // Kddept filtering
    let kddeptFilter = "";
    if (selectedKddept && selectedKddept !== "000") {
      kddeptFilter = ` and kddept='${selectedKddept}'`;
    }

    const query = `
      SELECT * FROM table 
      WHERE thang='2022' ${kanwilFilter}${kddeptFilter}
    `;
  };

  useEffect(() => {
    getData();
  }, [selectedKanwil, selectedKddept]);
};
```

## Dashboard State Management

### State Declaration

```typescript
export default function DashboardLoading() {
  const [selectedKanwil, setSelectedKanwil] = useState<string>("00");
  const [selectedKddept, setSelectedKddept] = useState<string>("000");

  const handleKanwilChange = (kanwilValue: string) => {
    setSelectedKanwil(kanwilValue);
  };

  const handleKddeptChange = (kddeptValue: string) => {
    setSelectedKddept(kddeptValue);
  };
}
```

### Component Usage

```tsx
return (
  <div>
    {/* Filter Components */}
    <div className="flex gap-3">
      <Thang />
      <Kddept
        onKddeptChange={handleKddeptChange}
        selectedKddept={selectedKddept}
      />
      <Kanwil
        onKanwilChange={handleKanwilChange}
        selectedKanwil={selectedKanwil}
      />
    </div>

    {/* Data Components */}
    <GetDipa selectedKanwil={selectedKanwil} selectedKddept={selectedKddept} />
    <GetBelanjaTerbesar
      selectedKanwil={selectedKanwil}
      selectedKddept={selectedKddept}
    />
    <GetPerformaTerbesar
      selectedKanwil={selectedKanwil}
      selectedKddept={selectedKddept}
    />
  </div>
);
```

## SQL Filtering Patterns

### Standard Filtering Logic

```typescript
const getData = async () => {
  // Kanwil filter
  let kanwilFilter = "";
  if (selectedKanwil && selectedKanwil !== "00") {
    kanwilFilter = ` and kdkanwil='${selectedKanwil}'`;
  }

  // Kddept filter
  let kddeptFilter = "";
  if (selectedKddept && selectedKddept !== "000") {
    kddeptFilter = ` and kddept='${selectedKddept}'`;
  }

  // Combine filters in SQL query
  const query = `
    SELECT 
      SUM(pagu) as pagu,
      SUM(realisasi) as realisasi
    FROM dashboard.pagu_real_kl 
    WHERE thang='2022' and kddept<>'999'${kanwilFilter}${kddeptFilter}
  `;
};
```

### Filter Combinations

| Kanwil | Kddept | Result                                       |
| ------ | ------ | -------------------------------------------- |
| "00"   | "000"  | National data (all regions, all departments) |
| "01"   | "000"  | All departments in Jakarta region            |
| "00"   | "020"  | Kementerian Keuangan across all regions      |
| "01"   | "020"  | Kementerian Keuangan in Jakarta region only  |

## Default Values and Logic

### Default Filter Values

- **Kanwil**: `"00"` = NASIONAL (All regions)
- **Kddept**: `"000"` = NASIONAL (All departments)

### Filter Application Logic

```typescript
// Only apply filter if value is not the default
if (selectedKanwil && selectedKanwil !== "00") {
  // Apply kanwil filter
}

if (selectedKddept && selectedKddept !== "000") {
  // Apply kddept filter
}
```

## Component-Specific Implementations

### 1. GetDipa Component

**Purpose**: Display main dashboard statistics (pagu, realisasi, sisa, etc.)

**SQL Tables**:

- `dashboard.pagu_real_kl`
- `dashboard.dipa_satker_rekap`

**Filter Application**:

- Both kanwil and kddept filters applied to main query
- Subquery for jumlah_dipa also includes both filters

### 2. GetBelanjaTerbesar Component

**Purpose**: Show spending breakdown by expenditure type (jenbel)

**SQL Tables**:

- `dashboard.pagu_real_jenbel`

**Filter Application**:

- Filters applied in WHERE clause
- Groups by kddept and jenbel

### 3. GetPerformaTerbesar Component

**Purpose**: Display top performing ministries

**SQL Tables**:

- `dashboard.pagu_real_kl`
- `dbref.t_dept_2025`

**Filter Application**:

- Kanwil filter uses `prk.kdkanwil` prefix
- Kddept filter uses `prk.kddept` prefix
- JOIN with department reference table

## Benefits of Dual Filtering

### 1. Granular Analysis

- Regional performance analysis
- Ministry-specific performance
- Cross-regional ministry comparison
- Regional ministry allocation

### 2. User Experience

- Intuitive filtering interface
- Progressive filtering (region → department)
- Clear visual feedback
- Consistent behavior across components

### 3. Performance

- Database-level filtering
- Reduced data transfer
- Efficient query execution
- Optimized re-rendering

### 4. Scalability

- Easy to add more filters
- Consistent patterns
- Modular architecture
- Type-safe implementation

## Best Practices

### 1. Filter Validation

```typescript
// Validate filter values before using in SQL
const isValidKanwil = selectedKanwil && selectedKanwil.length === 2;
const isValidKddept = selectedKddept && selectedKddept.length === 3;
```

### 2. Error Handling

```typescript
try {
  const response = await axiosJWT.post(url, { query });
  setData(response.data.result);
} catch (error) {
  console.error("Filter query failed:", error);
  // Handle error appropriately
}
```

### 3. Performance Optimization

```typescript
// Debounce filter changes if needed
const debouncedKanwilChange = useCallback(
  debounce((value: string) => setSelectedKanwil(value), 300),
  []
);
```

### 4. Accessibility

```tsx
<Autocomplete
  placeholder="Pilih Kantor Wilayah"
  aria-label="Filter by regional office"
  selectedKey={selectedKanwil}
  onSelectionChange={onKanwilChange}
>
```

## Testing Strategies

### 1. Unit Tests

```typescript
describe("GetDipa Component", () => {
  test("filters by kanwil only", () => {
    render(<GetDipa selectedKanwil="01" selectedKddept="000" />);
    // Verify SQL includes kanwil filter only
  });

  test("filters by kddept only", () => {
    render(<GetDipa selectedKanwil="00" selectedKddept="020" />);
    // Verify SQL includes kddept filter only
  });

  test("filters by both kanwil and kddept", () => {
    render(<GetDipa selectedKanwil="01" selectedKddept="020" />);
    // Verify SQL includes both filters
  });
});
```

### 2. Integration Tests

```typescript
test("complete filtering flow", async () => {
  render(<Dashboard />);

  // Select kanwil
  const kanwilSelect = screen.getByLabelText("Filter by regional office");
  fireEvent.change(kanwilSelect, { target: { value: "01" } });

  // Select kddept
  const kddeptSelect = screen.getByLabelText("Filter by department");
  fireEvent.change(kddeptSelect, { target: { value: "020" } });

  // Verify data components update
  await waitFor(() => {
    expect(screen.getByText(/filtered results/i)).toBeInTheDocument();
  });
});
```

## Migration Guide

### From Single to Dual Filtering

1. **Update Component Interfaces**:

   ```typescript
   // Before
   interface Props {
     selectedKanwil?: string;
   }

   // After
   interface Props {
     selectedKanwil?: string;
     selectedKddept?: string;
   }
   ```

2. **Update SQL Queries**:

   ```typescript
   // Before
   WHERE thang='2022' ${kanwilFilter}

   // After
   WHERE thang='2022' ${kanwilFilter}${kddeptFilter}
   ```

3. **Update useEffect Dependencies**:

   ```typescript
   // Before
   useEffect(() => getData(), [selectedKanwil]);

   // After
   useEffect(() => getData(), [selectedKanwil, selectedKddept]);
   ```

4. **Update Parent Component**:
   ```tsx
   // Add kddept state and handlers
   const [selectedKddept, setSelectedKddept] = useState("000");
   const handleKddeptChange = (value: string) => setSelectedKddept(value);
   ```

## Troubleshooting

### Common Issues

1. **Props Not Passed**: Ensure all data components receive both filter props
2. **Default Values**: Use consistent default values ("00", "000")
3. **SQL Syntax**: Verify AND clauses are properly concatenated
4. **useEffect**: Include both filters in dependency arrays
5. **Type Errors**: Ensure interfaces match component usage

### Debugging Tips

1. **Console Logging**:

   ```typescript
   console.log("Filters:", { selectedKanwil, selectedKddept });
   console.log("SQL Query:", cleanedQuery);
   ```

2. **Network Tab**: Check actual SQL queries being sent
3. **React DevTools**: Verify props are passed correctly
4. **Database Logs**: Monitor query performance and errors

## Future Enhancements

1. **URL State Management**: Persist filters in URL parameters
2. **Filter Persistence**: Save user preferences
3. **Advanced Filtering**: Date ranges, custom operators
4. **Export Functionality**: Export filtered data
5. **Real-time Updates**: WebSocket-based data updates
6. **Filter Analytics**: Track filter usage patterns

## Conclusion

The dual filtering implementation provides a robust, scalable solution for dashboard data filtering. By using props-based architecture, the system maintains component isolation while enabling powerful filtering capabilities. The consistent patterns across components ensure maintainability and ease of future enhancements.
