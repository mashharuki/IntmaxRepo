# IntmaxRepo

IntMax を調査・学習するためのリポジトリです。

## IntMaxの凄さ

Intmaxは世界で初めてスケーラビリティとプライバシーの両立を実現したEthereum Layer2として期待をされている。

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

## WalletSDK 用のサンプルアプリ起動方法

- インストール

  ```bash
  yarn
  ```

- デプロイ

  ```bash
  yarn backend deploy:scrollSepolia
  ```

  デプロイ済みコントラクト(ScrollSepolia)

  [SampleForwarder](https://sepolia.scrollscan.com/address/0x32F9d19A89b65F91da684ee25136CF692673A160#code)

  [HelloWorld](https://sepolia.scrollscan.com/address/0x5e86a9F80E4Dec74573fe75F62090Cb28a1B5760#code)

- 検証

  ```bash
  yarn backend verify:scrollSepolia
  ```

- ガスレスでサンプルコントラクトの機能を呼び出す

  ```bash
  yarn backend gaslessSetNewText:scrollSepolia
  ```

### 参考文献

1. [Scaling Ethereum 2023](https://ethglobal.com/events/scaling2023/prizes/intmax-intmax-5ejin)
2. [GitHub - webmax.js Public](https://github.com/InternetMaximalism/webmax.js)
3. [Intmax Wallet](https://drive.google.com/file/d/16AcEheRMEtX9GgjOcQiFQZNQR8ZCPAS0/view)
4. [IntMax の公式サイト](https://intmax.io/)
5. [GetStarted](https://docs.testnet.intmax.io/getting-started/overview)
6. [Scroll bridge](https://scroll.io/bridge)
7. [CLI のガイドライン](https://docs.testnet.intmax.io/getting-started/interface-guide)
8. [intmax rolluo cli](https://github.com/InternetMaximalism/intmax-rollup-cli)
9. [hardhat-Plugin](https://github.com/mashharuki/intmax-interoperability-plugin)
10. [Sample-Auction-dapp](https://github.com/InternetMaximalism/intmax-rollup-cli/tree/main/packages/sample-auction-app/ethereum)
11. [PRTIMES - INTMAX Walletless Wallet](https://prtimes.jp/main/html/rd/p/000000004.000110841.html)
12. [INTMAX Wallet Home Page](https://home.wallet.intmax.io/)
13. [GitHub - intmax-walletsdk](https://github.com/InternetMaximalism/intmax-walletsdk)
14. [npm - INTMAX WalletSDK](https://www.npmjs.com/package/intmax-walletsdk)
15. [INTMAX WalletSDK サンプル実装](https://github.com/InternetMaximalism/intmax-walletsdk/blob/main/examples/dapp/src/App.tsx)
16. [INTMAX Wallet SDK - GitBook](https://intmax-wallet.gitbook.io/intmax-walletsdk)
17. [レイヤー2「INTMAX」とは？真の金融インフラを開発する日置玲於奈氏の展望に迫る](https://meta-bank.jp/theme/intmax-hioki/)
18. [INTMAX、「Plasma Next」メイネットαをローンチ。Plasmaの完成により拡張性向上](https://news.yahoo.co.jp/articles/741cb91f613971f44d91a8c982a5bf49bf955e4d)
19. [大衆向けイーサリアムのスケーリング: INTMAX が Plasma Next を発表](https://hackernoon.com/ja/%E5%A4%A7%E8%A1%86%E5%90%91%E3%81%91%E3%82%A4%E3%83%BC%E3%82%B5%E3%83%AA%E3%82%A2%E3%83%A0%E3%81%AE%E3%82%B9%E3%82%B1%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0-intmax-%E3%81%8C%E6%AC%A1%E3%81%AB%E3%83%97%E3%83%A9%E3%82%BA%E3%83%9E%E3%82%92%E7%99%BA%E8%A1%A8)
