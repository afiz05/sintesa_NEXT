"use client";

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:88";

export const useBackendStatusSocket = (options = {}) => {
  const {
    autoReconnect = true,
    checkInterval = 30000, // 30 seconds
    onStatusChange = null,
    onOffline = null,
    disabled = false, // Add disabled option
  } = options;

  const [isOnline, setIsOnline] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastCheck, setLastCheck] = useState(null);
  const socketRef = useRef(null);
  const intervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectSocket = () => {
    if (socketRef.current?.connected) return;

    try {
      socketRef.current = io(BACKEND_URL, {
        transports: ["websocket", "polling"],
        timeout: 5000,
        forceNew: true,
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Backend socket connected");
        setIsConnected(true);
        setIsOnline(true);
        setLastCheck(new Date());

        if (onStatusChange) {
          onStatusChange(true);
        }
      });

      socketRef.current.on("disconnect", () => {
        console.log("❌ Backend socket disconnected");
        setIsConnected(false);
        setIsOnline(false);
        setLastCheck(new Date());

        if (onStatusChange) {
          onStatusChange(false);
        }

        if (onOffline) {
          onOffline();
        }

        // Auto reconnect if enabled
        if (autoReconnect) {
          reconnectTimeoutRef.current = setTimeout(connectSocket, 3000);
        }
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setIsConnected(false);
        setIsOnline(false);
        setLastCheck(new Date());

        if (onStatusChange) {
          onStatusChange(false);
        }

        if (onOffline) {
          onOffline();
        }
      });

      socketRef.current.on("backend-status", (data) => {
        setIsOnline(data.status === "OK");
        setLastCheck(new Date());

        if (onStatusChange) {
          onStatusChange(data.status === "OK");
        }
      });

      socketRef.current.on("pong", (data) => {
        setIsOnline(data.status === "OK");
        setLastCheck(new Date());
      });
    } catch (error) {
      console.error("Failed to create socket connection:", error);
      setIsConnected(false);
      setIsOnline(false);

      if (onStatusChange) {
        onStatusChange(false);
      }

      if (onOffline) {
        onOffline();
      }
    }
  };

  const checkStatus = () => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("ping");
    } else {
      setIsOnline(false);
      setIsConnected(false);
      setLastCheck(new Date());

      if (onStatusChange) {
        onStatusChange(false);
      }

      if (onOffline) {
        onOffline();
      }
    }
  };

  const disconnect = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    setIsConnected(false);
    setIsOnline(null);
  };

  useEffect(() => {
    // Skip if disabled
    if (disabled) {
      return;
    }

    // Initial connection
    connectSocket();

    // Set up periodic status check
    if (checkInterval > 0) {
      intervalRef.current = setInterval(checkStatus, checkInterval);
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [disabled]); // Add disabled to dependency array

  return {
    isOnline,
    isConnected,
    lastCheck,
    checkStatus,
    disconnect,
    reconnect: connectSocket,
  };
};
