"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectKit,
  SelectTrigger,
  SelectValue,
} from "@/registry/motokoui/select"

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "dragonfruit", label: "Dragonfruit" },
]

export function SelectDemo() {
  const [fruit, setFruit] = React.useState("banana")

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <SelectKit
        options={fruitOptions}
        value={fruit}
        onValueChange={setFruit}
        placeholder="Pick a fruit"
      />

      <Select defaultValue="system" placeholder="Theme">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
