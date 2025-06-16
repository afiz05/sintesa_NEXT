# Panduan Filter Kanwil dengan Props

## Overview

Dokumentasi ini menjelaskan cara menggunakan sistem filter Kanwil yang telah diimplementasi menggunakan props untuk mengoper nilai antar komponen tanpa menggunakan Context.

## Komponen yang Dimodifikasi

### 1. Komponen Kanwil (`components/referensi/Kanwil.tsx`)

**Interface:**

```typescript
interface KanwilProps {
  onKanwilChange?: (selectedKanwil: string) => void;
  selectedKanwil?: string;
}
```

**Props:**

- `onKanwilChange`: Callback function yang dipanggil ketika user memilih kanwil
- `selectedKanwil`: Nilai kanwil yang terpilih (controlled component)

**Penggunaan:**

```tsx
<Kanwil onKanwilChange={handleKanwilChange} selectedKanwil={selectedKanwil} />
```

### 2. Komponen GetDipa (`components/home/dataDipa/getDipa.tsx`)

**Interface:**

```typescript
interface GetDipaProps {
  selectedKanwil?: string;
}
```

**Props:**

- `selectedKanwil`: Kode kanwil untuk filter data DIPA

**Penggunaan:**

```tsx
<GetDipa selectedKanwil={selectedKanwil} />
```

### 3. Komponen GetBelanjaTerbesar (`components/home/dataDipa/getBelanjaTerbesar.tsx`)

**Interface:**

```typescript
interface GetBelanjaTerbesarProps {
  selectedKanwil?: string;
}
```

**Props:**

- `selectedKanwil`: Kode kanwil untuk filter data belanja terbesar

**Penggunaan:**

```tsx
<GetBelanjaTerbesar selectedKanwil={selectedKanwil} />
```

### 4. Komponen GetPerformaTerbesar (`components/home/dataDipa/getPerformaTerbesar.tsx`)

**Interface:**

```typescript
interface GetPerformaTerbesarProps {
  selectedKanwil?: string;
}
```

**Props:**

- `selectedKanwil`: Kode kanwil untuk filter data performa terbesar

**Penggunaan:**

```tsx
<GetPerformaTerbesar selectedKanwil={selectedKanwil} />
```

## Implementasi di Dashboard

### State Management

```tsx
const [selectedKanwil, setSelectedKanwil] = useState<string>("00");

const handleKanwilChange = (kanwilValue: string) => {
  setSelectedKanwil(kanwilValue);
};
```

### Penggunaan Komponen

```tsx
{/* Filter Dropdown */}
<Kanwil
  onKanwilChange={handleKanwilChange}
  selectedKanwil={selectedKanwil}
/>

{/* Data Components */}
<GetDipa selectedKanwil={selectedKanwil} />
<GetBelanjaTerbesar selectedKanwil={selectedKanwil} />
<GetPerformaTerbesar selectedKanwil={selectedKanwil} />
```

## Filter Logic di Database

### Query Pattern

Semua komponen menggunakan pola filter yang konsisten:

```sql
-- Contoh di GetDipa
WHERE thang='2022' and kddept<>'999'${kanwilFilter}

-- Filter logic
let kanwilFilter = "";
if (selectedKanwil && selectedKanwil !== "00") {
  kanwilFilter = ` and kdkanwil='${selectedKanwil}'`;
}
```

### Nilai Khusus

- `"00"`: Menampilkan data untuk semua kanwil
- Nilai lainnya: Filter data berdasarkan kode kanwil tertentu

## Keuntungan Implementasi

1. **Decoupled Components**: Komponen tidak bergantung pada Context global
2. **Reusable**: Komponen bisa digunakan di tempat lain dengan props berbeda
3. **Predictable**: Data flow yang jelas dari parent ke child
4. **Type Safe**: Menggunakan TypeScript interfaces untuk type checking
5. **Performance**: Re-render hanya pada komponen yang menerima props yang berubah

## Cara Menambah Komponen Baru

Untuk menambahkan komponen baru yang mendukung filter kanwil:

1. **Definisikan Interface Props:**

```typescript
interface MyComponentProps {
  selectedKanwil?: string;
}
```

2. **Update Component Signature:**

```tsx
export const MyComponent = ({ selectedKanwil }: MyComponentProps) => {
  // component logic
};
```

3. **Implementasikan Filter Logic:**

```typescript
const getData = async () => {
  let kanwilFilter = "";
  if (selectedKanwil && selectedKanwil !== "00") {
    kanwilFilter = ` and kdkanwil='${selectedKanwil}'`;
  }

  const query = `SELECT * FROM table WHERE condition${kanwilFilter}`;
  // ... rest of the logic
};
```

4. **Tambahkan Dependency di useEffect:**

```typescript
useEffect(() => {
  getData();
}, [selectedKanwil]);
```

5. **Gunakan di Parent Component:**

```tsx
<MyComponent selectedKanwil={selectedKanwil} />
```

## Best Practices

1. **Default Value**: Selalu berikan default value "00" untuk selectedKanwil
2. **Error Handling**: Pastikan query tetap valid meskipun selectedKanwil undefined
3. **Optimization**: Gunakan useCallback untuk handler functions jika diperlukan
4. **Validation**: Validasi nilai selectedKanwil sebelum digunakan dalam query
5. **Consistency**: Gunakan pola filter yang sama di semua komponen

## Troubleshooting

### Query Error

Jika terjadi error SQL, pastikan:

- Filter string dibuat dengan benar
- Nama kolom kdkanwil tersedia di tabel
- Nilai selectedKanwil sudah divalidasi

### Component Tidak Update

Periksa:

- Props sudah diteruskan dengan benar
- useEffect memiliki dependency yang tepat
- State management di parent component bekerja

### Type Errors

Pastikan:

- Interface props sudah didefinisikan
- Component menggunakan interface yang benar
- Props optional (?) digunakan dengan konsisten
