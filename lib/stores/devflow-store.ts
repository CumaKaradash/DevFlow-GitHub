import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Goal {
  id: string
  title: string
  category: "code" | "learn" | "exercise" | "other"
  completed: boolean
  createdAt: Date
}

export interface PomodoroSession {
  id: string
  type: "focus" | "short" | "long"
  duration: number
  completedAt: Date
}

export interface Snippet {
  id: string
  title: string
  code: string
  language: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface PomodoroSettings {
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  soundEnabled: boolean
  autoStartNext: boolean
}

interface DevFlowState {
  // GitHub
  githubUsername: string
  setGithubUsername: (username: string) => void

  // Goals
  goals: Goal[]
  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => void
  toggleGoal: (id: string) => void
  deleteGoal: (id: string) => void
  updateGoal: (id: string, updates: Partial<Goal>) => void

  // Pomodoro
  pomodoroSessions: PomodoroSession[]
  pomodoroSettings: PomodoroSettings
  addPomodoroSession: (session: Omit<PomodoroSession, "id" | "completedAt">) => void
  updatePomodoroSettings: (settings: Partial<PomodoroSettings>) => void

  // Snippets
  snippets: Snippet[]
  addSnippet: (snippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">) => void
  updateSnippet: (id: string, updates: Partial<Snippet>) => void
  deleteSnippet: (id: string) => void

  // Data management
  exportData: () => string
  importData: (data: string) => void
  resetData: () => void
}

const initialState = {
  githubUsername: "",
  goals: [],
  pomodoroSessions: [],
  pomodoroSettings: {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    soundEnabled: true,
    autoStartNext: false,
  },
  snippets: [],
}

export const useDevFlowStore = create<DevFlowState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setGithubUsername: (username) => set({ githubUsername: username }),

      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...goal,
              id: crypto.randomUUID(),
              createdAt: new Date(),
            },
          ],
        })),

      toggleGoal: (id) =>
        set((state) => ({
          goals: state.goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)),
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        })),

      updateGoal: (id, updates) =>
        set((state) => ({
          goals: state.goals.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)),
        })),

      addPomodoroSession: (session) =>
        set((state) => ({
          pomodoroSessions: [
            {
              ...session,
              id: crypto.randomUUID(),
              completedAt: new Date(),
            },
            ...state.pomodoroSessions,
          ].slice(0, 10),
        })),

      updatePomodoroSettings: (settings) =>
        set((state) => ({
          pomodoroSettings: { ...state.pomodoroSettings, ...settings },
        })),

      addSnippet: (snippet) =>
        set((state) => ({
          snippets: [
            ...state.snippets,
            {
              ...snippet,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),

      updateSnippet: (id, updates) =>
        set((state) => ({
          snippets: state.snippets.map((snippet) =>
            snippet.id === id ? { ...snippet, ...updates, updatedAt: new Date() } : snippet,
          ),
        })),

      deleteSnippet: (id) =>
        set((state) => ({
          snippets: state.snippets.filter((snippet) => snippet.id !== id),
        })),

      exportData: () => {
        const state = get()
        return JSON.stringify({
          githubUsername: state.githubUsername,
          goals: state.goals,
          pomodoroSessions: state.pomodoroSessions,
          pomodoroSettings: state.pomodoroSettings,
          snippets: state.snippets,
          exportedAt: new Date().toISOString(),
        })
      },

      importData: (data) => {
        try {
          const parsed = JSON.parse(data)
          set({
            githubUsername: parsed.githubUsername || "",
            goals: parsed.goals || [],
            pomodoroSessions: parsed.pomodoroSessions || [],
            pomodoroSettings: parsed.pomodoroSettings || initialState.pomodoroSettings,
            snippets: parsed.snippets || [],
          })
        } catch (error) {
          console.error("Failed to import data:", error)
        }
      },

      resetData: () => set(initialState),
    }),
    {
      name: "devflow-storage",
    },
  ),
)
