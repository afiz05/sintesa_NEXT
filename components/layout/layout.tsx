"use client";

import React from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <div className="flex flex-col min-h-screen">
        {/* Navbar always at the top */}
        <NavbarWrapper />
        {/* Sidebar below navbar */}
        <div>
          {/* Hamburger Sidebar for all screens except XL */}
          <div className="xl:hidden">
            <SidebarWrapper />
          </div>
          {/* Desktop Sidebar - positioned below navbar (XL screens only) */}
          <div className="hidden xl:block pt-16">
            <SidebarWrapper />
          </div>
        </div>
        {/* Main content area */}
        <div className="flex-1 bg-slate-100 dark:bg-black">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
};
