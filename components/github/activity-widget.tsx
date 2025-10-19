"use client"

import { useState, useEffect } from "react"
import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { GitCommit, GitPullRequest, Star, GitFork, AlertCircle } from "lucide-react"
import useSWR from "swr"

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  contributions: number
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export function GitHubActivityWidget() {
  const { githubUsername } = useDevFlowStore()
  const [stats, setStats] = useState<GitHubStats | null>(null)

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR(githubUsername ? `https://api.github.com/users/${githubUsername}` : null, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  })

  const {
    data: reposData,
    error: reposError,
    isLoading: reposLoading,
  } = useSWR(githubUsername ? `https://api.github.com/users/${githubUsername}/repos?per_page=100` : null, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 300000,
  })

  useEffect(() => {
    if (userData && reposData) {
      const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
      const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0)

      setStats({
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars,
        totalForks,
        contributions: 0, // GitHub API doesn't provide this easily
      })
    }
  }, [userData, reposData])

  const isLoading = userLoading || reposLoading
  const error = userError || reposError

  if (!githubUsername) {
    return (
      <Card className="border border-border shadow-lg transition-theme">
        <CardHeader>
          <CardTitle>GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-2">No GitHub username set</p>
            <p className="text-xs text-muted-foreground">Add your username in settings to see your stats</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="border border-border shadow-lg transition-theme">
        <CardHeader>
          <CardTitle>GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Spinner className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border border-border shadow-lg transition-theme">
        <CardHeader>
          <CardTitle>GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-sm text-muted-foreground mb-2">Failed to load GitHub data</p>
            <p className="text-xs text-muted-foreground">Check your username or try again later</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border shadow-lg transition-theme">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>GitHub Activity</CardTitle>
          <Badge variant="outline">@{githubUsername}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary p-4 shadow-sm">
            <GitCommit className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{stats?.publicRepos || 0}</p>
            <p className="text-xs text-muted-foreground">Repositories</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary p-4 shadow-sm">
            <Star className="h-5 w-5 text-accent mb-2" />
            <p className="text-2xl font-bold">{stats?.totalStars || 0}</p>
            <p className="text-xs text-muted-foreground">Total Stars</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary p-4 shadow-sm">
            <GitFork className="h-5 w-5 text-secondary mb-2" />
            <p className="text-2xl font-bold">{stats?.totalForks || 0}</p>
            <p className="text-xs text-muted-foreground">Total Forks</p>
          </div>

          <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-secondary p-4 shadow-sm">
            <GitPullRequest className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold">{stats?.followers || 0}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
