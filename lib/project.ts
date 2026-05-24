export function resolveProject(
  slug: string[],
  projects: { id: string }[],
  defaultProject: string,
): { projectId: string; pageSlug: string[] } {
  if (slug.length > 0 && projects.some((p) => p.id === slug[0])) {
    return { projectId: slug[0], pageSlug: slug.slice(1) }
  }
  return { projectId: defaultProject, pageSlug: slug }
}


