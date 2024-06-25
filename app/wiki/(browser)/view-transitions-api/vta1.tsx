'use client'

import { useState } from 'react'
import './vta1.css'
import { viewTransition } from '@/lib/viewTransition'

export function Vta1() {
  const [state, setState] = useState(true)

  const handleClick = () => {
    viewTransition(() => {
      setState((prev) => !prev)
    })
  }
  return (
    <div className='container'>
      {state ? (
        <div className='box first-box' onClick={handleClick} />
      ) : (
        <div className='box second-box' onClick={handleClick} />
      )}
    </div>
  )
}
