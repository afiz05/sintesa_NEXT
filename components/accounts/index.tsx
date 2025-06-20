"use client";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import React, { useRef } from "react";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";

import { AddUser } from "./add-user";
import User from "./landing";

export const Accounts = () => {
  // Ref to access User's reloadData
  const userRef = useRef<any>(null);
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="max-w-[95rem] mx-auto w-full">
        {/* Pass ref to User to call reloadData */}
        <User ref={userRef} />
      </div>
    </div>
  );
};
