import { siteConfig } from "@/lib/config.server"

export function Footer() {
  const { footer } = siteConfig

  return (
    <footer className="border-t py-8 mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>{footer.copyright}</p>
        <div className="flex items-center gap-4">
          {footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          {footer.poweredBy && (
            <span>
              Powered by <span className="font-medium">{siteConfig.name}</span>
            </span>
          )}
        </div>
      </div>
    </footer>
  )
}
