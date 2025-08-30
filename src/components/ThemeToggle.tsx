import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button variant="outline" size="sm" aria-label="Toggle theme" onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hover-scale">
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
