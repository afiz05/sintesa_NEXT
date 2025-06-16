# Token Management Components

## Solusi Masalah Token Hilang Saat Refresh

Masalah: Token hilang saat halaman di-refresh karena disimpan dalam React state yang akan reset ketika halaman dimuat ulang.

## Komponen yang Tersedia

### 1. TokenGuard

Komponen wrapper untuk halaman yang memerlukan autentikasi.

**Fitur:**

- Menampilkan loading screen saat memeriksa token
- Redirect otomatis ke halaman login jika tidak ada token
- Me-render children hanya setelah token valid

**Penggunaan:**

```tsx
import { TokenGuard } from "@/app/lib/dashboard/TokenGuard";

const Dashboard = () => {
  return (
    <TokenGuard>
      <YourPageContent />
    </TokenGuard>
  );
};
```

### 2. CekToken

Komponen untuk memeriksa token dan menampilkan loading state.

**Fitur:**

- Menampilkan loading screen saat token sedang diambil dari server
- Me-render children setelah token tersedia
- Tidak melakukan redirect (berbeda dengan TokenGuard)

**Penggunaan:**

```tsx
import { CekToken } from "@/app/lib/dashboard/cekToken";

const SomeComponent = () => {
  return (
    <CekToken>
      <ComponentThatNeedsToken />
    </CekToken>
  );
};
```

## Context Updates

Ditambahkan `isTokenLoading` state di MyContext untuk melacak status loading token:

```tsx
interface MyContextType {
  // ... existing properties
  isTokenLoading: boolean; // Menunjukkan apakah token sedang dimuat
  // ... other properties
}
```

## Flow Pengecekan Token

1. **Initial Load**: `isTokenLoading = true`
2. **RefreshToken Called**: Mengambil token dari server
3. **Token Received**: `isTokenLoading = false`, token tersedia
4. **Components Render**: Komponen yang membutuhkan token dapat mulai render

## Perbedaan Utama

| Komponen   | Redirect ke Login | Loading Screen | Use Case                             |
| ---------- | ----------------- | -------------- | ------------------------------------ |
| TokenGuard | ✅                | ✅             | Halaman utama yang memerlukan auth   |
| CekToken   | ❌                | ✅             | Komponen individual yang butuh token |

## Best Practices

1. **Gunakan TokenGuard** di level page untuk perlindungan halaman
2. **Gunakan CekToken** untuk komponen individual yang membutuhkan token
3. **Jangan gunakan kedua komponen** secara bersamaan pada komponen yang sama
4. **Selalu cek statusLogin dan token** sebelum melakukan API call
