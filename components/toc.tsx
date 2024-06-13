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

        // . / @ 문자는 삭제하고, 공백은 -로 대체한다.
        const changed = heading
          .replace(/[.\/@]/g, '')
          .replace(/ /g, '-')
          .toLowerCase()

        console.log(changed)
        return (
          <Link
            href={`#${changed}`}
            key={heading}
            onClick={() => setSelected(changed)}
            className={[
              level === 2 ? styles['second-level'] : styles['third-level'],
              selected === changed ? styles.selected : '',
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
