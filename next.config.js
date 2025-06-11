/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Tambahkan basePath
  basePath: "/v3/next",

  // ✅ Tambahkan env jika perlu
  env: {
    API_URL: "http://localhost:3000/api",
  },

  // ✅ Redirect agar root diarahkan ke login
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/v3/next/login",
        permanent: true,
      },
    ];
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  webpack(config, { dev }) {
    if (!dev) {
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.(".svg")
      );
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
      }

      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });
    }

    return config;
  },
};

module.exports = nextConfig;
