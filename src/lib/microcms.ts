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
  // 後方互換のため単数/複数の両方を許容（移行中でも動作）
  category?: Category | Category[];
  tags?: string[]; // 後方互換性のため残す
  createdAt: string;
  updatedAt: string;
  revisedAt: string;
}

// 環境未設定時のフォールバック用ダミー記事
function getFallbackPosts(): Post[] {
  return [
    {
      id: "1",
      title: "ビタミンDの驚くべき効果と摂取方法",
      slug: "vitamin-d-benefits",
      body: "ビタミンDは骨の健康だけでなく、免疫力向上や気分改善にも効果があることが知られています。この記事では、ビタミンDの効果と効率的な摂取方法について詳しく解説します。",
      publishedAt: "2024-01-15T00:00:00.000Z",
      tags: ["サプリメント", "ビタミン"],
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2024-01-15T00:00:00.000Z",
      revisedAt: "2024-01-15T00:00:00.000Z",
    },
    {
      id: "2",
      title: "朝食を抜くと太る？朝食の重要性について",
      slug: "breakfast-importance",
      body: "朝食を抜くことで代謝が下がり、太りやすくなるという説があります。しかし、最近の研究では朝食の重要性について様々な意見があります。この記事では、朝食の効果と最適な朝食の取り方について解説します。",
      publishedAt: "2024-01-10T00:00:00.000Z",
      tags: ["食事", "生活習慣"],
      createdAt: "2024-01-10T00:00:00.000Z",
      updatedAt: "2024-01-10T00:00:00.000Z",
      revisedAt: "2024-01-10T00:00:00.000Z",
    },
    {
      id: "3",
      title: "睡眠の質を向上させる5つの方法",
      slug: "improve-sleep-quality",
      body: "良質な睡眠は健康の基本です。この記事では、睡眠の質を向上させるための5つの具体的な方法をご紹介します。今日から実践できる簡単な方法ばかりです。",
      publishedAt: "2024-01-05T00:00:00.000Z",
      tags: ["生活習慣", "睡眠"],
      createdAt: "2024-01-05T00:00:00.000Z",
      updatedAt: "2024-01-05T00:00:00.000Z",
      revisedAt: "2024-01-05T00:00:00.000Z",
    },
  ];
}

// 記事一覧を取得
export const getPosts = async (): Promise<Post[]> => {
  const client = getClientSafe();
  if (!client) return getFallbackPosts();
  const endpoints = (process.env.NEXT_PUBLIC_MICROCMS_POSTS_API_ID || 'posts,blogs')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const endpoint of endpoints) {
    try {
      const data = await client.getList<Post>({
        endpoint,
        queries: { orders: '-publishedAt' },
      });
      return data.contents;
    } catch {
      // try next endpoint
    }
  }
  return getFallbackPosts();
};

// カテゴリー一覧を取得
export const getCategories = async (): Promise<Category[]> => {
  const client = getClientSafe();
  if (!client) return [];
  const data = await client.getList<Category>({
    endpoint: 'categories',
    queries: { orders: 'name' },
  });
  return data.contents;
};

// 記事詳細を取得（slug または ID で検索）
export const getPost = async (slug: string): Promise<Post | null> => {
  const client = getClientSafe();
  if (!client) return null;
  try {
    const endpoints = (process.env.NEXT_PUBLIC_MICROCMS_POSTS_API_ID || 'posts,blogs')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    // try slug first across endpoints
    for (const endpoint of endpoints) {
      try {
        const data = await client.getList<Post>({
          endpoint,
          queries: { filters: `slug[equals]${slug}` },
        });
        if (data.contents.length > 0) return data.contents[0];
      } catch {}
    }
    // then try id across endpoints
    for (const endpoint of endpoints) {
      try {
        const data = await client.getList<Post>({
          endpoint,
          queries: { filters: `id[equals]${slug}` },
        });
        if (data.contents.length > 0) return data.contents[0];
      } catch {}
    }
    // フォールバック: ローカルのダミー記事から検索
    const fallback = getFallbackPosts();
    const bySlug = fallback.find(p => p.slug === slug);
    if (bySlug) return bySlug;
    const byId = fallback.find(p => p.id === slug);
    if (byId) return byId;
    return null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

// タグ別記事一覧を取得
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const client = getClientSafe();
  if (!client) return [];
  const endpoints = (process.env.NEXT_PUBLIC_MICROCMS_POSTS_API_ID || 'posts,blogs')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const endpoint of endpoints) {
    try {
      const data = await client.getList<Post>({
        endpoint,
        queries: {
          filters: `tags[contains]${tag}`,
          orders: '-publishedAt',
        },
      });
      return data.contents;
    } catch {}
  }
  // フォールバック: ダミー記事からタグ一致で抽出
  return getFallbackPosts().filter(p => (p.tags || []).includes(tag));
};

// カテゴリーIDで記事一覧を取得（単数参照/複数参照の両方に対応）
export const getPostsByCategoryId = async (categoryId: string): Promise<Post[]> => {
  const client = getClientSafe();
  if (!client) {
    // Fallback: クライアント未設定時は全件取得してローカル絞り込み
    const all = await getPosts();
    return all.filter((p) => {
      const multiple = Array.isArray(p.categories) ? p.categories.map(c => c.name) : [];
      const single = Array.isArray(p.category)
        ? p.category.map(c => c.name)
        : (p.category ? [p.category.name] : []);
      const names = new Set([...multiple, ...single, ...(p.tags || [])]);
      return names.has(categoryId) || names.has(categoryId);
    });
  }
  const endpoints = (process.env.NEXT_PUBLIC_MICROCMS_POSTS_API_ID || 'posts,blogs')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  for (const endpoint of endpoints) {
    try {
      const data = await client.getList<Post>({
        endpoint,
        queries: {
          filters: `categories[contains]${categoryId}[or]category[equals]${categoryId}`,
          orders: '-publishedAt',
        },
      });
      return data.contents;
    } catch {}
  }
  // フィルタが使えない/失敗する場合はローカル絞り込み
  const all = await getPosts();
  return all.filter((p) => {
    const multiple = Array.isArray(p.categories) ? p.categories.map(c => c.name) : [];
    const single = Array.isArray(p.category)
      ? p.category.map(c => c.name)
      : (p.category ? [p.category.name] : []);
    const names = new Set([...multiple, ...single, ...(p.tags || [])]);
    return names.has(categoryId);
  });
};

// カテゴリー名で記事一覧を取得（name→id解決を行う）
export const getPostsByCategoryName = async (categoryName: string): Promise<Post[]> => {
  const normalized = decodeURIComponent(categoryName);
  // まずはタグでのフィルタ（MicroCMSの複数選択フィールド想定）
  const byTag = await getPostsByTag(normalized);
  if (byTag.length > 0) return byTag;

  // 次にカテゴリ参照（単数/複数）に対するローカルフィルタ（name一致）
  const all = await getPosts();
  return all.filter((p) => {
    const multiple = Array.isArray(p.categories) ? p.categories.map(c => c.name) : [];
    const single = Array.isArray(p.category)
      ? p.category.map(c => c.name)
      : (p.category ? [p.category.name] : []);
    const names = new Set([...multiple, ...single, ...(p.tags || [])]);
    return names.has(normalized);
  });
};