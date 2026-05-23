import { Pre } from "./pre"
import { A } from "./a"

export function useMDXComponents(): Record<string, React.ComponentType<unknown>> {
  return {
    pre: Pre as unknown as React.ComponentType<unknown>,
    a: A as unknown as React.ComponentType<unknown>,
  }
}
