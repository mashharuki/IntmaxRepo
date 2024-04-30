import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import fs from "fs";
import "hardhat-gas-reporter";
import {HardhatUserConfig} from "hardhat/config";
import path from "path";

import "hardhat-gas-reporter";

dotenv.config();

const {PRIVATE_KEY, SCROLLSCAN_API_KEY, GAS_REPORT, COINMARKETCAP_API_KEY} =
  process.env;

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = [""];
  taskPaths.forEach((folder) => {
    const tasksPath = path.join(__dirname, "tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      scrollSepolia: SCROLLSCAN_API_KEY!,
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com/",
        },
      },
    ],
  },
  gasReporter: {
    enabled: GAS_REPORT ? true : false,
    currency: "JPY",
    gasPrice: 20,
    token: "ETH",
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
};

export default config;
