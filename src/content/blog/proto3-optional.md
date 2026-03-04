---
title: 'proto3 の optional ラベルは optional なフィールドにつけるものではない'
description: '誤解されがちな proto3 の optional ラベルの使い方について'
pubDate: 2026-02-17
tags: ['tech']
---

釣りっぽいタイトルを書いた。もう少しちゃんと書くと、

proto3 の `optional` ラベルは、optional なフィールドだけにつけるのが推奨ではない

という話。

## 先に結論

- `optional` ラベルは、フィールドの存在を区別できるようにするためのもの
- 公式ドキュメントでは、primitive 型のフィールドには常に `optional` ラベルをつけることが推奨されている

## 本文

Protocol Buffers の proto3 には `optional` というラベルがある。
一度削除されたあとまた追加されたりといった歴史があるが、そのあたりは割愛。

`optional` ラベルというだけあって optional なフィールドにつけたくなるが、公式ドキュメントの説明を読むとそうでもないというのがわかる。

> In proto3, there are two types of singular fields:
>
> - `optional`: (recommended) An `optional` field is in one of two possible states:
>     - the field is set, and contains a value that was explicitly set or parsed from the wire. It will be serialized to the wire.
>     - the field is unset, and will return the default value. It will not be serialized to the wire.
>
> You can check to see if the value was explicitly set.
>
> `optional` is recommended over *implicit* fields for maximum compatibility with protobuf editions and proto2.
>
> - *implicit*: (not recommended) An implicit field has no explicit cardinality label and behaves as follows:
>     - if the field is a message type, it behaves just like an `optional` field.
>     - if the field is not a message, it has two states:
>         - the field is set to a non-default (non-zero) value that was explicitly set or parsed from the wire. It will be serialized to the wire.
>         - the field is set to the default (zero) value. It will not be serialized to the wire. In fact, you cannot determine whether the default (zero) value was set or parsed from the wire or not provided at all. For more on this subject, see [Field Presence](https://protobuf.dev/programming-guides/field_presence).

https://protobuf.dev/programming-guides/proto3/#field-labels

つまり `optional` ラベルをつけない場合は implicit という扱いになり、この場合は primitive 型のフィールドにデフォルト値（ゼロ値）が入っているのか、フィールドがそもそもセットされていないのかが区別できない。

`optional` ラベルをつけることで、フィールドが明示的にセットされているかどうかを区別できるようになる。

> We recommend always adding the `optional` label for proto3 basic types. This provides a smoother path to editions, which uses explicit presence by default.

https://protobuf.dev/programming-guides/field_presence/

ということで、`optional` ラベルは optional なフィールドにつけるべしというものではなく、primitive 型のフィールドには基本的に全部つけるべしということになる。

おわり。

ちなみに余談だが、proto2, proto3 に加えて [Protobuf Editions](https://protobuf.dev/editions/overview/) なるものがあるのを今回初めて知った。
proto2, proto3 の後継らしいので、要キャッチアップ。
