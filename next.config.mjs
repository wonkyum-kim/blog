import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

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
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypePrism, rehypeSlug, rehypeKatex],
  },
})

export default withMDX(nextConfig)
