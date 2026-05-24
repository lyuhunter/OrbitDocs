"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

const cache = new Map<string, IconDefinition>()

function resolveIcon(name: string): IconDefinition | undefined {
  if (cache.has(name)) return cache.get(name)
  const key = name
    .replace(/^fa-/, "")
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  const iconKey = `fa${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof typeof fas
  const def = fas[iconKey] as IconDefinition | undefined
  if (def) cache.set(name, def)
  return def
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const def = resolveIcon(name)
  if (!def) return <span className={className}>{name}</span>
  return <FontAwesomeIcon icon={def} className={className} />
}
