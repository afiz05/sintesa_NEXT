"use client";

import { useEffect } from "react";

export function ScrollkeBawah() {
  useEffect(() => {
    const scrollToBottom = () => {
      if (window.innerWidth >= 1280) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, []);

  return null; // tidak perlu render UI
}
