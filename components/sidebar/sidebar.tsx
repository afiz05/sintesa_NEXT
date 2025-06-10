import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@heroui/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { InqVertikalDD } from "./inquiry-vrtkl-dropdown";
import { InqHorizontalDD } from "./inquiry-hrzntl-dropdown";
import { MbgHorizontalDD } from "./mbg-hrzntl-dropdown";
import { MbgVertikalDD } from "./mbg-vrtkl-dropdown";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { ChevronDown, ChevronUp, ChartCandlestick } from "lucide-react";
import { usePathname } from "next/navigation";
import { EpaHorizontalDD } from "./epa-hrzntl-dropdown";
import { EpaVertikalDD } from "./epa-vrtkl-dropdown";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <>
      {/* Mobile Sidebar (Vertical) */}
      <aside className="lg:hidden h-screen z-[20] sticky top-0">
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
                icon={<HomeIcon />}
                isActive={pathname === "/"}
                href="/"
              />

              <SidebarMenu title="Main Menu">
                <MbgVertikalDD
                  icon={<ChartCandlestick className="text-default-500" />}
                  items={["Dashboard", "Kertas Kerja", "Data"]}
                  title="Makan Bergizi"
                  isActive={pathname.startsWith("/mbg")}
                />
                <SidebarItem
                  isActive={pathname === "/profilkl"}
                  title="Profil K/L"
                  icon={<CustomersIcon />}
                  href="/profilkl"
                />
                <EpaVertikalDD
                  icon={<ChartCandlestick className="text-default-500" />}
                  items={["Summary", "Analisa"]}
                  title="EPA"
                  isActive={pathname.startsWith("/epa")}
                ></EpaVertikalDD>
                <InqVertikalDD
                  icon={<ChartCandlestick className="text-default-500" />}
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
                  isActive={pathname === "/accounts"}
                  title="Accounts"
                  icon={<AccountsIcon />}
                  href="/accounts"
                />
              </SidebarMenu>

              <SidebarMenu title="General">
                <SidebarItem
                  isActive={pathname === "/customers"}
                  title="Customers"
                  icon={<CustomersIcon />}
                  href="/customers"
                />
                <SidebarItem
                  isActive={pathname === "/products"}
                  title="Products"
                  icon={<ProductsIcon />}
                  href="/products"
                />
                <SidebarItem
                  isActive={pathname === "/reports"}
                  title="Reports"
                  icon={<ReportsIcon />}
                  href="/reports"
                />
                <SidebarItem
                  isActive={pathname === "/developers"}
                  title="Developers"
                  icon={<DevIcon />}
                  href="/developers"
                />

                <SidebarItem
                  isActive={pathname === "/settings"}
                  title="Settings"
                  icon={<SettingsIcon />}
                  href="/settings"
                />
              </SidebarMenu>

              <SidebarMenu title="Updates">
                <SidebarItem
                  isActive={pathname === "/changelog"}
                  title="Changelog"
                  icon={<ChangeLogIcon />}
                  href="/changelog"
                />
                <SidebarItem
                  isActive={pathname === "/test-loading"}
                  title="Test Loading"
                  icon={<DevIcon />}
                  href="/test-loading"
                />
              </SidebarMenu>
            </div>
            <div className={Sidebar.Footer()}>
              <Tooltip content={"Settings"} color="primary">
                <div className="max-w-fit">
                  <SettingsIcon />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Horizontal Navbar */}
      <nav className="hidden lg:block w-full z-[50] bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Center - Navigation Items */}
            <div className="flex items-center space-x-1 overflow-x-auto overflow-y-visible">
              <SidebarItem
                title="Dashboard"
                icon={<HomeIcon />}
                isActive={pathname === "/"}
                href="/"
              />

              <MbgHorizontalDD
                icon={<ChartCandlestick className="text-default-500" />}
                items={["Dashboard", "Kertas Kerja", "Data"]}
                title="Makan Bergizi"
                isActive={pathname.startsWith("/mbg")}
              >
                <ChevronDown size={16} className="text-default-500" />
              </MbgHorizontalDD>

              <SidebarItem
                isActive={pathname === "/profilkl"}
                title="Profil K/L"
                icon={<CustomersIcon />}
                href="/profilkl"
              />
              <EpaHorizontalDD
                icon={<ChartCandlestick className="text-default-500" />}
                items={["Summary", "Analisa"]}
                title="EPA"
                isActive={pathname.startsWith("/epa")}
              >
                <ChevronDown size={16} className="text-default-500" />
              </EpaHorizontalDD>
              <InqHorizontalDD
                icon={<ChartCandlestick className="text-default-500" />}
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
                <ChevronDown size={16} className="text-default-500" />
              </InqHorizontalDD>
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="/accounts"
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
                href="/settings"
              />
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
                href="/changelog"
              />
              <SidebarItem
                isActive={pathname === "/test-loading"}
                title="Test Loading"
                icon={<DevIcon />}
                href="/test-loading"
              />
            </div>

            {/* Right side - User Actions */}
            <div className="flex items-center space-x-3">
              <Tooltip content={"Settings"} color="primary">
                <div className="max-w-fit cursor-pointer">
                  <SettingsIcon />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
