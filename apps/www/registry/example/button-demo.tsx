import { Button } from "@/registry/motokoui/button"
import { ArrowRight, Plus } from "lucide-react"

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add">
          <Plus />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button isDisabled>Disabled</Button>
        <Button>
          Continue
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
