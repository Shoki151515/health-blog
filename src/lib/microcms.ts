import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// 記事の型定義
export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  eyecatchImage?: {
    url: string;
    height: number;
    width: number;
  };
  publishedAt: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 記事一覧を取得
export const getPosts = async (): Promise<Post[]> => {
  const data = await client.getList<Post>({
    endpoint: 'posts',
    queries: { orders: '-publishedAt' },
  });
  return data.contents;
};

// 記事詳細を取得
export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    const data = await client.getList<Post>({
      endpoint: 'posts',
      queries: { filters: `slug[equals]${slug}` },
    });
    return data.contents[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// タグ別記事一覧を取得
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const data = await client.getList<Post>({
    endpoint: 'posts',
    queries: { 
      filters: `tags[contains]${tag}`,
      orders: '-publishedAt'
    },
  });
  return data.contents;
}; 