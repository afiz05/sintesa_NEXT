# Socket-Based Backend Status Monitoring

Sistem monitoring backend menggunakan Socket.IO untuk real-time status checking yang lebih efisien.

## Fitur

✅ **Real-time monitoring** via Socket.IO  
✅ **Auto-reconnect** jika koneksi terputus  
✅ **Auto-redirect** ke halaman offline jika backend down  
✅ **Auto-redirect kembali** jika backend online  
✅ **Lightweight** - hanya menggunakan socket events  
✅ **No polling overhead** - event-driven monitoring

## Komponen

### 1. useBackendStatusSocket Hook

```javascript
const { isOnline, isConnected, checkStatus, reconnect } =
  useBackendStatusSocket({
    autoReconnect: true,
    checkInterval: 30000,
    onStatusChange: (status) => console.log("Status:", status),
    onOffline: () => console.log("Backend offline!"),
  });
```

### 2. BackendStatusMonitor

Komponen wrapper yang otomatis redirect ke `/offline` jika backend down.

### 3. BackendStatusIndicator

Indikator visual status backend untuk UI.

### 4. Offline Page Enhancement

Halaman offline dengan auto-recovery monitoring.

## Backend Socket Events

- `ping` → `pong` - Health check
- `check-backend-status` → `backend-status` - Status check
- `connect/disconnect` - Connection status

## Penggunaan

Sistem sudah otomatis aktif melalui layout. Untuk menampilkan indicator:

```jsx
import BackendStatusIndicator from "@/components/BackendStatusIndicator";
<BackendStatusIndicator />;
```

## Test

1. Jalankan backend: `npm start` di folder backend
2. Jalankan frontend: `npm run dev`
3. Matikan backend untuk test redirect ke `/offline`
4. Nyalakan kembali untuk test auto-redirect kembali

Sistem menggunakan Socket.IO yang sudah ada, jadi tidak ada overhead tambahan!
