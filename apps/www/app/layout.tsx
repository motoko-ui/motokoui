import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"

import { fontVariables } from "@/lib/fonts"
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

export const metadata: Metadata = constructMetadata({
  title: "Motoko UI",
  description:
    "Everything you need to build modern React applications. Components, docs, and patterns.",
  image: absoluteUrl("/og"),
})

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="layout-fixed">
      <body
        className={cn(
          "bg-background text-foreground group/body flex min-h-svh flex-col overscroll-none font-sans antialiased [--footer-height:4rem] [--header-height:3.5rem]",
          fontVariables
        )}
      >
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
