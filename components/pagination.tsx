'use client'

import styles from './pagination.module.css'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PaginationProps {
  page: number
  lastPage: number
  tag: string | null
}

// TODO ? viewTransitions 적용하기 ?

export function Pagination({ page, lastPage, tag }: PaginationProps) {
  const leftPage = Math.floor((page - 1) / 5) * 5 + 1
  const rightPage = Math.min(leftPage + 4, lastPage)
  const pageLength = rightPage - leftPage + 1

  const [selectedPage, setSelectedPage] = useState(page)
  const pagesRef = useRef<number[]>([])
  const router = useRouter()

  if (pagesRef.current.length === 0) {
    pagesRef.current = new Array(pageLength).fill(0).map((_, i) => leftPage + i)
  }

  const handleClick = (page: number) => {
    setSelectedPage(page)
    router.push(`/posts?page=${selectedPage}&tag=${tag ?? ''}`)
  }

  const handlePreviousClick = () => {
    if (selectedPage === 1) return

    setSelectedPage((prev) => {
      if (pagesRef.current[0] > prev - 1) {
        const to = pagesRef.current[0] - 1
        const from = to - 4
        pagesRef.current = new Array(5).fill(from).map((p, i) => p + i)
      }
      return prev - 1
    })
    router.push(`/posts?page=${selectedPage - 1}&tag=${tag ?? ''}`)
  }

  const handleNextClick = () => {
    if (selectedPage === lastPage) return

    setSelectedPage((prev) => {
      if (pagesRef.current.slice(-1)[0] < prev + 1) {
        pagesRef.current = pagesRef.current.map((p) => p + 5).filter((p) => p <= lastPage)
      }
      return prev + 1
    })
    router.push(`/posts?page=${selectedPage + 1}&tag=${tag ?? ''}`)
  }

  const dummy = <div className={styles.page} data-dummy />

  return (
    <div className={styles.pagination}>
      {selectedPage !== 1 ? (
        <div className={styles.page} onClick={handlePreviousClick}>
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
            <path d='m15 18-6-6 6-6'></path>
          </svg>
        </div>
      ) : (
        dummy
      )}
      {pagesRef.current.map((p) => {
        return (
          <div
            onClick={() => handleClick(p)}
            className={styles.page}
            key={p}
            data-selected={p === selectedPage}
          >
            {p}
          </div>
        )
      })}
      {selectedPage !== lastPage ? (
        <div className={styles.page} onClick={handleNextClick}>
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
            <path d='m9 18 6-6-6-6'></path>
          </svg>
        </div>
      ) : (
        dummy
      )}
    </div>
  )
}
