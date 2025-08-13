import { getPostsByCategoryName } from "@/lib/microcms";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  return {
    title: `${decoded} の記事 | 健康雑学ブログ`,
    description: `${decoded} に関する記事一覧です。健康に関する役立つ知識をお届けします。`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decoded = decodeURIComponent(name);
  const posts = await getPostsByCategoryName(decoded);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{decoded} の記事</h1>
        <p className="text-gray-600">{decoded} に関する記事の一覧です。</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {posts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">該当する記事がありません。</p>
        )}
      </div>
    </div>
  );
}


