import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "../layout/layout-context";
import clsx from "clsx";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
  // New props for customization
  color?: string;
  bgColor?: string;
  hoverColor?: string;
  activeColor?: string;
  activeBgColor?: string;
  className?: string;
}

export const SidebarItem = ({
  icon,
  title,
  isActive,
  href = "",
  color = "text-default-900",
  bgColor,
  hoverColor = "hover:bg-default-100",
  activeColor,
  activeBgColor = "bg-primary-100",
  className = "",
}: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 1280) {
      setCollapsed();
    }
  };

  // Build dynamic classes based on props
  const getActiveClasses = () => {
    if (isActive) {
      const bgClass = bgColor || activeBgColor;
      const iconClass = activeColor
        ? `[&_svg]:stroke-${activeColor.replace("text-", "")}`
        : "[&_svg]:stroke-primary-500";
      return `${bgClass} ${iconClass}`;
    }
    return hoverColor;
  };

  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          getActiveClasses(),
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]",
          className
        )}
        onClick={handleClick}
      >
        {icon}
        <span className={clsx(color)}>{title}</span>
      </div>
    </NextLink>
  );
};
