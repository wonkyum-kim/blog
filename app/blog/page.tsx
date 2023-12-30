'use client';

import PageLayout from '@/components/page-layout';
import { allBlogs } from 'contentlayer/generated';
import List from './components/list';
import Pagination from './components/pagination';

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    tag?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  let posts = allBlogs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  if (searchParams?.tag) {
    posts = posts.filter((post) => {
      return (
        post.tags?.includes(`${searchParams.tag!}\r`) ||
        post.tags?.includes(searchParams.tag!)
      );
    });
  }
  const totalPages = Math.ceil(posts.length / 5);

  return (
    <PageLayout title='Blog' description='블로그'>
      <List page={currentPage} posts={posts} />
      <Pagination totalPages={totalPages} />
    </PageLayout>
  );
}
