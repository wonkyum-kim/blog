'use client'

import { SetStateAction, useEffect } from 'react'

export function useTOCEffect(setSelected: (value: SetStateAction<string>) => void) {
  useEffect(() => {
    let direction: 'down' | 'up' | '' = ''
    let prevYposition = 0

    const scrollDirection = (prevY: number) => {
      if (window.scrollY === 0 && prevY === 0) return
      else if (window.scrollY > prevY) direction = 'down'
      else direction = 'up'
      prevYposition = window.scrollY
    }

    const options: IntersectionObserverInit = { rootMargin: '0px' }
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        scrollDirection(prevYposition)
        if (
          (direction === 'down' && !entry.isIntersecting) ||
          (direction === 'up' && entry.isIntersecting)
        ) {
          setSelected(entry.target.id)
        }
      })
    }
    const observer = new IntersectionObserver(callback, options)
    const headingsElement = Array.from(document.querySelectorAll('h2, h3'))

    headingsElement.forEach((header) => {
      observer.observe(header)
    })
    return () => observer.disconnect()
  }, [setSelected])
}
