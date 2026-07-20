import fs from "node:fs/promises"
import path from "node:path"

export const demoSources = {
  "button-demo": "registry/example/button-demo.tsx",
  "rainbow-button-demo": "registry/example/rainbow-button-demo.tsx",
  "input-demo": "registry/example/input-demo.tsx",
  "select-demo": "registry/example/select-demo.tsx",
  "tabs-demo": "registry/example/tabs-demo.tsx",
} as const

export type DemoName = keyof typeof demoSources

export async function readDemoCode(name: DemoName) {
  const sourcePath = demoSources[name]
  return fs.readFile(path.join(process.cwd(), sourcePath), "utf-8")
}
