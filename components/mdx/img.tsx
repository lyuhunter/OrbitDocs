const basePath = process.env.EXPORT === "true" && process.env.REPO_NAME
  ? `/${process.env.REPO_NAME}`
  : ""

export function Img(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, ...rest } = props
  const resolvedSrc = typeof src === "string" && src.startsWith("/") && !src.startsWith(basePath)
    ? `${basePath}${src}`
    : src
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={resolvedSrc} alt={alt ?? ""} {...rest} />
}
