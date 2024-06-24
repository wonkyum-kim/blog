import styles from './page.module.css'
import { wiki } from '@/data'
import Link from 'next/link'

function replaceTitle(title: string) {
  return title.replace(/\s/g, '-').replace(/@/g, '').replace(/:/g, '')
}

export default function WikiPage() {
  return (
    <div className={styles.container}>
      <h2>CSS</h2>
      <div className={styles.items}>
        {wiki.css.map((item) => {
          const changed = replaceTitle(item)
          return (
            <Link href={`/wiki/${changed}`} key={changed} className={styles.item}>
              {item}
            </Link>
          )
        })}
      </div>
      <h2>Git</h2>
      <div className={styles.items}>
        {wiki.git.map((item) => {
          const changed = replaceTitle(item)
          return (
            <Link href={`/wiki/${changed}`} key={changed} className={styles.item}>
              {item}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
