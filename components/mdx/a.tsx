import Link from "next/link"

const internalPattern = /^\/(docs\/?|$)/

const linkClass = "text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

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
      <Link href={href} className={linkClass} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
      {...props}
    >
      {children}
    </a>
  )
}
