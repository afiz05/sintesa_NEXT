"use client";

import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
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

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (notification) => {
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
