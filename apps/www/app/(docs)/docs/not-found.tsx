import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function DocsNotFound() {
  return (
    <div className="flex min-h-[40vh] flex-col items-start justify-center gap-4">
      <h1 className="text-2xl font-semibold tracking-tight">Doc not found</h1>
      <p className="text-muted-foreground">
        This documentation page does not exist yet.
      </p>
      <Button asChild variant="outline">
        <Link href="/docs">Back to docs</Link>
      </Button>
    </div>
  )
}
