interface ProjectData {
  name: string,
  description: string,
  image?: string,
  tags: string[],
  links: {
    source?: string,
    production?: string,
    blog?: string,
  }
}