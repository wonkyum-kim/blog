'use client'

import styles from './toggle.module.css'
import { RefObject, useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'

export function Toggle() {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useClickAway(() => {
    setIsOpen(false)
    document.body.style.setProperty('transform', 'translateX(0px)')
  }) as RefObject<HTMLDivElement>

  const handleClick = () => {
    setIsOpen((prev) => !prev)
    if (!isOpen) document.body.style.setProperty('transform', 'translateX(-500px)')
    else document.body.style.setProperty('transform', 'translateX(0px)')
  }

  return (
    <>
      <div
        className={styles['toggle-button']}
        onClick={handleClick}
        style={{ backgroundColor: isOpen ? 'black' : 'var(--orange-500)' }}
      >
        <svg width='23' height='23' viewBox='0 0 23 23'>
          <path
            strokeWidth='3'
            stroke='white'
            strokeLinecap='round'
            d={!isOpen ? 'M 2 2.5 L 20 2.5' : 'M 3 16.5 L 17 2.5'}
          ></path>
          <path
            strokeWidth='3'
            stroke='white'
            strokeLinecap='round'
            d='M 2 9.423 L 20 9.423'
            opacity={!isOpen ? '1' : '0'}
          ></path>
          <path
            strokeWidth='3'
            stroke='white'
            strokeLinecap='round'
            d={!isOpen ? 'M 2 16.346 L 20 16.346' : 'M 3 2.5 L 17 16.346'}
          ></path>
        </svg>
      </div>
      <div className={styles['side-menu']} ref={ref}></div>
    </>
  )
}
