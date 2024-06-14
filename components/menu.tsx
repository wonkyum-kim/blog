'use client'

import styles from './menu.module.css'
import { Toggle } from './toggle'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const links = ['Home', 'Posts', 'GitHub', 'temp2']
const urls = ['/', '/posts/rollup', '/posts/mdx', '/']

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleOpen = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleMove = (slug: string) => {
    // @ts-expect-error
    if (!document.startViewTransition) {
      router.push(slug)
      return
    }
    // @ts-expect-error
    document.startViewTransition(() => {
      router.push(slug)
      router.refresh()
    })
  }
  return (
    <header className={styles.header}>
      <Toggle isOpen={isMenuOpen} onClick={handleOpen} />
      {links.map((link, i) => {
        const delay = isMenuOpen ? `${i * 0.2 + 0.5}s` : `${(4 - i) * 0.2 + 0.5}s`
        return (
          <div
            onClick={() => handleMove(urls[i])}
            style={{ transitionDelay: delay }}
            className={[
              styles.link,
              isMenuOpen ? styles['animate-in'] : styles['animate-out'],
            ].join(' ')}
            key={link}
          >
            {link}
          </div>
        )
      })}
    </header>
  )
}
