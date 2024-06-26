import { Progressbar } from '@/components/progressbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Progressbar />
      {children}
    </div>
  )
}
