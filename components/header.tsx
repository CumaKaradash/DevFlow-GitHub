"use client"

import { Moon, Sun, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SettingsModal } from "./settings-modal"
import Image from "next/image"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm transition-theme">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="DevFlow Logo" width={40} height={40} priority className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold">DevFlow</h1>
              <p className="text-xs text-muted-foreground">Productivity Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
              aria-label="Open settings"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  )
}
