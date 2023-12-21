module.exports = function override (config, env) {
  console.log("override");
  const loaders = config.resolve;
  loaders.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify")
  };

  return config;
};
