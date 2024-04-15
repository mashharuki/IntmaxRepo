const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  reactStrinctMode: true,
  images: {
    domains: [
      "bafybeigmzj3hktgmjpbsl6akvlmucgrwedvajhp4ehjhtvuwdoexjy2hci.ipfs.dweb.link",
      "bafkreihnwh275aqcc6sjo2f37yaphhh2rp44tsmdrsv25k72iiozybzluy.ipfs.w3s.link",
      "bafkreie4o7bbfitr4vmuckphvmf7n3aettzb57necosjf3oo5e5syhcfgq.ipfs.w3s.link",
      "bafkreidkyzvx746bw6465ky6wwmb23lbwqp6qbyeoosfdbi4osdkemtqle.ipfs.w3s.link",
    ],
  },
});

module.exports = nextConfig;
