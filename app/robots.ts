import { MetadataRoute } from "next"
import { getSiteConfig } from "@/lib/config.server"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${getSiteConfig().url}/sitemap.xml`,
  }
}
