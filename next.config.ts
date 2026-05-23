import type { NextConfig } from "next";

const isExport = process.env.EXPORT === "true"

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  ...(isExport && { trailingSlash: true }),
  ...(isExport && process.env.REPO_NAME && {
    basePath: `/${process.env.REPO_NAME}`,
    assetPrefix: `/${process.env.REPO_NAME}`,
  }),
};

export default nextConfig;
