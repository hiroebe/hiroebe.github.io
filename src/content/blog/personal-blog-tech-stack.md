---
title: '個人ブログの技術構成'
description: 'Astro + GitHub Pages で個人ブログを構築し、Claude Code の Skill で執筆補助を自動化した話。'
pubDate: 2026-02-10
---

[個人ブログを作った](/blog/started-personal-blog/) ということで、ブログの技術構成について書いておく。
といっても構成というほどのものはない。

サイトの構築には Astro を使用した。
名前は聞いたことあるという程度で使ったことはなかったが、content-driven を謳っていてブログ適性が高そうなのと、Markdown で書きたかったのでそれを標準でサポートしているのが良さそうだった。丁寧に検討して決めたわけではない。

ホスティングは GitHub Pages にした。とりあえず一番楽そうだったので。

Astro のセットアップを丸ごと Claude Code にお願いしたほか、ブログを書くときの面倒な作業も AI にやってほしいということで

- 新規作成時: 日本語でタイトルを入力すると、英語のファイル名 (= slug) に変換して frontmatter 付きの Markdown ファイルを作ってくれる
- 執筆完了時: 記事の description を自動生成してくれる

あたりを Claude Code の Skill として用意した。

あとは書き終えたタイミングでレビューもしてほしいので、これも Skill にした。
誤字脱字とかは当然見てもらうとして、個人的には

- 全体の構成
- サービス名称などの固有名詞の表記 (GitHub, Claude Code, ChatGPT など)

あたりをチェックしてほしい。他にもレビュー観点はありそうなので、思いついたら追加していく予定。
あとはこのあたりのワークフローの自動化とか…

favicon の生成には [https://toolpods.io/favicon-generator](https://toolpods.io/favicon-generator) を使用した。
[背景透過](https://toolpods.io/transparent-image) がセットで提供されていて、自分の GitHub のプロフィール画像を透過 → favicon 生成という流れで簡単にできた。

今後は気になる技術とかがあれば試してみたりして、少しずつ育てていく予定。
