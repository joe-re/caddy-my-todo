# TODO アプリケーション

NextJS (フロントエンド) と NestJS (バックエンド) を使用したシンプルなTODOアプリケーションです。
Caddyを使ってモバイルでの実機での動作確認を行うサンプルプロジェクトです。

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
```

## Caddyのセットアップ / 起動

```
$ npm run setup:caddy
$ npm run start:caddy
```

## モバイル側の設定

* 手元のモバイルとPCは同一ネットワークに接続し、Private IPがお互い見えている必要があります

1. host側(PC)のPrivate IPを調べる

```
$ ifconfig en0 inet
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	options=6460<TSO4,TSO6,CHANNEL_IO,PARTIAL_CSUM,ZEROINVERT_CSUM>
	inet 192.168.68.52 netmask 0xfffffc00 broadcast 192.168.71.255
```

出力されたinetの値(192.168.68.52)がホストのプライベートアドレスです。

2. モバイル側にProxyサーバの設定

iPhoneの設定

1. 設定 > Wi-Fi
2. 接続中のネットワークをタップ
3. プロキシを構成 → 手動
以下を入力：

```
サーバ: HostのプライベートIP（例: 192.168.68.52）
ポート: 3128
```

Android

1. 設定 > ネットワークとインターネット > Wi-Fi
2. 接続中のネットワークを長押しまたはタップ
3. ネットワークを変更 → 詳細設定オプション
4. プロキシ → 手動
以下を入力：

```
プロキシホスト名: HostのプライベートIP（例: 192.168.68.52）
プロキシポート: 3128
```

## アクセス URL

自己証明書を使っているので、初回アクセス時は以下のURLをそれぞれアクセスしてアクセスを許可してください。

- フロントエンド: https://app.my-todo.localhost
- バックエンド API: https://api.my-todo.localhost
