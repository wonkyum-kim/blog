'use client'

import { useTOCEffect } from '@/hooks/useTOCEffect'
/*
 * Test
 * heading에 따라서 padding-left가 잘 들어갔는지
 * 클릭하면 잘 이동하는지
 */

import styles from './toc.module.css'
import Link from 'next/link'
import { useState } from 'react'

interface Heading {
  level: number
  heading: string
}

interface TOCProps {
  headings: Heading[]
}

export function TOC({ headings }: TOCProps) {
  const [selected, setSelected] = useState('')

  useTOCEffect(setSelected)

  if (headings.length === 0) return

  return (
    <aside className={styles.toc}>
      {headings.map((item) => {
        const { level, heading } = item
        return (
          <Link
            href={`#${heading.toLowerCase()}`}
            key={heading}
            onClick={() => setSelected(heading)}
            className={[
              level === 2 ? styles['second-level'] : styles['third-level'],
              selected === heading.toLowerCase() ? styles.selected : '',
              styles.link,
            ].join(' ')}
          >
            {heading}
          </Link>
        )
      })}
    </aside>
  )
}
