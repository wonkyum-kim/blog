import styles from './layout.module.css'
import { Suspense } from 'react'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.main}>
      <Suspense>{children}</Suspense>
    </div>
  )
}
