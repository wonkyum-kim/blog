import { ReactNode } from 'react'
import style from './image-container.module.css'

export function ImageContainer({ children }: { children: ReactNode }) {
  return <div className={style['container']}>{children}</div>
}
