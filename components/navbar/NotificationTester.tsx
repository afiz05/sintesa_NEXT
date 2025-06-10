"use client";

import { useNotifications } from "@/components/context/NotificationContext";
import { Button } from "@heroui/react";

const NotificationTester = () => {
  const { addNotification } = useNotifications();

  const addTestNotification = () => {
    addNotification({
      header: "Test Notification",
      message: `Test message created at ${new Date().toLocaleTimeString()}`,
      read: false,
    });
  };

  return (
    <Button
      size="sm"
      color="primary"
      variant="flat"
      onClick={addTestNotification}
      className="ml-2"
    >
      Add Test Notification
    </Button>
  );
};

export default NotificationTester;
