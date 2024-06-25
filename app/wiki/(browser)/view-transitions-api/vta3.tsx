'use client'

import { useState } from 'react'
import './vta3.css'
import { viewTransition } from '@/lib/viewTransition'

export function Vta3() {
  const [state, setState] = useState(true)

  const handleClick = () => {
    viewTransition(() => {
      setState((prev) => !prev)
    })
  }
  return (
    <div className='container'>
      {state ? (
        <div className='box3 first-box3' onClick={handleClick} />
      ) : (
        <div className='box3 second-box3' onClick={handleClick} />
      )}
    </div>
  )
}
