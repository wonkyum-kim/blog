'use client'

import { frontmatter } from '@/data'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const slugs = Object.keys(frontmatter) as unknown as (keyof typeof frontmatter)[]

  const handleClick = (slug: string) => {
    // @ts-expect-error
    if (!document.startViewTransition) {
      router.push(slug)
      return
    }
    // @ts-expect-error
    document.startViewTransition(() => {
      router.push(slug)
    })
  }

  const handleTagClick = (tag: string) => {
    // TODO
    // 같은 tag만 보여준다.
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
    </ul>
  )
}
