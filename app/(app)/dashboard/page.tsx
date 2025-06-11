"use client";
import { useEffect } from "react";
import type { NextPage } from "next";
import { Content } from "@/components/home/content";

const Dashboard: NextPage = () => {
  useEffect(() => {
    // Scroll to bottom when component mounts - only on XL screens (1280px and wider)
    const scrollToBottom = () => {
      // Check if screen width is XL (1280px or wider)
      if (window.innerWidth >= 1280) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    // Add a small delay to ensure content is fully rendered
    const timer = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timer);
  }, []);

  return <Content />;
};

export default Dashboard;
