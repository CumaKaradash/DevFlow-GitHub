import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { PomodoroTimer } from "@/components/pomodoro/timer"
import { DailyGoals } from "@/components/goals/daily-goals"
import { GitHubActivityWidget } from "@/components/github/activity-widget"

const SnippetsManager = dynamic(
  () => import("@/components/snippets/snippets-manager").then((mod) => ({ default: mod.SnippetsManager })),
  {
    loading: () => (
      <div className="bg-card border border-border shadow-lg rounded-xl p-6">
        <div className="animate-pulse h-96 bg-muted rounded" />
      </div>
    ),
  },
)

const ActivityChart = dynamic(
  () => import("@/components/activity/activity-chart").then((mod) => ({ default: mod.ActivityChart })),
  {
    loading: () => (
      <div className="bg-card border border-border shadow-lg rounded-xl p-6">
        <div className="animate-pulse h-64 bg-muted rounded" />
      </div>
    ),
  },
)

export default function Home() {
  return (
    <div className="min-h-screen transition-theme">
      <Header />
      <main className="container px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GitHubActivityWidget />
          <PomodoroTimer />
          <DailyGoals />
        </div>
        <div className="mt-6 grid gap-6">
          <ActivityChart />
          <SnippetsManager />
        </div>
      </main>
    </div>
  )
}
