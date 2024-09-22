"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LuMonitor, LuMoonStar, LuSunDim, LuSunMedium } from "react-icons/lu";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid rehydration errors

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="border">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          {theme === "dark" ? (
            <LuSunDim className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <LuSunMedium className="h-[1.2rem] w-[1.2rem]" />
          )}
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <LuMoonStar className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          <LuMonitor className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ThemeSwitcher;
