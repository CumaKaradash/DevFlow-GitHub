"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">{error.message || "An unexpected error occurred"}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
