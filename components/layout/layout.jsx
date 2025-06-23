"use client";

import React from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";

export const Layout = ({ children }) => {
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
      <div className="flex">
        {/* Hamburger Sidebar for all screens except XL */}
        <div className="xl:hidden">
          <SidebarWrapper />
        </div>

        {/* Main content area with navbar and desktop sidebar */}
        <div className="flex-1">
          <NavbarWrapper>
            {/* Desktop Horizontal Sidebar - positioned below navbar (XL screens only) */}
            <div className="hidden xl:block">
              <SidebarWrapper />
            </div>
            {children}
          </NavbarWrapper>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
