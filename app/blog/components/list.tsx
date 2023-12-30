'use client';

import { Blog } from '@/.contentlayer/generated';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface ListProps {
  posts: Blog[];
  page: number;
}

export default function List({ posts, page }: ListProps) {
  const min = (page - 1) * 5;
  const max = Math.min(min + 5, posts.length);
  const postsToShow = posts.slice(min, max);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {postsToShow.map((blog) => (
        <div key={blog.slug}>
          <Link
            href={`/blog/${blog.slug}`}
            className='flex py-5 items-start justify-between'
          >
            <div className='flex flex-col gap-1 flex-1 hover:text-blue-500'>
              <span className='font-bold text-lg break-keep'>{blog.title}</span>
              <span>{blog.description}</span>
              <time className='text-xs text-gray-500 mt-1'>{blog.date}</time>
            </div>
          </Link>
          <div className='flex gap-2 pt-2'>
            {blog.tags?.map((tag) => {
              return (
                <div
                  key={tag}
                  className='bg-blue-500 hover:bg-blue-300 dark:bg-gray-500 dark:hover:bg-gray-300 text-white font-bold px-2 rounded-lg cursor-pointer'
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set('tag', tag.trim());
                    params.delete('page');
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
