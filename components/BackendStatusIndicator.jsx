"use client";

import { useBackendStatusSocket } from "../hooks/useBackendStatusSocket";

const BackendStatusIndicator = ({ showLabel = true, className = "" }) => {
  const { isOnline, isConnected, lastCheck } = useBackendStatusSocket({
    autoReconnect: true,
    checkInterval: 60000, // Check every 1 minute for indicator
  });

  const getStatusColor = () => {
    if (!isConnected) return "bg-yellow-500"; // Connecting
    if (isOnline) return "bg-green-500"; // Online
    return "bg-red-500"; // Offline
  };

  const getStatusText = () => {
    if (!isConnected) return "Connecting...";
    if (isOnline) return "Online";
    return "Offline";
  };

  const formatTime = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center space-x-1">
        <div
          className={`w-2 h-2 rounded-full ${getStatusColor()} ${
            !isConnected ? "animate-pulse" : ""
          }`}
        />
        {showLabel && (
          <span
            className={`text-xs ${
              isOnline ? "text-green-600" : "text-red-600"
            }`}
          >
            {getStatusText()}
          </span>
        )}
      </div>
      {lastCheck && showLabel && (
        <span className="text-xs text-gray-400">{formatTime(lastCheck)}</span>
      )}
    </div>
  );
};

export default BackendStatusIndicator;
