# Block Builder に関するメモ

## 動かし方

### セットアップ

```bash
curl -o builder.sh https://raw.githubusercontent.com/InternetMaximalism/intmax2/refs/heads/main/scripts/block-builder-testnet.sh
chmod +x builder.sh
```

以下で動くことを確認

```bash
./builder.sh help
```

```bash
Commands:
  setup        - Create frpc.toml, nginx.conf, docker-compose.yml, and .env with unique UUID
  setup-env    - Configure L2_RPC_URL and private key (unified environment setup)
  verify-env   - Verify L2_RPC_URL and private key configuration
  check        - Check if config files exist and show content
  run          - Start Docker Stack with Nginx proxy
  stop         - Stop all Docker Stack services
  health       - Check health of the Block Builder service
  monitor      - Monitor Docker Stack services status and logs
  update       - Download and install the latest version of this script
  docker-clean - Remove all Docker containers, images, secrets, and networks related to this setup
  clean        - Remove all configuration files with Docker cleanup
  version      - Show version information

Quick start workflow:
  1. ./builder.sh setup      # Create initial configuration files
  2. ./builder.sh setup-env  # Configure L2_RPC_URL and private key
  3. ./builder.sh check      # Verify all configurations
  4. ./builder.sh run        # Start the services
  5. ./builder.sh health     # Check the health status of the services
  6. ./builder.sh monitor    # Monitor running services

Maintenance:
  ./builder.sh stop          # Stop services
  ./builder.sh update        # Update to latest version
  ./builder.sh clean         # Complete cleanup
```

### 設定ファイルを生成する

```bash
./builder.sh setup
```

するともろもろ設定ファイルが生成される

### swarm init コマンド実行

```bash
docker swarm init
```

```bash
Swarm initialized: current node (3ryn4c1bx6c6116qr5q0i0ixo) is now a manager.
```

### 環境変数用の設定ファイルを生成

```bash
./builder.sh setup-env
```

ちゃんと環境変数が設定されたかは以下のコマンドでチェックできる

```bash
./builder.sh verify-env
```

### 最終チェック

```bash
./builder.sh check
```

以下の通り表示されれば OK!

```bash
🎉 All checks passed! Your configuration is ready:
   ✅ Configuration files exist
   ✅ L2 RPC URL is configured and accessible
   ✅ Network configuration is correct
   ✅ Private key is configured

💡 Next step: ./builder.sh run
```

### Block Builder 起動

```bash
./builder.sh run
```

以下の通りになれば OK!

```bash
Creating network block-builder-stack-testnet_builder-network-testnet
Creating service block-builder-stack-testnet_block-builder-testnet
Creating service block-builder-stack-testnet_frp-client-testnet
Creating service block-builder-stack-testnet_nginx-proxy-testnet
✅ Started successfully as Docker Stack

💡 To check health, run: ./builder.sh health
💡 To monitor the services, run: ./builder.sh monitor
```

以下のようなコンテナが起動しているはず

```bash
CONTAINER ID   IMAGE                                             COMMAND                  CREATED          STATUS          PORTS     NAMES
08102e225a98   nginx:alpine                                      "/docker-entrypoint.…"   21 seconds ago   Up 20 seconds   80/tcp    block-builder-stack-testnet_nginx-proxy-testnet.1.z03bidepf0nwpnun7427xryag
496f2c681f06   snowdreamtech/frpc:latest                         "/usr/bin/frpc -c /e…"   25 seconds ago   Up 24 seconds             block-builder-stack-testnet_frp-client-testnet.1.35klexbg4sdhld7dfyw5943et
5afd44de4d83   ghcr.io/internetmaximalism/intmax2:0.1.33-arm64   "/bin/sh -c 'export …"   27 seconds ago   Up 26 seconds             block-builder-stack-testnet_block-builder-testnet.1.za5ai2vc44y9hpzfyk341ybg3
```

### ヘルスチェック

```bash
./builder.sh health
```

```bash
🩺 Testing your block builder health...
🔗 Block Builder URL: https://stage.proxy.builder.intmax.io/33986a0d-4010-4950-8f7a-558edd632e33
🩺 Testing endpoints...

1️⃣ Testing health-check endpoint...
   URL: https://stage.proxy.builder.intmax.io/33986a0d-4010-4950-8f7a-558edd632e33/health-check
   ✅ Health check passed (HTTP 200, 1s)
   📄 Response:
      {
        "name": "block-builder",
        "version": "0.1.33"
      }

2️⃣ Testing fee-info endpoint...
   URL: https://stage.proxy.builder.intmax.io/33986a0d-4010-4950-8f7a-558edd632e33/fee-info
   ✅ Fee info endpoint passed (HTTP 200, 1s)
   📄 Fee Information:
      {
        "version": "0.1.33",
        "blockBuilderAddress": "0x51908f598a5e0d8f1a3babfa6df76f9704dad072",
        "beneficiary": "T6foGVBypeTVc1nCM479pb7CeT6Rb2bp1L8EVCeQR8oeLQtYhwcLRSB7ZFpkhMAxu4AqMq8udoTm84Q2qxeihoqGP8imFdm",
        "registrationFee": [
          {
            "token_index": 0,
            "amount": "2500000000000"
          }
        ],
        "nonRegistrationFee": [
          {
            "token_index": 0,
            "amount": "2000000000000"
          }
        ],
        "registrationCollateralFee": null,
        "nonRegistrationCollateralFee": null
      }

3️⃣ Testing indexer registration endpoint...
   URL: https://stage.api.indexer.intmax.io/v1/indexer/builders/registration/0x51908f598a5e0d8f1a3babfa6df76f9704dad072
   📍 Block Builder Address: 0x51908f598a5e0d8f1a3babfa6df76f9704dad072
   ✅ Indexer registration endpoint passed (HTTP 200, 0s)
   📄 Registration Information:
      {
        "registered": false,
        "ready": false
      }

🎉 Your block builder is healthy and all endpoints are accessible!

🏗️  Block Builder Address: 0x51908f598a5e0d8f1a3babfa6df76f9704dad072

📋 Endpoint Summary:
   ✅ Health Check: https://stage.proxy.builder.intmax.io/33986a0d-4010-4950-8f7a-558edd632e33/health-check
   ✅ Fee Info: https://stage.proxy.builder.intmax.io/33986a0d-4010-4950-8f7a-558edd632e33/fee-info
   ✅ Indexer Registration: https://stage.api.indexer.intmax.io/v1/indexer/builders/registration/0x51908f598a5e0d8f1a3babfa6df76f9704dad072
```

### モニタリング

```bash
./builder.sh monitor
```

以下のようになっていれば OK!

```bash
🐳 Checking Docker status...
📊 Monitoring Docker Stack 'block-builder-stack-testnet'...

🔍 Stack Services:
ID             NAME                                                MODE         REPLICAS   IMAGE                                             PORTS
8np2jy7r7oqj   block-builder-stack-testnet_block-builder-testnet   replicated   1/1        ghcr.io/internetmaximalism/intmax2:0.1.33-arm64
60fqwozp831v   block-builder-stack-testnet_frp-client-testnet      replicated   1/1        snowdreamtech/frpc:latest
n3vwa3hnb9l7   block-builder-stack-testnet_nginx-proxy-testnet     replicated   1/1        nginx:alpine                                      *:3000->3000/tcp

💻 Container Processes:
--- block-builder-stack-testnet_block-builder-testnet ---
ID             NAME                                                  IMAGE                                             NODE             DESIRED STATE   CURRENT STATE           ERROR     PORTS
za5ai2vc44y9   block-builder-stack-testnet_block-builder-testnet.1   ghcr.io/internetmaximalism/intmax2:0.1.33-arm64   docker-desktop   Running         Running 2 minutes ago

--- block-builder-stack-testnet_frp-client-testnet ---
ID             NAME                                               IMAGE                       NODE             DESIRED STATE   CURRENT STATE           ERROR     PORTS
35klexbg4sdh   block-builder-stack-testnet_frp-client-testnet.1   snowdreamtech/frpc:latest   docker-desktop   Running         Running 2 minutes ago

--- block-builder-stack-testnet_nginx-proxy-testnet ---
ID             NAME                                                IMAGE          NODE             DESIRED STATE   CURRENT STATE           ERROR     PORTS
z03bidepf0nw   block-builder-stack-testnet_nginx-proxy-testnet.1   nginx:alpine   docker-desktop   Running         Running 2 minutes ago

📝 Recent Logs (last 5 lines):
--- block-builder logs ---
block-builder-stack-testnet_block-builder-testnet.1.za5ai2vc44y9@docker-desktop    | {"timestamp":"2025-09-23T13:29:28.519080Z","level":"INFO","fields":{"message":"new"},"span":{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","name":"http-request"},"spans":[]}
block-builder-stack-testnet_block-builder-testnet.1.za5ai2vc44y9@docker-desktop    | {"timestamp":"2025-09-23T13:29:28.519343Z","level":"INFO","fields":{"message":"check_balance","log.target":"block_builder::app::block_builder","log.module_path":"block_builder::app::block_builder","log.file":"block-builder/src/app/block_builder.rs","log.line":243},"span":{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","name":"http-request"},"spans":[{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","name":"http-request"}]}
block-builder-stack-testnet_block-builder-testnet.1.za5ai2vc44y9@docker-desktop    | {"timestamp":"2025-09-23T13:29:29.183912Z","level":"INFO","fields":{"message":"block builder balance: 106319668723955262421","log.target":"block_builder::app::block_builder","log.module_path":"block_builder::app::block_builder","log.file":"block-builder/src/app/block_builder.rs","log.line":252},"span":{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","name":"http-request"},"spans":[{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","name":"http-request"}]}
block-builder-stack-testnet_block-builder-testnet.1.za5ai2vc44y9@docker-desktop    | {"timestamp":"2025-09-23T13:29:29.184196Z","level":"INFO","fields":{"message":"request-end"},"span":{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","latency":"665.209ms","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","status_code":200,"name":"http-request"},"spans":[{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","latency":"665.209ms","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","status_code":200,"name":"http-request"}]}
block-builder-stack-testnet_block-builder-testnet.1.za5ai2vc44y9@docker-desktop    | {"timestamp":"2025-09-23T13:29:29.184264Z","level":"INFO","fields":{"message":"close","time.busy":"5.38ms","time.idle":"660ms"},"span":{"http.client_ip":"10.0.1.4","http.flavor":"HTTP/1.0","http.host":"stage.proxy.builder.intmax.io","http.method":"GET","http.route":"/fee-info","http.scheme":"http","http.user_agent":"curl/8.6.0","latency":"665.209ms","otel.kind":"server","otel.name":"GET /fee-info","request_id":"bba73aee-f399-429a-b9b3-1bf50682199c","status_code":200,"name":"http-request"},"spans":[]}

--- nginx-proxy logs ---
block-builder-stack-testnet_nginx-proxy-testnet.1.z03bidepf0nw@docker-desktop    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
block-builder-stack-testnet_nginx-proxy-testnet.1.z03bidepf0nw@docker-desktop    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
block-builder-stack-testnet_nginx-proxy-testnet.1.z03bidepf0nw@docker-desktop    | /docker-entrypoint.sh: Configuration complete; ready for start up
block-builder-stack-testnet_nginx-proxy-testnet.1.z03bidepf0nw@docker-desktop    | 10.0.1.4 - - [23/Sep/2025:13:29:27 +0000] "GET /33986a0d-4010-4950-8f7a-558edd632e33/health-check HTTP/1.1" 200 43 "-" "curl/8.6.0"
block-builder-stack-testnet_nginx-proxy-testnet.1.z03bidepf0nw@docker-desktop    | 10.0.1.4 - - [23/Sep/2025:13:29:29 +0000] "GET /33986a0d-4010-4950-8f7a-558edd632e33/fee-info HTTP/1.1" 200 397 "-" "curl/8.6.0"

--- frp-client logs ---
block-builder-stack-testnet_frp-client-testnet.1.35klexbg4sdh@docker-desktop    | 2025-09-23 13:28:41.185 [I] [sub/root.go:149] start frpc service for config file [/etc/frp/frpc.toml]
block-builder-stack-testnet_frp-client-testnet.1.35klexbg4sdh@docker-desktop    | 2025-09-23 13:28:41.185 [I] [client/service.go:319] try to connect to server...
block-builder-stack-testnet_frp-client-testnet.1.35klexbg4sdh@docker-desktop    | 2025-09-23 13:28:41.612 [I] [client/service.go:311] [e7410396f5a510c7] login to server success, get run id [e7410396f5a510c7]
block-builder-stack-testnet_frp-client-testnet.1.35klexbg4sdh@docker-desktop    | 2025-09-23 13:28:41.612 [I] [proxy/proxy_manager.go:177] [e7410396f5a510c7] proxy added: [33986a0d-4010-4950-8f7a-558edd632e33-block-builder]
block-builder-stack-testnet_frp-client-testnet.1.35klexbg4sdh@docker-desktop    | 2025-09-23 13:28:41.747 [I] [client/control.go:172] [e7410396f5a510c7] [33986a0d-4010-4950-8f7a-558edd632e33-block-builder] start proxy success

🌐 Health Check:
Testing: https://stage.proxy.builder.intmax.io/33986a0d-4010-4950-8f7a-558edd632e33/health-check
✅ Health check passed

💡 Commands:
   View live logs: docker service logs -f builder-stack_block-builder
   Restart service: ./builder.sh run
   Health check: ./builder.sh health
   Stop all: ./builder.sh stop
```

## 参考文献

- [Full Network](https://docs.network.intmax.io/developers-hub/intmax-block-builder/full-netwrok)
