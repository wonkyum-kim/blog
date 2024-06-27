'use client'

import styles from './menu.module.css'
import { Toggle } from './toggle'
import { useState, useRef, KeyboardEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { viewTransition } from '@/lib/viewTransition'

const links = ['Home', 'Posts', 'Wiki', 'GitHub']
const urls = ['/', '/posts', '/wiki', 'https://github.com/wonkyum-kim']

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleOpen = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleMove = (slug: string) => {
    viewTransition(() => {
      router.push(slug)
    })
  }

  const changeMode = (action: string) => {
    if (action === 'change') {
      viewTransition(() => {
        setIsSearchOpen((prev) => !prev)
      })
    } else {
      // search
      if (!inputRef.current) return

      const query = encodeURIComponent(inputRef.current.value)
      if (query === '') return

      viewTransition(() => {
        router.push(`/posts?query=${query}`)
      })
    }
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'Enter') return
    changeMode('search')
  }

  return (
    <header
      className={styles.header}
      style={{ justifyContent: isSearchOpen ? 'flex-end' : 'space-between' }}
    >
      {!isSearchOpen && (
        <>
          <Toggle isOpen={isMenuOpen} onClick={handleOpen} />
          {links.map((link, i) => {
            const delay = isMenuOpen ? `${i * 0.2 + 0.5}s` : `${(4 - i) * 0.2 + 0.5}s`
            return (
              <div
                onClick={() => handleMove(urls[i] as string)}
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
        </>
      )}
      {isSearchOpen && (
        <>
          <svg
            onClick={() => changeMode('change')}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m12 19-7-7 7-7'></path>
            <path d='M19 12H5'></path>
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder='블로그 글 검색하기'
            onKeyDown={handleKeyDown}
          />
        </>
      )}
      <div
        className={styles['search-icon']}
        onClick={() => changeMode(!isSearchOpen ? 'change' : 'search')}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='11' cy='11' r='8'></circle>
          <path d='m21 21-4.3-4.3'></path>
        </svg>
      </div>
    </header>
  )
}
