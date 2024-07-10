'use client'

import styles from './page.module.css'
import { wiki } from '@/data'
import Link from 'next/link'
import { UIEventHandler, useRef, useState } from 'react'

function replaceTitle(title: string) {
  return title.replace(/[\s@:]/g, (match) => (match === ' ' ? '-' : ''))
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

export default function WikiPage() {
  const subjects = Object.keys(wiki)
  const [currIndex, setCurrIndex] = useState(0)
  const prevTop = useRef(0)

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    const scrollHeight = (event.target as HTMLDivElement).scrollHeight
    const scrollTop = (event.target as HTMLDivElement).scrollTop
    const oneCell = Math.floor(scrollHeight / subjects.length)

    let nextIndex = 0

    // down
    if (prevTop.current < scrollTop) nextIndex = Math.floor(scrollTop / oneCell)
    // up
    else nextIndex = Math.floor((scrollTop + oneCell * 0.5) / oneCell)

    prevTop.current = scrollTop

    if (currIndex === nextIndex) return

    setCurrIndex(nextIndex)
  }

  return (
    <>
      <div className={styles['guide']}>스크롤하여 둘러보기</div>
      <div className={styles['container']} onScroll={handleScroll}>
        {subjects.map((sub) => {
          return (
            <div key={sub} className={styles['subject']}>
              {sub}
            </div>
          )
        })}
      </div>
      {getLinks(subjects[currIndex] as keyof typeof wiki)}
    </>
  )
}
