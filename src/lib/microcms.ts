import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// カテゴリの型定義
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

// 記事の型定義
export interface Post {
  id: string;
  title: string;
  slug?: string; // オプショナル（nullの場合があるため）
  body: string;
  eyecatchImage?: {
    url: string;
    height: number;
    width: number;
  };
  publishedAt: string;
  category?: Category; // tagsの代わりにcategoryを使用
  tags?: string[]; // 後方互換性のため残す
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
}

// 記事一覧を取得
export const getPosts = async (): Promise<Post[]> => {
  const data = await client.getList<Post>({
    endpoint: 'blogs',
    queries: { orders: '-publishedAt' },
  });
  return data.contents;
};

// 記事詳細を取得（slug または ID で検索）
export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    // まずslugで検索を試す
    let data = await client.getList<Post>({
      endpoint: 'blogs',
      queries: { filters: `slug[equals]${slug}` },
    });
    
    // slugで見つからない場合はIDで検索
    if (data.contents.length === 0) {
      data = await client.getList<Post>({
        endpoint: 'blogs',
        queries: { filters: `id[equals]${slug}` },
      });
    }
    
    return data.contents[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// タグ別記事一覧を取得
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const data = await client.getList<Post>({
    endpoint: 'blogs',
    queries: { 
      filters: `tags[contains]${tag}`,
      orders: '-publishedAt'
    },
  });
  return data.contents;
}; 