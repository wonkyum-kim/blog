'use client';

import type { Blog } from '@/.contentlayer/generated';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface TocProps {
  headings: Blog['headings'];
}

export default function Toc({ headings }: TocProps) {
  const [selected, setSelected] = useState('');

  // IntersectionObserver 사용
  useEffect(() => {
    let direction: 'down' | 'up' | '' = '';
    let prevYposition = 0;

    const scrollDirection = (prevY: number) => {
      if (window.scrollY === 0 && prevY === 0) return;
      else if (window.scrollY > prevY) direction = 'down';
      else direction = 'up';
      prevYposition = window.scrollY;
    };

    const options: IntersectionObserverInit = { rootMargin: '-300px' };
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        scrollDirection(prevYposition);
        if (
          (direction === 'down' && !entry.isIntersecting) ||
          (direction === 'up' && entry.isIntersecting)
        ) {
          setSelected(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const headingsElement = Array.from(document.querySelectorAll('h2, h3'));
    headingsElement.forEach((header) => {
      observer.observe(header);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className='fixed left-[calc(50%+600px)] -translate-x-2/4 hidden min-[1440px]:flex min-[1440px]:flex-col gap-2'>
      {headings.map((heading: any) => {
        return (
          <Link
            key={`#${heading.slug}`}
            className={clsx(
              'data-[level=two]:pl-2 data-[level=three]:pl-4 hover:text-blue-500',
              selected === heading.slug && 'text-blue-500'
            )}
            data-level={heading.level}
            onClick={() => setSelected(heading.slug)}
            href={`#${heading.slug}`}
          >
            {heading.text}
          </Link>
        );
      })}
    </div>
  );
}
