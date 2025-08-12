import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { getPost, getPosts, Post } from '@/lib/microcms';
import { Metadata } from 'next';

export const revalidate = 60; // ISR

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  let post;
  try {
    // Micro CMSから記事を取得
    post = await getPost(slug);
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
        // Micro CMSが利用できない場合はダミーデータを使用
    const posts: Post[] = [
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
    post = posts.find(p => p.slug === slug) || null;
  }
  
  if (!post) {
    return {
      title: '記事が見つかりません | 健康雑学ブログ',
    };
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || '健康雑学ブログ';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://health-blog.vercel.app';

  const safeSlug = typeof post.slug === 'string' && post.slug.trim().length > 0 ? post.slug : post.id;
  const postUrl = `${baseUrl}/posts/${encodeURIComponent(safeSlug)}`;

  return {
    title: `${post.title} | ${siteName}`,
    description: post.body.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
    openGraph: {
      title: `${post.title} | ${siteName}`,
      description: post.body.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
      type: 'article',
      url: postUrl,
      siteName: siteName,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${siteName}`,
      description: post.body.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
    },
  };
}

export async function generateStaticParams() {
  // 空の配列を返すことで動的ルーティングを有効にする
  // 各ページは実行時に生成される
  return [];
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let post;
  try {
    // Micro CMSから記事を取得
    post = await getPost(slug);
  } catch (error) {
    console.error('記事の取得に失敗しました:', error);
    // Micro CMSが利用できない場合はダミーデータを使用
    const posts: Post[] = [
    {
      id: "1",
      title: "ビタミンDの驚くべき効果と摂取方法",
      slug: "vitamin-d-benefits",
      body: `# ビタミンDの驚くべき効果と摂取方法

ビタミンDは「太陽のビタミン」とも呼ばれ、骨の健康だけでなく、免疫力向上や気分改善にも効果があることが知られています。

## ビタミンDの主な効果

### 1. 骨の健康維持
ビタミンDはカルシウムの吸収を促進し、骨の形成と維持に重要な役割を果たします。

### 2. 免疫力向上
ビタミンDは免疫システムを強化し、風邪やインフルエンザなどの感染症から身を守る効果があります。

### 3. 気分改善
ビタミンD不足はうつ病や季節性感情障害（SAD）と関連していることが研究で示されています。

## 効率的な摂取方法

### 日光浴
1日15-20分程度の日光浴で、体内でビタミンDを生成できます。

### 食事からの摂取
- 魚類（サケ、マグロ、サバ）
- 卵黄
- きのこ類
- 乳製品

### サプリメント
日照時間が少ない季節や、日光浴が難しい場合は、サプリメントでの摂取も効果的です。

## 推奨摂取量

年齢によって推奨摂取量が異なります：
- 成人：600-800 IU/日
- 高齢者：800-1000 IU/日

## 注意点

過剰摂取は避け、医師に相談してからサプリメントを始めることをお勧めします。`,
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
      body: `# 朝食を抜くと太る？朝食の重要性について

朝食を抜くことで代謝が下がり、太りやすくなるという説があります。しかし、最近の研究では朝食の重要性について様々な意見があります。

## 朝食の効果

### 代謝の向上
朝食を摂ることで、体の代謝が活発になり、1日のエネルギー消費量が増加します。

### 集中力の向上
朝食を摂ることで、脳に必要なブドウ糖が供給され、集中力や記憶力が向上します。

### 食欲コントロール
朝食を摂ることで、昼食や夕食での過食を防ぐことができます。

## 理想的な朝食

### タンパク質
卵、ヨーグルト、豆腐など

### 炭水化物
全粒粉パン、オートミールなど

### ビタミン・ミネラル
フルーツ、野菜など

## 朝食を抜く場合の注意点

朝食を抜く場合は、昼食で栄養バランスの良い食事を心がけることが重要です。

## 結論

朝食の重要性は個人差がありますが、健康的な生活のためには、栄養バランスの良い朝食を摂ることをお勧めします。`,
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
      body: `# 睡眠の質を向上させる5つの方法

良質な睡眠は健康の基本です。この記事では、睡眠の質を向上させるための5つの具体的な方法をご紹介します。

## 1. 就寝時間を一定にする

毎日同じ時間に寝ることで、体内時計が整い、自然な眠気が訪れるようになります。

## 2. 寝室の環境を整える

### 温度
寝室の温度は18-22度が最適です。

### 明かり
就寝1時間前からは明るい光を避け、ブルーライトをカットします。

### 音
静かな環境を作り、必要に応じてホワイトノイズを使用します。

## 3. 就寝前の習慣

### リラックスタイム
就寝1時間前からは、読書や軽いストレッチなど、リラックスできる活動を行います。

### カフェインの制限
就寝6時間前からはカフェインの摂取を避けます。

## 4. 運動習慣

適度な運動は睡眠の質を向上させますが、就寝3時間前までに終えることが重要です。

## 5. 食事のタイミング

就寝3時間前までに夕食を終え、消化に時間がかかる食べ物は避けます。

## まとめ

これらの方法を実践することで、より良質な睡眠を得ることができます。個人差があるので、自分に合った方法を見つけることが重要です。`,
      publishedAt: "2024-01-05T00:00:00.000Z",
      tags: ["生活習慣", "睡眠"],
      createdAt: "2024-01-05T00:00:00.000Z",
      updatedAt: "2024-01-05T00:00:00.000Z",
      revisedAt: "2024-01-05T00:00:00.000Z",
    },
      ];
    
    post = posts.find(p => p.slug === slug) || null;
  }

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 記事ヘッダー */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {(() => {
              const namesFromCategories = Array.isArray(post.categories)
                ? post.categories.map((c) => c.name)
                : [];
              const namesFromCategory = Array.isArray(post.category)
                ? post.category.map((c) => c.name)
                : (post.category ? [post.category.name] : []);
              const tags = post.tags || [];
              const display = [...namesFromCategories, ...namesFromCategory, ...tags];
              return display;
            })().map((tag) => (
              <span
                key={tag}
                className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <time dateTime={post.publishedAt}>{publishedDate}</time>
          </div>
        </header>

        {/* 記事本文（microCMSのHTMLをサニタイズして描画） */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.body || '', {
              // 見出しや段落のサイズ指定など、インラインstyleを安全に許可
              ADD_ATTR: ['style'],
              ALLOWED_ATTR: ['style', 'class', 'id']
            }),
          }}
        />

        {/* アフィリエイトセクション */}
        <section className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">おすすめ商品</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://amzn.to/example1"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                ビタミンDサプリメント
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                高品質なビタミンDサプリメント
              </p>
              <span className="text-green-600 text-sm font-medium">
                詳細を見る →
              </span>
            </a>
            <a
              href="https://amzn.to/example2"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                睡眠改善サプリメント
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                良質な睡眠をサポート
              </p>
              <span className="text-green-600 text-sm font-medium">
                詳細を見る →
              </span>
            </a>
          </div>
        </section>

        {/* SNSシェア */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-4">この記事をシェア</h3>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${typeof post.slug === 'string' && post.slug.trim().length > 0 ? post.slug : post.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Twitterでシェア
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/posts/${typeof post.slug === 'string' && post.slug.trim().length > 0 ? post.slug : post.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Facebookでシェア
            </a>
          </div>
        </section>
      </article>
    </>
  );
} 