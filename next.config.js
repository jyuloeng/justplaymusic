module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: "empty", module: "empty" };
    }

    return config;
  },
  images: {
    domains: [
      "p1.music.126.net",
      "p2.music.126.net",
      "p3.music.126.net",
      "p4.music.126.net",
    ],
  },
};
