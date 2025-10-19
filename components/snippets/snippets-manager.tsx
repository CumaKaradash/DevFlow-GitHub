"use client"

import { useState } from "react"
import { useDevFlowStore } from "@/lib/stores/devflow-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Code2, Copy, Trash2, Edit, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const languages = ["javascript", "typescript", "python", "java", "go", "rust", "html", "css", "sql", "bash", "other"]

export function SnippetsManager() {
  const { snippets, addSnippet, updateSnippet, deleteSnippet } = useDevFlowStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    language: "javascript",
    tags: "",
  })

  const handleOpenDialog = (snippetId?: string) => {
    if (snippetId) {
      const snippet = snippets.find((s) => s.id === snippetId)
      if (snippet) {
        setFormData({
          title: snippet.title,
          code: snippet.code,
          language: snippet.language,
          tags: snippet.tags.join(", "),
        })
        setEditingId(snippetId)
      }
    } else {
      setFormData({
        title: "",
        code: "",
        language: "javascript",
        tags: "",
      })
      setEditingId(null)
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingId(null)
    setFormData({
      title: "",
      code: "",
      language: "javascript",
      tags: "",
    })
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.code.trim()) return

    const tags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t)

    if (editingId) {
      updateSnippet(editingId, {
        title: formData.title.trim(),
        code: formData.code.trim(),
        language: formData.language,
        tags,
      })
    } else {
      addSnippet({
        title: formData.title.trim(),
        code: formData.code.trim(),
        language: formData.language,
        tags,
      })
    }

    handleCloseDialog()
  }

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <>
      <Card className="border border-border shadow-lg transition-theme md:col-span-2 lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Code Snippets</CardTitle>
            <Button size="sm" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Snippet
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {snippets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Code2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">No snippets yet</p>
              <p className="text-xs text-muted-foreground">Save your favorite code snippets for quick access</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="flex flex-col rounded-lg border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/50 transition-all overflow-hidden"
                >
                  <div className="flex items-start justify-between p-4 pb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">{snippet.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {snippet.language}
                      </Badge>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleCopy(snippet.code, snippet.id)}
                        className="shrink-0"
                      >
                        {copiedId === snippet.id ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleOpenDialog(snippet.id)}
                        className="shrink-0"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => deleteSnippet(snippet.id)}
                        className="shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <pre className="text-xs bg-muted/50 rounded p-3 overflow-x-auto max-h-32">
                      <code>{snippet.code}</code>
                    </pre>
                    {snippet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {snippet.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl bg-card border border-border shadow-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Snippet" : "Add New Snippet"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update your code snippet" : "Save a new code snippet for quick access"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., React useEffect hook"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                placeholder="Paste your code here..."
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="font-mono text-sm min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="e.g., react, hooks, useEffect"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.title.trim() || !formData.code.trim()}>
              {editingId ? "Update" : "Save"} Snippet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
