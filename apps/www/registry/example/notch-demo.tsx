"use client"

import { Notch, type NotchItem } from "@/registry/motokoui/notch"
import {
  Eraser,
  MousePointer2,
  PaintBucket,
  Pencil,
  Sparkles,
  Type,
} from "lucide-react"

const items: NotchItem[] = [
  {
    id: "tool",
    label: "Tool",
    icon: <MousePointer2 />,
    defaultValue: "select",
    options: [
      { id: "select", label: "Select", icon: <MousePointer2 /> },
      { id: "draw", label: "Draw", icon: <Pencil /> },
      { id: "erase", label: "Erase", icon: <Eraser /> },
      { id: "fill", label: "Fill", icon: <PaintBucket /> },
    ],
  },
  {
    id: "mode",
    label: "Mode",
    icon: <Sparkles />,
    defaultValue: "design",
    options: [
      { id: "design", label: "Design" },
      { id: "prototype", label: "Prototype" },
      { id: "dev", label: "Dev Mode" },
    ],
  },
  {
    id: "type",
    label: "Type",
    icon: <Type />,
    defaultValue: "sans",
    options: [
      { id: "sans", label: "Sans" },
      { id: "serif", label: "Serif" },
      { id: "mono", label: "Mono" },
    ],
  },
]

export function NotchDemo() {
  return (
    <div className="relative flex min-h-[320px] w-full items-end justify-center pb-2">
      <Notch position="inline" items={items} reveal={false} />
    </div>
  )
}
