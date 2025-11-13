"use client"

import { useState, useMemo } from "react"
import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { format, subDays, startOfDay, isSameDay, addDays, isWithinInterval, parseISO, isAfter, isBefore } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

export function ActivityChart() {
  const { pomodoroSessions, goals } = useDevFlowStore()
  const today = startOfDay(new Date())
  const [dateRange, setDateRange] = useState({
    from: subDays(today, 6), // Default: Last 7 days
    to: today,
  } as { from: Date; to?: Date })

  // Generate data for the selected date range
  const daysInRange = useMemo(() => {
    if (!dateRange.from) return []
    const endDate = dateRange.to || dateRange.from
    if (!endDate) return []
    
    const days = []
    let currentDate = new Date(dateRange.from)
    
    while (currentDate <= endDate) {
      days.push(startOfDay(new Date(currentDate)))
      currentDate = addDays(currentDate, 1)
    }
    
    return days
  }, [dateRange])

  const chartData = useMemo(() => {
    return daysInRange.map((date) => {
      const focusSessions = pomodoroSessions.filter(
        (session) => session.completedAt && isSameDay(new Date(session.completedAt), date)
      ).length

      const completedGoals = goals.filter(
        (goal) => goal.completed && goal.createdAt && isSameDay(new Date(goal.createdAt), date)
      ).length

      return {
        date: format(date, "MMM d"),
        fullDate: format(date, "yyyy-MM-dd"),
        focus: focusSessions,
        goals: completedGoals,
      }
    })
  }, [daysInRange, pomodoroSessions, goals])

  const totalFocusSessions = chartData.reduce((sum, day) => sum + day.focus, 0)
  const totalCompletedGoals = chartData.reduce((sum, day) => sum + day.goals, 0)

  const formatDateRange = () => {
    if (!dateRange.from) return 'Select date range'
    if (!dateRange.to) return format(dateRange.from, 'MMM d, yyyy')
    return `${format(dateRange.from, 'MMM d, yyyy')} - ${format(dateRange.to, 'MMM d, yyyy')}`
  }

  return (
    <Card className="border border-border shadow-lg transition-theme md:col-span-2 lg:col-span-3">
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Activity Overview</CardTitle>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[300px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    if (range?.from) {
                      setDateRange({
                        from: range.from,
                        to: range.to || range.from,
                      })
                    } else {
                      // Handle the case when range is undefined
                      setDateRange({
                        from: today,
                        to: today
                      })
                    }
                  }}
                  numberOfMonths={2}
                  disabled={(date) => date > today}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-primary/30 text-primary border-primary/40 font-semibold">
              {totalFocusSessions} Focus Session{totalFocusSessions !== 1 ? 's' : ''}
            </Badge>
            <Badge variant="outline" className="bg-accent/30 text-accent-foreground border-accent/40 font-semibold">
              {totalCompletedGoals} Goal{totalCompletedGoals !== 1 ? 's' : ''} Completed
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
