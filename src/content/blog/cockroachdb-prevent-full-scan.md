---
title: 'CockroachDB でフルスキャンを防ぐ'
description: 'CockroachDB でセッション変数を設定し、開発中にフルスキャンになるクエリをエラーにする方法。'
pubDate: 2026-03-01
tags: ['tech', 'bonsaisns']
order: 3
---

「適切なインデックスを貼っていなかったためクエリがフルスキャンになっていた」というのを防ぐためのアプローチとして、開発時はフルスキャンになるようなクエリをエラーにさせるという方法がある。

（誰も使っていないサービスを作っているので、実用上はフルスキャンだろうが何だろうが問題ないのだけど）

結論、以下の2つの Session Variable を設定すればよい。

- `disallow_full_table_scans = on`
- `large_full_scan_rows = 0`

`large_full_scan_rows` のほうは `v24.3` からデフォルト値が `0` になったようなので、これ以降のバージョンでは指定不要。

これでフルスキャンになるクエリを実行しようとするとエラーが発生するようになる。

個人的には Go のアプリケーションのエントリーポイントを本番用とローカル開発用で分けていて、ローカル開発用のエントリーポイントでこれらの Session Variable を設定するようにしている。

```go
func main() {
	if u, err := url.Parse(os.Getenv("DATABASE_URL")); err == nil {
		q := u.Query()
		q.Add("disallow_full_table_scans", "on")
		q.Add("large_full_scan_rows", "0")
		u.RawQuery = q.Encode()
		os.Setenv("DATABASE_URL", u.String())
	}

	if err := app.Run(); err != nil {
		os.Exit(1)
	}
}
```

フルスキャンじゃないから OK というわけではないけど、アプローチの1つとして。

おわり
