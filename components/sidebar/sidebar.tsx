import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Tooltip } from "@heroui/react";
import {
  Home,
  Users,
  Settings,
  ChevronDown,
  Info,
  TestTube2,
  Database,
  Ham,
  BookCheck,
  ScrollText,
  FileSearch,
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
import { TkdHorizontalDD } from "./tkd-horizontal";
import { TkdVertikalDD } from "./tkd-vertical";

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
                icon={<Home className="text-primary" />}
                isActive={pathname === "/"}
                href="/"
              />

              <SidebarMenu title="Menu Utama">
                <MbgVertikalDD
                  icon={<Ham className="text-amber-700" />}
                  items={["Dashboard", "Kertas Kerja", "Data"]}
                  title="Makan Bergizi"
                  isActive={pathname.startsWith("/mbg")}
                />

                <SidebarItem
                  isActive={pathname === "/profilkl"}
                  title="Profil K/L"
                  icon={<Users className="text-warning" />}
                  href="/profilkl"
                />
                <EpaVertikalDD
                  icon={<BookCheck className="text-success" />}
                  items={["Summary", "Analisa"]}
                  title="EPA"
                  isActive={pathname.startsWith("/epa")}
                ></EpaVertikalDD>
                <InqVertikalDD
                  icon={<Database className="text-secondary" />}
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
                <SidebarItem
                  isActive={pathname === "/test-belanja"}
                  title="Spending Review"
                  icon={<FileSearch />}
                  href="/test-belanja"
                />
                <TkdVertikalDD
                  icon={
                    <Database
                      className="text-secondary"
                      strokeWidth={2.5}
                      size={26}
                    />
                  }
                  items={["DAU", "Upload Laporan"]}
                  title="TKD"
                  isActive={pathname.startsWith("/tkd")}
                />

                {/* <SidebarItem
                    isActive={pathname === "/test-belanja"}
                    title="Laporan"
                    icon={<ScrollText />}
                    href="/test-belanja"
                  /> */}
              </SidebarMenu>

              <SidebarMenu title="Lainnya">
                <SidebarItem
                  isActive={pathname === "/tentang-kami"}
                  title="Tentang Kami"
                  icon={<Info />}
                  href="/tentang-kami"
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
      <nav className="hidden xl:block w-full z-[50] bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-md fixed top-16">
        <div className="px-6 pt-1 pb-3">
          <div className="flex items-center justify-center font-medium">
            {/* Center - Navigation Items */}
            <div className="flex items-center space-x-4 overflow-x-auto overflow-y-visible">
              <SidebarItem
                title="Dashboard"
                icon={
                  <Home className="text-primary" strokeWidth={2.5} size={25} />
                }
                isActive={pathname === "/"}
                href="/"
              />

              <MbgHorizontalDD
                icon={
                  <Ham className="text-amber-700" strokeWidth={2.5} size={25} />
                }
                items={["Dashboard", "Kertas Kerja", "Data"]}
                title="Makan Bergizi"
                isActive={pathname.startsWith("/mbg")}
              >
                <ChevronDown size={20} strokeWidth={2.5} />
              </MbgHorizontalDD>

              <SidebarItem
                isActive={pathname === "/profilkl"}
                title="Profil K/L"
                icon={
                  <Users className="text-warning" strokeWidth={2.5} size={25} />
                }
                href="/profilkl"
                bgColor="bg-warning-100"
                color="text-default-900"
                activeBgColor="bg-warning-100"
                activeColor="text-warning"
                hoverColor="hover:bg-warning-100"
              />
              <EpaHorizontalDD
                icon={
                  <BookCheck
                    className="text-success"
                    strokeWidth={2.5}
                    size={26}
                  />
                }
                items={["Summary", "Analisa"]}
                title="EPA"
                isActive={pathname.startsWith("/epa")}
              >
                <ChevronDown size={20} strokeWidth={2.5} />
              </EpaHorizontalDD>
              <SidebarItem
                isActive={pathname === "/test-belanja"}
                title="Spending Review"
                icon={
                  <FileSearch
                    className="text-teal-500"
                    strokeWidth={2.5}
                    size={25}
                  />
                }
                href="/test-belanja"
                color="text-default-900"
                activeBgColor="bg-teal-100"
                activeColor="text-teal-500"
                hoverColor="hover:bg-teal-100"
              />
              <TkdHorizontalDD
                icon={
                  <Database
                    className="text-secondary"
                    strokeWidth={2.5}
                    size={26}
                  />
                }
                items={["DAU 2024", "DAU 2025", "Upload Laporan"]}
                title="TKD"
                isActive={pathname.startsWith("/tkd")}
              >
                <ChevronDown size={20} strokeWidth={2.5} />
              </TkdHorizontalDD>
              <InqHorizontalDD
                icon={
                  <Database
                    className="text-secondary"
                    strokeWidth={2.5}
                    size={26}
                  />
                }
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
                <ChevronDown size={20} strokeWidth={2.5} />
              </InqHorizontalDD>

              {/* <SidebarItem
                isActive={pathname === "/test-belanja"}
                title="Laporan"
                icon={<ScrollText strokeWidth={2.5} size={25} />}
                href="/test-belanja"
              /> */}
              <SidebarItem
                isActive={pathname === "/tentang-kami"}
                title="Tentang Kami"
                icon={
                  <Info
                    className="text-default-500"
                    strokeWidth={2.5}
                    size={25}
                  />
                }
                href="/tentang-kami"
                color="text-default-900"
                activeBgColor="bg-default-200"
                activeColor="text-default-500"
                hoverColor="hover:bg-default-200"
              />
            </div>

            {/* Right side - User Actions */}
            <div className="flex items-center space-x-3">
              {/* <Tooltip content={"Settings"} color="primary">
                <div className="max-w-fit cursor-pointer">
                  <Settings />
                </div>
              </Tooltip> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
