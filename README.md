# TODO アプリケーション (Monorepo)

NextJS (フロントエンド) と NestJS (バックエンド) を使用したシンプルなTODOアプリケーション。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. ホストファイルの設定

ローカル開発環境でカスタムドメインを使用するため、以下の設定を `/etc/hosts` ファイルに追加してください：

```bash
# /etc/hosts に以下を追加
127.0.0.1 app.my-todo.localhost
127.0.0.1 api.my-todo.localhost
```

macOS/Linux の場合：
```bash
sudo echo "127.0.0.1 app.my-todo.localhost" >> /etc/hosts
sudo echo "127.0.0.1 api.my-todo.localhost" >> /etc/hosts
```

Windows の場合は、管理者権限で `C:\Windows\System32\drivers\etc\hosts` ファイルを編集してください。

## 起動方法

```bash
# 両方のサーバーを同時に起動
npm run dev

# または個別に起動
npm run dev:backend  # バックエンド
npm run dev:frontend # フロントエンド
```

## アクセス URL

- フロントエンド: http://app.my-todo.localhost:3000
- バックエンド API: http://api.my-todo.localhost:3001

※ 従来の URL でもアクセス可能です：
- フロントエンド: http://localhost:3000
- バックエンド API: http://localhost:3001

## 構成

- `apps/frontend/` - NextJS フロントエンド (ポート 3000)
- `apps/backend/` - NestJS バックエンド API (ポート 3001)

## API エンドポイント

- `GET /todos` - すべてのTODOを取得
- `POST /todos` - 新しいTODOを作成
- `PUT /todos/:id` - TODOを更新
- `DELETE /todos/:id` - TODOを削除