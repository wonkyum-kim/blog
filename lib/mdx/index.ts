import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getHeadingsBySlug(slug: string) {
  if (slug === 'posts') return []

  const filePath = path.join(rootDirectory, `${slug}`, `page.mdx`)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const regXHeader = /\n(?<flag>#{1,3})\s+(?<content>.+)/g
  const matches = Array.from(fileContent.matchAll(regXHeader))

  const headings = matches.map(({ groups }) => {
    const flag = groups?.flag
    const content = groups?.content
    return {
      level: flag?.length ?? -1,
      heading: content ?? '',
    }
  })

  return headings
}

// export function getFrontmatterBySlug(slug: string) {
//   if (slug === 'posts') return {}

//   const filePath = path.join(rootDirectory, `${slug}`, `page.mdx`)
//   const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
//   return matter(fileContent)
// }
