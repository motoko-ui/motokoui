import { Input } from "@/registry/motokoui/input"
import { Mail } from "lucide-react"

export function InputDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input label="Email" placeholder="helpme@motokoui.com" icon={<Mail />} />
    </div>
  )
}
