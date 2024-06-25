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
    </nav>
  )
}
