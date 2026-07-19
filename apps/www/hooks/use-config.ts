import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun"

type Config = {
  packageManager: PackageManager
}

const configAtom = atomWithStorage<Config>("motokoui-config", {
  packageManager: "pnpm",
})

export function useConfig() {
  return useAtom(configAtom)
}
