import styles from './infinite-scroll.module.css'

export function InfiniteScroll() {
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
  return (
    <>
      <div className={styles.wrapper}>
        {colors.map((color, i) => {
          return (
            <div
              key={i}
              // @ts-expect-error
              style={{ '--n': `${i + 1}`, backgroundColor: `${color}` }}
              className={styles.scrollLeft}
            ></div>
          )
        })}
        {colors.map((color, i) => {
          return (
            <div
              key={-i}
              // @ts-expect-error
              style={{ '--n': `${i + 1}`, backgroundColor: `${color}` }}
              className={styles.scrollRight}
            ></div>
          )
        })}
      </div>
    </>
  )
}
