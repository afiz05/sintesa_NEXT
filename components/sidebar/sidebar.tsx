import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@heroui/react";
import { CompaniesDropdown } from "./companies-dropdown";
import {
  Home,
  Users,
  Settings,
  ChevronDown,
  CandlestickChart,
  Info,
  TestTube2,
  Database,
} from "lucide-react";
import { InqVertikalDD } from "./inquiry-vrtkl-dropdown";
import { InqHorizontalDD } from "./inquiry-hrzntl-dropdown";
import { MbgHorizontalDD } from "./mbg-hrzntl-dropdown";
import { MbgVertikalDD } from "./mbg-vrtkl-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { EpaHorizontalDD } from "./epa-hrzntl-dropdown";
import { EpaVertikalDD } from "./epa-vrtkl-dropdown";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <>
      {/* Mobile Sidebar (Vertical) */}
      <aside className="xl:hidden h-screen z-[20] sticky top-0">
        {collapsed ? (
          <div className={Sidebar.Overlay()} onClick={setCollapsed} />
        ) : null}
        <div
          className={Sidebar({
            collapsed: collapsed,
          })}
        >
          {/* <div className={Sidebar.Header()}>
            <CompaniesDropdown />
          </div> */}
          <div className="flex flex-col justify-between h-full">
            <div className={Sidebar.Body()}>
              <SidebarItem
                title="Dashboard"
                icon={<Home />}
                isActive={pathname === "/"}
                href="/"
              />

              <SidebarMenu title="Main Menu">
                <MbgVertikalDD
                  icon={<CandlestickChart className="text-default-500" />}
                  items={["Dashboard", "Kertas Kerja", "Data"]}
                  title="Makan Bergizi"
                  isActive={pathname.startsWith("/mbg")}
                />
                <SidebarItem
                  isActive={pathname === "/profilkl"}
                  title="Profil K/L"
                  icon={<Users />}
                  href="/profilkl"
                />
                <EpaVertikalDD
                  icon={<CandlestickChart className="text-default-500" />}
                  items={["Summary", "Analisa"]}
                  title="EPA"
                  isActive={pathname.startsWith("/epa")}
                ></EpaVertikalDD>
                <InqVertikalDD
                  icon={<CandlestickChart className="text-default-500" />}
                  items={[
                    "Belanja",
                    "Tematik",
                    "Kontrak",
                    "UP/TUP",
                    "Bansos",
                    "Deviasi",
                    "RKAKL Detail",
                  ]}
                  title="Inquiry Data"
                  isActive={pathname.startsWith("/inquiry-data")}
                />
              </SidebarMenu>

              <SidebarMenu title="General">
                <SidebarItem
                  isActive={pathname === "/settings"}
                  title="Settings"
                  icon={<Settings />}
                  href="/settings"
                />
              </SidebarMenu>

              <SidebarMenu title="Updates">
                <SidebarItem
                  isActive={pathname === "/tentang-kami"}
                  title="Tentang Kami"
                  icon={<Info />}
                  href="/tentang-kami"
                />
                <SidebarItem
                  isActive={pathname === "/test-belanja"}
                  title="Belanja Test"
                  icon={<TestTube2 className="text-default-500" />}
                  href="/test-belanja"
                />
              </SidebarMenu>
            </div>
            <div className={Sidebar.Footer()}>
              <Tooltip content={"Settings"} color="primary">
                <div className="max-w-fit">
                  <Settings />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Horizontal Navbar - Only for XL screens */}
      <nav className="hidden xl:block w-full z-[50] bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between font-medium">
            {/* Center - Navigation Items */}
            <div className="flex items-center space-x-4 overflow-x-auto overflow-y-visible">
              <SidebarItem
                title="Dashboard"
                icon={<Home />}
                isActive={pathname === "/"}
                href="/"
              />

              <MbgHorizontalDD
                icon={<CandlestickChart />}
                items={["Dashboard", "Kertas Kerja", "Data"]}
                title="Makan Bergizi"
                isActive={pathname.startsWith("/mbg")}
              >
                <ChevronDown size={16} />
              </MbgHorizontalDD>

              <SidebarItem
                isActive={pathname === "/profilkl"}
                title="Profil K/L"
                icon={<Users />}
                href="/profilkl"
              />
              <EpaHorizontalDD
                icon={<CandlestickChart />}
                items={["Summary", "Analisa"]}
                title="EPA"
                isActive={pathname.startsWith("/epa")}
              >
                <ChevronDown size={16} />
              </EpaHorizontalDD>
              <InqHorizontalDD
                icon={<Database />}
                items={[
                  "Belanja",
                  "Tematik",
                  "Kontrak",
                  "UP/TUP",
                  "Bansos",
                  "Deviasi",
                  "RKAKL Detail",
                ]}
                title="Inquiry Data"
                isActive={pathname.startsWith("/inquiry-data")}
              >
                <ChevronDown size={16} />
              </InqHorizontalDD>

              <SidebarItem
                isActive={pathname === "/tentang-kami"}
                title="Tentang Kami"
                icon={<Info />}
                href="/tentang-kami"
              />

              <SidebarItem
                isActive={pathname === "/test-belanja"}
                title="Belanja Test"
                icon={<TestTube2 />}
                href="/test-belanja"
              />
            </div>

            {/* Right side - User Actions */}
            <div className="flex items-center space-x-3">
              <Tooltip content={"Settings"} color="primary">
                <div className="max-w-fit cursor-pointer">
                  <Settings />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
