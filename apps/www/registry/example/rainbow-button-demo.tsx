import { RainbowButton } from "@/registry/motokoui/rainbow-button"
import { ArrowRight, Plus } from "lucide-react"

export function RainbowButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <RainbowButton size="sm">Small</RainbowButton>
        <RainbowButton size="default">Default</RainbowButton>
        <RainbowButton size="lg">Large</RainbowButton>
        <RainbowButton size="icon" aria-label="Add">
          <Plus />
        </RainbowButton>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <RainbowButton isDisabled>Disabled</RainbowButton>
        <RainbowButton>
          Continue
          <ArrowRight />
        </RainbowButton>
      </div>
    </div>
  )
}
