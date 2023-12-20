import { Blog } from '@/.contentlayer/generated';
import Link from 'next/link';

interface ListProps {
  posts: Blog[];
  page: number;
}

export default function List({ posts, page }: ListProps) {
  const min = (page - 1) * 5;
  const max = Math.min(min + 5, posts.length);
  const postsToShow = posts.slice(min, max);

  return (
    <>
      {postsToShow.map((blog) => (
        <Link
          href={`/blog/${blog.slug}`}
          key={blog.slug}
          className='flex py-5 items-start justify-between gap-2'
        >
          <div className='flex flex-col gap-1 flex-1'>
            <span className='font-bold text-lg break-keep'>{blog.title}</span>
            <span>{blog.description}</span>
            <time className='text-xs text-gray-500 mt-1'>{blog.date}</time>
          </div>
        </Link>
      ))}
    </>
  );
}
