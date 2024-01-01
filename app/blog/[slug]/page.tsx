import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer/generated';
import type { Metadata } from 'next';
import { Mdx } from './components/mdx';
import metadata from '@/util/metadata';
import Giscus from '@/app/components/giscus';
import Link from 'next/link';

interface DocProps {
  params: {
    slug: string;
  };
}

export default async function DocPage({ params }: DocProps) {
  const post = await getDocFromParams({ params });

  if (!post) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-4 relative'>
      <h1 className='text-3xl font-bold tracking-tight md:text-5xl'>
        {post.title}
      </h1>
      <time className='text-gray-500 text-sm mt-2 ml-auto dark:text-white'>
        {post.date}
      </time>
      <Mdx code={post.body.code} />
      <Giscus />
      {post.toc ? (
        <div className='fixed left-[calc(50%+550px)] -translate-x-2/4 hidden min-[1440px]:flex min-[1440px]:flex-col gap-2'>
          {post.headings.map((heading: any) => {
            return (
              <Link
                key={`#${heading.slug}`}
                className='data-[level=two]:pl-2 data-[level=three]:pl-4 hover:text-blue-500'
                data-level={heading.level}
                href={`#${heading.slug}`}
              >
                {heading.text}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

async function getDocFromParams({ params }: DocProps) {
  const doc = allBlogs.find((doc) => doc.slug === params.slug);

  return doc ?? null;
}

export async function generateStaticParams() {
  return allBlogs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: DocProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return metadata({
    title: doc.title,
    description: doc.description,
    path: `/blog/${doc.slug}`,
  });
}
