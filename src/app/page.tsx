import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/microcms";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '健康雑学ブログ - 健康に関する役立つ情報をお届け',
  description: '健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、あなたの健康生活をサポートする情報をお届けします。',
  openGraph: {
    title: '健康雑学ブログ - 健康に関する役立つ情報をお届け',
    description: '健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、あなたの健康生活をサポートする情報をお届けします。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '健康雑学ブログ - 健康に関する役立つ情報をお届け',
    description: '健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、あなたの健康生活をサポートする情報をお届けします。',
  },
};

export default async function Home() {
  // 実際のmicroCMS連携時はコメントアウトを外す
  // const posts = await getPosts();
  
  // ダミーデータ（開発用）
  const posts = [
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
  ];

  return (
    <>
      {/* ヒーローセクション */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              健康雑学ブログ
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法など、
              あなたの健康生活をサポートする情報をお届けします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://instagram.com/your-health-account"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Instagramをフォロー
              </a>
              <a
                href="#latest-posts"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                最新記事を見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 最新記事セクション */}
      <section id="latest-posts" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              最新記事
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              健康に関する最新の情報や役立つ知識をお届けします。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/posts"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              すべての記事を見る
            </a>
          </div>
        </div>
      </section>

      {/* カテゴリーセクション */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              カテゴリー
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              興味のあるカテゴリーから記事を探してみてください。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "サプリメント", href: "/tags/サプリメント", color: "bg-blue-100 text-blue-800" },
              { name: "健康雑学", href: "/tags/健康雑学", color: "bg-green-100 text-green-800" },
              { name: "生活習慣", href: "/tags/生活習慣", color: "bg-yellow-100 text-yellow-800" },
              { name: "食事", href: "/tags/食事", color: "bg-red-100 text-red-800" },
            ].map((category) => (
              <a
                key={category.name}
                href={category.href}
                className={`${category.color} p-6 rounded-lg text-center hover:opacity-80 transition-opacity`}
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
