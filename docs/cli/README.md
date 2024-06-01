# intmax rollup CLI

2024 年 4 月時点でのセットアップ・検証記録

基本的には [intmax-rollup-cli の README](https://github.com/InternetMaximalism/intmax-rollup-cli/tree/main)を参考にしています！

## 注意点

cargo コマンドを使う必要があるため、RUST 用の開発環境を整えている必要あり！

## セットアップ

```bash
git clone https://github.com/InternetMaximalism/intmax-rollup-cli.git -b staging
```

## エラー

```bash
Finished release [optimized] target(s) in 1m 52s
     Running `target/release/intmax config aggregator-url 'https://alpha.testnet.intmax.io/'`
Error: Given aggregator URL is invalid.

```

## IntMax の凄さ

Intmax は世界で初めてスケーラビリティとプライバシーの両立を実現した Ethereum Layer2 として期待をされている。  
ステートレスな RollUp は他のロールアップ系のプロジェクトとは別のアプローチをとっている。

## IntMax について

現在、以下の機能をサポートしています。

- アカウント作成
- アカウントの表示
- アカウントのリセット
- デフォルトアカウントの変更
- ミントトークン
- トークンの送信
- アセットを表示する
- 一括造幣局
- 一括送金
- ヘルプ
- これらの機能の詳細な使用方法については、Readme を参照してください。  
  INTMAX をより深く理解するために、これらの機能を何度でも試すことができます。

## プラグインのコンセプト(日本語訳)

コンセプト  
Solidity で書かれたスマートコントラクトで、INTMAX や他のネットワーク上での資産交換のオファーを管理する。このコントラクトにより、ユーザーは新しいオファーを登録したり、既存のオファーのテイカーを更新したりすることができる。オファーは、支払いと引き換えにテイカーのアセットをメイカーに譲渡することで有効化される。このコントラクトには、オファーの登録、有効化、無効化を追跡するためのイベントも含まれています。関数 nextOfferId は、次に登録されるオファーの ID を返します。

## Scaling Ethereum 2023 のルール(deepql で翻訳したもの)

について
Intmax は、Layer 2 の 10 億ユーザー普及を推進するプロジェクトです。

そのために行っていることは 2 つあります。

1️⃣ Intmax protocol、相互運用性のある完全なステートレス Layer2。

2️⃣ Intmax wallet、生体認証を備えたすべての Layer2 用のウォレットレスウォレット。既存のフロントエンドに webmax.js を追加するだけで、これらの機能を即座に手に入れることができます。

今回は、 2️⃣ Intmax Wallet の賞品をプレゼントします。

賞品内容
賞品 🏆 各 2,500 ドル

Intmax では、各 2500 ドルの賞品を 2 つ用意しています。また、他のロールアップも賞品を提供しているので、イントマックスの webmax.js を使ってロールアップで dApps を開発すれば、賞品が 2 倍になるチャンスです

## CLI の実行例

- アカウント作成

  ```bash
  intmax account add --default
  ```

  実行結果

  ```bash
  Wallet initialized
  new account added: 0x77fdf4c73a87a34d
  set the above account as default
  ```

- テスト用の作成したアドレス

  0xC4C4E9135B809Ea4609C07D83267FC101BDad35C

- ニックネームを指定してアカウント作成

  ```bash
  intmax account add --nickname bob
  ```

- トークン発行

  ```bash
  intmax tx mint --amount 10000 -i 0x00
  ```

- 残高の確認

  ```bash
  intmax account assets
  ```

  実行結果

  ```bash
  User: 0x77fdf4c73a87a34d
  --------------------------------------------------------------------------------------
    Token Address | 0x77fdf4c73a87a34d
    Token ID      | 0x00
    Amount        | 10010
  --------------------------------------------------------------------------------------
  ```

- トークンの送金

  ```bash
  intmax tx send --amount 100 -i 0x00 --receiver-address bob
  ```

  実行例

  ```bash
  start proving: user_tx_proof
  prove: 1.919 sec
  transaction hash is 0xd6fca12cb37e6c7f1663ea3a5505d92d2773d10cf4d426435f515a225d9b423e (INTMAX)
  broadcast transaction successfully
  start proving: received_signature
  prove: 0.011 sec
  send received signature successfully
  ```

- Make Offer

  ```bash
  intmax io register --network scroll --maker-amount 1 --receiver-address carol --taker-token 0x0000000000000000000000000000000000000000 --taker-amount 1000000000000000 -u bob
  ```

  実行結果

  ```bash
  WARNING: DO NOT interrupt execution of this program while a transaction is being sent.
  start proving: user_tx_proof
  prove: 1.949 sec
  transaction hash is 0xe48ed22a25c7b16d9fedf7d10be34e73025691840e18455863766839f0466e77 (INTMAX)
  WARNING: DO NOT interrupt execution of this program while a transaction is being sent.
  start proving: user_tx_proof
  prove: 2.004 sec
  transaction hash is 0xea31d2608fc038b7224e8ce5f211aa73a5be25f9b72bb28507691fb203201ee0 (INTMAX)
  broadcast transaction successfully
  start proving: received_signature
  prove: 0.025 sec
  send received signature successfully
  start register()
  transaction hash is https://blockscout.scroll.io/tx/0xf551b2eff33037c4a6fae3c0cc9d8eb71991c044228cc51727d8f221e2626859
  end register()
  transaction mined in block number 3271616
  offer_id: 28
  ```

- offer を有効化する方法

  ```bash
  intmax io activate 28 --network scroll
  ```

  実行結果

  ```bash
  start activate()
  transaction hash is https://blockscout.scroll.io/tx/0xbe499b79a7bab1d9c2a4eeadacf752060c1a5bc3bc0ef9c266a6d60b4eb2b793
  end activate()
  transaction mined in block number 3271652
  ```

## WalletSDK

- インストール

  ```bash
  yarn add intmax-walletsdk
  ```
