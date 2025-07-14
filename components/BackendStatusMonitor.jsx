"use client";

import { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useBackendStatusSocket } from "../hooks/useBackendStatusSocket";
import MyContext from "@/utils/Context";

const BackendStatusMonitor = ({ children }) => {
  const context = useContext(MyContext);
  const router = useRouter();
  const pathname = usePathname();

  if (!context) return children;

  // Don't run monitoring on offline page to avoid conflicts
  const isOfflinePage = pathname === "/offline";

  // Safely access setOffline
  const setOffline = context?.setOffline;

  const { isOnline, isConnected } = useBackendStatusSocket({
    autoReconnect: true,
    checkInterval: 30000, // Check every 30 seconds
    disabled: isOfflinePage, // Disable on offline page
    onStatusChange: (status) => {
      console.log("Backend status changed:", status);
    },
    onOffline: () => {
      if (!isOfflinePage) {
        console.log("Backend is offline, redirecting...");
        if (setOffline) {
          setOffline(true);
        }
        router.push("/offline");
      }
    },
  });

  // Always render children, even when offline
  // Let the routing handle the offline page
  return children;
};

export default BackendStatusMonitor;
