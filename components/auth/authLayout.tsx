"use client";

import { Image } from "@heroui/react";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      {/* Single section - Login form with background */}
      <div className="flex-1 flex-col flex items-center justify-start md:justify-center p-6 overflow-y-auto md:overflow-hidden min-h-screen relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            className="w-full h-full object-cover object-center"
            src="https://nextui.org/gradients/docs-right.png"
            alt="gradient"
          />
        </div>
        <div className="relative z-10 w-full py-8 md:py-0">{children}</div>
      </div>
    </div>
  );
};
