# Micro CMS 連携設定手順

このドキュメントでは、健康雑学ブログにMicro CMSを連携する手順を説明します。

## 1. Micro CMSアカウントの作成

1. [Micro CMS](https://microcms.io/)にアクセス
2. 無料アカウントを作成
3. 新しいサービスを作成

## 2. API設定

### APIの作成

1. Micro CMSの管理画面で「API」メニューから「作成」をクリック
2. 以下の設定で作成：
   - **API ID**: `posts`
   - **API名**: `記事`
   - **エンドポイント**: リスト形式

### スキーマ設定

以下のフィールドを追加してください：

| フィールドID | 表示名 | 種類 | 必須 | 説明 |
|------------|--------|------|------|------|
| `title` | タイトル | テキストフィールド | ✓ | 記事のタイトル |
| `slug` | スラッグ | テキストフィールド | ✓ | URL用のスラッグ（半角英数字） |
| `body` | 本文 | リッチエディタ | ✓ | 記事の本文（Markdown対応） |
| `eyecatchImage` | アイキャッチ画像 | 画像 | - | 記事のアイキャッチ画像 |
| `tags` | タグ | 複数選択 | - | 記事のカテゴリータグ |

## 3. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
# Micro CMS設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key

# サイト設定
NEXT_PUBLIC_SITE_NAME=健康雑学ブログ
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 環境変数の取得方法

1. **MICROCMS_SERVICE_DOMAIN**: Micro CMSの管理画面のURLから取得
   - 例: `https://your-service.microcms.io/` → `your-service`

2. **MICROCMS_API_KEY**: Micro CMSの管理画面で取得
   - 「設定」→「API設定」→「APIキー」から生成

## 4. 記事の投稿

Micro CMSの管理画面から記事を投稿してください：

### 投稿時の注意点

1. **slug**: URLに使用されるため、半角英数字とハイフンのみを使用
2. **tags**: 選択肢は事前に設定が必要
   - サプリメント
   - ビタミン
   - 食事
   - 生活習慣
   - 睡眠
   - 腸内環境
   - 水分補給
   - プロテイン

## 5. 動作確認

1. アプリケーションを起動：
   ```bash
   npm run dev
   ```

2. ブラウザで`http://localhost:3000/posts`にアクセス

3. Micro CMSから記事が正常に取得・表示されることを確認

## トラブルシューティング

### 記事が表示されない場合

1. 環境変数が正しく設定されているか確認
2. Micro CMSのAPIキーが有効か確認
3. ブラウザの開発者ツールでコンソールエラーを確認

### よくあるエラー

- **401 Unauthorized**: APIキーが間違っている
- **404 Not Found**: サービスドメインが間違っている、またはAPIが存在しない
- **Record not found**: 指定されたslugの記事が存在しない

## 関連ファイル

- `src/lib/microcms.ts`: Micro CMSクライアントとAPI関数
- `src/app/posts/page.tsx`: 記事一覧ページ
- `src/app/posts/[slug]/page.tsx`: 個別記事ページ
- `src/components/PostCard.tsx`: 記事カードコンポーネント 