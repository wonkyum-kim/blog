import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'katex/dist/katex.min.css'
import { Menu } from '@/components/menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `wonkyum's blog`,
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <Menu />
        <div className='background-radish' />
        <div className='background-blue' />
        {children}
      </body>
    </html>
  )
}
