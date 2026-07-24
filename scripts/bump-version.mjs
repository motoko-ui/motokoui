#!/usr/bin/env node
/**
 * Bump or read the monorepo version across package.json files.
 *
 * Usage:
 *   node scripts/bump-version.mjs patch|minor|major|current
 *
 * Prints: VERSION=<semver>
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const files = ["package.json", "apps/www/package.json"]

const bump = process.argv[2]
if (!["patch", "minor", "major", "current"].includes(bump)) {
  console.error("Usage: node scripts/bump-version.mjs patch|minor|major|current")
  process.exit(1)
}

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version)
  if (!match) {
    throw new Error(`Unsupported version: ${version}`)
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  }
}

function formatVersion({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`
}

function nextVersion(version, type) {
  const parsed = parseVersion(version)
  if (type === "current") return version
  if (type === "major") return formatVersion({ major: parsed.major + 1, minor: 0, patch: 0 })
  if (type === "minor") return formatVersion({ major: parsed.major, minor: parsed.minor + 1, patch: 0 })
  return formatVersion({ major: parsed.major, minor: parsed.minor, patch: parsed.patch + 1 })
}

const rootPkgPath = join(root, "package.json")
const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf8"))
const version = nextVersion(rootPkg.version, bump)

for (const relative of files) {
  const path = join(root, relative)
  const pkg = JSON.parse(readFileSync(path, "utf8"))
  pkg.version = version
  writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`)
}

process.stdout.write(`VERSION=${version}\n`)
