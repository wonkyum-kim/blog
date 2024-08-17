'use client'

import styles from './menu.module.css'

import { useState, RefObject } from 'react'
import { useRouter } from 'next/navigation'
import { viewTransition } from '@/lib/viewTransition'
import { wiki } from '@/data'
import { useClickAway } from '@uidotdev/usehooks'

const links = ['Home', 'Posts', 'Wiki', 'GitHub']
const urls = ['/', '/posts', '/wiki', 'https://github.com/wonkyum-kim']

export function Menu() {
  const ref = useClickAway(() => {
    setSelected(null)
    ref.current!.style.setProperty('background-color', 'transparent')
  }) as RefObject<HTMLDivElement>
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <header className={styles['container']}>
      <div className={styles['menu']} ref={ref}>
        <div className={styles.list}>
          {links.map((link, i) => {
            return (
              <li
                key={link}
                data-link={link}
                style={{ color: selected === link ? 'red' : 'black' }}
                onClick={() => {
                  if (link === 'Wiki') {
                    setSelected(link)
                    return
                  }
                  viewTransition(() => router.push(urls[i] as string))
                }}
                onMouseOver={() => {
                  setSelected(link)
                  if (!ref.current) return

                  ref.current.style.setProperty(
                    'background-color',
                    link === 'Wiki' ? 'white' : 'transparent'
                  )
                }}
              >
                {link}
              </li>
            )
          })}
        </div>

        <div
          className={styles['subject']}
          style={{ display: selected === 'Wiki' ? 'grid' : 'none' }}
        >
          {Object.keys(wiki).map((item) => {
            return (
              <div
                key={item}
                className={styles['item']}
                onClick={() => {
                  viewTransition(() => {
                    setSelected(null)
                    ref.current!.style.setProperty('background-color', 'transparent')
                    router.push(`/wiki/${item}`)
                  })
                }}
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </header>
  )
}
