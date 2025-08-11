# 健康雑学ブログ

Instagramと連携した健康雑学ブログです。健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法などを発信し、アフィリエイト収益化を目指しています。

## 🚀 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS 4
- **CMS**: microCMS
- **ホスティング**: Vercel（最適化済み）
- **画像最適化**: Vercel Image Optimization
- **OG画像生成**: @vercel/og
- **アナリティクス**: Google Analytics 4
- **パフォーマンス**: Vercel Edge Network

## 📦 主な機能

- ✅ レスポンシブデザイン
- ✅ SEO最適化
- ✅ 記事一覧・詳細ページ
- ✅ タグ機能
- ✅ SNSシェア機能
- ✅ アフィリエイトリンク埋め込み
- ✅ Google Analytics 4
- ✅ サイトマップ自動生成

## 🛠️ 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下の環境変数を設定してください：

```env
# microCMS設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# Google Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# サイト設定
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=健康雑学ブログ
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションを確認できます。

## 📝 microCMSの設定

### コンテンツモデル

以下のフィールドを持つ `posts` APIを作成してください：

- `title` (テキストフィールド)
- `slug` (テキストフィールド)
- `body` (リッチエディタ)
- `eyecatchImage` (画像フィールド)
- `publishedAt` (日時フィールド)
- `tags` (複数選択フィールド)

## 🚀 デプロイ

### Vercelでのデプロイ

このプロジェクトはVercelでの最適化が完了しており、簡単にデプロイできます。

#### 自動デプロイ手順

1. **GitHubリポジトリをVercelに接続**
   - [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
   - "New Project"をクリック
   - GitHubリポジトリを選択

2. **プロジェクト設定**
   - Framework Preset: Next.js（自動検出）
   - Root Directory: `health-blog`（自動設定済み）
   - Build Command: `npm run build`（自動設定済み）

3. **環境変数の設定**
   - Settings → Environment Variables で以下を設定：

#### 必須環境変数

```env
# microCMS設定（必須）
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# サイト設定（必須）
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=健康雑学ブログ

# Google Analytics（オプション）
NEXT_PUBLIC_GA_ID=your-ga-id
```

#### Vercelの最適化機能

✅ **自動有効化済み**
- Edge Network（グローバルCDN）
- Image Optimization（自動画像最適化）
- Static Generation（静的生成）
- OG Image Generation（@vercel/og使用）
- Security Headers（セキュリティヘッダー）

#### デプロイ確認

デプロイ後、以下を確認してください：
- ✅ サイトが正常に表示される
- ✅ microCMSからデータが取得できる
- ✅ 画像が最適化されて表示される
- ✅ OGイメージが生成される

## 📊 収益化

### アフィリエイトリンク

記事内にアフィリエイトリンクを埋め込むことで収益化が可能です：

- Amazonアソシエイト
- 楽天アフィリエイト
- その他のアフィリエイトプログラム

### PR記事

企業からのPR記事掲載も収益源の一つです。

## 🔧 カスタマイズ

### デザインの変更

`src/components/` 内のコンポーネントを編集することで、デザインをカスタマイズできます。

### 新機能の追加

- コメント機能
- 検索機能
- メール購読機能
- など

## 📈 SEO対策

- メタタグの最適化
- 構造化データの実装
- サイトマップの自動生成
- OGP画像の自動生成

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します。

## 📄 ライセンス

MIT License
