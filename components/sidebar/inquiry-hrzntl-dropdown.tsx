"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { Building2, CreditCard, Banknote } from "lucide-react";

interface DropdownItemType {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface Props {
  icon: React.ReactNode;
  title: string;
  items: string[] | DropdownItemType[];
  isActive?: boolean;
  children?: React.ReactNode;
}

export const InqHorizontalDD = ({
  icon,
  title,
  items,
  isActive,
  children,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname(); // Convert string items to DropdownItemType with default icons and routes
  const dropdownItems: DropdownItemType[] = React.useMemo(() => {
    if (items.length === 0) return [];

    if (typeof items[0] === "string") {
      return (items as string[]).map((item, index) => {
        let icon: React.ReactNode;
        let href: string;

        // Handle inquiry-data menu items
        if (title.toLowerCase() === "inquiry data") {
          const itemSlug = item
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[\/]/g, "-");
          href = `/inquiry-data/${itemSlug}`;

          // Assign icons based on menu item names
          switch (item.toLowerCase()) {
            case "belanja":
              icon = <CreditCard size={16} />;
              break;

            case "tematik":
              icon = <Building2 size={16} />;
              break;
            case "kontrak":
              icon = <Banknote size={16} />;
              break;
            case "up/tup":
              icon = <Building2 size={16} />;
              break;
            case "bansos":
              icon = <CreditCard size={16} />;
              break;
            case "deviasi":
              icon = <Banknote size={16} />;
              break;
            case "rkakl detail":
              icon = <Building2 size={16} />;
              break;
            default:
              icon = <Building2 size={16} />;
          }
        } else {
          // Default handling for other menu items
          icon = <Building2 size={16} />;
          href = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
        }

        return {
          label: item,
          href,
          icon,
        };
      });
    }
    return items as DropdownItemType[];
  }, [items, title]);
  const handleItemClick = (href: string) => {
    router.push(href);
  };

  // Helper function to check if an item is active
  const isItemActive = (href: string): boolean => {
    return pathname === href;
  };
  return (
    <div className="relative">
      <Dropdown placement="bottom-start" className="min-w-[240px]">
        <DropdownTrigger>
          <div
            data-testid="hover-dropdown-button"
            className={clsx(
              isActive
                ? "bg-primary-100 [&_svg]:stroke-primary-500"
                : "hover:bg-default-100",
              "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
            )}
          >
            {icon}
            <span className="text-default-900">{title}</span>
            {children}
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label={`${title} menu`}
          className="w-full font-sans py-2"
          onAction={(key) => {
            const item = dropdownItems[Number(key)];
            if (item) {
              handleItemClick(item.href);
            }
          }}
        >
          {dropdownItems.map((item, index) => {
            const itemActive = isItemActive(item.href);
            return (
              <DropdownItem
                key={index}
                className={clsx(
                  itemActive
                    ? "bg-primary-100 [&_*]:text-primary"
                    : "data-[hover=true]:bg-default-100",
                  "font-sans text-sm py-3 px-4 min-h-[44px] group"
                )}
              >
                <div className="flex items-center gap-3">
                  {" "}
                  <span
                    className={clsx(
                      itemActive
                        ? "text-primary [&_svg]:stroke-primary"
                        : "text-default-900 group-hover:text-primary [&_svg]:group-hover:stroke-primary",
                      "flex-shrink-0 transition-colors"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={clsx(
                      itemActive
                        ? "text-primary"
                        : "text-default-900 group-hover:text-primary",
                      "text-base transition-colors"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
