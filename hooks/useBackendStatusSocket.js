"use client";

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const BACKEND_URL = process.env.NEXT_PUBLIC_LOCAL_SOCKET;

// Global socket instance untuk memastikan hanya ada satu koneksi
let globalSocket = null;
let globalSocketListeners = new Set();
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 3000;

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
  const intervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const listenerId = useRef(Math.random().toString(36).substr(2, 9));

  const connectSocket = () => {
    // Jika sudah ada global socket yang connected, gunakan yang ada
    if (globalSocket?.connected) {
      setIsConnected(true);
      setIsOnline(true);
      setLastCheck(new Date());
      registerListener();
      return;
    }

    // Jika sedang mencoba reconnect dan sudah mencapai batas maksimum
    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.warn("❌ Max reconnection attempts reached, stopping auto-reconnect");
      setIsConnected(false);
      setIsOnline(false);
      return;
    }

    try {
      // Disconnect socket lama jika ada
      if (globalSocket) {
        globalSocket.disconnect();
      }

      globalSocket = io(BACKEND_URL, {
        transports: ["websocket", "polling"],
        timeout: 5000,
        forceNew: true,
      });

      globalSocket.on("connect", () => {
        console.log("✅ Backend socket connected");
        reconnectAttempts = 0; // Reset counter pada koneksi sukses
        
        // Update semua listeners
        globalSocketListeners.forEach(listener => {
          if (listener.setIsConnected) listener.setIsConnected(true);
          if (listener.setIsOnline) listener.setIsOnline(true);
          if (listener.setLastCheck) listener.setLastCheck(new Date());
          if (listener.onStatusChange) listener.onStatusChange(true);
        });
      });

      globalSocket.on("disconnect", (reason) => {
        console.log("❌ Backend socket disconnected:", reason);
        
        // Update semua listeners
        globalSocketListeners.forEach(listener => {
          if (listener.setIsConnected) listener.setIsConnected(false);
          if (listener.setIsOnline) listener.setIsOnline(false);
          if (listener.setLastCheck) listener.setLastCheck(new Date());
          if (listener.onStatusChange) listener.onStatusChange(false);
        });

        // Hanya trigger onOffline jika disconnect karena masalah backend, bukan client
        if (reason === 'io server disconnect' || reason === 'transport close' || reason === 'transport error') {
          globalSocketListeners.forEach(listener => {
            if (listener.onOffline) listener.onOffline();
          });
        }

        // Auto reconnect dengan backoff
        if (autoReconnect && reason !== 'io client disconnect') {
          reconnectAttempts++;
          const delay = RECONNECT_DELAY * Math.pow(2, Math.min(reconnectAttempts - 1, 3)); // Exponential backoff
          console.log(`🔄 Attempting reconnect ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS} in ${delay}ms`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connectSocket();
          }, delay);
        }
      });

      globalSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        reconnectAttempts++;
        
        // Update semua listeners
        globalSocketListeners.forEach(listener => {
          if (listener.setIsConnected) listener.setIsConnected(false);
          if (listener.setIsOnline) listener.setIsOnline(false);
          if (listener.setLastCheck) listener.setLastCheck(new Date());
          if (listener.onStatusChange) listener.onStatusChange(false);
        });

        // Hanya trigger onOffline jika ini bukan error sementara
        if (reconnectAttempts >= 3) {
          globalSocketListeners.forEach(listener => {
            if (listener.onOffline) listener.onOffline();
          });
        }

        // Auto reconnect dengan backoff
        if (autoReconnect && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          const delay = RECONNECT_DELAY * Math.pow(2, Math.min(reconnectAttempts - 1, 3));
          reconnectTimeoutRef.current = setTimeout(() => {
            connectSocket();
          }, delay);
        }
      });

      globalSocket.on("backend-status", (data) => {
        const status = data.status === "OK";
        globalSocketListeners.forEach(listener => {
          if (listener.setIsOnline) listener.setIsOnline(status);
          if (listener.setLastCheck) listener.setLastCheck(new Date());
          if (listener.onStatusChange) listener.onStatusChange(status);
        });
      });

      globalSocket.on("pong", (data) => {
        const status = data.status === "OK";
        globalSocketListeners.forEach(listener => {
          if (listener.setIsOnline) listener.setIsOnline(status);
          if (listener.setLastCheck) listener.setLastCheck(new Date());
        });
      });

      registerListener();
      
    } catch (error) {
      console.error("Failed to create socket connection:", error);
      reconnectAttempts++;
      
      globalSocketListeners.forEach(listener => {
        if (listener.setIsConnected) listener.setIsConnected(false);
        if (listener.setIsOnline) listener.setIsOnline(false);
        if (listener.onStatusChange) listener.onStatusChange(false);
      });

      // Hanya trigger onOffline setelah beberapa kali gagal
      if (reconnectAttempts >= 3) {
        globalSocketListeners.forEach(listener => {
          if (listener.onOffline) listener.onOffline();
        });
      }
    }
  };

  const registerListener = () => {
    const listener = {
      id: listenerId.current,
      setIsConnected,
      setIsOnline,
      setLastCheck,
      onStatusChange,
      onOffline,
    };
    globalSocketListeners.add(listener);
  };

  const unregisterListener = () => {
    globalSocketListeners.forEach(listener => {
      if (listener.id === listenerId.current) {
        globalSocketListeners.delete(listener);
      }
    });
  };

  const checkStatus = () => {
    if (globalSocket?.connected) {
      globalSocket.emit("ping");
    } else {
      // Jangan langsung trigger offline, coba reconnect dulu
      if (autoReconnect && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        console.log("🔄 Socket not connected, attempting to reconnect...");
        connectSocket();
      } else {
        // Hanya set offline jika sudah tidak bisa reconnect
        setIsOnline(false);
        setIsConnected(false);
        setLastCheck(new Date());

        if (onStatusChange) {
          onStatusChange(false);
        }

        // Hanya trigger onOffline setelah semua usaha reconnect gagal
        if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS && onOffline) {
          onOffline();
        }
      }
    }
  };

  const disconnect = () => {
    // Cleanup interval dan timeout
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    // Unregister listener dari global socket
    unregisterListener();

    // Jangan disconnect global socket kecuali tidak ada listener lain
    if (globalSocketListeners.size === 0 && globalSocket) {
      console.log("🔌 No more listeners, disconnecting global socket");
      globalSocket.disconnect();
      globalSocket = null;
      reconnectAttempts = 0;
    }

    setIsConnected(false);
    setIsOnline(null);
  };

  useEffect(() => {
    // Skip if disabled
    if (disabled) {
      return;
    }

    // Initial connection dan register listener
    connectSocket();

    // Set up periodic status check
    if (checkInterval > 0) {
      intervalRef.current = setInterval(checkStatus, checkInterval);
    }

    // Cleanup hanya unregister listener, tidak disconnect global socket
    return () => {
      // Cleanup interval dan timeout
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      // Hanya unregister listener, biarkan socket tetap hidup untuk komponen lain
      unregisterListener();
    };
  }, [disabled]); // Add disabled to dependency array

  return {
    isOnline,
    isConnected,
    lastCheck,
    checkStatus,
    disconnect,
    reconnect: () => {
      reconnectAttempts = 0; // Reset attempts
      connectSocket();
    },
    reconnectAttempts,
    maxReconnectAttempts: MAX_RECONNECT_ATTEMPTS,
  };
};
