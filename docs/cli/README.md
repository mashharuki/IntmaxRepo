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
