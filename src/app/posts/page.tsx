import PostCard from "@/components/PostCard";
export const revalidate = 60; // ISR
import { getPosts } from "@/lib/microcms";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'すべての記事 | 健康雑学ブログ',
  description: '健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、すべての記事をご覧いただけます。',
  openGraph: {
    title: 'すべての記事 | 健康雑学ブログ',
    description: '健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、すべての記事をご覧いただけます。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'すべての記事 | 健康雑学ブログ',
    description: '健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、すべての記事をご覧いただけます。',
  },
};

export default async function PostsPage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  
  try {
    // Micro CMSから記事を取得
    posts = await getPosts();
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
    posts = [];
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            すべての記事
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、
            すべての記事をご覧いただけます。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* ページネーション（将来的に実装） */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            現在 {posts.length} 件の記事があります
          </p>
        </div>
      </div>
    </>
  );
} 