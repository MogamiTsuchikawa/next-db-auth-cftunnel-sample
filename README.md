# next-db-auth-cftunnel-sample

`Next.js`と DB に`mysql`、ORM に`prisma.io`、認証に`NextAuth`、自宅サーバーなどでのデプロイ用に`Cloudflare Tunnel`を組み合わせたテンプレートプロジェクトです。

`docker-compose`にて開発環境用と本番環境用の構成をしてあるので開発後すぐにサービスを展開できます。

## 初期セットアップ

### env ファイルの作成

`.env.sample`の内容を参考に`.env`を作成します。
このサンプルでは認証に Google 認証を用いているので、GCP のクライアント ID とクライアントシークレットを取得して`.env`内の`GOOGLE_CLIENT_ID`および`GOOGLE_CLIENT_SECRET`に記載してください。

### パッケージのインストール

```bash
yarn install
```

### 開発用の DB の起動

```bash
docker compose up -d
```

DB は`3306`番ポートで起動しています。

### DB のマイグレーション

```bash
yarn prisma migrate dev
```
