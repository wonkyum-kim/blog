'use client'

import { useState, useRef } from 'react'
import styles from './code-selector.module.css'

interface CodeSelectorProps {
  codes: string[]
  desc: string
}

export function CodeSelector({ codes, desc }: CodeSelectorProps) {
  const [prev, setPrev] = useState(0)
  const siblings = useRef<NodeListOf<Element>>()

  const handleClick = (index: number) => {
    if (!siblings.current) {
      siblings.current = document.querySelectorAll(`nav[data-for=${desc}] ~ *`)
    }

    if (codes.length === 1) return

    const prevElment = siblings.current[prev] as HTMLPreElement
    const currElement = siblings.current[index] as HTMLPreElement

    prevElment.style.display = 'none'
    currElement.style.display = 'block'

    setPrev(index)
  }

  return (
    <nav className={styles.selector} data-for={desc}>
      {codes.map((code, i) => {
        return (
          <div
            key={code}
            onClick={() => handleClick(i)}
            className={[i === prev ? styles['selected-bar'] : '', styles.bar].join(' ')}
          >
            {code}
          </div>
        )
      })}
    </nav>
  )
}
