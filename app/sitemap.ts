import { MetadataRoute } from 'next';
import { allBlogs } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allBlogs.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const postsSitemap = posts.map((post) => {
    return {
      url: `https://blog-gray-omega-81.vercel.app/blog/${post.slug}`,
    };
  });

  return [
    {
      url: 'https://blog-gray-omega-81.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postsSitemap,
  ];
}
