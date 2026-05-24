import { Pre } from "./pre"
import { A } from "./a"
import { Admonition } from "./admonition"
import { Img } from "./img"

export function getMDXComponents(): Record<string, React.ComponentType<unknown>> {
  return {
    pre: Pre as unknown as React.ComponentType<unknown>,
    a: A as unknown as React.ComponentType<unknown>,
    img: Img as unknown as React.ComponentType<unknown>,
    Admonition: Admonition as unknown as React.ComponentType<unknown>,
  }
}
