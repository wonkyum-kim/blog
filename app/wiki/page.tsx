import styles from './page.module.css'
import { wiki } from '@/data'
import Link from 'next/link'

export default function WikiPage() {
  return (
    <div className={styles.container}>
      <h2>CSS</h2>
      <div className={styles.items}>
        {wiki.css.map((item) => {
          const changed = item.replace(/\s/g, '-').replace(/@/g, '').replace(/:/g, '')
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
