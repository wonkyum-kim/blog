import styles from './page.module.css'
import { wiki } from '@/data'
import Link from 'next/link'

function replaceTitle(title: string) {
  return title.replace(/\s/g, '-').replace(/@/g, '').replace(/:/g, '')
}

function getLinks(subject: keyof typeof wiki) {
  return (
    <div className={styles.items}>
      {wiki[subject].map((item) => {
        const changed = replaceTitle(item)
        return (
          <Link href={`/wiki/${changed}`} key={changed} className={styles.item}>
            {item}
          </Link>
        )
      })}
    </div>
  )
}

// TODO: 태그를 먼저 보여주도록 수정하기

export default function WikiPage() {
  return (
    <div className={styles.container}>
      <h2>CSS</h2>
      {getLinks('css')}
      <h2>Git</h2>
      {getLinks('git')}
      <h2>Browser</h2>
      {getLinks('browser')}
      <h2>TypeScript</h2>
      {getLinks('typescript')}
    </div>
  )
}
