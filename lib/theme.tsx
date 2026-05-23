const STORAGE_KEY = "orbitdocs-theme"

function getSystemTheme() {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function getStoredTheme(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(STORAGE_KEY)
}

export function setStoredTheme(theme: "light" | "dark") {
  localStorage.setItem(STORAGE_KEY, theme)
}

export function resolveTheme(): "light" | "dark" {
  const stored = getStoredTheme()
  if (stored === "light" || stored === "dark") return stored
  return getSystemTheme()
}

export function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark")
}

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme:dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`,
      }}
    />
  )
}
