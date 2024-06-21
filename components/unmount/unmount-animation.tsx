'use client'

import './unmount-animation.css'
import { useState } from 'react'
import { flushSync } from 'react-dom'

export function UnmountAnimation() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    // @ts-expect-error
    if (!document.startViewTransition) {
      setIsOpen((prev) => !prev)
    } else {
      // @ts-expect-error
      document.startViewTransition(() => {
        flushSync(() => {
          setIsOpen((prev) => !prev)
        })
      })
    }
  }
  return (
    <div className='container'>
      <button className='button' onClick={handleClick}>
        {isOpen ? 'close' : 'open'}
      </button>
      {isOpen && <div className='box' />}
    </div>
  )
}
