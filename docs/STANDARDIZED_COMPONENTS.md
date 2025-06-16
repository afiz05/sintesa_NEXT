# Standardized Dual Filtering and Empty States Implementation

## Overview

All components have been standardized to use consistent dual filtering patterns and simplified empty state displays as requested.

## 1. Standardized Dual Filtering Pattern

All components now implement the exact same dual filtering pattern:

```typescript
const getData = async () => {
  // Tambahkan filter kanwil jika selectedKanwil tersedia dan tidak "00"
  let kanwilFilter = "";
  if (selectedKanwil && selectedKanwil !== "00") {
    kanwilFilter = ` and kdkanwil='${selectedKanwil}'`;
  }

  // Tambahkan filter kddept jika selectedKddept tersedia dan tidak "000"
  let kddeptFilter = "";
  if (selectedKddept && selectedKddept !== "000") {
    kddeptFilter = ` and kddept='${selectedKddept}'`;
  }

  // SQL query with filters: ${kanwilFilter}${kddeptFilter}
};
```

**Note**: Some components use table aliases (e.g., `a.kdkanwil`, `a.kddept`) based on their SQL JOIN requirements.

## 2. Standardized Empty State Pattern

All components now use the simplified empty state pattern from `getBelanjaTerbesar`:

```tsx
if (!data || data.length === 0) {
  return (
    <Card
      className={`border-none shadow-sm ${getThemeClasses().cardBg} h-full`}
    >
      <CardBody className="pt-0 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mt-4">
            <Chip
              size="sm"
              variant="flat"
              color="warning"
              startContent={<Database className="w-3 h-3" />}
              className="text-xs"
            >
              No Data
            </Chip>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
```

## 3. Components Updated

### Data Components

- ✅ `GetDipa` - Dual filtering + simplified empty state
- ✅ `GetBelanjaTerbesar` - Already had the standard patterns
- ✅ `GetPerformaTerbesar` - Already had the standard patterns

### Chart Components

- ✅ `TrenApbn` - Dual filtering + simplified empty state
- ✅ `Fungsi` - Dual filtering + simplified empty state
- ✅ `DukmanTeknis` - Dual filtering + simplified empty state

### Reference Components

- ✅ `Kanwil` - Already had props interface for dual filtering
- ✅ `Kddept` - Already had props interface for dual filtering

### Dashboard

- ✅ `loading.tsx` - Already passing both `selectedKanwil` and `selectedKddept` props to all components

## 4. Key Benefits

1. **Consistency**: All components follow the exact same filtering pattern
2. **Simplicity**: Empty states are clean and minimal with just a "No Data" chip
3. **Maintainability**: Standard patterns make code easier to maintain
4. **User Experience**: Consistent behavior across all components

## 5. SQL Filter Implementation

The filtering works by:

1. **Kanwil Filter**: Applied when `selectedKanwil` is not "00" (default/all)
2. **Kddept Filter**: Applied when `selectedKddept` is not "000" (default/all)
3. **Combined Filters**: Both filters can be active simultaneously
4. **Table Aliases**: Some queries use aliases (`a.kdkanwil`, `prk.kdkanwil`) based on SQL structure

## 6. Props Interface

All data and chart components accept:

```typescript
interface ComponentProps {
  selectedKanwil?: string;
  selectedKddept?: string;
}
```

## 7. Dashboard State Management

The dashboard manages both filters with:

```typescript
const [selectedKanwil, setSelectedKanwil] = useState<string>("00");
const [selectedKddept, setSelectedKddept] = useState<string>("000");

const handleKanwilChange = (kanwilValue: string) => {
  setSelectedKanwil(kanwilValue);
};

const handleKddeptChange = (kddeptValue: string) => {
  setSelectedKddept(kddeptValue);
};
```

All components are now fully standardized and working with the dual filtering system and simplified empty states.
