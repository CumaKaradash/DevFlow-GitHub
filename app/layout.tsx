import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "DevFlow - Developer Productivity Dashboard",
  description:
    "Boost your productivity with DevFlow - a comprehensive dashboard featuring Pomodoro timer, GitHub activity tracking, daily goals, code snippets manager, and activity analytics. Perfect for developers who want to stay focused and organized.",
  keywords: [
    "developer productivity",
    "pomodoro timer",
    "github stats",
    "code snippets",
    "daily goals",
    "productivity dashboard",
    "developer tools",
    "time management",
  ],
  // Primary author: CumaKaradash (19 Oct 2025)
  authors: [{ name: "CumaKaradash" }],
  creator: "DevFlow",
  publisher: "DevFlow",
  // generator metadata removed
  applicationName: "DevFlow",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://devflow.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devflow.vercel.app",
    title: "DevFlow - Developer Productivity Dashboard",
    description:
      "Boost your productivity with DevFlow - featuring Pomodoro timer, GitHub activity tracking, daily goals, code snippets manager, and activity analytics.",
    siteName: "DevFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevFlow - Developer Productivity Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevFlow - Developer Productivity Dashboard",
    description:
      "Boost your productivity with DevFlow - featuring Pomodoro timer, GitHub activity tracking, daily goals, and more.",
    images: ["/og-image.png"],
    creator: "@devflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.jpg", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.jpg", sizes: "32x32", type: "image/png" },
        { url: "/logo.jpg", type: "image/jpeg" },
      ],
      apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180", type: "image/png" }],
    },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
