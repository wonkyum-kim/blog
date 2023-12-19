import PageLayout from '@/components/page-layout';
import { allBlogs } from 'contentlayer/generated';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <PageLayout title='Blog' description='블로그'>
      {allBlogs
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
        .map((blog) => (
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
    </PageLayout>
  );
}
