import PostCard from "@/components/PostCard";
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
  let posts;
  
  try {
    // Micro CMSから記事を取得
    posts = await getPosts();
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
    // Micro CMSが利用できない場合はダミーデータを使用
    posts = [
    {
      id: "1",
      title: "ビタミンDの驚くべき効果と摂取方法",
      slug: "vitamin-d-benefits",
      body: "ビタミンDは骨の健康だけでなく、免疫力向上や気分改善にも効果があることが知られています。この記事では、ビタミンDの効果と効率的な摂取方法について詳しく解説します。",
      publishedAt: "2024-01-15T00:00:00.000Z",
      tags: ["サプリメント", "ビタミン"],
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2024-01-15T00:00:00.000Z",
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
    },
    {
      id: "4",
      title: "プロテインの効果的な摂取タイミング",
      slug: "protein-timing",
      body: "プロテインは筋肉の修復と成長に重要な栄養素です。この記事では、効果的な摂取タイミングと摂取量について詳しく解説します。",
      publishedAt: "2024-01-01T00:00:00.000Z",
      tags: ["サプリメント", "プロテイン"],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "5",
      title: "水分補給の重要性と正しい方法",
      slug: "hydration-importance",
      body: "水分補給は健康維持の基本です。この記事では、1日に必要な水分量と効果的な水分補給の方法について解説します。",
      publishedAt: "2023-12-28T00:00:00.000Z",
      tags: ["生活習慣", "水分補給"],
      createdAt: "2023-12-28T00:00:00.000Z",
      updatedAt: "2023-12-28T00:00:00.000Z",
    },
    {
      id: "6",
      title: "腸内環境を改善する食事法",
      slug: "gut-health-diet",
      body: "腸内環境は全身の健康に影響します。この記事では、腸内環境を改善するための食事法とおすすめの食材をご紹介します。",
      publishedAt: "2023-12-25T00:00:00.000Z",
      tags: ["食事", "腸内環境"],
      createdAt: "2023-12-25T00:00:00.000Z",
      updatedAt: "2023-12-25T00:00:00.000Z",
    },
    ];
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