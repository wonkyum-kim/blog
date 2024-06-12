import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

export interface Meta {
  title?: string
  createdAt?: string
  tags?: string[]
  slug: string
}

const rootDirectory = path.join(process.cwd(), 'contents')

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')

  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
      },
    },
  })

  const meta: Meta = { ...frontmatter, slug: realSlug }

  return { meta, content }
}

export async function getAllPostsMeta() {
  const files = fs.readdirSync(rootDirectory)

  const posts = []

  for (const file of files) {
    const { meta } = await getPostBySlug(file)
    posts.push(meta)
  }

  return posts
}
