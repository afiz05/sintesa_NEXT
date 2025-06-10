import React from "react";
import { Menu } from "lucide-react";
import { useSidebarContext } from "../layout/layout-context";
import { StyledBurgerButton } from "./navbar.styles";

export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div className={StyledBurgerButton()} onClick={setCollapsed}>
      <Menu size={24} />
    </div>
  );
};
