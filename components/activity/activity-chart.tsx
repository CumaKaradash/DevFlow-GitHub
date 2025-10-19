"use client"

import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { format, subDays, startOfDay, isSameDay } from "date-fns"

export function ActivityChart() {
  const { pomodoroSessions, goals } = useDevFlowStore()

  // Generate data for the last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    return startOfDay(date)
  })

  const chartData = last7Days.map((date) => {
    const focusSessions = pomodoroSessions.filter(
      (session) => session.type === "focus" && isSameDay(new Date(session.completedAt), date),
    ).length

    const completedGoals = goals.filter((goal) => goal.completed && isSameDay(new Date(goal.createdAt), date)).length

    return {
      date: format(date, "EEE"),
      fullDate: format(date, "MMM d"),
      focus: focusSessions,
      goals: completedGoals,
    }
  })

  const totalFocusSessions = chartData.reduce((sum, day) => sum + day.focus, 0)
  const totalCompletedGoals = chartData.reduce((sum, day) => sum + day.goals, 0)

  return (
    <Card className="border border-border shadow-lg transition-theme md:col-span-2 lg:col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Weekly Activity</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-primary/30 text-primary border-primary/40 font-semibold">
              {totalFocusSessions} Focus Sessions
            </Badge>
            <Badge variant="outline" className="bg-accent/30 text-accent-foreground border-accent/40 font-semibold">
              {totalCompletedGoals} Goals
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="focus" fill="hsl(var(--primary))" name="Focus Sessions" radius={[4, 4, 0, 0]} />
            <Bar dataKey="goals" fill="hsl(var(--accent))" name="Completed Goals" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
