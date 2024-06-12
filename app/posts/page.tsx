import Link from 'next/link'
import { getAllPostsMeta } from '@/lib/mdx'

export default async function Page() {
  const posts = await getAllPostsMeta()

  return <div>{posts[0].title}</div>
}
