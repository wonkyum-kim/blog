import { MouseEventHandler } from 'react'
import styles from './toggle.module.css'

interface ToggleProps {
  isOpen: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

export function Toggle({ onClick, isOpen }: ToggleProps) {
  return (
    <div onClick={onClick} className={styles['toggle-button']}>
      <svg width='23' height='23' viewBox='0 0 23 23' className={styles['toggle-svg']}>
        <path
          fill='transparent'
          strokeWidth='3'
          stroke='hsl(0, 0%, 18%)'
          strokeLinecap='round'
          d={!isOpen ? 'M 2 2.5 L 20 2.5' : 'M 3 16.5 L 17 2.5'}
        ></path>
        <path
          fill='transparent'
          strokeWidth='3'
          stroke='hsl(0, 0%, 18%)'
          strokeLinecap='round'
          d='M 2 9.423 L 20 9.423'
          opacity={!isOpen ? '1' : '0'}
        ></path>
        <path
          fill='transparent'
          strokeWidth='3'
          stroke='hsl(0, 0%, 18%)'
          strokeLinecap='round'
          d={!isOpen ? 'M 2 16.346 L 20 16.346' : 'M 3 2.5 L 17 16.346'}
        ></path>
      </svg>
    </div>
  )
}
