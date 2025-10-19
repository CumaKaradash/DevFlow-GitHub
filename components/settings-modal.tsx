"use client"

import { useState } from "react"
import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Download, Upload, Trash2 } from "lucide-react"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const {
    githubUsername,
    setGithubUsername,
    pomodoroSettings,
    updatePomodoroSettings,
    exportData,
    importData,
    resetData,
  } = useDevFlowStore()

  const [localUsername, setLocalUsername] = useState(githubUsername)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleSave = () => {
    setGithubUsername(localUsername)
    onOpenChange(false)
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `devflow-backup-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "application/json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target?.result as string
          importData(data)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleReset = () => {
    if (showResetConfirm) {
      resetData()
      setShowResetConfirm(false)
      onOpenChange(false)
    } else {
      setShowResetConfirm(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Customize your DevFlow experience</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* GitHub Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">GitHub Integration</h3>
            <div className="space-y-2">
              <Label htmlFor="github-username">GitHub Username</Label>
              <Input
                id="github-username"
                placeholder="octocat"
                value={localUsername}
                onChange={(e) => setLocalUsername(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* Pomodoro Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Pomodoro Timer</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="focus-duration">Focus (minutes)</Label>
                <Input
                  id="focus-duration"
                  type="number"
                  min="1"
                  max="60"
                  value={pomodoroSettings.focusDuration}
                  onChange={(e) =>
                    updatePomodoroSettings({
                      focusDuration: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short-break">Short Break (minutes)</Label>
                <Input
                  id="short-break"
                  type="number"
                  min="1"
                  max="30"
                  value={pomodoroSettings.shortBreakDuration}
                  onChange={(e) =>
                    updatePomodoroSettings({
                      shortBreakDuration: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="long-break">Long Break (minutes)</Label>
                <Input
                  id="long-break"
                  type="number"
                  min="1"
                  max="60"
                  value={pomodoroSettings.longBreakDuration}
                  onChange={(e) =>
                    updatePomodoroSettings({
                      longBreakDuration: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-enabled">Sound Notifications</Label>
              <Switch
                id="sound-enabled"
                checked={pomodoroSettings.soundEnabled}
                onCheckedChange={(checked) => updatePomodoroSettings({ soundEnabled: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-start">Auto-start Next Session</Label>
              <Switch
                id="auto-start"
                checked={pomodoroSettings.autoStartNext}
                onCheckedChange={(checked) => updatePomodoroSettings({ autoStartNext: checked })}
              />
            </div>
          </div>

          <Separator />

          {/* Data Management */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Data Management</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" onClick={handleImport}>
                <Upload className="mr-2 h-4 w-4" />
                Import Data
              </Button>
            </div>
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
            <Button variant={showResetConfirm ? "destructive" : "outline"} onClick={handleReset} className="w-full">
              <Trash2 className="mr-2 h-4 w-4" />
              {showResetConfirm ? "Click again to confirm reset" : "Reset All Data"}
            </Button>
            {showResetConfirm && (
              <p className="text-xs text-muted-foreground">
                This will permanently delete all your data. Click the button again to confirm.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
