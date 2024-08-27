'use client'

import styles from './menu.module.css'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { viewTransition } from '@/lib/viewTransition'
import { wiki } from '@/data'

const links = ['Home', 'Posts', 'Wiki', 'GitHub']
const urls = ['/', '/posts', '/wiki', 'https://github.com/wonkyum-kim']

export function Menu() {
  const [currMenu, setCurrMenu] = useState<null | string>(null)
  const router = useRouter()

  const handleClickLink = (i: number) => {
    viewTransition(() => {
      setCurrMenu(links[i] as string)
      if (links[i] === 'Wiki') return
      router.push(urls[i] as string)
    })
  }

  const handleHoverLink = (i: number) => {
    setCurrMenu(links[i] as string)
  }

  const handleClickWiki = (item: string) => {
    viewTransition(() => {
      router.push(`/wiki/${item}`)
      setCurrMenu(null)
    })
  }

  const handleLeaveWiki = () => {
    setCurrMenu(null)
  }

  return (
    <div className={styles['container']}>
      {links.map((link, i) => (
        <li
          key={link}
          className={styles['list']}
          data-curr={currMenu === link}
          onClick={() => handleClickLink(i)}
          onMouseOver={() => handleHoverLink(i)}
        >
          {link}
        </li>
      ))}

      <div
        className={[styles['wiki'], currMenu !== 'Wiki' ? styles['wiki-delete'] : ''].join(' ')}
        onMouseLeave={handleLeaveWiki}
      >
        {Object.keys(wiki).map((item) => (
          <div key={item} className={styles['wiki-item']} onClick={() => handleClickWiki(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
