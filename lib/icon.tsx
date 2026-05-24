"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBook,
  faCode,
  faPlug,
  faGear,
  faRocket,
} from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

const registry: Record<string, IconDefinition> = {
  "fa-book": faBook,
  "fa-code": faCode,
  "fa-plug": faPlug,
  "fa-gear": faGear,
  "fa-rocket": faRocket,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const def = registry[name]
  if (!def) return <span className={className}>{name}</span>
  return <FontAwesomeIcon icon={def} className={className} />
}
