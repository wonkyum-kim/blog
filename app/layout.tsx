import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wonkyum | Frontend',
  description: '프론트엔드 개발 블로그',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='max-w-screen-md min-w-[320px] mx-auto'>
        <Header />
        <main className='flex flex-col'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
