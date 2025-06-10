"use client";

import React, { createContext, useContext, useState } from "react";

interface Notification {
  id: number;
  header: string;
  message: string;
  read: boolean;
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  addNotification: (notification: Omit<Notification, "id">) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      header: "New Message",
      message: "New message from John",
      read: false,
    },
    {
      id: 2,
      header: "Comment Activity",
      message: "New comment on your post",
      read: false,
    },
    {
      id: 3,
      header: "System Update",
      message: "System update available",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (notification: Omit<Notification, "id">) => {
    const newId = Math.max(...notifications.map((n) => n.id), 0) + 1;
    setNotifications((prev) => [{ ...notification, id: newId }, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
