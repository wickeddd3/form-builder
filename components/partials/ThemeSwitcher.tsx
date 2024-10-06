"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LuMonitor, LuMoonStar, LuSunDim, LuSunMedium } from "react-icons/lu";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
  };

  return (
    <Tabs data-testid="theme-switcher" role="tabs" defaultValue={theme}>
      <TabsList role="tabslist" className="border">
        <TabsTrigger
          value="light"
          role="tab"
          aria-label="Light Theme"
          aria-selected={theme === "light"}
          onClick={() => handleThemeChange("light")}
        >
          {theme === "dark" ? (
            <LuSunDim className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <LuSunMedium className="h-[1.2rem] w-[1.2rem]" />
          )}
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          role="tab"
          aria-label="Dark Theme"
          aria-selected={theme === "dark"}
          onClick={() => handleThemeChange("dark")}
        >
          <LuMoonStar
            className={`h-[1.2rem] w-[1.2rem] rotate-90 transition-all ${
              theme === "dark" ? "" : "dark:rotate-0"
            }`}
          />
        </TabsTrigger>
        <TabsTrigger
          value="system"
          role="tab"
          aria-label="System Theme"
          aria-selected={theme === "system"}
          onClick={() => handleThemeChange("system")}
        >
          <LuMonitor className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitcher;
