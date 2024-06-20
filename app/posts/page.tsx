'use client'

import { frontmatter } from '@/data'
import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from '@/components/pagination'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const tag = searchParams.get('tag')
  const page = parseInt(searchParams.get('page') ?? '1')
  const query = searchParams.get('query')

  let slugs = Object.keys(frontmatter) as unknown as (keyof typeof frontmatter)[]

  if (tag) {
    slugs = slugs.filter((slug) => {
      const { tags } = frontmatter[slug]
      return tags.includes(tag)
    })
  }
  if (query) {
    const decoded = decodeURIComponent(query).toLowerCase()
    slugs = slugs.filter((slug) => {
      const { title } = frontmatter[slug]
      return title.toLowerCase().includes(decoded)
    })
  }

  if (slugs.length === 0) {
    return <h1>검색 결과가 없습니다!</h1>
  }

  const lastPage = Math.floor(slugs.length / 5 + (slugs.length % 5 === 0 ? 0 : 1))

  slugs = slugs.slice((page - 1) * 5, (page - 1) * 5 + 5)

  const tryTransition = (url: string) => {
    // @ts-expect-error
    if (!document.startViewTransition) {
      router.push(url)
      return
    }
    // @ts-expect-error
    document.startViewTransition(() => {
      router.push(url)
    })
  }

  const handleClick = (slug: string) => {
    tryTransition(slug)
  }

  const handleTagClick = (tag: string) => {
    tryTransition(`/posts?tag=${tag}`)
  }

  return (
    <ul className={styles.container}>
      {slugs.map((slug) => {
        const { createdAt, tags, title } = frontmatter[slug]

        return (
          <li className={styles.list} key={slug}>
            <time dateTime={createdAt} className={styles.date}>
              {createdAt}
            </time>
            <div className={styles['title-container']}>
              <div onClick={() => handleClick(`/posts/${slug}`)} className={styles.title}>
                {title}
              </div>
              <div className={styles.tags}>
                {tags.map((tag) => {
                  return (
                    <div
                      className={styles.tag}
                      key={tag + title}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </div>
                  )
                })}
              </div>
            </div>
          </li>
        )
      })}
      <Pagination page={page} lastPage={lastPage} tag={tag} query={query} key={query} />
    </ul>
  )
}
