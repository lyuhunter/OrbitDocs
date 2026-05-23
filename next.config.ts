import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // 静态导出: 注释上面一行，取消注释下面两行
  // output: "export",
  // trailingSlash: true,
};

export default nextConfig;
