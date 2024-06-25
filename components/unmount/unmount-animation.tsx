'use client'

import './unmount-animation.css'
import { useState } from 'react'
import { viewTransition } from '@/lib/viewTransition'

export function UnmountAnimation() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    viewTransition(() => {
      setIsOpen((prev) => !prev)
    })
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
