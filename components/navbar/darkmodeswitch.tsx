import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@heroui/react";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme, theme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);

  // Only run on client side to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Only initialize theme once on mount
  React.useEffect(() => {
    // Don't do anything during SSR
    if (!mounted) return;

    try {
      // Check if there's a stored theme
      const storedTheme = localStorage.getItem("sintesa-theme");

      // If there's a stored theme and it doesn't match the current theme
      if (storedTheme && theme !== storedTheme) {
        console.log("Setting theme from localStorage:", storedTheme);
        setTheme(storedTheme);
      }
    } catch (e) {
      console.error("Error syncing theme:", e);
    }
  }, [mounted, theme, setTheme]);

  // Function to handle theme toggle
  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? "dark" : "light";

    // Apply theme through next-themes (this will automatically update localStorage)
    setTheme(newTheme);

    console.log("Theme changed to:", newTheme);
  };

  // If not mounted yet (during SSR), show an invisible switch with same dimensions
  if (!mounted) {
    return (
      <Switch
        isSelected={false}
        aria-label="Toggle dark mode"
        className="opacity-0"
      />
    );
  }

  return (
    <Switch
      isSelected={resolvedTheme === "dark"}
      onValueChange={handleThemeChange}
      aria-label="Toggle dark mode"
    />
  );
};
