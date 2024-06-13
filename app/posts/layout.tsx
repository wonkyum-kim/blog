import { getHeadingsBySlug } from '@/lib/mdx'
import styles from './layout.module.css'
import { headers } from 'next/headers'
import { TOC } from '@/components/toc'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // middleware 설정해서 서버 컴포넌트에서 현재 경로를 가져온다.
  const pathname = (headers().get('x-pathname') || '').split('/')
  const slug = pathname[pathname.length - 1]
  // id에서 ., /, @가 삭제되었기 때문에 진행한다.
  const headings = getHeadingsBySlug(slug).map(({ heading, level }) => {
    return { heading: heading.replace(/[.\/@]/g, ''), level }
  })

  return (
    <div className={styles.main}>
      {children}
      <TOC headings={headings} />
    </div>
  )
}
