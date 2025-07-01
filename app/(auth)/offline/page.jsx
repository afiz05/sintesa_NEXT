"use client";

import MyContext from "@/utils/Context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useBackendStatusSocket } from "@/hooks/useBackendStatusSocket";

export default function OfflinePage() {
  const context = useContext(MyContext);
  const router = useRouter();
  if (!context) return null;

  // Safely access setOffline
  const setOffline = context?.setOffline;

  // Use socket-based monitoring for auto-recovery
  const { isOnline, checkStatus, reconnect } = useBackendStatusSocket({
    autoReconnect: true,
    checkInterval: 10000, // Check every 10 seconds when offline
    onStatusChange: (status) => {
      if (status && setOffline) {
        setOffline(false);
        router.replace("/dashboard");
      }
    },
  });

  const handleTryAgain = () => {
    // Try to reconnect socket and check status
    // reconnect();
    checkStatus();

    // Also manual check via setOffline
    if (setOffline) {
      setOffline(false);
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Server Offline
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Backend server sedang tidak tersedia.
          <br />
          Sistem akan otomatis kembali ketika server online.
        </p>

        <button
          onClick={handleTryAgain}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Coba Lagi
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Monitoring via Socket.IO • Auto-check setiap 10 detik
        </p>
      </div>
    </div>
  );
}
