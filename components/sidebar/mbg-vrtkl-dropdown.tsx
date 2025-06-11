"use client";
import React, { useState } from "react";
import { ChevronDownIcon } from "../icons/sidebar/chevron-down-icon";
import { Accordion, AccordionItem } from "@heroui/react";
import clsx from "clsx";
import { FileText, Database, BarChart3, Building2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useSidebarContext } from "../layout/layout-context";

interface MenuItem {
  label: string;
  href: string;
}

interface Props {
  icon: React.ReactNode;
  title: string;
  items: string[] | MenuItem[];
  isActive?: boolean;
}

export const MbgVertikalDD = ({
  icon,
  items,
  title,
  isActive = false,
}: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  // Function to get appropriate icon for each menu item
  const getItemIcon = (itemLabel: string) => {
    // Handle mbg menu items
    if (
      title.toLowerCase() === "mbg" ||
      title.toLowerCase() === "makan bergizi"
    ) {
      switch (itemLabel.toLowerCase()) {
        case "dashboard":
        case "dashboard mbg":
          return <BarChart3 size={16} />;
        case "kertas kerja":
        case "kertas kerja mbg":
          return <FileText size={16} />;
        case "data":
        case "data mbg":
          return <Database size={16} />;
        default:
          return <Building2 size={16} />;
      }
    } else {
      // Default handling for other menu items
      return <Building2 size={16} />;
    }
  };

  // Helper function to handle navigation
  const handleItemClick = (item: string | MenuItem) => {
    if (typeof item === "string") {
      // For string items, create a route based on the parent title and item name
      let route: string;

      if (
        title.toLowerCase() === "mbg" ||
        title.toLowerCase() === "makan bergizi"
      ) {
        // Special handling for mbg data items
        switch (item.toLowerCase()) {
          case "dashboard":
          case "dashboard mbg":
            route = "/mbg/dashboard-mbg";
            break;
          case "kertas kerja":
          case "kertas kerja mbg":
            route = "/mbg/kertas-kerja";
            break;
          case "data":
          case "data mbg":
            route = "/mbg/data-update";
            break;
          default:
            const itemSlug = item
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[\/]/g, "-");
            route = `/mbg/${itemSlug}`;
        }
      } else {
        // Default route pattern for other items
        route = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
      }

      router.push(route);
    } else {
      // For MenuItem objects, use the href property
      router.push(item.href);
    }

    // Close the sidebar after navigation (for screens below XL)
    if (window.innerWidth < 1280) {
      setCollapsed();
    }
  };

  // Helper function to get item label
  const getItemLabel = (item: string | MenuItem): string => {
    return typeof item === "string" ? item : item.label;
  };

  // Helper function to check if an item is active
  const isItemActive = (item: string | MenuItem): boolean => {
    if (typeof item === "string") {
      if (
        title.toLowerCase() === "mbg" ||
        title.toLowerCase() === "makan bergizi"
      ) {
        switch (item.toLowerCase()) {
          case "dashboard":
          case "dashboard mbg":
            return pathname === "/mbg/dashboard-mbg";
          case "kertas kerja":
          case "kertas kerja mbg":
            return pathname === "/mbg/kertas-kerja";
          case "data":
          case "data mbg":
            return pathname === "/mbg/data-update";
          default:
            const itemSlug = item
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[\/]/g, "-");
            return pathname === `/mbg/${itemSlug}`;
        }
      }
      return pathname === `/${item.toLowerCase().replace(/\s+/g, "-")}`;
    } else {
      return pathname === item.href;
    }
  };

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0 w-full">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger: clsx(
              isActive
                ? "bg-primary-100 [&_svg]:stroke-primary-500"
                : "hover:bg-default-100",
              "py-0 min-h-[44px] rounded-xl active:scale-[0.98] transition-transform px-3.5"
            ),
            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
            content: "px-0 pb-2",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="space-y-1">
            {items.map((item, index) => {
              const itemLabel = getItemLabel(item);
              const itemActive = isItemActive(item);
              return (
                <div
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={clsx(
                    itemActive
                      ? "bg-primary-100 text-primary [&_svg]:text-primary [&_svg]:stroke-primary"
                      : "hover:text-primary hover:bg-default-100",
                    "w-full flex py-2 pl-8 pr-2 rounded-lg transition-colors cursor-pointer min-h-[36px] items-center gap-2 group"
                  )}
                >
                  <span
                    className={clsx(
                      itemActive
                        ? "text-primary"
                        : "text-default-400 group-hover:text-primary",
                      "transition-colors"
                    )}
                  >
                    {getItemIcon(itemLabel)}
                  </span>
                  <span
                    className={clsx(
                      itemActive ? "text-primary" : "group-hover:text-primary",
                      "text-base transition-colors"
                    )}
                  >
                    {itemLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
