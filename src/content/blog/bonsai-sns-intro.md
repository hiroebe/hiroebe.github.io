---
title: 'Bonsai SNS の紹介'
description: '趣味で開発している Bonsai SNS の技術構成やアーキテクチャを紹介'
pubDate: 2026-02-17
tags: ['tech', 'bonsaisns']
---

趣味で [Bonsai SNS](https://bonsaisns.com/) という Web サービスを開発しているのでその紹介。

https://bonsaisns.com/

いわゆる Twitter クローンで、一般に公開するサービスとして特に目新しい機能があったりするわけではない。
自分の気になっている技術などを好き勝手に試す実験場になっている。

PWA (Progressive Web App) として提供していて、モバイル端末でインストールすることで、できるだけネイティブアプリに近いリッチな体験ができるように目指している。

あと特徴としてはパスキーを使った認証を採用していて、パスワードによる認証は提供していない。パスワードレス。

（ちなみに Bonsai SNS という名前は、筆者が趣味としてコツコツ開発している様子を盆栽に見立てて名付けたもの。盆栽を投稿する SNS というわけではない）

## 技術構成

フロントエンドは [React Router v7](https://reactrouter.com/) の SPA モードを使っていて、バックエンドとの通信には GraphQL と Connect を採用している。

バックエンドは Go で書いていて、パスキー (WebAuthn) による認証は [go-webauthn](https://github.com/go-webauthn/webauthn) を使って自前で実装している。
OAuth 2.0 サーバーの構築には [ory/hydra](https://github.com/ory/hydra) を使用している。

画像の配信には [imgproxy](https://imgproxy.net/) を使っている。

### Why GraphQL?

GraphQL のスタイルに乗ることでフロントエンドの実装が楽になるのが良い。

適切な ID をつけて適切なレスポンスを返せば Apollo Client がキャッシュという名の状態管理をやってくれるし、コンポーネント単位で Fragment を定義することで ViewModel にあたるものが生成される。

このあたりの話は以下の記事に詳しくまとまっていて、これを読んで実践してみたくなったので採用したみたいなところがある。

<!-- Links to engineering.mercari.com cannot be extracted on CI; inlined locally with favicon cached -->
<div class="remark-link-card-plus__container">
  <a href="https://engineering.mercari.com/blog/entry/20221215-graphql-client-architecture-recommendation/" target="_blank" rel="noreferrer noopener" class="remark-link-card-plus__card">
    <div class="remark-link-card-plus__main">
      <div class="remark-link-card-plus__content">
        <div class="remark-link-card-plus__title">GraphQL Client Architecture Recommendation 社外版</div>
        <div class="remark-link-card-plus__description">この記事は、Merpay Advent Calendar 2022 の15日目の記事です。こんにちは。メルペイのvvakameです。最近、社内向けにGraphQL Client Architecture Recommendationというド</div>
      </div>
      <div class="remark-link-card-plus__meta">
        <img src="/remark-link-card-plus/96c8cbea32f8b01671d68c121d9a28017eca48f1911cb3f45ed30848b1186b79.ico" class="remark-link-card-plus__favicon" width="14" height="14" alt="">
        <span class="remark-link-card-plus__url">engineering.mercari.com</span>
      </div>
    </div>
  </a>
</div>

### Why Connect?

過去に gRPC-Web を見て「なんか思ったのと違う…」となった経験があったので、Connect for Web を見て「欲しかったやつ！」と思って採用した。
もともとは全部 Connect でやっていたが、上で書いたように途中で GraphQL を使いたくなったので、大部分は GraphQL に移行した。

とはいえ一部で引き続き使っていて、View っぽいものがなく単に RPC で完結するようなもの、今だと

- WebAuthn
- Web Push

あたりに関連する API は Connect で実装している。

### Why PWA?

単にネイティブアプリを作って公開するパワーがないから。
Flutter である程度動くものを作ったことはあるので実装はなんとかなるかもしれないが、Apple Developer Program の費用をケチっているというのもあり、そのあたり含めてパワーが足りない。

あとは Web の新しめの技術を駆使してリッチな体験を作るのが楽しいというのもある。

## デプロイ構成

こんな感じ:

```d2
direction: right

User: User {
  shape: person
}

Cloudflare: Cloudflare {
  CDN: Cloudflare CDN
  Workers: Cloudflare Workers {
    Frontend: Frontend\nSPA {
      icon: https://icons.terrastruct.com/dev%2Freact.svg
    }
  }
}

Google Cloud: Google Cloud {
  CR1: Cloud Run {
    icon: https://icons.terrastruct.com/gcp%2FProducts%20and%20services%2FCompute%2FCloud%20Run.svg
    Backend: GraphQL / Connect\nAPI Server
    Hydra: ory/hydra\nsidecar
  }
  CR2: Cloud Run {
    icon: https://icons.terrastruct.com/gcp%2FProducts%20and%20services%2FCompute%2FCloud%20Run.svg
    Imgproxy: imgproxy
  }
  GCS: Cloud Storage {
    icon: https://icons.terrastruct.com/gcp%2FProducts%20and%20services%2FStorage%2FCloud%20Storage.svg
    Image: Uploaded images {
      icon: https://icons.terrastruct.com/essentials%2F004-picture.svg
      style.multiple: true
    }
  }
}

CockroachDB: CockroachDB\nServerless {
  shape: cylinder
}

User -> Cloudflare.CDN
Cloudflare.CDN -> Cloudflare.Workers.Frontend
Cloudflare.CDN -> Google Cloud.CR2
Cloudflare.Workers.Frontend -> Google Cloud.CR1
Google Cloud.CR1 -> CockroachDB
Google Cloud.CR1 -> Google Cloud.GCS.Image
Google Cloud.CR2 -> Google Cloud.GCS.Image
```

CDN として Cloudflare CDN を使っていて、フロントエンドの静的ファイルは Cloudflare Workers で配信している。

バックエンドは Cloud Run に2つのサービスを立てていて、1つは GraphQL と Connect の API サーバーに ory/hydra をサイドカーとしてくっつけているもの、もう1つは imgproxy のサーバー。
ユーザーが投稿した画像の保存には Cloud Storage を使っている。

データベースは CockroachDB Serverless を採用している。名前はアレだが無料枠が大きくてありがたい。

あとは図には入れていないが IaC として Terraform、CI/CD として GitHub Actions を使っている。

## おわりに

とりあえず今回はここまで。
いくつか個々の話題については別の記事で書いていくつもり。
