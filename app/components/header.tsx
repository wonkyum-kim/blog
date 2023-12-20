'use client';

import { Button } from '../../components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../hooks/useThemeStore';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='h-14 px-5 sticky top-0 z-50 w-full border-b dark:border-b-white flex justify-between items-center bg-background'>
      <div className='flex items-center'>
        <Link href='/blog' className='font-bold hover:text-blue-500'>
          Blog
        </Link>
      </div>
      <ToggleTheme />
    </header>
  );
}

function ToggleTheme() {
  const setTheme = useThemeStore((state) => state.setTheme);

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }
  return (
    <Button type='button' variant='outline' size='icon' onClick={toggleTheme}>
      <Sun className='h-5 w-5 dark:hidden' />
      <Moon className='h-5 w-5 hidden dark:block' />
    </Button>
  );
}
