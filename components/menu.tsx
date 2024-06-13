'use client'

import { MouseEventHandler, useRef, useState } from 'react'
import { Toggle } from './toggle'
import styles from './menu.module.css'
import { MenuList } from './menu-list'

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    // 원을 클릭한 위치
    const x = event.clientX
    const y = event.clientY

    // 클릭한 위치부터 width와 height 중 먼 길이 + 200
    let left = document.documentElement.clientWidth
    if (left >= 1440) left = 300
    const endRadius =
      Math.hypot(Math.max(x, left - x), Math.max(y, document.documentElement.clientHeight - y)) +
      200

    setIsOpen((prev) => !prev)
    document.body.style.overflow = isOpen ? '' : 'hidden'

    const radius = isOpen ? '30px' : `${endRadius}px`
    const transitionDelay = isOpen ? '1s' : '0s'

    ref.current?.style.setProperty('--background-radius', radius)
    ref.current?.style.setProperty('--background-delay', transitionDelay)
  }

  return (
    <nav>
      <div className={styles['background']} ref={ref} />
      <MenuList isOpen={isOpen} />
      <Toggle onClick={handleClick} isOpen={isOpen} />
    </nav>
  )
}
