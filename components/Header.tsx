'use client';

import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export default function Header() {
  return (
    <header className='h-14 px-5 sticky top-0 z-50 w-full border-b dark:border-b-white flex justify-between items-center bg-background'>
      <div className='flex items-center'>{/* 모바일 nav, nav */}</div>
      <ToggleTheme />
    </header>
  );
}

function ToggleTheme() {
  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
  }
  return (
    <Button type='button' variant='outline' size='icon' onClick={toggleTheme}>
      <Sun className='h-5 w-5 dark:hidden' />
      <Moon className='h-5 w-5 hidden dark:block' />
    </Button>
  );
}
