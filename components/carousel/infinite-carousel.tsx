'use client'

import { PointerEventHandler, useRef } from 'react'
import styles from './carousel.module.css'

const colors = [
  '#1F618D',
  '#F1C40F',
  '#FF5733',
  '#DAF7A6',
  '#900C3F',
  '#C70039',
  '#581845',
  '#28B463',
  '#1F618D',
  '#F1C40F',
]

export function InfiniteCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const prevTranslate = useRef(-200)

  const pointerDownHandler: PointerEventHandler<HTMLDivElement> = (event) => {
    const initX = event.clientX
    let deltaX = 0

    const itemWidth = 200
    const itemCount = colors.length

    const pointerMoveHandler = (event: PointerEvent) => {
      if (!carouselRef.current) return

      deltaX = event.clientX - initX

      const tx = prevTranslate.current + deltaX
      carouselRef.current.style.setProperty('transition-duration', '0.1s')

      carouselRef.current.style.setProperty('transform', `translateX(${tx}px) translateZ(0px)`)
    }

    const pointerUpHandler = () => {
      if (!carouselRef.current) return

      const prev = prevTranslate.current
      const curr = prev + deltaX

      const index = Math.floor(Math.abs(curr) / itemWidth)
      const progress = Math.abs(curr) - index * itemWidth

      if (prev > curr) {
        // item 너비의 절반이 넘어갔는지 판단
        prevTranslate.current = -1 * itemWidth * (index + (progress > itemWidth / 2 ? 1 : 0))
      }

      if (prev < curr) {
        // item 너비의 절반이 넘어갔는지 판단
        prevTranslate.current = -1 * itemWidth * (index + (progress < itemWidth / 2 ? 0 : 1))
      }

      carouselRef.current.style.setProperty(
        'transform',
        `translateX(${prevTranslate.current}px) translateZ(${0}px)`
      )

      // first 아이템(뒤에서 1번째)에 놓여진 경우, first 아이템(앞에서 2번째 아이템)으로 이동한다.
      if (prevTranslate.current < -itemWidth * (itemCount - 2)) {
        carouselRef.current.style.setProperty('transition-duration', '0s')
        carouselRef.current.style.setProperty('transform', `translateX(-200px) translateZ(0px)`)
        prevTranslate.current = -200
      }

      // last 아이템(앞에서 1번째 아이템)에 놓여진 경우, last 아이템(뒤에서 2번째 아이템으로 이동한다.)
      if (prevTranslate.current > -200) {
        carouselRef.current.style.setProperty('transition-duration', '0s')
        carouselRef.current.style.setProperty(
          'transform',
          `translateX(${-itemWidth * (itemCount - 2)}px) translateZ(0px)`
        )
        prevTranslate.current = -itemWidth * (itemCount - 2)
      }

      document.removeEventListener('pointermove', pointerMoveHandler)
    }

    document.addEventListener('pointermove', pointerMoveHandler, { passive: true })
    document.addEventListener('pointerup', pointerUpHandler, { once: true })
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div
          ref={carouselRef}
          className={styles['infinite-carousel']}
          onPointerDown={pointerDownHandler}
        >
          {colors.map((color, i) => {
            return (
              <div
                key={color + i}
                style={{ backgroundColor: `${color}` }}
                className={styles.item}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
