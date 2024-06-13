import { frontmatter } from '@/data'
import styles from './title.module.css'

interface TitleProps {
  slug: string
}

export function Title({ slug }: TitleProps) {
  const { title, createdAt } = frontmatter[slug as keyof typeof frontmatter]
  return (
    <h1 className={styles.title}>
      {title}
      <div className={styles.date}>{createdAt}</div>
    </h1>
  )
}
