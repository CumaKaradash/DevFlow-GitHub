"use client"

import type React from "react"

import { useState } from "react"
import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Code, BookOpen, Dumbbell, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categoryIcons = {
  code: Code,
  learn: BookOpen,
  exercise: Dumbbell,
  other: MoreHorizontal,
}

const categoryColors = {
  code: "bg-primary/30 text-primary border-primary/40",
  learn: "bg-accent/30 text-accent-foreground border-accent/40",
  exercise: "bg-chart-3/30 text-chart-3 border-chart-3/40",
  other: "bg-muted/50 text-foreground border-muted-foreground/40",
}

export function DailyGoals() {
  const { goals, addGoal, toggleGoal, deleteGoal } = useDevFlowStore()
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"code" | "learn" | "exercise" | "other">("code")
  const [isAdding, setIsAdding] = useState(false)

  const handleAddGoal = () => {
    if (newGoalTitle.trim()) {
      addGoal({
        title: newGoalTitle.trim(),
        category: selectedCategory,
        completed: false,
      })
      setNewGoalTitle("")
      setIsAdding(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddGoal()
    } else if (e.key === "Escape") {
      setIsAdding(false)
      setNewGoalTitle("")
    }
  }

  const todayGoals = goals.filter((goal) => {
    const goalDate = new Date(goal.createdAt)
    const today = new Date()
    return (
      goalDate.getDate() === today.getDate() &&
      goalDate.getMonth() === today.getMonth() &&
      goalDate.getFullYear() === today.getFullYear()
    )
  })

  const completedCount = todayGoals.filter((g) => g.completed).length
  const totalCount = todayGoals.length

  return (
    <Card className="border border-border shadow-lg transition-theme md:col-span-2 lg:col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Daily Goals</CardTitle>
          <Badge variant="outline" className="bg-primary/30 text-primary border-primary/40 font-semibold">
            {completedCount}/{totalCount}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {todayGoals.length === 0 && !isAdding && (
            <p className="text-center text-sm text-muted-foreground py-4">No goals yet. Add one to get started!</p>
          )}

          {todayGoals.map((goal) => {
            const Icon = categoryIcons[goal.category]
            return (
              <div
                key={goal.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 shadow-sm hover:shadow-md transition-all"
              >
                <Checkbox checked={goal.completed} onCheckedChange={() => toggleGoal(goal.id)} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${goal.completed ? "line-through text-muted-foreground" : ""}`}>
                    {goal.title}
                  </p>
                </div>
                <Badge variant="outline" className={`${categoryColors[goal.category]} shrink-0`}>
                  <Icon className="h-3 w-3 mr-1" />
                  {goal.category}
                </Badge>
                <Button variant="ghost" size="icon-sm" onClick={() => deleteGoal(goal.id)}>
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </div>
            )
          })}

          {isAdding && (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3 shadow-sm">
              <Input
                placeholder="Enter goal..."
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
                className="flex-1"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {categoryIcons[selectedCategory] &&
                      (() => {
                        const Icon = categoryIcons[selectedCategory]
                        return <Icon className="h-4 w-4" />
                      })()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedCategory("code")}>
                    <Code className="mr-2 h-4 w-4" />
                    Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory("learn")}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory("exercise")}>
                    <Dumbbell className="mr-2 h-4 w-4" />
                    Exercise
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCategory("other")}>
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    Other
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" onClick={handleAddGoal}>
                Add
              </Button>
            </div>
          )}
        </div>

        {!isAdding && (
          <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
