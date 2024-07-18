'use client'

import { useState } from 'react'
import './vta2.css'
import { viewTransition } from '@/lib/viewTransition'

export function Vta2() {
  const [state, setState] = useState(true)

  const handleClick = () => {
    viewTransition(() => {
      setState((prev) => !prev)
    })
  }
  return (
    <div className='container'>
      {state ? (
        <div className='box2 first-box2' onClick={handleClick} />
      ) : (
        <div className='box2 second-box2' onClick={handleClick} />
      )}
    </div>
  )
}
