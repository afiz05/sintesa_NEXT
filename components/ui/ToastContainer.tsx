"use client";

import React from "react";
import {
  useToast,
  Toast as ToastType,
} from "@/components/context/ToastContext";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { clsx } from "clsx";

const ToastComponent: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const { removeToast } = useToast();

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800";
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800";
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-950 dark:border-gray-800";
    }
  };

  const getTextColor = () => {
    switch (toast.type) {
      case "success":
        return "text-green-800 dark:text-green-200";
      case "error":
        return "text-red-800 dark:text-red-200";
      case "warning":
        return "text-yellow-800 dark:text-yellow-200";
      case "info":
        return "text-blue-800 dark:text-blue-200";
      default:
        return "text-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div
      className={clsx(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md transition-all duration-300 ease-in-out transform",
        getBackgroundColor(),
        "animate-in slide-in-from-right-full"
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className={clsx("flex-1 text-sm font-medium", getTextColor())}>
        {toast.message}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className={clsx(
          "flex-shrink-0 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
          getTextColor()
        )}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
