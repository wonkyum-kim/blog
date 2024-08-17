'use client'

import styles from './page.module.css'
import { wiki } from '@/data'
import { viewTransition } from '@/lib/viewTransition'
import { useRouter } from 'next/navigation'

function replaceTitle(title: string) {
  return title.replace(/[\s@:]/g, (match) => (match === ' ' ? '-' : ''))
}

export default function WikiPage({ params }: { params: { subject: string } }) {
  const subject = params.subject as keyof typeof wiki
  const router = useRouter()
  return (
    <div className={styles['container']}>
      <h1>{subject}</h1>
      <div className={styles['items']}>
        {wiki[subject].map((item) => (
          <div
            key={item}
            className={styles['item']}
            onClick={() =>
              viewTransition(() => router.push(`/wiki/${subject}/${replaceTitle(item)}`))
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
