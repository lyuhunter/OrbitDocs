type AdmonitionType = "note" | "tip" | "warning" | "danger"

const config: Record<AdmonitionType, {
  icon: string
  label: string
  borderClass: string
  bgClass: string
}> = {
  note: {
    icon: "\u2139\uFE0F",
    label: "Note",
    borderClass: "border-l-primary",
    bgClass: "bg-muted/50",
  },
  tip: {
    icon: "\uD83D\uDCA1",
    label: "Tip",
    borderClass: "border-l-emerald-500",
    bgClass: "bg-emerald-50/50 dark:bg-emerald-950/20",
  },
  warning: {
    icon: "\u26A0\uFE0F",
    label: "Warning",
    borderClass: "border-l-amber-500",
    bgClass: "bg-amber-50/50 dark:bg-amber-950/20",
  },
  danger: {
    icon: "\u26D4",
    label: "Danger",
    borderClass: "border-l-red-500",
    bgClass: "bg-red-50/50 dark:bg-red-950/20",
  },
}

export function Admonition({
  type = "note",
  title,
  children,
}: {
  type?: AdmonitionType
  title?: string
  children: React.ReactNode
}) {
  const cfg = config[type]

  return (
    <div
      className={`my-6 rounded-lg border-l-4 ${cfg.borderClass} ${cfg.bgClass} p-4`}
    >
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <span>{cfg.icon}</span>
        <span>{title ?? cfg.label}</span>
      </p>
      <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
