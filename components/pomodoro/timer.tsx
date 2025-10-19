"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react"

type SessionType = "focus" | "short" | "long"

export function PomodoroTimer() {
  const { pomodoroSettings, addPomodoroSession } = useDevFlowStore()
  const [sessionType, setSessionType] = useState<SessionType>("focus")
  const [timeLeft, setTimeLeft] = useState(pomodoroSettings.focusDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0)

  const timerRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const totalTime =
    sessionType === "focus"
      ? pomodoroSettings.focusDuration * 60
      : sessionType === "short"
        ? pomodoroSettings.shortBreakDuration * 60
        : pomodoroSettings.longBreakDuration * 60

  const progress = ((totalTime - timeLeft) / totalTime) * 100

  useEffect(() => {
    // Initialize audio for notifications
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0pBSh+zPDajzsKElyx6OyrWBQLSKDf8sFuIwUugc3y2Ik2CBhku+zooVARC0yl4fG5ZRwFNo3V7859KQUofsz",
      )
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current)
      }
    }
  }, [])

  const updateTimer = useCallback(() => {
    if (!isRunning) return

    const now = Date.now()
    const elapsed = Math.floor((now - startTimeRef.current) / 1000)
    const newTimeLeft = totalTime - elapsed

    if (newTimeLeft <= 0) {
      handleSessionComplete()
      return
    }

    setTimeLeft(newTimeLeft)
    timerRef.current = requestAnimationFrame(updateTimer)
  }, [isRunning, totalTime])

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - (totalTime - timeLeft) * 1000
      timerRef.current = requestAnimationFrame(updateTimer)
    } else if (timerRef.current) {
      cancelAnimationFrame(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current)
      }
    }
  }, [isRunning, updateTimer])

  const handleSessionComplete = () => {
    setIsRunning(false)

    // Play sound notification
    if (pomodoroSettings.soundEnabled && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignore audio play errors
      })
    }

    // Save session to store
    addPomodoroSession({
      type: sessionType,
      duration: totalTime / 60,
    })

    // Update completed focus sessions count
    if (sessionType === "focus") {
      setCompletedFocusSessions((prev) => prev + 1)
    }

    // Auto-start next session if enabled
    if (pomodoroSettings.autoStartNext) {
      handleNextSession()
      setIsRunning(true)
    } else {
      handleNextSession()
    }
  }

  const handleNextSession = () => {
    if (sessionType === "focus") {
      // After 4 focus sessions, take a long break
      const nextType = (completedFocusSessions + 1) % 4 === 0 ? "long" : "short"
      setSessionType(nextType)
      setTimeLeft(
        nextType === "long" ? pomodoroSettings.longBreakDuration * 60 : pomodoroSettings.shortBreakDuration * 60,
      )
    } else {
      setSessionType("focus")
      setTimeLeft(pomodoroSettings.focusDuration * 60)
    }
  }

  const handlePlayPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(totalTime)
  }

  const handleSkip = () => {
    setIsRunning(false)
    handleNextSession()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getSessionLabel = () => {
    switch (sessionType) {
      case "focus":
        return "Focus Time"
      case "short":
        return "Short Break"
      case "long":
        return "Long Break"
    }
  }

  const getSessionColor = () => {
    switch (sessionType) {
      case "focus":
        return "bg-primary text-primary-foreground"
      case "short":
        return "bg-accent text-accent-foreground"
      case "long":
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <Card className="border border-border shadow-lg transition-theme">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pomodoro Timer</CardTitle>
          <Badge variant="outline" className={getSessionColor()}>
            {getSessionLabel()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-6xl font-bold tabular-nums tracking-tight">{formatTime(timeLeft)}</div>
          <Progress
            value={progress}
            className="h-2 w-full"
            aria-label={`Pomodoro session progress: ${Math.round(progress)}%`}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            disabled={timeLeft === totalTime}
            aria-label="Reset Pomodoro timer"
            title="Reset timer"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            onClick={handlePlayPause}
            className="w-32"
            aria-label={isRunning ? "Pause timer" : "Start timer"}
            title={isRunning ? "Pause" : "Start"}
          >
            {isRunning ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSkip}
            aria-label="Skip to next session"
            title="Skip session"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Sessions: {completedFocusSessions}</span>
          <span>
            Next:{" "}
            {sessionType === "focus"
              ? (completedFocusSessions + 1) % 4 === 0
                ? "Long Break"
                : "Short Break"
              : "Focus"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
