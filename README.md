# next-db-auth-cftunnel-sample

`Next.js`と DB に`mysql`、ORM に`prisma.io`、認証に`NextAuth`、自宅サーバーなどでのデプロイ用に`Cloudflare Tunnel`を組み合わせたテンプレートプロジェクトです。

`docker-compose`にて開発環境用と本番環境用の構成をしてあるので開発後すぐにサービスを展開できます。

## 初期セットアップ

### env ファイルの作成

`.env.sample`の内容を参考に`.env`を作成します。
このサンプルでは認証に Google 認証を用いているので、GCP のコンソールからリダイレクト URI を`http://localhost:3000/api/auth/callback/google`に設定して、GCP のクライアント ID とクライアントシークレットを取得して`.env`内の`GOOGLE_CLIENT_ID`および`GOOGLE_CLIENT_SECRET`に記載してください。

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

## デプロイ

### env ファイルの追記

Google 認証を行う場合は本番環境に合わせて GCP から認証情報を作成する必要があります。
本番環境のドメインなどに合わせてリダイレクト URI を`https://hoge.hoge.net/api/auth/callback/google`のように設定しクライアント ID とクライアントシークレットを取得します。

`NEXTAUTH_SECRET`は以下のコマンドで生成した文字列を使用します。

```bash
openssl rand -base64 32
```

`TUNNEL_TOKEN`には`Cloudflare Tunnel`のアクセストークンを使用します。

[Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/)より`Access`->`Tunnels`から任意の名前で新規作成し、紹介されているインストールコマンドと一緒に書かれているトークンをコピーしてこれを`TUNNEL_TOKEN`に設定します。

任意の Public hostname を指定し、Service 部分には`HTTP`と`app:3000`を指定します。（docker のネットワーク内ではコンテナ名で指定するため）

`NEXTAUTH_URL`に`https://`から始まるサイトのURLを記載します

### docker コンテナの起動

```bash
docker compose -f docker-compose.prod.yml build
```

### db のマイグレーション

app コンテナのコンソールに入り、`yarn prisma db push`を実行します。
