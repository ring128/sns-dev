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

## 現在の進捗

- [x] 基本的な要件定義
- [x] React・TypeScript・Viteで画面を起動
- [x] DockerでローカルのPostgreSQLを起動
- [x] FastifyでヘルスチェックAPIを実装
- [x] Prismaで議題テーブルを作成し、マイグレーションを適用
- [x] 議題の一覧取得APIと投稿APIを実装
- [x] 画面から一文の議題を投稿し、一覧に表示
- [x] 再読み込み後も投稿が残ることを確認
- [ ] コードを再確認し、今一度要件定義との乖離がないか確認
- [ ] コードの意味を簡略化し`backend/devmemo.md`, `frontend/devmemo.md`にまとめ、開発の効率化を図る
- [ ] 意見・共感の実装
- [ ] 認証・通知の実装
- [ ] 公開
