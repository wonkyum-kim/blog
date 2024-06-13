import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    outputFileTracingIncludes: {
      '/app/posts': ['./app/posts/**/*'],
    },
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism, rehypeSlug],
  },
})

export default withMDX(nextConfig)
