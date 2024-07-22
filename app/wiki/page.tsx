'use client'

import styles from './page.module.css'
import { wiki } from '@/data'
import Link from 'next/link'
import { useWikiCarouselStore } from '@/store/wiki-carousel'

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

  const currIndex = useWikiCarouselStore((state) => state.currIndex)
  const inc = useWikiCarouselStore((state) => state.inc)
  const dec = useWikiCarouselStore((state) => state.dec)

  const yDeg = Math.floor(360 / subjects.length)
  const tan = Math.tan(((Math.PI / 180) * yDeg) / 2)

  return (
    <>
      <div className={styles['guide']}>좌우를 클릭하여 이동</div>
      <div className={styles['scene']}>
        <div className={styles['carousel']}>
          {subjects.map((sub, index) => {
            return (
              <div
                key={sub}
                className={styles['carousel__cell']}
                //@ts-ignore
                style={{ '--yDeg': `${yDeg * (index - currIndex)}deg`, '--tan': `${tan}` }}
              >
                {sub}
                <div className={styles['move_left']} onClick={dec} />
                <div className={styles['move_right']} onClick={inc} />
              </div>
            )
          })}
        </div>
      </div>

      {getLinks(
        subjects[(currIndex + subjects.length * 9999) % subjects.length] as keyof typeof wiki
      )}
    </>
  )
}
