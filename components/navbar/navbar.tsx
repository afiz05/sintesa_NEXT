import { Link, Navbar, NavbarContent } from "@heroui/react";
import React from "react";
import { DarkModeSwitch } from "./darkmodeswitch";
import { FeedbackIcon } from "../icons/navbar/feedback-icon";
import { GithubIcon } from "../icons/navbar/github-icon";
import { BurguerButton } from "./burguer-button";
import { PencarianSatker } from "../pencarian/PencarianSatker.jsx";

import NotificationBell from "@/components/navbar/NotificationBellFixed";
import NotificationTester from "@/components/navbar/NotificationTester";
import SintesaLogoDark from "../icons/logo/snext_dark.svg";
import SintesaLogoLight from "../icons/logo/snext_light.svg";
import SintesaLogoOnlyDark from "../icons/logo/snext_logoonly_dark.svg";
import SintesaLogoOnlyLight from "../icons/logo/snext_logoonly_light.svg";
import { UserDropdownjsx } from "./user-dropdownjsx";

interface Props {
  children?: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="w-full relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="xl:hidden" justify="start">
          <span className="flex items-center mr-4">
            <SintesaLogoOnlyDark className="h-6 w-auto block dark:hidden" />
            <SintesaLogoOnlyLight className="h-6 w-auto hidden dark:block" />
          </span>
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="xl:hidden" justify="center">
          <div className="flex-1">
            <PencarianSatker />
          </div>
          <NotificationBell />
          <DarkModeSwitch />
          <UserDropdownjsx />
        </NavbarContent>
        <NavbarContent className="w-full max-xl:hidden">
          {/* <CompaniesDropdown /> */}
          <div className="flex-shrink-0"></div>
          <span className="flex items-center mr-4">
            <SintesaLogoDark className="h-6 w-auto block dark:hidden" />
            <SintesaLogoLight className="h-6 w-auto hidden dark:block" />
          </span>
          <PencarianSatker placeholder="Ketik Kode atau Nama Satker..." />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0 max-xl:hidden"
        >
          {/* <div className="flex items-center gap-2">
            <FeedbackIcon />
            <span>Feedback?</span>
          </div> */}

          <NotificationBell />

          {/* <NotificationTester /> */}

          <Link href="https://spanint.kemenkeu.go.id/" target={"_blank"}>
            <GithubIcon />
          </Link>
          <DarkModeSwitch />

          <UserDropdownjsx />
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
