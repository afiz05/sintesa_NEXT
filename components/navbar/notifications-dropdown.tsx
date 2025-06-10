import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from "@heroui/react";
import React from "react";
import { NotificationIcon } from "../icons/navbar/notificationicon";

export const NotificationsDropdown = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu
        className="min-w-80 max-w-96 w-auto"
        aria-label="Avatar Actions"
      >
        <DropdownSection title="Notificacions">
          <DropdownItem
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            key="1"
            description="Lakukan perekaman sesuai juknis berlaku, batas akhir penginputan tanggal 6 Mei 2025."
          >
            📣 Perekaman Kendala Makan Bergizi Gratis
          </DropdownItem>
          <DropdownItem
            key="2"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Lakukan perekaman sesuai juknis berlaku, batas akhir penginputan tanggal 20 Mei 2025."
          >
            🚀 Perekaman Menu Spending Review 2025
          </DropdownItem>
          <DropdownItem
            key="3"
            classNames={{
              base: "py-2",
              title: "text-base font-semibold",
            }}
            description="Silahkan cek menu Spending Review 2025 dan laporkan jika terdapat bug/kendala."
          >
            📣 Menu Spending Review 2025 telah dibuka
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
