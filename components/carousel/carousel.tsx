'use client'

import { PointerEventHandler, useRef } from 'react'
import styles from './carousel.module.css'

const colors = [
  '#F1C40F',
  '#FF5733',
  '#DAF7A6',
  '#900C3F',
  '#C70039',
  '#581845',
  '#28B463',
  '#1F618D',
]

export function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const prevTranslate = useRef(0)

  const pointerDownHandler: PointerEventHandler<HTMLDivElement> = (event) => {
    const initX = event.clientX
    let deltaX = 0

    const pointerMoveHandler = (event: PointerEvent) => {
      if (!carouselRef.current) return

      deltaX = event.clientX - initX

      const tx = prevTranslate.current + deltaX

      carouselRef.current.style.setProperty('transform', `translateX(${tx}px) translateZ(0px)`)
    }

    const pointerUpHandler = () => {
      if (!carouselRef.current) return

      const prev = prevTranslate.current
      const curr = prev + deltaX
      const itemWidth = 200
      const itemCount = colors.length
      const index = Math.floor(Math.abs(curr) / itemWidth)
      const progress = Math.abs(curr) - index * itemWidth

      // 왼쪽 방향으로 넘길 때
      if (prev > curr) {
        // item 너비의 절반이 넘어갔는지 판단
        prevTranslate.current = -1 * itemWidth * (index + (progress > itemWidth / 2 ? 1 : 0))
        // 마지막 item을 넘어갈 수는 없다.
        prevTranslate.current = Math.max(prevTranslate.current, itemWidth * -(itemCount - 1))
      }

      // 오른쪽 방향으로 넘길 때
      if (prev < curr) {
        // item 너비의 절반이 넘어갔는지 판단
        prevTranslate.current = -1 * itemWidth * (index + (progress < itemWidth / 2 ? 0 : 1))
        // 첫 번째 item을 넘어갈 수는 없다.
        if (curr > 0) prevTranslate.current = 0
      }

      carouselRef.current.style.setProperty(
        'transform',
        `translateX(${prevTranslate.current}px) translateZ(${0}px)`
      )

      document.removeEventListener('pointermove', pointerMoveHandler)
    }

    document.addEventListener('pointermove', pointerMoveHandler, { passive: true })
    document.addEventListener('pointerup', pointerUpHandler, { once: true })
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div ref={carouselRef} className={styles.carousel} onPointerDown={pointerDownHandler}>
          {colors.map((color) => {
            return (
              <div key={color} style={{ backgroundColor: `${color}` }} className={styles.item} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 무한 캐루셀은 트릭이 간단한게 애니메이션 끄고 다시 처음으로 돌아가면 된다.
