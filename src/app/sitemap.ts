import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/microcms';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://health-blog.vercel.app';
  
  // 実際のmicroCMS連携時はコメントアウトを外す
  // const posts = await getPosts();
  
  // ダミーデータ（開発用）
  const posts = [
    {
      id: "1",
      title: "ビタミンDの驚くべき効果と摂取方法",
      slug: "vitamin-d-benefits",
      publishedAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2024-01-15T00:00:00.000Z",
    },
    {
      id: "2",
      title: "朝食を抜くと太る？朝食の重要性について",
      slug: "breakfast-importance",
      publishedAt: "2024-01-10T00:00:00.000Z",
      updatedAt: "2024-01-10T00:00:00.000Z",
    },
    {
      id: "3",
      title: "睡眠の質を向上させる5つの方法",
      slug: "improve-sleep-quality",
      publishedAt: "2024-01-05T00:00:00.000Z",
      updatedAt: "2024-01-05T00:00:00.000Z",
    },
  ];

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
} 