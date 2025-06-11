/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Turbopack configuration (now stable)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Fallback webpack config for production builds
  webpack(config, { dev }) {
    // Only apply webpack config for production builds
    // (Turbopack handles development)
    if (!dev) {
      // Grab the existing rule for SVGs and remove it
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.(".svg")
      );
      if (fileLoaderRule) {
        fileLoaderRule.exclude = /\.svg$/i;
      }

      // Add SVGR loader
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
