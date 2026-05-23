import path from "path"
import process from "process"

export function getContentDir(projectId: string): string {
  return path.join(process.cwd(), "content", projectId)
}
