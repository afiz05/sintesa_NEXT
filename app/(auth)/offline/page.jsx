"use client";

import MyContext from "@/utils/Context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OfflinePage() {
  const context = useContext(MyContext);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  if (!context) return null;

  // Safely access setOffline
  const setOffline = context?.setOffline;

  // Simple HTTP check for manual retry
  const checkBackendStatus = async () => {
    try {
      const response = await fetch("http://localhost:88/next/status", {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const data = await response.json();
        return data.status === "OK";
      }
      return false;
    } catch (error) {
      console.error("Backend check failed:", error);
      return false;
    }
  };

  const handleTryAgain = async () => {
    setIsChecking(true);
    const isOnline = await checkBackendStatus();

    if (isOnline) {
      if (setOffline) {
        setOffline(false);
      }
      router.replace("/dashboard");
    } else {
      setIsChecking(false);
    }
  };

  // Auto-check every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const isOnline = await checkBackendStatus();
      if (isOnline) {
        if (setOffline) {
          setOffline(false);
        }
        router.replace("/dashboard");
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [setOffline, router]);

  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="text-center max-w-md mx-auto px-8 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="mb-8">
          {/* Animated Cloud Offline Icon */}
          <div className="relative mx-auto w-24 h-24">
            <svg
              className="w-24 h-24 text-gray-400 dark:text-gray-600 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
            </svg>
            {/* Animated disconnection lines */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                className="w-8 h-8 text-red-500 dark:text-red-400 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            {/* WiFi signal lines */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-full opacity-30"></div>
                <div className="w-1 h-3 bg-gray-300 dark:bg-gray-600 rounded-full opacity-30"></div>
                <div className="w-1 h-4 bg-gray-300 dark:bg-gray-600 rounded-full opacity-30"></div>
                <div className="w-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Sintesa v3 sedang Offline
        </h1>
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          Backend server sedang tidak tersedia.
          <br />
          Sistem akan otomatis kembali ketika server online.
        </p>

        <button
          onClick={handleTryAgain}
          disabled={isChecking}
          className={`font-bold py-3 px-6 rounded-lg transition-colors ${
            isChecking
              ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          }`}
        >
          {isChecking ? "Mengecek..." : "Coba Lagi"}
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Auto-check setiap 30 detik</p>
      </div>
    </div>
  );
}
