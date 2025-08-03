# 健康雑学ブログ

Instagramと連携した健康雑学ブログです。健康に関する雑学やサプリメントのレビュー、生活習慣の改善方法などを発信し、アフィリエイト収益化を目指しています。

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **CMS**: microCMS
- **ホスティング**: Vercel
- **SEO**: next-seo
- **アナリティクス**: Google Analytics 4

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

1. GitHubリポジトリをVercelに接続
2. 環境変数を設定
3. 自動デプロイが有効になります

### 環境変数の設定

Vercelのダッシュボードで以下の環境変数を設定してください：

- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

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
