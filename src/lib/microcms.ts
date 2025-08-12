import { createClient } from 'microcms-js-sdk';

// Vercelビルド時に環境変数未設定でも落ちないよう遅延初期化
let cachedClient: ReturnType<typeof createClient> | null = null;
function getClientSafe() {
  if (cachedClient) return cachedClient;
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) {
    return null;
  }
  cachedClient = createClient({ serviceDomain, apiKey });
  return cachedClient;
}

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
  // カテゴリを複数参照に対応
  categories?: Category[];
  // 後方互換のため単数も許容（既存データ移行中でも動作）
  category?: Category;
  tags?: string[]; // 後方互換性のため残す
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
}

// 記事一覧を取得
export const getPosts = async (): Promise<Post[]> => {
  const client = getClientSafe();
  if (!client) return [];
  const data = await client.getList<Post>({
    endpoint: 'blogs',
    queries: { orders: '-publishedAt' },
  });
  return data.contents;
};

// 記事詳細を取得（slug または ID で検索）
export const getPost = async (slug: string): Promise<Post | null> => {
  const client = getClientSafe();
  if (!client) return null;
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
  const client = getClientSafe();
  if (!client) return [];
  const data = await client.getList<Post>({
    endpoint: 'blogs',
    queries: { 
      filters: `tags[contains]${tag}`,
      orders: '-publishedAt'
    },
  });
  return data.contents;
};