import Link from "next/link"

const internalPattern = /^\/(docs\/|$)/

export function A({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a {...props}>{children}</a>
  }

  if (internalPattern.test(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      {...props}
    >
      {children}
    </a>
  )
}
