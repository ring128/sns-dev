## コンセプト

答えが定まらない議題に意見を蓄積し、共有・観覧できるSNSです。

## 技術スタック

- フロントエンド：React、TypeScript、Vite
- バックエンド：Node.js、Fastify、TypeScript
- データベース：PostgreSQL
- ORM：Prisma ORM 7
- 開発環境：Docker（ローカルDB）、npm
- バージョン管理：Git、GitHub

認証にはBetter Authを採用予定です。

## 簡易公開（beta）

GitHub Pagesにはフロントエンドを公開します。`main`へのpushで`.github/workflows/deploy-pages.yml`がビルド・デプロイします。GitHubの`Settings → Pages → Build and deployment`で公開元を`GitHub Actions`に設定してください。公開後のURLは`https://ring128.github.io/sns-dev/`です。

投稿APIはGitHub Pagesでは動かせないため、別のサーバーが必要です。`render.yaml`はRenderの無料Webサービスと、beta専用の無料PostgreSQLを作る設定です。RenderでこのリポジトリからBlueprintを作成すると、APIとDBをまとめてデプロイできます。

RenderのAPIが公開されたら、GitHubリポジトリのActions用変数`BETA_API_BASE_URL`にそのHTTPSのURLを設定し、Pagesのワークフローを再実行してください。未設定の間は公開画面の投稿ボタンを無効にします。

betaデータは専用DBをRender上で削除すればまとめて消去できます。無料DBは作成から30日後に期限切れになります。認証なしで投稿できる暫定版のため、個人情報は投稿しないでください。

## 現在の進捗

- [x] React・TypeScript・Viteで画面を起動
- [x] DockerでローカルのPostgreSQLを起動
- [x] FastifyでヘルスチェックAPIを実装
- [x] Prismaで議題テーブルを作成し、初回マイグレーションを適用
- [x] 議題の一覧取得APIと投稿APIを実装
- [x] 画面から一文の議題を投稿し、一覧に表示
- [x] 再読み込み後も投稿が残ることを確認
- [ ] GitHub Pagesで改めて実装を確認する
- [x] GitHub Pages向けのビルドとbeta専用DBの設定を準備する
- [ ] Renderに投稿API・beta用DBを作成し、GitHub Pagesに接続する
- [ ] 要件定義を再度固める
- [ ] 一文の議題に合わせたDBマイグレーションの適用を確認する
- [ ] 要件と現在の実装の差を確認する
- [ ] 意見・共感の実装
- [ ] 認証・通知の実装
- [ ] コードを理解し、自分でリファクタリングできる状態にする
- [ ] 公開
