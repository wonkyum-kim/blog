import { getPostBySlug } from '@/lib/mdx'
import styles from './page.module.css'

export default async function Page({ params }: { params: { slug: string } }) {
  const { content } = await getPostBySlug(params.slug)
  return <main className={styles.main}>{content}</main>
}
