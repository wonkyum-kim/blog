import PageLayout from '@/components/page-layout';
import { allBlogs } from 'contentlayer/generated';
import List from './components/list';
import Pagination from './components/pagination';

export default function BlogPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const posts = allBlogs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const totalPages = Math.ceil(posts.length / 5);

  return (
    <PageLayout title='Blog' description='블로그'>
      <List page={currentPage} posts={posts} />
      <Pagination totalPages={totalPages} />
    </PageLayout>
  );
}
