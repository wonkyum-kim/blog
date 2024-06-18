'use client'

import styles from './draggable.module.css'
import { PointerEventHandler, useRef } from 'react'

export function Draggable() {
  const prevTranslate = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const dragContainerRef = useRef<HTMLDivElement>(null)
  const dragItemRef = useRef<HTMLDivElement>(null)

  const inBound = (x: number, min: number, max: number) => {
    if (min > x) return min
    if (max < x) return max
    return x
  }

  const getBoundary = (paddingX: number, paddingY: number) => {
    if (!dragContainerRef.current || !dragItemRef.current) return [-1, -1, -1, -1]

    const { width: dragAreaWidth, height: dragAreaHeight } =
      dragContainerRef.current.getBoundingClientRect()

    const { width: dragItemWidth, height: dragItemHeight } =
      dragItemRef.current.getBoundingClientRect()

    const maxX = Math.floor(dragAreaWidth / 2 - dragItemWidth / 2 - paddingX)
    const minX = -maxX

    const maxY = Math.floor(dragAreaHeight / 2 - dragItemHeight / 2 - paddingY)
    const minY = -maxY
    return [minX, maxX, minY, maxY]
  }

  const pointerDownHandler: PointerEventHandler<HTMLDivElement> = (event) => {
    // 처음 클릭한 곳의 좌표
    const initX = event.clientX
    const initY = event.clientY
    let deltaX = 0
    let deltaY = 0

    // 중심(0,0)에서 얼마만큼 translate 할 수 있는지
    const [minX, maxX, minY, maxY] = getBoundary(10, 10)

    const pointerMoveHandler = (event: PointerEvent) => {
      if (!dragItemRef.current) return

      // 얼만큼 드래그 했는지 나타냄.
      deltaX = event.clientX - initX
      deltaY = event.clientY - initY

      const tx = inBound(prevTranslate.current.x + deltaX, minX, maxX)
      const ty = inBound(prevTranslate.current.y + deltaY, minY, maxY)

      dragItemRef.current.style.setProperty(
        'transform',
        `translateX(${tx}px) translateY(${ty}px) translateZ(${0}px)`
      )
    }
    const pointerUpHandler = () => {
      prevTranslate.current.x += deltaX
      prevTranslate.current.y += deltaY
      document.removeEventListener('pointermove', pointerMoveHandler)
    }

    document.addEventListener('pointermove', pointerMoveHandler, { passive: true })
    document.addEventListener('pointerup', pointerUpHandler, { once: true })
  }

  return (
    <div className={styles.container} ref={dragContainerRef}>
      <div className={styles.item} onPointerDown={pointerDownHandler} ref={dragItemRef} />
    </div>
  )
}
