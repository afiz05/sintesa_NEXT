import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarItem,
} from "@heroui/react";
import React, { useCallback, useContext } from "react";

import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/actions/auth.action";
import MyContext from "@/utils/Context";
import Link from "next/link";

export const UserDropdown = () => {
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    await deleteAuthCookie();
    router.replace("/login");
  }, [router]);
  const context = useContext(MyContext);

  const { name } = context! as {
    name: string;
  };

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        disabledKeys={["username"]}
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="username"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{name}</p>
        </DropdownItem>
        <DropdownItem key="profil-user">
          <Link href="/profil-user" className="dropdown-item">
            Profil User
          </Link>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>

        {/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
        {/* <DropdownItem key="system">System</DropdownItem> */}

        {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
        <DropdownItem key="user-manage">
          <Link href="/accounts" className="dropdown-item">
            User Management
          </Link>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
