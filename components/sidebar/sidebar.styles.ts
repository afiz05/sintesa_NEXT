import { tv } from "@heroui/react";

export const SidebarWrapper = tv({
  base: "bg-background transition-transform h-full fixed -translate-x-full w-64 shrink-0 z-[202] overflow-y-auto border-r border-divider flex-col py-6 px-3 xl:ml-0 xl:flex xl:static xl:h-screen xl:translate-x-0 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-default-300/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-default-300/40 [&::-webkit-scrollbar-thumb]:transition-colors",

  variants: {
    collapsed: {
      true: "translate-x-0 ml-0 pt-20 [display:inherit]",
    },
  },
  // ""
  //   "@md": {
  //     marginLeft: "0",
  //     display: "flex",
  //     position: "static",
  //     height: "100vh",
  //     transform: "translateX(0)",
  //   },
  //   variants: {
  //     collapsed: {
  //       true: {
  //         display: "inherit",
  //         marginLeft: "0 ",
  //         transform: "translateX(0)",
  //       },
  //     },
  //   },
});
export const Overlay = tv({
  base: "bg-[rgb(15_23_42/0.1)] fixed inset-0 z-[201] opacity-40 transition-opacity xl:hidden xl:z-auto xl:opacity-100",
});

export const Header = tv({
  base: "flex gap-8 items-center px-6",
});

export const Body = tv({
  base: "flex flex-col gap-6 mt-9 px-2",
});

export const Footer = tv({
  base: "flex items-center justify-center gap-6 pt-16 pb-8 px-8 xl:pt-10 xl:pb-0",
});

export const Sidebar = Object.assign(SidebarWrapper, {
  Header,
  Body,
  Overlay,
  Footer,
});
