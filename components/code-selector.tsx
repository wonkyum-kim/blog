'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './code-selector.module.css'
import { viewTransition } from '@/lib/viewTransition'

interface CodeSelectorProps {
  names: string[]
  desc: string
}

export function CodeSelector({ names, desc }: CodeSelectorProps) {
  const [curr, setCurr] = useState(0)
  const [copySuccess, setCopySuccess] = useState(false)
  const siblings = useRef<NodeListOf<Element>>()

  const setNameAttribute = () => {
    if (!siblings.current) {
      siblings.current = document.querySelectorAll(`nav[data-for=${desc}] ~ *`)
    }

    for (let i = 0; i < names.length; ++i) {
      const pre = siblings.current[i]
      const code = pre.firstChild as HTMLElement
      code?.setAttribute('name', `${desc + i.toString()}`)
    }
  }

  useEffect(setNameAttribute, [desc, names])

  const handleClick = (index: number) => {
    if (names.length === 1 || !siblings.current) return

    const prevElment = siblings.current[curr] as HTMLPreElement
    const currElement = siblings.current[index] as HTMLPreElement

    prevElment.style.display = 'none'
    currElement.style.display = 'block'

    viewTransition(() => {
      setCurr(index)
    })
  }

  const handleCopy = () => {
    if (!siblings.current) return
    setCopySuccess(true)
    const currentElement = siblings.current[curr] as HTMLPreElement
    navigator.clipboard.writeText(currentElement.textContent ?? ' ')
    setTimeout(() => {
      setCopySuccess(false)
    }, 1500)
  }

  return (
    <nav className={styles.selector} data-for={desc}>
      {names.map((code, i) => {
        return (
          <div
            key={code}
            onClick={() => handleClick(i)}
            className={styles.bar}
            data-active={i === curr}
            // @ts-ignore
            style={{ '--vtName': `${desc}` }}
          >
            {code}
          </div>
        )
      })}
      {!copySuccess ? (
        <svg
          height='16'
          viewBox='0 0 16 16'
          version='1.1'
          width='16'
          fill='#fff'
          className={styles['copy-button']}
          onClick={handleCopy}
        >
          <path d='M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z'></path>
          <path d='M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z'></path>
        </svg>
      ) : (
        <svg
          height='16'
          viewBox='0 0 16 16'
          version='1.1'
          width='16'
          className={styles['copy-button']}
          fill='rgb(74 222 128)'
        >
          <path d='M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z'></path>
        </svg>
      )}
    </nav>
  )
}
