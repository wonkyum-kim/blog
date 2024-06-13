'use client'

import styles from './menu-list.module.css'

const itemIds = [0, 1, 2, 3, 4]
const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF']

// 애니메이션이 서로 겹쳐야 자연스럽게 보인다.
export function MenuList({ isOpen }: { isOpen: boolean }) {
  return (
    <ul className={styles.ul} data-isopen={isOpen}>
      {itemIds.map((i) => {
        const inDelay = `${i * 0.1 + 0.5}s`
        const outDelay = `${(4 - i) * 0.1 + 0.5}s`
        return (
          <li
            key={i}
            className={[isOpen ? styles['animate-in'] : styles['animate-out'], styles.li].join(' ')}
            style={{ transitionDelay: isOpen ? inDelay : outDelay }}
          >
            <div
              className={styles['icon-placeholder']}
              style={{
                borderColor: colors[i],
              }}
            />
            <div
              className={styles['text-placeholder']}
              style={{
                borderColor: colors[i],
              }}
            />
          </li>
        )
      })}
    </ul>
  )
}
