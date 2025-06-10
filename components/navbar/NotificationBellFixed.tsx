import { BellRing } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useNotifications } from "@/components/context/NotificationContext";

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  return (
    <div className="relative flex items-center">
      {" "}
      <Dropdown
        placement="bottom-end"
        className="min-w-[320px]"
        closeOnSelect={false}
      >
        <DropdownTrigger>
          <button
            className="relative p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all duration-150 cursor-pointer flex items-center justify-center focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 active:outline-none"
            aria-label="Toggle notifications"
            type="button"
            style={{ outline: "none", boxShadow: "none" }}
          >
            <BellRing
              size={24}
              className="text-default-400 dark:text-default-400"
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Notifications"
          className="w-full"
          onAction={(key) => {
            if (key !== "empty") {
              const notificationId = Number(key);
              markAsRead(notificationId);
            }
          }}
        >
          {notifications.length === 0 ? (
            <DropdownItem key="empty" className="text-default-500" isReadOnly>
              No notifications
            </DropdownItem>
          ) : (
            notifications.map((notification) => (
              <DropdownItem
                key={notification.id}
                className={`text-default-900 transition-colors ${
                  notification.read ? "opacity-60" : ""
                }`}
              >
                {" "}
                <div className="flex flex-col gap-1">
                  <div
                    className={`text-sm font-medium ${
                      notification.read
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {notification.header}
                  </div>
                  <div
                    className={`text-xs ${
                      notification.read
                        ? "text-gray-400 dark:text-gray-500"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {notification.message}
                  </div>
                </div>
              </DropdownItem>
            ))
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NotificationBell;
