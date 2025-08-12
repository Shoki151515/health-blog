import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/microcms';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // slugが文字列で存在しない場合はIDを使用し、常に安全な文字列にエンコード
  const slugOrId = typeof post.slug === 'string' && post.slug.trim().length > 0 ? post.slug : post.id;
  const linkHref = `/posts/${encodeURIComponent(slugOrId)}`;
  
  // 表示用タグ（tags または categories/単数category から合成）
  const categoryNames = Array.isArray(post.categories)
    ? post.categories.map((c) => c.name)
    : (post.category ? [post.category.name] : []);
  const displayTags = (post.tags || []).concat(categoryNames);

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <Link href={linkHref} className="block">
        {post.eyecatchImage && (
          <div className="relative h-48 w-full">
            <Image
              src={post.eyecatchImage.url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.body.replace(/<[^>]*>/g, '').substring(0, 120)}...
          </p>
          <div className="flex items-center justify-between">
            <time className="text-sm text-gray-500">{publishedDate}</time>
            <span className="text-green-600 font-medium text-sm">
              続きを読む →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
} 